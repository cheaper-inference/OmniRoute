"use client";
import { useTranslations } from "next-intl";
import { ConfirmModal } from "@/shared/components/Modal";
import type { Confirmation } from "./useTeamMutations";

type Translate = ReturnType<typeof useTranslations>;

function titleKey(confirmation: Confirmation | null) {
  if (confirmation?.kind === "transfer") return "transferTitle";
  return confirmation?.kind === "remove" ? "removeTitle" : "archiveTitle";
}

function confirmationMessage(t: Translate, confirmation: Confirmation) {
  if (confirmation.kind === "transfer") {
    return t("transferMessage", {
      source: confirmation.key.teamName || t("unassigned"),
      destination: confirmation.team.name,
    });
  }
  return t(confirmation.kind === "remove" ? "removeMessage" : "archiveMessage", {
    team: confirmation.team.name,
  });
}

export default function TeamConfirmModal({
  confirmation,
  pending,
  mutationError,
  onClose,
  onConfirm,
}: {
  confirmation: Confirmation | null;
  pending: boolean;
  mutationError: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const t = useTranslations("teamCosts");
  return (
    <ConfirmModal
      isOpen={Boolean(confirmation)}
      loading={pending}
      title={t(titleKey(confirmation))}
      confirmText={t("confirm")}
      cancelText={t("cancel")}
      onClose={onClose}
      onConfirm={onConfirm}
      message={
        <>
          {confirmation && <span>{confirmationMessage(t, confirmation)}</span>}
          {mutationError && (
            <span role="alert" className="block mt-3 text-red-600 dark:text-red-400">
              {t(mutationError)}
            </span>
          )}
        </>
      }
    />
  );
}
