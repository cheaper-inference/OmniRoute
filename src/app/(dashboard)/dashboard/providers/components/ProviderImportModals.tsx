"use client";

import { ImportProvidersFromFileModal } from "./ImportProvidersFromFileModal";
import { OAuthExportImportModal } from "./OAuthExportImportModal";

interface ProviderImportModalsProps {
  openModal: "file" | "oauth-export" | null;
  onClose: () => void;
  onImported: () => Promise<void>;
}

/** The providers page's two import wizards, loaded together as one lazy chunk. */
export function ProviderImportModals({
  openModal,
  onClose,
  onImported,
}: ProviderImportModalsProps) {
  return (
    <>
      <ImportProvidersFromFileModal
        isOpen={openModal === "file"}
        onClose={onClose}
        onImported={onImported}
      />
      <OAuthExportImportModal
        isOpen={openModal === "oauth-export"}
        onClose={onClose}
        onImported={onImported}
      />
    </>
  );
}
