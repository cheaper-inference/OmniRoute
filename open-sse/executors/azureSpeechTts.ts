import {
  audioErrorResponse,
  audioStreamResponse,
  upstreamErrorResponse,
} from "../utils/audioResponse.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

const AZURE_SPEECH_FORMATS = {
  mp3: "audio-24khz-96kbitrate-mono-mp3",
  wav: "riff-24khz-16bit-mono-pcm",
  pcm: "raw-24khz-16bit-mono-pcm",
  opus: "ogg-24khz-16bit-mono-opus",
  ogg: "ogg-24khz-16bit-mono-opus",
} as const;

/** Return a trimmed non-empty string, or null for every other input. */
function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/** Escape text and attribute values before interpolating them into Azure SSML. */
function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Normalize a supported Azure Speech resource URL to its synthesis endpoint. */
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
    if (
      [
        ".cognitiveservices.azure.com",
        ".cognitiveservices.azure.us",
        ".cognitiveservices.azure.cn",
      ].some((suffix) => hostname.endsWith(suffix))
    ) {
      return `${normalized}/tts/cognitiveservices/v1`;
    }
    return `${normalized}/cognitiveservices/v1`;
  } catch {
    return null;
  }
}

/** Pick the TTS host root of a region: sovereign clouds do not live on microsoft.com. */
function azureSpeechRegionHost(region: string): string {
  if (region.startsWith("usgov")) return "tts.speech.azure.us";
  if (region.startsWith("china")) return "tts.speech.azure.cn";
  return "tts.speech.microsoft.com";
}

/** Resolve the configured Azure Speech connection to a synthesis endpoint. */
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
  const normalizedRegion = region.toLowerCase();
  return `https://${normalizedRegion}.${azureSpeechRegionHost(normalizedRegion)}/cognitiveservices/v1`;
}

/** Resolve the Azure Speech voices endpoint used for connection validation. */
export function resolveAzureSpeechVoicesUrl(credentials: unknown): string | null {
  const synthesisUrl = resolveAzureSpeechSynthesisUrl(credentials);
  if (!synthesisUrl) return null;
  return synthesisUrl.replace(/\/cognitiveservices\/v1$/i, "/cognitiveservices/voices/list");
}

/** Derive the SSML language tag from an Azure neural voice name. */
function resolveLanguage(voice: string): string {
  return voice.match(/^([a-z]{2,3}-[A-Z]{2})(?:-|$)/)?.[1] || "en-US";
}

/** Convert an OpenAI-compatible speed multiplier to an Azure SSML rate. */
function resolveProsodyRate(speed: unknown): string | null {
  if (typeof speed !== "number" || !Number.isFinite(speed) || speed === 1) return null;
  const clamped = Math.min(4, Math.max(0.25, speed));
  const percentage = Math.round((clamped - 1) * 100);
  return `${percentage >= 0 ? "+" : ""}${percentage}%`;
}

/** Execute an Azure Speech synthesis request and return the canonical audio response. */
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
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) return upstreamErrorResponse(response, await response.text());
  return audioStreamResponse(response);
}
