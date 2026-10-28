"use client";

import Icon from "@/shared/components/Icon";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { cn } from "@/shared/utils/cn";
import { AUTO_COMBO_TEMPLATES, type AutoComboTemplate } from "@/domain/assessment/types";
import AutoComboTosControl from "./AutoComboTosControl";

// Informational catalog of zero-config auto-routing combos.
// Auto combos are resolved at request time by the chat handler based on the
// currently connected providers / models — they have no row in the combos
// table, so they were previously invisible in the UI. This panel surfaces the
// LIVE catalog from /api/combos/auto (variants, curated templates,
// category:tier combos and model families like auto/gemini) — falling back to
// the static template list when the endpoint is unavailable. Duplicate icon
// lets you materialize a snapshot into an editable static combo; monitoring
// opens the combo control center for the virtual combo; play_arrow runs the
// same bounded health probe used for persisted combos.

type AutoCatalogApiEntry = {
  id?: string;
  name?: string;
  kind?: string;
  candidateCount?: number;
};

type CatalogItem = {
  id: string;
  displayName: string;
  kind: "variant" | "template" | "category" | "family";
  candidateCount: number | null;
  template: AutoComboTemplate | null;
};

const KIND_LABEL_KEYS: Record<CatalogItem["kind"], string> = {
  variant: "autoCatalogKindVariant",
  template: "autoCatalogKindTemplate",
  category: "autoCatalogKindCategory",
  family: "autoCatalogKindFamily",
};

const VALID_KINDS = new Set(["variant", "template", "category", "family"]);

function templateItem(template: AutoComboTemplate): CatalogItem {
  return {
    id: template.name,
    displayName: template.displayName,
    kind: "template",
    candidateCount: null,
    template,
  };
}

const FALLBACK_ITEMS: CatalogItem[] = AUTO_COMBO_TEMPLATES.map(templateItem);

function CatalogItemActions({
  item,
  testing,
  duplicatingName,
  onTestCombo,
  onDuplicate,
  t,
}: {
  item: CatalogItem;
  testing: boolean;
  duplicatingName: string | null;
  onTestCombo?: (combo: { name: string }) => void;
  onDuplicate: (item: CatalogItem) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5">
      <Link
        href={`/dashboard/combos/${encodeURIComponent(item.id)}`}
        className={buttonVariants({
          variant: "ghost",
          size: "icon-sm",
          className: "text-text-muted",
        })}
        title={t("controlCenter")}
        aria-label={t("controlCenter")}
      >
        <Icon name="monitoring" size={14} />
      </Link>
      {onTestCombo && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onTestCombo({ name: item.id })}
          disabled={testing}
          className="text-text-muted hover:text-success"
          title={t("testCombo")}
          aria-label={t("testCombo")}
        >
          <Icon
            name={testing ? "progress_activity" : "play_arrow"}
            size={14}
            className={cn(testing && "animate-spin")}
          />
        </Button>
      )}
      {item.id !== "auto" && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onDuplicate(item)}
          disabled={duplicatingName !== null}
          className="text-text-muted hover:text-text-main"
          title={t("duplicateAutoComboTitle", { name: item.id })}
          aria-label={t("duplicateAutoComboTitle", { name: item.id })}
        >
          <Icon
            name={duplicatingName === item.id ? "progress_activity" : "content_copy"}
            size={14}
            className={cn(duplicatingName === item.id && "animate-spin")}
          />
        </Button>
      )}
    </div>
  );
}

function CatalogItemCard({
  item,
  testing,
  duplicatingName,
  onTestCombo,
  onDuplicate,
  t,
}: {
  item: CatalogItem;
  testing: boolean;
  duplicatingName: string | null;
  onTestCombo?: (combo: { name: string }) => void;
  onDuplicate: (item: CatalogItem) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="relative rounded-lg border border-border bg-bg-subtle p-3 pb-7 text-xs">
      <CatalogItemActions
        item={item}
        testing={testing}
        duplicatingName={duplicatingName}
        onTestCombo={onTestCombo}
        onDuplicate={onDuplicate}
        t={t}
      />
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-sm text-text-main">{item.id}</code>
        <Badge size="sm" className="uppercase">
          {item.template?.strategy ?? t(KIND_LABEL_KEYS[item.kind])}
        </Badge>
      </div>
      <p className="mt-1 text-[11px] font-semibold text-text-main">{item.displayName}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {item.template ? (
          <>
            {item.template.categories.map((cat) => (
              <Badge key={cat} size="sm" variant="primary">
                {cat}
              </Badge>
            ))}
            {item.template.tiers.map((tier) => (
              <Badge key={tier} size="sm">
                {tier}
              </Badge>
            ))}
          </>
        ) : (
          item.candidateCount !== null && (
            <Badge size="sm" variant={item.candidateCount > 0 ? "success" : "default"}>
              {item.candidateCount > 0
                ? t("autoCatalogCandidates", { count: item.candidateCount })
                : t("autoCatalogNoCandidates")}
            </Badge>
          )
        )}
      </div>
      {item.template?.systemMessage && (
        <p className="mt-2 text-[10px] italic text-text-muted line-clamp-2">
          {item.template.systemMessage}
        </p>
      )}
    </div>
  );
}

