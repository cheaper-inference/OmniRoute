"use client";

import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card, NumberInput } from "@/shared/components";
import Notice from "@/shared/components/Notice";

export type BackupCleanupOptions = {
  keepLatest: number;
  retentionDays: number;
};

export type BackupRetentionStatus = {
  type: string;
  message: string;
};

export type StorageBackupHealth = {
  backupCount?: number;
  backupRetention: {
    maxFiles: number;
    days: number;
  };
};

type DatabaseBackupRetentionCardProps = {
  title: string;
  className?: string;
  storageHealth: StorageBackupHealth;
  backupCleanupOptions: BackupCleanupOptions;
  setBackupCleanupOptions: Dispatch<SetStateAction<BackupCleanupOptions>>;
  saveBackupRetentionLoading: boolean;
  backupRetentionStatus: BackupRetentionStatus;
  setBackupRetentionStatus: Dispatch<SetStateAction<BackupRetentionStatus>>;
  cleanupBackupsLoading: boolean;
  cleanupBackupsStatus: BackupRetentionStatus;
  onSaveRetention: () => void;
  onCleanupBackups: () => void;
};

function StatusAlert({ status }: { status: BackupRetentionStatus }) {
  if (!status.message) return null;

  const isSuccess = status.type === "success";
  return (
    <Notice
      variant={isSuccess ? "success" : "critical"}
      icon={isSuccess ? "check_circle" : "error"}
      className="mt-3"
    >
      {status.message}
    </Notice>
  );
}

export default function DatabaseBackupRetentionCard({
  title,
  className = "mb-4",
  storageHealth,
  backupCleanupOptions,
  setBackupCleanupOptions,
  saveBackupRetentionLoading,
  backupRetentionStatus,
  setBackupRetentionStatus,
  cleanupBackupsLoading,
  cleanupBackupsStatus,
  onSaveRetention,
  onCleanupBackups,
}: DatabaseBackupRetentionCardProps) {
  const t = useTranslations("settings");

  return (
    <Card.Section className={className}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <p className="text-sm font-medium text-text-main">{title}</p>
          <p className="text-xs text-text-muted">
            {t("storageBackupRetentionDescription")} <code>db_backups</code>.{" "}
            {t("storageBackupRetentionHelp")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" size="sm">
            {t("storageBackupCount", { count: storageHealth.backupCount || 0 })}
          </Badge>
          <Badge variant="default" size="sm">
            {t("storageBackupMaximum", { count: storageHealth.backupRetention.maxFiles })}
          </Badge>
          <Badge variant="default" size="sm">
            {storageHealth.backupRetention.days > 0
              ? t("storageBackupAgeRetention", { count: storageHealth.backupRetention.days })
              : t("storageBackupAgeRetentionOff")}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <NumberInput
          label={t("storageBackupKeepLatest")}
          min={1}
          max={200}
          value={backupCleanupOptions.keepLatest}
          onValueChange={(value) => {
            setBackupRetentionStatus({ type: "", message: "" });
            setBackupCleanupOptions((prev) => ({ ...prev, keepLatest: Math.max(1, value ?? 1) }));
          }}
          className="w-32 shrink-0"
        />
        <NumberInput
          label={t("storageBackupDeleteOlderThan")}
          min={0}
          max={3650}
          value={backupCleanupOptions.retentionDays}
          onValueChange={(value) => {
            setBackupRetentionStatus({ type: "", message: "" });
            setBackupCleanupOptions((prev) => ({
              ...prev,
              retentionDays: Math.max(0, value ?? 0),
            }));
          }}
          className="w-32 shrink-0"
        />
        <Button
          icon="save"
          variant="outline"
          size="sm"
          onClick={onSaveRetention}
          loading={saveBackupRetentionLoading}
        >
          {t("storageBackupSaveRetention")}
        </Button>
        <Button
          icon="auto_delete"
          variant="outline"
          size="sm"
          onClick={onCleanupBackups}
          loading={cleanupBackupsLoading}
        >
          {t("storageBackupCleanOld")}
        </Button>
      </div>
      <StatusAlert status={backupRetentionStatus} />
      <StatusAlert status={cleanupBackupsStatus} />
    </Card.Section>
  );
}
