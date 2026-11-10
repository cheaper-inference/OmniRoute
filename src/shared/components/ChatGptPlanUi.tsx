"use client";

import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { CHATGPT_USAGE_URL, hasChatGptPlanScope } from "@omniroute/open-sse/config/chatgpt";
import type { ConnectionLocalUsage } from "@/shared/types/connectionLocalUsage";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import ChatGptLogo from "./ChatGptLogo";
import Icon from "./Icon";

export function ChatGptPlanBadge({ scopes }: { scopes: unknown }) {
  const t = useTranslations("providers");
  const permitted = hasChatGptPlanScope(scopes);
  return (
    <Badge size="sm" variant={permitted ? "success" : "default"} title={t("chatgptPlanBadgeHint")}>
      {t(permitted ? "chatgptPlanLinked" : "chatgptPlanNotAuthorized")}
    </Badge>
  );
}

// Content and hierarchy follow the official SIWC UI examples
// (https://developers.openai.com/siwc/ui-ux-guidelines), drawn with the kit (KEA-7886): the
// compact usage action is the kit outline button, the confirmed-limit action the primary one.
export function ChatGptManageUsageButton({ primary = false }: { primary?: boolean }) {
  const t = useTranslations("providers");
  return (
    <a
      href={CHATGPT_USAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t("chatgptManageUsageTitle")}
      className={
        primary
          ? buttonVariants({ size: "lg", className: "w-full max-w-full" })
          : buttonVariants({ variant: "outline", size: "sm", className: "max-w-full shrink-0" })
      }
    >
      {t("chatgptManageUsage")}
      {!primary && <Icon name="open_in_new" size={14} />}
    </a>
  );
}

export function ChatGptMark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 text-text-main ${large ? "size-12" : "size-6"}`}
      aria-hidden="true"
    >
      <ChatGptLogo size={large ? 48 : 24} className="size-full" />
    </span>
  );
}

export function ChatGptPlanNotice({ connected = false }: { connected?: boolean }) {
  const t = useTranslations("providers");
  return (
    <Card padding="md" className="mb-5 flex min-w-0 flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <ChatGptMark />
        <div className="min-w-0 space-y-1">
          <h3 className="font-medium text-text-main">
            {t(connected ? "chatgptUsingPlan" : "chatgptUsePlan")}
          </h3>
          <p className="text-sm text-text-muted">{t("chatgptPlanDescription")}</p>
        </div>
      </div>
      {connected && <ChatGptManageUsageButton />}
    </Card>
  );
}

export function ChatGptUsageLimitNotice() {
  const t = useTranslations("providers");
  return (
    <Alert
      variant="warning"
      dismissible={false}
      className="min-w-0"
      icon={<ChatGptMark />}
      title={t("chatgptUsageLimitReached")}
      description={t("chatgptUsageLimitHint")}
      actions={<ChatGptManageUsageButton primary />}
    />
  );
}

export function ChatGptUsageSummary({
  limitReached = false,
  usage,
  loading = false,
  error = false,
  onRefresh,
}: {
  limitReached?: boolean;
  usage?: ConnectionLocalUsage;
  loading?: boolean;
  error?: boolean;
  onRefresh?: () => void;
}) {
  const t = useTranslations("providers");
  return (
    <div className="min-w-0 space-y-3 p-3">
      {limitReached && <ChatGptUsageLimitNotice />}
      <Card padding="sm" className="min-w-0">
        <h3 className="font-medium text-text-main">{t("chatgptLocalUsage")}</h3>
        <p className="mt-2 text-xs text-text-muted">{t("chatgptLocalUsageDescription")}</p>
        <dl className="my-4 grid grid-cols-3 gap-2 border-y border-border py-4">
          {(
            [
              ["chatgptUsageRequests", usage?.requests],
              ["chatgptUsageTokens", usage?.tokens],
              ["chatgptUsageDays", usage?.activeDays],
            ] as const
          ).map(([key, value]) => (
            <div key={key} className="min-w-0">
              <dt className="text-xs text-text-muted">{t(key)}</dt>
              <dd
                className="mt-2 break-words text-lg text-text-main"
                aria-label={value === undefined ? t("chatgptUsageNotAvailable") : undefined}
              >
                {value === undefined ? "—" : value.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mb-3 text-xs text-text-muted">{t("chatgptLocalUsageCaveat")}</p>
        {loading && (
          <p role="status" className="mb-2 text-xs text-text-muted">
            {t("chatgptLocalUsageLoading")}
          </p>
        )}
        {error && (
          <Alert
            variant="critical"
            layout="inline"
            dismissible={false}
            className="mb-2"
            description={t("chatgptLocalUsageError")}
          />
        )}
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            icon="refresh"
            disabled={loading}
            onClick={onRefresh}
            className="mb-3"
          >
            {t("chatgptLocalUsageRefresh")}
          </Button>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-bg-subtle p-3">
          <span className="text-xs text-text-main">{t("chatgptViewUsage")}</span>
          <ChatGptManageUsageButton />
        </div>
      </Card>
    </div>
  );
}

export function ChatGptPlanWelcome({ onDismiss }: { onDismiss: () => void }) {
  const t = useTranslations("providers");
  return (
    <Card padding="lg" className="mx-auto max-w-md space-y-5 text-center">
      <ChatGptMark large />
      <h3 className="text-xl font-medium text-text-main">{t("chatgptWelcomeTitle")}</h3>
      <p className="text-sm leading-relaxed text-text-muted">{t("chatgptWelcomeDescription")}</p>
      <Button size="lg" fullWidth onClick={onDismiss}>
        {t("chatgptGotIt")}
      </Button>
    </Card>
  );
}
