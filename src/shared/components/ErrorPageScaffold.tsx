import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PageAction {
  href: string;
  label: string;
}

interface ErrorPageScaffoldProps {
  code: string;
  title: string;
  description: string;
  icon?: string;
  suggestions?: string[];
  primaryAction?: PageAction | null;
  secondaryAction?: PageAction | null;
}

export default function ErrorPageScaffold({
  code,
  title,
  description,
  icon = "error",
  suggestions = [],
  primaryAction,
  secondaryAction,
}: ErrorPageScaffoldProps) {
  const t = useTranslations("common");
  const resolvedPrimary = primaryAction ?? { href: "/dashboard", label: t("goToDashboard") };
  const resolvedSecondary = secondaryAction ?? { href: "/status", label: t("checkSystemStatus") };

  return (
    <main
      className="min-h-screen text-text-main flex items-center justify-center px-6 py-12"
      role="main"
      aria-labelledby="error-page-title"
    >
      <section className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-8 sm:p-10 shadow-soft">
        <header className="text-center">
          <div className="mb-4 flex justify-center">
            <OmniRouteLockup />
          </div>
          <Icon name={icon} size={40} className="mx-auto mb-3 text-text-muted" />
          <p className="ci-dashboard-display text-6xl sm:text-7xl" aria-hidden="true">
            {code}
          </p>
          <h1 id="error-page-title" className="ci-heading mt-4 text-2xl sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-text-muted leading-relaxed">{description}</p>
        </header>

        {suggestions.length > 0 && (
          <ul
            className="mt-8 rounded-xl border border-border bg-bg-alt p-5 space-y-2 text-sm text-text-muted"
            aria-label="Recommended actions"
          >
            {suggestions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon name="check_circle" size={16} className="text-text-muted mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={resolvedPrimary.href}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-primary text-accent-foreground hover:bg-primary-hover hover:shadow-elevated transition-all duration-200 motion-reduce:transition-none"
          >
            {resolvedPrimary.label}
          </Link>
          <Link
            href={resolvedSecondary.href}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-border hover:bg-bg-alt transition-colors duration-200 motion-reduce:transition-none"
          >
            {resolvedSecondary.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
