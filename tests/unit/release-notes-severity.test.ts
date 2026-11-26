import test from "node:test";
import assert from "node:assert/strict";

const releaseNotes = await import("../../src/shared/utils/releaseNotes.ts");

const NOW = new Date("2026-11-26T12:00:00.000Z");
const ENABLED = { severityEnabled: true, now: NOW };
const DISABLED = { severityEnabled: false, now: NOW };

function v3Item(overrides: Record<string, unknown> = {}) {
  return {
    id: "notice",
    active: true,
    publishedAt: "2026-11-20T00:00:00.000Z",
    severity: "info",
    text: { en: { title: "Notice", message: "English" } },
    icon: "campaign",
    ...overrides,
  };
}

function v3(items: unknown[]) {
  return { schemaVersion: 3, items };
}

const legacyV2 = {
  schemaVersion: 2,
  items: [
    {
      id: "older",
      active: true,
      publishedAt: "2026-08-08T12:00:00.000Z",
      text: { en: { title: "Older", message: "English" } },
      icon: "info",
    },
  ],
};

const legacySingular = { active: true, title: "Launch", message: "A short announcement" };

test("the v2 feed and the singular shape read as info through the severity reader", () => {
  const fromV2 = releaseNotes.listVisibleNews(legacyV2, "en", ENABLED);
  assert.equal(fromV2.length, 1);
  assert.equal(fromV2[0]?.severity, "info");
  assert.equal(fromV2[0]?.expiresAt, undefined);

  const fromSingular = releaseNotes.listVisibleNews(legacySingular, "en", ENABLED);
  assert.equal(fromSingular[0]?.severity, "info");
});

test("with the flag off the reader is the current reader and ignores v3 payloads", () => {
  const off = releaseNotes.listVisibleNews(legacyV2, "en", DISABLED);
  const current = releaseNotes.listActiveNews(legacyV2, "en", NOW);
  assert.deepEqual(
    off.map(({ severity, ...rest }: { severity: string }) => rest),
    current
  );
  assert.ok(off.every((item: { severity: string }) => item.severity === "info"));
  assert.deepEqual(releaseNotes.listVisibleNews(v3([v3Item()]), "en", DISABLED), []);
});

test("the v3 feed carries severity, localized copy and hides expired entries", () => {
  const payload = v3([
    v3Item({
      id: "outage",
      severity: "critical",
      expiresAt: "2026-11-27T00:00:00.000Z",
      text: {
        en: { title: "Outage", message: "English" },
        "pt-BR": { title: "Falha", message: "Português" },
      },
    }),
    v3Item({
      id: "old-warning",
      severity: "warning",
      publishedAt: "2026-11-01T00:00:00.000Z",
      expiresAt: "2026-11-10T00:00:00.000Z",
    }),
    v3Item({ id: "future", publishedAt: "2026-12-01T00:00:00.000Z" }),
    v3Item({ id: "retracted", active: false }),
  ]);

  const visible = releaseNotes.listVisibleNews(payload, "pt-BR", ENABLED);
  assert.deepEqual(
    visible.map((item: { id: string; severity: string; title: string; expiresAt?: string }) => [
      item.id,
      item.severity,
      item.title,
      item.expiresAt,
    ]),
    [["outage", "critical", "Falha", "2026-11-27T00:00:00.000Z"]]
  );
  assert.equal(releaseNotes.listVisibleNews(payload, "fr", ENABLED)[0]?.title, "Outage");
});

test("an expired critical announcement is hidden, and the boundary instant is expired", () => {
  const payload = v3([
    v3Item({ id: "outage", severity: "critical", expiresAt: "2026-11-26T11:59:59.000Z" }),
  ]);
  assert.deepEqual(releaseNotes.listVisibleNews(payload, "pt-BR", ENABLED), []);

  const edge = v3([
    v3Item({ id: "outage", severity: "critical", expiresAt: "2026-11-26T12:00:00.000Z" }),
  ]);
  assert.deepEqual(releaseNotes.listVisibleNews(edge, "en", ENABLED), []);
  assert.equal(
    releaseNotes.listVisibleNews(edge, "en", {
      severityEnabled: true,
      now: new Date("2026-11-26T11:59:59.999Z"),
    }).length,
    1
  );
});

