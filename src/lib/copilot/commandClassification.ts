/**
 * Command classification for runOmniRouteCli approval gate (#8461).
 *
 * Defines a classification table mapping CLI subcommand patterns to safety
 * categories, plus the classifier function. Read-only commands execute
 * directly; all others are blocked with a warning asserting operator intent.
 * Unknown commands are denied by default (no matching rule → blocked).
 */

export type CommandCategory = "read-only" | "mutating" | "destructive" | "secret-affecting";

export interface ClassificationRule {
  pattern: RegExp;
  category: CommandCategory;
  reason: string;
}

const CLASSIFICATION_RULES: ClassificationRule[] = [
  // ── Destructive (highest priority) ──
  {
    pattern: /\b(?:delete|remove|rm|drop|uninstall|reset)\b/i,
    category: "destructive",
    reason: "This operation permanently removes or resets data and cannot be undone.",
  },

  // ── Secret-affecting ──
  {
    pattern: /\b(?:show.*(?:secret|key|token|credential)|key.*show|export|auth.*token)\b/i,
    category: "secret-affecting",
    reason: "This operation may expose secrets or credentials in the output.",
  },

  // ── Mutating ──
  {
    pattern:
      /\b(?:set|create|add|update|config\s+set|config\s+unset|providers?\s+add|keys?\s+create|keys?\s+revoke|settings?\s+update)\b/i,
    category: "mutating",
    reason: "This operation changes configuration or creates resources.",
  },
];

/**
 * Read-only is decided from the command words only — never from the arguments.
 * A mutating command whose arguments happen to contain a read-only keyword
 * (`combo switch my-model-list`, `switch-combo list`) must not be classified as
 * read-only, so each command word is matched as a whole token.
 */
const READ_ONLY_RULE: ClassificationRule = {
  pattern: /^(?:status|doctor|health|version|help|list|show|get|logs|models?|--help|--version)$/i,
  category: "read-only",
  reason: "This operation only reads data and does not make changes.",
};

/**
 * Top-level `omniroute` commands that are command groups (`omniroute <group> <subcommand>`),
 * mirrored from `bin/cli/commands/`. For these the subcommand decides the category; any other
 * first word is a leaf command and its following words are arguments. A group missing here is
 * only denied (fail-closed), never approved.
 */
const COMMAND_GROUPS = new Set([
  "a2a",
  "audit",
  "autostart",
  "backup",
  "batches",
  "cache",
  "cloud",
  "combo",
  "completion",
  "compression",
  "config",
  "context-eng",
  "contexts",
  "deploy",
  "env",
  "eval",
  "files",
  "health",
  "keys",
  "login",
  "mcp",
  "memory",
  "models",
  "nodes",
  "oauth",
  "oneproxy",
  "openapi",
  "packs",
  "plugin",
  "policy",
  "pricing",
  "providers",
  "quota",
  "radar",
  "redis",
  "resilience",
  "runtime",
  "sessions",
  "skills",
  "sync",
  "tags",
  "telemetry",
  "tokens",
  "translator",
  "tray",
  "tunnel",
  "usage",
  "webhooks",
]);

function isReadOnlyCommand(argv: string[]): boolean {
  const head = (argv[0] ?? "").toLowerCase();
  const next = argv[1];
  const sub = next && !next.startsWith("-") ? next.toLowerCase() : undefined;

  if (!sub) return READ_ONLY_RULE.pattern.test(head);
  // `<group> <subcommand>`: the subcommand is the action. `<leaf> <arg>`: the leaf is the
  // action, so a read-only-looking argument after a non-read-only leaf proves nothing.
  const headIsReadOnlyOrGroup = COMMAND_GROUPS.has(head) || READ_ONLY_RULE.pattern.test(head);
  return headIsReadOnlyOrGroup && READ_ONLY_RULE.pattern.test(sub);
}

/**
 * Classify a CLI command argv array into a category and matching rule.
 * The blocking rules (destructive → secret-affecting → mutating) are tested
 * against the whole command line, so a matching keyword anywhere blocks it.
 * Read-only is granted only when the command words themselves are read-only
 * (see `isReadOnlyCommand`). Returns null when nothing matches (unknown
 * command — denied by default).
 */
export function classifyCommand(argv: string[]): {
  category: CommandCategory;
  rule: ClassificationRule;
} | null {
  const cmdLine = argv.join(" ");

  for (const rule of CLASSIFICATION_RULES) {
    if (rule.pattern.test(cmdLine)) {
      return { category: rule.category, rule };
    }
  }

  if (isReadOnlyCommand(argv)) {
    return { category: READ_ONLY_RULE.category, rule: READ_ONLY_RULE };
  }

  return null;
}
