export * from "./sidebarVisibility/types";
export { COMPRESSION_CONTEXT_GROUP, SIDEBAR_SECTIONS } from "./sidebarVisibility/sections";

import { SIDEBAR_SECTIONS } from "./sidebarVisibility/sections";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "./sidebarVisibility/types";
import { parseRadarAdminUrl } from "../validation/radarAdminUrl";
import type {
  HideableSidebarItemId,
  SidebarItemId,
  SidebarSectionId,
  SidebarItemDefinition,
  SidebarSectionChild,
  SidebarSectionDefinition,
  SidebarPresetDefinition,
} from "./sidebarVisibility/types";

/**
 * Decide whether a sidebar item should be shown given a resolved feature-flag
 * map. Items without `featureFlagKey` are always visible. Fails OPEN when the
 * flag isn't present in the map (e.g. `/api/settings` hasn't returned yet, or
 * an older server response predates the flag) — a missing entry must never
 * hide an unrelated item.
 */
export function isSidebarItemVisibleForFlags(
  item: Pick<SidebarItemDefinition, "featureFlagKey">,
  flags: Record<string, boolean>
): boolean {
  if (!item.featureFlagKey) return true;
  return flags[item.featureFlagKey] !== false;
}

export function getSectionItems(
  section: SidebarSectionDefinition | { children: readonly SidebarSectionChild[] }
): readonly SidebarItemDefinition[] {
  return section.children.flatMap((child) =>
    "type" in child && child.type === "group" ? child.items : [child as SidebarItemDefinition]
  );
}

// ─── Section master toggle ────────────────────────────────────────────────────

/**
 * Items that must always remain visible (safety guard). Shared by the settings
 * UI so the item-level and section-level toggles agree on what can be hidden.
 */
export const PROTECTED_SIDEBAR_ITEM_IDS: ReadonlySet<SidebarItemId> = new Set<SidebarItemId>([
  "proxy",
  "settings-sidebar",
]);

export const HIDDEN_SIDEBAR_SECTIONS_SETTING_KEY = "hiddenSidebarSections";

/**
 * Sections the master toggle may hide: every section that does NOT contain a
 * protected item (hiding those would hide the protected entry with it).
 */
export const HIDEABLE_SIDEBAR_SECTION_IDS: readonly SidebarSectionId[] = SIDEBAR_SECTIONS.filter(
  (section) =>
    !getSectionItems(section).some((item) =>
      PROTECTED_SIDEBAR_ITEM_IDS.has(item.id as SidebarItemId)
    )
).map((section) => section.id);

/** A section is hideable iff none of its (flattened) items is protected. */
export function isSidebarSectionHideable(
  section: Pick<SidebarSectionDefinition, "id" | "children">
): boolean {
  return HIDEABLE_SIDEBAR_SECTION_IDS.includes(section.id as SidebarSectionId);
}

export function normalizeHiddenSidebarSections(value: unknown): SidebarSectionId[] {
  if (!Array.isArray(value)) return [];

  const hidden = new Set<SidebarSectionId>();
  for (const id of value) {
    if (typeof id === "string" && HIDEABLE_SIDEBAR_SECTION_IDS.includes(id as SidebarSectionId)) {
      hidden.add(id as SidebarSectionId);
    }
  }
  return HIDEABLE_SIDEBAR_SECTION_IDS.filter((id) => hidden.has(id));
}

/** A section is hidden when its id is on the section-level hidden list. */
export function isSidebarSectionHidden(
  sectionId: SidebarSectionId,
  hiddenSections: readonly SidebarSectionId[]
): boolean {
  return hiddenSections.includes(sectionId);
}

/**
 * Show/hide a whole section in one click. Independent of the per-item hidden
 * list: child item states are preserved untouched ("隔断"). Hiding a section
 * that contains a protected item is refused.
 */
export function toggleSidebarSectionVisibility(
  hiddenSections: readonly SidebarSectionId[],
  sectionId: SidebarSectionId,
  show: boolean
): SidebarSectionId[] {
  const next = hiddenSections.filter((id) => id !== sectionId);
  if (!show) {
    if (!HIDEABLE_SIDEBAR_SECTION_IDS.includes(sectionId)) return [...hiddenSections];
    next.push(sectionId);
  }
  return next;
}

const RADAR_ADMIN_ITEM: SidebarItemDefinition = {
  id: "radar-admin",
  href: "",
  i18nKey: "radarAdmin",
  labelFallback: "Radar Admin ↗",
  subtitleKey: "radarAdminSubtitle",
  subtitleFallback: "Private operations panel",
  icon: "admin_panel_settings",
  external: true,
};

/**
 * Materialize owner-only entries resolved at request time. The canonical
 * catalog never embeds the private URL; an absent or invalid authenticated
 * settings value returns the original sections without the admin item.
 */
export function resolveRuntimeSidebarSections(
  sections: readonly SidebarSectionDefinition[],
  runtime: { radarAdminUrl?: unknown }
): SidebarSectionDefinition[] {
  const radarAdminUrl = parseRadarAdminUrl(runtime.radarAdminUrl);
  if (!radarAdminUrl) return [...sections];

  return sections.map((section) => {
    if (section.id !== "costs") return section;

    const children = section.children.filter(
      (child) => !("id" in child && child.id === RADAR_ADMIN_ITEM.id)
    );
    const radarIndex = children.findIndex((child) => !("type" in child) && child.id === "radar");
    const insertionIndex = radarIndex >= 0 ? radarIndex + 1 : children.length;
    const resolvedChildren = [...children];
    resolvedChildren.splice(insertionIndex, 0, {
      ...RADAR_ADMIN_ITEM,
      href: radarAdminUrl,
    });

    return { ...section, children: resolvedChildren };
  });
}

