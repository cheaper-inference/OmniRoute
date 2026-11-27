import assert from "node:assert/strict";
import { test } from "node:test";

let unexpectedFetches = 0;
globalThis.fetch = () => {
  unexpectedFetches++;
  throw new Error("network access in tests");
};

const { compareProviderListing } = await import("../../scripts/quality/catalog-drift/registry.mjs");
const { validateManifest } = await import("../../scripts/quality/catalog-drift/manifest.mjs");
const { runDrift } = await import("../../scripts/quality/catalog-drift/run.mjs");
const { DRIFT_KINDS } = await import("../../scripts/quality/catalog-drift/probes.mjs");
const { renderMarkdown, providerFingerprint } =
  await import("../../scripts/quality/catalog-drift/report.mjs");
const { planIssueActions } = await import("../../scripts/quality/catalog-drift/issues.mjs");

const runAt = "2026-11-26T12:00:00.000Z";
const host = "api.example.com";
const probe = {
  id: "registry-models",
  provider: "synthetic",
  type: "model-list",
  scope: "registry",
  source: "public-api",
  addedAt: "2026-11-25",
  url: "https://api.example.com/v1/models?format=json#models",
} as const;
const manifest = {
  schemaVersion: 1,
  reviewedAt: "2026-11-25",
  allowedHosts: [host],
  probes: [probe],
} as const;

test("compares exact, unique IDs in code-unit order", () => {
  assert.deepEqual(
    compareProviderListing(["org/A", "org/B"], {
      status: "complete",
      httpStatus: 200,
      checkedAt: runAt,
      ids: ["org/a", "org/B"],
    }),
    { status: "compared", declaredOnly: ["org/A"], listedOnly: ["org/a"] }
  );
  assert.deepEqual(
    compareProviderListing(["b", "a", "a", "Z"], {
      status: "complete",
      httpStatus: 200,
      checkedAt: runAt,
      ids: ["e", "E", "e", "Z", "a"],
    }),
    { status: "compared", declaredOnly: ["b"], listedOnly: ["E", "e"] }
  );
});

test("incomplete observations never yield differences", () => {
  for (const status of ["auth-required", "invalid", "partial"] as const) {
    assert.deepEqual(
      compareProviderListing(["org/A"], { status, httpStatus: 200, checkedAt: runAt }),
      { status: "inconclusive", reason: status }
    );
  }
});

test("registry probe options apply only to unfiltered official model lists", () => {
  assert.deepEqual(validateManifest(manifest), []);
  assert.deepEqual(
    validateManifest({ ...manifest, probes: [{ ...probe, unpaginated: true }] }),
    []
  );
  for (const invalid of [
    { scope: "unknown" },
    { scope: undefined, unpaginated: true, minIds: 1 },
    { type: "json-assert", assertions: [{ path: "data", op: "lengthEquals", value: 0 }] },
    { source: "public-docs" },
    { idsPath: "data[tier=free]" },
    { minIds: 1 },
    { filter: { idEndsWith: ":free" } },
    { ignoreIds: ["org/A"] },
    { idTransform: { stripPrefix: "org/" } },
    { backs: [] },
    { registryVirtualIds: [""] },
    { url: "https://api.example.com/v1/models?api_key=sentinel" },
  ]) {
    assert.notDeepEqual(validateManifest({ ...manifest, probes: [{ ...probe, ...invalid }] }), []);
  }
});

