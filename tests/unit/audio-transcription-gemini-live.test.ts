import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import http from "node:http";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { WebSocketServer } from "ws";

const { AUDIO_TRANSCRIPTION_PROVIDERS, parseTranscriptionModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const {
  GEMINI_LIVE_MAX_INPUT_BYTES,
  GEMINI_LIVE_MAX_PCM_BYTES,
  convertToPcm16k,
  extractPcmFrom16kWav,
  resolveLiveWsUrlAndHeaders,
  geminiLiveTranscribe,
} = await import("../../open-sse/executors/geminiLiveTranscribe.ts");
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

/**
 * Build a synthetic 16kHz 16-bit mono PCM WAV buffer for testing.
 */
function createSyntheticPcm16kWav(durationSec = 0.5): Buffer {
  const sampleRate = 16000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * (bitsPerSample / 8);

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
  header.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  const pcmData = Buffer.alloc(dataSize);
  for (let i = 0; i < numSamples; i++) {
    // 440 Hz sine wave
    const sample = Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 10000;
    pcmData.writeInt16LE(Math.floor(sample), i * 2);
  }

  return Buffer.concat([header, pcmData]);
}

/**
 * Spin up a mock Gemini Live WebSocket server on an ephemeral loopback port.
 */
function startMockLiveServer(): Promise<{
  server: http.Server;
  wss: WebSocketServer;
  url: string;
  close: () => Promise<void>;
}> {
  return new Promise((resolve) => {
    const server = http.createServer();
    const wss = new WebSocketServer({ server });

    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      const url = `ws://127.0.0.1:${port}`;
      resolve({
        server,
        wss,
        url,
        close: () =>
          new Promise((done) => {
            wss.close(() => {
              server.close(() => done());
            });
          }),
      });
    });
  });
}

test("audioRegistry registers gemini provider with gemini-3.5-transcribe-live model", () => {
  assert.ok(AUDIO_TRANSCRIPTION_PROVIDERS.gemini, "gemini provider must be registered");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.id, "gemini");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.format, "gemini-live");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.authType, "apikey");
  assert.ok(
    AUDIO_TRANSCRIPTION_PROVIDERS.gemini.models.some((m) => m.id === "gemini-3.5-transcribe-live"),
    "must register gemini-3.5-transcribe-live"
  );
});

test("parseTranscriptionModel resolves gemini/gemini-3.5-transcribe-live and bare model", () => {
  assert.deepEqual(parseTranscriptionModel("gemini/gemini-3.5-transcribe-live"), {
    provider: "gemini",
    model: "gemini-3.5-transcribe-live",
  });
  assert.deepEqual(parseTranscriptionModel("gemini-3.5-transcribe-live"), {
    provider: "gemini",
    model: "gemini-3.5-transcribe-live",
  });
});

test("extractPcmFrom16kWav extracts raw PCM from 16kHz mono WAV", () => {
  const wav = createSyntheticPcm16kWav(0.1);
  const pcm = extractPcmFrom16kWav(wav);
  assert.ok(pcm, "should extract PCM buffer");
  assert.equal(pcm.length, 16000 * 0.1 * 2); // 3200 bytes
});

test("resolveLiveWsUrlAndHeaders handles apiKey and accessToken", () => {
  const withKey = resolveLiveWsUrlAndHeaders(
    { apiKey: "test-gemini-key" },
    "ws://localhost:9999/ws"
  );
  // The credential travels in the header only: a query-string copy leaks into proxy/access
  // logs and error messages.
  assert.ok(!withKey.url.includes("test-gemini-key"));
  assert.equal(new URL(withKey.url).search, "");
  assert.equal(withKey.headers["x-goog-api-key"], "test-gemini-key");

  const withToken = resolveLiveWsUrlAndHeaders(
    { accessToken: "test-oauth-token" },
    "ws://localhost:9999/ws"
  );
  assert.ok(!withToken.url.includes("test-oauth-token"));
  assert.equal(withToken.headers.Authorization, "Bearer test-oauth-token");

  assert.throws(() => {
    resolveLiveWsUrlAndHeaders({}, "ws://localhost:9999/ws");
  }, /No credentials/);
});

