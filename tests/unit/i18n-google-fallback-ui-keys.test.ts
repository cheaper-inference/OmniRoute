import test from "node:test";
import assert from "node:assert/strict";
import { IntlMessageFormat } from "intl-messageformat";

const google = await import("../../scripts/i18n/lib/google-translate.mjs");
const backendLib = await import("../../scripts/i18n/lib/translate-backend.mjs");

// Fake keyless endpoint: "translates" by upper-casing prose, moves masked spans to the front
// of the segment (the reorder that broke whole-message plurals on 2026-10-28) and turns curly
// quotes into ASCII apostrophes (what ko did to “{source}”).
function fakeGoogle() {
  const calls: string[][] = [];
  const fetchImpl = async (_url: string, init: { body: string }) => {
    const q = new URLSearchParams(init.body).getAll("q");
    calls.push(q);
    const out = q.map((html) => {
      const spans = html.match(/<span translate="no">zq[a-z]+<\/span>/g) ?? [];
      const prose = html
        .replace(/<span translate="no">zq[a-z]+<\/span>/g, "")
        .split(/(<[^>]+>)/)
        .map((p) => (p.startsWith("<") ? p : p.toUpperCase()))
        .join("")
        .replace(/“/g, "'")
        .replace(/”/g, "'");
      return spans.join(" ") + " " + prose;
    });
    return { ok: true, status: 200, json: async () => out };
  };
  return { fetchImpl, calls };
}

type AstNode = {
  type: number;
  value?: unknown;
  options?: Record<string, { value: AstNode[] }>;
  children?: AstNode[];
};

const argsOf = (msg: string) => {
  const out = new Set<string>();
  const walk = (nodes: AstNode[]) => {
    for (const n of nodes) {
      if (typeof n.value === "string" && n.type !== 0) out.add(n.value);
      if (n.options) for (const o of Object.values(n.options)) walk(o.value);
      if (n.children) walk(n.children);
    }
  };
  walk(new IntlMessageFormat(msg, "en").getAst() as unknown as AstNode[]);
  return [...out].sort();
};

