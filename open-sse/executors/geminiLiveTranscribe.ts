/**
 * Gemini Live WebSocket file-mode audio transcription.
 *
 * NOTE: This operates in FILE mode, not realtime: it transcribes an uploaded
 * audio file by converting it to 16kHz mono PCM, streaming it to Gemini Live
 * (bidiGenerateContent) over WebSocket, and collecting the finalized
 * inputTranscription. Interim hypotheses are intentionally omitted.
 */

import { Buffer } from "node:buffer";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import WebSocket from "ws";
import { sleep } from "../utils/sleep.ts";

export interface GeminiLiveCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

export interface GeminiLiveTranscribeOptions {
  model: string;
  audioBuffer: Buffer;
  prompt?: string;
  language?: string;
  baseUrl?: string;
}

export class GeminiLiveError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "GeminiLiveError";
    this.status = status;
  }
}

function isRiffWave(buffer: Buffer): boolean {
  return buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WAVE";
}

/** "fmt " chunk check: PCM (format 1), mono, 16 kHz, 16-bit samples. */
function isPcm16kMonoFmtChunk(buffer: Buffer, dataOffset: number, chunkSize: number): boolean {
  if (chunkSize < 16) return false;
  return (
    buffer.readUInt16LE(dataOffset) === 1 && // audio format: 1 = PCM
    buffer.readUInt16LE(dataOffset + 2) === 1 && // channels: 1 = mono
    buffer.readUInt32LE(dataOffset + 4) === 16000 && // sample rate
    buffer.readUInt16LE(dataOffset + 14) === 16 // bits per sample
  );
}

/**
 * Detect if a buffer is already a 16kHz 16-bit mono PCM WAV file.
 * If so, extracts the raw PCM sample bytes without running FFmpeg.
 */
export function extractPcmFrom16kWav(buffer: Buffer): Buffer | null {
  if (buffer.length < 44 || !isRiffWave(buffer)) return null;

  let offset = 12;
  let isPcm16k = false;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkDataOffset = offset + 8;

    if (chunkId === "fmt ") {
      if (!isPcm16kMonoFmtChunk(buffer, chunkDataOffset, chunkSize)) return null;
      isPcm16k = true;
    } else if (chunkId === "data" && isPcm16k) {
      const dataEnd = Math.min(chunkDataOffset + chunkSize, buffer.length);
      return buffer.subarray(chunkDataOffset, dataEnd);
    }

    // Chunks in WAV are 2-byte aligned
    offset = chunkDataOffset + chunkSize + (chunkSize % 2);
  }

  return null;
}

/** Upload cap for the ffmpeg path (matches the 25 MiB audio upload ceiling used elsewhere). */
export const GEMINI_LIVE_MAX_INPUT_BYTES = 25 * 1024 * 1024;
/** Longest clip decoded for a transcription request. */
export const GEMINI_LIVE_MAX_AUDIO_SECONDS = 600;
/** 16 kHz * 2 bytes * mono: the decoded PCM byte ceiling for GEMINI_LIVE_MAX_AUDIO_SECONDS. */
export const GEMINI_LIVE_MAX_PCM_BYTES = 16_000 * 2 * GEMINI_LIVE_MAX_AUDIO_SECONDS;
/** Wall-clock budget for one ffmpeg conversion before the child is killed. */
export const GEMINI_LIVE_FFMPEG_TIMEOUT_MS = 60_000;
const FFMPEG_STDERR_MAX_BYTES = 8 * 1024;

export interface ConvertToPcm16kOptions {
  timeoutMs?: number;
  maxInputBytes?: number;
  maxPcmBytes?: number;
  /** Test seam: replaces child_process.spawn. */
  spawnFn?: (command: string, args: string[]) => ChildProcessWithoutNullStreams;
}

