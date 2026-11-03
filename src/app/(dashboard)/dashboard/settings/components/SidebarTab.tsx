"use client";

import { useState, useEffect, useCallback, useId } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@omniroute/ui-kit/accordion";
import { Checkbox } from "@omniroute/ui-kit/checkbox";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Badge, Button, Card, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";
import {
  HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY,
  HIDEABLE_SIDEBAR_GROUP_IDS,
  normalizeHiddenSidebarGroupLabels,
  type HideableSidebarGroupId,
} from "@/shared/constants/sidebarGroupVisibility";
import {
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_SECTION_ORDER_KEY,
  SIDEBAR_ITEM_ORDER_KEY,
  SIDEBAR_PRESET_KEY,
  SIDEBAR_SETTINGS_UPDATED_EVENT,
  SIDEBAR_SECTIONS,
  SIDEBAR_PRESETS,
  PROTECTED_SIDEBAR_ITEM_IDS,
  applySectionOrder,
  applyItemOrder,
  HIDDEN_SIDEBAR_SECTIONS_SETTING_KEY,
  isSidebarSectionHideable,
  isSidebarSectionHidden,
  normalizeHiddenSidebarSections,
  toggleSidebarSectionVisibility,
  normalizeHiddenSidebarItems,
  HIDEABLE_SIDEBAR_ITEM_IDS,
  resolveRuntimeSidebarSections,
  type HideableSidebarItemId,
  type SidebarItemId,
  type SidebarSectionId,
  type SidebarItemOrder,
  type SidebarPresetId,
  type SidebarSectionDefinition,
  type SidebarSectionChild,
  type SidebarItemDefinition,
  type SidebarItemGroup,
} from "@/shared/constants/sidebarVisibility";

// ─── Sortable section row ──────────────────────────────────────────────────────

interface SortableSectionProps {
  section: SidebarSectionDefinition & { title: string };
  open: boolean;
  hiddenSet: Set<HideableSidebarItemId>;
  sectionHiddenList: SidebarSectionId[];
  hiddenGroupLabelsSet: Set<HideableSidebarGroupId>;
  itemOrder: string[];
  onToggleItem: (id: HideableSidebarItemId) => void;
  onToggleGroupLabel: (id: HideableSidebarGroupId) => void;
  onToggleSection: (section: SidebarSectionDefinition) => void;
  onItemReorder: (sectionId: SidebarSectionId, newOrder: string[]) => void;
  getLabel: (key: string, fallback: string) => string;
}

function LockedMarker() {
  const tSidebar = useTranslations("sidebar");
  return (
    <span className="inline-flex shrink-0" title={tSidebar("cannotHide")}>
      <Icon
        name="lock"
        size={16}
        className="text-text-muted"
        ariaLabel={tSidebar("alwaysVisible")}
      />
    </span>
  );
}

