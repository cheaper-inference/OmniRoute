import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  resolveCallLogSessionTag,
  resolveLaunchSessionTag,
  resolveUsageAgentContext,
  withLaunchSession,
} from "../chatCore/agentContext.ts";

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
    expect(context.clientSessionId).toBe(LAUNCH.id);
    expect(context.client).toBe("opencode");
    // Prompt-derived project fields are untouched.
    expect(context.projectName).toBe("demo");
    expect(context.gitBranch).toBe("main");
  });

  it("an explicit x-omniroute-session-id header still wins over the launch session", () => {
    const context = resolveUsageAgentContext(
      claudeBody,
      headers({ "x-omniroute-session-id": "explicit-1" }),
      { launchSession: LAUNCH }
    );
    expect(context.clientSessionId).toBe("explicit-1");
    expect(context.client).toBe("opencode");
  });

  it("is inert without a launch session (byte-identical context)", () => {
    const h = headers({ "x-claude-code-session-id": "tool-own-session" });
    const plain = resolveUsageAgentContext(claudeBody, h, {});
    expect(resolveUsageAgentContext(claudeBody, h, null)).toEqual(plain);
    expect(resolveUsageAgentContext(claudeBody, h, { launchSession: null })).toEqual(plain);
    expect(plain.clientSessionId).toBe("tool-own-session");
    expect(plain.client).toBe("claude-code");
    expect(withLaunchSession(plain, h, { id: "", toolId: "x" })).toBe(plain);
  });

  it("noLog keys still drop prompt-derived fields but keep the launch identity", () => {
    const context = resolveUsageAgentContext(claudeBody, headers(), {
      noLog: true,
      launchSession: LAUNCH,
    });
    expect(context.clientSessionId).toBe(LAUNCH.id);
    expect(context.projectPath).toBeNull();
    expect(context.gitBranch).toBeNull();
  });

  it("falls back to the user-agent client when the session has no tool id", () => {
    const context = resolveUsageAgentContext(claudeBody, headers(), {
      launchSession: { id: LAUNCH.id },
    });
    expect(context.client).toBe("claude-code");
    expect(context.clientSessionId).toBe(LAUNCH.id);
  });

  it("works with plain-object headers too", () => {
    const context = resolveUsageAgentContext(
      claudeBody,
      { "User-Agent": "opencode/1.0", "X-OmniRoute-Session-Id": "explicit-2" },
      { launchSession: LAUNCH }
    );
    expect(context.clientSessionId).toBe("explicit-2");
  });
});

describe("launch session tag", () => {
  it("is the session tag when no explicit header is present", () => {
    expect(resolveLaunchSessionTag(headers(), { launchSession: LAUNCH })).toBe(LAUNCH.sessionTag);
  });

  it("is null with an explicit x-omniroute-session-id header", () => {
    expect(
      resolveLaunchSessionTag(headers({ "x-omniroute-session-id": "explicit-1" }), {
        launchSession: LAUNCH,
      })
    ).toBeNull();
  });

  it("is null without a launch session", () => {
    expect(resolveLaunchSessionTag(headers(), null)).toBeNull();
    expect(resolveLaunchSessionTag(headers(), {})).toBeNull();
    expect(resolveLaunchSessionTag(null, { launchSession: { id: LAUNCH.id } })).toBeNull();
  });

  it("call_logs precedence: launch tag, then conversation id, then explicit header", () => {
    expect(resolveCallLogSessionTag(LAUNCH.sessionTag, "conv-1", null)).toBe(LAUNCH.sessionTag);
    expect(resolveCallLogSessionTag(null, "conv-1", "explicit-1")).toBe("conv-1");
    expect(resolveCallLogSessionTag(null, null, "explicit-1")).toBe("explicit-1");
    expect(resolveCallLogSessionTag(null, null, null)).toBeNull();
  });

  it("chatCore routes both session_tag writes through the launch-aware resolver", () => {
    const source = readFileSync(
      path.resolve(process.cwd(), "open-sse/handlers/chatCore.ts"),
      "utf8"
    );
    expect(source).toContain(
      "const launchSessionTag = resolveLaunchSessionTag(clientRawRequest?.headers, apiKeyInfo);"
    );
    expect(source).toContain(
      "sessionTag: resolveCallLogSessionTag(launchSessionTag, conversationId, null)"
    );
    expect(
      source.match(
        /resolveCallLogSessionTag\(\s*launchSessionTag,\s*conversationId,\s*explicitSessionIdHeader\s*\)/g
      )
    ).toHaveLength(1);
    expect(source).not.toContain("sessionTag: conversationId || explicitSessionIdHeader");
  });
});
