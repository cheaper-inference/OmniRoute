import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20520-"));

const { writeCallArtifact, readCallArtifact } =
  await import("../../src/lib/usage/callLogArtifacts.ts");

test("#20520: size-limit ladder keeps the small upstream response body when there is no pipeline", () => {
  const id = "repro-20520";
  const responseBody = {
    error: { message: "Provider returned error", code: 422, metadata: { provider_name: "Cohere" } },
  };
  const input = {
    schemaVersion: 5 as const,
    summary: {
      id,
      timestamp: new Date().toISOString(),
      method: "POST",
      path: "/v1/chat/completions",
      status: 422,
      model: "cohere/x",
      requestedModel: null,
    },
    requestBody: { messages: "r".repeat(600 * 1024) },
    responseBody,
    error: { message: "Provider returned error" },
  } as never;
  assert.ok(writeCallArtifact(input, `repro/${id}.json`));
  const stored = readCallArtifact(`repro/${id}.json`).artifact as unknown as Record<
    string,
    unknown
  >;
  assert.deepEqual(stored.responseBody, responseBody);
  assert.match(String(stored.requestBody), /omitted/);
});
