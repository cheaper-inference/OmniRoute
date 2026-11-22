/**
 * Devin Desktop per-turn output ceiling.
 *
 * The Connect GetChatMessage request has no output-token field, so the account
 * plan caps the reply server-side (measured: exactly 1024 completion tokens for
 * `swe-2-flash-medium`, 40 times across 10 accounts, never above). These tests
 * pin the two behaviours that keep that ceiling from silently eating answers:
 *   - the system prompt carries the budget so the model ends on purpose;
 *   - a reply that reaches the ceiling is reported as `finish_reason: "length"`.
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DevinDesktopExecutor,
  applyDevinDesktopOutputBudgetGuidance,
  resolveDevinDesktopOutputCeiling,
} from "../../open-sse/executors/devin-desktop.ts";

function varint(value: number): Uint8Array {
  const bytes: number[] = [];
  let remaining = value;
  while (remaining >= 0x80) {
    bytes.push((remaining % 0x80) | 0x80);
    remaining = Math.floor(remaining / 0x80);
  }
  bytes.push(remaining);
  return Uint8Array.from(bytes);
}

function concat(...arrays: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(arrays.reduce((total, bytes) => total + bytes.length, 0));
  let offset = 0;
  for (const bytes of arrays) {
    result.set(bytes, offset);
    offset += bytes.length;
  }
  return result;
}

function bytesField(fieldNumber: number, payload: Uint8Array): Uint8Array {
  return concat(varint((fieldNumber << 3) | 2), varint(payload.length), payload);
}

function stringField(fieldNumber: number, value: string): Uint8Array {
  return bytesField(fieldNumber, new TextEncoder().encode(value));
}

function varintField(fieldNumber: number, value: number): Uint8Array {
  return concat(varint(fieldNumber << 3), varint(value));
}

function connectEnvelope(payload: Uint8Array, flags = 0): Uint8Array {
  const header = Buffer.alloc(5);
  header[0] = flags;
  header.writeUInt32BE(payload.length, 1);
  return concat(header, payload);
}

function readVarint(bytes: Uint8Array, start: number): [number, number] {
  let value = 0;
  let multiplier = 1;
  let offset = start;
  while (offset < bytes.length) {
    const byte = bytes[offset++];
    value += (byte & 0x7f) * multiplier;
    if ((byte & 0x80) === 0) return [value, offset];
    multiplier *= 0x80;
  }
  throw new Error("truncated test protobuf");
}

function protobufFields(bytes: Uint8Array): Map<number, Array<number | Uint8Array>> {
  const fields = new Map<number, Array<number | Uint8Array>>();
  let offset = 0;
  while (offset < bytes.length) {
    let tag: number;
    [tag, offset] = readVarint(bytes, offset);
    const fieldNumber = Math.floor(tag / 8);
    const wireType = tag & 7;
    let value: number | Uint8Array;
    if (wireType === 0) {
      [value, offset] = readVarint(bytes, offset);
    } else if (wireType === 2) {
      let length: number;
      [length, offset] = readVarint(bytes, offset);
      value = bytes.subarray(offset, offset + length);
      offset += length;
    } else {
      throw new Error(`unsupported test wire type ${wireType}`);
    }
    const current = fields.get(fieldNumber) ?? [];
    current.push(value);
    fields.set(fieldNumber, current);
  }
  return fields;
}

function bytesValue(fields: Map<number, Array<number | Uint8Array>>, field: number): Uint8Array {
  const value = fields.get(field)?.[0];
  assert.ok(value instanceof Uint8Array, `field ${field} should be bytes`);
  return value;
}

function textValue(fields: Map<number, Array<number | Uint8Array>>, field: number): string {
  return new TextDecoder().decode(bytesValue(fields, field));
}

function listen(
  handler: (request: IncomingMessage, response: ServerResponse) => void
): Promise<{ origin: string; close: () => Promise<void> }> {
  const server = createServer(handler);
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      const address = server.address();
      assert.ok(address && typeof address === "object");
      resolve({
        origin: `http://127.0.0.1:${address.port}`,
        close: () =>
          new Promise<void>((done, fail) => {
            server.close((error) => (error ? fail(error) : done()));
          }),
      });
    });
  });
}

function finalChunk(sse: string): Record<string, unknown> {
  const payloads = sse
    .split("\n\n")
    .map((line) => line.replace(/^data:\s*/, "").trim())
    .filter((line) => line.startsWith("{"))
    .map((line) => JSON.parse(line) as Record<string, unknown>);
  const withChoices = payloads.filter((payload) => Array.isArray(payload.choices));
  const last = withChoices[withChoices.length - 1];
  assert.ok(last, "expected at least one chat.completion.chunk");
  const choices = last.choices as Array<Record<string, unknown>>;
  return choices[0];
}

