"use client";
import { useHealthText } from "./useHealthText";
import {
  countDisplay,
  DISPLAY_COLORS,
  DISPLAY_LABELS,
  type DisplayAccount,
  type DisplayKind,
} from "./availabilityDisplay";
import { CAPSULE_CLASS, capsuleStyle, CapsuleWater } from "./HealthCapsule";
export function HealthCounts({ accounts }: { accounts: DisplayAccount[] }) {
  const { t, all, format } = useHealthText();
  const counts = countDisplay(accounts);
  return (
    <div
      data-group-counts
      className="ms-auto flex flex-wrap items-center gap-2 text-xs text-text-muted"
    >
      {(["cd5", "cdw", "act", "partial", "paused", "empty"] as const)
        .filter((k) => counts[k] > 0)
        .map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-subtle px-2 py-px"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: k === "partial" ? "var(--color-warning)" : DISPLAY_COLORS[k] }}
            />
            {k === "partial" ? t("healthRestricted") : all(DISPLAY_LABELS[k])}{" "}
            {format.number(counts[k])}
          </span>
        ))}
      <span className="ms-[6px]">
        {t("healthRatio", { available: counts.ok, active: counts.all - counts.paused })}
      </span>
    </div>
  );
}
export function HealthLegend({ id, hidden }: { id: string; hidden: boolean }) {
  return (
    <div
      id={id}
      inert={hidden}
      aria-hidden={hidden}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out motion-reduce:transition-none ${hidden ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}
    >
      <div className="min-h-0 overflow-hidden">
        <LegendItems />
      </div>
    </div>
  );
}
function legendDescription(
  kind: "ok" | "cd5" | "cdw" | "act" | "partial" | "paused" | "empty",
  t: ReturnType<typeof useHealthText>["t"],
  format: ReturnType<typeof useHealthText>["format"]
) {
  if (kind === "ok") return t("healthLegendOk");
  if (kind === "cd5") return t("healthLegendCooldown", { window: t("healthFiveHour") });
  if (kind === "cdw")
    return t("healthLegendCooldown", {
      window: `${t("weekly")} · ${format.number(7, { style: "unit", unit: "day", unitDisplay: "long" })}`,
    });
  if (kind === "act") return t("healthLegendAction");
  if (kind === "partial") return t("healthLegendPartial");
  return "";
}
function LegendItem({
  kind,
  t,
  all,
  format,
}: {
  kind: "ok" | "cd5" | "cdw" | "act" | "partial" | "paused" | "empty";
  t: ReturnType<typeof useHealthText>["t"];
  all: ReturnType<typeof useHealthText>["all"];
  format: ReturnType<typeof useHealthText>["format"];
}) {
  const displayKind: DisplayKind = kind === "partial" ? "ok" : kind;
  const description = legendDescription(kind, t, format);
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        aria-hidden
        className={`${CAPSULE_CLASS} !h-[22px] !w-[8px] ${displayKind === "empty" ? "border border-dashed border-text-muted" : ""}`}
        style={capsuleStyle(displayKind)}
      >
        <CapsuleWater
          kind={displayKind}
          fill={["ok", "cd5", "cdw"].includes(displayKind) ? 65 : null}
          partial={kind === "partial"}
        />
      </span>
      <span>
        <b>{kind === "partial" ? t("healthRestricted") : all(DISPLAY_LABELS[kind])}</b>{" "}
        <span className="text-text-muted">{description}</span>
      </span>
    </div>
  );
}
function LegendItems() {
  const { t, all, format } = useHealthText();
  return (
    <div
      data-legend
      className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-2 border-b border-border px-[18px] py-3 text-xs sm:grid-cols-2 xl:grid-cols-3"
    >
      {(["ok", "cd5", "cdw", "act", "partial", "paused", "empty"] as const).map((kind) => (
        <LegendItem key={kind} kind={kind} t={t} all={all} format={format} />
      ))}
    </div>
  );
}
export function HealthBanner({ accounts }: { accounts: DisplayAccount[] }) {
  const { t, all, recovery, format } = useHealthText();
  const c = countDisplay(accounts),
    blocked = c.cd5 + c.cdw + c.act;
  const earliest = accounts
    .filter((a) => a.kind === "cd5" && a.recoverAt)
    .map((a) => a.recoverAt!)
    .sort()[0];
  const green = c.ok === c.all;
  return (
    <div
      data-banner
      className="flex items-center gap-[10px] rounded-xl border px-[18px] py-[14px]"
      style={{
        borderColor: `color-mix(in srgb, var(--color-${green ? "success" : "warning"}) 35%, transparent)`,
        background: `color-mix(in srgb, var(--color-${green ? "success" : "warning"}) 7%, transparent)`,
      }}
    >
      <span
        aria-hidden
        className="h-[14px] w-[14px] shrink-0 rounded-full"
        style={{ background: green ? "var(--color-success)" : "var(--color-warning)" }}
      />
      <div className="min-w-0">
        <b className="text-[15px]">
          {t(green ? "healthBannerAvailable" : "healthBannerUnavailable", {
            count: green ? c.all : blocked,
          })}
        </b>
        <div className="text-xs text-text-muted">
          {(["cd5", "cdw", "act", "ok", "paused"] as const).map((k, i) => (
            <span key={k}>
              {i > 0 ? " · " : ""}
              {format.number(c[k])} {all(DISPLAY_LABELS[k])}
              {k === "cd5" && earliest
                ? ` (${t("healthFastest", { duration: recovery(earliest) })})`
                : ""}
              {k === "ok" && c.partial > 0 ? ` (${t("healthIncluded", { count: c.partial })})` : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
