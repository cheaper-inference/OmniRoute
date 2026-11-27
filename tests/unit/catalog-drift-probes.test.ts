import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { activeCatalogIds, catalogPoolValue, summarizeCatalogRows } =
  await import("../../scripts/quality/catalog-drift/catalog.mjs");
const { backsFindings, classifyResponse, evaluateProbe, measureText } =
  await import("../../scripts/quality/catalog-drift/probes.mjs");

function row(modelId: string, freeType = "recurring-daily", provider = "p") {
  return { provider, modelId, freeType, poolKey: "x" as string | null, monthlyTokens: 0 };
}

function probe(type: "model-list" | "json-assert" | "page-text") {
  return {
    id: "a",
    provider: "p",
    type,
    url: "https://api.example.com",
    addedAt: "2026-11-09",
    source: "public-api" as const,
  };
}

function source(text: string) {
  return { ok: true as const, status: 200, contentType: "", text };
}

test("activeCatalogIds ignores discontinued and one-time rows", () => {
  const rows = [
    row("e", "keyless"),
    row("a"),
    row("b", "discontinued"),
    row("c", "one-time-initial"),
    row("d", "recurring-uncapped"),
    row("a"),
    row("f", "keyless", "other"),
  ];
  assert.deepEqual(activeCatalogIds(rows, "p"), ["a", "d", "e"]);
});

test("catalogPoolValue takes the max of matching rows and 0 when none", () => {
  const rows = [
    row("a"),
    { ...row("b"), monthlyTokens: 150_000_000 },
    { ...row("c"), poolKey: null, monthlyTokens: 3 },
    { ...row("a", "recurring-daily", "other"), monthlyTokens: 200_000_000 },
  ];
  assert.equal(catalogPoolValue(rows, { provider: "p", poolKey: "x" }), 150_000_000);
  assert.equal(catalogPoolValue(rows, { provider: "p", poolKey: null }), 3);
  assert.equal(catalogPoolValue(rows, { provider: "p", modelId: "a" }), 0);
  assert.equal(catalogPoolValue(rows, { provider: "absent" }), 0);
});

test("summarizeCatalogRows keeps only the four fields, discontinued included", () => {
  const rows = [row("a", "discontinued"), row("b", "keyless", "other")];
  assert.deepEqual(summarizeCatalogRows(rows, "p"), [
    { modelId: "a", poolKey: "x", monthlyTokens: 0, freeType: "discontinued" },
  ]);
});

test("model-list reports missing catalog ids as drift and new ids as info", () => {
  const result = evaluateProbe(
    { ...probe("model-list"), minIds: 1, filter: { field: "tier", equals: "free" } },
    source(
      '{"data":[{"id":"m1","tier":"free"},{"id":"m4","tier":"free"},{"id":"m2","tier":"paid"}]}'
    ),
    { catalogRows: [row("m1"), row("m2"), row("m3")] }
  );
  assert.deepEqual(
    result.findings.map(({ kind, severity, details }) => ({ kind, severity, details })),
    [
      { kind: "ids-missing", severity: "drift", details: { ids: ["m2", "m3"] } },
      { kind: "ids-added", severity: "info", details: { ids: ["m4"] } },
    ]
  );
  assert.equal(result.findings[0].message, "2 catalog model ids are no longer listed as free");
  assert.deepEqual(result.stats, { liveIds: 2, catalogIds: 3, aliveCatalogIds: 1 });
});