const FFMPEG_PCM16K_ARGS = [
  "-nostdin",
  "-hide_banner",
  "-loglevel",
  "error",
  // Pipe-only: blocks playlist/concat demuxers from opening local files or network URLs.
  "-protocol_whitelist",
  "pipe",
  "-threads",
  "1",
  "-i",
  "pipe:0",
  "-vn",
  "-t",
  String(GEMINI_LIVE_MAX_AUDIO_SECONDS),
  "-f",
  "s16le",
  "-acodec",
  "pcm_s16le",
  "-ac",
  "1",
  "-ar",
  "16000",
  "pipe:1",
];

function ffmpegSpawnError(err: NodeJS.ErrnoException): GeminiLiveError {
  if (err.code === "ENOENT") {
    return new GeminiLiveError(
      "FFmpeg is required for converting audio to 16kHz PCM, but was not found on PATH.",
      500
    );
  }
  return new GeminiLiveError(`FFmpeg process error: ${err.message}`, 500);
}

function ffmpegExitError(code: number | null, stderrChunks: Buffer[]): GeminiLiveError {
  const stderrMsg = Buffer.concat(stderrChunks).toString("utf-8").trim();
  return new GeminiLiveError(
    `FFmpeg audio conversion failed (exit code ${code}): ${stderrMsg || "unknown error"}`,
    400
  );
}

function runFfmpegPcm16k(
  audioBuffer: Buffer,
  spawnFn: NonNullable<ConvertToPcm16kOptions["spawnFn"]>,
  timeoutMs: number,
  maxPcmBytes: number
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const ffmpeg = spawnFn("ffmpeg", FFMPEG_PCM16K_ARGS);
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let settled = false;

    // First outcome wins; the child is killed on every failure so it never outlives the request.
    const settle = (error: GeminiLiveError | null, result?: Buffer) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) {
        try {
          ffmpeg.kill("SIGKILL");
        } catch {
          /* already gone */
        }
        reject(error);
      } else {
        resolve(result as Buffer);
      }
    };
    const timer = setTimeout(
      () => settle(new GeminiLiveError("FFmpeg audio conversion timed out", 504)),
      timeoutMs
    );

    ffmpeg.stdout.on("data", (chunk: Buffer) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > maxPcmBytes) {
        settle(
          new GeminiLiveError(
            "Decoded audio exceeds the maximum duration for Gemini Live transcription",
            413
          )
        );
        return;
      }
      stdoutChunks.push(chunk);
    });
    ffmpeg.stderr.on("data", (chunk: Buffer) => {
      if (stderrBytes >= FFMPEG_STDERR_MAX_BYTES) return;
      stderrBytes += chunk.length;
      stderrChunks.push(chunk);
    });

    // ffmpeg may exit (or be killed) before it consumed the whole upload: EPIPE on stdin is
    // reported through the "close" handler, it must not become an unhandled stream error.
    ffmpeg.stdin.on("error", () => {});
    ffmpeg.on("error", (err: NodeJS.ErrnoException) => settle(ffmpegSpawnError(err)));
    ffmpeg.on("close", (code) =>
      code === 0
        ? settle(null, Buffer.concat(stdoutChunks))
        : settle(ffmpegExitError(code, stderrChunks))
    );

    ffmpeg.stdin.end(audioBuffer);
  });
}

/**
 * Convert arbitrary audio data (MP3, WAV, AAC, etc.) to 16kHz mono 16-bit LE PCM using FFmpeg.
 *
 * The input is an untrusted upload, so ffmpeg runs with the same guard rails as
 * src/lib/guardrails/videoBridgeAudioExtraction.ts: array arguments (Hard Rule #13), no stdin
 * interaction, a pipe-only protocol whitelist, a decoded-duration cap, a wall-clock timeout
 * that kills the child, and byte caps on both the upload and the decoded PCM.
 */
