"use client";

import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { HealthAccount } from "./healthOverview";
import {
  displayAccount,
  DISPLAY_COLORS,
  DISPLAY_LABELS,
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
  const cooling = account.kind === "cd5" || account.kind === "cdw";
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
              {format.number(cell.percent / 100, { style: "percent", maximumFractionDigits: 1 })}
              {cell.resetAt
                ? ` · ${t("resetsIn")} ${recovery(cell.resetAt)}`
                : ` · ${t("healthRecoveryUnknown")}`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={windowLabel(cell)}
            aria-valuenow={cell.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-1 h-[6px] overflow-hidden rounded-full bg-border/60"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${cell.percent}%`,
                background:
                  cell.percent > 0 ? "var(--color-success)" : DISPLAY_COLORS[account.kind],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TooltipContent({
  account,
  label,
  pools,
}: {
  account: DisplayAccount;
  label: string;
  pools?: DisplayAccount[];
}) {
  const { t, all, relative } = useHealthText();
  return (
    <>
      <div className="mb-[6px] flex items-center justify-between gap-2">
        <b>{label}</b>
        <span
          className="shrink-0 rounded-full px-2 py-px text-[11px]"
          style={{
            color: DISPLAY_COLORS[account.kind],
            background: `color-mix(in srgb, ${DISPLAY_COLORS[account.kind]} 13%, transparent)`,
          }}
        >
          {all(DISPLAY_LABELS[account.kind])}
        </span>
      </div>
      <TooltipStatus account={account} />
      <TooltipPools pools={pools} />
      <TooltipReasons account={account} />
      <TooltipCells account={account} />
      <p className="mt-2 text-[11px] text-text-muted">
        {t("healthQuotaObserved", { time: relative(account.quotaObservedAt) })} ·{" "}
        {t("healthRuntimeObserved", { time: relative(account.runtimeObservedAt) })} ·{" "}
        {t("healthDetailsHint")}
      </p>
    </>
  );
}

export default function HealthAccountTooltip({
  id,
  account,
  label,
  anchor,
  otherPools,
}: {
  id: string;
  account: HealthAccount | DisplayAccount;
  label: string;
  anchor: HTMLElement;
  otherPools?: DisplayAccount[];
}) {
  const card = useRef<HTMLDivElement>(null);
  const a = "kind" in account ? account : displayAccount(account);
  useLayoutEffect(() => {
    const position = () => {
      if (!card.current) return;
      const anchorBox = anchor.getBoundingClientRect(),
        box = card.current.getBoundingClientRect();
      card.current.style.left = `${Math.max(8, Math.min(anchorBox.left, window.innerWidth - box.width - 8))}px`;
      card.current.style.top = `${Math.max(8, Math.min(anchorBox.bottom + 8, window.innerHeight - box.height - 8))}px`;
    };
    position();
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [anchor, account]);
  return createPortal(
    <div
      ref={card}
      id={id}
      role="tooltip"
      className="pointer-events-none fixed z-50 max-h-[calc(100vh-16px)] w-[330px] max-w-[calc(100vw-16px)] overflow-y-auto break-words rounded-[10px] border border-border bg-surface/95 px-3 py-[10px] text-xs text-text-main shadow-xl"
    >
      <TooltipContent account={a} label={label} pools={otherPools} />
    </div>,
    document.body
  );
}
