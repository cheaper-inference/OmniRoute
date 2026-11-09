"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button as KitButton } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { CHEAPERINFERENCE_BRAND_COLOR } from "./providers/featuredProviders";

// The URL in README.md's Open Source Friends section. This used to go through
// our own link.omniroute.online shortener for click metrics, but that domain no
// longer resolves (every slug 404s) after the move to omniskill.online, so the
// CTA points straight at the destination again.
const CHEAPER_INFERENCE_URL = "https://cheaperinference.com/?utm_source=omniroute";

const DISMISS_STORAGE_KEY = "omniroute-cheaperinference-sponsor-banner-dismissed-v1";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:cheaperinference-sponsor-banner-dismissed";

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
// right after hydration, mirroring KimiSponsorBanner's pattern.
function getServerSnapshot() {
  return true;
}

/**
 * Dismissable banner announcing the Cheaper Inference OmniRoute partnership on
 * the dashboard home page — same size/shape as KimiSponsorBanner, no version
 * gate (durable partnership, not a time-boxed offer). The logomark reuses
 * <ProviderIcon providerId="cheaperinference" .../>.
 */
export default function CheaperInferenceSponsorBanner() {
  const t = useTranslations("cheaperInferenceSponsorBanner");
  const visible = useSyncExternalStore(subscribe, isNotDismissed, getServerSnapshot);

  if (!visible) {
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
  // 12px (9px at 70% failed AA, P7).
  return (
    <Card
      padding="none"
      brandColor={CHEAPERINFERENCE_BRAND_COLOR}
      role="complementary"
      aria-label={t("title")}
      className="mb-4 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
          <ProviderIcon providerId="cheaperinference" size={24} type="color" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{t("title")}</p>
          <p className="mt-0.5 text-xs text-text-muted">{t("description")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <div className="flex flex-col items-end gap-0.5">
          <KitButton asChild size="sm">
            <a
              href={CHEAPER_INFERENCE_URL}
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
