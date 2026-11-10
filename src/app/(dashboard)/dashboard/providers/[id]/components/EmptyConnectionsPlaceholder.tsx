"use client";

import { EmptyState } from "@omniroute/ui-kit/empty-state";
import Icon from "@/shared/components/Icon";

// Phase 1t.6 extraction — Issue #3501
import { Button } from "@/shared/components";
import ChatGptSignInButton from "@/shared/components/ChatGptSignInButton";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface CommandCodeAuthState {
  phase: string;
  [key: string]: unknown;
}

interface EmptyConnectionsPlaceholderProps {
  isOAuth: boolean;
  isCompatible: boolean;
  isCommandCode: boolean;
  providerId: string;
  supportsDualAuth: boolean;
  providerSupportsPat: boolean;
  commandCodeAuthState: CommandCodeAuthState;
  gateConnectionFlow: (callback: () => void) => void;
  openApiKeyAddFlow: () => void;
  openPrimaryAddFlow: () => void;
  handleOpenCommandCodeConnect: () => void;
  onOpenOAuthModal: () => void;
  onOpenImportCodex: () => void;
  onOpenImportClaude: () => void;
  onOpenImportAgy?: () => void;
  onOpenImportGemini: () => void;
  onOpenImportGrokCli: () => void;
  t: ProviderMessageTranslator;
}

/** ChatGPT connects only through the official sign-in button; every other provider adds a row. */
function PrimaryAddButton({
  providerId,
  providerSupportsPat,
  onClick,
  t,
}: {
  providerId: string;
  providerSupportsPat: boolean;
  onClick: () => void;
  t: ProviderMessageTranslator;
}) {
  if (providerId === "chatgpt") return <ChatGptSignInButton opensDialog onClick={onClick} />;
  return (
    <Button icon="add" onClick={onClick}>
      {providerSupportsPat ? "Add PAT" : t("addConnection")}
    </Button>
  );
}

export default function EmptyConnectionsPlaceholder({
  isOAuth,
  isCompatible,
  t,
  ...actionProps
}: EmptyConnectionsPlaceholderProps) {
  // Kit EmptyState (#18070), compact because it sits inside the connections card: it owns
  // the icon well, heading, hint and the actions row.
  return (
    <EmptyState
      compact
      icon={<Icon name={isOAuth ? "lock" : "key"} size={32} />}
      title={t("noConnectionsYet")}
      description={t("addFirstConnectionHint")}
      actions={isCompatible ? undefined : <EmptyConnectionsActions t={t} {...actionProps} />}
    />
  );
}

type EmptyConnectionsActionsProps = Omit<
  EmptyConnectionsPlaceholderProps,
  "isOAuth" | "isCompatible"
>;

function EmptyConnectionsActions({
  isCommandCode,
  providerId,
  supportsDualAuth,
  providerSupportsPat,
  commandCodeAuthState,
  gateConnectionFlow,
  openApiKeyAddFlow,
  openPrimaryAddFlow,
  handleOpenCommandCodeConnect,
  onOpenOAuthModal,
  onOpenImportCodex,
  onOpenImportClaude,
  onOpenImportAgy,
  onOpenImportGrokCli,
  t,
}: EmptyConnectionsActionsProps) {
  return (
    <>
      {isCommandCode || supportsDualAuth ? (
        <>
          <Button
            icon="open_in_new"
            loading={
              isCommandCode &&
              (commandCodeAuthState.phase === "starting" ||
                commandCodeAuthState.phase === "polling" ||
                commandCodeAuthState.phase === "applying")
            }
            onClick={() =>
              gateConnectionFlow(isCommandCode ? handleOpenCommandCodeConnect : openPrimaryAddFlow)
            }
          >
            Connect
          </Button>
          <Button
            variant="secondary"
            icon="add"
            onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
          >
            Manual API key
          </Button>
        </>
      ) : (
        <>
          <PrimaryAddButton
            providerId={providerId}
            providerSupportsPat={providerSupportsPat}
            onClick={() => gateConnectionFlow(openPrimaryAddFlow)}
            t={t}
          />
          {providerId === "qoder" && (
            <Button variant="secondary" onClick={() => gateConnectionFlow(onOpenOAuthModal)}>
              Experimental OAuth
            </Button>
          )}
          {providerId === "codex" && (
            <Button
              variant="secondary"
              icon="upload_file"
              onClick={() => gateConnectionFlow(onOpenImportCodex)}
            >
              {typeof t.has === "function" && t.has("importCodexAuth")
                ? t("importCodexAuth")
                : "Import auth"}
            </Button>
          )}
          {providerId === "claude" && (
            <Button
              variant="secondary"
              icon="upload_file"
              onClick={() => gateConnectionFlow(onOpenImportClaude)}
            >
              {typeof t.has === "function" && t.has("importClaudeAuth")
                ? t("importClaudeAuth")
                : "Import auth"}
            </Button>
          )}
          {providerId === "grok-cli" && (
            <Button
              variant="secondary"
              icon="upload_file"
              onClick={() => gateConnectionFlow(onOpenImportGrokCli)}
            >
              Import auth
            </Button>
          )}
          {providerId === "agy" && onOpenImportAgy && (
            <Button
              variant="secondary"
              icon="upload_file"
              onClick={() => gateConnectionFlow(onOpenImportAgy)}
            >
              {typeof t.has === "function" && t.has("importAgyAuth")
                ? t("importAgyAuth")
                : "Import auth"}
            </Button>
          )}
        </>
      )}
    </>
  );
}
