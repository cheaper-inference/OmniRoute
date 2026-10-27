"use client";

import { useTranslations } from "next-intl";
import { Badge, Button, Card, Select, Spinner, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface FeatureFlagCardProps {
  flag: {
    key: string;
    label: string;
    description: string;
    category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
    type: "boolean" | "enum";
    enumValues?: string[] | null;
    effectiveValue: string;
    source: "db" | "env" | "default";
    requiresRestart: boolean;
    warningLevel?: "info" | "caution" | "danger";
  };
  onToggle: (key: string, newValue: string) => void;
  onReset: (key: string) => void;
  saving?: boolean;
  /** "clamp": 2-line clamp + full text on hover. "full": always expanded. */
  descriptionMode?: "clamp" | "full";
}

type BadgeTone = "default" | "primary" | "success" | "warning" | "error" | "info";

// Category and source chips use the kit Badge tones (globals.css "Badge status tones").
const CATEGORY_TONE: Record<FeatureFlagCardProps["flag"]["category"], BadgeTone> = {
  security: "error",
  network: "info",
  policies: "warning",
  runtime: "primary",
  cli: "success",
  health: "default",
};

const SOURCE_STYLES: Record<
  FeatureFlagCardProps["flag"]["source"],
  { tone: BadgeTone; label: string }
> = {
  db: { tone: "info", label: "DB" },
  env: { tone: "warning", label: "ENV" },
  default: { tone: "default", label: "DEF" },
};

function isEnabled(value: string): boolean {
  return value === "true" || value === "1" || value === "yes";
}

/**
 * `EXPOSE_CC_DISCOVERY_ALIASES` resolves with env-wins-over-db precedence (see
 * db/ccDiscoveryAliases.ts::getCcAliasGlobalState), the opposite of every other
 * flag — so a plain ENV badge could be misread as "toggle it off here" when the
 * environment variable is what is actually forcing it on. Renders nothing for
 * any other flag or source.
 */
function EnvPrecedenceWarning({
  flag,
  text,
}: {
  flag: FeatureFlagCardProps["flag"];
  text: string;
}) {
  if (flag.key !== "EXPOSE_CC_DISCOVERY_ALIASES" || flag.source !== "env") return null;
  return (
    <p className="mb-3 rounded border border-warning/30 bg-warning-bg px-2 py-1 text-xs text-warning">
      {text}
    </p>
  );
}

export default function FeatureFlagCard({
  flag,
  onToggle,
  onReset,
  saving = false,
  descriptionMode = "clamp",
}: FeatureFlagCardProps) {
  const t = useTranslations("featureFlags");
  const enabled = flag.type === "boolean" ? isEnabled(flag.effectiveValue) : false;
  const source = SOURCE_STYLES[flag.source];

  return (
    <Card
      role="group"
      aria-label={flag.label}
      padding="sm"
      className={flag.type === "boolean" && enabled ? "border-success/40" : undefined}
    >
      {/* Top row: category badge + toggle/select */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <Badge
          variant={CATEGORY_TONE[flag.category]}
          size="sm"
          aria-label={t("categoryLabel", { category: t(`categories.${flag.category}`) })}
        >
          {t(`categories.${flag.category}`)}
        </Badge>

        <div className="flex items-center gap-2">
          {saving && <Spinner size="sm" />}

          {flag.type === "boolean" ? (
            <Toggle
              size="sm"
              ariaLabel={flag.label}
              checked={enabled}
              disabled={saving}
              onChange={() => onToggle(flag.key, enabled ? "false" : "true")}
            />
          ) : (
            <Select
              compact
              aria-label={flag.label}
              disabled={saving}
              value={flag.effectiveValue}
              onChange={(e) => onToggle(flag.key, e.target.value)}
              options={(flag.enumValues ?? []).map((val) => ({
                value: val,
                label: t.has(`enumValues.${val}`) ? t(`enumValues.${val}`) : val,
              }))}
            />
          )}
        </div>
      </div>

      {/* Flag key + warning icon */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="flex-1 truncate font-mono text-xs font-semibold text-text-main">
          {flag.key}
        </span>

        {flag.warningLevel === "caution" && (
          <Icon name="warning" size={16} className="text-warning" ariaLabel={t("caution")} />
        )}
        {flag.warningLevel === "danger" && (
          <Icon name="error" size={16} className="text-error" ariaLabel={t("danger")} />
        )}
        {flag.requiresRestart && (
          <Icon
            name="restart_alt"
            size={14}
            className="text-text-muted"
            ariaLabel={t("requiresRestart")}
          />
        )}
      </div>

      {/* Description — either always expanded in full, or clamped to 2 lines
          with the full text revealed on hover (mode set in the grid toolbar) */}
      {descriptionMode === "full" ? (
        <p className="mb-3 text-pretty text-xs leading-relaxed text-text-muted">
          {flag.description}
        </p>
      ) : (
        <div className="group/desc relative">
          <p
            aria-describedby={`desc-tooltip-${flag.key}`}
            className="mb-3 cursor-help line-clamp-2 text-xs text-text-muted"
          >
            {flag.description}
          </p>
          <div
            id={`desc-tooltip-${flag.key}`}
            role="tooltip"
            className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-3rem)] rounded-lg border border-border bg-surface p-3 text-xs leading-relaxed text-text-main opacity-0 shadow-lg transition-opacity duration-150 group-hover/desc:visible group-hover/desc:opacity-100"
          >
            {flag.description}
          </div>
        </div>
      )}

      <EnvPrecedenceWarning flag={flag} text={t("ccDiscoveryAliasesEnvWarning")} />

      {/* Bottom row: source badge + reset button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted">{t("source")}:</span>
          <Badge variant={source.tone} size="sm" className="font-mono">
            {source.label}
          </Badge>
        </div>

        {flag.source === "db" && (
          <Button
            variant="ghost"
            size="sm"
            icon="refresh"
            aria-label={t("resetFlag", { label: flag.label })}
            disabled={saving}
            onClick={() => onReset(flag.key)}
          >
            {t("reset")}
          </Button>
        )}
      </div>
    </Card>
  );
}
