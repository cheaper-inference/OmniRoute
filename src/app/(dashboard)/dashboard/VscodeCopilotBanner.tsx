"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button as KitButton } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";

// Marketplace listing is the primary CTA; Open VSX (Cursor/Windsurf/VSCodium/etc.)
// is called out via secondaryNote instead of a second button, to keep this banner
// the same size as KimiSponsorBanner.
// This used to go through our own link.omniroute.online shortener for click
// metrics, but that domain no longer resolves after the move to omniskill.online.
const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot";

// VS Code's brand blue, the banner's tint.
const VSCODE_BRAND_COLOR = "#007ACC";

const DISMISS_STORAGE_KEY = "omniroute-vscode-copilot-banner-dismissed-v1";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:vscode-copilot-banner-dismissed";

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
 * Dismissable banner announcing the OmniCopilot VS Code extension on the
 * dashboard home page — same size/shape as KimiSponsorBanner, no version gate
 * (durable feature announcement, not a time-boxed sponsor deal).
 */
export default function VscodeCopilotBanner() {
  const t = useTranslations("vscodeCopilotBanner");
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
  // ink and border for it in every look. The note uses full-strength text-muted at 12px — the old
  // 9px at 70% opacity was the last axe color-contrast node on /dashboard (KEA-7886 P7).
  return (
    <Card
      padding="none"
      brandColor={VSCODE_BRAND_COLOR}
      role="complementary"
      aria-label={t("title")}
      className="mb-4 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
          <Icon name="extension" size={22} className="text-[var(--ci-brand-ink)]" />
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
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap"
            >
              {t("cta")}
              <Icon name="open_in_new" size={14} />
            </a>
          </KitButton>
          <span className="text-xs text-text-muted">{t("secondaryNote")}</span>
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