test("model-list applies ignoreIds and idTransform before comparing", () => {
  const ctx = { catalogRows: [row("trinity-mini:free"), row("auto")] };
  const body = source('{"data":[{"id":"arcee-ai/trinity-mini:free"}]}');
  const modelProbe = { ...probe("model-list"), ignoreIds: ["auto"], minIds: 1 };
  assert.deepEqual(
    evaluateProbe({ ...modelProbe, idTransform: { addPrefix: "arcee-ai/" } }, body, ctx).findings,
    []
  );
  const missing = evaluateProbe(modelProbe, body, ctx).findings.find(
    ({ kind }) => kind === "ids-missing"
  );
  assert.deepEqual(missing?.details.ids, ["trinity-mini:free"]);
  assert.deepEqual(
    evaluateProbe(
      { ...modelProbe, idTransform: { stripPrefix: "old/", addPrefix: "arcee-ai/" } },
      body,
      { catalogRows: [row("old/trinity-mini:free")] }
    ).findings,
    []
  );
});

test("filters idEndsWith and zeroPricing", () => {
  const body = source(
    JSON.stringify({
      data: [
        { id: "a:free", pricing: { prompt: "0", completion: 0 } },
        { id: "b", pricing: { prompt: 0, completion: 0.1 } },
        { id: "c", pricing: { prompt: "", completion: null } },
        { id: { endsWith: true }, pricing: { prompt: 0, completion: 0 } },
      ],
    })
  );
  const ctx = { catalogRows: [row("a:free")] };
  for (const filter of [
    { idEndsWith: ":free" },
    { zeroPricing: ["pricing.prompt", "pricing.completion"] },
  ]) {
    const result = evaluateProbe({ ...probe("model-list"), minIds: 1, filter }, body, ctx);
    assert.deepEqual(result.findings, []);
    assert.deepEqual(result.stats, { liveIds: 1, catalogIds: 1, aliveCatalogIds: 1 });
  }
});

test("json-assert reports each failed assertion and returns stats for includesCatalogIds", () => {
  const path = "plans[code=free].models";
  const assertions = [
    { path, op: "lengthAtLeast" as const, value: 1 },
    { path, op: "includesCatalogIds" as const },
  ];
  const body = source('{"plans":[{"code":"free","models":[]}]}');
  const ctx = { catalogRows: [row("q1")] };
  const result = evaluateProbe({ ...probe("json-assert"), assertions }, body, ctx);
  assert.deepEqual(
    result.findings.map(({ kind }) => kind),
    ["assertion-failed", "assertion-failed"]
  );
  assert.deepEqual(result.findings[0].details, {
    path,
    op: "lengthAtLeast",
    expected: 1,
    actual: 0,
  });
  assert.deepEqual(result.findings[1].details, {
    path,
    op: "includesCatalogIds",
    expected: ["q1"],
    actual: [],
    missing: ["q1"],
  });
  assert.deepEqual(result.stats, { liveIds: 0, catalogIds: 1, aliveCatalogIds: 0 });
  assert.equal(
    evaluateProbe({ ...probe("json-assert"), assertions: assertions.slice(0, 1) }, body, ctx).stats,
    null
  );
});

test("page-text checks phrases after normalization", () => {
  const mustContain = ["Free mode lets you create API keys"];
  const mustNotContain = ["doesn't include API access"];
  const result = evaluateProbe(
    { ...probe("page-text"), mustContain, mustNotContain },
    source("<p>Free mode includes a monthly usage budget. It doesn\u2019t include API access.</p>"),
    { catalogRows: [] }
  );
  assert.deepEqual(
    result.findings.map(({ kind, details }) => ({ kind, details })),
    [
      { kind: "phrase-missing", details: { phrase: mustContain[0] } },
      { kind: "phrase-present", details: { phrase: mustNotContain[0] } },
    ]
  );
});

test("page-text mustContainCatalogIds flags ids absent from the page", () => {
  const result = evaluateProbe(
    { ...probe("page-text"), mustContainCatalogIds: true },
    source("<p>Available: openai/gpt-oss-120b and qwen/qwen3.6-27b-new.</p>"),
    { catalogRows: [row("openai/gpt-oss-120b"), row("qwen/qwen3.6-27b")] }
  );
  assert.equal(result.findings[0].kind, "phrase-missing");
  assert.deepEqual(result.findings[0].details.ids, ["qwen/qwen3.6-27b"]);
});

