import assert from "node:assert/strict";
import test from "node:test";
import {
  resetLlmCircuit,
  translateString,
  translateBatch,
  translateMultiLocaleBatch,
} from "../../scripts/i18n/lib/translate-backend.mjs";

const locale = { code: "de", english: "German" };
const entries = [{ id: "k", text: "Save" }];
const paths = [
  {
    name: "single string",
    response: "LLM result",
    invoke: async (backend) => translateString("Save", locale, backend),
  },
  {
    name: "batch",
    response: '{"k":"LLM result"}',
    invoke: async (backend) => (await translateBatch(entries, locale, backend)).get("k"),
  },
  {
    name: "multilocale",
    response: '{"de":{"1":"LLM result"}}',
    invoke: async (backend) =>
      (await translateMultiLocaleBatch(entries, [locale], backend)).perLocale.get("de").get("k"),
  },
];
async function openCircuitThroughPublicCall() {
  await translateString("Warmup", locale, {
    model: "fixture",
    callChat: async () => {
      throw new Error("upstream 429: quota exhausted");
    },
    googleStrings: async () => ["Warmup fallback"],
  });
}
for (const entry of paths) {
  test(`${entry.name} respects disabled fallback after another request opened the shared circuit`, async (t) => {
    resetLlmCircuit();
    t.after(resetLlmCircuit);
    await openCircuitThroughPublicCall();
    const output = await entry.invoke({
      model: "fixture",
      googleFallback: false,
      callChat: async () => entry.response,
      googleStrings: async () => assert.fail("disabled fallback reached Google"),
    });
    assert.equal(output, "LLM result");
  });
}
test("environment fallback zero is respected when the shared circuit is already open", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  await openCircuitThroughPublicCall();
  process.env.OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK = " 0 ";
  t.after(() => {
    delete process.env.OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK;
  });
  const result = await translateString("Save", locale, {
    model: "fixture",
    callChat: async () => "LLM result",
    googleStrings: async () => assert.fail("environment-disabled fallback reached Google"),
  });
  assert.equal(result, "LLM result");
});
test("explicit Google primary remains available when LLM fallback is disabled", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const result = await translateString("Save", locale, {
    engine: "google",
    googleFallback: false,
    callChat: async () => assert.fail("explicit Google primary reached LLM"),
    googleStrings: async () => ["Google result"],
  });
  assert.equal(result, "Google result");
});
test("a successful multilocale response resets the consecutive failure streak", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  let shouldFail = true;
  const backend = {
    model: "fixture",
    callChat: async () => {
      if (shouldFail) throw new Error("upstream 500: temporary failure");
      return '{"de":{"1":"Saved"}}';
    },
    googleStrings: async (texts) => texts.map(() => "Fallback"),
  };
  await translateString("First failure", locale, backend);
  assert.equal(
    (
      await translateMultiLocaleBatch(entries, [locale], {
        ...backend,
        callChat: async () => '{"de":{"1":"Saved"}}',
      })
    ).perLocale
      .get("de")
      .get("k"),
    "Saved"
  );
  await translateString("Failure after success one", locale, backend);
  await translateString("Failure after success two", locale, backend);
  shouldFail = false;
  const result = await translateString("Try LLM again", locale, {
    ...backend,
    callChat: async () => "LLM still eligible",
  });
  assert.equal(result, "LLM still eligible");
});
for (const entry of paths) {
  for (const status of [400, 413, 422]) {
    test(`${entry.name} keeps HTTP ${status} loud even when its message mentions quota`, async (t) => {
      resetLlmCircuit();
      t.after(resetLlmCircuit);
      const failure = new Error(`upstream ${status}: invalid quota field`);
      let fallbackCalls = 0;
      await assert.rejects(
        entry.invoke({
          model: "fixture",
          callChat: async () => {
            throw failure;
          },
          googleStrings: async (texts) => {
            fallbackCalls++;
            return texts.map(() => "Fallback");
          },
        }),
        (error) => error === failure
      );
      assert.equal(fallbackCalls, 0);
    });
  }
}
