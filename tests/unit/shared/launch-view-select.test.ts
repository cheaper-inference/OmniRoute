import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import {
  selectView,
  viewHash,
  globMatch,
  sha256Hex,
  WIRE_PROTOCOLS,
  VIEW_CATALOG_KINDS,
  type ViewCatalogRow,
  type ViewSelectSpec,
} from "../../../src/shared/launch/viewSelect.ts";

const nodeSha = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

function row(id: string, extra: Partial<ViewCatalogRow> = {}): ViewCatalogRow {
  return { id, capabilities: [], kind: "model", ...extra };
}

function spec(filter: ViewSelectSpec["filter"] = {}, rest: Partial<ViewSelectSpec> = {}) {
  return { name: "test", filter, ...rest } as ViewSelectSpec;
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

test("exports the protocol and kind vocabularies", () => {
  assert.deepEqual(
    [...WIRE_PROTOCOLS],
    ["anthropic-messages", "openai-responses", "openai-chat", "gemini-native"]
  );
  assert.deepEqual([...VIEW_CATALOG_KINDS], ["chat", "embedding", "image", "audio", "rerank"]);
});

test("default kinds is chat; missing type counts as chat", () => {
  const rows = [row("a"), row("b", { type: "chat" }), row("c", { type: "embedding" })];
  assert.deepEqual(selectView(rows, spec()).ids, ["a", "b"]);
  assert.deepEqual(selectView(rows, spec({ kinds: [] })).ids, ["a", "b"]);
});

test("kinds including embedding keeps embedding rows", () => {
  const rows = [row("a"), row("c", { type: "embedding" }), row("d", { type: "image" })];
  assert.deepEqual(selectView(rows, spec({ kinds: ["chat", "embedding"] })).ids, ["a", "c"]);
  assert.deepEqual(selectView(rows, spec({ kinds: ["embedding"] })).ids, ["c"]);
});

test("combos:false drops combo and auto rows only", () => {
  const rows = [row("m"), row("c", { kind: "combo" }), row("x", { kind: "auto" })];
  assert.deepEqual(selectView(rows, spec({ combos: false })).ids, ["m"]);
  assert.deepEqual(selectView(rows, spec({ combos: true })).ids, ["m", "c", "x"]);
  assert.deepEqual(selectView(rows, spec()).ids, ["m", "c", "x"]);
});

test("protocols filter keeps rows without protocols and matching rows", () => {
  const rows = [
    row("none"),
    row("match", { protocols: ["openai-chat", "gemini-native"] }),
    row("miss", { protocols: ["anthropic-messages"] }),
  ];
  const out = selectView(rows, spec({ protocols: ["openai-chat"] }));
  assert.deepEqual(out.ids, ["none", "match"]);
  assert.deepEqual(selectView(rows, spec({ protocols: [] })).ids, ["none", "match", "miss"]);
});

test("minContextTokens drops known-small and keeps unknown context", () => {
  const rows = [
    row("small", { contextTokens: 1000 }),
    row("big", { contextTokens: 200000 }),
    row("exact", { contextTokens: 8000 }),
    row("absent"),
    row("zero", { contextTokens: 0 }),
    row("nan", { contextTokens: Number.NaN }),
  ];
  const out = selectView(rows, spec({ minContextTokens: 8000 }));
  assert.deepEqual(out.ids, ["big", "exact", "absent", "zero", "nan"]);
});

test("requireKnownContext drops unknown context", () => {
  const rows = [
    row("known", { contextTokens: 5 }),
    row("absent"),
    row("zero", { contextTokens: 0 }),
    row("nan", { contextTokens: Number.NaN }),
    row("neg", { contextTokens: -4 }),
  ];
  assert.deepEqual(selectView(rows, spec({ requireKnownContext: true })).ids, ["known"]);
  const both = selectView(rows, spec({ requireKnownContext: true, minContextTokens: 10 }));
  assert.deepEqual(both.ids, []);
});

test("capabilities: every listed capability is required", () => {
  const rows = [
    row("both", { capabilities: ["vision", "reasoning"] }),
    row("one", { capabilities: ["vision"] }),
    row("none"),
  ];
  assert.deepEqual(selectView(rows, spec({ capabilities: ["vision", "reasoning"] })).ids, ["both"]);
  assert.deepEqual(selectView(rows, spec({ capabilities: ["vision"] })).ids, ["both", "one"]);
});

test("tools and tool_calling are interchangeable in both directions", () => {
  const rows = [
    row("t", { capabilities: ["tools"] }),
    row("tc", { capabilities: ["tool_calling"] }),
    row("other", { capabilities: ["vision"] }),
  ];
  assert.deepEqual(selectView(rows, spec({ capabilities: ["tools"] })).ids, ["t", "tc"]);
  assert.deepEqual(selectView(rows, spec({ capabilities: ["tool_calling"] })).ids, ["t", "tc"]);
});

test("includeIds and excludeIds globs; exclude wins", () => {
  const rows = [
    row("openai/gpt-4"),
    row("openai/gpt-5"),
    row("anthropic/claude"),
    row("gpt-mini"),
    row("gpt"),
  ];
  assert.deepEqual(selectView(rows, spec({ includeIds: ["openai/*"] })).ids, [
    "openai/gpt-4",
    "openai/gpt-5",
  ]);
  assert.deepEqual(selectView(rows, spec({ includeIds: ["*claude"] })).ids, ["anthropic/claude"]);
  assert.deepEqual(selectView(rows, spec({ includeIds: ["*/gpt-*"] })).ids, [
    "openai/gpt-4",
    "openai/gpt-5",
  ]);
  assert.deepEqual(selectView(rows, spec({ includeIds: ["gpt"] })).ids, ["gpt"]);
  assert.deepEqual(selectView(rows, spec({ includeIds: [] })).ids.length, 5);
  const out = selectView(rows, spec({ includeIds: ["openai/*"], excludeIds: ["*gpt-5"] }));
  assert.deepEqual(out.ids, ["openai/gpt-4"]);
  assert.deepEqual(selectView(rows, spec({ excludeIds: ["gpt-mini", "anthropic/*"] })).ids, [
    "openai/gpt-4",
    "openai/gpt-5",
    "gpt",
  ]);
});

test("globMatch unit cases", () => {
  assert.equal(globMatch("abc", "abc"), true);
  assert.equal(globMatch("abc", "abcd"), false);
  assert.equal(globMatch("", ""), true);
  assert.equal(globMatch("*", ""), true);
  assert.equal(globMatch("*", "anything"), true);
  assert.equal(globMatch("a*", "a"), true);
  assert.equal(globMatch("a*", "abc"), true);
  assert.equal(globMatch("a*", "ba"), false);
  assert.equal(globMatch("*c", "abc"), true);
  assert.equal(globMatch("*c", "cb"), false);
  assert.equal(globMatch("a*c", "abc"), true);
  assert.equal(globMatch("a*c", "ac"), true);
  assert.equal(globMatch("a*c*e", "abcde"), true);
  assert.equal(globMatch("a*c*e", "abde"), false);
  assert.equal(globMatch("a**c", "abc"), true);
  assert.equal(globMatch("ab*ba", "aba"), false);
  assert.equal(globMatch("ab*ba", "abba"), true);
  assert.equal(globMatch("ab*ba", "abxba"), true);
  assert.equal(globMatch("a*b*c", "abc"), true);
  assert.equal(globMatch("a*bc*c", "abc"), false);
  assert.equal(globMatch("a.c", "abc"), false);
  assert.equal(globMatch("a.c", "a.c"), true);
});

test("dedupe keeps the first occurrence", () => {
  const rows = [
    row("a", { label: "first" }),
    row("b"),
    row("a", { label: "second" }),
    row("b", { kind: "combo" }),
  ];
  const out = selectView(rows, spec());
  assert.deepEqual(out.ids, ["a", "b"]);
  assert.equal(out.rows[0].label, "first");
  assert.equal(out.rows[1].kind, "model");
});

test("preferences order: favorites, then recent, then catalog order", () => {
  const rows = [row("a"), row("b"), row("c"), row("d"), row("e")];
  const out = selectView(rows, spec(), { favorites: ["d", "b"], recent: ["e", "a"] });
  assert.deepEqual(out.ids, ["d", "b", "e", "a", "c"]);
});

test("ids in both lists rank by first position; unknown prefs ignored", () => {
  const rows = [row("a"), row("b"), row("c")];
  const out = selectView(rows, spec(), {
    favorites: ["c", "ghost"],
    recent: ["b", "c", "phantom"],
  });
  assert.deepEqual(out.ids, ["c", "b", "a"]);
  assert.deepEqual(selectView(rows, spec(), { recent: ["b"] }).ids, ["b", "a", "c"]);
});

test("explicit preferences order equals default; catalog order ignores prefs", () => {
  const rows = [row("a"), row("b"), row("c")];
  const prefs = { favorites: ["c"], recent: ["b"] };
  assert.deepEqual(
    selectView(rows, spec({}, { order: "preferences" }), prefs).ids,
    selectView(rows, spec(), prefs).ids
  );
  assert.deepEqual(selectView(rows, spec({}, { order: "catalog" }), prefs).ids, ["a", "b", "c"]);
});

test("limit is applied after ordering; 0 yields empty", () => {
  const rows = [row("a"), row("b"), row("c"), row("d")];
  const prefs = { favorites: ["d"] };
  assert.deepEqual(selectView(rows, spec({}, { limit: 2 }), prefs).ids, ["d", "a"]);
  assert.deepEqual(selectView(rows, spec({}, { limit: 0 }), prefs).ids, []);
  assert.deepEqual(selectView(rows, spec({}, { limit: 99 })).ids, ["a", "b", "c", "d"]);
  assert.deepEqual(selectView(rows, spec({}, { limit: 2, order: "catalog" }), prefs).ids, [
    "a",
    "b",
  ]);
  const empty = selectView(rows, spec({}, { limit: 0 }));
  assert.deepEqual(empty.rows, []);
  assert.equal(empty.hash, nodeSha("[]"));
});

test("output rows drop catalog-only keys and non-positive token counts", () => {
  const rows = [
    row("a", {
      type: "chat",
      protocols: ["openai-chat"],
      contextTokens: 0,
      maxOutputTokens: 0,
      label: "A",
      capabilities: ["tools"],
    }),
    row("b", {
      contextTokens: 128000,
      maxOutputTokens: 4096,
      kind: "combo",
      availability: "ok",
    }),
    row("c", { contextTokens: -1, maxOutputTokens: -5, availability: null }),
  ];
  const out = selectView(rows, spec());
  assert.deepEqual(out.rows[0], { id: "a", capabilities: ["tools"], kind: "model", label: "A" });
  assert.deepEqual(out.rows[1], {
    id: "b",
    capabilities: [],
    kind: "combo",
    contextTokens: 128000,
    maxOutputTokens: 4096,
    availability: "ok",
  });
  assert.deepEqual(out.rows[2], { id: "c", capabilities: [], kind: "model", availability: null });
  for (const r of out.rows) {
    assert.equal("type" in r, false);
    assert.equal("protocols" in r, false);
  }
});

test("rows with empty or missing id are dropped", () => {
  const rows = [
    row(""),
    row("ok"),
    { capabilities: [], kind: "model" } as unknown as ViewCatalogRow,
  ];
  assert.deepEqual(selectView(rows, spec()).ids, ["ok"]);
});

test("hash equals viewHash(ids) and node sha256 of JSON ids", () => {
  const rows = [row("a"), row("b/c"), row('d"q')];
  const out = selectView(rows, spec());
  assert.equal(out.hash, viewHash(out.ids));
  assert.equal(out.hash, nodeSha(JSON.stringify(out.ids)));
  assert.match(out.hash, /^[0-9a-f]{64}$/);
});

test("selectView is deterministic; order changes the hash; empty view hash", () => {
  const rows = [row("a"), row("b"), row("c")];
  const prefs = { favorites: ["b"] };
  assert.deepEqual(selectView(rows, spec(), prefs), selectView(rows, spec(), prefs));
  const asc = selectView(rows, spec({}, { order: "catalog" }));
  const desc = selectView([...rows].reverse(), spec({}, { order: "catalog" }));
  assert.deepEqual(desc.ids, ["c", "b", "a"]);
  assert.notEqual(asc.hash, desc.hash);
  const empty = selectView([], spec());
  assert.deepEqual(empty.ids, []);
  assert.equal(empty.hash, nodeSha("[]"));
  assert.equal(viewHash([]), nodeSha("[]"));
});

test("inputs are not mutated (deep-frozen inputs)", () => {
  const rows = deepFreeze([
    row("b", { capabilities: ["tools"], protocols: ["openai-chat"], contextTokens: 10 }),
    row("a", { type: "chat" }),
    row("a"),
  ]);
  const s = deepFreeze(
    spec({ protocols: ["openai-chat"], capabilities: ["tools"], includeIds: ["*"] }, { limit: 5 })
  );
  const prefs = deepFreeze({ favorites: ["a"], recent: ["b"] });
  const snapshot = JSON.stringify({ rows, s, prefs });
  let out: ReturnType<typeof selectView> | undefined;
  assert.doesNotThrow(() => {
    out = selectView(rows, s, prefs);
  });
  assert.equal(JSON.stringify({ rows, s, prefs }), snapshot);
  assert.equal(rows.length, 3);
  assert.deepEqual(out?.ids, ["b"]);
  // output capabilities are a copy, not the frozen input array
  assert.notEqual(out?.rows[0].capabilities, rows[0].capabilities);
});

test("sha256Hex matches node:crypto", () => {
  const long = "x".repeat(1000);
  const mixed = "héllo wörld \u{1F600} 日本語";
  for (const text of ["", "abc", long, mixed, "a".repeat(55), "a".repeat(56), "a".repeat(64)]) {
    assert.equal(sha256Hex(text), nodeSha(text));
  }
  assert.equal(
    sha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});

// ---------- contract 1.3: providers, auto, spread ----------

test("filter.providers keeps model rows by id prefix or provider (owned_by); combos untouched", () => {
  const rows = [
    row("cinf/a", { provider: "cheaperinference" }),
    row("openai/b", { provider: "openai" }),
    row("dva/c", { provider: "dva" }),
    row("bare-model", { provider: "openai" }),
    row("my-combo", { kind: "combo" }),
    row("auto/best", { kind: "auto" }),
  ];
  const byPrefix = selectView(rows, spec({ providers: ["cinf", "openai"] }));
  assert.deepEqual(byPrefix.ids, ["cinf/a", "openai/b", "bare-model", "my-combo", "auto/best"]);
  const byOwner = selectView(rows, spec({ providers: ["cheaperinference"] }));
  assert.deepEqual(byOwner.ids, ["cinf/a", "my-combo", "auto/best"]);
  assert.deepEqual(selectView(rows, spec({ providers: [] })).ids, ["my-combo", "auto/best"]);
});

test("filter.auto false drops auto rows and keeps user combos", () => {
  const rows = [row("a/x"), row("my-combo", { kind: "combo" }), row("auto/best", { kind: "auto" })];
  assert.deepEqual(selectView(rows, spec({ auto: false })).ids, ["a/x", "my-combo"]);
  assert.deepEqual(selectView(rows, spec({})).ids, ["a/x", "my-combo", "auto/best"]);
});

test("spread provider: a cut keeps every provider, preferred rows first, view order kept", () => {
  const rows = [
    ...Array.from({ length: 10 }, (_, i) => row(`big/m${i}`)),
    row("small/a"),
    row("tiny/b"),
    row("combo-1", { kind: "combo" }),
  ];
  const head = selectView(rows, spec({}, { limit: 4, order: "catalog" }));
  assert.deepEqual(head.ids, ["big/m0", "big/m1", "big/m2", "big/m3"]);
  const spread = selectView(rows, spec({}, { limit: 4, order: "catalog", spread: "provider" }));
  assert.deepEqual(spread.ids, ["big/m0", "small/a", "tiny/b", "combo-1"]);
  const fav = selectView(rows, spec({}, { limit: 4, spread: "provider" }), {
    favorites: ["big/m9"],
  });
  assert.deepEqual(fav.ids, ["big/m9", "big/m0", "small/a", "tiny/b"]);
  const fits = selectView(rows, spec({}, { limit: 50, spread: "provider" }));
  assert.equal(fits.ids.length, rows.length, "no cut: unchanged");
});

test("mirror dedupe: a row whose parent is in the view is dropped, the parent stays", () => {
  const rows = [
    row("cinf/x", { provider: "cinf" }),
    row("cheaperinference/x", { parent: "cinf/x", provider: "cheaperinference" }),
    row("no-think/cinf/x", { provider: "cinf" }),
    // The catalog copies the base row's parent onto the no-think variant.
    row("no-think/cheaperinference/x", { parent: "cinf/x", provider: "cheaperinference" }),
    // Same mirror, with the parent written in its no-think form.
    row("no-think/cheaperinference/y", { parent: "no-think/cinf/y" }),
    row("no-think/cinf/y"),
    row("other/z"),
  ];
  const view = selectView(rows, spec({}));
  assert.deepEqual(view.ids, ["cinf/x", "no-think/cinf/x", "no-think/cinf/y", "other/z"]);
  assert.equal("parent" in view.rows[0], false, "parent is a catalog-only key");
});

test("mirror dedupe: a mirror whose parent is filtered out stays", () => {
  const rows = [
    row("cinf/x", { contextTokens: 1000 }),
    row("cheaperinference/x", { parent: "cinf/x", contextTokens: 200000 }),
    row("no-think/cinf/x", { contextTokens: 1000 }),
    row("no-think/cheaperinference/x", { parent: "cinf/x", contextTokens: 200000 }),
  ];
  assert.deepEqual(selectView(rows, spec({ minContextTokens: 100000 })).ids, [
    "cheaperinference/x",
    "no-think/cheaperinference/x",
  ]);
  // A no-think mirror is not dropped for the base (thinking) row: only for its no-think parent.
  assert.deepEqual(selectView(rows, spec({ excludeIds: ["no-think/cinf/*"] })).ids, [
    "cinf/x",
    "no-think/cheaperinference/x",
  ]);
  assert.deepEqual(selectView(rows, spec({ providers: ["cheaperinference"] })).ids, [
    "cheaperinference/x",
  ]);
});

test("mirror dedupe runs before the limit, so a cap never spends slots on mirrors", () => {
  const rows = ["a", "b", "c", "d"].flatMap((m) => [
    row(`cinf/${m}`),
    row(`cheaperinference/${m}`, { parent: `cinf/${m}` }),
  ]);
  const head = selectView(rows, spec({}, { limit: 3 }));
  assert.deepEqual(head.ids, ["cinf/a", "cinf/b", "cinf/c"]);
  const spread = selectView(rows, spec({}, { limit: 3, spread: "provider" }));
  assert.deepEqual(spread.ids, ["cinf/a", "cinf/b", "cinf/c"]);
  // A favorite mirror does not survive when its parent is in the view.
  const fav = selectView(rows, spec({}, { limit: 2 }), { favorites: ["cheaperinference/d"] });
  assert.deepEqual(fav.ids, ["cinf/a", "cinf/b"]);
});

test("mirror dedupe ignores a self parent and an unknown parent", () => {
  const rows = [row("a/x", { parent: "a/x" }), row("b/x", { parent: "gone/x" })];
  assert.deepEqual(selectView(rows, spec({})).ids, ["a/x", "b/x"]);
});
