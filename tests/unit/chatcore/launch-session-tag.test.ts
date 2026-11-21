import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

import {
  resolveCallLogSessionTag,
  resolveLaunchSessionTag,
  resolveUsageAgentContext,
  withLaunchSession,
} from "../../../open-sse/handlers/chatCore/agentContext.ts";

// An `olx_` bearer resolves to key metadata carrying
// `launchSession`; its id becomes the client session id and its tool id the client, and its
// tag becomes call_logs.session_tag, unless the client sent x-omniroute-session-id.

const LAUNCH = {
  id: "abcdefghijklmnopqrstuvwxyz",
  toolId: "opencode",
  sessionTag: "launch:opencode:abcdefghijklmnopqrstuvwxyz",
};

const claudeBody = {
  system: "Working directory: /home/dev/projects/demo",
  messages: [{ role: "user", content: "Current branch: main\nhi" }],
};

function headers(init: Record<string, string> = {}): Headers {
  return new Headers({ "user-agent": "claude-cli/2.1.0 (external, cli)", ...init });
}

describe("launch session agent context", () => {
  it("uses the launch session id as client session id and the tool id as client", () => {
    const context = resolveUsageAgentContext(
      claudeBody,
      headers({ "x-claude-code-session-id": "tool-own-session" }),
      { launchSession: LAUNCH }
    );
    assert.equal(context.clientSessionId, LAUNCH.id);
    assert.equal(context.client, "opencode");
    // Prompt-derived project fields are untouched.
    assert.equal(context.projectName, "demo");
    assert.equal(context.gitBranch, "main");
  });

  it("an explicit x-omniroute-session-id header still wins over the launch session", () => {
    const context = resolveUsageAgentContext(
      claudeBody,
      headers({ "x-omniroute-session-id": "explicit-1" }),
      { launchSession: LAUNCH }
    );
    assert.equal(context.clientSessionId, "explicit-1");
    assert.equal(context.client, "opencode");
  });

  it("is inert without a launch session (byte-identical context)", () => {
    const h = headers({ "x-claude-code-session-id": "tool-own-session" });
    const plain = resolveUsageAgentContext(claudeBody, h, {});
    assert.deepEqual(resolveUsageAgentContext(claudeBody, h, null), plain);
    assert.deepEqual(resolveUsageAgentContext(claudeBody, h, { launchSession: null }), plain);
    assert.equal(plain.clientSessionId, "tool-own-session");
    assert.equal(plain.client, "claude-code");
    assert.equal(withLaunchSession(plain, h, { id: "", toolId: "x" }), plain);
  });

  it("noLog keys still drop prompt-derived fields but keep the launch identity", () => {
    const context = resolveUsageAgentContext(claudeBody, headers(), {
      noLog: true,
      launchSession: LAUNCH,
    });
    assert.equal(context.clientSessionId, LAUNCH.id);
    assert.equal(context.projectPath, null);
    assert.equal(context.gitBranch, null);
  });

  it("a resolved no-log state (key flag or x-omniroute-no-log header) overrides the key's own flag", () => {
    // chatCore resolves no-log from the key flag OR the request header and passes it explicitly.
    const headerOnly = resolveUsageAgentContext(
      claudeBody,
      headers(),
      { launchSession: LAUNCH },
      true
    );
    assert.equal(headerOnly.clientSessionId, LAUNCH.id);
    assert.equal(headerOnly.projectPath, null);
    assert.equal(headerOnly.gitBranch, null);

    const explicitOff = resolveUsageAgentContext(
      claudeBody,
      headers(),
      { noLog: true, launchSession: LAUNCH },
      false
    );
    assert.equal(explicitOff.projectName, "demo");
    assert.equal(explicitOff.gitBranch, "main");
  });

  it("falls back to the user-agent client when the session has no tool id", () => {
    const context = resolveUsageAgentContext(claudeBody, headers(), {
      launchSession: { id: LAUNCH.id },
    });
    assert.equal(context.client, "claude-code");
    assert.equal(context.clientSessionId, LAUNCH.id);
  });

  it("works with plain-object headers too", () => {
    const context = resolveUsageAgentContext(
      claudeBody,
      { "User-Agent": "opencode/1.0", "X-OmniRoute-Session-Id": "explicit-2" },
      { launchSession: LAUNCH }
    );
    assert.equal(context.clientSessionId, "explicit-2");
  });
});

describe("launch session tag", () => {
  it("is the session tag when no explicit header is present", () => {
    assert.equal(resolveLaunchSessionTag(headers(), { launchSession: LAUNCH }), LAUNCH.sessionTag);
  });

  it("is null with an explicit x-omniroute-session-id header", () => {
    assert.equal(
      resolveLaunchSessionTag(headers({ "x-omniroute-session-id": "explicit-1" }), {
        launchSession: LAUNCH,
      }),
      null
    );
  });

  it("is null without a launch session", () => {
    assert.equal(resolveLaunchSessionTag(headers(), null), null);
    assert.equal(resolveLaunchSessionTag(headers(), {}), null);
    assert.equal(resolveLaunchSessionTag(null, { launchSession: { id: LAUNCH.id } }), null);
  });

  it("call_logs precedence: launch tag, then conversation id, then explicit header", () => {
    assert.equal(resolveCallLogSessionTag(LAUNCH.sessionTag, "conv-1", null), LAUNCH.sessionTag);
    assert.equal(resolveCallLogSessionTag(null, "conv-1", "explicit-1"), "conv-1");
    assert.equal(resolveCallLogSessionTag(null, null, "explicit-1"), "explicit-1");
    assert.equal(resolveCallLogSessionTag(null, null, null), null);
  });

  it("chatCore routes both session_tag writes through the launch-aware resolver", () => {
    const source = readFileSync(
      path.resolve(process.cwd(), "open-sse/handlers/chatCore.ts"),
      "utf8"
    );
    assert.ok(
      source.includes(
        "const launchSessionTag = resolveLaunchSessionTag(clientRawRequest?.headers, apiKeyInfo);"
      )
    );
    assert.ok(
      source.includes(
        "sessionTag: resolveCallLogSessionTag(launchSessionTag, conversationId, null)"
      )
    );
    assert.equal(
      source.match(
        /resolveCallLogSessionTag\(\s*launchSessionTag,\s*conversationId,\s*explicitSessionIdHeader\s*\)/g
      )?.length,
      1
    );
    assert.ok(!source.includes("sessionTag: conversationId || explicitSessionIdHeader"));
  });
});