test("the closed v3 schema rejects a critical entry without expiry and unknown fields", () => {
  const rejects = (items: unknown[], extra: Record<string, unknown> = {}) =>
    releaseNotes.listVisibleNews({ ...v3(items), ...extra }, "en", ENABLED);

  assert.deepEqual(rejects([v3Item({ severity: "critical" })]), []);
  assert.deepEqual(rejects([v3Item({ severity: "urgent" })]), []);
  assert.deepEqual(rejects([v3Item({ severity: undefined })]), []);
  assert.deepEqual(rejects([v3Item({ extra: true })]), []);
  assert.deepEqual(rejects([v3Item()], { unexpected: true }), []);
  assert.deepEqual(rejects([v3Item({ link: "http://example.com/" })]), []);
  assert.deepEqual(rejects([v3Item(), v3Item()]), []);
  assert.deepEqual(rejects([v3Item({ expiresAt: "not-a-date" })]), []);
  assert.deepEqual(
    rejects([
      v3Item({ publishedAt: "2026-11-20T00:00:00.000Z", expiresAt: "2026-11-19T00:00:00.000Z" }),
    ]),
    []
  );
  // A warning may expire, and a plain info entry needs no expiry.
  assert.equal(
    rejects([v3Item({ severity: "warning", expiresAt: "2026-12-01T00:00:00.000Z" })]).length,
    1
  );
  assert.equal(rejects([v3Item()]).length, 1);
});

test("selectVisibleNews ranks severity before date and still honours dismissals", () => {
  const payload = v3([
    v3Item({ id: "newest-info", publishedAt: "2026-11-25T00:00:00.000Z" }),
    v3Item({
      id: "mid-warning",
      severity: "warning",
      publishedAt: "2026-11-22T00:00:00.000Z",
    }),
    v3Item({
      id: "old-critical",
      severity: "critical",
      publishedAt: "2026-11-10T00:00:00.000Z",
      expiresAt: "2026-12-10T00:00:00.000Z",
    }),
    v3Item({
      id: "new-critical",
      severity: "critical",
      publishedAt: "2026-11-24T00:00:00.000Z",
      expiresAt: "2026-12-10T00:00:00.000Z",
    }),
  ]);

  const select = (dismissed: string[]) =>
    releaseNotes.selectVisibleNews(payload, "en", new Set(dismissed), ENABLED)?.id;
  assert.equal(select([]), "new-critical");
  assert.equal(select(["new-critical"]), "old-critical");
  assert.equal(select(["new-critical", "old-critical"]), "mid-warning");
  assert.equal(select(["new-critical", "old-critical", "mid-warning"]), "newest-info");
  assert.equal(select(["new-critical", "old-critical", "mid-warning", "newest-info"]), undefined);

  // The list itself stays chronological, newest first.
  assert.deepEqual(
    releaseNotes.listVisibleNews(payload, "en", ENABLED).map((item: { id: string }) => item.id),
    ["newest-info", "new-critical", "mid-warning", "old-critical"]
  );
});

test("nextNewsTransitionMs points at the next publish or expiry instant", () => {
  const payload = v3([
    v3Item({ id: "soon", severity: "critical", expiresAt: "2026-11-26T12:00:30.000Z" }),
    v3Item({ id: "later", expiresAt: "2026-11-27T00:00:00.000Z" }),
    v3Item({ id: "scheduled", publishedAt: "2026-11-26T12:00:10.000Z" }),
    v3Item({ id: "retracted", active: false, expiresAt: "2026-11-26T12:00:01.000Z" }),
  ]);
  assert.equal(releaseNotes.nextNewsTransitionMs(payload, NOW), 10_000);
  assert.equal(
    releaseNotes.nextNewsTransitionMs(payload, new Date("2026-11-26T12:00:20.000Z")),
    10_000
  );
  assert.equal(
    releaseNotes.nextNewsTransitionMs(payload, new Date("2026-11-28T00:00:00.000Z")),
    null
  );
  assert.equal(releaseNotes.nextNewsTransitionMs(legacyV2, NOW), null);
  assert.equal(releaseNotes.nextNewsTransitionMs(v3([v3Item()]), NOW, false), null);
});

type FeedResponse = { ok: boolean; json?: () => Promise<unknown>; text?: () => Promise<string> };

function routedFetch(routes: Record<string, () => Promise<FeedResponse> | FeedResponse>) {
  const requested: Array<{ url: string; init: RequestInit }> = [];
  const fetchNews = async (url: string, init: RequestInit) => {
    requested.push({ url, init });
    const route = routes[url];
    if (!route) throw new Error(`unexpected request: ${url}`);
    return route();
  };
  return { fetchNews, requested };
}

const v2Response = (payload: unknown): FeedResponse => ({ ok: true, json: async () => payload });
const v3Response = (payload: unknown): FeedResponse => ({
  ok: true,
  text: async () => JSON.stringify(payload),
});

