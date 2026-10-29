"use client";

import { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Card, Button, Input, Toggle, Modal, Badge } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";
import IPFilterSection from "./IPFilterSection";
import PiiMaskingCard from "./PiiMaskingCard";
import SessionInfoCard from "./SessionInfoCard";
import AuthzSection from "./AuthzSection";
import { useTranslations } from "next-intl";

export default function SecurityTab() {
  const [settings, setSettings] = useState<any>({ requireLogin: false, hasPassword: false });
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passStatus, setPassStatus] = useState({ type: "", message: "" });
  const [confirmError, setConfirmError] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  const [requireLoginModalOpen, setRequireLoginModalOpen] = useState(false);
  // Security-policy change waiting for the current password: `requireLogin`,
  // `bruteForceProtection` and `corsOrigins` all need `currentPassword` once a password is set.
  const [pendingSecurityUpdate, setPendingSecurityUpdate] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [savedCorsOrigins, setSavedCorsOrigins] = useState("");
  const [requireLoginPassword, setRequireLoginPassword] = useState("");
  const [requireLoginError, setRequireLoginError] = useState("");
  const [requireLoginLoading, setRequireLoginLoading] = useState(false);
  const [newBannedKeyword, setNewBannedKeyword] = useState("");

  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const getSettingsLabel = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setSavedCorsOrigins(typeof data?.corsOrigins === "string" ? data.corsOrigins : "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rememberSavedSecurityValues = (update: Record<string, unknown>) => {
    if (typeof update.corsOrigins === "string") setSavedCorsOrigins(update.corsOrigins);
  };

  const openSecurityUpdateModal = (update: Record<string, unknown>) => {
    setPendingSecurityUpdate(update);
    setRequireLoginPassword("");
    setRequireLoginError("");
    setRequireLoginModalOpen(true);
  };

  const updateRequireLogin = async (requireLogin: boolean) => {
    if (settings.hasPassword) {
      openSecurityUpdateModal({ requireLogin });
      return;
    }

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requireLogin }),
      });
      if (res.ok) {
        setSettings((prev: any) => ({ ...prev, requireLogin }));
      }
    } catch (err) {
      console.error("Failed to update require login:", err);
    }
  };

  const confirmSecurityUpdate = async () => {
    if (!pendingSecurityUpdate) return;
    setRequireLoginLoading(true);
    setRequireLoginError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pendingSecurityUpdate,
          currentPassword: requireLoginPassword,
        }),
      });

      if (res.ok) {
        setSettings((prev: any) => ({ ...prev, ...pendingSecurityUpdate }));
        rememberSavedSecurityValues(pendingSecurityUpdate);
        setRequireLoginModalOpen(false);
      } else {
        const data = await res.json();
        setRequireLoginError(data?.error?.message || t("errorOccurred"));
      }
    } catch (err) {
      console.error("Failed to update require login:", err);
      setRequireLoginError(t("errorOccurred"));
    } finally {
      setRequireLoginLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }));
        rememberSavedSecurityValues({ [key]: value });
      }
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
    }
  };

  // `bruteForceProtection` / `corsOrigins` are security-impacting: once a password exists the
  // server refuses them without `currentPassword`, so ask for it like the requireLogin toggle.
  const updateSecuritySetting = (key: string, value: unknown) => {
    if (settings.hasPassword) {
      openSecurityUpdateModal({ [key]: value });
      return;
    }
    void updateSetting(key, value);
  };

  const toggleBlockedProvider = (providerId: string) => {
    const current: string[] = settings.blockedProviders || [];
    const updated = current.includes(providerId)
      ? current.filter((p) => p !== providerId)
      : [...current, providerId];
    updateSetting("blockedProviders", updated);
  };

  const customBannedSignals: string[] = settings.customBannedSignals || [];

  const addBannedKeyword = () => {
    const keyword = newBannedKeyword.trim().toLowerCase();
    if (!keyword || customBannedSignals.includes(keyword)) return;
    updateSetting("customBannedSignals", [...customBannedSignals, keyword]);
    setNewBannedKeyword("");
  };

  const removeBannedKeyword = (index: number) => {
    const updated = customBannedSignals.filter((_, i) => i !== index);
    updateSetting("customBannedSignals", updated);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPassStatus({ type: "", message: "" });
      setConfirmError(t("passwordsNoMatch"));
      return;
    }

    setConfirmError("");
    setPassLoading(true);
    setPassStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassStatus({ type: "success", message: t("passwordUpdated") });
        setPasswords({ current: "", new: "", confirm: "" });
        setSettings((prev: any) => ({ ...prev, hasPassword: true }));
      } else {
        setPassStatus({ type: "error", message: data.error || t("failedUpdatePassword") });
      }
    } catch {
      setPassStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPassLoading(false);
    }
  };

  const blockedProviders: string[] = settings.blockedProviders || [];

  return (
    <div className="flex flex-col gap-6">
      <Card title={t("security")} icon="shield">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("requireLogin")}</p>
              <p className="text-sm text-text-muted">{t("requireLoginDesc")}</p>
            </div>
            <Toggle
              ariaLabel={t("requireLogin")}
              checked={settings.requireLogin === true}
              onChange={() => updateRequireLogin(!settings.requireLogin)}
              disabled={loading}
            />
          </div>

          <Modal
            isOpen={requireLoginModalOpen}
            onClose={() => !requireLoginLoading && setRequireLoginModalOpen(false)}
            title={t("currentPassword")}
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-text-muted">{t("enterCurrentPassword")}</p>
              <Input
                label={t("currentPassword")}
                type="password"
                placeholder={t("currentPassword")}
                value={requireLoginPassword}
                onChange={(e) => setRequireLoginPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && requireLoginPassword && confirmSecurityUpdate()
                }
                autoFocus
                disabled={requireLoginLoading}
                error={requireLoginError || undefined}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="ghost"
                  onClick={() => setRequireLoginModalOpen(false)}
                  disabled={requireLoginLoading}
                >
                  {tc("cancel")}
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmSecurityUpdate}
                  loading={requireLoginLoading}
                  disabled={!requireLoginPassword}
                >
                  {t("confirm")}
                </Button>
              </div>
            </div>
          </Modal>

          {settings.requireLogin === true && (
            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-4 pt-4 border-t border-border"
            >
              {settings.hasPassword && (
                <Input
                  label={t("currentPassword")}
                  type="password"
                  placeholder={t("enterCurrentPassword")}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  required
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("newPassword")}
                  type="password"
                  placeholder={t("enterNewPassword")}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  required
                />
                <Input
                  label={t("confirmPassword")}
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={passwords.confirm}
                  onChange={(e) => {
                    setPasswords({ ...passwords, confirm: e.target.value });
                    if (confirmError) setConfirmError("");
                  }}
                  error={confirmError || undefined}
                  required
                />
              </div>

              {passStatus.message && (
                <p
                  role={passStatus.type === "error" ? "alert" : "status"}
                  className={`text-sm ${passStatus.type === "error" ? "text-error" : "text-success"}`}
                >
                  {passStatus.message}
                </p>
              )}

              <div className="pt-2">
                <Button type="submit" variant="primary" loading={passLoading}>
                  {settings.hasPassword ? t("updatePassword") : t("setPassword")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>

      <IPFilterSection />

      <PiiMaskingCard />

      {/* API Endpoint Protection */}
      <Card title={t("apiEndpointProtection")} icon="api">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-bg-subtle p-3 text-sm text-text-muted">
            <p className="font-medium text-text-main">{t("authModelHeading")}</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>{t("authModelClient")}</li>
              <li>{t("authModelManagement")}</li>
              <li>{t("authModelPublic")}</li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("bruteForceProtection")}</p>
              <p className="text-sm text-text-muted">{t("bruteForceProtectionDesc")}</p>
            </div>
            <Toggle
              ariaLabel={t("bruteForceProtection")}
              checked={settings.bruteForceProtection !== false}
              onChange={() =>
                updateSecuritySetting(
                  "bruteForceProtection",
                  !(settings.bruteForceProtection !== false)
                )
              }
              disabled={loading}
            />
          </div>

          <div>
            <Input
              type="text"
              label={t("corsAllowedOrigins")}
              hint={t("corsAllowedOriginsDesc")}
              placeholder="https://app.example.com, https://admin.example.com"
              value={typeof settings.corsOrigins === "string" ? settings.corsOrigins : ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, corsOrigins: e.target.value }))}
              onBlur={(e) => {
                const next = e.target.value.trim();
                if (next !== savedCorsOrigins) updateSecuritySetting("corsOrigins", next);
              }}
            />
          </div>

          {/* Blocked Providers */}
          <div>
            <CheckboxGroup label={t("blockedProviders")} description={t("blockedProvidersDesc")}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Object.values(AI_PROVIDERS).map((provider: any) => {
                  const isBlocked = blockedProviders.includes(provider.id);
                  return (
                    <Checkbox
                      key={provider.id}
                      checked={isBlocked}
                      onChange={() => toggleBlockedProvider(provider.id)}
                      disabled={loading}
                      title={
                        isBlocked
                          ? t("unblockProviderTitle", { provider: provider.name })
                          : t("blockProviderTitle", { provider: provider.name })
                      }
                      label={
                        <span className="inline-flex min-w-0 items-center gap-1.5 text-xs">
                          {isBlocked ? (
                            <Icon name="block" size={14} className="text-error" />
                          ) : (
                            <ProviderIcon
                              providerId={provider.id}
                              size={14}
                              className="shrink-0"
                              style={{ color: provider.color }}
                            />
                          )}
                          <span className="truncate">{provider.name}</span>
                        </span>
                      }
                    />
                  );
                })}
              </div>
            </CheckboxGroup>
            {blockedProviders.length > 0 && (
              <p className="text-xs text-warning mt-2 flex items-center gap-1">
                <Icon name="warning" size={14} />
                {t("providersBlocked", { count: blockedProviders.length })}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Custom Banned Keywords */}
      <Card
        icon="report"
        title={getSettingsLabel("customBannedSignals", "Banned Keywords")}
        subtitle={getSettingsLabel(
          "customBannedSignalsDesc",
          "Additional keywords that trigger permanent account ban detection. Built-in keywords always apply."
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <Input
              className="flex-1"
              aria-label={getSettingsLabel("customBannedSignals", "Banned Keywords")}
              placeholder={getSettingsLabel(
                "customBannedSignalsPlaceholder",
                "e.g. api key revoked"
              )}
              value={newBannedKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBannedKeyword(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") addBannedKeyword();
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              icon="add"
              onClick={addBannedKeyword}
              disabled={!newBannedKeyword.trim()}
            >
              {getSettingsLabel("add", "Add")}
            </Button>
          </div>
          {customBannedSignals.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {customBannedSignals.map((keyword, index) => (
                <Badge key={index} variant="error" className="gap-1 pr-1">
                  {keyword}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-5"
                    onClick={() => removeBannedKeyword(index)}
                    aria-label={`${getSettingsLabel("remove", "Remove")} ${keyword}`}
                  >
                    <Icon name="close" size={12} />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted">
              {getSettingsLabel(
                "noCustomBannedSignals",
                "No custom keywords. Only built-in keywords are active."
              )}
            </p>
          )}
        </div>
      </Card>

      <Card
        icon="shield"
        title={getSettingsLabel("credentialRedaction", "Credential Redaction")}
        subtitle={getSettingsLabel(
          "credentialRedactionDesc",
          "Redact API keys, tokens, and secrets from context sent to providers and from responses."
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">
              {getSettingsLabel("enableCredentialRedaction", "Enable credential redaction")}
            </p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "enableCredentialRedactionDesc",
                "Scrubs API keys, tokens, private keys, and JWTs from messages, tool calls, and responses."
              )}
            </p>
          </div>
          <Toggle
            ariaLabel={getSettingsLabel("enableCredentialRedaction", "Enable credential redaction")}
            checked={settings.credentialRedactionEnabled === true}
            onChange={() =>
              updateSetting("credentialRedactionEnabled", !settings.credentialRedactionEnabled)
            }
            disabled={loading}
          />
        </div>
      </Card>

      <AuthzSection />
      <SessionInfoCard />
    </div>
  );
}
