"use client";

import type { ReactNode } from "react";
import { SharedHoverCard, type SharedHoverCardState } from "@omniroute/ui-kit/hover-card";
import { Progress } from "@omniroute/ui-kit/progress";
import type { HealthAccount } from "./healthOverview";
import {
  displayAccount,
  DISPLAY_COLORS,
  DISPLAY_LABELS,
  isCooldownKind,
  type DisplayAccount,
} from "./availabilityDisplay";
import { useHealthText } from "./useHealthText";

function tooltipMessage(
  account: DisplayAccount,
  cooling: boolean,
  thresholdBlocked: boolean,
  t: ReturnType<typeof useHealthText>["t"],
  all: ReturnType<typeof useHealthText>["all"],
  format: ReturnType<typeof useHealthText>["format"],
  recovery: ReturnType<typeof useHealthText>["recovery"]
) {
  if (account.kind === "act") return t("healthLegendAction");
  if (account.partial && !cooling) return t("healthLegendPartial");
  if (!cooling) return all(DISPLAY_LABELS[account.kind]);
  const quotaKey = thresholdBlocked
    ? "quotaThresholdLabel"
    : account.reasons.some((reason) => reason.type === "quota")
      ? "healthQuotaExhausted"
      : "healthCooldown";
  const wait = account.recoverAt
    ? t("healthWait", {
        duration: recovery(account.recoverAt),
        time: format.dateTime(new Date(account.recoverAt), { hour: "2-digit", minute: "2-digit" }),
      })
    : t("healthRecoveryUnknown");
  return `${t(quotaKey)} · ${wait}`;
}

function TooltipStatus({ account }: { account: DisplayAccount }) {
  const { t, all, format, recovery } = useHealthText();
  const cooling = isCooldownKind(account.kind);
  const thresholdBlocked = account.reasons.some(
    (reason) =>
      reason.type === "quota" && (reason.percent ?? 0) > 0 && Number.isFinite(reason.cutoff)
  );
  const message = tooltipMessage(account, cooling, thresholdBlocked, t, all, format, recovery);
  return (
    <>
      <p>
        {cooling && <>{t("healthRecovery")}: </>}
        {message}
      </p>
      {cooling && (
        <p>
          {t("healthWaited", {
            percent: format.number((account.fill || 0) / 100, {
              style: "percent",
              maximumFractionDigits: 0,
            }),
          })}
        </p>
      )}
    </>
  );
}

function TooltipReasons({ account }: { account: DisplayAccount }) {
  const { reason } = useHealthText();
  return (
    <>
      {account.reasons
        .filter((r) =>
          r.type === "quota"
            ? Number.isFinite(r.percent) && Number.isFinite(r.cutoff)
            : !["cooldown", "terminal"].includes(r.type)
        )
        .map((r, i) => (
          <p key={i} className="mt-0.5 text-text-muted">
            {reason(r, account)}
          </p>
        ))}
    </>
  );
}

function TooltipPools({ pools }: { pools: DisplayAccount[] | undefined }) {
  const { t, all, format, poolLabel } = useHealthText();
  return (
    <>
      {pools?.map((pool) => (
        <p data-other-pool key={pool.poolId} className="mt-1 text-text-muted">
          {t("healthOtherPool", {
            pool: poolLabel(pool.poolId!),
            status: all(DISPLAY_LABELS[pool.kind]),
            remaining:
              pool.remainingPct === null
                ? t("tierUnknown")
                : format.number(pool.remainingPct / 100, {
                    style: "percent",
                    maximumFractionDigits: 1,
                  }),
          })}
        </p>
      ))}
    </>
  );
}

function TooltipCells({ account }: { account: DisplayAccount }) {
  const { t, format, recovery, windowLabel } = useHealthText();
  return (
    <div className="mt-2 space-y-[6px]">
      {account.cells.map((cell) => (
        <div key={cell.name}>
          <div className="flex flex-wrap justify-between gap-2">
            <span>{windowLabel(cell)}</span>
            <span>
              {cell.awaitingSync
                ? t("healthAwaitingSync")
                : cell.quotaUnknown
                  ? t("tierUnknown")
                  : format.number(cell.percent / 100, {
                      style: "percent",
                      maximumFractionDigits: 1,
                    })}
              {!cell.awaitingSync &&
                (cell.resetAt
                  ? ` · ${t("resetsIn")} ${recovery(cell.resetAt)}`
                  : ` · ${t("healthRecoveryUnknown")}`)}
            </span>
          </div>
          {/* Remaining quota: any visible fill is the success tone (an empty bar draws nothing). */}
          {!cell.awaitingSync && !cell.quotaUnknown && (
            <Progress
              className="mt-1"
              aria-label={windowLabel(cell)}
              value={cell.percent}
              tone="success"
              animate={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/** What the card says about one account (or one of its pools). */
export function HealthAccountCardContent({
  account,
  label,
  otherPools,
}: {
  account: HealthAccount | DisplayAccount;
  label: string;
  otherPools?: DisplayAccount[];
}) {
  const { t, all, relative } = useHealthText();
  const a = "kind" in account ? account : displayAccount(account);
  return (
    <>
      <div className="mb-[6px] flex items-center justify-between gap-2">
        <b>{label}</b>
        <span
          className="shrink-0 rounded-full px-2 py-px text-2xs"
          style={{
            color: DISPLAY_COLORS[a.kind],
            background: `color-mix(in srgb, ${DISPLAY_COLORS[a.kind]} 13%, transparent)`,
          }}
        >
          {all(DISPLAY_LABELS[a.kind])}
        </span>
      </div>
      <TooltipStatus account={a} />
      <TooltipPools pools={otherPools} />
      <TooltipReasons account={a} />
      <TooltipCells account={a} />
      <p className="mt-2 text-xs text-text-muted">
        {t("healthQuotaObserved", { time: relative(a.quotaObservedAt) })} ·{" "}
        {t("healthRuntimeObserved", { time: relative(a.runtimeObservedAt) })} ·{" "}
        {t("healthDetailsHint")}
      </p>
    </>
  );
}

/**
 * The one card the capsules of the overview share: the kit `SharedHoverCard` of
 * `useSharedHoverCard`, anchored to the capsule under the pointer or the keyboard focus. The kit
 * positions it, keeps it inside the viewport, and closes it on Escape or a press outside.
 * `children` returns the content for the value of the active capsule.
 */
export default function HealthAccountTooltip({
  card,
  children,
}: {
  card: SharedHoverCardState;
  children: (value: string) => ReactNode;
}) {
  return (
    <SharedHoverCard
      card={card}
      align="start"
      // The capsule points at the card with aria-describedby; the role says what it is.
      role="tooltip"
      className="max-h-[calc(100vh-16px)] w-[330px] max-w-[calc(100vw-16px)] overflow-y-auto break-words px-3 py-[10px] text-xs text-text-main"
    >
      {children}
    </SharedHoverCard>
  );
}