async function readNewsFromFixtures(
  v3Payload: FeedResponse | (() => Promise<never>),
  v2Payload: unknown,
  options: Record<string, unknown> = {}
) {
  const { fetchNews } = routedFetch({
    [releaseNotes.NEWS_V3_JSON_URL]: typeof v3Payload === "function" ? v3Payload : () => v3Payload,
    [releaseNotes.NEWS_JSON_URL]: () => v2Response(v2Payload),
  });
  const payload = await releaseNotes.fetchNewsPayload(fetchNews, undefined, {
    severityEnabled: true,
    ...options,
  });
  return releaseNotes.listVisibleNews(payload, "pt-BR", ENABLED);
}

const activeV2 = {
  schemaVersion: 2,
  items: [
    {
      id: "still-live",
      active: true,
      publishedAt: "2026-11-01T00:00:00.000Z",
      text: { en: { title: "Live in v2", message: "Retracted in v3" } },
      icon: "campaign",
    },
  ],
};

test("a valid empty v3 feed is authoritative and does not resurrect the v2 entries", async () => {
  assert.deepEqual(await readNewsFromFixtures(v3Response(v3([])), activeV2), []);
});

test("a v3 feed that retracts an id wins over the v2 feed that still lists it", async () => {
  const retracted = v3([v3Item({ id: "still-live", active: false })]);
  assert.deepEqual(await readNewsFromFixtures(v3Response(retracted), activeV2), []);
});

test("an unavailable, invalid or oversized v3 feed falls back to v2 as it is today", async () => {
  const expectFallback = async (
    v3Payload: FeedResponse | (() => Promise<never>),
    options: Record<string, unknown> = {}
  ) => {
    const news = await readNewsFromFixtures(v3Payload, activeV2, options);
    assert.deepEqual(
      news.map((item: { id: string; severity: string }) => [item.id, item.severity]),
      [["still-live", "info"]]
    );
  };

  await expectFallback({ ok: false, text: async () => "{}" });
  await expectFallback(async () => {
    throw new Error("offline");
  });
  await expectFallback({ ok: true, text: async () => "not json" });
  await expectFallback(v3Response(v3([v3Item({ severity: "critical" })])));
  await expectFallback(v3Response({ schemaVersion: 2, items: [] }));
  await expectFallback({
    ok: true,
    text: async () =>
      JSON.stringify(v3([v3Item({ text: { en: { title: "x", message: "y".repeat(70_000) } } })])),
  });
  await expectFallback({
    ok: true,
    headers: new Headers({ "content-length": "999999" }),
    text: async () => JSON.stringify(v3([])),
  } as FeedResponse);
});

test("a v3 request that never answers is cut off by the timeout and falls back to v2", async () => {
  const { fetchNews } = routedFetch({
    [releaseNotes.NEWS_V3_JSON_URL]: () => new Promise(() => {}),
    [releaseNotes.NEWS_JSON_URL]: () => v2Response(activeV2),
  });
  const abortAware = async (url: string, init: RequestInit) => {
    if (url !== releaseNotes.NEWS_V3_JSON_URL) return fetchNews(url, init);
    return new Promise<FeedResponse>((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new Error("aborted")));
    });
  };
  const payload = await releaseNotes.fetchNewsPayload(abortAware, undefined, {
    severityEnabled: true,
    v3TimeoutMs: 20,
  });
  assert.deepEqual(payload, activeV2);
});

test("the v3 request is a credential-free GET, and never happens with the flag off", async () => {
  const on = routedFetch({
    [releaseNotes.NEWS_V3_JSON_URL]: () => v3Response(v3([])),
  });
  await releaseNotes.fetchNewsPayload(on.fetchNews, undefined, { severityEnabled: true });
  assert.deepEqual(
    on.requested.map((entry) => entry.url),
    [releaseNotes.NEWS_V3_JSON_URL]
  );
  assert.equal(on.requested[0]?.init.method, undefined);
  assert.equal(on.requested[0]?.init.credentials, "omit");
  assert.equal(on.requested[0]?.init.referrerPolicy, "no-referrer");

  const off = routedFetch({
    [releaseNotes.NEWS_JSON_URL]: () => v2Response(activeV2),
  });
  const payload = await releaseNotes.fetchNewsPayload(off.fetchNews);
  assert.deepEqual(payload, activeV2);
  assert.deepEqual(
    off.requested.map((entry) => entry.url),
    [releaseNotes.NEWS_JSON_URL]
  );
  const flagOff = await releaseNotes.fetchNewsPayload(off.fetchNews, undefined, {
    severityEnabled: false,
  });
  assert.deepEqual(flagOff, activeV2);
  assert.equal(off.requested.length, 2);
  assert.ok(off.requested.every((entry) => entry.url === releaseNotes.NEWS_JSON_URL));
});
