"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Modal from "@/shared/components/Modal";
import { cumulativeXpForLevel, getLevelTier, getLevelTitle } from "@/lib/gamification/xp";

interface UserLevel {
  apiKeyId: string;
  totalXp: number;
  currentLevel: number;
  updatedAt: string;
}

interface BadgeDef {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  rarity: string;
  criteria: string | null;
  hidden: number;
  createdAt: string;
}

interface UserBadge {
  apiKeyId: string;
  badgeId: string;
  unlockedAt: string;
  badgeName?: string;
  badgeDescription?: string | null;
  badgeIcon?: string | null;
  badgeCategory?: string | null;
  badgeRarity?: string;
}

const TIER_CONFIG: Record<string, { labelKey: string; color: string; bg: string }> = {
  bronze: { labelKey: "tiers.bronze", color: "text-chart-5", bg: "bg-chart-5/10" },
  silver: { labelKey: "tiers.silver", color: "text-text-muted", bg: "bg-text-muted/10" },
  gold: { labelKey: "tiers.gold", color: "text-warning", bg: "bg-warning/10" },
  platinum: { labelKey: "tiers.platinum", color: "text-chart-2", bg: "bg-chart-2/10" },
  diamond: { labelKey: "tiers.diamond", color: "text-chart-3", bg: "bg-chart-3/10" },
};

const BADGE_ICONS: Record<string, string> = {
  sparkles: "auto_awesome",
  zap: "bolt",
  cpu: "memory",
  whale: "water",
  gift: "redeem",
  heart: "favorite",
  santa: "celebration",
  trophy: "emoji_events",
  compass: "explore",
  languages: "translate",
  blocks: "widgets",
  gauge: "speed",
  shield: "shield",
  flame: "local_fire_department",
  sword: "swords",
  crown: "workspace_premium",
  infinity: "all_inclusive",
  rocket: "rocket_launch",
  bug: "bug_report",
  "git-merge": "merge",
  medal: "military_tech",
  question: "help",
};

function BadgeIcon({ icon, earned }: { icon: string | null; earned: boolean }) {
  const materialIcon = icon ? BADGE_ICONS[icon] : null;
  return materialIcon ? (
    <Icon name={materialIcon} size={32} />
  ) : (
    <span aria-hidden="true">{earned ? "🏅" : "🔒"}</span>
  );
}

/**
 * Current daily streak carried by `/api/gamification/level` (#2403). Older or partial
 * payloads without a `streak` field, or with a non-numeric count, render as no streak.
 */
function readStreakCount(data: { streak?: { current?: unknown } | null }): number {
  return Number(data.streak?.current) || 0;
}

const RARITY_COLORS: Record<string, string> = {
  common: "text-text-muted border-border",
  uncommon: "text-success border-success/30",
  rare: "text-info border-info/30",
  epic: "text-chart-3 border-chart-3/30",
  legendary: "text-warning border-warning/30",
};

