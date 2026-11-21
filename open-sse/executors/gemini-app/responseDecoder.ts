/**
 * Decode Robin streaming frames into monotonic text snapshots.
 *
 * Derived from `ShawTim/gemini-app2api` — `src/native-provider.mjs` (MIT).
 * See ./LICENSE for the upstream MIT notice.
 */

import { parse } from "./protobuf.ts";
import { decodeClientGenerateResponse, type ClientGenerateResponse } from "./robinWire.ts";
import { GeminiAppError } from "./errors.ts";

const utf8 = new TextDecoder("utf-8", { fatal: true });

export interface NativeFrameInfo extends ClientGenerateResponse {
  text: string | null;
  responseId: string | null;
}

function oneField(fields: readonly { number: number }[], number: number): boolean {
  return fields.filter((field) => field.number === number).length <= 1;
}

/** Decode one outer gRPC frame; opaque continuation frames return null. */
export function decodeNativeFrame(bytes: Buffer): NativeFrameInfo | null {
  if (!Buffer.isBuffer(bytes) || bytes.length > 1024 * 1024) {
    throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Invalid native response frame");
  }
  const fields = parse(bytes);
  const wrapper = fields.find((field) => field.number === 1003);
  if (!wrapper) return null;
  const clientField = parse(wrapper.payload).find((field) => field.number === 1);
  if (!clientField) return null;

  const rawFields = parse(clientField.payload);
  for (const number of [1, 9, 11, 30, 31, 41, 42]) {
    if (!oneField(rawFields, number)) {
      throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Ambiguous native response evidence");
    }
  }
  let info: ClientGenerateResponse;
  try {
    info = decodeClientGenerateResponse(clientField.payload);
  } catch {
    throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Undecodable native response frame");
  }
  if (info.hasToolOperations) {
    throw new GeminiAppError(
      "NATIVE_PROTOCOL_ERROR",
      502,
      "Native tool operations are not supported in this turn"
    );
  }

  const modelField = rawFields.find((field) => field.number === 1);
  let text: string | null = null;
  let responseId: string | null = null;
  if (modelField) {
    const modelFields = parse(modelField.payload);
    const idField = modelFields.find((field) => field.number === 1);
    const displayField = modelFields.find((field) => field.number === 2);
    if (idField) {
      if (idField.wire !== 2 || idField.payload.length > 4096) {
        throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Invalid native response id");
      }
      try {
        responseId = utf8.decode(idField.payload);
      } catch {
        throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Invalid native response id");
      }
    }
    if (displayField) {
      const textField = parse(displayField.payload).find((field) => field.number === 1);
      if (textField) {
        try {
          text = utf8.decode(textField.payload);
        } catch {
          throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Invalid native response text");
        }
      }
    }
  }
  return { ...info, text, responseId };
}

/**
 * Enforce snapshot monotonicity: a newer snapshot for the same responseId must
 * extend the previous text, never replace or shrink it. Returns only the delta.
 */
export function monotonicDelta(previous: string, next: string): string {
  if (!next.startsWith(previous)) {
    throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Native snapshot regressed");
  }
  return next.slice(previous.length);
}
