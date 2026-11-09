"use client";

import Icon from "@/shared/components/Icon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

export default function Footer() {
  const t = useTranslations("landing");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <OmniRouteLockup />
            </div>
            <p className="text-text-muted text-sm max-w-xs mb-6 break-words">
              {t("footerTagline")}
            </p>
            <div className="flex gap-4">
              <a
                className="text-text-muted hover:text-text-main transition-colors"
                href="https://github.com/cheaper-inference/OmniRoute"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("github")}
              >
                <Icon name="code" size={24} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-heading">{t("product")}</h4>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="#features"
            >
              {t("featuresLink")}
            </a>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="/dashboard"
            >
              {t("dashboardLink")}
            </a>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="https://github.com/cheaper-inference/OmniRoute/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("changelog")}
            </a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-heading">{t("resources")}</h4>
            <Link
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="/docs"
            >
              {t("documentation")}
            </Link>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="https://github.com/cheaper-inference/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="https://www.npmjs.com/package/omniroute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("npm")}
            </a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-heading">{t("legal")}</h4>
            <a
              className="text-text-muted hover:text-primary text-sm transition-colors"
              href="https://github.com/cheaper-inference/OmniRoute/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("mitLicense")}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm break-words text-center md:text-left">
            {t("copyright", { year })}
          </p>
          <div className="flex gap-6">
            <a
              className="text-text-muted hover:text-text-main text-sm transition-colors"
              href="https://github.com/cheaper-inference/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <a
              className="text-text-muted hover:text-text-main text-sm transition-colors"
              href="https://www.npmjs.com/package/omniroute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("npm")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
