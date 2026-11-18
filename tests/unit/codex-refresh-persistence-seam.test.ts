import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  adoptCommittedCodexRefresh,
  persistCodexRefresh,
  registerCodexRefreshPersistence,
  type CodexRefreshPersistence,
} from "../../open-sse/services/codexAccount/refreshPersistence.ts";
import {
  StaleCodexOperationError,
  type CodexConnectionFence,
} from "../../open-sse/services/codexAccount/fenceTypes.ts";

const fence: CodexConnectionFence = Object.freeze({
  connectionId: "conn-seam",
  ownerEpoch: "epoch-1",
  credentialRevision: 3,
  failureRevision: 1,
  connectionBinding: "binding",
});

test.afterEach(() => registerCodexRefreshPersistence(null));

test("unregistered seam fails closed instead of skipping the fenced write", async () => {
  registerCodexRefreshPersistence(null);
  assert.throws(() => adoptCommittedCodexRefresh({}, fence), StaleCodexOperationError);
  await assert.rejects(() => persistCodexRefresh({}, fence), StaleCodexOperationError);
});

test("registered seam delegates adoption and persistence with the same fence", async () => {
  const calls: string[] = [];
  const result = { accessToken: "rotated" };
  const persistence: CodexRefreshPersistence = {
    adoptCommittedCodexRefresh(received, expected) {
      calls.push("adopt");
      assert.equal(received, result);
      assert.equal(expected, fence);
      return fence;
    },
    async persistCodexRefresh(received, expected) {
      calls.push("persist");
      assert.equal(received, result);
      assert.equal(expected, fence);
    },
  };
  registerCodexRefreshPersistence(persistence);
  assert.equal(adoptCommittedCodexRefresh(result, fence), fence);
  await persistCodexRefresh(result, fence);
  assert.deepEqual(calls, ["adopt", "persist"]);
});

test("the engine reaches Codex refresh persistence only through the open-sse seam", () => {
  const chatCore = readFileSync(
    fileURLToPath(new URL("../../open-sse/handlers/chatCore.ts", import.meta.url)),
    "utf8"
  );
  assert.doesNotMatch(chatCore, /from\s+["']@\/sse\/services\/tokenRefresh["']/);
  assert.match(chatCore, /from\s+["']\.\.\/services\/codexAccount\/refreshPersistence\.ts["']/);
  const tokenRefresh = readFileSync(
    fileURLToPath(new URL("../../src/sse/services/tokenRefresh.ts", import.meta.url)),
    "utf8"
  );
  assert.match(
    tokenRefresh,
    /registerCodexRefreshPersistence\(\{\s*adoptCommittedCodexRefresh,\s*persistCodexRefresh\s*\}\)/
  );
});
