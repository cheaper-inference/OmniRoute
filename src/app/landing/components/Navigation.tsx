"use client";

import Icon from "@/shared/components/Icon";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

export default function Navigation() {
  const t = useTranslations("landing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 min-w-0"
          onClick={() => router.push("/")}
          aria-label={t("navigateHome")}
        >
          {/* The nav follows the palette, so the lockup keeps the kit's own brand-mark ink. */}
          <OmniRouteLockup />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
            href="#features"
          >
            {t("featuresLink")}
          </a>
          <a
            className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
            href="#how-it-works"
          >
            {t("howItWorks")}
          </a>
          <Link
            className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
            href="/docs"
          >
            {t("docsLink")}
          </Link>
          <a
            className="text-text-muted hover:text-text-main text-sm font-medium transition-colors flex items-center gap-1"
            href="https://github.com/cheaper-inference/OmniRoute"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("github")}
            <Icon name="open_in_new" size={14} />
          </a>
        </div>

        {/* CTA + Mobile menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 bg-primary hover:bg-primary-hover transition-all text-accent-foreground text-sm font-semibold shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_60%,transparent)]"
          >
            {t("getStarted")}
          </button>
          <button
            className="md:hidden text-text-main"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("toggleMenu")}
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <div className="flex flex-col gap-4 p-6">
            <a
              className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("featuresLink")}
            </a>
            <a
              className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("howItWorks")}
            </a>
            <Link
              className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("docsLink")}
            </Link>
            <a
              className="text-text-muted hover:text-text-main text-sm font-medium transition-colors"
              href="https://github.com/cheaper-inference/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <button
              onClick={() => router.push("/dashboard")}
              className="h-9 rounded-lg bg-primary hover:bg-primary-hover text-accent-foreground text-sm font-semibold"
            >
              {t("getStarted")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
