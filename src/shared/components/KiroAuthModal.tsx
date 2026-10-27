"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

// Method choice rows: full-width outline buttons carrying an icon, a heading and a description
// (card radius, not the kit button pill: the rows wrap to 2-3 lines).
const METHOD_CARD_CLASS =
  "h-auto w-full justify-start whitespace-normal rounded-card p-4 text-left font-normal hover:bg-bg-subtle";

type KiroAuthModalProps = {
  isOpen: boolean;
  providerId?: string;
  providerLabel?: string;
  onMethodSelect: (method: string, config?: Record<string, unknown>) => void;
  onClose: () => void;
};

/**
 * Kiro Auth Method Selection Modal
 * Auto-detects token from AWS SSO cache or allows manual import
 */
export default function KiroAuthModal({
  isOpen,
  providerId = "kiro",
  providerLabel = "Kiro",
  onMethodSelect,
  onClose,
}: KiroAuthModalProps) {
  const t = useTranslations("kiroAuthModal");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [idcStartUrl, setIdcStartUrl] = useState("");
  const [idcRegion, setIdcRegion] = useState("us-east-1");
  const [refreshToken, setRefreshToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  // "auto" lets the import probe the Amazon Q regions and pin the key to the one that works.
  const [apiKeyRegion, setApiKeyRegion] = useState("auto");
  const [error, setError] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importingApiKey, setImportingApiKey] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);

  // Reset the form when the modal closes (render-time adjustment per react.dev
  // "You Might Not Need an Effect" — replaces the old reset effect).
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setSelectedMethod(null);
      setIdcStartUrl("");
      setIdcRegion("us-east-1");
      setRefreshToken("");
      setApiKey("");
      setApiKeyRegion("auto");
      setError(null);
    }
  }

  // Auto-detect token when import method is selected
  useEffect(() => {
    if (selectedMethod !== "import" || !isOpen) return;

    const autoDetect = async () => {
      setAutoDetecting(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/oauth/kiro/auto-import?targetProvider=${encodeURIComponent(providerId)}`
        );
        const data = await res.json();

        if (data.found) {
          onMethodSelect("import");
          onClose();
          return;
        } else {
          setError(data.error || t("errorAutoDetect"));
        }
      } catch (err) {
        setError(t("errorAutoDetectFailed"));
      } finally {
        setAutoDetecting(false);
      }
    };

    autoDetect();
  }, [providerId, selectedMethod, isOpen, onMethodSelect, onClose, t]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handleBack = () => {
    setSelectedMethod(null);
    setError(null);
  };

  const handleImportToken = async () => {
    if (!refreshToken.trim()) {
      setError(t("errorRefreshTokenRequired"));
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/oauth/kiro/import?targetProvider=${encodeURIComponent(providerId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: refreshToken.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("errorImportFailed"));
      }

      // Success - close modal
      onMethodSelect("import");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorImportFailed"));
    } finally {
      setImporting(false);
    }
  };

  const handleImportApiKey = async () => {
    if (!apiKey.trim()) {
      setError(t("errorApiKeyRequired"));
      return;
    }

    setImportingApiKey(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/oauth/kiro/api-key?targetProvider=${encodeURIComponent(providerId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: apiKey.trim(),
            region: apiKeyRegion || "auto",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || t("errorApiKeyImportFailed"));
      }

      onMethodSelect("api-key");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorApiKeyImportFailed"));
    } finally {
      setImportingApiKey(false);
    }
  };

  const handleIdcContinue = () => {
    if (!idcStartUrl.trim()) {
      setError(t("errorIdcStartUrlRequired"));
      return;
    }
    onMethodSelect("idc", { startUrl: idcStartUrl.trim(), region: idcRegion });
  };

  const handleSocialLogin = (provider) => {
    onMethodSelect("social", { provider });
  };

  return (
    <Modal isOpen={isOpen} title={t("title", { providerLabel })} onClose={onClose} size="lg">
      <div className="flex flex-col gap-4">
        {/* Method Selection */}
        {!selectedMethod && (
          <div className="space-y-3">
            <p className="text-sm text-text-muted mb-4">{t("chooseMethod")}</p>

            {/* AWS Builder ID */}
            <Button
              variant="outline"
              onClick={() => onMethodSelect("builder-id")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="shield" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("builderId")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("builderDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </Button>

            {/* AWS IAM Identity Center (IDC) */}
            <Button
              variant="outline"
              onClick={() => handleMethodSelect("idc")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="business" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("organization")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("organizationDescription", {
                      url: "https://your-org.awsapps.com/start",
                    })}
                  </p>
                </div>
              </div>
            </Button>

            {/* Google Social Login */}
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="account_circle" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("googleAccount")}</h3>
                  <p className="text-sm text-text-muted">{t("googleDescription")}</p>
                </div>
              </div>
            </Button>

            {/* GitHub Social Login */}
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="code" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("githubAccount")}</h3>
                  <p className="text-sm text-text-muted">{t("githubDescription")}</p>
                </div>
              </div>
            </Button>

            {/* Import Token */}
            <Button
              variant="outline"
              onClick={() => handleMethodSelect("import")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="file_upload" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("importToken")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("importDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </Button>

            {/* API Key */}
            <Button
              variant="outline"
              onClick={() => handleMethodSelect("api-key")}
              className={METHOD_CARD_CLASS}
            >
              <div className="flex items-start gap-3">
                <Icon name="key" className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("apiKey")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("apiKeyDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </Button>
          </div>
        )}

        {/* IDC Configuration */}
        {selectedMethod === "idc" && (
          <div className="space-y-4">
            <Input
              label={t("idcStartUrl")}
              required
              value={idcStartUrl}
              onChange={(e) => setIdcStartUrl(e.target.value)}
              placeholder={t("idcStartUrlPlaceholder")}
              inputClassName="font-mono text-sm"
              hint={t("idcStartUrlDescription")}
            />

            <Input
              label={t("awsRegion")}
              value={idcRegion}
              onChange={(e) => setIdcRegion(e.target.value)}
              placeholder={t("regionPlaceholder")}
              inputClassName="font-mono text-sm"
              hint={t("idcRegionDescription")}
            />

            {error && <p className="text-sm text-error">{error}</p>}

            <div className="flex gap-2">
              <Button onClick={handleIdcContinue} fullWidth>
                {t("continue")}
              </Button>
              <Button onClick={handleBack} variant="ghost" fullWidth>
                {t("back")}
              </Button>
            </div>
          </div>
        )}

        {/* Import Token */}
        {selectedMethod === "import" && (
          <div className="space-y-4">
            {/* Auto-detecting state */}
            {autoDetecting && (
              <div className="text-center py-6">
                <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="progress_activity" size={30} className="text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("autoDetecting")}</h3>
                <p className="text-sm text-text-muted">
                  {t("readingCredentials", { providerLabel })}
                </p>
              </div>
            )}

            {/* Form (shown after auto-detect completes) */}
            {!autoDetecting && (
              <>
                {/* Info message if not auto-detected */}
                {!error && (
                  <div className="bg-info/10 p-3 rounded-lg border border-info/30">
                    <div className="flex gap-2">
                      <Icon name="info" className="text-info" />
                      <p className="text-sm text-info">
                        {t("tokenNotDetected", { providerLabel })}
                      </p>
                    </div>
                  </div>
                )}

                <Input
                  label={t("refreshToken")}
                  required
                  type="password"
                  value={refreshToken}
                  onChange={(e) => setRefreshToken(e.target.value)}
                  placeholder={t("tokenPlaceholder")}
                  inputClassName="font-mono text-sm"
                />

                {error && (
                  <div className="bg-error/10 p-3 rounded-lg border border-error/30">
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleImportToken}
                    fullWidth
                    disabled={importing || !refreshToken.trim()}
                  >
                    {importing ? t("importing") : t("importToken")}
                  </Button>
                  <Button onClick={handleBack} variant="ghost" fullWidth>
                    {t("back")}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* API Key Import */}
        {selectedMethod === "api-key" && (
          <div className="space-y-4">
            <Input
              label={t("apiKey")}
              required
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={t("apiKeyPlaceholder", { providerLabel })}
              inputClassName="font-mono text-sm"
              hint={t("apiKeyStoredDescription")}
            />

            <Select
              label={t("awsRegion")}
              value={apiKeyRegion}
              onChange={(e) => setApiKeyRegion(e.target.value)}
              placeholder=""
              options={[
                { value: "auto", label: t("apiKeyRegionAuto") },
                { value: "us-east-1", label: t("apiKeyRegionUsEast1") },
                { value: "eu-central-1", label: t("apiKeyRegionEuCentral1") },
              ]}
              hint={t("apiKeyRegionAutoDescription")}
            />

            {error && (
              <div className="bg-error/10 p-3 rounded-lg border border-error/30">
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleImportApiKey}
                fullWidth
                disabled={importingApiKey || !apiKey.trim()}
              >
                {importingApiKey ? t("validating") : t("validateAndSaveApiKey")}
              </Button>
              <Button onClick={handleBack} variant="ghost" fullWidth>
                {t("back")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
