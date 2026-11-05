"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@omniroute/ui-kit/dialog";
import {
  SIDEBAR_SECTIONS,
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_PRESET_KEY,
  ESSENTIALS_ADVANCED_TOOL_IDS,
  normalizeHiddenSidebarItems,
  resolveRuntimeSidebarSections,
  type HideableSidebarItemId,
  type SidebarItemDefinition,
  type SidebarSectionChild,
} from "@/shared/constants/sidebarVisibility";
import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";

function isSidebarGroup(
  child: SidebarSectionChild
): child is Extract<SidebarSectionChild, { type: "group" }> {
  return "type" in child && child.type === "group";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null;
  return <CommandPaletteDialog onClose={onClose} />;
}

interface PaletteItem {
  id: string;
  href: string;
  icon: string;
  label: string;
  subtitle?: string;
  external: boolean;
  sectionId: string;
  sectionLabel: string;
  subgroupId?: string;
  subgroupLabel?: string;
}

const SCORE_EXACT_LABEL = 4;
const SCORE_LABEL_PREFIX = 3;
const SCORE_LABEL_SUBSTRING = 2;
const SCORE_OTHER_FIELD = 1;

/** Relevance of one palette item for a lower-cased query; 0 means no match. */
function matchScore(item: PaletteItem, q: string): number {
  const label = item.label.toLowerCase();
  if (label === q) return SCORE_EXACT_LABEL;
  if (label.startsWith(q) || label.split(/\s+/).some((word) => word.startsWith(q))) {
    return SCORE_LABEL_PREFIX;
  }
  if (label.includes(q)) return SCORE_LABEL_SUBSTRING;
  if (
    item.subtitle?.toLowerCase().includes(q) ||
    item.sectionLabel.toLowerCase().includes(q) ||
    item.subgroupLabel?.toLowerCase().includes(q)
  ) {
    return SCORE_OTHER_FIELD;
  }
  return 0;
}

interface PaletteSubgroup {
  subgroupId: string | null;
  subgroupLabel: string | null;
  items: { item: PaletteItem; flatIndex: number }[];
}

