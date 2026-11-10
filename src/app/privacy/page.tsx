import Icon from "@/shared/components/Icon";
import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("privacyMetadataTitle"),
    description: t("privacyMetadataDescription"),
  };
}

export default function PrivacyPage() {
  const t = useTranslations("legal");

  return (
    <main className="min-h-screen text-text-main">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-8"
        >
          <Icon name="arrow_back" size={18} />
          {t("backToHome")}
        </Link>

        <h1 className="ci-heading text-3xl mb-2">{t("privacyPolicy")}</h1>
        <p className="text-sm text-text-muted mb-10">
          {t("lastUpdated", { date: t("policyLastUpdatedDate") })}
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection1Title")}</h2>
            <p>{t("privacySection1Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection2Title")}</h2>
            <p className="mb-3">
              {t("privacyDataStoredIn")}{" "}
              <code className="font-mono text-sm text-text-main">~/.omniroute/storage.sqlite</code>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-main">{t("providerConfigurations")}</strong>{" "}
                {t("listSeparator")} {t("privacyDataProviderConfigurationsDesc")}
              </li>
              <li>
                <strong className="text-text-main">{t("apiKeys")}</strong> {t("listSeparator")}{" "}
                {t("privacyDataApiKeysDesc")}
              </li>
              <li>
                <strong className="text-text-main">{t("usageLogs")}</strong> {t("listSeparator")}{" "}
                {t("privacyDataUsageLogsDesc")}
              </li>
              <li>
                <strong className="text-text-main">{t("applicationSettings")}</strong>{" "}
                {t("listSeparator")} {t("privacyDataApplicationSettingsDesc")}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection3Title")}</h2>
            <p>{t("privacySection3Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection4Title")}</h2>
            <p>{t("privacySection4Text")}</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <a
                  href="https://openai.com/policies/privacy-policy"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("privacyOpenAiPolicy")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/privacy"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("privacyAnthropicPolicy")}
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("privacyGooglePolicy")}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection5Title")}</h2>
            <p>{t("privacySection5Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection6Title")}</h2>
            <p>{t("privacyLoggingIntro")}</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>{t("viewExportAnalytics")}</li>
              <li>{t("clearHistory")}</li>
              <li>{t("configureRetention")}</li>
              <li>{t("backupRestore")}</li>
            </ul>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("privacySection7Title")}</h2>
            <p>
              {t("privacySection7TextStart")}{" "}
              <code className="font-mono text-sm text-text-main">~/.omniroute/</code>{" "}
              {t("privacySection7TextEnd")}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-sm text-text-muted">
          <p>
            {t("questionsVisit")}{" "}
            <a
              href="https://github.com/cheaper-inference/OmniRoute"
              className="text-primary underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("githubRepository")}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
