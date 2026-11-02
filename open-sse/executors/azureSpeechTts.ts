import {
  audioErrorResponse,
  audioStreamResponse,
  upstreamErrorResponse,
} from "../utils/audioResponse.ts";
import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

const AZURE_SPEECH_FORMATS = {
  mp3: "audio-24khz-96kbitrate-mono-mp3",
  wav: "riff-24khz-16bit-mono-pcm",
  pcm: "raw-24khz-16bit-mono-pcm",
  opus: "ogg-24khz-16bit-mono-opus",
  ogg: "ogg-24khz-16bit-mono-opus",
} as const;

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeAzureSpeechBaseUrl(baseUrl: string): string | null {
  try {
    const parsed = new URL(baseUrl);
    const hostname = parsed.hostname.toLowerCase();
    const azureSpeechHost = [
      ".tts.speech.microsoft.com",
      ".tts.speech.azure.us",
      ".tts.speech.azure.cn",
      ".tts.speech.microsoftazure.de",
      ".cognitiveservices.azure.com",
      ".cognitiveservices.azure.us",
      ".cognitiveservices.azure.cn",
      ".cognitiveservices.microsoftazure.de",
    ].some((suffix) => hostname.endsWith(suffix));
    if (parsed.protocol !== "https:" || !azureSpeechHost) return null;
    parsed.search = "";
    parsed.hash = "";
    const normalized = stripTrailingSlashes(parsed.toString());
    const path = parsed.pathname.replace(/\/+$/, "");
    if (/\/(?:tts\/)?cognitiveservices\/v1$/i.test(path)) return normalized;
    if (path && path !== "/") return normalized;
    if (parsed.hostname.toLowerCase().endsWith(".cognitiveservices.azure.com")) {
      return `${normalized}/tts/cognitiveservices/v1`;
    }
    return `${normalized}/cognitiveservices/v1`;
  } catch {
    return null;
  }
}

export function resolveAzureSpeechSynthesisUrl(credentials: unknown): string | null {
  const record = credentials && typeof credentials === "object" ? credentials : {};
  const providerSpecificData =
    "providerSpecificData" in record &&
    record.providerSpecificData &&
    typeof record.providerSpecificData === "object"
      ? record.providerSpecificData
      : {};
  const customBaseUrl =
    "baseUrl" in providerSpecificData ? stringValue(providerSpecificData.baseUrl) : null;
  if (customBaseUrl) return normalizeAzureSpeechBaseUrl(customBaseUrl);

  const region = "region" in providerSpecificData ? stringValue(providerSpecificData.region) : null;
  if (!region || !/^[a-z0-9-]+$/i.test(region)) return null;
  return `https://${region.toLowerCase()}.tts.speech.microsoft.com/cognitiveservices/v1`;
}

export function resolveAzureSpeechVoicesUrl(credentials: unknown): string | null {
  const synthesisUrl = resolveAzureSpeechSynthesisUrl(credentials);
  if (!synthesisUrl) return null;
  return synthesisUrl.replace(/\/cognitiveservices\/v1$/i, "/cognitiveservices/voices/list");
}

function resolveLanguage(voice: string): string {
  return voice.match(/^([a-z]{2,3}-[A-Z]{2})(?:-|$)/)?.[1] || "en-US";
}

function resolveProsodyRate(speed: unknown): string | null {
  if (typeof speed !== "number" || !Number.isFinite(speed) || speed === 1) return null;
  const clamped = Math.min(4, Math.max(0.25, speed));
  const percentage = Math.round((clamped - 1) * 100);
  return `${percentage >= 0 ? "+" : ""}${percentage}%`;
}

export async function handleAzureSpeechTts(body, token: string, credentials): Promise<Response> {
  const endpoint = resolveAzureSpeechSynthesisUrl(credentials);
  if (!endpoint) {
    return audioErrorResponse(
      400,
      "Azure Speech requires a region or custom Base URL on the provider connection"
    );
  }

  const requestedFormat = (stringValue(body.response_format) || "mp3").toLowerCase();
  const outputFormat = AZURE_SPEECH_FORMATS[requestedFormat as keyof typeof AZURE_SPEECH_FORMATS];
  if (!outputFormat) {
    return audioErrorResponse(
      400,
      "Azure Speech supports response_format mp3, wav, pcm, opus, or ogg only"
    );
  }

  const voice = stringValue(body.voice) || "en-US-AvaMultilingualNeural";
  const language = resolveLanguage(voice);
  const escapedText = escapeXml(String(body.input));
  const rate = resolveProsodyRate(body.speed);
  const content = rate ? `<prosody rate="${rate}">${escapedText}</prosody>` : escapedText;
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" ` +
    `xml:lang="${escapeXml(language)}"><voice name="${escapeXml(voice)}">${content}</voice></speak>`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/ssml+xml",
      "Ocp-Apim-Subscription-Key": token,
      "X-Microsoft-OutputFormat": outputFormat,
      "User-Agent": "OmniRoute",
    },
    body: ssml,
  });

  if (!response.ok) return upstreamErrorResponse(response, await response.text());
  return audioStreamResponse(response);
}