// ─── Ordering & preset setting keys ──────────────────────────────────────────

export const HIDDEN_SIDEBAR_ITEMS_SETTING_KEY = "hiddenSidebarItems";
export const SIDEBAR_SECTION_ORDER_KEY = "sidebarSectionOrder";
export const SIDEBAR_ITEM_ORDER_KEY = "sidebarItemOrder";
export const SIDEBAR_PRESET_KEY = "sidebarActivePreset";
export const SIDEBAR_SETTINGS_UPDATED_EVENT = "omniroute:settings-updated";

/** Beginner Essentials: core path only. Advanced tools stay reachable via search. */
const ESSENTIALS_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "health",
  "settings-general",
  "settings-sidebar",
]);

/** Hidden in Essentials sidebar but kept searchable in Command Palette. */
export const ESSENTIALS_ADVANCED_TOOL_IDS: ReadonlySet<HideableSidebarItemId> = new Set([
  "playground",
  "logs",
  "batch",
  "translator",
  "combos",
  "quota",
  "analytics",
  "costs",
  "cache",
  "runtime",
  "resilience-connections",
  "mcp",
  "a2a",
  "memory",
  "skills",
]);

const MINIMAL_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "analytics",
  "costs",
  "logs",
  "health",
  "settings-general",
  "settings-sidebar",
  "docs",
  "changelog",
]);

const DEVELOPER_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "quota",
  "context-caveman",
  "context-rtk",
  "context-combos",
  "cli-code",
  "cli-agents",
  "acp-agents",
  "api-endpoints",
  "analytics",
  "analytics-combo-health",
  "costs",
  "cache",
  "logs",
  "health",
  "runtime",
  "resilience-connections",
  "translator",
  "playground",
  "memory",
  "skills",
  "mcp",
  "a2a",
  "settings-general",
  "settings-modality-bridge",
  "settings-routing",
  "settings-resilience",
  "settings-sidebar",
  "docs",
  "issues",
  "changelog",
]);

const ADMIN_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "quota",
  "analytics",
  "analytics-combo-health",
  "analytics-utilization",
  "costs",
  "costs-pricing",
  "costs-budget",
  "costs-quota-share",
  "costs-teams",
  "radar-admin",
  "cache",
  "logs",
  "activity",
  "health",
  "runtime",
  "audit",
  "audit-mcp",
  "audit-a2a",
  "settings-general",
  "settings-modality-bridge",
  "settings-routing",
  "settings-resilience",
  "settings-security",
  "settings-access-tokens",
  "settings-feature-flags",
  "settings-sidebar",
  "docs",
  "changelog",
]);

function buildHiddenList(shown: ReadonlySet<HideableSidebarItemId>): HideableSidebarItemId[] {
  return HIDEABLE_SIDEBAR_ITEM_IDS.filter((id) => !shown.has(id));
}

export const SIDEBAR_PRESETS: readonly SidebarPresetDefinition[] = [
  { id: "all", icon: "select_all", hiddenItems: [] },
  { id: "essentials", icon: "star", hiddenItems: buildHiddenList(ESSENTIALS_SHOWN) },
  { id: "minimal", icon: "minimize", hiddenItems: buildHiddenList(MINIMAL_SHOWN) },
  { id: "developer", icon: "code", hiddenItems: buildHiddenList(DEVELOPER_SHOWN) },
  { id: "admin", icon: "admin_panel_settings", hiddenItems: buildHiddenList(ADMIN_SHOWN) },
];

// ─── Ordering utilities ───────────────────────────────────────────────────────

export function applySectionOrder(
  sections: readonly SidebarSectionDefinition[],
  order: SidebarSectionId[]
): SidebarSectionDefinition[] {
  if (order.length === 0) return [...sections];
  const knownIds = new Set(sections.map((s) => s.id));
  const validOrder = order.filter((id) => knownIds.has(id));
  const orderMap = new Map(validOrder.map((id, i) => [id, i]));
  return [...sections].sort((a, b) => {
    const ai = orderMap.get(a.id) ?? validOrder.length + sections.indexOf(a);
    const bi = orderMap.get(b.id) ?? validOrder.length + sections.indexOf(b);
    return ai - bi;
  });
}

export function applyItemOrder(
  children: readonly SidebarSectionChild[],
  order: string[]
): SidebarSectionChild[] {
  if (order.length === 0) return [...children];
  const getChildId = (c: SidebarSectionChild): string =>
    "type" in c && c.type === "group" ? c.id : (c as SidebarItemDefinition).id;
  const knownIds = new Set(children.map(getChildId));
  const validOrder = order.filter((id) => knownIds.has(id));
  const orderMap = new Map(validOrder.map((id, i) => [id, i]));
  return [...children].sort((a, b) => {
    const aId = getChildId(a);
    const bId = getChildId(b);
    const ai = orderMap.get(aId) ?? validOrder.length + children.indexOf(a);
    const bi = orderMap.get(bId) ?? validOrder.length + children.indexOf(b);
    return ai - bi;
  });
}

// ─── Settings helpers ─────────────────────────────────────────────────────────

export function normalizeHiddenSidebarItems(value: unknown): HideableSidebarItemId[] {
  if (!Array.isArray(value)) return [];

  const hiddenItems = new Set<HideableSidebarItemId>();

  for (const item of value) {
    if (
      typeof item === "string" &&
      HIDEABLE_SIDEBAR_ITEM_IDS.includes(item as HideableSidebarItemId)
    ) {
      hiddenItems.add(item as HideableSidebarItemId);
    }
  }

  return HIDEABLE_SIDEBAR_ITEM_IDS.filter((item) => hiddenItems.has(item));
}
