"use client";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";

// One kit chart slot per feature (--ci-chart-1..8). The -ink colour is the text-safe pair of each
// slot (4.5:1 on its own -subtle tint and on the card surface, Editions and Classic, light and
// dark); the -subtle tint is the icon tile and the hover fill. Tailwind needs the literal classes.
const FEATURES = [
  {
    icon: "link",
    titleKey: "featureUnifiedEndpointTitle",
    descKey: "featureUnifiedEndpointDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-1)]",
      bg: "hover:bg-[var(--ci-chart-1-subtle)]",
      iconBg: "bg-[var(--ci-chart-1-subtle)]",
      iconText: "text-[var(--ci-chart-1-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-1-ink)]",
    },
  },
  {
    icon: "bolt",
    titleKey: "featureEasySetupTitle",
    descKey: "featureEasySetupDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-2)]",
      bg: "hover:bg-[var(--ci-chart-2-subtle)]",
      iconBg: "bg-[var(--ci-chart-2-subtle)]",
      iconText: "text-[var(--ci-chart-2-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-2-ink)]",
    },
  },
  {
    icon: "shield_with_heart",
    titleKey: "featureModelFallbackTitle",
    descKey: "featureModelFallbackDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-3)]",
      bg: "hover:bg-[var(--ci-chart-3-subtle)]",
      iconBg: "bg-[var(--ci-chart-3-subtle)]",
      iconText: "text-[var(--ci-chart-3-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-3-ink)]",
    },
  },
  {
    icon: "monitoring",
    titleKey: "featureUsageTrackingTitle",
    descKey: "featureUsageTrackingDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-4)]",
      bg: "hover:bg-[var(--ci-chart-4-subtle)]",
      iconBg: "bg-[var(--ci-chart-4-subtle)]",
      iconText: "text-[var(--ci-chart-4-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-4-ink)]",
    },
  },
  {
    icon: "key",
    titleKey: "featureOAuthApiKeysTitle",
    descKey: "featureOAuthApiKeysDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-5)]",
      bg: "hover:bg-[var(--ci-chart-5-subtle)]",
      iconBg: "bg-[var(--ci-chart-5-subtle)]",
      iconText: "text-[var(--ci-chart-5-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-5-ink)]",
    },
  },
  {
    icon: "cloud_sync",
    titleKey: "featureCloudSyncTitle",
    descKey: "featureCloudSyncDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-6)]",
      bg: "hover:bg-[var(--ci-chart-6-subtle)]",
      iconBg: "bg-[var(--ci-chart-6-subtle)]",
      iconText: "text-[var(--ci-chart-6-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-6-ink)]",
    },
  },
  {
    icon: "terminal",
    titleKey: "featureCliSupportTitle",
    descKey: "featureCliSupportDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-7)]",
      bg: "hover:bg-[var(--ci-chart-7-subtle)]",
      iconBg: "bg-[var(--ci-chart-7-subtle)]",
      iconText: "text-[var(--ci-chart-7-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-7-ink)]",
    },
  },
  {
    icon: "dashboard",
    titleKey: "featureDashboardTitle",
    descKey: "featureDashboardDesc",
    colors: {
      border: "hover:border-[var(--ci-chart-8)]",
      bg: "hover:bg-[var(--ci-chart-8-subtle)]",
      iconBg: "bg-[var(--ci-chart-8-subtle)]",
      iconText: "text-[var(--ci-chart-8-ink)]",
      titleHover: "group-hover:text-[var(--ci-chart-8-ink)]",
    },
  },
];

export default function Features() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t("powerfulFeatures")}</h2>
          <p className="text-text-muted max-w-xl text-lg">{t("featuresSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.titleKey}
              className={`p-6 rounded-xl bg-surface border border-border ${feature.colors.border} ${feature.colors.bg} transition-all duration-300 group`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${feature.colors.iconBg} flex items-center justify-center mb-4 ${feature.colors.iconText} group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={feature.icon} size={24} />
              </div>
              <h3
                className={`text-lg font-semibold mb-2 break-words ${feature.colors.titleHover} transition-colors`}
              >
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed break-words">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