interface PaletteGroup {
  sectionId: string;
  sectionLabel: string;
  subgroups: PaletteSubgroup[];
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("sidebar");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [radarAdminUrl, setRadarAdminUrl] = useState<unknown>(null);
  // The palette has no DialogTrigger (Radix's own focus return target) and mounts fresh on
  // open, so the element focused before the first render is the one to return to on close.
  const [opener] = useState<HTMLElement | null>(() => {
    if (typeof document === "undefined") return null;
    const active = document.activeElement;
    return active instanceof HTMLElement && active !== document.body ? active : null;
  });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/settings", { signal: ctrl.signal })
      .then((res) => res.json())
      .then((data) => {
        setHiddenItems(
          new Set(normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]))
        );
        setActivePreset(
          typeof data?.[SIDEBAR_PRESET_KEY] === "string" ? data[SIDEBAR_PRESET_KEY] : null
        );
        setRadarAdminUrl(data?.radarAdminUrl ?? null);
      })
      .catch(() => {
        // ignore aborts and fetch failures; palette still works with empty hidden set
      });
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(id);
  }, []);

  const safeTranslate = useCallback(
    (key: string, fallback: string) => {
      try {
        if (typeof t.has === "function" && !t.has(key)) return fallback;
        return t(key);
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const allItems = useMemo<PaletteItem[]>(
    () =>
      resolveRuntimeSidebarSections(SIDEBAR_SECTIONS, { radarAdminUrl }).flatMap((section) => {
        const sectionLabel = safeTranslate(section.titleKey, section.titleFallback);
        return section.children.flatMap<PaletteItem>((child) => {
          if (isSidebarGroup(child)) {
            const subgroupLabel = safeTranslate(child.titleKey, child.titleFallback);
            return child.items
              .filter((item) => {
                if (!hiddenItems.has(item.id)) return true;
                return (
                  activePreset === "essentials" &&
                  ESSENTIALS_ADVANCED_TOOL_IDS.has(item.id as HideableSidebarItemId)
                );
              })
              .map<PaletteItem>((item) => ({
                id: item.id,
                href: item.href,
                icon: item.icon,
                label: safeTranslate(item.i18nKey, item.labelFallback ?? item.id),
                subtitle: item.subtitleKey
                  ? safeTranslate(item.subtitleKey, item.subtitleFallback ?? "")
                  : item.subtitleFallback,
                external: item.external ?? false,
                sectionId: section.id,
                sectionLabel,
                subgroupId: child.id,
                subgroupLabel,
              }));
          }
          const item = child as SidebarItemDefinition;
          if (hiddenItems.has(item.id)) {
            const keepForEssentials =
              activePreset === "essentials" &&
              ESSENTIALS_ADVANCED_TOOL_IDS.has(item.id as HideableSidebarItemId);
            if (!keepForEssentials) return [];
          }
          return [
            {
              id: item.id,
              href: item.href,
              icon: item.icon,
              label: safeTranslate(item.i18nKey, item.labelFallback ?? item.id),
              subtitle: item.subtitleKey
                ? safeTranslate(item.subtitleKey, item.subtitleFallback ?? "")
                : item.subtitleFallback,
              external: item.external ?? false,
              sectionId: section.id,
              sectionLabel,
            },
          ];
        });
      }),
    [hiddenItems, radarAdminUrl, safeTranslate, activePreset]
  );

  // #17915: matches are ranked, not left in sidebar order, so a broad query such as "log"
  // reaches the Logs page before "Log export" or the substring hit in "Radar Catalog".
  // Ties keep the shorter label first (the closer match), then the sidebar order.
  const ranked = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems
      .map((item, index) => ({ item, index, score: matchScore(item, q) }))
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score || a.item.label.length - b.item.label.length || a.index - b.index
      )
      .map((entry) => entry.item);
  }, [allItems, query]);

  // Sections and subgroups appear in the order of their best match, and `filtered` (the
  // list the keyboard walks) is the flattened display order, so arrow keys follow what
  // is on screen even when one section's matches rank apart from each other.
  const grouped = useMemo<PaletteGroup[]>(() => {
    const groups: PaletteGroup[] = [];
    const sectionById = new Map<string, PaletteGroup>();
    ranked.forEach((item) => {
      // Look up the section/subgroup by id across the whole list, not just the
      // previous item — a section's children can interleave root items and
      // groups (e.g. "omni-proxy" has a trailing root item after its groups),
      // which would otherwise produce two separate "_root" subgroups sharing
      // the same React key.
      let section = sectionById.get(item.sectionId);
      if (!section) {
        section = {
          sectionId: item.sectionId,
          sectionLabel: item.sectionLabel,
          subgroups: [],
        };
        sectionById.set(item.sectionId, section);
        groups.push(section);
      }
      const itemSubgroupId = item.subgroupId ?? null;
      let subgroup = section.subgroups.find((sg) => sg.subgroupId === itemSubgroupId);
      if (!subgroup) {
        subgroup = {
          subgroupId: itemSubgroupId,
          subgroupLabel: item.subgroupLabel ?? null,
          items: [],
        };
        section.subgroups.push(subgroup);
      }
      subgroup.items.push({ item, flatIndex: -1 });
    });
    let flatIndex = 0;
    for (const section of groups) {
      for (const subgroup of section.subgroups) {
        for (const entry of subgroup.items) entry.flatIndex = flatIndex++;
      }
    }
    return groups;
  }, [ranked]);

  const filtered = useMemo(
    () =>
      grouped.flatMap((section) =>
        section.subgroups.flatMap((subgroup) => subgroup.items.map((entry) => entry.item))
      ),
    [grouped]
  );

  const handleNavigate = useCallback(
    (href: string, external: boolean) => {
      onClose();
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    },
    [onClose, router]
  );

  useEffect(() => {
    // Escape is handled by the kit Dialog (onOpenChange(false) → onClose), not here, so it
    // never fires onClose twice.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          handleNavigate(item.href, item.external);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filtered, selectedIndex, handleNavigate]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-flat-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {/* Opens near the top like the legacy palette: the kit centres with translate(-50%, -50%),
          so the transform and the slide-in keyframes are overridden (fade only). */}
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          if (opener?.isConnected) opener.focus();
        }}
        className="top-[10vh] max-w-3xl overflow-hidden p-0 [animation-name:ci-fade-in] [transform:translateX(-50%)]"
      >
        <DialogTitle className="ci-sr-only">{t("commandPalette.title")}</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border px-5 py-3">
          <Input
            ref={inputRef}
            type="search"
            icon="search"
            className="flex-1 [&_.ci-input-shell]:border-0 [&_.ci-input-shell]:bg-transparent [&_.ci-input-shell]:shadow-none"
            inputClassName="[&::-webkit-search-cancel-button]:appearance-none"
            placeholder={t("commandPalette.searchPlaceholder")}
            aria-label={t("commandPalette.searchPlaceholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
              aria-label={t("commandPalette.clearSearch")}
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
            >
              <Icon name="close" size={16} />
            </Button>
          )}
          <kbd className="hidden shrink-0 rounded border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted sm:inline-flex">
            Esc
          </kbd>
        </div>

        {grouped.length > 0 ? (
          <ul
            ref={listRef}
            role="listbox"
            aria-label={t("commandPalette.title")}
            className="custom-scrollbar max-h-[60vh] overflow-y-auto py-2"
          >
            {grouped.map((group) => (
              <li key={group.sectionId} role="presentation">
                <div className="ci-eyebrow sticky top-0 z-10 border-b border-border bg-surface px-5 py-1.5">
                  {group.sectionLabel}
                </div>
                <ul role="group" aria-label={group.sectionLabel}>
                  {group.subgroups.map((subgroup) => (
                    <li
                      key={`${group.sectionId}::${subgroup.subgroupId ?? "_root"}`}
                      role="presentation"
                    >
                      {subgroup.subgroupLabel && (
                        <div className="px-5 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
                          {subgroup.subgroupLabel}
                        </div>
                      )}
                      <ul
                        role={subgroup.subgroupLabel ? "group" : "presentation"}
                        aria-label={subgroup.subgroupLabel ?? undefined}
                      >
                        {subgroup.items.map(({ item, flatIndex }) => {
                          const selected = flatIndex === selectedIndex;
                          return (
                            <li
                              key={item.id}
                              role="option"
                              aria-selected={selected}
                              data-flat-index={flatIndex}
                            >
                              {/* kit-exception: Native button styled as the kit menu row (.ci-menu__item). */}
                              <button
                                type="button"
                                className={cn(
                                  "ci-menu__item w-full gap-3 py-2.5 text-start",
                                  subgroup.subgroupLabel ? "ps-10 pe-5" : "px-5",
                                  selected ? "bg-surface-2 text-heading" : "text-text-main"
                                )}
                                onClick={() => handleNavigate(item.href, item.external)}
                                onMouseEnter={() => setSelectedIndex(flatIndex)}
                              >
                                <span
                                  className={cn(
                                    "shrink-0",
                                    selected ? "text-heading" : "text-text-muted"
                                  )}
                                >
                                  <Icon name={item.icon} size={18} />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">{item.label}</p>
                                  {item.subtitle && (
                                    <p className="truncate text-xs text-text-muted">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                                {item.external && (
                                  <span className="shrink-0 text-text-muted">
                                    <Icon name="open_in_new" size={14} />
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-center text-sm text-text-muted">{t("noResults")}</div>
        )}

        <div className="flex items-center gap-4 border-t border-border px-5 py-2 text-[11px] text-text-muted">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-bg-subtle px-1 py-0.5 font-mono">
              ↑↓
            </kbd>
            {t("commandPalette.navigate")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-bg-subtle px-1 py-0.5 font-mono">↵</kbd>
            {t("commandPalette.open")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-bg-subtle px-1 py-0.5 font-mono">
              Esc
            </kbd>
            {t("commandPalette.close")}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
