/**
 * Gemini App native HTTP/2 protobuf wire codec (ROBINRequestMetadata &
 * ClientGenerate). Pure message framing and field serialization; zero network,
 * credential or IPC I/O.
 *
 * Derived from `ShawTim/gemini-app2api` — `native-wire/robin-current.mjs` (MIT).
 * See ./LICENSE for the upstream MIT notice.
 */

import { TextDecoder } from "node:util";
import {
  lengthDelimited as message,
  varintField,
  varint,
  parse,
  MAX_MESSAGE_BYTES,
  type WireField,
} from "./protobuf.ts";

export const NATIVE_VERSION = "1.131.4.1198";

const utf8 = new TextDecoder("utf-8", { fatal: true });

function text(value: string): Buffer {
  if (typeof value !== "string") throw new TypeError("Expected string");
  const bytes = Buffer.from(value);
  if (bytes.length > MAX_MESSAGE_BYTES) throw new RangeError("Text exceeds message budget");
  return bytes;
}

const string = (field: number, value: string): Buffer => message(field, text(value));

type ScalarValue = number | bigint | null;

function scalar(fields: readonly WireField[], number: number): ScalarValue {
  const found = fields.filter((field) => field.number === number);
  if (found.length > 1) throw new Error(`Duplicate scalar ${number}`);
  if (!found.length) return null;
  if (found[0].wire !== 0) throw new Error(`Invalid scalar wire type ${number}`);
  let value = 0n;
  let shift = 0n;
  for (const byte of found[0].payload) {
    value |= BigInt(byte & 127) << shift;
    if (!(byte & 128)) {
      return value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value;
    }
    shift += 7n;
  }
  throw new Error("Truncated scalar");
}

function field(fields: readonly WireField[], number: number): Buffer | undefined {
  const found = fields.filter((value) => value.number === number);
  if (found.length > 1) throw new Error(`Duplicate message ${number}`);
  if (found[0] && found[0].wire !== 2) throw new Error(`Invalid message wire type ${number}`);
  return found[0]?.payload;
}

const stringValue = (fields: readonly WireField[], number: number): string | null => {
  const value = field(fields, number);
  return value === undefined ? null : utf8.decode(value);
};

export interface RequestMetadataInput {
  clientType: number;
  languageCode?: string;
  interfaceLanguageCode?: string;
  clientVersion?: string;
  clientInstanceId?: string;
  triggerType?: number;
  uiSource?: number;
  clientFunctionCapabilities?: boolean;
}

/** Native ROBINRequestMetadata subset. No device IDs or hardware attestation. */
export function buildRequestMetadata(
  {
    clientType,
    languageCode,
    interfaceLanguageCode,
    clientVersion,
    clientInstanceId,
    triggerType,
    uiSource,
    clientFunctionCapabilities = false,
  }: RequestMetadataInput = { clientType: 0 }
): Buffer {
  if (!Number.isSafeInteger(clientType) || clientType < 0 || clientType > 255) {
    throw new Error("Explicit client type required");
  }
  if (typeof clientFunctionCapabilities !== "boolean") {
    throw new TypeError("Invalid client-function capabilities");
  }
  const fields: Buffer[] = [];
  if (triggerType !== undefined) {
    if (!Number.isSafeInteger(triggerType) || triggerType < 0) throw new Error("Invalid trigger");
    fields.push(message(1, varintField(1, triggerType)));
  }
  if (interfaceLanguageCode !== undefined) {
    fields.push(message(2, string(1, interfaceLanguageCode)));
  }
  if (clientVersion !== undefined) fields.push(message(3, string(1, clientVersion)));
  fields.push(varintField(4, clientType));
  if (languageCode !== undefined) fields.push(string(7, languageCode));
  if (uiSource !== undefined) {
    if (!Number.isSafeInteger(uiSource) || uiSource < 0) throw new Error("Invalid UI source");
    fields.push(varintField(5, uiSource));
  }
  // Metadata CapabilityType values, distinct from DesktopInfo capability 379.
  if (clientFunctionCapabilities) {
    fields.push(message(6, message(2, Buffer.concat([varint(668), varint(669)]))));
  }
  if (clientInstanceId !== undefined) fields.push(string(23, clientInstanceId));
  return Buffer.concat(fields);
}