test("registry HTTP replay reports evidence and leaves issue planning and state alone", async () => {
  const listedId = "hf:openai/gpt-oss-120b";
  const alias = "syn:gpt-oss-120b";
  const virtualId = "hf:moonshotai/Kimi-K2.7-Code";
  const cursorLabel = "cursor-grok-4.7-low-256k";
  const cases = [
    { id: "unauthorized", httpStatus: 401, status: "auth-required" },
    { id: "forbidden", httpStatus: 403, status: "auth-required" },
    { id: "not-found", httpStatus: 404, status: "unsupported" },
    { id: "rate-limited", httpStatus: 429, status: "unavailable" },
    { id: "upstream-error", httpStatus: 503, status: "unavailable" },
    { id: "timeout", httpStatus: null, status: "unavailable" },
    { id: "invalid-json", httpStatus: 200, body: "<html>", status: "invalid" },
    { id: "invalid-id", httpStatus: 200, body: { data: [{}], has_more: false }, status: "invalid" },
    { id: "empty-unproven", httpStatus: 200, body: { data: [] }, status: "partial" },
    {
      id: "empty-terminal",
      httpStatus: 200,
      body: { data: [], has_more: false },
      status: "complete",
    },
    {
      id: "empty-unpaginated",
      httpStatus: 200,
      body: { data: [] },
      unpaginated: true,
      status: "complete",
    },
    {
      id: "partial-body",
      httpStatus: 200,
      body: { data: [listedId], has_more: true },
      unpaginated: true,
      status: "partial",
    },
    {
      id: "partial-header",
      httpStatus: 200,
      body: { data: [], has_more: false },
      headers: { link: '<https://api.example.com/v1/models?page=2>; rel="next"' },
      status: "partial",
    },
    {
      id: "mixed",
      httpStatus: 200,
      body: {
        data: [{ id: alias }, { id: virtualId }, { id: listedId }, { id: "org/a" }],
        has_more: false,
      },
      registryVirtualIds: [virtualId],
      status: "complete",
    },
    {
      id: "mapped",
      httpStatus: 200,
      body: { data: ["grok-4.7", cursorLabel], has_more: false },
      provider: "cursor",
      status: "complete",
    },
  ] as const;
  const inputs = new Map<string, (typeof cases)[number]>(cases.map((entry) => [entry.id, entry]));
  const probes = cases.map((entry) => ({
    ...probe,
    id: entry.id,
    provider: "provider" in entry ? entry.provider : probe.provider,
    url: probe.url.replace("/v1/models", "/" + entry.id + "/models"),
    ...("unpaginated" in entry && { unpaginated: entry.unpaginated }),
    ...("registryVirtualIds" in entry && { registryVirtualIds: entry.registryVirtualIds }),
  }));
  const freeProbe = {
    ...probe,
    id: "free-models",
    url: "https://api.example.com/free/models",
    scope: undefined,
    minIds: 1,
  };
  const options = {
    manifest: { ...manifest, allowedHosts: [host], probes: [freeProbe, ...probes] },
    catalogRows: [
      {
        provider: "synthetic",
        modelId: "org/free",
        poolKey: null,
        monthlyTokens: 1,
        freeType: "free",
      },
    ],
    catalogCuratedAt: "2026-11-25",
    sleep: async () => {},
    now: () => Date.parse(runAt),
    fetchImpl: async (input: string, init: RequestInit) => {
      assert.equal(init.method, "GET");
      assert.equal(init.credentials, "omit");
      assert.equal(new Headers(init.headers).has("authorization"), false);
      const id = new URL(input).pathname.split("/")[1];
      if (id === "free") return Response.json({ data: ["org/other-free"] });
      const entry = inputs.get(id);
      assert.ok(entry);
      if (entry.httpStatus === null) throw new DOMException("timed out", "TimeoutError");
      const body = "body" in entry ? entry.body : null;
      const headers = "headers" in entry ? entry.headers : undefined;
      return new Response(typeof body === "string" ? body : JSON.stringify(body), {
        status: entry.httpStatus,
        headers,
      });
    },
  };

  const { state: firstState } = await runDrift(options);
  const { report, state } = await runDrift({ ...options, state: firstState });
  const { report: freeReport, state: freeState } = await runDrift({
    ...options,
    manifest: { ...options.manifest, probes: [freeProbe] },
    state: firstState,
  });
  assert.deepEqual(report.providers, freeReport.providers);
  assert.deepEqual(state, freeState);
  const issueArgs = { issues: [], runUrl: "https://example.com/runs/1" };
  assert.ok(
    planIssueActions({ ...issueArgs, report: freeReport }).some(({ type }) => type === "create")
  );
  assert.deepEqual(
    planIssueActions({ ...issueArgs, report }),
    planIssueActions({ ...issueArgs, report: freeReport })
  );
  const markdown = renderMarkdown(report);
  assert.ok(markdown.startsWith(renderMarkdown(freeReport)));
  assert.match(markdown, /## Registry model listings/);
  assert.equal(unexpectedFetches, 0);

  for (const expected of cases) {
    const result = JSON.parse(JSON.stringify(report)).probes.find(
      ({ id }: { id: string }) => id === expected.id
    );
    assert.equal(result.scope, "registry");
    assert.equal(result.url, "https://api.example.com/" + expected.id + "/models");
    assert.equal(result.listing.checkedAt, runAt);
    assert.equal(result.listing.httpStatus, expected.httpStatus);
    assert.equal(result.listing.status, expected.status);
    const [finding] = result.findings;
    assert.equal(result.findings.length, 1);
    assert.equal(finding.severity, "info");
    assert.equal(providerFingerprint(result.findings), null);
    assert.ok(!DRIFT_KINDS.includes(finding.kind));
    assert.ok(markdown.includes(expected.id));
    assert.ok(markdown.includes(expected.status));
    if (expected.status !== "complete") {
      assert.equal(finding.kind, "registry-inconclusive");
      assert.deepEqual(finding.details, { reason: expected.status });
      assert.equal(Object.hasOwn(result.listing, "ids"), false);
    } else {
      assert.equal(finding.kind, "registry-diff");
      assert.ok(Array.isArray(finding.details.declaredOnly));
      assert.deepEqual(finding.details.listedOnly, expected.id === "mixed" ? ["org/a"] : []);
      if (expected.id === "mixed") {
        assert.ok(
          result.declared.aliases.some(
            ({ id, targetId }: { id: string; targetId: string }) =>
              id === alias && targetId === listedId
          )
        );
        assert.ok(result.declared.virtual.some(({ id }: { id: string }) => id === virtualId));
        assert.ok(!finding.details.declaredOnly.includes(virtualId));
        assert.ok(!finding.details.declaredOnly.includes(listedId));
      } else if (expected.id === "mapped") {
        assert.ok(
          result.declared.virtual.some(
            ({ id, targetIds }: { id: string; targetIds: string[] }) =>
              id === cursorLabel && targetIds.includes("grok-4.7")
          )
        );
        assert.ok(!finding.details.declaredOnly.includes("grok-4.7"));
      } else {
        assert.deepEqual(result.listing.ids, []);
        assert.ok(finding.details.declaredOnly.includes(listedId));
      }
    }
  }
});
