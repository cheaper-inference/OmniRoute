/**
 * Credential masker: a secret that sits behind a label (`password=`, `client_secret:`,
 * `?api_key=`) is masked even when its value has no provider prefix. A pasted .env file or
 * config dump leaked every such line, because the catalog only knew prefixed token shapes.
 * The value needs 12+ characters, so prose such as `password: required` stays readable.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-labelled-secrets-"));
process.env.DATA_DIR = tmpDir;

const { redactCredentials, CredentialMaskerGuardrail } =
  await import("../../src/lib/guardrails/credentialMasker.ts");
const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { redactSensitiveErrorText } = await import("../../open-sse/utils/errorSanitization.ts");

test.after(async () => {
  const core = await import("../../src/lib/db/core.ts");
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// Built at run time from parts: never a credential-shaped literal in the source.
const VALUE = ["Rk4pW9", "zQm2xL", "t7vNb3"].join("");
const PUNCT_VALUE = ["Rk4p/W9z", "Qm2+xLt7", "vNb3=="].join("");

const FORMS: Array<[string, string]> = [
  ["env password", `DB_PASSWORD=${VALUE}`],
  ["env secret access key", `AWS_SECRET_ACCESS_KEY=${VALUE}`],
  ["env api key", `API_KEY=${VALUE}`],
  ["yaml client secret", `client_secret: ${VALUE}`],
  ["query string api key", `https://host.example/v1?api_key=${VALUE}`],
  ["json password", `{"password": "${VALUE}", "user": "bob"}`],
  ["value with punctuation", `passwd=${PUNCT_VALUE}`],
];

for (const [name, input] of FORMS) {
  test(`masks a labelled secret: ${name}`, () => {
    const result = redactCredentials(input);
    assert.equal(result.modified, true, input);
    assert.equal(result.text.includes(VALUE), false, result.text);
    assert.equal(result.text.includes(PUNCT_VALUE), false, result.text);
    assert.match(result.text, /\[REDACTED:secret\]/);
    assert.deepEqual(
      result.detections.map((d) => d.type),
      ["labelled_secret"]
    );
  });
}

test("keeps the label, the separator and the text around the secret", () => {
  assert.equal(
    redactCredentials(`curl https://host.example/v1?api_key=${VALUE} -H x`).text,
    "curl https://host.example/v1?api_key=[REDACTED:secret] -H x"
  );
  assert.equal(
    redactCredentials(`{"password": "${VALUE}", "user": "bob"}`).text,
    '{"password": "[REDACTED:secret]", "user": "bob"}'
  );
  assert.equal(
    redactCredentials(`client_secret: ${VALUE} was rotated`).text,
    "client_secret: [REDACTED:secret] was rotated"
  );
});

test("masks every labelled line of a pasted .env file and keeps the other lines", () => {
  const env = [
    "NODE_ENV=production",
    `DB_PASSWORD=${VALUE}`,
    "PORT=20128",
    `API_KEY=${VALUE}`,
    `AWS_SECRET_ACCESS_KEY=${VALUE}`,
  ].join("\n");
  assert.equal(
    redactCredentials(env).text,
    [
      "NODE_ENV=production",
      "DB_PASSWORD=[REDACTED:secret]",
      "PORT=20128",
      "API_KEY=[REDACTED:secret]",
      "AWS_SECRET_ACCESS_KEY=[REDACTED:secret]",
    ].join("\n")
  );
});

test("leaves prose, short values, other labels and references alone", () => {
  const benign = [
    "password: required",
    "the password must be changed every 90 days",
    "secret: none",
    `api_key=${VALUE.slice(0, 11)}`,
    "password=${DB_PASSWORD}",
    "api_key=[REDACTED:openai]",
    `secrets: ${VALUE}`,
    `DB_PASSWORD_FILE=/run/secrets/${VALUE}`,
    "pwd=/home/user/projects/app",
    `username=${VALUE}`,
    "set the api_key in your settings",
  ];
  for (const input of benign) {
    const result = redactCredentials(input);
    assert.equal(result.modified, false, `over-redacted: ${input} -> ${result.text}`);
    assert.equal(result.text, input);
  }
});

test("a value that a provider pattern already masked keeps its provider label", () => {
  const key = "sk-proj-" + "Ab9_".repeat(15);
  const result = redactCredentials(`OPENAI_API_KEY=${key}`);
  assert.equal(result.text, "OPENAI_API_KEY=[REDACTED:openai]");
  assert.deepEqual(
    result.detections.map((d) => d.type),
    ["openai_proj"]
  );
});

test("the guardrail masks a labelled secret in the request payload and counts it", async () => {
  const original = process.env.CREDENTIAL_REDACTION_ENABLED;
  process.env.CREDENTIAL_REDACTION_ENABLED = "true";
  try {
    const result = await new CredentialMaskerGuardrail().preCall(
      { messages: [{ role: "user", content: `here is my .env:\nDB_PASSWORD=${VALUE}\nPORT=1` }] },
      {} as never
    );
    const payload = result?.modifiedPayload as { messages: Array<{ content: string }> };
    assert.equal(
      payload.messages[0].content,
      "here is my .env:\nDB_PASSWORD=[REDACTED:secret]\nPORT=1"
    );
    assert.equal((result?.meta as { count: number }).count, 1);
  } finally {
    if (original === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
    else process.env.CREDENTIAL_REDACTION_ENABLED = original;
  }
});

async function streamText(parts: string[], windowSize = 512): Promise<string> {
  const frame = (text: string) =>
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: text }, finish_reason: null }] })}\n\n`;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const part of parts) controller.enqueue(new TextEncoder().encode(frame(part)));
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  }).pipeThrough(createCredentialSseTransform({ windowSize }));
  const wire = await new Response(stream).text();
  return wire
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .flatMap((line) => JSON.parse(line.slice(6)).choices ?? [])
    .map((choice) => choice.delta?.content ?? "")
    .join("");
}

test("a streamed labelled secret is masked wherever the chunks split it", async () => {
  const whole = `note client_secret: ${VALUE} and DB_PASSWORD=${VALUE} done`;
  for (let cut = 1; cut < whole.length; cut++) {
    for (const windowSize of [1, 8, 512]) {
      const text = await streamText([whole.slice(0, cut), whole.slice(cut)], windowSize);
      assert.equal(text.includes(VALUE), false, `cut=${cut} window=${windowSize}: ${text}`);
      assert.equal(text, redactCredentials(whole).text, `cut=${cut} window=${windowSize}`);
    }
  }
});

test("a streamed labelled secret longer than the window never leaks its tail", async () => {
  const long = VALUE.repeat(20);
  const whole = `x DB_PASSWORD=${long} y`;
  for (const cut of [14, 15, 26, 27, 50, 200, 300]) {
    const text = await streamText([whole.slice(0, cut), whole.slice(cut)], 8);
    assert.equal(text.includes(VALUE.slice(0, 8)), false, `cut=${cut}: ${text}`);
    assert.equal(text, "x DB_PASSWORD=[REDACTED:secret] y", `cut=${cut}`);
  }
});

test("public error text keeps its label next to the redaction", () => {
  // The error sanitizer has its own labelled scanner: it must keep working, and must not
  // pick up the new catalog entry (that would drop the label).
  assert.equal(
    redactSensitiveErrorText(`request failed: api_key=${VALUE} was rejected`),
    "request failed: api_key=[REDACTED] was rejected"
  );
  assert.equal(redactSensitiveErrorText(`client_secret: ${VALUE}`), "client_secret: [REDACTED]");
});
