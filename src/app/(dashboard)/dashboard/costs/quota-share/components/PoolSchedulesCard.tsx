"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import type { QuotaSchedule, ReserveRule } from "@/lib/quota/schedules";

export interface PoolSchedulesCardProps {
  poolId: string;
}

/** A row being edited. Same shape the API takes, minus the server-assigned poolId. */
type DraftSchedule = Omit<QuotaSchedule, "poolId">;

const BUDGET_UNITS = ["requests", "tokens", "usd"] as const;
const BUDGET_WINDOWS = ["hourly", "5h", "daily", "weekly", "monthly"] as const;
const RESERVE_WINDOWS = ["any", "hourly", "5h", "daily", "weekly", "monthly"] as const;

/** Sub-percent steps matter: 1 % of a weekly token budget is a lot to round away. */
const RESERVE_STEP = 0.5;

/** "09:30" ⇄ 570. The native time input speaks HH:MM; the API speaks minutes. */
function minutesToTime(minutes: number): string {
  const clamped = Math.max(0, Math.min(minutes, 1440));
  const h = Math.floor(clamped / 60) % 24;
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function timeToMinutes(value: string, fallback: number): number {
  const [h, m] = value.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return fallback;
  return h * 60 + m;
}

/**
 * Localized one-letter weekday initials, indexed by JS getDay().
 * 2024-01-07 was a Sunday, so day N is that date + N — no hand-written table to
 * translate, and the letters follow whatever the viewer's locale spells.
 */
function weekdayInitials(locale: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 7 + i))));
}

function newDraft(): DraftSchedule {
  return {
    id: `new-${Math.random().toString(36).slice(2, 10)}`,
    days: [1, 2, 3, 4, 5],
    startMinute: 9 * 60,
    endMinute: 18 * 60,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
  };
}

/**
 * PoolSchedulesCard — collapsible editor for a pool's time-aware quota windows,
 * backed by GET/PUT /api/quota/pools/[id]/schedules.
 *
 * Each row answers two separate questions, and either half can be left empty:
 *   · WHEN may OmniRoute use these accounts (days + hours + allow/block)
 *   · HOW MUCH may it take once it is inside the window —
 *       "reserve" = how much upstream quota must be LEFT (counts everyone's
 *       usage, so a colleague on the same account pushes OmniRoute out first);
 *       "budget"  = how much OmniRoute itself may spend (counts only its own
 *       traffic, so somebody else's usage neither eats nor inflates it).
 *
 * Fail-soft like its UsageLogCard sibling: a failed load or save shows an inline
 * message and never crashes the parent PoolCard. Collapsed by default so pool
 * cards stay compact.
 */
