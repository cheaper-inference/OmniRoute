import assert from "node:assert/strict";
import test from "node:test";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";
import { redactCredentials } from "../../src/lib/guardrails/credentialMasker.ts";

type Field = "content" | "reasoning" | "reasoning_content" | "arguments";
const frame = (text: string, field: Field = "content", stop = false) => {
  const delta =
    field === "arguments"
      ? { tool_calls: [{ index: 0, function: { arguments: text } }] }
      : { [field]: text };
  return `data: ${JSON.stringify({ choices: [{ index: 0, delta, finish_reason: stop ? "stop" : null }] })}\n\n`;
};
async function collect(
  parts: string[],
  field: Field = "content",
  windowSize = 512,
  end = "done",
  maxBufferedBytes = 65536
) {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const [index, part] of parts.entries())
        controller.enqueue(
          new TextEncoder().encode(
            frame(part, field, end === "finish" && index === parts.length - 1)
          )
        );
      if (end === "done") controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  }).pipeThrough(createCredentialSseTransform({ windowSize, maxBufferedBytes }));
  const wire = await new Response(stream).text();
  const deltas = wire
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .flatMap((line) => JSON.parse(line.slice(6)).choices ?? [])
    .map((choice) => choice.delta ?? {});
  return deltas
    .map((delta) =>
      field === "arguments"
        ? (delta.tool_calls ?? []).map((call) => call.function?.arguments ?? "").join("")
        : (delta[field] ?? "")
    )
    .join("");
}
const secret = "sk-" + "ABCD".repeat(12);
for (const field of ["content", "reasoning", "reasoning_content", "arguments"] as const) {
  test(`fragment at character25 preserves full credential redaction: ${field}`, async () => {
    const before = field === "arguments" ? '{"key":"' : "A ";
    const after = field === "arguments" ? '","note":"safe"}' : " tail A";
    const actual = await collect([before + secret.slice(0, 25), secret.slice(25) + after], field);
    assert.equal(actual, before + "[REDACTED:openai]" + after);
    assert.equal(actual.includes(secret.slice(25)), false, "raw suffix must not survive");
    if (field === "arguments") assert.equal(JSON.parse(actual).note, "safe");
  });
}

const families = [
  secret,
  "sk-proj-" + "Ab9_".repeat(25),
  "sk-ant-api03-" + "Ab9_".repeat(25),
  "gsk_" + "Ab9".repeat(18),
  "xai-" + "Ab9".repeat(27),
  "oma_live_" + "Ab9_".repeat(11),
  "AIza" + "Ab9_".repeat(10),
  "hf_" + "A".repeat(34),
  "r8_" + "A".repeat(37),
  "ghp_" + "A".repeat(40),
  "xoxb-" + "A1-".repeat(15),
  "lin_api_" + "A".repeat(40),
  "secret_" + "A".repeat(43),
  "npm_" + "A".repeat(36),
  "PMAK-" + "a".repeat(8) + "-" + "b".repeat(32),
  "M" + "A".repeat(23) + "." + "B".repeat(6) + "." + "C".repeat(27),
  "sk_live_" + "A".repeat(32),
  "sq0atp-" + "A".repeat(22),
  "AKIA" + "A".repeat(16),
  "SK" + "a".repeat(32),
  "SG." + "A".repeat(22) + "." + "B".repeat(43),
  "key-" + "a".repeat(32),
  "eyJ" + "A".repeat(14) + "." + "B".repeat(14) + "." + "C".repeat(14),
  "mongodb://fixture:synthetic-password@local/db",
  "Authorization: Bearer " + "Ab9".repeat(15),
];
for (const field of ["content", "reasoning", "reasoning_content", "arguments"] as const) {
  test(`catalog families retain strict direct-redaction equivalence across cuts: ${field}`, async () => {
    for (const key of families)
      for (const window of [8, 512]) {
        const before = field === "arguments" ? '{"value":"' : "before 🦜 ";
        const after = field === "arguments" ? '","safe":true}' : " after";
        const whole = before + key + after;
        for (const cut of new Set([1, 2, 5, 20, 25, Math.floor(key.length / 2), key.length - 1])) {
          const actual = await collect(
            [before + key.slice(0, cut), key.slice(cut) + after],
            field,
            window
          );
          assert.equal(
            actual,
            redactCredentials(whole).text,
            `family=${key.slice(0, 8)} cut=${cut} window=${window}`
          );
          if (field === "arguments") assert.equal(JSON.parse(actual).safe, true);
        }
      }
  });
}
test("tokens longer than the 256-character probe remain whole across window emissions and stream endings", async () => {
  const key = "sk-proj-" + "Ab9_".repeat(200);
  for (const end of ["done", "eof", "finish"])
    for (const cut of [25, 255, 256, 511, 512, 513, 700]) {
      const before = "context ".repeat(100);
      const actual = await collect(
        [before + key.slice(0, cut), key.slice(cut) + " after"],
        "reasoning",
        8,
        end
      );
      assert.equal(actual, before + "[REDACTED:openai] after");
    }
});
test("data URL remains exact when fragments and window drains cross the payload", async () => {
  const image = "data:image/png;base64," + "A".repeat(600) + "AIza" + "B".repeat(80);
  for (const cut of [4, 19, 25, 400, 640]) {
    assert.equal(
      await collect(["see " + image.slice(0, cut), image.slice(cut) + " after"], "content", 8),
      "see " + image + " after"
    );
  }
});
test("overflow retains data URL context across following chunks", async () => {
  const image = "data:image/png;base64," + "A".repeat(1500) + "AIza" + "B".repeat(80);
  assert.equal(
    await collect(
      ["see " + image.slice(0, 1300), image.slice(1300) + " after"],
      "content",
      8,
      "done",
      1024
    ),
    "see " + image + " after"
  );
});
test("overflow never emits the suffix of a long variable credential", async () => {
  const key = "sk-proj-" + "Ab9_".repeat(500);
  assert.equal(
    await collect(
      ["key " + key.slice(0, 1300), key.slice(1300) + " after"],
      "content",
      8,
      "done",
      1024
    ),
    "key [REDACTED:openai] after"
  );
});
test("private-key body after overflow stays masked until its end marker", async () => {
  const key = "-----BEGIN PRIVATE KEY-----\n" + "B".repeat(2400) + "\n-----END PRIVATE KEY-----";
  assert.equal(
    await collect(
      ["key " + key.slice(0, 1400), key.slice(1400) + " after"],
      "content",
      8,
      "done",
      1024
    ),
    "key [REDACTED:private_key] after"
  );
});

