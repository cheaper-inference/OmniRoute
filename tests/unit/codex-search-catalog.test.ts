import test from "node:test";
import assert from "node:assert/strict";
import { SEARCH_PROVIDERS } from "../../src/shared/constants/providers/search.ts";
import { v1SearchSchema } from "../../src/shared/validation/schemas/apiV1.ts";

test("Codex catalog documents subscription quota and exposes only webSearch", () => {
  assert.deepEqual(SEARCH_PROVIDERS["codex-search"].serviceKinds, ["webSearch"]);
  assert.match(SEARCH_PROVIDERS["codex-search"].authHint, /no separate key.*subscription quota/);
});

test("search schema canonicalizes codex_search without forcing a search type", () => {
  const parsed = v1SearchSchema.parse({
    query: "test",
    provider: "codex_search",
    search_type: "news",
  });
  assert.equal(parsed.provider, "codex-search");
  assert.equal(parsed.search_type, "news");
});
