import assert from "node:assert/strict";
import test from "node:test";

import {
  GROK_BUILD_DEFAULT_CLIENT_VERSION,
  getGrokBuildClientVersion,
  getGrokBuildModelsHeaders,
  getGrokBuildOAuthHeaders,
  getGrokBuildSessionHeaders,
  getGrokBuildUserAgent,
} from "../../open-sse/config/grokBuild.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

function assertVersion(expected: string): void {
  assert.equal(getGrokBuildClientVersion(), expected);
  assert.ok(getGrokBuildUserAgent().startsWith(`grok-shell/${expected} (`));
  for (const headers of [
    getGrokBuildSessionHeaders(),
    getGrokBuildModelsHeaders({}),
    getGrokBuildOAuthHeaders("ui"),
    getGrokBuildOAuthHeaders("cli"),
    new GrokCliExecutor().buildHeaders({}, false),
  ]) {
    assert.equal(headers["x-grok-client-version"], expected);
    if (headers["User-Agent"]) {
      assert.ok(headers["User-Agent"].startsWith(`grok-shell/${expected} (`));
    }
  }
}

test("Grok client version override is trimmed and reread by header consumers", () => {
  const previous = process.env.GROK_CLI_CLIENT_VERSION;
  const previousUa = process.env.GROK_CLI_USER_AGENT;
  delete process.env.GROK_CLI_USER_AGENT;
  try {
    for (const version of ["1.0.46", "2.3.4-rc.1", "2.3.4+build.01", "2.3.4-rc-1+build.7"]) {
      process.env.GROK_CLI_CLIENT_VERSION = ` \t${version} `;
      assertVersion(version);
    }
    delete process.env.GROK_CLI_CLIENT_VERSION;
    assertVersion(GROK_BUILD_DEFAULT_CLIENT_VERSION);
    process.env.GROK_CLI_CLIENT_VERSION = "2.3.4";
    process.env.GROK_CLI_USER_AGENT = "custom-grok-client";
    const headers = new GrokCliExecutor().buildHeaders({}, false);
    assert.equal(headers["User-Agent"], "custom-grok-client");
    assert.equal(headers["x-grok-client-version"], "2.3.4");
  } finally {
    if (previous === undefined) delete process.env.GROK_CLI_CLIENT_VERSION;
    else process.env.GROK_CLI_CLIENT_VERSION = previous;
    if (previousUa === undefined) delete process.env.GROK_CLI_USER_AGENT;
    else process.env.GROK_CLI_USER_AGENT = previousUa;
  }
});

test("Grok client version rejects malformed or unsafe overrides and keeps the shipped pin", () => {
  const previous = process.env.GROK_CLI_CLIENT_VERSION;
  const previousUa = process.env.GROK_CLI_USER_AGENT;
  delete process.env.GROK_CLI_USER_AGENT;
  try {
    for (const version of [
      "",
      " \t ",
      "latest",
      "v1.0.46",
      "1.0",
      "01.0.46",
      "1.0.46-01",
      "1.0.46-rc..1",
      "1.0.46+",
      "1.0.46 build",
      "1.0.46\r\nX-Injected: true",
      "1.0.46\n",
      "\r1.0.46",
      "1.0.46\u0001",
      `1.0.46+${"a".repeat(128)}`,
    ]) {
      process.env.GROK_CLI_CLIENT_VERSION = version;
      assertVersion(GROK_BUILD_DEFAULT_CLIENT_VERSION);
    }
  } finally {
    if (previous === undefined) delete process.env.GROK_CLI_CLIENT_VERSION;
    else process.env.GROK_CLI_CLIENT_VERSION = previous;
    if (previousUa === undefined) delete process.env.GROK_CLI_USER_AGENT;
    else process.env.GROK_CLI_USER_AGENT = previousUa;
  }
});
