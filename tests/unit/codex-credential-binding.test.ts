import assert from "node:assert/strict";
import test from "node:test";

import { codexCredentialBindingMismatch } from "../../open-sse/services/usage/codexCredentialBinding.ts";
import {
  getCodexUsage,
  setCodexUsageFetchForTests,
} from "../../open-sse/services/usage/codex.ts";

function jwt(claims: Record<string, unknown>): string {
  return `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.synthetic-signature`;
}

function token(accountId: string, userId: string): string {
  return jwt({
    sub: userId,
    "https://api.openai.com/auth": {
      chatgpt_account_id: accountId,
      chatgpt_user_id: userId,
    },
  });
}

test("rejects a personal workspace whose access token belongs to another account", () => {
  assert.equal(
    codexCredentialBindingMismatch(token("other", "user-a"), {
      workspaceId: "personal",
      workspaceStructure: "personal",
    }),
    "personal_account_mismatch"
  );
});

test("rejects a swapped user on refresh even when the account/workspace agrees", () => {
  const priorIdToken = token("workspace-a", "user-a");
  assert.equal(
    codexCredentialBindingMismatch(token("workspace-a", "user-b"), {
      workspaceId: "workspace-a",
      workspaceStructure: "personal",
    }, priorIdToken),
    "user_mismatch"
  );
});

test("rejects a mismatched persisted user ID without an ID token", () => {
  assert.equal(
    codexCredentialBindingMismatch(token("workspace-a", "user-b"), {
      chatgptUserId: "user-a",
    }),
    "user_mismatch"
  );
});

test("accepts the same identity across refresh rotations", () => {
  assert.equal(
    codexCredentialBindingMismatch(
      token("workspace-a", "user-a"),
      { workspaceId: "workspace-a", workspaceStructure: "personal" },
      token("workspace-a", "user-a")
    ),
    null
  );
});

test("Team workspace selection may differ from the token's personal account ID", () => {
  assert.equal(
    codexCredentialBindingMismatch(token("personal", "user-a"), {
      workspaceId: "team-workspace",
      workspaceStructure: "team",
      chatgptUserId: "user-a",
    }),
    null
  );
});

test("claim-light and opaque tokens are not misclassified", () => {
  assert.equal(codexCredentialBindingMismatch("opaque-token", {
    workspaceId: "ws",
    workspaceStructure: "personal",
  }), null);
  assert.equal(codexCredentialBindingMismatch(jwt({ sub: "user-a" }), {
    workspaceId: "ws",
    workspaceStructure: "personal",
  }), null);
});

test("mismatched quota token is rejected before making an OpenAI usage request", async () => {
  let requests = 0;
  setCodexUsageFetchForTests(async () => {
    requests++;
    return new Response("{}", { status: 200 });
  });
  try {
    const result = await getCodexUsage(token("wrong-account", "user-a"), {
      workspaceId: "correct-account",
      workspaceStructure: "personal",
    });
    assert.match(String(result.message), /identity does not match/);
    assert.equal(requests, 0);
    assert.equal("quotas" in result, false);
  } finally {
    setCodexUsageFetchForTests(null);
  }
});

test("matching quota token keeps the original workspace header and usage response", async () => {
  let accountHeader: string | null = null;
  setCodexUsageFetchForTests(async (_url, init) => {
    accountHeader = new Headers(init?.headers).get("chatgpt-account-id");
    return new Response(JSON.stringify({
      plan_type: "plus",
      rate_limit: {
        primary_window: { limit_window_seconds: 18000, used_percent: 2 },
        secondary_window: { limit_window_seconds: 604800, used_percent: 11 },
      },
    }), { status: 200 });
  });
  try {
    const result = await getCodexUsage(token("personal", "user-a"), {
      workspaceId: "personal",
      workspaceStructure: "personal",
    });
    assert.equal(accountHeader, "personal");
    assert.equal(result.plan, "plus");
    assert.equal(result.quotas?.session?.used, 2);
    assert.equal(result.quotas?.weekly?.used, 11);
  } finally {
    setCodexUsageFetchForTests(null);
  }
});
