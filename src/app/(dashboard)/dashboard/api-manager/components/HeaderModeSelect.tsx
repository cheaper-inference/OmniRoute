"use client";

import { useTranslations } from "next-intl";
import { Select } from "@/shared/components";
import {
  ANTHROPIC_RATE_LIMIT_HEADER_MODES,
  isAnthropicRateLimitHeaderMode,
} from "../selfServiceQuota";
import type { AnthropicRateLimitHeaderMode } from "../selfServiceQuota";

const HEADER_MODE_COPY: Record<AnthropicRateLimitHeaderMode, { label: string; desc: string }> = {
  auto: { label: "anthropicRateLimitHeadersAuto", desc: "anthropicRateLimitHeadersAutoDesc" },
  forward: {
    label: "anthropicRateLimitHeadersForward",
    desc: "anthropicRateLimitHeadersForwardDesc",
  },
  strip: { label: "anthropicRateLimitHeadersStrip", desc: "anthropicRateLimitHeadersStripDesc" },
};

/** Select + per-mode description list for the upstream `anthropic-ratelimit-*` header mode. */
export function HeaderModeSelect({
  id,
  value,
  disabled,
  onChange,
}: {
  id: string;
  value: AnthropicRateLimitHeaderMode;
  disabled: boolean;
  onChange: (mode: AnthropicRateLimitHeaderMode) => void;
}) {
  const t = useTranslations("apiManager");
  return (
    <div className="flex flex-col gap-1.5">
      <Select
        id={id}
        label={t("anthropicRateLimitHeadersLabel")}
        hint={t("anthropicRateLimitHeadersDesc")}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          const mode = event.target.value;
          if (isAnthropicRateLimitHeaderMode(mode)) onChange(mode);
        }}
        selectClassName="w-full sm:w-auto"
      >
        {ANTHROPIC_RATE_LIMIT_HEADER_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {t(HEADER_MODE_COPY[mode].label)}
          </option>
        ))}
      </Select>
      <ul className="flex flex-col gap-0.5 text-[11px] text-text-muted">
        {ANTHROPIC_RATE_LIMIT_HEADER_MODES.map((mode) => (
          <li key={mode} className={value === mode ? "text-text-main" : undefined}>
            <span className="font-semibold">{t(HEADER_MODE_COPY[mode].label)}:</span>{" "}
            {t(HEADER_MODE_COPY[mode].desc)}
          </li>
        ))}
      </ul>
    </div>
  );
}
