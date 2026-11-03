import Icon from "@/shared/components/Icon";
import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("termsMetadataTitle"),
    description: t("termsMetadataDescription"),
  };
}

export default function TermsPage() {
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

        <h1 className="ci-heading text-3xl mb-2">{t("termsOfService")}</h1>
        <p className="text-sm text-text-muted mb-10">
          {t("lastUpdated", { date: t("policyLastUpdatedDate") })}
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection1Title")}</h2>
            <p>{t("termsSection1Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection2Title")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsResponsibilityApiKeys")}</li>
              <li>{t("termsResponsibilityCompliance")}</li>
              <li>{t("termsResponsibilitySecurity")}</li>
            </ul>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection3Title")}</h2>
            <p>{t("termsSection3Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection4Title")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsDataStoredLocally")}</li>
              <li>{t("termsNoTransmission")}</li>
              <li>
                {t("termsDataLocationText")}{" "}
                <code className="font-mono text-sm text-text-main">~/.omniroute/</code>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection5Title")}</h2>
            <p>{t("termsSection5Text")}</p>
          </section>

          <section>
            <h2 className="ci-heading text-lg mb-3">{t("termsSection6Title")}</h2>
            <p>{t("termsSection6Text")}</p>
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