test("geminiLiveTranscribe transcribes file via mock Live WebSocket session", async () => {
  const mockServer = await startMockLiveServer();
  const captured: {
    setup?: Record<string, unknown>;
    chunks: string[];
    ended?: boolean;
    queryString?: string;
    apiKeyHeader?: string;
  } = { chunks: [] };

  mockServer.wss.on("connection", (ws, req) => {
    const reqUrl = new URL(req.url || "", "ws://localhost");
    captured.queryString = reqUrl.search;
    captured.apiKeyHeader = req.headers["x-goog-api-key"] as string | undefined;

    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        captured.setup = data.setup;
        // Respond with setupComplete
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audio) {
        captured.chunks.push(data.realtimeInput.audio.data);
      } else if (data.realtimeInput?.audioStreamEnd) {
        captured.ended = true;
        // Emit input transcription then turn complete
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Testing gemini live transcription" },
            },
          })
        );
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.2);
    const text = await geminiLiveTranscribe(
      { apiKey: "secret-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
        prompt: "System instruction verbatim",
        language: "en",
      }
    );

    assert.equal(text, "Testing gemini live transcription");
    assert.equal(captured.queryString, "");
    assert.equal(captured.apiKeyHeader, "secret-key");
    assert.equal(captured.setup?.model, "models/gemini-3.5-transcribe-live");
    assert.deepEqual(
      (captured.setup?.generationConfig as Record<string, unknown>)?.responseModalities,
      ["TEXT"]
    );
    assert.deepEqual(
      (captured.setup?.inputAudioTranscription as Record<string, unknown>)?.languageCodes,
      ["en"]
    );
    assert.ok(captured.chunks.length > 0, "should have sent audio chunks");
    assert.equal(captured.ended, true, "should have sent audioStreamEnd");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe accumulates multiple inputTranscription chunks", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Hello," },
            },
          })
        );
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "this is segment two." },
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const text = await geminiLiveTranscribe(
      { apiKey: "test-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
      }
    );

    assert.equal(text, "Hello, this is segment two.");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe returns empty text for music-only audio without error", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        // Music only: turn completes without any inputTranscription text
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const text = await geminiLiveTranscribe(
      { apiKey: "test-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
      }
    );

    assert.equal(text, "");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe surfaces upstream 429 quota error", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(
          JSON.stringify({
            error: {
              code: 429,
              message: "Resource has been exhausted (check quota).",
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    await assert.rejects(
      async () => {
        await geminiLiveTranscribe(
          { apiKey: "test-key" },
          {
            model: "gemini-3.5-transcribe-live",
            audioBuffer: wav,
            baseUrl: mockServer.url,
          }
        );
      },
      (err: unknown) => {
        const error = err as Error & { status?: number };
        assert.equal(error.status, 429);
        assert.match(error.message, /exhausted/);
        return true;
      }
    );
  } finally {
    await mockServer.close();
  }
});

test("handleAudioTranscription end-to-end dispatch for gemini/gemini-3.5-transcribe-live", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Facade in, WebSocket out." },
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const file = new File([wav], "clip.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("model", "gemini/gemini-3.5-transcribe-live");
    formData.append("file", file);

    const response = await handleAudioTranscription({
      formData,
      credentials: {
        apiKey: "gemini-key-test",
        providerSpecificData: { baseUrl: mockServer.url },
      },
    });

    assert.equal(response.status, 200);
    const payload = (await response.json()) as { text: string };
    assert.equal(payload.text, "Facade in, WebSocket out.");
  } finally {
    await mockServer.close();
  }
});

test("handleAudioTranscription returns 200 with empty text for music-only on gemini-live", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const file = new File([wav], "music.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("model", "gemini/gemini-3.5-transcribe-live");
    formData.append("file", file);

    const response = await handleAudioTranscription({
      formData,
      credentials: {
        apiKey: "gemini-key-test",
        providerSpecificData: { baseUrl: mockServer.url },
      },
    });

    assert.equal(response.status, 200);
    const payload = (await response.json()) as { text: string };
    assert.equal(payload.text, "");
  } finally {
    await mockServer.close();
  }
});

// ─── ffmpeg hardening (convertToPcm16k) ───────────────────────────────────────

type FakeChild = EventEmitter & {
  stdin: PassThrough;
  stdout: PassThrough;
  stderr: PassThrough;
  killed: boolean;
  killSignal?: string;
  kill: (signal?: string) => boolean;
};

