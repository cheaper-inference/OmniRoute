// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

// next-intl is only used by the component body; the preview helper under test is pure.
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const { previewCodexJson } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/components/modals/ImportCodexAuthModal");

/**
 * The modal preview gates the single-import form: when it reports `valid: false`
 * the Import button stays disabled and nothing is ever sent, so a rejected shape
 * is a dead end in the UI.
 *
 * Two auth.json shapes exist. The nested one (Codex CLI / OmniRoute export) has
 * always been accepted; the top-level one was reported as
 * `codexImportInvalidShape` ("The file is not a valid Codex auth.json") even
 * though `POST /api/oauth/codex/import` accepts it.
 */

const FUTURE = Math.floor(Date.now() / 1000) + 86400;

function buildJwt(payload: Record<string, unknown>): string {
  return `header.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.signature`;
}

const ID_TOKEN = buildJwt({ email: "flat-shape@example.com", exp: FUTURE });

const NESTED_AUTH_JSON = {
  auth_mode: "chatgpt",
  OPENAI_API_KEY: null,
  tokens: {
    id_token: ID_TOKEN,
    access_token: buildJwt({ exp: FUTURE }),
    refresh_token: "rt_nested",
    account_id: "acc_flat_shape",
  },
};

const TOP_LEVEL_AUTH_JSON = {
  access_token: buildJwt({ exp: FUTURE }),
  refresh_token: "rt_top_level",
  id_token: ID_TOKEN,
  account_id: "acc_flat_shape",
  email: "flat-shape@example.com",
  type: "codex",
};

describe("ImportCodexAuthModal — previewCodexJson", () => {
  it("accepts the top-level auth.json shape", () => {
    expect(previewCodexJson(TOP_LEVEL_AUTH_JSON).valid).toBe(true);
  });

  it("still accepts the nested Codex CLI / OmniRoute export shape", () => {
    expect(previewCodexJson(NESTED_AUTH_JSON).valid).toBe(true);
  });

  it("rejects a top-level file that carries no id_token", () => {
    const { id_token: _omitted, ...withoutIdToken } = TOP_LEVEL_AUTH_JSON;
    expect(previewCodexJson(withoutIdToken).valid).toBe(false);
  });

  it("still rejects a non-Codex auth_mode", () => {
    expect(previewCodexJson({ ...TOP_LEVEL_AUTH_JSON, auth_mode: "apikey" }).valid).toBe(false);
  });

  it("still rejects non-objects", () => {
    expect(previewCodexJson("not json").valid).toBe(false);
    expect(previewCodexJson(null).valid).toBe(false);
  });
});
