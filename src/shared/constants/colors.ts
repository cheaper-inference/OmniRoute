/**
 * Shared UI constants — single source of truth for the provider, protocol, proxy-type, level and
 * status badges drawn by the loggers (RequestLoggerV2, RequestLoggerDetail, ProxyLogger,
 * ProxyLogDetail) and the conversations list.
 *
 * Every colour is a kit token, never a literal: a badge is a kit tone, resolved per theme and
 * palette (Classic / Editions, light / dark) by the CSS variables of `packages/ui-kit/src`.
 *
 * - `chart-N` → `--ci-chart-N-ink` text on the opaque `--ci-chart-N-subtle` tint, with the
 *   `--ci-chart-N` hue as the optional border (the kit pairs them for chips and rows; the ink is
 *   AA on the tint and on every content surface).
 * - `success` / `warning` / `danger` / `info` → the kit status ink on its `-bg` tint.
 * - `neutral` → body text on the muted surface.
 *
 * `tests/unit/log-badge-palette-contrast.test.ts` resolves every entry against the kit token
 * files and fails below 4.5:1, so a hex value or a white-on-brand badge cannot come back.
 */

export type BadgeTone =
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "chart-6"
  | "chart-7"
  | "chart-8"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface BadgeColors {
  tone: BadgeTone;
  /** Badge background (opaque tint). */
  bg: string;
  /** Badge text; also AA on the page background, so an inactive chip can drop the tint. */
  text: string;
  /** Border / ring for the active state of a chip. */
  border: string;
}

export interface LabeledBadgeColors extends BadgeColors {
  label: string;
}

/** CSS-variable colours of a kit tone. */
export function badgeTone(tone: BadgeTone): BadgeColors {
  if (tone.startsWith("chart-")) {
    return {
      tone,
      bg: `var(--ci-${tone}-subtle)`,
      text: `var(--ci-${tone}-ink)`,
      border: `var(--ci-${tone})`,
    };
  }
  if (tone === "neutral") {
    return {
      tone,
      bg: "var(--ci-color-surface-muted)",
      text: "var(--ci-color-text)",
      border: "var(--ci-color-border-strong)",
    };
  }
  return {
    tone,
    bg: `var(--ci-color-${tone}-bg)`,
    text: `var(--ci-color-${tone})`,
    border: `var(--ci-color-${tone})`,
  };
}

function labeled(tone: BadgeTone, label: string): LabeledBadgeColors {
  return { ...badgeTone(tone), label };
}

/** Neutral badge for a key with no entry (an unknown provider, proxy type…). */
export function neutralBadge(label: string): LabeledBadgeColors {
  return labeled("neutral", label);
}

// ═══════════════════════════════════════════
// Provider badges (used across all logger components)
// ═══════════════════════════════════════════

export const PROVIDER_COLORS: Record<string, LabeledBadgeColors> = {
  github: labeled("chart-3", "GitHub"),
  kiro: labeled("chart-8", "Kiro"),
  antigravity: labeled("chart-2", "AG"),
  claude: labeled("chart-6", "Claude"),
  codex: labeled("chart-4", "Codex"),
  gemini: labeled("chart-7", "Gemini"),
  qwen: labeled("chart-3", "Qwen"),
  qoder: labeled("chart-5", "Qoder"),
  fireworks: labeled("chart-6", "Fireworks"),
  kimi: labeled("chart-7", "Kimi"),
  cheaperinference: labeled("chart-1", "Cheaper Inference"),
};

// ═══════════════════════════════════════════
// Protocol badges (RequestLoggerV2)
// ═══════════════════════════════════════════

export const PROTOCOL_COLORS: Record<string, LabeledBadgeColors> = {
  openai: labeled("neutral", "OpenAI-Chat"),
  "openai-responses": labeled("neutral", "OpenAI-Responses"),
  claude: labeled("chart-6", "Claude"),
  gemini: labeled("chart-2", "Gemini"),
  warmup: labeled("warning", "Warmup"),
  bypass: labeled("neutral", "Bypass"),
};

const PROTOCOL_KEY_ALIASES: Record<string, string> = {
  "openai-chat": "openai",
  "openai-response": "openai-responses",
};

function normalizeProtocolKey(protocol: string): string {
  return PROTOCOL_KEY_ALIASES[protocol] || protocol;
}

// ═══════════════════════════════════════════
// Proxy type badges (ProxyLogger)
// ═══════════════════════════════════════════

export const TYPE_COLORS: Record<string, LabeledBadgeColors> = {
  http: labeled("chart-2", "HTTP"),
  https: labeled("chart-4", "HTTPS"),
  socks5: labeled("chart-3", "SOCKS5"),
};

// ═══════════════════════════════════════════
// Level badges (ProxyLogger)
// ═══════════════════════════════════════════

export const LEVEL_COLORS: Record<string, LabeledBadgeColors> = {
  key: labeled("warning", "Key"),
  combo: labeled("chart-3", "Combo"),
  provider: labeled("chart-2", "Provider"),
  global: labeled("neutral", "Global"),
  direct: labeled("neutral", "Direct"),
};

// ═══════════════════════════════════════════
// Status helpers
// ═══════════════════════════════════════════

/** Badge colours for an HTTP status code (2xx success, 4xx warning, 5xx danger, 0 = pending). */
export function getHttpStatusStyle(status: number): BadgeColors {
  if (status >= 200 && status < 300) return badgeTone("success");
  if (status >= 400 && status < 500) return badgeTone("warning");
  if (status >= 500) return badgeTone("danger");
  if (status === 0) return badgeTone("info");
  return badgeTone("neutral");
}

/** Badge colours for a proxy status string ("success", "error", "timeout"). */
export function getProxyStatusStyle(status: string): BadgeColors {
  if (status === "success") return badgeTone("success");
  if (status === "error") return badgeTone("danger");
  if (status === "timeout") return badgeTone("warning");
  return badgeTone("neutral");
}

/**
 * Protocol badge for a request, falling back to the provider key and then to a neutral badge
 * labelled with the upper-cased key.
 */
export function getProtocolColor(protocol: string, fallbackProvider?: string): LabeledBadgeColors {
  const normalized = normalizeProtocolKey(protocol);
  return (
    PROTOCOL_COLORS[normalized] ||
    (fallbackProvider ? PROTOCOL_COLORS[fallbackProvider] : undefined) ||
    neutralBadge((protocol || fallbackProvider || "-").toUpperCase())
  );
}
