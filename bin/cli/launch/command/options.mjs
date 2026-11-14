// bin/cli/launch/command/options.mjs: the `launch` option table and its help footer.

import { Option } from "commander";

import { displayNameOf } from "./shared.mjs";

/** `launch` options in --help order: [flags, description]. */
const LAUNCH_OPTIONS = [
  ["-m, --model <id>", "model id (default: saved default, last used, or the picker)"],
  ["--provider <id>", "provider prefix for --model"],
  ["--pick", "force the interactive model picker"],
  [
    "--all-models",
    "list every catalog model (default: only providers you have a key for, no auto/*)",
  ],
  ["--favorite", "mark the chosen model as a favorite"],
  ["--unfavorite", "remove the chosen model from favorites"],
  ["-p, --profile <name>", "tool profile (tools that support it)"],
  ["--port <n>", "local gateway port (default PORT or 20128)"],
  ["--remote <url>", "remote gateway URL (no lifecycle)"],
  ["--base-url <url>", "alias for --remote"],
  ["--context <name>", "named context (default OMNIROUTE_CONTEXT)"],
  ["--api-key <key>", "credential for the gateway"],
  ["--token <key>", "alias for --api-key"],
  ["--api-key-env <NAME>", "read the credential from this env var"],
  ["--no-start", "never auto-start the gateway; fail if it is down"],
  ["--keep-gateway", "keep a gateway this launch started running afterwards"],
  ["--start-timeout <ms>", "gateway readiness wait"],
  ["--inherit-env", "pass the full parent environment to the tool"],
  ["--dry-run", "print the launch plan, no side effects"],
  ["--json", "machine-readable output (plan, result, list, or error)"],
  ["-y, --yes", "non-interactive: never prompt"],
  ["--doctor", "run checks for this tool, no spawn"],
  ["--cleanup", "remove stale leases and orphan launcher temp dirs"],
  ["--tag <name>", "session tag for logs and cost"],
  ["--no-summary", "skip the usage/cost summary on exit (OMNIROUTE_LAUNCH_SUMMARY=0)"],
  ["--set-default", "save the chosen model as this tool's default"],
  ["--private", "also turn off the tool's telemetry and nonessential traffic"],
  ["--list", "list launchable tools: installed, version, tier"],
];

/** Section 9 v1.x flags: declared so commander accepts them, rejected by core (exit 2). */
const RESERVED_OPTIONS = [
  ["--budget <amount>", "reserved: session budget"],
  ["--budget-fallback <model>", "reserved: model to use once the budget is hit"],
  ["--mode <name>", "reserved: policy mode"],
  ["--compression <level>", "reserved: prompt compression"],
  ["--mcp [servers]", "reserved: MCP auto-wire"],
  ["--statusline", "reserved: Claude statusline with live cost"],
  ["--exec [prompt]", "reserved: headless exec mode"],
  ["--install", "reserved: install the tool"],
];

/** Declare every `launch` option, then the hidden reserved ones. */
export function addLaunchOptions(cmd) {
  for (const [flags, description] of LAUNCH_OPTIONS) cmd.option(flags, description);
  for (const [flags, description] of RESERVED_OPTIONS) {
    cmd.addOption(new Option(flags, description).hideHelp());
  }
  return cmd;
}

/** `{ id, tier, displayName }` per registered tool, from metadata only when available. */
function registryRows(registry) {
  if (typeof registry.ids === "function" && typeof registry.entry === "function") {
    return registry.ids().map((id) => {
      const entry = registry.entry(id);
      return { id, tier: entry.tier, displayName: entry.displayName };
    });
  }
  return registry.list().map((adapter) => ({
    id: adapter.id,
    tier: adapter.capabilities.tier,
    displayName: displayNameOf(registry, adapter),
  }));
}

function toolLine(registry, row) {
  const aliases = registry.aliasesOf?.(row.id) || [];
  const alias = aliases.length > 0 ? ` (aliases: ${aliases.join(", ")})` : "";
  return `  ${row.id.padEnd(10)} ${row.tier.padEnd(10)} ${row.displayName}${alias}`;
}

function toolLines(registry) {
  const lines = [];
  try {
    for (const row of registryRows(registry)) lines.push(toolLine(registry, row));
  } catch {
    lines.push("  (registry unavailable)");
  }
  return lines;
}

const reservedNames = () => RESERVED_OPTIONS.map(([o]) => o.split(" ")[0]).join(" ");

export function helpFooter(registry) {
  const lines = [
    "",
    "Launchable tools:",
    ...toolLines(registry),
    "",
    "Everything after -- goes to the tool verbatim.",
    `Reserved for a later release (exit 2): ${reservedNames()} @<preset>`,
    "",
    "Examples:",
    "  omnirouter launch claude",
    "  omnirouter launch codex -m openai/gpt-5.2 -- --full-auto",
    "  omnirouter launch opencode --dry-run --json",
    "  omnirouter launch --list",
  ];
  return `${lines.join("\n")}\n`;
}