function createFakeFfmpeg(): FakeChild {
  const child = new EventEmitter() as FakeChild;
  child.stdin = new PassThrough();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.killed = false;
  child.kill = (signal?: string) => {
    child.killed = true;
    child.killSignal = signal;
    // a killed process closes with a signal exit code
    setImmediate(() => child.emit("close", null, signal ?? "SIGTERM"));
    return true;
  };
  return child;
}

// Not a 16 kHz mono WAV, so the ffmpeg path is taken.
const NON_WAV_AUDIO = Buffer.from("ID3-not-a-wav-file-any-audio-container");

test("convertToPcm16k launches ffmpeg with -nostdin and a pipe-only protocol whitelist", async () => {
  const child = createFakeFfmpeg();
  let captured: { command: string; args: string[] } | null = null;
  const pending = convertToPcm16k(NON_WAV_AUDIO, {
    spawnFn: ((command: string, args: string[]) => {
      captured = { command, args };
      return child;
    }) as never,
  });
  child.stdout.write(Buffer.alloc(3200));
  child.stdout.end();
  setImmediate(() => child.emit("close", 0, null));
  const pcm = await pending;

  assert.equal(pcm.length, 3200);
  assert.ok(captured, "spawn must be called");
  const { command, args } = captured as { command: string; args: string[] };
  assert.equal(command, "ffmpeg");
  assert.ok(args.includes("-nostdin"));
  const whitelistAt = args.indexOf("-protocol_whitelist");
  assert.ok(whitelistAt >= 0, "-protocol_whitelist is required");
  assert.equal(args[whitelistAt + 1], "pipe");
  assert.ok(
    whitelistAt < args.indexOf("-i"),
    "the whitelist must precede -i to apply to the input"
  );
  assert.ok(args.includes("-t"), "decoded duration must be capped");
});

test("convertToPcm16k rejects an oversized upload with 413 before spawning ffmpeg", async () => {
  let spawned = false;
  await assert.rejects(
    convertToPcm16k(Buffer.alloc(GEMINI_LIVE_MAX_INPUT_BYTES + 1), {
      spawnFn: (() => {
        spawned = true;
        return createFakeFfmpeg();
      }) as never,
    }),
    (err: { status?: number }) => err.status === 413
  );
  assert.equal(spawned, false);
});

test("convertToPcm16k kills ffmpeg and answers 504 on a wall-clock timeout", async () => {
  const child = createFakeFfmpeg();
  await assert.rejects(
    convertToPcm16k(NON_WAV_AUDIO, { spawnFn: (() => child) as never, timeoutMs: 20 }),
    (err: { status?: number }) => err.status === 504
  );
  assert.equal(child.killed, true);
  assert.equal(child.killSignal, "SIGKILL");
});

test("convertToPcm16k kills ffmpeg and answers 413 when the decoded PCM exceeds the cap", async () => {
  const child = createFakeFfmpeg();
  const pending = convertToPcm16k(NON_WAV_AUDIO, {
    spawnFn: (() => child) as never,
    maxPcmBytes: 6400,
  });
  child.stdout.write(Buffer.alloc(4000));
  child.stdout.write(Buffer.alloc(4000));
  await assert.rejects(pending, (err: { status?: number }) => err.status === 413);
  assert.equal(child.killed, true);
  assert.ok(GEMINI_LIVE_MAX_PCM_BYTES > 0);
});

test("convertToPcm16k survives an EPIPE on ffmpeg stdin and reports the ffmpeg failure", async () => {
  const child = createFakeFfmpeg();
  const pending = convertToPcm16k(NON_WAV_AUDIO, { spawnFn: (() => child) as never });
  child.stdin.emit("error", Object.assign(new Error("write EPIPE"), { code: "EPIPE" }));
  child.stderr.write("Invalid data found when processing input");
  child.emit("close", 1, null);
  await assert.rejects(pending, (err: { status?: number; message: string }) => {
    return err.status === 400 && /Invalid data/.test(err.message);
  });
});

test("handleAudioTranscription answers 413 for an oversized gemini-live upload without converting it", async () => {
  const oversized = new File([Buffer.alloc(GEMINI_LIVE_MAX_INPUT_BYTES + 1)], "huge.mp3", {
    type: "audio/mpeg",
  });
  const formData = new FormData();
  formData.append("model", "gemini/gemini-3.5-transcribe-live");
  formData.append("file", oversized);

  const response = await handleAudioTranscription({
    formData,
    credentials: { apiKey: "gemini-key-test" },
  });

  assert.equal(response.status, 413);
});
