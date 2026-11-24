/**
 * claude-web picked the FIRST organization from /api/organizations. Accounts that
 * also own an Anthropic Console (API) organization often get that one first
 * (`capabilities: ["api"]`, no "chat"), and every conversation posted there
 * answered 403 `permission_denied` for every model. The executor now prefers the
 * `lastActiveOrg` cookie, then an organization with the "chat" capability.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { pickClaudeChatOrganization } = await import("../../open-sse/executors/claude-web.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

const API_ORG = { uuid: "org-api", capabilities: ["customer_terms:standard", "api"] };
const CHAT_ORG = { uuid: "org-chat", capabilities: ["chat"] };
const OTHER_CHAT_ORG = { uuid: "org-chat-2", capabilities: ["chat", "claude_pro"] };

test("prefers the lastActiveOrg cookie when it is one of the listed organizations", () => {
  assert.equal(
    pickClaudeChatOrganization(
      [API_ORG, CHAT_ORG, OTHER_CHAT_ORG],
      "sessionKey=x; lastActiveOrg=org-chat-2"
    ),
    "org-chat-2"
  );
});

test("without lastActiveOrg, skips an API-only organization listed first", () => {
  assert.equal(pickClaudeChatOrganization([API_ORG, CHAT_ORG], "sessionKey=x"), "org-chat");
});

test("an unknown lastActiveOrg falls back to the chat organization", () => {
  assert.equal(pickClaudeChatOrganization([API_ORG, CHAT_ORG], "lastActiveOrg=gone"), "org-chat");
});

test("keeps the first organization when none advertises chat, and handles bad input", () => {
  assert.equal(pickClaudeChatOrganization([{ id: "only" }]), "only");
  assert.equal(pickClaudeChatOrganization([]), null);
  assert.equal(pickClaudeChatOrganization({ not: "a list" }), null);
  assert.equal(pickClaudeChatOrganization([null, { uuid: "  " }, CHAT_ORG]), "org-chat");
  // Wrong field types are skipped per record; bad capabilities count as none.
  assert.equal(
    pickClaudeChatOrganization([{ uuid: 42 }, { uuid: "org-x", capabilities: "chat" }, CHAT_ORG]),
    "org-chat"
  );
  assert.equal(pickClaudeChatOrganization([{ uuid: "org-x", capabilities: "chat" }]), "org-x");
});

test("claude-web advertises Claude Haiku 5.5", () => {
  const ids = REGISTRY["claude-web"].models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("claude-haiku-5-5"));
});
