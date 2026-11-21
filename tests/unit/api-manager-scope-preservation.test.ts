import test from "node:test";
import assert from "node:assert/strict";

import {
  buildApiKeyCreateScopes,
  mergeApiKeyPermissionScopes,
} from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerScopes.ts";
import {
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
} from "../../src/shared/constants/selfServiceScopes.ts";
import { API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE } from "../../src/shared/constants/apiKeyPolicyScopes.ts";
import {
  createDefaultKeyTemplatePolicy,
  editorFormStateToPolicy,
  policyToEditorFormState,
} from "../../src/app/(dashboard)/dashboard/api-manager/keyTemplatePolicyUtils.ts";

test("templates preserve explicit narrow and administrative grants without granting new defaults", () => {
  const policy = createDefaultKeyTemplatePolicy();
  const ordinary = policyToEditorFormState(policy);
  assert.equal(ordinary.mcpConnectEnabled, false);
  assert.equal(ordinary.compressionReadEnabled, false);
  policy.key.scopes = [
    "admin",
    "manage",
    "self:usage",
    "custom:keep",
    "mcp:connect",
    "read:compression",
  ];
  const state = policyToEditorFormState(policy);
  assert.equal(state.mcpConnectEnabled, true);
  assert.equal(state.compressionReadEnabled, true);
  assert.deepEqual(new Set(editorFormStateToPolicy(state).key.scopes), new Set(policy.key.scopes));
  state.mcpConnectEnabled = false;
  assert.deepEqual(
    new Set(editorFormStateToPolicy(state).key.scopes),
    new Set(policy.key.scopes.filter((s) => s !== "mcp:connect"))
  );
  state.compressionReadEnabled = false;
  assert.deepEqual(
    new Set(editorFormStateToPolicy(state).key.scopes),
    new Set(["admin", "manage", "self:usage", "custom:keep"])
  );
});

test("independent MCP permissions round-trip without management grants or dropping custom scopes", () => {
  for (const mcpConnectEnabled of [false, true])
    for (const compressionReadEnabled of [false, true]) {
      const options = {
        manageEnabled: false,
        selfUsageEnabled: true,
        selfAccountQuotaEnabled: false,
        bypassProviderQuotaPolicyEnabled: false,
        mcpConnectEnabled,
        compressionReadEnabled,
      };
      const created = buildApiKeyCreateScopes(options);
      assert.equal(created.includes("mcp:connect"), mcpConnectEnabled);
      assert.equal(created.includes("read:compression"), compressionReadEnabled);
      assert.equal(created.includes("manage"), false);
      assert.equal(created.includes("admin"), false);
      const merged = mergeApiKeyPermissionScopes(
        ["admin", "custom:scope", "self:usage", "mcp:connect", "read:compression"],
        options
      );
      assert.ok(merged.includes("admin"));
      assert.ok(merged.includes("custom:scope"));
      assert.ok(merged.includes("self:usage"));
      assert.equal(merged.includes("mcp:connect"), mcpConnectEnabled);
      assert.equal(merged.includes("read:compression"), compressionReadEnabled);
    }
  const unchanged = mergeApiKeyPermissionScopes(["mcp:connect", "read:compression"], {
    manageEnabled: false,
    selfUsageEnabled: false,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: false,
  });
  assert.deepEqual(unchanged, ["mcp:connect", "read:compression"]);
});

test("create scopes enable own usage by default without shared account quota", () => {
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: false }), [SELF_USAGE_SCOPE]);
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: true }), ["manage", SELF_USAGE_SCOPE]);
  assert.deepEqual(
    buildApiKeyCreateScopes({
      manageEnabled: false,
      bypassProviderQuotaPolicyEnabled: true,
    }),
    [SELF_USAGE_SCOPE, API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE]
  );
  assert.deepEqual(
    buildApiKeyCreateScopes({
      manageEnabled: false,
      selfUsageEnabled: false,
      selfAccountQuotaEnabled: true,
    }),
    []
  );
});

test("permission scope merge preserves unrelated scopes while toggling managed scopes", () => {
  const scopes = mergeApiKeyPermissionScopes(["custom:scope", SELF_USAGE_SCOPE], {
    manageEnabled: true,
    selfUsageEnabled: true,
    selfAccountQuotaEnabled: true,
    bypassProviderQuotaPolicyEnabled: true,
  });

  assert.deepEqual(scopes, [
    "custom:scope",
    SELF_USAGE_SCOPE,
    "manage",
    SELF_ACCOUNT_QUOTA_SCOPE,
    API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE,
  ]);
});

test("permission scope merge removes shared quota visibility when own usage is disabled", () => {
  const scopes = mergeApiKeyPermissionScopes(
    ["custom:scope", SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    {
      manageEnabled: false,
      selfUsageEnabled: false,
      selfAccountQuotaEnabled: true,
      bypassProviderQuotaPolicyEnabled: false,
    }
  );

  assert.deepEqual(scopes, ["custom:scope"]);
});

test("permission scope merge toggles provider quota policy bypass without dropping custom scopes", () => {
  const enabled = mergeApiKeyPermissionScopes(["custom:scope"], {
    manageEnabled: false,
    selfUsageEnabled: false,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: true,
  });

  assert.deepEqual(enabled, ["custom:scope", API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE]);

  const disabled = mergeApiKeyPermissionScopes(enabled, {
    manageEnabled: false,
    selfUsageEnabled: false,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: false,
  });

  assert.deepEqual(disabled, ["custom:scope"]);
});

test("permission scope merge retains lease:exclusive scope through permission updates", () => {
  const scopes = mergeApiKeyPermissionScopes(["lease:exclusive", SELF_USAGE_SCOPE], {
    manageEnabled: true,
    selfUsageEnabled: true,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: false,
  });

  assert.deepEqual(scopes, ["lease:exclusive", SELF_USAGE_SCOPE, "manage"]);
});