export interface NativeImageAttachment {
  blobId: string;
  mimeType: "image/png" | "image/jpeg" | "image/webp";
  /** Rejected: raw bytes must be uploaded before this wire call. */
  data?: unknown;
}

// Query.attachments (field 3) -> Attachment.blob (field 1), name (field 2).
// Blob fields: ID (1), type (2 = 1), MIME (3), source (4 = 1).
// Upload completes beforehand; raw image bytes are never inline-encoded here.
function imageAttachments(images: readonly NativeImageAttachment[]): Buffer[] {
  if (!Array.isArray(images) || images.length > 4) throw new TypeError("Invalid native images");
  return images.map((image, index) => {
    const extension =
      image?.mimeType === "image/png"
        ? "png"
        : image?.mimeType === "image/jpeg"
          ? "jpg"
          : image?.mimeType === "image/webp"
            ? "webp"
            : null;
    const id = image?.blobId;
    if (
      !extension ||
      Object.hasOwn(image, "data") ||
      typeof id !== "string" ||
      !id.length ||
      Buffer.byteLength(id) > 4096 ||
      /\s|[\x00-\x1f\x7f]/u.test(id) ||
      Buffer.from(id).toString("utf8") !== id
    ) {
      throw new TypeError("Invalid native image");
    }
    const blob = Buffer.concat([
      string(1, id),
      varintField(2, 1),
      string(3, image.mimeType),
      varintField(4, 1),
    ]);
    return message(
      3,
      Buffer.concat([message(1, blob), string(2, `image-${index + 1}.${extension}`)])
    );
  });
}

export interface ClientGenerateIdentifiers {
  conversationId?: string;
  parentRequestId?: string;
  parentResponseId?: string;
}

export interface ClientGenerateInput {
  userText: string;
  images?: readonly NativeImageAttachment[];
  systemText?: string;
  modelId?: string;
  identifiers?: ClientGenerateIdentifiers;
  clientMetadata?: RequestMetadataInput;
  includePolicyFlags?: boolean;
  temporaryChat?: boolean;
  smartModelSelection?: boolean;
}

/** Construct a fresh inner ClientGenerateRequest payload. */
export function buildClientGenerate({
  userText,
  images = [],
  systemText,
  modelId,
  identifiers,
  clientMetadata,
  includePolicyFlags = true,
  temporaryChat = false,
  smartModelSelection = false,
}: ClientGenerateInput): Buffer {
  if (typeof smartModelSelection !== "boolean") {
    throw new TypeError("Invalid smart model selection");
  }
  const fields: Buffer[] = [
    message(1, Buffer.concat([string(1, userText), ...imageAttachments(images)])),
  ];
  if (modelId !== undefined) fields.push(message(3, string(2, modelId)));
  if (identifiers !== undefined) {
    const ids: Buffer[] = [];
    for (const [name, number] of [
      ["conversationId", 1],
      ["parentRequestId", 2],
      ["parentResponseId", 3],
    ] as const) {
      if (identifiers[name] !== undefined) ids.push(string(number, identifiers[name] as string));
    }
    fields.push(message(4, Buffer.concat(ids)));
  }
  fields.push(varintField(5, 1));
  if (clientMetadata !== undefined) fields.push(message(13, buildRequestMetadata(clientMetadata)));
  fields.push(varintField(15, 1));
  if (systemText !== undefined) fields.push(message(29, string(4, systemText)));
  // Temporary chat keeps the turn out of the account's saved conversation history.
  if (temporaryChat) fields.push(varintField(31, 1));
  if (includePolicyFlags) {
    fields.push(varintField(55, 0), varintField(56, smartModelSelection ? 1 : 0));
  }
  const output = Buffer.concat(fields);
  if (output.length > MAX_MESSAGE_BYTES) throw new RangeError("Message exceeds budget");
  return output;
}

export interface ClientGenerateModel {
  responseId: string | null;
  text: string | null;
}

export interface ClientGenerateResponse {
  models: ClientGenerateModel[];
  conversationId: string | null;
  requestId: string | null;
  completed: boolean;
  fallback: ScalarValue;
  attribution: string | null;
  downgradeReason: ScalarValue;
  resolvedModeCategory: ScalarValue;
  thinkingLevel: ScalarValue;
  modeVariantId: string | null;
  routingVariantId: string | null;
  hasToolOperations: boolean;
  unknownFieldNumbers: number[];
}

const KNOWN_RESPONSE_FIELDS = new Set([1, 2, 7, 9, 11, 30, 31, 39, 40, 41, 42]);

