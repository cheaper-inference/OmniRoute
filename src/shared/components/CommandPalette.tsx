"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@omniroute/ui-kit/command";
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
import Button from "./Button";
import Icon from "./Icon";

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

// Same folding as the kit Command filter, which keeps its copy private: a query it lets through
// must score the same, so "configuracoes" ranks "Configurações" as a label match.
function fold(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase();
}

/**
 * Relevance of one palette item for a folded query. Only orders the rows: the kit filter decides
 * which ones show, so a 0 here can still be a visible row (every word found, but split across
 * fields, as in "logs monitoring").
 */
function matchScore(item: PaletteItem, q: string): number {
  const label = fold(item.label);
  if (label === q) return SCORE_EXACT_LABEL;
  if (label.startsWith(q) || label.split(/\s+/).some((word) => word.startsWith(q))) {
    return SCORE_LABEL_PREFIX;
  }
  if (label.includes(q)) return SCORE_LABEL_SUBSTRING;
  const otherFields = [item.subtitle, item.sectionLabel, item.subgroupLabel];
  return otherFields.some((field) => field && fold(field).includes(q)) ? SCORE_OTHER_FIELD : 0;
}

interface PaletteSubgroup {
  subgroupId: string | null;
  subgroupLabel: string | null;
  items: PaletteItem[];
}

interface PaletteGroup {
  sectionId: string;
  sectionLabel: string;
  subgroups: PaletteSubgroup[];
}

function PaletteOption({
  item,
  onNavigate,
}: {
  item: PaletteItem;
  onNavigate: (href: string, external: boolean) => void;
}) {
  return (
    <CommandItem
      value={item.label}
      keywords={[item.subtitle, item.sectionLabel, item.subgroupLabel].filter(
        (keyword): keyword is string => Boolean(keyword)
      )}
      icon={<Icon name={item.icon} size={18} />}
      description={item.subtitle || undefined}
      shortcut={item.external ? <Icon name="open_in_new" size={14} /> : undefined}
      onSelect={() => onNavigate(item.href, item.external)}
    >
      {item.label}
    </CommandItem>
  );
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("sidebar");
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
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

  // #17915: rows are ranked, not left in sidebar order, so a broad query such as "log" reaches the
  // Logs page before "Log export" or the substring hit in "Radar Catalog". Ties keep the shorter
  // label first (the closer match), then the sidebar order.
  const ranked = useMemo(() => {
    const q = fold(query).trim();
    if (!q) return allItems;
    return allItems
      .map((item, index) => ({ item, index, score: matchScore(item, q) }))
      .sort(
        (a, b) =>
          b.score - a.score || a.item.label.length - b.item.label.length || a.index - b.index
      )
      .map((entry) => entry.item);
  }, [allItems, query]);

  // Sections and subgroups appear in the order of their best match. The kit reads its options from
  // the DOM, so the arrow keys and Enter follow this order with nothing else to keep in step.
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
      subgroup.items.push(item);
    });
    return groups;
  }, [ranked]);

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
        className="top-[10vh] max-w-3xl [animation-name:ci-fade-in] [transform:translateX(-50%)]"
      >
        <DialogTitle className="ci-sr-only">{t("commandPalette.title")}</DialogTitle>
        <Command
          query={query}
          onQueryChange={setQuery}
          className="[--ci-command-list-max-height:60vh]"
        >
          <CommandInput
            ref={inputRef}
            placeholder={t("commandPalette.searchPlaceholder")}
            aria-label={t("commandPalette.searchPlaceholder")}
            trailing={
              <>
                {query && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    tabIndex={-1}
                    aria-label={t("commandPalette.clearSearch")}
                    onClick={() => {
                      setQuery("");
                      // The press took focus here, and this button unmounts with the query.
                      inputRef.current?.focus();
                    }}
                  >
                    <Icon name="close" size={16} />
                  </Button>
                )}
                <kbd className="hidden shrink-0 rounded border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted sm:inline-flex">
                  Esc
                </kbd>
              </>
            }
          />
          <CommandList aria-label={t("commandPalette.title")} className="custom-scrollbar">
            {grouped.map((group) => (
              <CommandGroup key={group.sectionId} heading={group.sectionLabel}>
                {group.subgroups.map((subgroup) => {
                  const options = subgroup.items.map((item) => (
                    <PaletteOption key={item.id} item={item} onNavigate={handleNavigate} />
                  ));
                  return subgroup.subgroupLabel ? (
                    <CommandGroup key={subgroup.subgroupId} heading={subgroup.subgroupLabel}>
                      {options}
                    </CommandGroup>
                  ) : (
                    options
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
        </Command>

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
