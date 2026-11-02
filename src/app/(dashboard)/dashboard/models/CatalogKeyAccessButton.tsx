"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import { Switch } from "@omniroute/ui-kit/switch";
import { Button } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import { useNotificationStore } from "@/store/notificationStore";
import {
  countKeysAllowing,
  getComboAccess,
  getModelAccess,
  isKeyUsable,
  planKeyAssignment,
  type AccessKey,
  type AccessKind,
} from "./keyAccessAssignUtils";
import type { ApiKeyAccessIndex } from "./useApiKeyAccessIndex";

const POPOVER_GAP = 4;

function keyAccessHint(
  access: ReturnType<typeof getModelAccess>,
  lastItem: boolean,
  kind: AccessKind,
  t: ReturnType<typeof useTranslations>
) {
  const hint =
    access.via === "pattern"
      ? t("accessViaPattern", { pattern: access.pattern ?? "" })
      : access.via === "blocked"
        ? t("accessBlocked", { pattern: access.pattern ?? "" })
        : lastItem
          ? t(kind === "models" ? "resultWouldEmptyModels" : "resultWouldEmptyCombos")
          : null;
  return hint;
}
function KeyAccessRow({
  accessKey,
  kind,
  id,
  providerId,
  index,
}: {
  accessKey: AccessKey;
  kind: AccessKind;
  id: string;
  providerId?: string;
  index: ApiKeyAccessIndex;
}) {
  const t = useTranslations("modelCatalog");
  const access =
    kind === "models" ? getModelAccess(accessKey, id, providerId) : getComboAccess(accessKey, id);
  const lastItem =
    access.via === "exact" &&
    planKeyAssignment({ key: accessKey, kind, action: "remove", items: [id], switchOptIn: false })
      .type === "skip";
  const hint = keyAccessHint(access, lastItem, kind, t);
  const disabled = access.via === "all" || access.via === "pattern" || access.via === "blocked";
  const pending = index.pendingKeys.has(accessKey.id);
  const toggle = async () => {
    const outcome = await index.toggle(accessKey, kind, id, !access.allowed);
    const notify = useNotificationStore.getState();
    if (outcome.reason === "pending") notify.info(t("keyUpdatePending", { name: accessKey.name }));
    else if (outcome.status === "error" || outcome.status === "needs_switch")
      notify.error(outcome.message || t("resultNetworkError"));
  };
  return (
    <div
      data-testid={`key-access-row-${accessKey.id}`}
      className="flex items-center justify-between gap-2 border-b border-border py-2"
    >
      <div className="min-w-0">
        <p className="truncate text-sm">{accessKey.name}</p>
        {hint && <p className="text-xs text-text-muted">{hint}</p>}
        {(access.via === "all" || access.via === "blocked" || lastItem) && (
          <Link
            className="text-xs text-primary"
            href={`/dashboard/api-manager/${encodeURIComponent(accessKey.id)}/access`}
          >
            {t("editKeyAccess")}
          </Link>
        )}
      </div>
      <Switch
        checked={access.allowed}
        aria-checked={access.allowed}
        aria-label={t("toggleKeyAccess", { item: id, name: accessKey.name })}
        aria-busy={pending || undefined}
        title={hint ?? undefined}
        disabled={disabled || lastItem}
        className={cn(
          "ci-switch--compact",
          (disabled || lastItem) && "opacity-50",
          pending && "opacity-60"
        )}
        onCheckedChange={() => void toggle()}
      />
    </div>
  );
}

interface CatalogKeyAccessButtonProps {
  kind: AccessKind;
  id: string;
  providerId?: string;
  index: ApiKeyAccessIndex;
}
export default function CatalogKeyAccessButton({
  kind,
  id,
  providerId,
  index,
}: CatalogKeyAccessButtonProps) {
  const t = useTranslations("modelCatalog");
  const cliTools = useTranslations("cliTools");
  const now = index.checkedAt;
  const usableKeys = index.keys.filter((key) => isKeyUsable(key, now));
  return (
    // The kit Popover portals to <body> (the table's scroll container cannot clip it) and owns
    // positioning, Escape, outside dismissal and returning focus to the trigger.
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          data-testid={`key-access-${kind}-${id}`}
          className="text-primary"
          onClick={() => void index.ensureLoaded()}
        >
          {index.keys.length
            ? t("allowedInKeys", {
                count: countKeysAllowing(index.keys, kind, id, providerId, now),
              })
            : t("keyAccessButton")}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={t("keyAccessButton")}
        align="end"
        sideOffset={POPOVER_GAP}
        className="max-h-80 w-80 overflow-auto p-3 text-left"
        // Focus stays where it was on open, and only focus leaving an element closes the panel:
        // focus arriving from nowhere (a modal mounting elsewhere) is not the user leaving it.
        onOpenAutoFocus={(event) => event.preventDefault()}
        onFocusOutside={(event) => {
          if (!event.detail.originalEvent.relatedTarget) event.preventDefault();
        }}
      >
        {index.loading && <p className="text-sm text-text-muted">{t("keysLoading")}</p>}
        {index.error && <Button onClick={() => void index.refresh()}>{t("keysRetry")}</Button>}
        {!index.loading && !index.error && usableKeys.length === 0 && (
          <p className="text-sm text-text-muted">{cliTools("noApiKeysAvailable")}</p>
        )}
        {usableKeys.map((key) => (
          <KeyAccessRow
            key={key.id}
            accessKey={key}
            kind={kind}
            id={id}
            providerId={providerId}
            index={index}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