function SortableSection({
  section,
  open,
  hiddenSet,
  sectionHiddenList,
  hiddenGroupLabelsSet,
  itemOrder,
  onToggleItem,
  onToggleGroupLabel,
  onToggleSection,
  onItemReorder,
  getLabel,
}: SortableSectionProps) {
  const tSidebar = useTranslations("sidebar");
  const tSettings = useTranslations("settings");
  const getSettingsLabel = useCallback(
    (key: string, fallback: string) =>
      typeof tSettings.has === "function" && tSettings.has(key) ? tSettings(key) : fallback,
    [tSettings]
  );
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const canToggleSection = isSidebarSectionHideable(section);
  const sectionHidden = isSidebarSectionHidden(section.id as SidebarSectionId, sectionHiddenList);

  const allChildren = section.children as SidebarSectionChild[];
  const getChildId = (c: SidebarSectionChild) =>
    "type" in c && c.type === "group" ? c.id : (c as SidebarItemDefinition).id;

  const orderedChildren = applyItemOrder(allChildren, itemOrder);
  const childIds = orderedChildren.map(getChildId);
  const sensors = useSensors(useSensor(PointerSensor));
  // Same id on server and client; dnd-kit's default comes from a process-wide counter.
  const dndContextId = useId();

  const handleItemDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = childIds.indexOf(active.id as string);
    const newIdx = childIds.indexOf(over.id as string);
    if (oldIdx === -1 || newIdx === -1) return;
    onItemReorder(section.id as SidebarSectionId, arrayMove(childIds, oldIdx, newIdx));
  };

  const sectionToggleLabel = sectionHidden
    ? getSettingsLabel("sidebarSectionShow", "Show all items in this section")
    : getSettingsLabel("sidebarSectionHide", "Hide all items in this section");

  return (
    <AccordionItem
      ref={setNodeRef}
      style={style}
      value={section.id}
      className={cn("bg-surface", isDragging && "relative z-10 shadow-lg opacity-80")}
    >
      {/* Section header: drag handle · accordion trigger · section visibility */}
      <div className="flex items-center gap-1 pl-2 pr-4">
        <Button
          variant="ghost"
          size="icon-sm"
          {...listeners}
          {...attributes}
          className="shrink-0 cursor-grab touch-none text-text-muted active:cursor-grabbing"
          title={tSidebar("dragReorderSection")}
          aria-label={tSidebar("dragReorderSection")}
        >
          <Icon name="drag_indicator" size={18} />
        </Button>
        <div className="min-w-0 flex-1">
          <AccordionTrigger className="px-2 text-xs font-semibold uppercase tracking-wider">
            {section.title}
          </AccordionTrigger>
        </div>
        {canToggleSection ? (
          <Toggle
            checked={!sectionHidden}
            onChange={() => onToggleSection(section)}
            title={sectionToggleLabel}
            ariaLabel={sectionToggleLabel}
          />
        ) : (
          <LockedMarker />
        )}
      </div>

      {/* Section children with inner DnD — mounted only while open, so the collapsed
          (aria-hidden) panel never keeps focusable controls. */}
      <AccordionContent>
        {open && (
          <DndContext
            id={dndContextId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleItemDragEnd}
          >
            <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
              <div className="divide-y divide-border">
                {orderedChildren.map((child) => {
                  if ("type" in child && child.type === "group") {
                    const group = child as SidebarItemGroup;
                    return (
                      <SortableChildRow key={group.id} id={group.id}>
                        <GroupRow
                          group={group}
                          hiddenSet={hiddenSet}
                          hiddenGroupLabelsSet={hiddenGroupLabelsSet}
                          onToggleItem={onToggleItem}
                          onToggleGroupLabel={onToggleGroupLabel}
                          getLabel={getLabel}
                        />
                      </SortableChildRow>
                    );
                  }
                  const item = child as SidebarItemDefinition;
                  return (
                    <SortableChildRow key={item.id} id={item.id}>
                      <ItemRow
                        item={item}
                        hiddenSet={hiddenSet}
                        onToggleItem={onToggleItem}
                        getLabel={getLabel}
                      />
                    </SortableChildRow>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

// ─── Sortable child row wrapper ────────────────────────────────────────────────

function SortableChildRow({ id, children }: { id: string; children: React.ReactNode }) {
  const tSidebar = useTranslations("sidebar");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-start gap-1", isDragging && "opacity-60")}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        {...listeners}
        {...attributes}
        className="mt-2 shrink-0 cursor-grab touch-none text-text-muted active:cursor-grabbing"
        title={tSidebar("dragReorderItem")}
        aria-label={tSidebar("dragReorderItem")}
      >
        <Icon name="drag_indicator" size={14} />
      </Button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// ─── Item row ─────────────────────────────────────────────────────────────────

interface ItemRowProps {
  item: SidebarItemDefinition;
  hiddenSet: Set<HideableSidebarItemId>;
  onToggleItem: (id: HideableSidebarItemId) => void;
  getLabel: (key: string, fallback: string) => string;
}

function isHideableSidebarItemId(id: SidebarItemId): id is HideableSidebarItemId {
  return HIDEABLE_SIDEBAR_ITEM_IDS.includes(id as HideableSidebarItemId);
}

/** One sidebar entry: a visibility checkbox (box on the right), or a lock when it cannot hide. */
function ItemVisibilityRow({
  item,
  hiddenSet,
  onToggleItem,
  label,
  compact = false,
}: {
  item: SidebarItemDefinition;
  hiddenSet: Set<HideableSidebarItemId>;
  onToggleItem: (id: HideableSidebarItemId) => void;
  label: string;
  compact?: boolean;
}) {
  const hideableId = isHideableSidebarItemId(item.id) ? item.id : null;
  const isProtected = hideableId === null || PROTECTED_SIDEBAR_ITEM_IDS.has(item.id);
  const text = (
    <span className="flex min-w-0 items-center gap-2">
      <Icon name={item.icon} size={compact ? 14 : 16} className="text-text-muted" />
      <span className={cn("truncate font-medium text-text-main", compact && "text-sm")}>
        {label}
      </span>
    </span>
  );
  const rowPadding = compact ? "px-2 py-2" : "px-2 py-2.5";
  if (isProtected) {
    return (
      <div className={cn("flex items-center justify-between gap-4", rowPadding)}>
        {text}
        <LockedMarker />
      </div>
    );
  }
  return (
    <Checkbox
      side="right"
      className={cn("w-full justify-between", rowPadding)}
      checked={!hiddenSet.has(hideableId)}
      onChange={() => onToggleItem(hideableId)}
      label={text}
    />
  );
}

function ItemRow({ item, hiddenSet, onToggleItem, getLabel }: ItemRowProps) {
  return (
    <ItemVisibilityRow
      item={item}
      hiddenSet={hiddenSet}
      onToggleItem={onToggleItem}
      label={getLabel(item.i18nKey, item.labelFallback ?? item.id)}
    />
  );
}

// ─── Group row (items inside group, no sub-DnD) ───────────────────────────────

interface GroupRowProps {
  group: SidebarItemGroup;
  hiddenSet: Set<HideableSidebarItemId>;
  hiddenGroupLabelsSet: Set<HideableSidebarGroupId>;
  onToggleItem: (id: HideableSidebarItemId) => void;
  onToggleGroupLabel: (id: HideableSidebarGroupId) => void;
  getLabel: (key: string, fallback: string) => string;
}

function GroupRow({
  group,
  hiddenSet,
  hiddenGroupLabelsSet,
  onToggleItem,
  onToggleGroupLabel,
  getLabel,
}: GroupRowProps) {
  const [open, setOpen] = useState(true);
  const groupId = group.id as HideableSidebarGroupId;
  const canToggleSeparator = HIDEABLE_SIDEBAR_GROUP_IDS.includes(groupId);
  const separatorVisible = !hiddenGroupLabelsSet.has(groupId);
  const separatorLabel = getLabel("groupSeparatorLabel", "Separator");
  const groupTitle = getLabel(group.titleKey, group.titleFallback);
  const panelId = useId();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen((p) => !p)}
          aria-expanded={open}
          aria-controls={panelId}
          className="min-w-0 flex-1 justify-start gap-2 px-1"
        >
          <Icon
            name="chevron_right"
            size={14}
            className={cn("text-text-muted transition-transform", open && "rotate-90")}
          />
          <span className="truncate text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            {groupTitle}
          </span>
        </Button>
        <span className="text-xs text-text-muted">
          {group.items.filter((i) => !isHideableSidebarItemId(i.id) || !hiddenSet.has(i.id)).length}
          /{group.items.length}
        </span>
        {canToggleSeparator && (
          <div className="flex items-center gap-2 border-l border-border pl-3">
            <span className="text-[10px] font-medium text-text-muted">{separatorLabel}</span>
            <Toggle
              size="sm"
              ariaLabel={`${separatorLabel} · ${groupTitle}`}
              checked={separatorVisible}
              onChange={() => onToggleGroupLabel(groupId)}
            />
          </div>
        )}
      </div>
      {open && (
        <div id={panelId} className="divide-y divide-border pl-4">
          {group.items.map((item) => (
            <ItemVisibilityRow
              key={item.id}
              compact
              item={item}
              hiddenSet={hiddenSet}
              onToggleItem={onToggleItem}
              label={getLabel(item.i18nKey, item.labelFallback ?? item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SidebarTab() {
  const t = useTranslations("settings");
  const tSidebar = useTranslations("sidebar");

  const getLabel = useCallback(
    (key: string, fallback: string) =>
      typeof tSidebar.has === "function" && tSidebar.has(key) ? tSidebar(key) : fallback,
    [tSidebar]
  );
  const getSettingsLabel = useCallback(
    (key: string, fallback: string) =>
      typeof t.has === "function" && t.has(key) ? t(key) : fallback,
    [t]
  );

  const [loading, setLoading] = useState(true);
  const [hiddenSidebarItems, setHiddenSidebarItems] = useState<HideableSidebarItemId[]>([]);
  const [hiddenSidebarSections, setHiddenSidebarSections] = useState<SidebarSectionId[]>([]);
  const [hiddenSidebarGroupLabels, setHiddenSidebarGroupLabels] = useState<
    HideableSidebarGroupId[]
  >([]);
  const [sectionOrder, setSectionOrder] = useState<SidebarSectionId[]>([]);
  const [itemOrder, setItemOrder] = useState<SidebarItemOrder>({});
  const [activePreset, setActivePreset] = useState<SidebarPresetId | null>(null);
  const [confirmPreset, setConfirmPreset] = useState<SidebarPresetId | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [radarAdminUrl, setRadarAdminUrl] = useState<unknown>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setHiddenSidebarItems(
          normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY])
        );
        setHiddenSidebarSections(
          normalizeHiddenSidebarSections(data?.[HIDDEN_SIDEBAR_SECTIONS_SETTING_KEY])
        );
        setHiddenSidebarGroupLabels(
          normalizeHiddenSidebarGroupLabels(data?.[HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY])
        );
        setSectionOrder(
          Array.isArray(data?.[SIDEBAR_SECTION_ORDER_KEY]) ? data[SIDEBAR_SECTION_ORDER_KEY] : []
        );
        setItemOrder(
          data?.[SIDEBAR_ITEM_ORDER_KEY] && typeof data[SIDEBAR_ITEM_ORDER_KEY] === "object"
            ? data[SIDEBAR_ITEM_ORDER_KEY]
            : {}
        );
        setActivePreset(data?.[SIDEBAR_PRESET_KEY] ?? null);
        setShowDebug(data?.debugMode === true);
        setRadarAdminUrl(data?.radarAdminUrl ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const patch = async (updates: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        window.dispatchEvent(new CustomEvent(SIDEBAR_SETTINGS_UPDATED_EVENT, { detail: updates }));
      } else {
        console.error("Failed to update sidebar settings:", res.statusText);
      }
    } catch (err) {
      console.error("Error updating sidebar settings:", err);
    }
  };

  const toggleItem = (id: HideableSidebarItemId) => {
    // Protected items can never be hidden
    if (PROTECTED_SIDEBAR_ITEM_IDS.has(id)) return;
    const next = hiddenSidebarItems.includes(id)
      ? hiddenSidebarItems.filter((x) => x !== id)
      : [...hiddenSidebarItems, id];
    setHiddenSidebarItems(next);
    // Any manual change → custom mode
    setActivePreset(null);
    patch({ [HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const hiddenSet = new Set(hiddenSidebarItems);
  const hiddenGroupLabelsSet = new Set(hiddenSidebarGroupLabels);
  // Section master toggle: independent of the per-item hidden list — child item
  // states are preserved untouched, like the group separator toggle.
  const hiddenSectionList = hiddenSidebarSections;

  const toggleSection = (section: SidebarSectionDefinition) => {
    const show = isSidebarSectionHidden(section.id as SidebarSectionId, hiddenSectionList);
    const next = toggleSidebarSectionVisibility(
      hiddenSectionList,
      section.id as SidebarSectionId,
      show
    );
    setHiddenSidebarSections(next);
    // Any manual change → custom mode
    setActivePreset(null);
    patch({ [HIDDEN_SIDEBAR_SECTIONS_SETTING_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const toggleGroupLabel = (id: HideableSidebarGroupId) => {
    const next = hiddenSidebarGroupLabels.includes(id)
      ? hiddenSidebarGroupLabels.filter((x) => x !== id)
      : [...hiddenSidebarGroupLabels, id];
    setHiddenSidebarGroupLabels(next);
    setActivePreset(null);
    patch({ [HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const visibleSections = resolveRuntimeSidebarSections(SIDEBAR_SECTIONS, {
    radarAdminUrl,
  }).filter((s) => s.visibility !== "debug" || showDebug);

  const orderedSections = applySectionOrder(visibleSections, sectionOrder).map((s) => ({
    ...s,
    title: getLabel(s.titleKey, s.titleFallback),
  }));

  const sectionIds = orderedSections.map((s) => s.id);
  // Sections start expanded; the accordion tracks the ones the user collapsed.
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const openSections = sectionIds.filter((id) => !collapsedSections.includes(id));

  const sensors = useSensors(useSensor(PointerSensor));
  // Same id on server and client; dnd-kit's default comes from a process-wide counter.
  const dndContextId = useId();

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = sectionIds.indexOf(active.id as SidebarSectionId);
    const newIdx = sectionIds.indexOf(over.id as SidebarSectionId);
    if (oldIdx === -1 || newIdx === -1) return;
    const newOrder = arrayMove(sectionIds, oldIdx, newIdx) as SidebarSectionId[];
    setSectionOrder(newOrder);
    setActivePreset(null);
    patch({ [SIDEBAR_SECTION_ORDER_KEY]: newOrder, [SIDEBAR_PRESET_KEY]: null });
  };

  const handleItemReorder = (sectionId: SidebarSectionId, newOrder: string[]) => {
    const next = { ...itemOrder, [sectionId]: newOrder };
    setItemOrder(next);
    setActivePreset(null);
    patch({ [SIDEBAR_ITEM_ORDER_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const applyPreset = (presetId: SidebarPresetId) => {
    const preset = SIDEBAR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    // Ensure protected items are never hidden, even if a preset includes them
    const safeHidden = preset.hiddenItems.filter((id) => !PROTECTED_SIDEBAR_ITEM_IDS.has(id));
    setHiddenSidebarItems(safeHidden);
    setHiddenSidebarSections([]);
    setHiddenSidebarGroupLabels([]);
    setSectionOrder([]);
    setItemOrder({});
    setActivePreset(presetId);
    setConfirmPreset(null);
    patch({
      [HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]: safeHidden,
      [HIDDEN_SIDEBAR_SECTIONS_SETTING_KEY]: [],
      [HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY]: [],
      [SIDEBAR_SECTION_ORDER_KEY]: [],
      [SIDEBAR_ITEM_ORDER_KEY]: {},
      [SIDEBAR_PRESET_KEY]: presetId,
    });
  };

  const resetToDefault = () => applyPreset("all");

  const presetLabels: Record<SidebarPresetId, string> = {
    all: getSettingsLabel("presetAll", "All"),
    essentials: getSettingsLabel("presetEssentials", "Essentials"),
    minimal: getSettingsLabel("presetMinimal", "Minimal"),
    developer: getSettingsLabel("presetDeveloper", "Developer"),
    admin: getSettingsLabel("presetAdmin", "Admin"),
  };

  const presetDescriptions: Record<SidebarPresetId, string> = {
    all: getSettingsLabel("presetAllDesc", "Show everything"),
    essentials: getSettingsLabel(
      "presetEssentialsDesc",
      "Beginner path — Advanced tools stay searchable"
    ),
    minimal: getSettingsLabel("presetMinimalDesc", "Core pages only"),
    developer: getSettingsLabel("presetDeveloperDesc", "Dev & proxy tools"),
    admin: getSettingsLabel("presetAdminDesc", "Monitoring & audit"),
  };

  const confirmMessage = confirmPreset
    ? getSettingsLabel(
        "presetConfirmWarning",
        `Applying "${presetLabels[confirmPreset]}" will replace your current visibility and order settings.`
      )
    : "";

  return (
    <Card
      icon="view_sidebar"
      title={getSettingsLabel("settingsSidebarTitle", "Sidebar Customization")}
      subtitle={getSettingsLabel(
        "settingsSidebarDesc",
        "Control which items appear in the sidebar and their order"
      )}
    >
      <div className="flex flex-col gap-6">
        {/* Presets */}
        <div>
          {/* Active preset badge */}
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span className="text-text-muted">
              {getSettingsLabel("activePresetLabel", "Active:")}
            </span>
            <Badge variant={activePreset ? "primary" : "default"} size="sm">
              {activePreset
                ? presetLabels[activePreset]
                : getSettingsLabel("presetCustom", "Custom")}
            </Badge>
          </div>

          <RadioGroup
            label={getSettingsLabel("sidebarPresets", "Presets")}
            description={getSettingsLabel(
              "sidebarPresetsDesc",
              "Start from a role-based layout. Any change after applying a preset switches to Custom."
            )}
            value={activePreset ?? ""}
            disabled={loading}
            onValueChange={(next) => {
              const presetId = next as SidebarPresetId;
              if (activePreset === presetId) return;
              if (
                activePreset !== null ||
                hiddenSidebarItems.length > 0 ||
                hiddenSidebarGroupLabels.length > 0 ||
                sectionOrder.length > 0
              ) {
                setConfirmPreset(presetId);
              } else {
                applyPreset(presetId);
              }
            }}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {SIDEBAR_PRESETS.map((preset) => (
                <RadioGroupItem
                  key={preset.id}
                  card
                  value={preset.id}
                  label={
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name={preset.icon} size={18} fill={activePreset === preset.id} />
                      {presetLabels[preset.id]}
                    </span>
                  }
                  description={presetDescriptions[preset.id]}
                />
              ))}
            </div>
          </RadioGroup>

          {/* Confirm preset */}
          {confirmPreset && (
            <div
              role="alert"
              className="mt-3 flex flex-col gap-3 rounded-lg border border-warning/30 bg-warning-bg p-3 sm:flex-row sm:items-center"
            >
              <Icon name="warning" size={18} className="text-warning" />
              <p className="flex-1 text-sm text-text-main">{confirmMessage}</p>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => setConfirmPreset(null)}>
                  {getSettingsLabel("cancelLabel", "Cancel")}
                </Button>
                <Button size="sm" onClick={() => applyPreset(confirmPreset)}>
                  {getSettingsLabel("applyLabel", "Apply")}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Visibility & order */}
        <div>
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="font-medium">
                {getSettingsLabel("sidebarOrder", "Visibility & Order")}
              </p>
              <p className="text-sm text-text-muted">
                {getSettingsLabel(
                  "sidebarOrderDesc",
                  "Toggle items on/off and drag to reorder sections and their entries."
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={resetToDefault}
              disabled={loading}
            >
              {getSettingsLabel("resetDefault", "Reset to default")}
            </Button>
          </div>

          <DndContext
            id={dndContextId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleSectionDragEnd}
          >
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
              <Accordion
                type="multiple"
                variant="bordered"
                value={openSections}
                onValueChange={(next) =>
                  setCollapsedSections(sectionIds.filter((id) => !(next as string[]).includes(id)))
                }
              >
                {orderedSections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    open={openSections.includes(section.id)}
                    hiddenSet={hiddenSet}
                    sectionHiddenList={hiddenSectionList}
                    hiddenGroupLabelsSet={hiddenGroupLabelsSet}
                    itemOrder={itemOrder[section.id as SidebarSectionId] ?? []}
                    onToggleItem={toggleItem}
                    onToggleGroupLabel={toggleGroupLabel}
                    onToggleSection={toggleSection}
                    onItemReorder={handleItemReorder}
                    getLabel={getLabel}
                  />
                ))}
              </Accordion>
            </SortableContext>
          </DndContext>

          <p className="mt-3 text-xs text-text-muted">
            {getSettingsLabel(
              "sidebarVisibilityHint",
              "A sidebar section hides automatically when all of its entries are hidden"
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