export async function convertToPcm16k(
  audioBuffer: Buffer,
  options: ConvertToPcm16kOptions = {}
): Promise<Buffer> {
  const maxInputBytes = options.maxInputBytes ?? GEMINI_LIVE_MAX_INPUT_BYTES;
  const maxPcmBytes = options.maxPcmBytes ?? GEMINI_LIVE_MAX_PCM_BYTES;

  if (audioBuffer.length > maxInputBytes) {
    throw new GeminiLiveError(
      `Audio file exceeds the ${Math.floor(maxInputBytes / (1024 * 1024))} MiB limit for Gemini Live transcription`,
      413
    );
  }

  const existingPcm = extractPcmFrom16kWav(audioBuffer);
  if (existingPcm && existingPcm.length > 0) {
    if (existingPcm.length > maxPcmBytes) {
      throw new GeminiLiveError(
        "Audio exceeds the maximum duration for Gemini Live transcription",
        413
      );
    }
    return existingPcm;
  }

  return runFfmpegPcm16k(
    audioBuffer,
    options.spawnFn ?? (spawn as NonNullable<ConvertToPcm16kOptions["spawnFn"]>),
    options.timeoutMs ?? GEMINI_LIVE_FFMPEG_TIMEOUT_MS,
    maxPcmBytes
  );
}

const DEFAULT_GEMINI_LIVE_WS_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

export function resolveLiveWsUrlAndHeaders(
  credentials: GeminiLiveCredentials,
  configuredBaseUrl?: string
): { url: string; headers: Record<string, string> } {
  const base =
    (typeof credentials?.providerSpecificData?.baseUrl === "string" &&
      credentials.providerSpecificData.baseUrl.trim()) ||
    configuredBaseUrl ||
    DEFAULT_GEMINI_LIVE_WS_URL;

  const wsUrl = new URL(base);
  const headers: Record<string, string> = {};

  const apiKey =
    typeof credentials.apiKey === "string" && credentials.apiKey.trim().length > 0
      ? credentials.apiKey.trim()
      : null;
  const accessToken =
    typeof credentials.accessToken === "string" && credentials.accessToken.trim().length > 0
      ? credentials.accessToken.trim()
      : null;

  // Credentials travel in headers only: a query-string copy ends up in proxy/access logs and
  // in WebSocket error messages.
  if (apiKey) {
    headers["x-goog-api-key"] = apiKey;
  } else if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    throw new GeminiLiveError("No credentials for Gemini Live transcription", 401);
  }

  return { url: wsUrl.toString(), headers };
}

const GEMINI_LIVE_DEFAULT_MODEL = "gemini-3.5-transcribe-live";
/** Overall safety timeout for one Live session (processing up to a 4-min file). */
const GEMINI_LIVE_MAX_WAIT_MS = 120_000;
/** 100 ms of audio at 16 kHz 16-bit mono. */
const PCM_CHUNK_BYTES = 3200;
const WS_BACKPRESSURE_BYTES = 65536;
/** Grace period after audioStreamEnd when no turnComplete arrives (music-only or silence). */
const STREAM_END_GRACE_MS = 5000;

interface LiveServerContent {
  inputTranscription?: { text?: unknown };
  input_transcription?: { text?: unknown };
  turnComplete?: unknown;
  turn_complete?: unknown;
  generationComplete?: unknown;
  generation_complete?: unknown;
}

interface LiveServerMessage {
  error?: { code?: unknown; message?: string };
  setupComplete?: unknown;
  setup_complete?: unknown;
  serverContent?: LiveServerContent;
  server_content?: LiveServerContent;
}

function trimmedText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function buildLiveSetupMessage(options: GeminiLiveTranscribeOptions): Record<string, unknown> {
  const rawModel = options.model || GEMINI_LIVE_DEFAULT_MODEL;
  const modelName = rawModel.startsWith("models/") ? rawModel : `models/${rawModel}`;
  const language = trimmedText(options.language);
  const prompt = trimmedText(options.prompt);

  return {
    setup: {
      model: modelName,
      generationConfig: {
        responseModalities: ["TEXT"],
      },
      inputAudioTranscription: {
        languageCodes: language ? [language] : [],
      },
      ...(prompt ? { systemInstruction: { parts: [{ text: prompt }] } } : {}),
    },
  };
}