export default function ProfilePage() {
  const t = useTranslations("common");
  const tg = useTranslations("gamification");
  const locale = useLocale();
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [allBadges, setAllBadges] = useState<BadgeDef[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<BadgeDef | null>(null);

  useEffect(() => {
    if (!selectedBadge) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedBadge(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedBadge]);
  const [streak, setStreak] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [levelRes, badgesRes, earnedRes] = await Promise.all([
        fetch("/api/gamification/level"),
        fetch("/api/gamification/badges"),
        fetch("/api/gamification/badges/earned"),
      ]);

      if (!levelRes.ok && !badgesRes.ok && !earnedRes.ok) {
        throw new Error(tg("profileLoadFailed"));
      }

      if (levelRes.ok) {
        const data = await levelRes.json();
        setUserLevel(data.level ?? data);
        setStreak(readStreakCount(data));
      }
      if (badgesRes.ok) {
        const data = await badgesRes.json();
        setAllBadges(data.badges ?? data ?? []);
      }
      if (earnedRes.ok) {
        const data = await earnedRes.json();
        setEarnedBadges(data.badges ?? data ?? []);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : tg("profileLoadFailed"));
    } finally {
      setLoading(false);
    }
  }, [tg]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [fetchData]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-text-muted">{t("profileLoading")}</div>
      </div>
    );
  }

  const level = userLevel?.currentLevel ?? 1;
  const totalXp = userLevel?.totalXp ?? 0;
  const currentLevelCumulative = cumulativeXpForLevel(level);
  const nextLevelCumulative = cumulativeXpForLevel(level + 1);
  const xpInCurrentLevel = totalXp - currentLevelCumulative;
  const xpForNext = nextLevelCumulative - currentLevelCumulative;
  const xpProgress = xpForNext > 0 ? (xpInCurrentLevel / xpForNext) * 100 : 0;
  const tier = getLevelTier(level);
  const tierConfig = TIER_CONFIG[tier] || TIER_CONFIG.bronze;
  const earnedIds = new Set(earnedBadges.map((b) => b.badgeId));
  const translateBadge = (badge: BadgeDef, field: "name" | "description" | "criteria") => {
    const key = `badges.${badge.id}.${field}`;
    const fallback = field === "name" ? badge.name : badge.description || "";
    return tg.has(key) ? tg(key) : fallback;
  };
  const translateRarity = (rarity: string) => {
    const key = `rarities.${rarity}`;
    return tg.has(key) ? tg(key) : rarity;
  };
  const translateCategory = (category: string) => {
    const key = `categories.${category}`;
    return tg.has(key) ? tg(key) : category;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Kit PageHeader (its own h1): the shell drops its title while a .ci-page-header is
          mounted, so the page has one "Profile" heading (KEA-7886 P12). */}
      <PageHeader compact title={t("profile")} />
      {error && (
        <div role="alert" className="p-3 rounded-lg bg-error-bg text-error text-sm">
          {error}
        </div>
      )}

      {/* Level & XP Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black ${tierConfig.bg} ${tierConfig.color}`}
            >
              {level}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {tg(`levelTitles.${getLevelTitle(level).toLowerCase()}`)}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${tierConfig.bg} ${tierConfig.color} border-0`}>
                  {tg("tierLabel", { tier: tg(tierConfig.labelKey) })}
                </Badge>
                {streak > 0 && (
                  <span className="text-sm text-warning flex items-center gap-1">
                    🔥 {tg("dayStreak", { count: streak })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-muted">
                {tg("levelProgress", { current: level, next: level + 1 })}
              </span>
              <span className="text-text-muted">
                {xpInCurrentLevel.toLocaleString(locale)} / {xpForNext.toLocaleString(locale)} XP
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={tg("levelProgress", { current: level, next: level + 1 })}
              aria-valuemin={0}
              aria-valuemax={xpForNext}
              aria-valuenow={Math.min(Math.max(xpInCurrentLevel, 0), xpForNext)}
              className="w-full h-3 rounded-full bg-border overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-chart-3 to-chart-5 transition-all duration-500"
                style={{ width: `${Math.min(xpProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              {tg("totalXpEarned", { count: totalXp.toLocaleString(locale) })}
            </p>
          </div>
        </div>
      </Card>

      {/* Streak display */}
      {streak > 0 && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="text-5xl">🔥</div>
            <div>
              <p className="text-2xl font-bold">{tg("dayStreak", { count: streak })}</p>
              <p className="text-sm text-text-muted">{tg("maintainStreak")}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {tg("badgesTitle", { earned: earnedBadges.length, total: allBadges.length })}
        </h3>

        {allBadges.length === 0 ? (
          <Card>
            <div className="text-center py-12 text-text-muted">{tg("noBadges")}</div>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allBadges.map((badge) => {
              const isEarned = earnedIds.has(badge.id);
              const isHiddenAndLocked = Boolean(badge.hidden) && !isEarned;
              const earnedInfo = earnedBadges.find((b) => b.badgeId === badge.id);
              const rarityColor = RARITY_COLORS[badge.rarity] || RARITY_COLORS.common;

              return (
                // kit-exception: Multi-line badge tile (icon, name, description, date, progress): the kit Button
                // is a single-line pill, so the tile stays a native <button> on kit tokens.
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => !isHiddenAndLocked && setSelectedBadge(badge)}
                  disabled={isHiddenAndLocked}
                  // Locked: dashed border, muted surface, dimmed glyph and a lock mark. The text
                  // keeps full token ink — the old tile-wide opacity-50 + grayscale put names and
                  // descriptions under AA (36 axe color-contrast nodes, F4).
                  className={`relative p-4 rounded-xl border transition-all text-start ${
                    isEarned
                      ? `${rarityColor} bg-surface hover:shadow-md`
                      : "border-dashed border-border bg-bg-subtle enabled:hover:border-text-muted disabled:cursor-default"
                  }`}
                  data-locked={isEarned ? undefined : "true"}
                >
                  {!isEarned && (
                    <span className="absolute top-2 end-2 text-text-muted">
                      <Icon name="lock" size={14} />
                      <span className="ci-sr-only">{tg("badgeLocked")}</span>
                    </span>
                  )}
                  <div className={`text-3xl mb-2 ${isEarned ? "" : "opacity-50 grayscale"}`}>
                    <BadgeIcon icon={isHiddenAndLocked ? null : badge.icon} earned={isEarned} />
                  </div>
                  <p className="font-semibold text-sm truncate">
                    {badge.hidden && !isEarned ? "???" : translateBadge(badge, "name")}
                  </p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">
                    {badge.hidden && !isEarned
                      ? tg("hiddenBadge")
                      : translateBadge(badge, "description")}
                  </p>
                  {isEarned && earnedInfo?.unlockedAt && (
                    <p className="text-[10px] text-text-muted mt-2">
                      {tg("earnedDate", {
                        date: new Date(earnedInfo.unlockedAt).toLocaleDateString(locale),
                      })}
                    </p>
                  )}
                  {!isEarned && badge.criteria && (
                    <div className="mt-2">
                      <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full w-0 rounded-full bg-chart-3/50" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      <Modal
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge ? translateBadge(selectedBadge, "name") : undefined}
        size="md"
        footer={
          <Button variant="outline" onClick={() => setSelectedBadge(null)}>
            {t("close")}
          </Button>
        }
      >
        {selectedBadge && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-4xl">
                <BadgeIcon icon={selectedBadge.icon} earned={earnedIds.has(selectedBadge.id)} />
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded border ${RARITY_COLORS[selectedBadge.rarity] || RARITY_COLORS.common} bg-surface`}
              >
                {translateRarity(selectedBadge.rarity)}
              </span>
            </div>

            {selectedBadge.description && (
              <p className="text-sm text-text-muted mb-4">
                {translateBadge(selectedBadge, "description")}
              </p>
            )}

            {selectedBadge.category && (
              <p className="text-xs text-text-muted mb-2">
                {tg("category")}:{" "}
                <span className="text-text-main">{translateCategory(selectedBadge.category)}</span>
              </p>
            )}

            {selectedBadge.criteria && (
              <div className="p-3 rounded-lg bg-bg-subtle border border-border">
                <p className="text-xs font-medium text-text-muted mb-1">{t("profileHowToEarn")}</p>
                <p className="text-sm">{translateBadge(selectedBadge, "criteria")}</p>
              </div>
            )}

            {earnedIds.has(selectedBadge.id) && (
              <div className="mt-4 p-3 rounded-lg bg-success-bg text-success text-sm">
                ✓{" "}
                {tg("earnedOn", {
                  date: new Date(
                    earnedBadges.find((b) => b.badgeId === selectedBadge.id)?.unlockedAt || ""
                  ).toLocaleDateString(locale),
                })}
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