test("output ceiling is resolved per model and ignores the provider prefix", () => {
  assert.equal(resolveDevinDesktopOutputCeiling("swe-2-flash-medium"), 1024);
  assert.equal(resolveDevinDesktopOutputCeiling("devin-desktop/swe-2-flash-medium"), 1024);
  assert.equal(resolveDevinDesktopOutputCeiling("SWE-2-Flash-Medium"), 1024);
  assert.equal(resolveDevinDesktopOutputCeiling("swe-1-7"), null);
  assert.equal(resolveDevinDesktopOutputCeiling(""), null);
});

test("system prompt gains the per-turn budget for capped models only", () => {
  const capped = applyDevinDesktopOutputBudgetGuidance(
    "You are a coding agent.",
    "swe-2-flash-medium"
  );
  assert.ok(capped.startsWith("You are a coding agent."));
  assert.match(capped, /1024 tokens/);
  assert.match(capped, /tool calls/);

  assert.equal(
    applyDevinDesktopOutputBudgetGuidance("You are a coding agent.", "swe-1-7"),
    "You are a coding agent."
  );
  assert.match(applyDevinDesktopOutputBudgetGuidance("", "swe-2-flash-medium"), /1024 tokens/);
});

async function runStreamingTurn(
  model: string,
  usageOutputTokens: number
): Promise<{ sse: string; upstreamSystemPrompt: string }> {
  let upstreamSystemPrompt = "";
  const mock = await listen((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      const path = request.url ?? "";
      if (path === "/exa.auth_pb.AuthService/GetUserJwt") {
        response.writeHead(200, { "Content-Type": "application/proto" });
        response.end(stringField(1, "jwt-value"));
        return;
      }
      const body = Buffer.concat(chunks);
      const chatRequest = protobufFields(body.subarray(5));
      upstreamSystemPrompt = textValue(chatRequest, 2);
      const usage = concat(
        varintField(2, 20),
        varintField(3, usageOutputTokens),
        varintField(4, 0),
        varintField(5, 0)
      );
      const responseMessage = concat(
        stringField(3, "partial answer that stops mid-sentence"),
        varintField(5, 1), // stopReason 1 = "stop" even when the answer was cut
        bytesField(7, usage)
      );
      response.writeHead(200, { "Content-Type": "application/connect+proto" });
      response.write(connectEnvelope(responseMessage));
      response.end(connectEnvelope(new TextEncoder().encode("{}"), 0x02));
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model,
      body: {
        messages: [
          { role: "system", content: "You are a coding agent." },
          { role: "user", content: "hi" },
        ],
      },
      stream: true,
      credentials: { accessToken: "raw-key", providerSpecificData: { baseUrl: mock.origin } },
    });
    return { sse: await result.response.text(), upstreamSystemPrompt };
  } finally {
    await mock.close();
  }
}

test("a reply that reaches the ceiling is reported as finish_reason=length", async () => {
  const { sse, upstreamSystemPrompt } = await runStreamingTurn("swe-2-flash-medium", 1024);
  assert.match(
    upstreamSystemPrompt,
    /Output budget: this deployment truncates any single response at 1024 tokens/
  );
  assert.equal(finalChunk(sse).finish_reason, "length");
});

test("a reply below the ceiling keeps finish_reason=stop", async () => {
  const { sse } = await runStreamingTurn("swe-2-flash-medium", 131);
  assert.equal(finalChunk(sse).finish_reason, "stop");
});

test("a model without a proven ceiling is left untouched", async () => {
  const { sse, upstreamSystemPrompt } = await runStreamingTurn("swe-1-7", 4096);
  assert.equal(upstreamSystemPrompt, "You are a coding agent.");
  assert.equal(finalChunk(sse).finish_reason, "stop");
});
