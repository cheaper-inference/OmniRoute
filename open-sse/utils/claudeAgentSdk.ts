/**
 * Claude Agent SDK resolver (provider id: "claude-agent").
 *
 * The SDK (@anthropic-ai/claude-agent-sdk) spawns its bundled Claude Code CLI,
 * which authenticates with the host's existing Claude Code login. OmniRoute
 * never stores an Anthropic credential or calls the Anthropic API directly.
 * The dependency is always bundled, but the import stays lazy so the server
 * still boots (and the provider just fails to execute) if the package is
 * missing from a broken install.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { logger } from "./logger.ts";

const log = logger("CLAUDE_AGENT_SDK");

type SdkModule = typeof import("@anthropic-ai/claude-agent-sdk");

let cached: SdkModule | null | undefined;

/** Lazy-import the SDK; null (with a debug log) when unresolvable. */
export async function resolveClaudeAgentSdk(): Promise<SdkModule | null> {
  if (cached === undefined) {
    try {
      cached = await import("@anthropic-ai/claude-agent-sdk");
    } catch (err) {
      log.debug("claude-agent-sdk unavailable", { error: String(err) });
      cached = null;
    }
  }
  return cached;
}

/**
 * Path to the vendored Claude Code CLI inside the installed SDK platform
 * package (the `pathToClaudeCodeExecutable` target the SDK spawns).
 */
export function resolveClaudeCodeExecutable(sdk: SdkModule | null): string | null {
  if (!sdk) return null;
  try {
    const require = createRequire(import.meta.url);
    // exports map has no "./package.json" subpath — resolve the main entry instead
    const entryPath = require.resolve("@anthropic-ai/claude-agent-sdk");
    const sdkDir = path.dirname(entryPath);
    const pkg = JSON.parse(
      fs.readFileSync(path.join(sdkDir, "package.json"), "utf8"),
    ) as { optionalDependencies?: Record<string, string> };
    const exeName = process.platform === "win32" ? "claude.exe" : "claude";
    for (const name of Object.keys(pkg.optionalDependencies ?? {})) {
      const exe = path.join(sdkDir, "..", "..", name, exeName);
      if (fs.existsSync(exe)) return exe;
    }
  } catch (err) {
    log.debug("vendored Claude Code CLI not found", { error: String(err) });
  }
  return null;
}
