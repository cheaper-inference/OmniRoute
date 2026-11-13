// aegis-15: operator-supplied exact secret values (no recognisable shape) are masked by the credential
// masker. Stored encrypted in settings, never echoed back, off while the list is empty or redaction is off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exact-values-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = [
  "exact",
  "values",
  "synthetic",
  "storage",
  "key",
  "0123456789",
].join("-");
process.env.API_KEY_SECRET = "exact-values-synthetic-api-key-secret";
process.env.JWT_SECRET = "exact-values-synthetic-jwt-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { redactCredentials, CredentialMaskerGuardrail } =
  await import("../../src/lib/guardrails/credentialMasker.ts");
const { setCredentialExactValues } =
  await import("../../src/shared/utils/credentialExactValues.ts");
const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");

// Built from parts: a made-up value with no credential shape, so only the exact-value list can catch it.
const SECRET = ["correct", "horse", "battery", "staple"].join(" ");
const PLAIN = "an ordinary sentence with nothing private in it";

test.after(() => {
  setCredentialExactValues("");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
test.beforeEach(() => setCredentialExactValues(""));

test("an empty list changes nothing", () => {
  const r = redactCredentials(`say ${SECRET} now`);
  assert.equal(r.modified, false);
});

test("an exact value is masked and the rest of the text is kept", () => {
  setCredentialExactValues(SECRET);
  const r = redactCredentials(`say ${SECRET} now, twice: ${SECRET}`);
  assert.equal(r.text, "say [REDACTED:exact_value] now, twice: [REDACTED:exact_value]");
  assert.deepEqual(r.detections, [{ type: "exact_value", count: 2 }]);
  assert.equal(redactCredentials(PLAIN).modified, false);
});

test("values shorter than 10 characters are ignored on read", () => {
  setCredentialExactValues(`short\n${SECRET}\n123456789`);
  assert.equal(redactCredentials("short 123456789").modified, false);
  assert.equal(redactCredentials(SECRET).modified, true);
});

test("a regex metacharacter in a value is matched literally", () => {
  setCredentialExactValues("a.b*c+d(e)f[g]h?");
  assert.equal(redactCredentials("x a.b*c+d(e)f[g]h? y").modified, true);
  assert.equal(redactCredentials("x aXbbbcccdefgh y").modified, false);
});

test("the settings schema rejects a value shorter than 10 characters", () => {
  assert.equal(
    updateSettingsSchema.safeParse({ credentialExactValues: `${SECRET}\nshort` }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ credentialExactValues: SECRET }).success, true);
  assert.equal(updateSettingsSchema.safeParse({ credentialExactValues: "" }).success, true);
});

test("the list is stored encrypted at rest and read back in clear", async () => {
  await settingsDb.updateSettings({ credentialExactValues: SECRET });
  const raw = core
    .getDbInstance()
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'credentialExactValues'"
    )
    .get() as { value: string };
  assert.ok(raw.value.includes("enc:v1:"), raw.value);
  assert.ok(!raw.value.includes("battery"), "no part of the value is stored in clear");
  assert.equal((await settingsDb.getSettings()).credentialExactValues, SECRET);
});

test("the guardrail masks the value only when credential redaction is on", async () => {
  await settingsDb.updateSettings({
    credentialExactValues: SECRET,
    credentialRedactionEnabled: false,
  });
  const guardrail = new CredentialMaskerGuardrail();
  const payload = { messages: [{ role: "user", content: `my secret is ${SECRET}` }] };
  const off = (await guardrail.preCall(payload, {} as never)) as {
    block: boolean;
    modifiedPayload?: unknown;
  };
  assert.equal(off.modifiedPayload, undefined);

  await settingsDb.updateSettings({ credentialRedactionEnabled: true });
  const on = (await guardrail.preCall(payload, {} as never)) as {
    modifiedPayload?: { messages: Array<{ content: string }> };
  };
  assert.equal(on.modifiedPayload?.messages[0].content, "my secret is [REDACTED:exact_value]");
  const post = (await guardrail.postCall(
    { choices: [{ message: { content: SECRET } }] },
    {} as never
  )) as {
    modifiedResponse?: { choices: Array<{ message: { content: string } }> };
  };
  assert.equal(post.modifiedResponse?.choices[0].message.content, "[REDACTED:exact_value]");
  await settingsDb.updateSettings({ credentialRedactionEnabled: false });
});

test("a value split across streamed chunks is masked", async () => {
  setCredentialExactValues(SECRET);
  const frame = (text: string) =>
    `data: ${JSON.stringify({ id: "c", object: "chat.completion.chunk", choices: [{ index: 0, delta: { content: text } }] })}\n\n`;
  const pieces = ["The phrase is correct hor", "se battery st", "aple, keep it safe."];
  const source = new ReadableStream({
    start(controller) {
      for (const piece of pieces) controller.enqueue(new TextEncoder().encode(frame(piece)));
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const out = await new Response(
    source.pipeThrough(createCredentialSseTransform({ windowSize: 8 }))
  ).text();
  const text = out
    .split("\n")
    .filter((l) => l.startsWith("data: {"))
    .map((l) => JSON.parse(l.slice(6)).choices?.[0]?.delta?.content ?? "")
    .join("");
  assert.ok(!text.includes("battery"), text);
  assert.ok(text.includes("[REDACTED:exact_value]"), text);
  assert.ok(text.includes("keep it safe."), text);
});

test("the settings API never returns the stored list, and the audit diff redacts it", async () => {
  await settingsDb.updateSettings({ credentialExactValues: "" });
  const patch = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { credentialExactValues: SECRET },
    })
  );
  assert.equal(patch.status, 200, await patch.clone().text());
  assert.ok(!(await patch.text()).includes("battery"), "PATCH response must not echo the list");

  const get = await settingsRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings")
  );
  assert.equal(get.status, 200);
  assert.ok(!(await get.text()).includes("battery"), "GET response must not return the list");

  const audit = JSON.stringify(compliance.getAuditLog({ target: "settings", limit: 20 }));
  assert.ok(audit.includes("credentialExactValues"), "the change is still audited by key");
  assert.ok(!audit.includes("battery"), "the audit diff must not carry the value");
  assert.equal((await settingsDb.getSettings()).credentialExactValues, SECRET);
});
