"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { useDisplayBaseUrl } from "@/shared/hooks";

export default function GetStarted() {
  const t = useTranslations("landing");
  const [copied, setCopied] = useState(false);

  const endpoint = useDisplayBaseUrl();
  const dashboardUrl = `${endpoint}/dashboard`;
  const command = "npx omniroute";

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Steps */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              {t("getStartedIn30Seconds")}
            </h2>
            <p className="text-text-muted text-lg mb-8">{t("getStartedDescription")}</p>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t("installOmniRoute")}</h4>
                  <p className="text-sm text-text-muted mt-1">{t("installStepDescription")}</p>
                </div>
              </div>

              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t("openDashboard")}</h4>
                  <p className="text-sm text-text-muted mt-1">
                    {t("openDashboardStepDescription")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t("routeRequests")}</h4>
                  <p className="text-sm text-text-muted mt-1">
                    {t("routeRequestsStepDescription", { endpoint })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code block */}
          <div className="flex-1 w-full">
            {/* Follows the palette (light terminal in light themes); the prompt, URL and path
                colours are the kit's --ci-code-* syntax tokens, flipped by the kit in dark. */}
            <div className="rounded-xl overflow-hidden bg-bg border border-border shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <div className="ml-2 text-xs text-text-muted font-mono">{t("terminal")}</div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-hidden">
                <div
                  className="flex items-center gap-2 mb-4 group cursor-pointer min-w-0"
                  onClick={() => handleCopy(command)}
                >
                  <span className="text-[var(--ci-code-string)]">$</span>
                  <span className="text-text-main break-all">{command}</span>
                  <span className="ml-auto text-text-muted text-xs opacity-0 group-hover:opacity-100">
                    {copied ? t("copied") : t("copy")}
                  </span>
                </div>

                <div className="text-text-muted mb-6">
                  <span className="text-primary">&gt;</span> {t("startingOmniRoute")}
                  <br />
                  <span className="text-primary">&gt;</span> {t("serverRunningOnLabel")}{" "}
                  <span className="text-[var(--ci-code-function)] break-all">{endpoint}</span>
                  <br />
                  <span className="text-primary">&gt;</span> {t("dashboardLabel")}:{" "}
                  <span className="text-[var(--ci-code-function)] break-all">{dashboardUrl}</span>
                  <br />
                  <span className="text-success">&gt;</span> {t("readyToRoute")}
                </div>

                <div className="text-xs text-text-muted mb-2 border-t border-border pt-4">
                  {t("configureProvidersNote")}
                </div>

                <div className="text-text-muted text-xs">
                  <span className="text-[var(--ci-code-property)]">{t("dataLocation")}</span>
                  <br />
                  <span className="text-text-muted">{t("dataLocationMacLinux")}</span>{" "}
                  <span className="break-all">~/.omniroute/db.json</span>
                  <br />
                  <span className="text-text-muted">{t("dataLocationWindows")}</span>{" "}
                  <span className="break-all">%APPDATA%/omniroute/db.json</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