function toCatalogItems(combos: AutoCatalogApiEntry[]): CatalogItem[] {
  return combos
    .filter((entry): entry is AutoCatalogApiEntry & { id: string } => {
      return typeof entry?.id === "string" && entry.id.length > 0;
    })
    .map((entry): CatalogItem => {
      const kind = VALID_KINDS.has(entry.kind ?? "")
        ? (entry.kind as CatalogItem["kind"])
        : "variant";
      return {
        id: entry.id,
        displayName:
          typeof entry.name === "string" && entry.name.length > 0 ? entry.name : entry.id,
        kind,
        candidateCount: typeof entry.candidateCount === "number" ? entry.candidateCount : null,
        template: AUTO_COMBO_TEMPLATES.find((tpl) => tpl.name === entry.id) ?? null,
      };
    });
}

export default function AutoComboCatalog({
  onComboCreated,
  onTestCombo,
  testingName,
}: {
  onComboCreated?: (comboId: string) => void;
  onTestCombo?: (combo: { name: string }) => void;
  testingName?: string | null;
}) {
  const t = useTranslations("combos");
  const [open, setOpen] = useState(false);
  const [duplicatingName, setDuplicatingName] = useState<string | null>(null);
  const [liveItems, setLiveItems] = useState<CatalogItem[] | null>(null);
  const catalogRequestedRef = useRef(false);
  const [catalogRevision, setCatalogRevision] = useState(0);
  const refreshCatalog = useCallback(() => {
    catalogRequestedRef.current = false;
    setCatalogRevision((revision) => revision + 1);
  }, []);

  // Lazy-load the live catalog the first time the panel expands so the list
  // reflects every built-in auto combo (incl. model families) with live
  // candidate counts — not just the static AUTO_COMBO_TEMPLATES.
  useEffect(() => {
    if (!open || catalogRequestedRef.current) return;
    catalogRequestedRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/combos/auto", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { combos?: AutoCatalogApiEntry[] };
        // An empty live list is authoritative (no combo has candidates right
        // now) — only a failed/malformed response falls back to the templates.
        if (!Array.isArray(data.combos)) return;
        const items = toCatalogItems(data.combos);
        if (!cancelled) setLiveItems(items);
      } catch {
        // Endpoint unavailable — the static template fallback keeps rendering.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, catalogRevision]);

  const handleDuplicateEntry = useCallback(
    async (item: CatalogItem) => {
      if (
        !confirm(
          `${t("duplicateAutoComboConfirm", { name: item.id })}\n\n${t("duplicateAutoComboSnapshotMsg")}`
        )
      )
        return;

      setDuplicatingName(item.id);
      try {
        const res = await fetch("/api/combos/duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Curated templates keep the strategy their author picked; every
          // other auto combo snapshots as an "auto"-scored combo, which most
          // closely preserves the virtual combo's routing semantics.
          body: JSON.stringify({
            name: item.id,
            strategy: item.template?.strategy ?? "auto",
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(
            `${t("duplicateAutoComboFailedPrefix")} ${data.error || t("duplicateAutoComboUnknownError")}`
          );
          return;
        }

        const combo = await res.json();

        // Notify parent page to re-fetch combos so the new card renders.
        onComboCreated?.(String(combo.id));
      } catch (err) {
        console.error("Error duplicating auto-combo:", err);
        alert(
          `${t("duplicateAutoComboFailedPrefix")} ${err instanceof Error ? err.message : t("duplicateAutoComboUnknownError")}`
        );
      } finally {
        setDuplicatingName(null);
      }
    },
    [t, onComboCreated]
  );

  const items = liveItems ?? FALLBACK_ITEMS;

  return (
    <Card className="p-4">
      {/* kit-exception: Raw <button> on purpose: a full-width disclosure header that carries the section
          heading — the kit Button is a fixed-height control, not a disclosure region. Focus
          ring comes from the global :focus-visible rule (globals.css). */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-3 rounded-md text-start"
        aria-expanded={open}
        aria-label={open ? t("autoCatalogCollapse") : t("autoCatalogExpand")}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" size={20} className="text-primary" />
            <h2 className="text-base font-bold text-text-main">{t("autoCatalogTitle")}</h2>
            <Badge size="sm" variant="primary" className="font-semibold">
              {liveItems
                ? t("autoCatalogComboCount", { count: liveItems.length })
                : t("autoCatalogTemplateCount", { count: FALLBACK_ITEMS.length })}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-text-muted">{t("autoCatalogDescription")}</p>
        </div>
        <Icon name={open ? "expand_less" : "expand_more"} size={16} className="text-text-muted" />
      </button>

      <AutoComboTosControl onPolicyChange={refreshCatalog} />

      {open && items.length === 0 && (
        <p className="mt-4 text-xs text-text-muted">{t("autoCatalogNoCandidates")}</p>
      )}

      {open && items.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <CatalogItemCard
              key={item.id}
              item={item}
              testing={testingName === item.id}
              duplicatingName={duplicatingName}
              onTestCombo={onTestCombo}
              onDuplicate={handleDuplicateEntry}
              t={t}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
