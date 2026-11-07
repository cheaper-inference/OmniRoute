import test from "node:test";
import assert from "node:assert/strict";
import { parseAndValidateCodexAuth } from "@/lib/oauth/utils/codexAuthImport";

/**
 * Two Codex auth.json shapes are in the wild:
 *
 *   - nested — `{ auth_mode, OPENAI_API_KEY, tokens: { id_token, ... } }`.
 *     Written by the Codex CLI (`~/.codex/auth.json`) and by OmniRoute's own
 *     export (`buildCodexAuthFile`).
 *   - top-level — `{ access_token, refresh_token, id_token, account_id, email }`.
 *     The "simple export" written by other Codex-compatible clients.
 *
 * `POST /api/oauth/codex/import` accepts both, but the dashboard import flow
 * (the modal preview plus `POST /api/providers/codex-auth/import`) only looked
 * inside the nested `tokens` object, so importing the top-level shape through
 * the UI failed with "Not a valid Codex auth.json" (`codexImportInvalidShape`)
 * and through the API with 400 `{"code":"missing_id_token"}` — even though the
 * credentials in it are identical to the nested form.
 */

const FUTURE = Math.floor(Date.now() / 1000) + 86400;

function buildJwt(payload: Record<string, unknown>): string {
  return `header.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.signature`;
}

const ID_TOKEN = buildJwt({
  email: "flat-shape@example.com",
  exp: FUTURE,
  "https://api.openai.com/auth": {
    chatgpt_account_id: "acc_flat_shape",
    chatgpt_user_id: "user_flat_shape",
  },
});
const ACCESS_TOKEN = buildJwt({ exp: FUTURE });

const NESTED_AUTH_JSON = {
  auth_mode: "chatgpt",
  OPENAI_API_KEY: null,
  tokens: {
    id_token: ID_TOKEN,
    access_token: ACCESS_TOKEN,
    refresh_token: "rt_nested",
    account_id: "acc_flat_shape",
  },
  last_refresh: "2026-01-01T00:00:00.000Z",
};

const TOP_LEVEL_AUTH_JSON = {
  access_token: ACCESS_TOKEN,
  refresh_token: "rt_top_level",
  id_token: ID_TOKEN,
  account_id: "acc_flat_shape",
  email: "flat-shape@example.com",
  expired: "2026-01-01T00:00:00.000Z",
  type: "codex",
};

test("parses the top-level auth.json shape accepted by /api/oauth/codex/import", () => {
  const parsed = parseAndValidateCodexAuth(TOP_LEVEL_AUTH_JSON);

  assert.equal(parsed.idToken, ID_TOKEN);
  assert.equal(parsed.accessToken, ACCESS_TOKEN);
  assert.equal(parsed.refreshToken, "rt_top_level");
  assert.equal(parsed.accountId, "acc_flat_shape");
  assert.equal(parsed.email, "flat-shape@example.com");
  assert.equal(parsed.userId, "user_flat_shape");
});

test("still parses the nested Codex CLI / OmniRoute export shape", () => {
  const parsed = parseAndValidateCodexAuth(NESTED_AUTH_JSON);

  assert.equal(parsed.idToken, ID_TOKEN);
  assert.equal(parsed.accessToken, ACCESS_TOKEN);
  assert.equal(parsed.refreshToken, "rt_nested");
  assert.equal(parsed.accountId, "acc_flat_shape");
});

test("nested tokens win over top-level fields when both are present", () => {
  const parsed = parseAndValidateCodexAuth({
    ...TOP_LEVEL_AUTH_JSON,
    refresh_token: "rt_top_level",
    tokens: { ...NESTED_AUTH_JSON.tokens },
  });

  assert.equal(parsed.refreshToken, "rt_nested");
});

test("derives account_id from the id_token claim when the top-level shape omits it", () => {
  const { account_id: _omitted, ...withoutAccountId } = TOP_LEVEL_AUTH_JSON;
  const parsed = parseAndValidateCodexAuth(withoutAccountId);

  assert.equal(parsed.accountId, "acc_flat_shape");
});

test("top-level shape without refresh_token is still rejected as missing_refresh_token", () => {
  const { refresh_token: _omitted, ...withoutRefreshToken } = TOP_LEVEL_AUTH_JSON;

  assert.throws(
    () => parseAndValidateCodexAuth(withoutRefreshToken),
    (error: Error & { code?: string }) => error.code === "missing_refresh_token"
  );
});

test("top-level shape without any id_token is still rejected as missing_id_token", () => {
  const { id_token: _omitted, ...withoutIdToken } = TOP_LEVEL_AUTH_JSON;

  assert.throws(
    () => parseAndValidateCodexAuth(withoutIdToken),
    (error: Error & { code?: string }) => error.code === "missing_id_token"
  );
});