/** Decode inner ClientGenerateResponse. Thought contents are not exported. */
export function decodeClientGenerateResponse(bytes: Buffer): ClientGenerateResponse {
  const fields = parse(bytes);
  const ids = field(fields, 2);
  const models: ClientGenerateModel[] = [];
  for (const model of fields.filter((value) => value.number === 1)) {
    if (model.wire !== 2) throw new Error("Invalid model response");
    const item = parse(model.payload);
    const display = field(item, 2);
    models.push({
      responseId: stringValue(item, 1),
      text: display === undefined ? null : stringValue(parse(display), 1),
    });
  }
  const responseIds = ids === undefined ? [] : parse(ids);
  return {
    models,
    conversationId: stringValue(responseIds, 1),
    requestId: stringValue(responseIds, 2),
    completed: scalar(fields, 9) === 1,
    fallback: scalar(fields, 11),
    attribution: stringValue(fields, 30),
    downgradeReason: scalar(fields, 31),
    resolvedModeCategory: scalar(fields, 41),
    thinkingLevel: scalar(fields, 42),
    modeVariantId: stringValue(fields, 39),
    routingVariantId: stringValue(fields, 40),
    hasToolOperations: fields.some((value) => value.number === 7),
    unknownFieldNumbers: fields
      .filter((value) => !KNOWN_RESPONSE_FIELDS.has(value.number))
      .map((value) => value.number),
  };
}

export interface ContinuationResponse {
  conversationId: string;
  sessionContinuationToken: Buffer | null;
  bytes: Buffer;
}

/** Extension 1014 wrapper field 1 -> streaming continuation identifiers. */
export function decodeContinuationResponse(bytes: Buffer): ContinuationResponse | null {
  const wrapper = parse(bytes);
  const raw = field(wrapper, 1);
  if (raw === undefined) return null;
  const ids = parse(raw);
  const conversationId = stringValue(ids, 1);
  const token = field(ids, 2);
  if (!conversationId) return null;
  return {
    conversationId,
    sessionContinuationToken: token === undefined ? null : Buffer.from(token),
    bytes: Buffer.from(raw),
  };
}

/** Frame one gRPC message (1-byte compression flag + 4-byte big-endian length). */
export function frameGrpcMessage(bytes: Buffer): Buffer {
  if (!Buffer.isBuffer(bytes)) throw new TypeError("Expected Buffer");
  if (bytes.length > MAX_MESSAGE_BYTES) throw new RangeError("Message exceeds budget");
  const header = Buffer.alloc(5);
  header.writeUInt32BE(bytes.length, 1);
  return Buffer.concat([header, bytes]);
}

/** Portable streaming frame reader. No network, token, App or IPC dependencies. */
export class GrpcMessageReader {
  readonly maxBytes: number;
  private pending: Buffer = Buffer.alloc(0);
  private closed = false;

  constructor({ maxBytes = MAX_MESSAGE_BYTES }: { maxBytes?: number } = {}) {
    if (!Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > MAX_MESSAGE_BYTES) {
      throw new RangeError("Invalid frame budget");
    }
    this.maxBytes = maxBytes;
  }

  push(bytes: Buffer): Buffer[] {
    if (this.closed) throw new Error("Reader already closed");
    if (!Buffer.isBuffer(bytes)) throw new TypeError("Expected Buffer");
    const frames: Buffer[] = [];
    let offset = 0;
    while (offset < bytes.length) {
      const needed =
        this.pending.length < 5
          ? 5 - this.pending.length
          : 5 + this.pending.readUInt32BE(1) - this.pending.length;
      const take = Math.min(needed, bytes.length - offset);
      this.pending = Buffer.concat([this.pending, bytes.subarray(offset, offset + take)]);
      offset += take;
      if (this.pending.length < 5) continue;
      if (this.pending[0] !== 0) throw new Error("Compressed gRPC messages not supported");
      const length = this.pending.readUInt32BE(1);
      if (length > this.maxBytes) throw new RangeError("gRPC frame exceeds budget");
      if (this.pending.length === length + 5) {
        frames.push(this.pending.subarray(5));
        this.pending = Buffer.alloc(0);
      }
    }
    return frames;
  }

  finish(): void {
    this.closed = true;
    if (this.pending.length) throw new Error("Truncated gRPC stream");
  }
}
