/**
 * Wire-only protobuf editor for the Gemini App (Robin) native transport.
 *
 * Derived from `ShawTim/gemini-app2api` — `native-wire/protobuf.mjs` (MIT).
 * No generated schema, reflection, network, credential or native loading.
 * See ./LICENSE for the upstream MIT notice.
 */

export const MAX_MESSAGE_BYTES = 16 * 1024 * 1024;
const MAX_FIELDS = 100_000;
const MAX_DEPTH = 32;
const MAX_FIELD = 0x1fff_ffff;

export interface WireField {
  number: number;
  wire: number;
  raw: Buffer;
  payload: Buffer;
}

interface SequenceResult {
  fields: WireField[];
  end: number;
  contentEnd?: number;
}

function checkedBytes(input: Buffer): Buffer {
  if (!Buffer.isBuffer(input)) throw new TypeError("Expected Buffer");
  if (input.length > MAX_MESSAGE_BYTES) throw new RangeError("Message exceeds 16 MiB");
  return input;
}

/** Encode a non-negative integer as an unsigned varint (max uint64). */
export function varint(value: bigint | number): Buffer {
  if (typeof value !== "bigint" && !Number.isSafeInteger(value)) {
    throw new RangeError("Invalid integer");
  }
  let n = BigInt(value);
  if (n < 0n || n > 0xffff_ffff_ffff_ffffn) throw new RangeError("Outside uint64");
  const out: number[] = [];
  do {
    out.push(Number(n & 127n) | (n > 127n ? 128 : 0));
    n >>= 7n;
  } while (n);
  return Buffer.from(out);
}

interface VarintRead {
  value: bigint;
  end: number;
}

function readVarint(input: Buffer, start: number): VarintRead {
  let n = 0n;
  for (let i = 0; i < 10; i++) {
    if (start + i >= input.length) throw new Error("Truncated varint");
    const b = input[start + i];
    if (i === 9 && b > 1) throw new Error("Varint overflows uint64");
    n |= BigInt(b & 127) << BigInt(i * 7);
    if (!(b & 128)) return { value: n, end: start + i + 1 };
  }
  throw new Error("Invalid varint");
}

/** Encode a length-delimited (wire type 2) field. */
export function lengthDelimited(number: number, value: Buffer): Buffer {
  checkedBytes(value);
  if (!Number.isInteger(number) || number < 1 || number > MAX_FIELD) {
    throw new RangeError("Invalid field number");
  }
  const result = Buffer.concat([varint(BigInt(number) * 8n + 2n), varint(value.length), value]);
  return checkedBytes(result);
}

/** Encode a varint (wire type 0) field. */
export function varintField(number: number, value: bigint | number): Buffer {
  if (!Number.isInteger(number) || number < 1 || number > MAX_FIELD) {
    throw new RangeError("Invalid field number");
  }
  return Buffer.concat([varint(BigInt(number) * 8n), varint(value)]);
}

/**
 * Parse a bounded protobuf message. Unknown fields retain their original
 * key/length/value bytes, even noncanonical (but valid) varints. Legacy
 * groups are opaque and bounded, not dropped.
 */
export function parse(input: Buffer): WireField[] {
  checkedBytes(input);
  let count = 0;

  function sequence(start: number, group: number | null, depth: number): SequenceResult {
    if (depth > MAX_DEPTH) throw new Error("Group nesting exceeds limit");
    const fields: WireField[] = [];
    let pos = start;
    while (pos < input.length) {
      if (++count > MAX_FIELDS) throw new Error("Too many fields");
      const begin = pos;
      const key = readVarint(input, pos);
      pos = key.end;
      const number = Number(key.value >> 3n);
      const wire = Number(key.value & 7n);
      if (number < 1 || number > MAX_FIELD) throw new Error("Invalid field number");
      if (wire === 4) {
        if (number !== group) throw new Error("Unmatched end group");
        return { fields, end: pos, contentEnd: begin };
      }
      let payloadStart = pos;
      let payloadEnd: number | undefined;
      if (wire === 0) {
        pos = readVarint(input, pos).end;
      } else if (wire === 1) {
        pos += 8;
      } else if (wire === 5) {
        pos += 4;
      } else if (wire === 2) {
        const size = readVarint(input, pos);
        if (size.value > BigInt(MAX_MESSAGE_BYTES)) throw new Error("Oversized length");
        payloadStart = size.end;
        pos = payloadStart + Number(size.value);
      } else if (wire === 3) {
        const nested = sequence(pos, number, depth + 1);
        payloadEnd = nested.contentEnd;
        pos = nested.end;
      } else {
        throw new Error("Unsupported wire type");
      }
      if (pos > input.length) throw new Error("Truncated field");
      payloadEnd ??= pos;
      fields.push({
        number,
        wire,
        raw: input.subarray(begin, pos),
        payload: input.subarray(payloadStart, payloadEnd),
      });
    }
    if (group !== null) throw new Error("Unterminated group");
    return { fields, end: pos };
  }

  return sequence(0, null, 0).fields;
}

/** Return the payload of a single length-delimited field. */
export function singular(
  input: Buffer,
  number: number,
  options: { required?: boolean } = {}
): Buffer | undefined {
  const found = parse(input).filter((field) => field.number === number);
  // Protobuf singular messages may merge duplicates. Reject rather than
  // silently choosing a fragment or altering merge/oneof semantics.
  if (found.length > 1) throw new Error(`Ambiguous duplicate singular field ${number}`);
  if (!found.length) {
    if (options.required) throw new Error(`Missing required existing field ${number}`);
    return undefined;
  }
  if (found[0].wire !== 2) throw new Error(`Field ${number} must be length-delimited`);
  return found[0].payload;
}

/** Replace every occurrence of a length-delimited field. */
export function replaceFields(input: Buffer, number: number, values: Buffer[]): Buffer {
  if (!Array.isArray(values)) throw new TypeError("Expected replacement array");
  let replacementSize = 0;
  for (const value of values) {
    checkedBytes(value);
    replacementSize +=
      value.length + varint(value.length).length + varint(BigInt(number) * 8n + 2n).length;
    if (replacementSize > MAX_MESSAGE_BYTES) {
      throw new RangeError("Replacements exceed 16 MiB");
    }
  }
  const replacements = values.map((value) => lengthDelimited(number, value));
  const fields = parse(input);
  const out: Buffer[] = [];
  let inserted = false;
  for (const field of fields) {
    if (field.number === number) {
      if (field.wire !== 2) throw new Error(`Field ${number} has wrong wire type`);
      if (!inserted) out.push(...replacements);
      inserted = true;
    } else {
      out.push(field.raw);
    }
  }
  if (!inserted) out.push(...replacements);
  if (out.reduce((size, part) => size + part.length, 0) > MAX_MESSAGE_BYTES) {
    throw new RangeError("Edited message exceeds 16 MiB");
  }
  return checkedBytes(Buffer.concat(out));
}

/** Remove every field with one of the given numbers. */
export function removeFields(input: Buffer, numbers: readonly number[]): Buffer {
  return checkedBytes(
    Buffer.concat(
      parse(input)
        .filter((field) => !numbers.includes(field.number))
        .map((field) => field.raw)
    )
  );
}