test("ICU plural / select / rich tags survive a translator that reorders everything", async () => {
  const { fetchImpl } = fakeGoogle();
  const sources = [
    "{count, plural, one {# file} other {# files}} found in {folder}",
    "Applied “{template}” to {count, plural, =0 {no key} one {# key} other {# keys}}",
    "{gender, select, female {She} male {He} other {They}} replied",
    "NVIDIA NIM rejects <code>thinking</code> params",
    "Writes '<path>'.generated beside the file",
    "  Keep surrounding whitespace  ",
  ];
  const out = await google.translateStringsWithGoogle(sources, "de", { fetchImpl, backoffMs: 1 });
  out.forEach((t: string | null, i: number) => {
    assert.ok(t, `restored: ${sources[i]}`);
    assert.doesNotThrow(() => new IntlMessageFormat(t!, "de"), t!);
    assert.deepEqual(argsOf(t!), argsOf(sources[i]), t!);
  });
  assert.match(out[0]!, /^\{count, plural, one \{# FILE\} other \{# FILES\}\}/);
  assert.ok(out[2]!.includes("{gender, select, female {SHE} male {HE} other {THEY}}"));
  assert.ok(out[3]!.includes("<code>THINKING</code>"));
  assert.ok(out[4]!.includes("'<path>'"));
  assert.ok(out[5]!.startsWith("  ") && out[5]!.endsWith("  "));
});

test("parseIcuMessage keeps the scaffolding verbatim", () => {
  const nodes = google.parseIcuMessage("Used by {count, plural, one {# batch} other {# batches}}");
  assert.equal(nodes[0].text, "Used by ");
  assert.equal(nodes[1].complex.head, "{count, plural,");
  assert.deepEqual(
    nodes[1].complex.options.map((o: { head: string }) => o.head.trim()),
    ["one {", "other {"]
  );
});

test("the LLM entry points fall back to Google and the first quota error opens the circuit", async () => {
  backendLib.resetLlmCircuit();
  let llmCalls = 0;
  const backend = {
    model: "m",
    callChat: async () => {
      llmCalls++;
      throw new Error('upstream 429: {"error":"weekly quota exhausted"}');
    },
    googleStrings: async (texts: string[]) => texts.map((t) => `G:${t}`),
  };
  const locale = { code: "de", english: "German" };
  assert.equal(await backendLib.translateString("Hello", locale, backend), "G:Hello");
  assert.equal(backendLib.llmCircuit.open, true, "quota error opens the circuit");
  const batch = await backendLib.translateBatch(
    [
      { id: "a", text: "One" },
      { id: "b", text: "Two" },
    ],
    locale,
    backend
  );
  assert.deepEqual(
    [...batch.entries()],
    [
      ["a", "G:One"],
      ["b", "G:Two"],
    ]
  );
  const multi = await backendLib.translateMultiLocaleBatch(
    [{ id: "k", text: "Save" }],
    [locale, { code: "fr", english: "French" }],
    backend
  );
  assert.deepEqual(multi.failedLocales, []);
  assert.equal(multi.perLocale.get("fr").get("k"), "G:Save");
  assert.equal(llmCalls, 1, "after the circuit opens the LLM is not called again");
  backendLib.resetLlmCircuit();
});

test("a non-quota LLM failure falls back without opening the circuit; =0 disables it", async () => {
  backendLib.resetLlmCircuit();
  const locale = { code: "de", english: "German" };
  const backend = {
    model: "m",
    callChat: async () => {
      throw new Error("upstream 500: boom");
    },
    googleStrings: async (texts: string[]) => texts.map((t) => `G:${t}`),
  };
  assert.equal(await backendLib.translateString("Hi", locale, backend), "G:Hi");
  assert.equal(backendLib.llmCircuit.open, false);
  await assert.rejects(
    backendLib.translateString("Hi", locale, { ...backend, googleFallback: false }),
    /upstream 500/
  );
  assert.equal(backendLib.isQuotaLike(new Error("upstream 402: insufficient credits")), true);
  assert.equal(backendLib.isQuotaLike(new Error("upstream 500: boom")), false);
  assert.equal(backendLib.translationEngine({ OMNIROUTE_TRANSLATION_ENGINE: "google" }), "google");
  assert.equal(
    backendLib.googleFallbackEnabled({ OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK: "0" }),
    false
  );
});

test("the google engine skips the LLM entirely and needs no LLM variables", async () => {
  backendLib.resetLlmCircuit();
  const prev = process.env.OMNIROUTE_TRANSLATION_ENGINE;
  process.env.OMNIROUTE_TRANSLATION_ENGINE = "google";
  try {
    const cfg = backendLib.backendConfig();
    assert.equal(cfg.engine, "google");
    let llm = 0;
    const out = await backendLib.translateString(
      "Hello",
      { code: "de" },
      { ...cfg, callChat: async () => (llm++, "x"), googleStrings: async () => ["Hallo"] }
    );
    assert.equal(out, "Hallo");
    assert.equal(llm, 0);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_TRANSLATION_ENGINE;
    else process.env.OMNIROUTE_TRANSLATION_ENGINE = prev;
  }
});

test("three consecutive non-quota LLM failures open the circuit; a success resets the count", async () => {
  backendLib.resetLlmCircuit();
  const locale = { code: "de", english: "German" };
  let llmCalls = 0;
  let fail = true;
  const backend = {
    model: "m",
    callChat: async () => {
      llmCalls++;
      if (fail) throw new Error("timeout after 60000ms");
      return "ok";
    },
    googleStrings: async (texts: string[]) => texts.map((t) => `G:${t}`),
  };
  await backendLib.translateString("a", locale, backend);
  await backendLib.translateString("b", locale, backend);
  assert.equal(backendLib.llmCircuit.open, false, "two failures are not enough");
  fail = false;
  await backendLib.translateString("c", locale, backend);
  assert.equal(backendLib.llmCircuit.failures, 0, "a success resets the streak");
  fail = true;
  for (const t of ["d", "e", "f"]) await backendLib.translateString(t, locale, backend);
  assert.equal(backendLib.llmCircuit.open, true, "three in a row open it");
  const before = llmCalls;
  assert.equal(await backendLib.translateString("g", locale, backend), "G:g");
  assert.equal(llmCalls, before, "an open circuit skips the LLM");
  backendLib.resetLlmCircuit();
});
