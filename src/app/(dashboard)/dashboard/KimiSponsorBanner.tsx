"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button as KitButton } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { shouldShowKimiSponsorBanner } from "./kimiSponsorBannerGate";
import { KIMI_BRAND_COLOR } from "./providers/featuredProviders";

// Official Kimi partnership tracking link — keep in sync with README.md's
// Open Source Friends section and the aff links wired in the providers
// onboarding UI (ProviderPageHeader.tsx). Retargeted 2026-08 from the coding
// plan (kimi.com/code) to the API platform at Moonshot's request: coding plan
// subscriptions are closed to most new users, so that traffic could not
// convert.
// Dedicated tracked link issued by Moonshot 2026-08 for the 15% first-top-up
// bonus campaign (offer valid through 2026-09-30 — revisit the 15% copy in the
// i18n `kimiSponsorBanner.description` strings after that date if not renewed).
const KIMI_PLATFORM_AFF_URL =
  "https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute";

// Versioned dismissal key — bump the suffix (e.g. `-v3`) if the banner's
// offer/copy ever changes materially enough to warrant re-showing it to
// users who already dismissed the previous version. `-v2` = the 2026-08 CTA
// retarget to the API platform (new destination + new copy).
const DISMISS_STORAGE_KEY = "omniroute-kimi-sponsor-banner-dismissed-v2";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:kimi-sponsor-banner-dismissed";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(DISMISS_STORAGE_KEY);
  } catch {
    return true;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}

// SSR has no localStorage, so the server always renders the banner visible;
// useSyncExternalStore reconciles that against the real client-side value
// right after hydration (mirroring useTheme's systemPrefersDark pattern),
// with no hydration mismatch and no setState-in-effect.
function getServerSnapshot() {
  return true;
}

/**
 * Dismissable banner announcing the Kimi (Moonshot AI) official OmniRoute
 * partnership on the dashboard home page. Self-contained: reads the app's own
 * version (APP_CONFIG.version) to decide whether it is still inside the
 * agreed display window (see kimiSponsorBannerGate.ts) and persists dismissal via
 * localStorage. The logomark reuses <ProviderIcon providerId="kimi" .../>
 * so it stays theme-aware for free via the THEMED_SVGS wiring in
 * ProviderIcon.tsx.
 */
export default function KimiSponsorBanner() {
  const t = useTranslations("kimiSponsorBanner");
  const visible = useSyncExternalStore(subscribe, isNotDismissed, getServerSnapshot);

  if (!visible || !shouldShowKimiSponsorBanner(APP_CONFIG.version)) {
    return null;
  }

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore — worst case the banner reappears next visit
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  // The partner brand is the Card's tint, never the text or the CTA fill: the kit derives an AA
  // ink and border for it in every look. The note under the CTA uses full-strength text-muted at
  // 12px — the old 9px at 70% opacity failed AA (KEA-7886 P7).
  return (
    <Card
      padding="none"
      brandColor={KIMI_BRAND_COLOR}
      role="complementary"
      aria-label={t("foundingFriendTitle")}
      className="mb-4 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
          <ProviderIcon providerId="kimi" size={24} type="color" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{t("foundingFriendTitle")}</p>
          <p className="mt-0.5 text-xs text-text-muted">{t("description")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <div className="flex flex-col items-end gap-0.5">
          <KitButton asChild size="sm">
            <a
              href={KIMI_PLATFORM_AFF_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={t("partnerLinkNote")}
              className="whitespace-nowrap"
            >
              {t("cta")}
              <Icon name="open_in_new" size={14} />
            </a>
          </KitButton>
          <span className="text-xs text-text-muted">{t("partnerLinkNote")}</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          icon="close"
          onClick={dismiss}
          aria-label={t("dismissAriaLabel")}
          className="text-text-muted hover:text-text-main"
        />
      </div>
    </Card>
  );
}
