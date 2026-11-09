"use client";

import Icon from "@/shared/components/Icon";

// Phase 1d extraction — Issue #3501
// SiliconFlowEndpointModal moved out of ProviderDetailPageClient.tsx.

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";
import { providerText, SILICONFLOW_ENDPOINTS } from "../providerPageHelpers";

interface SiliconFlowEndpointModalProps {
  isOpen: boolean;
  onSelect: (baseUrl: string) => void;
  onClose: () => void;
}

export default function SiliconFlowEndpointModal({
  isOpen,
  onSelect,
  onClose,
}: SiliconFlowEndpointModalProps) {
  const t = useTranslations("providers");

  return (
    <Modal
      isOpen={isOpen}
      title={providerText(t, "connectSiliconFlow", "Connect SiliconFlow")}
      onClose={onClose}
      size="lg"
    >
      <div className="space-y-3">
        <p className="text-sm text-text-muted mb-4">
          {providerText(t, "chooseSiliconFlowEndpoint", "Choose your SiliconFlow endpoint:")}
        </p>
        {SILICONFLOW_ENDPOINTS.map((endpoint) => (
          <Button
            key={endpoint.id}
            variant="outline"
            onClick={() => onSelect(endpoint.baseUrl)}
            className="h-auto w-full justify-start whitespace-normal p-4 text-left font-normal"
          >
            <div className="flex items-start gap-3">
              <Icon name="public" className="text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  {providerText(
                    t,
                    endpoint.id === "siliconflow" ? "endpointGlobal" : "endpointChina",
                    endpoint.label
                  )}
                </h3>
                <p className="text-sm text-text-muted font-mono">{endpoint.baseUrl}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Modal>
  );
}
