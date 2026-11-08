"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";

interface ApiKeyInfo {
  id: string;
  name: string;
}

interface ApiKeyFilterDropdownProps {
  available: ApiKeyInfo[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

function maskKeyName(name: string): string {
  if (!name || name.length <= 8) return name || "unknown";
  return `${name.slice(0, 6)}…${name.slice(-4)}`;
}

export default function ApiKeyFilterDropdown({
  available,
  selected,
  onChange,
}: ApiKeyFilterDropdownProps) {
  const t = useTranslations("analytics");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        // Focus goes back to the trigger (disclosure pattern).
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter(
      (k) => k.name.toLowerCase().includes(q) || k.id.toLowerCase().includes(q)
    );
  }, [available, query]);

  const isAllSelected = selected.length === 0;

  const toggleKey = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        const next = selected.filter((s) => s !== id);
        onChange(next);
      } else {
        onChange([...selected, id]);
      }
    },
    [selected, onChange]
  );

  const selectAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const buttonLabel = useMemo(() => {
    if (isAllSelected) return t("filterAllKeys");
    if (selected.length === 1) {
      const key = available.find((k) => k.id === selected[0]);
      return key ? maskKeyName(key.name) : t("filterOneKey");
    }
    return t("filterMultipleKeys", { count: selected.length });
  }, [isAllSelected, selected, available, t]);

  if (available.length === 0) return null;

  return (
    <div className="relative" ref={ref}>
      <Button
        size="sm"
        variant={isAllSelected ? "outline" : "secondary"}
        onClick={() => setOpen((v) => !v)}
        ref={triggerRef}
        aria-expanded={open}
        className={`h-8 min-h-8 gap-1.5 px-3 text-xs ${isAllSelected ? "text-text-muted" : ""}`}
      >
        <Icon name="vpn_key" size={14} />
        {buttonLabel}
        <Icon
          name="expand_more"
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-[260px] rounded-xl border border-border/50 bg-surface shadow-xl">
          {/* Search */}
          {available.length > 5 && (
            <div className="border-b border-border/30 p-2">
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("filterSearchKeys")}
                aria-label={t("filterSearchKeys")}
                icon="search"
                autoFocus
              />
            </div>
          )}

          {/* A disclosure with a group of toggle buttons (aria-pressed), not an ARIA menu: Tab moves
              through the keys, Escape closes and returns focus to the trigger. */}
          <div
            role="group"
            aria-label={buttonLabel}
            className="max-h-[280px] overflow-y-auto p-1.5"
          >
            {/* All Keys option */}
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={isAllSelected}
              onClick={selectAll}
              className={`h-auto min-h-0 w-full justify-start gap-2.5 px-2.5 py-2 text-left text-xs ${
                isAllSelected ? "bg-accent-light font-semibold text-text-main" : "text-text-muted"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                  isAllSelected
                    ? "border-primary bg-primary text-accent-foreground"
                    : "border-border/60 bg-transparent"
                }`}
              >
                {isAllSelected && <Icon name="check" size={12} />}
              </span>
              {t("filterAllKeys")}
              <span className="ml-auto text-[10px] text-text-muted font-normal">
                {available.length}
              </span>
            </Button>

            {/* Divider */}
            <div className="my-1 h-px bg-border/20" />

            {/* Individual keys */}
            {filtered.map((key) => {
              const isChecked = selected.includes(key.id);

              return (
                <Button
                  key={key.id}
                  variant="ghost"
                  size="sm"
                  aria-pressed={isChecked}
                  onClick={() => toggleKey(key.id)}
                  className={`h-auto min-h-0 w-full justify-start gap-2.5 px-2.5 py-2 text-left text-xs ${
                    isChecked ? "text-text-main" : "text-text-muted"
                  }`}
                  title={key.name || key.id}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                      isChecked
                        ? "border-primary bg-primary text-accent-foreground"
                        : "border-border/60 bg-transparent"
                    }`}
                  >
                    {isChecked && <Icon name="check" size={12} />}
                  </span>
                  <span className="truncate">{maskKeyName(key.name || key.id)}</span>
                </Button>
              );
            })}

            {filtered.length === 0 && (
              <p className="px-2.5 py-3 text-center text-[11px] text-text-muted">
                {t("filterNoKeysMatch")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
