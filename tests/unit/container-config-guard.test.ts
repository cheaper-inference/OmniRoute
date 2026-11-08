// The CLI and the dashboard/API refuse the same situation, a config write that would vanish with the
// container, and share one message: it opens with a fixed prefix (so a caller that only gets a string
// can tell it apart from other refusals), names the tool and the target path, shows the host-side
// command, and ends with the override hint of the surface that refuses.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildContainerWriteRefusal,
  CLI_OVERRIDE_HINT,
  isContainerWriteRefusal,
  SERVER_OVERRIDE_HINT,
} from "../../src/shared/utils/containerConfigGuard.ts";

test("only a string that opens with the refusal prefix is a container write refusal", () => {
  assert.equal(
    isContainerWriteRefusal(buildContainerWriteRefusal("/root/.codex/config.toml")),
    true
  );
  assert.equal(isContainerWriteRefusal("Refusing to write anything"), true);
  assert.equal(isContainerWriteRefusal("Permission denied"), false);
  assert.equal(isContainerWriteRefusal(" Refusing to write"), false);
});

test("a missing or non-string message is not a refusal", () => {
  assert.equal(isContainerWriteRefusal(null), false);
  assert.equal(isContainerWriteRefusal(undefined), false);
  assert.equal(isContainerWriteRefusal(""), false);
  assert.equal(isContainerWriteRefusal(42 as unknown as string), false);
});

test("the message names the tool, the target path and the host command", () => {
  const message = buildContainerWriteRefusal("/root/.codex/config.toml", {
    toolLabel: "Codex",
    hostCommand: "omniroute setup-codex",
  });
  assert.ok(message.startsWith("Refusing to write Codex config to /root/.codex/config.toml"));
  assert.match(message, /\n {2}omniroute setup-codex\n/);
});

test("without options it uses the generic subject, the placeholder command and the server hint", () => {
  const message = buildContainerWriteRefusal("/tmp/x");
  assert.ok(message.startsWith("Refusing to write CLI tool config to /tmp/x"));
  assert.match(message, /\n {2}omniroute setup-<tool>\n/);
  assert.ok(message.endsWith(SERVER_OVERRIDE_HINT));
});

test("the override hint of the refusing surface closes the message", () => {
  const message = buildContainerWriteRefusal("/tmp/x", { overrideHint: CLI_OVERRIDE_HINT });
  assert.ok(message.endsWith(CLI_OVERRIDE_HINT));
  assert.equal(message.includes(SERVER_OVERRIDE_HINT), false);
});

test("the two default hints name their own switch", () => {
  assert.match(SERVER_OVERRIDE_HINT, /OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true/);
  assert.match(CLI_OVERRIDE_HINT, /--allow-container-write/);
});