export default function PoolSchedulesCard({ poolId }: PoolSchedulesCardProps) {
  const t = useTranslations("quotaShare");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<DraftSchedule[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const initials = weekdayInitials(locale);

  useEffect(() => {
    if (!open || loaded) return;
    let alive = true;
    fetch(`/api/quota/pools/${poolId}/schedules`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const raw: unknown = data?.schedules;
        setRows(Array.isArray(raw) ? (raw as DraftSchedule[]) : []);
        setLoaded(true);
      })
      .catch(() => {
        if (!alive) return;
        setRows([]);
        setLoaded(true);
        setMessage({ kind: "error", text: t("schedulesLoadError") });
      });
    return () => {
      alive = false;
    };
  }, [open, loaded, poolId, t]);

  const patchRow = useCallback((index: number, patch: Partial<DraftSchedule>) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    setMessage(null);
  }, []);

  const toggleDay = useCallback((index: number, day: number) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              days: row.days.includes(day)
                ? row.days.filter((d) => d !== day)
                : [...row.days, day].sort((a, b) => a - b),
            }
          : row
      )
    );
    setMessage(null);
  }, []);

  /** Rewrite one row's reserve list; `next` of null removes the rule at `ruleIndex`. */
  const patchReserve = useCallback((index: number, ruleIndex: number, next: ReserveRule | null) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        const reserves = next
          ? row.reserves.map((rule, r) => (r === ruleIndex ? next : rule))
          : row.reserves.filter((_, r) => r !== ruleIndex);
        return { ...row, reserves };
      })
    );
    setMessage(null);
  }, []);

  const addReserve = useCallback((index: number) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        // Offer a window the row has not reserved yet, so a second rule is
        // useful on its own instead of shadowing the first.
        const taken = new Set(row.reserves.map((r) => r.window));
        const window = RESERVE_WINDOWS.find((w) => !taken.has(w)) ?? "any";
        return { ...row, reserves: [...row.reserves, { window, percent: 10 }] };
      })
    );
    setMessage(null);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Drop the client-side placeholder ids so the server mints stable ones,
      // and never ship half a budget — the API rejects an orphan value/unit.
      const payload = rows.map((row) => {
        const { id, ...rest } = row;
        const hasBudget = rest.budgetValue !== undefined && rest.budgetUnit !== undefined;
        return {
          ...rest,
          ...(id.startsWith("new-") ? {} : { id }),
          ...(hasBudget ? {} : { budgetValue: undefined, budgetUnit: undefined }),
        };
      });

      const res = await fetch(`/api/quota/pools/${poolId}/schedules`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedules: payload }),
      });

      if (!res.ok) {
        setMessage({ kind: "error", text: t("schedulesSaveError") });
        return;
      }
      const data = await res.json();
      setRows(Array.isArray(data?.schedules) ? (data.schedules as DraftSchedule[]) : []);
      setMessage({ kind: "ok", text: t("schedulesSaved") });
    } catch {
      setMessage({ kind: "error", text: t("schedulesSaveError") });
    } finally {
      setSaving(false);
    }
  }, [rows, poolId, t]);

  // Dense inline editor rows: kit controls at a compact height.
  const inputCls = "h-7 min-h-7 px-1.5 text-[11px]";
  const selectCls = "ci-select-native--sm h-7 min-h-7 text-[11px]";

  return (
    <div className="mt-2 pt-2 border-t border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="h-7 min-h-7 w-full justify-start gap-1 px-1 text-[10px] font-bold uppercase tracking-wide text-text-muted"
      >
        <Icon
          name="chevron_right"
          size={13}
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        />
        {t("schedulesTitle")}
        {rows.length > 0 && (
          <span className="ml-1 text-text-muted/60 normal-case font-normal">({rows.length})</span>
        )}
      </Button>

      {open && (
        <div className="mt-1.5 flex flex-col gap-2">
          <p className="text-[11px] text-text-muted leading-snug">{t("schedulesHint")}</p>

          {!loaded ? (
            <div className="text-[11px] text-text-muted italic">{t("loading")}</div>
          ) : rows.length === 0 ? (
            <div className="text-[11px] text-text-muted italic">{t("schedulesEmpty")}</div>
          ) : (
            <div className="flex flex-col gap-2">
              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`rounded-md border border-border p-2 flex flex-col gap-1.5 ${
                    row.enabled ? "" : "opacity-50"
                  }`}
                >
                  {/* Row 1 — when */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Checkbox
                      checked={row.enabled}
                      onChange={(e) => patchRow(index, { enabled: e.target.checked })}
                      aria-label={t("schedulesEnabled")}
                    />

                    <Select
                      value={row.mode}
                      onChange={(e) =>
                        patchRow(index, { mode: e.target.value as DraftSchedule["mode"] })
                      }
                      aria-label={t("schedulesMode")}
                      selectClassName={selectCls}
                    >
                      <option value="allow">{t("schedulesModeAllow")}</option>
                      <option value="block">{t("schedulesModeBlock")}</option>
                    </Select>

                    <div className="flex items-center gap-0.5">
                      {initials.map((initial, day) => (
                        <Button
                          key={day}
                          variant={row.days.includes(day) ? "secondary" : "ghost"}
                          size="icon-sm"
                          onClick={() => toggleDay(index, day)}
                          aria-pressed={row.days.includes(day)}
                          title={initial}
                          className={`size-6 min-h-6 text-[10px] font-bold ${
                            row.days.includes(day) ? "text-primary" : "text-text-muted"
                          }`}
                        >
                          {initial}
                        </Button>
                      ))}
                    </div>

                    <Input
                      type="time"
                      inputClassName={inputCls}
                      value={minutesToTime(row.startMinute)}
                      onChange={(e) =>
                        patchRow(index, {
                          startMinute: timeToMinutes(e.target.value, row.startMinute),
                        })
                      }
                      aria-label={t("schedulesFrom")}
                    />
                    <span className="text-[11px] text-text-muted">→</span>
                    <Input
                      type="time"
                      inputClassName={inputCls}
                      value={minutesToTime(row.endMinute)}
                      onChange={(e) =>
                        patchRow(index, { endMinute: timeToMinutes(e.target.value, row.endMinute) })
                      }
                      aria-label={t("schedulesTo")}
                    />

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        setRows((prev) => prev.filter((_, i) => i !== index));
                        setMessage(null);
                      }}
                      title={t("schedulesRemove")}
                      aria-label={t("schedulesRemove")}
                      className="ml-auto text-text-muted hover:bg-error/10 hover:text-error"
                    >
                      <Icon name="delete" size={14} />
                    </Button>
                  </div>

                  {/* Row 2a — how much must be left, one floor per metered window */}
                  {row.mode === "allow" && (
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className="text-[11px] text-text-muted"
                          title={t("schedulesReserveHint")}
                        >
                          {t("schedulesReserve")}
                        </span>
                        {row.reserves.length === 0 && (
                          <span className="text-[11px] text-text-muted/60 italic">
                            {t("schedulesReserveNone")}
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          icon="add"
                          onClick={() => addReserve(index)}
                          className="h-7 min-h-7 px-2 text-[11px]"
                        >
                          {t("schedulesReserveAdd")}
                        </Button>
                      </div>

                      {row.reserves.map((rule, ruleIndex) => (
                        <div
                          key={`${rule.window}-${ruleIndex}`}
                          className="flex flex-wrap items-center gap-1.5 pl-3"
                        >
                          <Select
                            selectClassName={selectCls}
                            value={rule.window}
                            onChange={(e) =>
                              patchReserve(index, ruleIndex, {
                                ...rule,
                                window: e.target.value as ReserveRule["window"],
                              })
                            }
                            aria-label={t("schedulesReserveWindow")}
                          >
                            {RESERVE_WINDOWS.map((w) => (
                              <option key={w} value={w}>
                                {w === "any" ? t("schedulesReserveWindowAny") : w}
                              </option>
                            ))}
                          </Select>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            step={RESERVE_STEP}
                            value={rule.percent}
                            onChange={(e) =>
                              patchReserve(index, ruleIndex, {
                                ...rule,
                                percent: Number(e.target.value) || 0,
                              })
                            }
                            aria-label={t("schedulesReserve")}
                            inputClassName={`${inputCls} w-16`}
                          />
                          <span className="text-[11px] text-text-muted">%</span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => patchReserve(index, ruleIndex, null)}
                            title={t("schedulesReserveRemove")}
                            aria-label={t("schedulesReserveRemove")}
                            className="size-6 min-h-6 text-text-muted hover:bg-error/10 hover:text-error"
                          >
                            <Icon name="close" size={13} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Row 2b — how much OmniRoute itself may spend */}
                  {row.mode === "allow" && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="text-[11px] text-text-muted"
                        title={t("schedulesBudgetHint")}
                      >
                        {t("schedulesBudget")}
                      </span>
                      <Input
                        type="number"
                        aria-label={t("schedulesBudget")}
                        min={0}
                        value={row.budgetValue ?? ""}
                        placeholder="—"
                        onChange={(e) =>
                          patchRow(index, {
                            budgetValue: e.target.value === "" ? undefined : Number(e.target.value),
                            // A value needs a unit to be countable; seed one so a
                            // half-filled budget can never be submitted.
                            budgetUnit:
                              e.target.value === "" ? undefined : (row.budgetUnit ?? "tokens"),
                          })
                        }
                        inputClassName={`${inputCls} w-24`}
                      />
                      <Select
                        selectClassName={selectCls}
                        value={row.budgetUnit ?? ""}
                        disabled={row.budgetValue === undefined}
                        onChange={(e) =>
                          patchRow(index, {
                            budgetUnit: (e.target.value ||
                              undefined) as DraftSchedule["budgetUnit"],
                          })
                        }
                        aria-label={t("schedulesBudgetUnit")}
                      >
                        <option value="">—</option>
                        {BUDGET_UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </Select>
                      <Select
                        selectClassName={selectCls}
                        value={row.budgetWindow}
                        disabled={row.budgetValue === undefined}
                        onChange={(e) =>
                          patchRow(index, {
                            budgetWindow: e.target.value as DraftSchedule["budgetWindow"],
                          })
                        }
                        aria-label={t("schedulesBudgetWindow")}
                      >
                        {BUDGET_WINDOWS.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}

                  {/* Row 3 — zone and precedence */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-text-muted">{t("schedulesTimezone")}</span>
                    <Input
                      type="text"
                      aria-label={t("schedulesTimezone")}
                      value={row.timezone ?? ""}
                      placeholder="Europe/Rome"
                      onChange={(e) => patchRow(index, { timezone: e.target.value.trim() || null })}
                      inputClassName={`${inputCls} w-40`}
                    />
                    <span className="ml-1 text-[11px] text-text-muted">
                      {t("schedulesPriority")}
                    </span>
                    <Input
                      type="number"
                      aria-label={t("schedulesPriority")}
                      min={0}
                      max={1000}
                      value={row.priority}
                      onChange={(e) => patchRow(index, { priority: Number(e.target.value) || 0 })}
                      inputClassName={`${inputCls} w-14`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon="add"
              onClick={() => {
                setRows((prev) => [...prev, newDraft()]);
                setMessage(null);
              }}
            >
              {t("schedulesAdd")}
            </Button>
            <Button size="sm" onClick={save} loading={saving} disabled={saving || !loaded}>
              {saving ? t("loading") : t("save")}
            </Button>
            {message && (
              <span
                role="status"
                className={`text-[11px] ${message.kind === "ok" ? "text-success" : "text-error"}`}
              >
                {message.text}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
