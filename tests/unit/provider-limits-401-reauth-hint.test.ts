/**
 * (C) The quota page must make a genuine 401 actionable.
 *
 * After the on-demand path attempts a forced serialized re-mint (B), a 401 that
 * still reaches the client means the token is genuinely dead. The card must show
 * a re-authenticate hint and flag the connection as errored — not render a
 * silent empty card (which read as "force revalidate does nothing").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const indexPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/index.tsx"
);
const source = fs.readFileSync(indexPath, "utf8");

function section(text: string, startMarker: string, endMarker: string): string {
  const start = text.indexOf(startMarker);
  assert.ok(start >= 0, `expected to find ${startMarker}`);
  const end = text.indexOf(endMarker, start + startMarker.length);
  assert.ok(end > start, `expected to find ${endMarker} after ${startMarker}`);
  return text.slice(start, end);
}

const errorStateUpdate =
  /setErrors\(\s*\((\w+)\)\s*=>\s*\(\{\s*\.\.\.\1,\s*\[connectionId\]:\s*result\.error\s*,?\s*\}\)\s*\)/;

function assertActionable401(text: string): void {
  const request = section(
    text,
    "async function requestQuota(",
    "function passesQuotaStatusFilter("
  );
  const block = section(request, "if (response.status === 401)", "throw new Error(`HTTP");
  assert.match(block, /re-?authenticate this account/i, "401 must add a re-authenticate hint");
  assert.match(
    block,
    /const\s+error\s*=\s*\/re-\?authenticat\|sign in\|log in\/i\.test\(errorMsg\)\s*\?\s*errorMsg\s*:\s*`\$\{errorMsg\}[^`]*re-authenticate this account\.[^`]*`\s*;/,
    "401 must use the re-authenticate fallback when the server message has no hint"
  );
  assert.match(
    block,
    /return\s*\{\s*error\s*\}\s*;/,
    "401 must return the actionable error to its caller"
  );

  const caller = section(
    text,
    "const fetchQuota = useCallback(",
    "const refreshProvider = useCallback("
  );
  assert.match(
    caller,
    /const\s+result\s*=\s*await\s+requestQuota\(connectionId\)\s*;/,
    "fetchQuota must consume the quota request result for this connection"
  );
  // Exclude the initial error reset, the success path and the catch handler.
  const errorBranch = section(caller, "if (result.error)", "const data = result.data;");
  assert.match(
    errorBranch,
    /setQuotaData\(\s*\((\w+)\)\s*=>\s*\(\{\s*\.\.\.\1,\s*\[connectionId\]:\s*\{\s*\.\.\.\(\1\[connectionId\]\s*\|\|\s*\{\s*quotas:\s*\[\]\s*\}\),\s*message:\s*result\.error\s*,?\s*\}\s*,?\s*\}\)\s*\)/,
    "401 result must become the connection's displayed quota message"
  );
  assert.match(
    errorBranch,
    errorStateUpdate,
    "401 must flag the connection as errored, not just a message"
  );
  assert.match(errorBranch, /return\s*;/, "401 result must stop before the quota success path");
}

test("ProviderLimits surfaces a re-authenticate hint and error state on 401", () => {
  assertActionable401(source);
});

test("401 invariant rejects a missing result error-state update", () => {
  const mutated = source.replace(errorStateUpdate, "");
  assert.notEqual(mutated, source, "expected to remove the result.error state update");
  assert.throws(
    () => assertActionable401(mutated),
    /401 must flag the connection as errored, not just a message/
  );
});

test("401 invariant rejects a missing re-authenticate fallback", () => {
  const mutated = source.replace("${errorMsg} — re-authenticate this account.", "${errorMsg}");
  assert.notEqual(mutated, source, "expected to remove the re-authenticate fallback");
  assert.throws(() => assertActionable401(mutated), /401 must add a re-authenticate hint/);
});