function isLiveTurnComplete(serverContent: LiveServerContent): boolean {
  return (
    Boolean(serverContent.turnComplete) ||
    Boolean(serverContent.turn_complete) ||
    Boolean(serverContent.generationComplete) ||
    Boolean(serverContent.generation_complete)
  );
}

/** Maps a ws transport error message to the HTTP status reported to the client. */
function liveSocketErrorStatus(message: string): number {
  const statusMatch = /Unexpected server response: (\d{3})/.exec(message);
  if (statusMatch) return parseInt(statusMatch[1], 10);
  if (/quota|429|resource_exhausted/i.test(message)) return 429;
  if (/401|unauthorized|unauthenticated/i.test(message)) return 401;
  if (/403|forbidden/i.test(message)) return 403;
  return 500;
}

function liveUnexpectedCloseError(code: number, reason: Buffer | undefined): GeminiLiveError {
  const reasonStr = reason ? reason.toString() : "";
  return new GeminiLiveError(
    `Gemini Live connection closed unexpectedly (code: ${code}${reasonStr ? `, reason: ${reasonStr}` : ""})`,
    code === 1008 || code === 4429 ? 429 : 502
  );
}

/**
 * One file-mode Live session: setup → stream PCM chunks → audioStreamEnd → collect the
 * finalized inputTranscription. The first outcome wins; every exit path clears the timers
 * and closes the socket.
 */
class GeminiLiveSession {
  private ws: WebSocket | null = null;
  private settled = false;
  private audioStreamEnded = false;
  private finishTimer: NodeJS.Timeout | null = null;
  private maxWaitTimer: NodeJS.Timeout | null = null;
  private readonly transcripts: string[] = [];
  private readonly pcmBuffer: Buffer;
  private readonly options: GeminiLiveTranscribeOptions;
  private readonly onResolve: (text: string) => void;
  private readonly onReject: (err: Error) => void;

  constructor(
    pcmBuffer: Buffer,
    options: GeminiLiveTranscribeOptions,
    onResolve: (text: string) => void,
    onReject: (err: Error) => void
  ) {
    this.pcmBuffer = pcmBuffer;
    this.options = options;
    this.onResolve = onResolve;
    this.onReject = onReject;
  }

  start(url: string, headers: Record<string, string>): void {
    this.maxWaitTimer = setTimeout(() => {
      this.fail(new GeminiLiveError("Gemini Live transcription timed out", 504));
    }, GEMINI_LIVE_MAX_WAIT_MS);

    let ws: WebSocket;
    try {
      ws = new WebSocket(url, { headers });
    } catch (err) {
      this.fail(
        new GeminiLiveError(
          `Failed to initialize WebSocket: ${err instanceof Error ? err.message : String(err)}`,
          500
        )
      );
      return;
    }
    this.ws = ws;

    ws.on("open", () => ws.send(JSON.stringify(buildLiveSetupMessage(this.options))));
    ws.on("message", (raw) => this.handleMessage(raw));
    ws.on("error", (err: Error) => {
      this.fail(
        new GeminiLiveError(
          `Gemini Live WebSocket error: ${err.message}`,
          liveSocketErrorStatus(err.message)
        )
      );
    });
    ws.on("close", (code, reason) => this.handleClose(code, reason));
  }

