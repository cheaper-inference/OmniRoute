/**
 * Devin Auth wire format (protobuf subset) and endpoint constants.
 *
 * Ported from cockpit-tools `crates/cockpit-core/src/modules/windsurf_devin_oauth.rs`
 * (Windsurf migrated its account system from Firebase to Devin Auth in 2026-04:
 * new accounts hold `auth1_…` credentials and the legacy Firebase email/password
 * endpoint answers EMAIL_NOT_FOUND for them).
 *
 * Only wire types 0 (varint) and 2 (length-delimited) are implemented — that is
 * all these five RPCs use, and a wider decoder would silently accept shapes we
 * have never observed.
 */

// ========== Endpoints ==========

export const DEVIN_PASSWORD_LOGIN_URL = "https://windsurf.com/_devin-auth/password/login";
export const DEVIN_POST_AUTH_URL =
  "https://windsurf.com/_backend/exa.seat_management_pb.SeatManagementService/WindsurfPostAuth";
export const DEVIN_GET_OTT_URL =
  "https://windsurf.com/_backend/exa.seat_management_pb.SeatManagementService/GetOneTimeAuthToken";
export const DEVIN_REGISTER_USER_URL =
  "https://register.windsurf.com/exa.seat_management_pb.SeatManagementService/RegisterUser";
export const DEVIN_GET_CURRENT_USER_URL =
  "https://windsurf.com/_backend/exa.seat_management_pb.SeatManagementService/GetCurrentUser";

/** The browser UA the upstream expects on the REST login. */
export const DEVIN_BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

/** RegisterUser only accepts the connect-es client UA. */
export const DEVIN_CONNECT_ES_UA = "connect-es/1.5.0";

/** Marker the ide_token is extracted by; RegisterUser returns it inside a proto blob. */
export const DEVIN_IDE_TOKEN_MARKER = "devin-session-token$";

// ========== Varint ==========

/** Encode an unsigned integer as a base-128 varint. */
export function encodeVarint(value: number): Uint8Array {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`encodeVarint expects a non-negative safe integer, got ${value}`);
  }
  const out: number[] = [];
  let n = value;
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n = Math.floor(n / 128);
  }
  out.push(n);
  return Uint8Array.from(out);
}

/**
 * Read a varint starting at `offset`. Returns null when the buffer ends before
 * the continuation bit clears — a truncated tail must never be read as a value.
 */
export function readVarint(
  buffer: Uint8Array,
  offset: number
): { value: number; offset: number } | null {
  let result = 0;
  let shift = 0;
  let pos = offset;
  while (pos < buffer.length) {
    const byte = buffer[pos];
    pos += 1;
    result += (byte & 0x7f) * 2 ** shift;
    if ((byte & 0x80) === 0) return { value: result, offset: pos };
    shift += 7;
    // A varint wider than 10 bytes cannot be a valid field tag or length here.
    if (shift > 63) return null;
  }
  return null;
}

// ========== Proto messages ==========

/** Encode a length-delimited (wire type 2) string field. */
export function encodeProtoString(fieldNumber: number, value: string): Uint8Array {
  const payload = new TextEncoder().encode(value);
  const tag = encodeVarint((fieldNumber << 3) | 2);
  const length = encodeVarint(payload.length);
  const out = new Uint8Array(tag.length + length.length + payload.length);
  out.set(tag, 0);
  out.set(length, tag.length);
  out.set(payload, tag.length + length.length);
  return out;
}

export type ProtoValue =
  | { kind: "string"; value: string }
  | { kind: "bytes"; value: Uint8Array }
  | { kind: "varint"; value: number };

/**
 * Decode the protobuf subset used by these RPCs. Malformed tails stop the walk
 * (matching the Rust helper) instead of throwing, so one unreadable trailing
 * field never destroys fields we did parse.
 */
export function decodeProto(buffer: Uint8Array): Map<number, ProtoValue[]> {
  const fields = new Map<number, ProtoValue[]>();
  let pos = 0;

  const push = (field: number, value: ProtoValue) => {
    const list = fields.get(field);
    if (list) list.push(value);
    else fields.set(field, [value]);
  };

  while (pos < buffer.length) {
    const tag = readVarint(buffer, pos);
    if (!tag) break;
    pos = tag.offset;

    const fieldNumber = Math.floor(tag.value / 8);
    const wireType = tag.value & 0x07;

    if (wireType === 0) {
      const value = readVarint(buffer, pos);
      if (!value) break;
      pos = value.offset;
      push(fieldNumber, { kind: "varint", value: value.value });
    } else if (wireType === 2) {
      const length = readVarint(buffer, pos);
      if (!length) break;
      pos = length.offset;
      const end = pos + length.value;
      if (end > buffer.length) break;
      const slice = buffer.subarray(pos, end);
      pos = end;
      const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
      // Keep the raw bytes too — ide_token recovery scans them for a marker.
      push(fieldNumber, { kind: "bytes", value: slice });
      void text;
    } else if (wireType === 5) {
      pos += 4;
    } else if (wireType === 1) {
      pos += 8;
    } else {
      // Groups (3/4) are not used by these RPCs; stop rather than guess.
      break;
    }
  }

  return fields;
}

/** First non-empty UTF-8 string for a field, mirroring the Rust helper. */
export function protoString(fields: Map<number, ProtoValue[]>, fieldNumber: number): string | null {
  const first = fields.get(fieldNumber)?.[0];
  if (!first) return null;
  let text: string | null = null;
  if (first.kind === "bytes") {
    text = new TextDecoder("utf-8", { fatal: false }).decode(first.value);
  } else if (first.kind === "string") {
    text = first.value;
  }
  return text && text.length > 0 ? text : null;
}

// ========== Binary helpers ==========

/** Index of `needle` inside `haystack`, or -1. An empty needle never matches. */
export function findSubslice(haystack: Uint8Array, needle: Uint8Array): number {
  if (needle.length === 0 || haystack.length < needle.length) return -1;
  const last = haystack.length - needle.length;
  outer: for (let i = 0; i <= last; i += 1) {
    for (let j = 0; j < needle.length; j += 1) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

/**
 * Shorten a credential for logs. Mirrors the Rust `truncate`: a token shorter
 * than `max` is returned whole, anything longer loses its tail entirely.
 */
export function truncateToken(value: string, max = 20): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...(${value.length - max} more chars)`;
}
