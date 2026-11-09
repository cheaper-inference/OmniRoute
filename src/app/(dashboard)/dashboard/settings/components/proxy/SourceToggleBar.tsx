"use client";

import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";

export type SourceId = "1proxy" | "proxifly" | "iplocate" | "webshare";

export const ALL_SOURCE_IDS: SourceId[] = ["1proxy", "proxifly", "iplocate", "webshare"];

export const FREE_POOL_DISABLED_SOURCES_KEY = "freePool.disabledSources";

export function loadDisabledSources(): Set<SourceId> {
  try {
    const raw = globalThis.localStorage?.getItem(FREE_POOL_DISABLED_SOURCES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown[];
    return new Set(arr.filter((id): id is SourceId => ALL_SOURCE_IDS.includes(id as SourceId)));
  } catch {
    return new Set();
  }
}

export function saveDisabledSources(disabled: Set<SourceId>): void {
  try {
    globalThis.localStorage?.setItem(FREE_POOL_DISABLED_SOURCES_KEY, JSON.stringify([...disabled]));
  } catch {}
}

interface SourceToggleBarProps {
  disabledSources: Set<SourceId>;
  onToggle: (source: SourceId) => void;
}

const SOURCES: Array<{ id: SourceId; label: string }> = [
  { id: "1proxy", label: "1proxy" },
  { id: "proxifly", label: "Proxifly" },
  { id: "iplocate", label: "IPLocate" },
  { id: "webshare", label: "Webshare" },
];

export default function SourceToggleBar({ disabledSources, onToggle }: SourceToggleBarProps) {
  const t = useTranslations("settings");

  return (
    <CheckboxGroup aria-label={t("proxyToggleSources")}>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {SOURCES.map((s) => (
          <Checkbox
            key={s.id}
            label={s.label}
            checked={!disabledSources.has(s.id)}
            onChange={() => onToggle(s.id)}
          />
        ))}
      </div>
    </CheckboxGroup>
  );
}