test("private key overflow recognizes a split closing marker and resumes ordinary text", async () => {
  const body = "-----BEGIN RSA PRIVATE KEY-----\n" + "A".repeat(3000);
  const actual = await collect(
    [body, "BBBB\n-----END RSA PRI", "VATE KEY----- after"],
    "arguments",
    8,
    "done",
    1024
  );
  assert.equal(actual, "[REDACTED:private_key] after");
});
test("complete oversized private key and ordinary UTF-8 text retain exact output", async () => {
  const key = "-----BEGIN PRIVATE KEY-----\n" + "A".repeat(3000) + "\n-----END PRIVATE KEY-----";
  assert.equal(
    await collect(["before " + key + " after"], "content", 8, "done", 1024),
    "before [REDACTED:private_key] after"
  );
  const plain = "🦜".repeat(2000) + " after";
  assert.equal(
    await collect([plain.slice(0, 2500), plain.slice(2500)], "content", 8, "done", 1024),
    plain
  );
});
test("open private key body is fully masked at EOF, including incomplete internal tokens", async () => {
  const key = "-----BEGIN PRIVATE KEY-----\n" + "x".repeat(600);
  assert.equal(
    await collect(["before " + key, secret], "content", 8, "eof"),
    "before [REDACTED:private_key]"
  );
});
test("concurrent overflows retain independent request and field state", async () => {
  const key = "sk-proj-" + "Ab9_".repeat(400);
  await Promise.all(
    Array.from({ length: 12 }, async (_, i) => {
      const field: Field = ["content", "reasoning", "reasoning_content", "arguments"][
        i % 4
      ] as Field;
      assert.equal(
        await collect(
          [`request ${i} ` + key.slice(0, 1300), key.slice(1300) + " after"],
          field,
          8,
          "done",
          1024
        ),
        `request ${i} [REDACTED:openai] after`
      );
    })
  );
});
test("catalog punctuation after a completed match is preserved across overflow", async () => {
  const key = "sk-proj-" + "Ab9_".repeat(400);
  const whole = key + "+safe";
  assert.equal(
    await collect([key + "+", "safe"], "content", 8, "done", 1024),
    redactCredentials(whole).text
  );
});

test("overflow continuation follows each catalog family's own character class", async () => {
  const keys = [
    "sk-proj-" + "Ab9_".repeat(500),
    "sk-" + "Ab9".repeat(700),
    "gsk_" + "Ab9".repeat(700),
    "AIza" + "Ab9_".repeat(500),
    "ghp_" + "Ab9".repeat(700),
    "xoxb-" + "A1-".repeat(700),
    "Authorization: Bearer " + "Ab9+/=".repeat(400),
    "eyJ" + "A".repeat(20) + "." + "B".repeat(20) + "." + "C".repeat(2000),
  ];
  for (const key of keys) {
    const prefix = '{"credential":"';
    const suffix = '","note":"safe"}';
    const expected = redactCredentials(prefix + key + suffix).text;
    const actual = await collect(
      [prefix + key.slice(0, 1300), key.slice(1300) + suffix],
      "arguments",
      8,
      "done",
      1024
    );
    assert.equal(actual, expected);
    assert.equal(JSON.parse(actual).note, "safe");
  }
});