test("page-text excerpt: changed hash and missing anchor", () => {
  const expected = "0000000000000000";
  const excerptProbe = {
    ...probe("page-text"),
    excerpt: { anchor: "Free token", chars: 400, sha256_16: expected },
  };
  const ctx = { catalogRows: [] };
  const changed = evaluateProbe(excerptProbe, source("Free token " + "x".repeat(350)), ctx);
  const finding = changed.findings[0];
  assert.equal(finding.kind, "excerpt-changed");
  assert.equal(finding.details.expected, expected);
  assert.match(String(finding.details.actual), /^[a-f0-9]{16}$/);
  assert.notEqual(finding.details.actual, expected);
  assert.equal(String(finding.details.excerpt).slice(0, 11), "free token ");
  assert.ok(String(finding.details.excerpt).length <= 280);
  assert.equal(
    evaluateProbe(excerptProbe, source("Usage"), ctx).findings[0].kind,
    "anchor-missing"
  );
});

test("classifyResponse flags degraded responses", () => {
  const model = { ...probe("model-list"), minIds: 2 };
  const page = { ...probe("page-text"), mustContain: ["Quota today", "Another phrase"] };
  const short = source("<p>Public documentation text</p>");
  const json = probe("json-assert");
  assert.equal(classifyResponse(model, source('{"data":[{"id":"one"}]}')), "invalid-response");
  assert.equal(classifyResponse(model, source('{"data":[{"id":"one"},{"id":"two"}]}')), "ok");
  assert.equal(classifyResponse(json, source("broken")), "invalid-response");
  assert.equal(
    classifyResponse(json, source('{"error":{"message":"Please retry"}}')),
    "invalid-response"
  );
  assert.equal(
    classifyResponse(json, source('{"errors":[{"message":"Please retry"}]}')),
    "invalid-response"
  );
  assert.equal(classifyResponse(json, source("{}")), "ok");
  for (const marker of [
    "Just a moment...",
    "cf-chl",
    "Attention Required",
    "Enable JavaScript and cookies",
  ]) {
    assert.equal(classifyResponse(page, source(marker + " ".padEnd(300, "x"))), "invalid-response");
  }
  assert.equal(classifyResponse(page, short), "invalid-response");
  assert.equal(classifyResponse({ ...page, minTextChars: 20 }, short), "ok");
  const shortWithoutPhrases = source("x".repeat(300));
  assert.equal(classifyResponse(page, shortWithoutPhrases, 1000), "invalid-response");
  assert.equal(classifyResponse(page, shortWithoutPhrases, null), "ok");
  assert.equal(classifyResponse(page, source("Quota today " + "x".repeat(300)), 1000), "ok");
  assert.equal(measureText(page, short), 25);
  assert.equal(measureText(model, short), null);
});

test("backsFindings flags catalog values that disagree with the manifest", () => {
  const rows = [
    {
      ...row("m", "recurring-monthly", "mistral"),
      poolKey: "mistral",
      monthlyTokens: 1_000_000_000,
    },
  ];
  const page = { ...probe("page-text"), provider: "mistral" };
  const back = { provider: "mistral", poolKey: "mistral", monthlyTokens: 0 };
  const findings = backsFindings({ ...page, backs: [back] }, rows);
  assert.equal(findings.length, 1);
  const [finding] = findings;
  assert.equal(finding.kind, "manifest-out-of-sync");
  assert.equal(finding.severity, "drift");
  assert.deepEqual(finding.details, {
    provider: "mistral",
    poolKey: "mistral",
    expected: 0,
    catalog: 1_000_000_000,
  });
  assert.match(finding.message, /one of the two is stale/);
  assert.deepEqual(
    backsFindings({ ...page, backs: [{ ...back, monthlyTokens: 1_000_000_000 }] }, rows),
    []
  );
});
