"use client";

// global-error replaces the root layout and does not inherit its global styles, fonts or
// theme (Next.js docs): the kit lockup and button need the stylesheet imported here, and the
// theme is applied below from the same `theme` store the layout's pre-hydration script reads.
import "./globals.css";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
// Kit button straight from its module (no <Icon>/iconMap): this chunk ships on every page.
import { Button, buttonVariants } from "@omniroute/ui-kit/button";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE } from "@/i18n/config";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

/**
 * Global Error Page — FASE-04 Error Handling
 *
 * Root-level error boundary for unrecoverable errors.
 * This is the last resort — catches errors that the per-page
 * error.js boundaries don't handle.
 *
 * NOTE: this module must never statically import a full locale catalog
 * (`@/i18n/messages/en.json` is ~770 KB). Next.js includes the root
 * global-error chunk in the initial HTML of EVERY page, so a static import
 * ships the whole English catalog on every route. Only the handful of
 * `publicSystem.globalError` strings are needed up front — they live below
 * as `FALLBACK_EN_GLOBAL_ERROR` and are kept in sync with en.json by
 * `tests/unit/global-error-messages.test.ts`. Non-default locales load via
 * the dynamic import in the effect below (async chunk, fetched only when a
 * global error actually renders). Those generated chunks contain only the
 * error-boundary strings, so full catalogs stay outside the client graph.
 */

const FALLBACK_EN_GLOBAL_ERROR = {
  title: "Something went wrong",
  description: "An unexpected error occurred. This has been logged and our team will investigate.",
  detailsAriaLabel: "Error details",
  retryAriaLabel: "Retry loading the page",
  tryAgain: "Try Again",
  statusAriaLabel: "Open system status",
  systemStatus: "System Status",
} as const;

const FALLBACK_EN_MESSAGES = {
  publicSystem: { globalError: { ...FALLBACK_EN_GLOBAL_ERROR } },
};

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function getCookieLocale() {
  const cookie = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${LOCALE_COOKIE}=`));
  const locale = cookie?.slice(`${LOCALE_COOKIE}=`.length) || DEFAULT_LOCALE;
  return LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

/** Same resolution as the pre-hydration script in layout.tsx (persisted store → system). */
function getStoredDark() {
  try {
    const stored = localStorage.getItem("theme");
    const parsed = stored ? JSON.parse(stored) : null;
    const theme = parsed?.state?.theme || "system";
    return (
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  } catch {
    return false;
  }
}

function buildGlobalErrorMessages(localeMessages: Record<string, unknown>) {
  const publicSystem = localeMessages.publicSystem;
  const globalError =
    publicSystem && typeof publicSystem === "object" && !Array.isArray(publicSystem)
      ? (publicSystem as Record<string, unknown>).globalError
      : null;
  const translated =
    globalError && typeof globalError === "object" && !Array.isArray(globalError)
      ? Object.fromEntries(
          Object.entries(globalError).filter(
            ([, value]) => typeof value === "string" && !value.startsWith("__MISSING__:")
          )
        )
      : {};

  return {
    publicSystem: {
      globalError: {
        ...FALLBACK_EN_GLOBAL_ERROR,
        ...translated,
      },
    },
  };
}

function GlobalErrorContent({ error, reset }: GlobalErrorProps) {
  const t = useTranslations("publicSystem");

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex w-full max-w-lg flex-col items-center"
      aria-labelledby="global-error-title"
    >
      <div className="mb-6 flex justify-center">
        <OmniRouteLockup />
      </div>
      <h1 id="global-error-title" className="ci-heading mb-2 text-2xl">
        {t("globalError.title")}
      </h1>
      <p className="mb-6 max-w-[400px] text-[15px] leading-relaxed text-text-muted">
        {t("globalError.description")}
      </p>
      {process.env.NODE_ENV === "development" && error?.message && (
        <pre
          className="mb-6 max-w-[600px] overflow-auto rounded-lg border border-error/30 bg-error-bg p-4 text-left text-xs text-error"
          aria-label={t("globalError.detailsAriaLabel")}
        >
          {error.message}
        </pre>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset} aria-label={t("globalError.retryAriaLabel")}>
          {t("globalError.tryAgain")}
        </Button>
        <a
          href="/status"
          className={buttonVariants({ variant: "outline", size: "lg" })}
          aria-label={t("globalError.statusAriaLabel")}
        >
          {t("globalError.systemStatus")}
        </a>
      </div>
    </main>
  );
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Record<string, unknown>>(FALLBACK_EN_MESSAGES);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      setDark(getStoredDark());
      const nextLocale = getCookieLocale();
      setLocale(nextLocale);
      if (nextLocale === DEFAULT_LOCALE) return;
      try {
        const mod = await import(`../i18n/global-error-messages/${nextLocale}.json`);
        setMessages(buildGlobalErrorMessages(mod.default as Record<string, unknown>));
      } catch {
        setMessages(FALLBACK_EN_MESSAGES);
      }
    })();
  }, []);

  return (
    <html
      lang={locale}
      className={dark ? "ci-theme dark" : "ci-theme"}
      data-theme={dark ? "dark" : "light"}
      style={{ colorScheme: dark ? "dark" : "light" }}
      suppressHydrationWarning
    >
      <body className="m-0 flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center font-sans text-text-main antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <GlobalErrorContent error={error} reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
