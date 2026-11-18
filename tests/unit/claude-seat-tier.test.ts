import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A Team seat's own tier (user_rate_limit_tier, e.g. max_5x) differs from the org's base
// tier (organization_rate_limit_tier, e.g. raven), and a member with no seat (seat_tier
// "unassigned") is refused on every OAuth call with oauth_not_allowed_for_organization.
// Shapes below follow /api/claude_cli/bootstrap and /api/oauth/usage as the API answers them.
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-seat-tier-"));
process.env.DATA_DIR = testDataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

const { createConnectionFromAuthFile, enrichWithBootstrap, parseAndValidateClaudeAuth } =
  await import("../../src/lib/oauth/utils/claudeAuthImport.ts");
const { fetchClaudeBootstrap } = await import("../../open-sse/executors/claudeIdentity.ts");
const { getClaudeUsage, _resetClaudeUsagePollingState } =
  await import("../../open-sse/services/usage/claude.ts");
const { _resetClaudeOauthUsageCooldown } =
  await import("../../open-sse/services/claudeUsageCooldown.ts");
const { convertUsageToQuotaInfo } = await import("../../open-sse/services/genericQuotaFetcher.ts");
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  _resetClaudeUsagePollingState();
  _resetClaudeOauthUsageCooldown();
});

test.after(async () => {
  await cleanupTempDataDir(testDataDir);
});

const seatedBootstrap = {
  oauth_account: {
    account_uuid: "00000000-0000-4000-8000-00000000000a",
    account_email: "seat@example.invalid",
    organization_uuid: "00000000-0000-4000-8000-00000000000b",
    organization_name: "Unit Team",
    organization_type: "claude_team",
    organization_rate_limit_tier: "default_raven",
    user_rate_limit_tier: "default_claude_max_5x",
    seat_tier: "team_premium",
  },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

test("fetchClaudeBootstrap returns the seat and the account's own tier", async () => {
  globalThis.fetch = (async () => json(seatedBootstrap)) as typeof fetch;
  const bootstrap = await fetchClaudeBootstrap("unit-token");
  assert.equal(bootstrap?.user_rate_limit_tier, "default_claude_max_5x");
  assert.equal(bootstrap?.organization_rate_limit_tier, "default_raven");
  assert.equal(bootstrap?.seat_tier, "team_premium");
});

test("import reads the nested bootstrap and prefers the seat tier over the CLI file's", async () => {
  globalThis.fetch = (async () => json(seatedBootstrap)) as typeof fetch;
  const parsed = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "unit-access",
      refreshToken: "unit-refresh",
      rateLimitTier: "default_claude_max_5x_stale",
    },
  });
  const enriched = await enrichWithBootstrap(parsed);
  assert.equal(enriched.organizationUUID, "00000000-0000-4000-8000-00000000000b");
  assert.equal(enriched.accountUUID, "00000000-0000-4000-8000-00000000000a");
  assert.equal(enriched.rateLimitTier, "default_claude_max_5x");
  assert.equal(enriched.seatTier, "team_premium");
});

test("usage plan label is the seat's tier, not the org's base tier", async () => {
  globalThis.fetch = (async (input) =>
    String(input).includes("bootstrap")
      ? json(seatedBootstrap)
      : json({ five_hour: { utilization: 10, resets_at: null } })) as typeof fetch;
  const usage = (await getClaudeUsage("unit-token-plan")) as {
    plan?: string;
  };
  assert.equal(usage.plan, "default_claude_max_5x");
});

test("usage names a Team member with no seat instead of a bare HTTP 403", async () => {
  const refused = {
    type: "error",
    error: {
      type: "permission_error",
      message: "OAuth authentication is currently not allowed for this organization.",
      details: { error_code: "oauth_not_allowed_for_organization" },
    },
  };
  globalThis.fetch = (async () => json(refused, 403)) as typeof fetch;
  const usage = (await getClaudeUsage("unit-token-noseat")) as {
    message?: string;
  };
  assert.match(usage.message || "", /oauth_not_allowed_for_organization/);
  assert.match(usage.message || "", /seat/);
});

test("import keeps one account's connections in two organizations apart", async () => {
  const parsed = parseAndValidateClaudeAuth({
    claudeAiOauth: { accessToken: "unit-access-org", refreshToken: "unit-refresh-org" },
  });
  const base = {
    ...parsed,
    email: "two-orgs@example.invalid",
    accountUUID: "00000000-0000-4000-8000-00000000000c",
    organizationName: null,
    organizationType: null,
    seatTier: null,
  };
  const orgD = "00000000-0000-4000-8000-00000000000d";
  const orgE = "00000000-0000-4000-8000-00000000000e";
  const first = await createConnectionFromAuthFile({ ...base, organizationUUID: orgD }, {});
  const second = await createConnectionFromAuthFile({ ...base, organizationUUID: orgE }, {});
  assert.equal(second.created, true);
  assert.notEqual(second.connection.id, first.connection.id);

  const again = await createConnectionFromAuthFile(
    { ...base, organizationUUID: orgE, seatTier: "team_premium" },
    { overwriteExisting: true }
  );
  assert.equal(again.created, false);
  assert.equal(again.connection.id, second.connection.id);
  const psd = again.connection.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.seatTier, "team_premium");
});

test("quota plan prefers the seat's tier over the org's base tier", () => {
  const quota = convertUsageToQuotaInfo(
    {
      plan: "fallback_plan",
      quotas: { "session (5h)": { used: 10, total: 100, resetAt: null } },
      bootstrap: seatedBootstrap.oauth_account,
    },
    { provider: "claude" }
  );
  assert.equal(quota?.plan, "default_claude_max_5x");
});