  private cleanup(): void {
    if (this.finishTimer) {
      clearTimeout(this.finishTimer);
      this.finishTimer = null;
    }
    if (this.maxWaitTimer) {
      clearTimeout(this.maxWaitTimer);
      this.maxWaitTimer = null;
    }
    const ws = this.ws;
    if (!ws) return;
    try {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close(1000);
      }
    } catch {
      /* ignore close errors */
    }
  }

  private succeed(text: string): void {
    if (this.settled) return;
    this.settled = true;
    this.cleanup();
    this.onResolve(text);
  }

  private fail(err: Error): void {
    if (this.settled) return;
    this.settled = true;
    this.cleanup();
    this.onReject(err);
  }

  private scheduleFinish(delayMs = 300): void {
    if (this.finishTimer) clearTimeout(this.finishTimer);
    this.finishTimer = setTimeout(() => {
      const text = this.transcripts
        .map((t) => t.trim())
        .filter(Boolean)
        .join(" ")
        .trim();
      this.succeed(text);
    }, delayMs);
  }

  private openSocketOrThrow(): WebSocket {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new GeminiLiveError("WebSocket disconnected while streaming audio", 500);
    }
    return this.ws;
  }

  private async streamAudio(): Promise<void> {
    try {
      const pcm = this.pcmBuffer;
      for (let offset = 0; offset < pcm.length; offset += PCM_CHUNK_BYTES) {
        const ws = this.openSocketOrThrow();
        const chunk = pcm.subarray(offset, Math.min(offset + PCM_CHUNK_BYTES, pcm.length));
        ws.send(
          JSON.stringify({
            realtimeInput: {
              audio: {
                data: chunk.toString("base64"),
                mimeType: "audio/pcm;rate=16000",
              },
            },
          })
        );
        if (ws.bufferedAmount > WS_BACKPRESSURE_BYTES) {
          await sleep(15);
        }
      }
      this.endAudioStream();
    } catch (err) {
      this.fail(err instanceof Error ? err : new Error(String(err)));
    }
  }

  private endAudioStream(): void {
    const ws = this.ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    this.audioStreamEnded = true;
    ws.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
    this.scheduleFinish(STREAM_END_GRACE_MS);
  }

  private handleMessage(raw: WebSocket.RawData): void {
    try {
      this.dispatchServerMessage(JSON.parse(raw.toString()) as LiveServerMessage);
    } catch {
      /* ignore JSON parse errors for non-json frames */
    }
  }

  private dispatchServerMessage(data: LiveServerMessage): void {
    // Error payload from the server
    if (data.error) {
      const code = typeof data.error.code === "number" ? data.error.code : 500;
      this.fail(new GeminiLiveError(data.error.message || "Gemini Live upstream error", code));
      return;
    }

    // Setup complete → start streaming audio
    if (data.setupComplete || data.setup_complete) {
      this.streamAudio().catch((err: Error) => this.fail(err));
      return;
    }

    const serverContent = data.serverContent || data.server_content;
    if (serverContent) this.collectServerContent(serverContent);
  }

  private collectServerContent(serverContent: LiveServerContent): void {
    const inputTranscription =
      serverContent.inputTranscription || serverContent.input_transcription;
    if (inputTranscription?.text && typeof inputTranscription.text === "string") {
      this.transcripts.push(inputTranscription.text);
    }
    if (isLiveTurnComplete(serverContent) && this.audioStreamEnded) {
      this.scheduleFinish(250);
    }
  }

  private handleClose(code: number, reason: Buffer | undefined): void {
    if (this.settled) return;
    if (this.audioStreamEnded) {
      this.scheduleFinish(0);
    } else {
      this.fail(liveUnexpectedCloseError(code, reason));
    }
  }
}

/**
 * Transcribe an audio file using Gemini Live WebSocket (bidiGenerateContent).
 *
 * NOTE: This operates in FILE mode, not realtime: it collects the finalized
 * inputTranscription from the upstream session and returns the complete text
 * when done. Interim hypotheses are intentionally omitted.
 */
export async function geminiLiveTranscribe(
  credentials: GeminiLiveCredentials,
  options: GeminiLiveTranscribeOptions
): Promise<string> {
  const pcmBuffer = await convertToPcm16k(options.audioBuffer);

  const { url, headers } = resolveLiveWsUrlAndHeaders(credentials, options.baseUrl);

  return new Promise<string>((resolve, reject) => {
    const session = new GeminiLiveSession(pcmBuffer, options, resolve, reject);
    session.start(url, headers);
  });
}
