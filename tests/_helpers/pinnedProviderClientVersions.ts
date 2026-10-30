import { afterAll } from "vitest";

import { DEFAULT_CODEX_CLIENT_VERSION } from "@/shared/constants/codexClient";
import { GITHUB_COPILOT_CLI_VERSION } from "@omniroute/open-sse/config/providerHeaderProfiles";

// Provider registry imports build these headers before a UI test installs its
// request fixtures. Use the existing version overrides to keep those background
// lookups offline while preserving each test's fetch mock and request assertions.
const inheritedVersions = {
  CODEX_CLIENT_VERSION: process.env.CODEX_CLIENT_VERSION,
  GITHUB_COPILOT_CLI_VERSION: process.env.GITHUB_COPILOT_CLI_VERSION,
};

process.env.CODEX_CLIENT_VERSION = DEFAULT_CODEX_CLIENT_VERSION;
process.env.GITHUB_COPILOT_CLI_VERSION = GITHUB_COPILOT_CLI_VERSION;

afterAll(() => {
  for (const [name, value] of Object.entries(inheritedVersions)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});
