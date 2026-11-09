import { test } from "node:test";
import assert from "node:assert/strict";

import { quoteShellArgs, quoteShellArgsForSpawn } from "../../../bin/cli/utils/winShellArgs.mjs";
import { quoteClaudeArgs, resolveClaudeSpawn } from "../../../bin/cli/commands/launch.mjs";
import { resolveCodexSpawn } from "../../../bin/cli/commands/launch-codex.mjs";

// #17177: `resolveClaudeSpawn`/`resolveCodexSpawn`/`resolveGenericSpawn` pick a
// native `.exe` off PATH when one exists and spawn it WITHOUT a shell (#9454),
// while cmd.exe escaping is only meaningful on the `shell: true` npm-`.cmd`
// path (#8837). Applying the escaping unconditionally made every pass-through
// argument reach the native binary literally (e.g. `-p ^^^"two words^^^"`) —
// a silent, exit-code-0 mangling. The launch call sites now gate the quoting
// on the resolved spec's `shell`; these tests pin that contract.

const PASS_THROUGH = ["-p", "What is 17*3? Reply with only the number.", "--output-format", "text"];

test("win32 + shell undefined (native .exe path) passes argv through untouched", () => {
  assert.deepEqual(quoteShellArgsForSpawn(PASS_THROUGH, "win32", undefined), PASS_THROUGH);
});

test("win32 + shell true (npm .cmd shim path) keeps the cmd.exe escaping", () => {
  assert.deepEqual(
    quoteShellArgsForSpawn(PASS_THROUGH, "win32", true),
    quoteShellArgs(PASS_THROUGH, "win32")
  );
});

test("no cmd.exe caret escaping leaks into the no-shell argv", () => {
  for (const arg of quoteShellArgsForSpawn(PASS_THROUGH, "win32", undefined)) {
    assert.equal(arg.includes("^"), false, `unexpected cmd.exe escaping in: ${arg}`);
  }
});

test("off Windows argv is untouched on both shell paths", () => {
  for (const platform of ["linux", "darwin"]) {
    for (const useShell of [true, false, undefined]) {
      assert.deepEqual(quoteShellArgsForSpawn(PASS_THROUGH, platform, useShell), PASS_THROUGH);
    }
  }
});

test("returns a fresh array, tolerates empty args, and never mutates the caller's array", () => {
  const input = [...PASS_THROUGH];
  const result = quoteShellArgsForSpawn(input, "win32", undefined);
  assert.notEqual(result, input);
  assert.deepEqual(input, PASS_THROUGH);
  assert.deepEqual(quoteShellArgsForSpawn(undefined, "win32", true), []);
});

// Contract against the real resolvers: the spec they return decides whether the
// launchers escape, so pin the pairing (resolver → gate → argv).
test("resolved claude.exe spec (no shell) yields untouched argv", async () => {
  const spec = await resolveClaudeSpawn("win32", {
    probe: async () => "C:\\Users\\me\\.local\\bin\\claude.exe",
  });
  assert.equal(spec.shell, undefined);
  assert.deepEqual(quoteShellArgsForSpawn(PASS_THROUGH, "win32", spec.shell), PASS_THROUGH);
});

test("resolved claude.cmd spec (shell) still escapes argv", async () => {
  const spec = await resolveClaudeSpawn("win32", { probe: async () => null });
  assert.equal(spec.shell, true);
  assert.deepEqual(
    quoteShellArgsForSpawn(PASS_THROUGH, "win32", spec.shell),
    quoteClaudeArgs(PASS_THROUGH, "win32")
  );
});

test("resolved codex.exe spec (no shell) yields untouched argv", async () => {
  const spec = await resolveCodexSpawn("win32", {
    probe: async () => "C:\\Users\\me\\.local\\bin\\codex.exe",
  });
  assert.equal(spec.shell, undefined);
  assert.deepEqual(quoteShellArgsForSpawn(PASS_THROUGH, "win32", spec.shell), PASS_THROUGH);
});
