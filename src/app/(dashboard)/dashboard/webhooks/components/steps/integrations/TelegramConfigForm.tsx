"use client";

import Input from "@/shared/components/Input";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface TelegramConfigFormProps {
  value: TelegramConfig;
  onChange: (v: TelegramConfig) => void;
  t: (key: string) => string;
  isEditing?: boolean;
}

export function TelegramConfigForm({ value, onChange, t, isEditing }: TelegramConfigFormProps) {
  return (
    <div className="space-y-4">
      <Input
        label={t("telegram.botToken")}
        type="password"
        value={value.botToken}
        onChange={(e) => onChange({ ...value, botToken: e.target.value })}
        placeholder={isEditing ? t("secretEditPlaceholder") : t("telegram.botTokenPlaceholder")}
        autoComplete="new-password"
        hint={t("telegram.botTokenHint")}
      />
      <Input
        label={t("telegram.chatId")}
        value={value.chatId}
        onChange={(e) => onChange({ ...value, chatId: e.target.value })}
        placeholder={t("telegram.chatIdPlaceholder")}
        hint={t("telegram.chatIdHint")}
      />
      <details className="rounded-lg border border-border bg-bg-subtle p-3">
        <summary className="cursor-pointer text-xs font-medium text-text-muted hover:text-text-main">
          {t("telegram.tutorial")}
        </summary>
        <ol className="mt-3 space-y-1.5 text-xs text-text-muted">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-2">
              <span className="font-bold text-primary">{n}.</span>
              {t(`telegram.tutorialStep${n}`)}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
