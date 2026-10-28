"use client";

import Icon from "@/shared/components/Icon";

import { Button, Modal } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

type KimiCodeAuthMethodModalProps = {
  isOpen: boolean;
  onSelectOAuth: () => void;
  onSelectApiKey: () => void;
  onClose: () => void;
  t: ProviderMessageTranslator;
};

export default function KimiCodeAuthMethodModal({
  isOpen,
  onSelectOAuth,
  onSelectApiKey,
  onClose,
  t,
}: KimiCodeAuthMethodModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={`${t("addConnection")} · Kimi Code CLI`}
      onClose={onClose}
      size="md"
    >
      <div className="space-y-3">
        <p className="mb-4 text-sm text-text-muted">{t("authMethod")}</p>

        <Button
          variant="outline"
          onClick={onSelectOAuth}
          className="h-auto w-full justify-start whitespace-normal p-4 text-left font-normal"
        >
          <div className="flex items-start gap-3">
            <Icon name="passkey" className="mt-0.5 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-semibold">{t("oauthLabel")}</h3>
              <p className="text-sm text-text-muted">{t("oauth2Desc")}</p>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onSelectApiKey}
          className="h-auto w-full justify-start whitespace-normal p-4 text-left font-normal"
        >
          <div className="flex items-start gap-3">
            <Icon name="key" className="mt-0.5 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-semibold">
                {providerText(t, "kimiCodeApiKeyLabel", "Kimi Code API Key")}
              </h3>
              <p className="text-sm text-text-muted">{t("apiKeySecure")}</p>
            </div>
          </div>
        </Button>
      </div>
    </Modal>
  );
}
