"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, Button, Badge, Checkbox, ConfirmModal, Input, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import DatabaseBackupRetentionCard from "./DatabaseBackupRetentionCard";
import ProviderTransferPanel from "./ProviderTransferPanel";
import {
  fetchDatabaseSettingsData,
  isAuthRequiredResponse,
  AuthRequiredBanner,
} from "./systemStorageAuth";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";

// Whitelist mirrored from src/lib/db/cleanup.ts::RESET_USAGE_HISTORY_PERIODS.
const RESET_USAGE_PERIOD_VALUES = [
  "5m",
  "1h",
  "3h",
  "6h",
  "12h",
  "1d",
  "7d",
  "30d",
  "all",
] as const;

async function fetchStorageHealthData() {
  try {
    const res = await fetch("/api/storage/health");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch storage health:", err);
    return null;
  }
}

export default function SystemStorageTab() {
  const [backups, setBackups] = useState([]);
  const [backupsLoading, setBackupsLoading] = useState(false);
  const [backupsExpanded, setBackupsExpanded] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState({ type: "", message: "" });
  const [restoringId, setRestoringId] = useState(null);
  const [confirmRestoreId, setConfirmRestoreId] = useState(null);
  const [manualBackupLoading, setManualBackupLoading] = useState(false);
  const [manualBackupStatus, setManualBackupStatus] = useState({ type: "", message: "" });
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importStatus, setImportStatus] = useState({ type: "", message: "" });
  const [confirmImport, setConfirmImport] = useState(false);
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);
  const [clearCacheLoading, setClearCacheLoading] = useState(false);
  const [clearCacheStatus, setClearCacheStatus] = useState({ type: "", message: "" });
  const [purgeLogsLoading, setPurgeLogsLoading] = useState(false);
  const [purgeLogsStatus, setPurgeLogsStatus] = useState({ type: "", message: "" });
  const [manualVacuumLoading, setManualVacuumLoading] = useState(false);
  const [manualVacuumStatus, setManualVacuumStatus] = useState({ type: "", message: "" });
  const [cleanupBackupsLoading, setCleanupBackupsLoading] = useState(false);
  const [cleanupBackupsStatus, setCleanupBackupsStatus] = useState({ type: "", message: "" });
  const [saveBackupRetentionLoading, setSaveBackupRetentionLoading] = useState(false);
  const [backupRetentionStatus, setBackupRetentionStatus] = useState({ type: "", message: "" });
  const [purgeQuotaSnapshotsLoading, setPurgeQuotaSnapshotsLoading] = useState(false);
  const [purgeQuotaSnapshotsStatus, setPurgeQuotaSnapshotsStatus] = useState({
    type: "",
    message: "",
  });
  const [purgeCallLogsLoading, setPurgeCallLogsLoading] = useState(false);
  const [purgeCallLogsStatus, setPurgeCallLogsStatus] = useState({ type: "", message: "" });
  const [purgeDetailedLogsLoading, setPurgeDetailedLogsLoading] = useState(false);
  const [purgeDetailedLogsStatus, setPurgeDetailedLogsStatus] = useState({ type: "", message: "" });
  const [resetUsageModalOpen, setResetUsageModalOpen] = useState(false);
  const [resetUsagePeriod, setResetUsagePeriod] = useState("all");
  const [resetUsageLoading, setResetUsageLoading] = useState(false);
  const [resetUsageStatus, setResetUsageStatus] = useState({ type: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [storageHealth, setStorageHealth] = useState({
    driver: "sqlite",
    dbPath: "~/.omniroute/storage.sqlite",
    sizeBytes: 0,
    retentionDays: {
      app: 7,
      call: 7,
    },
    tableMaxRows: {
      callLogs: 100000,
      proxyLogs: 100000,
    },
    backupCount: 0,
    backupRetention: {
      maxFiles: 20,
      days: 0,
    },
    lastBackupAt: null,
  });
  const [backupCleanupOptions, setBackupCleanupOptions] = useState({
    keepLatest: 20,
    retentionDays: 0,
  });

  // Database settings state (tasks 23-26)
  const [dbSettings, setDbSettings] = useState<any>(null);
  const [dbSettingsLoading, setDbSettingsLoading] = useState(true);
  const [dbSettingsAuthRequired, setDbSettingsAuthRequired] = useState(false);
  const [dbSettingsSaving, setDbSettingsSaving] = useState(false);
  const [dbStatsRefreshing, setDbStatsRefreshing] = useState(false);

  const loadBackups = async () => {
    setBackupsLoading(true);
    try {
      const res = await fetch("/api/db-backups");
      const data = await res.json();
      setBackups(data.backups || []);
    } catch (err) {
      console.error("Failed to fetch backups:", err);
    } finally {
      setBackupsLoading(false);
    }
  };

  const applyStorageHealth = useCallback((data) => {
    if (!data) return;
    setStorageHealth((prev) => ({ ...prev, ...data }));
    setBackupCleanupOptions({
      keepLatest: data.backupRetention?.maxFiles || 20,
      retentionDays: data.backupRetention?.days || 0,
    });
  }, []);

  const loadStorageHealth = async () => {
    applyStorageHealth(await fetchStorageHealthData());
  };

  const applyDatabaseSettings = useCallback((result: { data: any; authRequired: boolean }) => {
    if (result.data) setDbSettings(result.data);
    setDbSettingsAuthRequired(result.authRequired);
    setDbSettingsLoading(false);
  }, []);

  const loadDatabaseSettings = async () => {
    setDbSettingsLoading(true);
    applyDatabaseSettings(await fetchDatabaseSettingsData());
  };

  const saveDatabaseSettings = async () => {
    if (!dbSettings) return;
    setDbSettingsSaving(true);
    try {
      const { logs, backup, cache, retention, aggregation, optimization } = dbSettings;
      const res = await fetch("/api/settings/database", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs, backup, cache, retention, aggregation, optimization }),
      });
      if (res.ok) {
        await loadDatabaseSettings();
      }
    } catch (err) {
      console.error("Failed to save database settings:", err);
    } finally {
      setDbSettingsSaving(false);
    }
  };

  const refreshDatabaseStats = async () => {
    setDbStatsRefreshing(true);
    try {
      await fetch("/api/settings/database/refresh-stats", { method: "POST" });
      await loadDatabaseSettings();
    } catch (err) {
      console.error("Failed to refresh database stats:", err);
    } finally {
      setDbStatsRefreshing(false);
    }
  };

  const handleSaveBackupRetention = async () => {
    setSaveBackupRetentionLoading(true);
    setBackupRetentionStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backupCleanupOptions),
      });
      const data = await res.json();
      if (res.ok) {
        setBackupRetentionStatus({
          type: "success",
          message: t("backupRetentionSaved"),
        });
        await loadStorageHealth();
      } else {
        setBackupRetentionStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("backupRetentionSaveFailed")),
        });
      }
    } catch {
      setBackupRetentionStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setSaveBackupRetentionLoading(false);
    }
  };

  const handleCleanupBackups = async () => {
    setCleanupBackupsLoading(true);
    setCleanupBackupsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backupCleanupOptions),
      });
      const data = await res.json();
      if (res.ok) {
        setCleanupBackupsStatus({
          type: "success",
          message: t("backupCleanupSuccess", {
            backups: data.deletedBackupFamilies,
            files: data.deletedFiles,
          }),
        });
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setCleanupBackupsStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("backupCleanupFailed")),
        });
      }
    } catch {
      setCleanupBackupsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setCleanupBackupsLoading(false);
    }
  };

  const handleClearCache = async () => {
    setClearCacheLoading(true);
    setClearCacheStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setClearCacheStatus({
          type: "success",
          message: t("cacheCleared"),
        });
      } else {
        setClearCacheStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("clearCacheFailed")),
        });
      }
    } catch {
      setClearCacheStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setClearCacheLoading(false);
    }
  };

  const handlePurgeExpiredLogs = async () => {
    setPurgeLogsLoading(true);
    setPurgeLogsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/purge-logs", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        const deleted = data?.deleted ?? 0;
        setPurgeLogsStatus({
          type: "success",
          message: t("logsDeleted", { count: deleted }),
        });
      } else {
        setPurgeLogsStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("purgeLogsFailed")),
        });
      }
    } catch {
      setPurgeLogsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPurgeLogsLoading(false);
    }
  };

  const handlePurgeQuotaSnapshots = async () => {
    setPurgeQuotaSnapshotsLoading(true);
    setPurgeQuotaSnapshotsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/purge-quota-snapshots", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPurgeQuotaSnapshotsStatus({
          type: "success",
          message: t("purgeQuotaSnapshotsSuccess", { count: data.deleted }),
        });
      } else {
        setPurgeQuotaSnapshotsStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("purgeQuotaSnapshotsFailed")),
        });
      }
    } catch {
      setPurgeQuotaSnapshotsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPurgeQuotaSnapshotsLoading(false);
    }
  };

  const handlePurgeCallLogs = async () => {
    setPurgeCallLogsLoading(true);
    setPurgeCallLogsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/purge-call-logs", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPurgeCallLogsStatus({
          type: "success",
          message: t("purgeCallLogsSuccess", { count: data.deleted }),
        });
      } else {
        setPurgeCallLogsStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("purgeCallLogsFailed")),
        });
      }
    } catch {
      setPurgeCallLogsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPurgeCallLogsLoading(false);
    }
  };

  const handlePurgeDetailedLogs = async () => {
    setPurgeDetailedLogsLoading(true);
    setPurgeDetailedLogsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/purge-detailed-logs", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPurgeDetailedLogsStatus({
          type: "success",
          message: t("purgeDetailedLogsSuccess", { count: data.deleted }),
        });
      } else {
        setPurgeDetailedLogsStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("purgeDetailedLogsFailed")),
        });
      }
    } catch {
      setPurgeDetailedLogsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPurgeDetailedLogsLoading(false);
    }
  };

  const handleResetUsageHistory = async () => {
    setResetUsageLoading(true);
    setResetUsageStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/purge-usage-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period: resetUsagePeriod }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        const deleted = data?.deleted ?? 0;
        setResetUsageStatus({
          type: "success",
          message:
            t("resetUsageSuccess", { count: deleted }) ||
            `Usage data reset (${deleted} row(s) deleted).`,
        });
        setResetUsageModalOpen(false);
      } else {
        setResetUsageStatus({
          type: "error",
          message:
            data?.error?.message ||
            (typeof data?.error === "string" ? data.error : null) ||
            t("resetUsageFailed") ||
            "Failed to reset usage data",
        });
      }
    } catch {
      setResetUsageStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setResetUsageLoading(false);
    }
  };

  const openResetUsageModal = () => {
    setResetUsagePeriod("all");
    setResetUsageStatus({ type: "", message: "" });
    setResetUsageModalOpen(true);
  };

  const handleManualVacuum = async () => {
    setManualVacuumLoading(true);
    setManualVacuumStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/database/vacuum", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success !== false) {
        setManualVacuumStatus({
          type: "success",
          message: data?.message || t("vacuumCompleted"),
        });
        await loadDatabaseSettings();
        await loadStorageHealth();
      } else {
        setManualVacuumStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("vacuumFailed")),
        });
      }
    } catch {
      setManualVacuumStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setManualVacuumLoading(false);
    }
  };

  const handleManualBackup = async () => {
    setManualBackupLoading(true);
    setManualBackupStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", { method: "PUT" });
      const data = await res.json();
      if (res.ok) {
        if (data.filename) {
          setManualBackupStatus({
            type: "success",
            message: t("backupCreated", { file: data.filename }),
          });
        } else {
          setManualBackupStatus({
            type: "info",
            message: data.message || t("noChangesSinceBackup"),
          });
        }
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setManualBackupStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("backupFailed")),
        });
      }
    } catch {
      setManualBackupStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setManualBackupLoading(false);
    }
  };

  const handleRestore = async (backupId) => {
    setRestoringId(backupId);
    setRestoreStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setRestoreStatus({
          type: "success",
          message: t("restoreSuccess", {
            connections: data.connectionCount,
            nodes: data.nodeCount,
            combos: data.comboCount,
            apiKeys: data.apiKeyCount,
          }),
        });
        await loadBackups();
        await loadStorageHealth();
      } else {
        setRestoreStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("restoreFailed")),
        });
      }
    } catch {
      setRestoreStatus({ type: "error", message: t("errorDuringRestore") });
    } finally {
      setRestoringId(null);
      setConfirmRestoreId(null);
    }
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const data = await fetchStorageHealthData();
      if (!cancelled) applyStorageHealth(data);
    })();
    void (async () => {
      const data = await fetchDatabaseSettingsData();
      if (!cancelled) applyDatabaseSettings(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [applyStorageHealth, applyDatabaseSettings]);

  /** Triggers a browser file download from an existing Blob. */
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /** Fetches a URL, reads the response as a Blob and triggers a download. */
  const fetchAndDownload = async (
    apiUrl: string,
    fallbackFilename: string,
    errorMessage: string
  ) => {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(extractApiErrorMessage(data, errorMessage));
    }
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition") || "";
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
    triggerDownload(blob, filenameMatch?.[1] || fallbackFilename);
  };

  const handleExportJson = async () => {
    setExportLoading(true);
    try {
      await fetchAndDownload(
        "/api/settings/export-json",
        `omniroute-legacy-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
        t("jsonExportFailed")
      );
    } catch (err) {
      console.error("Export JSON failed:", err);
      setImportStatus({
        type: "error",
        message: t("exportFailedWithError", { error: (err as Error).message }),
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportJsonClick = () => {
    jsonInputRef.current?.click();
  };

  const handleJsonSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      setImportStatus({
        type: "error",
        message: t("invalidJsonFileType"),
      });
      return;
    }

    // Auto import JSON
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setImportLoading(true);
        const res = await fetch("/api/settings/import-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: e.target?.result as string,
        });
        const data = await res.json();
        if (res.ok) {
          setImportStatus({
            type: "success",
            message: data.message || t("legacyJsonImportSuccess"),
          });
          await loadStorageHealth();
          if (backupsExpanded) await loadBackups();
        } else if (isAuthRequiredResponse(res.status, data)) {
          setImportStatus({ type: "error", message: t("jsonImportAuthRequired") });
        } else {
          setImportStatus({
            type: "error",
            message: extractApiErrorMessage(data, t("jsonImportFailed")),
          });
        }
      } catch {
        setImportStatus({ type: "error", message: t("jsonImportError") });
      } finally {
        setImportLoading(false);
        if (jsonInputRef.current) jsonInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      await fetchAndDownload(
        "/api/db-backups/export",
        `omniroute-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.sqlite`,
        t("exportFailed")
      );
    } catch (err) {
      console.error("Export failed:", err);
      setImportStatus({
        type: "error",
        message: t("exportFailedWithError", { error: (err as Error).message }),
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".sqlite")) {
      setImportStatus({
        type: "error",
        message: t("invalidFileType"),
      });
      return;
    }
    setPendingImportFile(file);
    setConfirmImport(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImportConfirm = async () => {
    if (!pendingImportFile) return;
    setImportLoading(true);
    setImportStatus({ type: "", message: "" });
    setConfirmImport(false);
    try {
      const arrayBuffer = await pendingImportFile.arrayBuffer();
      const res = await fetch(
        `/api/db-backups/import?filename=${encodeURIComponent(pendingImportFile.name)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream" },
          body: arrayBuffer,
        }
      );
      const data = await res.json();
      if (res.ok) {
        setImportStatus({
          type: "success",
          message: t("importSuccess", {
            connections: data.connectionCount,
            nodes: data.nodeCount,
            combos: data.comboCount,
            apiKeys: data.apiKeyCount,
          }),
        });
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setImportStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("importFailed")),
        });
      }
    } catch {
      setImportStatus({ type: "error", message: t("errorDuringImport") });
    } finally {
      setImportLoading(false);
      setPendingImportFile(null);
    }
  };

  const handleImportCancel = () => {
    setConfirmImport(false);
    setPendingImportFile(null);
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return null;
    const now = new Date();
    const then = new Date(isoString);
    const diffMs = (now as any) - (then as any);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return t("justNow");
    if (diffMin < 60) return t("minutesAgo", { count: diffMin });
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return t("hoursAgo", { count: diffHr });
    const diffDays = Math.floor(diffHr / 24);
    return t("daysAgo", { count: diffDays });
  };

  const formatBackupReason = (reason) => {
    if (reason === "manual") return t("backupReasonManual");
    if (reason === "pre-restore") return t("backupReasonPreRestore");
    return reason;
  };

  const renderStatusAlert = (status, index) => {
    if (!status.message) return null;
    const isInfo = status.type === "info";
    const isSuccess = status.type === "success";
    const className =
      "p-3 rounded-lg text-sm " +
      (isSuccess
        ? "bg-success/10 text-success border border-success/20"
        : isInfo
          ? "bg-info/10 text-info border border-info/20"
          : "bg-error/10 text-error border border-error/20");

    return (
      <div key={index} className={className} role="alert">
        <div className="flex items-center gap-2">
          <Icon name={isSuccess ? "check_circle" : isInfo ? "info" : "error"} size={16} />
          {status.message}
        </div>
      </div>
    );
  };

  const renderDatabaseStatistics = () => {
    if (dbSettingsLoading || !dbSettings?.stats) return null;

    return (
      <div className="mb-4 p-4 rounded-lg border border-border bg-bg">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Icon name="analytics" size={18} />
            {t("storageDatabaseStatistics")}
          </h4>
          <Button
            icon="refresh"
            variant="outline"
            size="sm"
            onClick={refreshDatabaseStats}
            loading={dbStatsRefreshing}
          >
            {t("refresh")}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storageDatabaseSize")}</p>
            <p className="text-sm font-semibold">
              {formatBytes(dbSettings.stats.databaseSizeBytes)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storagePageCount")}</p>
            <p className="text-sm font-semibold">{dbSettings.stats.pageCount.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storageFreelistCount")}</p>
            <p className="text-sm font-semibold">
              {dbSettings.stats.freelistCount.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storageLastVacuum")}</p>
            <p className="text-sm font-semibold">
              {dbSettings.stats.lastVacuumAt
                ? new Date(dbSettings.stats.lastVacuumAt).toLocaleString(locale)
                : t("never")}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storageLastOptimization")}</p>
            <p className="text-sm font-semibold">
              {dbSettings.stats.lastOptimizationAt
                ? new Date(dbSettings.stats.lastOptimizationAt).toLocaleString(locale)
                : t("never")}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-bg-subtle">
            <p className="text-xs text-text-muted mb-1">{t("storageIntegrityCheck")}</p>
            <p className="text-sm font-semibold">
              {dbSettings.stats.integrityCheck === "ok" ? (
                <span className="text-success">{t("storageIntegrityOk")}</span>
              ) : dbSettings.stats.integrityCheck === "error" ? (
                <span className="text-error">{t("storageIntegrityError")}</span>
              ) : (
                t("storageIntegrityNotChecked")
              )}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderBackupList = () => {
    if (!backupsExpanded) return null;

    return (
      <div className="flex flex-col gap-2 mt-3">
        {backupsLoading ? (
          <div className="flex items-center justify-center py-6 text-text-muted">
            <Icon name="progress_activity" size={20} className="animate-spin mr-2" />
            {t("loadingBackups")}
          </div>
        ) : backups.length === 0 ? (
          <div className="text-center py-6 text-text-muted text-sm">
            <Icon name="folder_off" size={32} className="mb-2 block opacity-40" />
            {t("noBackupsYet")}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-muted">
                {t("backupsAvailable", { count: backups.length })}
              </span>
              <Button variant="ghost" size="sm" icon="refresh" onClick={loadBackups}>
                {t("refresh")}
              </Button>
            </div>
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-3 rounded-lg bg-bg-subtle border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="description" size={16} className="text-warning" />
                    <span className="text-sm font-medium truncate">
                      {new Date(backup.createdAt).toLocaleString(locale)}
                    </span>
                    <Badge
                      variant={
                        backup.reason === "pre-restore"
                          ? "warning"
                          : backup.reason === "manual"
                            ? "success"
                            : "default"
                      }
                      size="sm"
                    >
                      {formatBackupReason(backup.reason)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted ml-6">
                    <span>{t("connectionsCount", { count: backup.connectionCount })}</span>
                    <span>•</span>
                    <span>{formatBytes(backup.size)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {confirmRestoreId === backup.id ? (
                    <>
                      <span className="text-xs text-warning font-medium">{t("confirm")}</span>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleRestore(backup.id)}
                        loading={restoringId === backup.id}
                      >
                        {t("yes")}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setConfirmRestoreId(null)}>
                        {t("no")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      icon="restore"
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmRestoreId(backup.id)}
                    >
                      {t("restore")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const renderRetentionSettings = () => {
    if (dbSettingsLoading || !dbSettings) return null;

    const retentionFields = [
      ["quotaSnapshots", t("retentionQuotaSnapshots"), 7],
      ["compressionAnalytics", t("retentionCompressionAnalytics"), 30],
      ["mcpAudit", t("retentionMcpAudit"), 30],
      ["a2aEvents", t("retentionA2aEvents"), 30],
      ["callLogs", t("retentionCallLogs"), 30],
      ["conversationTurnNodes", t("retentionConversationTurnNodes"), 30],
      ["usageHistory", t("retentionUsageHistory"), 30],
      ["memoryEntries", t("retentionMemoryEntries"), 30],
      ["xpAuditLog", t("retentionXpAuditLog"), 30],
    ];

    return (
      <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Icon name="schedule" size={18} />
              {t("storageRetentionCleanup")}
            </h4>
            <p className="mt-1 text-xs text-text-muted">{t("storageRetentionCleanupDesc")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              {t("retentionCallDays", { count: storageHealth.retentionDays.call })}
            </Badge>
            <Badge variant="default" size="sm">
              {t("retentionAppDays", { count: storageHealth.retentionDays.app })}
            </Badge>
            <Badge variant="default" size="sm">
              {t("retentionRows", {
                count: (storageHealth.tableMaxRows?.callLogs ?? 100000).toLocaleString(),
              })}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {retentionFields.map(([key, label, fallback]) => (
            <Input
              key={String(key)}
              label={label}
              type="number"
              min="1"
              max="365"
              value={dbSettings.retention[key]}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  retention: {
                    ...dbSettings.retention,
                    [key]: parseInt(e.target.value) || fallback,
                  },
                })
              }
            />
          ))}
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            size="sm"
            onClick={saveDatabaseSettings}
            loading={dbSettingsSaving}
          >
            {t("saveRetentionSettings")}
          </Button>
        </div>
        <div className="mt-5 border-t border-border/50 pt-4">
          <DatabaseBackupRetentionCard
            title={t("storageDatabaseBackups")}
            className="mb-0"
            storageHealth={storageHealth}
            backupCleanupOptions={backupCleanupOptions}
            setBackupCleanupOptions={setBackupCleanupOptions}
            saveBackupRetentionLoading={saveBackupRetentionLoading}
            backupRetentionStatus={backupRetentionStatus}
            setBackupRetentionStatus={setBackupRetentionStatus}
            cleanupBackupsLoading={cleanupBackupsLoading}
            cleanupBackupsStatus={cleanupBackupsStatus}
            onSaveRetention={handleSaveBackupRetention}
            onCleanupBackups={handleCleanupBackups}
          />
        </div>
      </div>
    );
  };

  const renderOptimizationSettings = () => {
    if (dbSettingsLoading || !dbSettings) return null;

    return (
      <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Icon name="tune" size={18} />
          {t("storageOptimizationSettings")}
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label={t("storageAutoVacuumMode")}
              value={dbSettings.optimization.autoVacuumMode}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  optimization: {
                    ...dbSettings.optimization,
                    autoVacuumMode: e.target.value as "NONE" | "FULL" | "INCREMENTAL",
                  },
                })
              }
              options={[
                { value: "NONE", label: t("storageJournalModeNone") },
                { value: "FULL", label: t("storageJournalModeFull") },
                { value: "INCREMENTAL", label: t("storageJournalModeIncremental") },
              ]}
            />
            <Select
              label={t("storageScheduledVacuum")}
              value={dbSettings.optimization.scheduledVacuum}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  optimization: {
                    ...dbSettings.optimization,
                    scheduledVacuum: e.target.value as "never" | "daily" | "weekly" | "monthly",
                  },
                })
              }
              options={[
                { value: "never", label: t("storageVacuumNever") },
                { value: "daily", label: t("storageVacuumDaily") },
                { value: "weekly", label: t("storageVacuumWeekly") },
                { value: "monthly", label: t("storageVacuumMonthly") },
              ]}
            />
            <Input
              label={t("storageVacuumHour")}
              type="number"
              min="0"
              max="23"
              value={dbSettings.optimization.vacuumHour}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  optimization: {
                    ...dbSettings.optimization,
                    vacuumHour: parseInt(e.target.value) || 2,
                  },
                })
              }
            />
            <Input
              label={t("storagePageSize")}
              type="number"
              min="512"
              max="65536"
              step="512"
              value={dbSettings.optimization.pageSize}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  optimization: {
                    ...dbSettings.optimization,
                    pageSize: parseInt(e.target.value) || 4096,
                  },
                })
              }
            />
            <Input
              label={t("storageCacheSizeKb")}
              type="number"
              min="1"
              step="1024"
              value={dbSettings.optimization.cacheSize}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  optimization: {
                    ...dbSettings.optimization,
                    cacheSize: parseInt(e.target.value) || 16384,
                  },
                })
              }
            />
          </div>
          <Checkbox
            id="optimize-on-startup"
            label={t("storageOptimizeOnStartup")}
            checked={dbSettings.optimization.optimizeOnStartup}
            onChange={(e) =>
              setDbSettings({
                ...dbSettings,
                optimization: {
                  ...dbSettings.optimization,
                  optimizeOnStartup: e.target.checked,
                },
              })
            }
          />
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            size="sm"
            onClick={saveDatabaseSettings}
            loading={dbSettingsSaving}
          >
            {t("storageSaveOptimization")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCompressionAggregationSettings = () => {
    if (dbSettingsLoading || !dbSettings) return null;

    return (
      <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Icon name="compress" size={18} />
          {t("storageCompressionAggregation")}
        </h4>
        <div className="space-y-4">
          <Checkbox
            id="aggregation-enabled"
            label={t("storageEnableAggregation")}
            checked={dbSettings.aggregation.enabled}
            onChange={(e) =>
              setDbSettings({
                ...dbSettings,
                aggregation: { ...dbSettings.aggregation, enabled: e.target.checked },
              })
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t("storageRawDataRetention")}
              type="number"
              min="1"
              max="365"
              value={dbSettings.aggregation.rawDataRetentionDays}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  aggregation: {
                    ...dbSettings.aggregation,
                    rawDataRetentionDays: parseInt(e.target.value) || 30,
                  },
                })
              }
            />
            <Select
              label={t("storageGranularity")}
              value={dbSettings.aggregation.granularity}
              onChange={(e) =>
                setDbSettings({
                  ...dbSettings,
                  aggregation: {
                    ...dbSettings.aggregation,
                    granularity: e.target.value as "hourly" | "daily" | "weekly",
                  },
                })
              }
              options={[
                { value: "hourly", label: t("storageHourly") },
                { value: "daily", label: t("storageDaily") },
                { value: "weekly", label: t("storageWeekly") },
              ]}
            />
          </div>
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            size="sm"
            onClick={saveDatabaseSettings}
            loading={dbSettingsSaving}
          >
            {t("storageSaveAggregation")}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-bg-subtle text-text-muted">
          <Icon name="database" size={20} />
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("systemStorage")}</h3>
          <p className="text-xs text-text-muted">{t("allDataLocal")}</p>
          <p className="text-xs text-text-muted mt-1">
            Database backups are stored on this server in the db_backups folder under its data
            directory.{" "}
            <a href="/dashboard/endpoint" className="underline">
              Cloud sync is a separate setting under Endpoints
            </a>{" "}
            and can upload credentials to a configured remote destination.
          </p>
        </div>
        <Badge variant="success" size="sm">
          {storageHealth.driver || "json"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">
            {t("databasePath")}
          </p>
          <p className="text-sm font-mono text-text-main break-all">
            {storageHealth.dbPath || "~/.omniroute/storage.sqlite"}
          </p>
        </div>
      </div>

      {dbSettingsAuthRequired && !dbSettingsLoading && <AuthRequiredBanner t={t} />}
      {renderDatabaseStatistics()}

      <div className="pt-3 border-t border-border/50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="file_export" size={18} className="text-success" />
          <p className="font-medium">{t("export")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            icon="download"
            variant="outline"
            size="sm"
            onClick={handleExport}
            loading={exportLoading}
          >
            {t("exportDatabase")}
          </Button>
          <Button
            icon="folder_zip"
            variant="outline"
            size="sm"
            onClick={async () => {
              setExportLoading(true);
              try {
                await fetchAndDownload(
                  "/api/db-backups/exportAll",
                  "omniroute-full-backup.tar.gz",
                  t("exportFailed")
                );
              } catch (err) {
                setImportStatus({
                  type: "error",
                  message: t("fullExportFailedWithError", { error: (err as Error).message }),
                });
              } finally {
                setExportLoading(false);
              }
            }}
            loading={exportLoading}
          >
            {t("exportAll")}
          </Button>
          <Button
            icon="upload"
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            loading={importLoading}
          >
            {t("importDatabase")}
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".sqlite"
            aria-label={t("importDatabase")}
            tabIndex={-1}
            className="hidden"
            onChange={handleFileSelected}
          />
          <Button
            icon="data_object"
            variant="outline"
            size="sm"
            onClick={handleExportJson}
            loading={exportLoading}
          >
            {t("exportJson")}
          </Button>
          <Button
            icon="data_object"
            variant="outline"
            size="sm"
            onClick={handleImportJsonClick}
            loading={importLoading}
          >
            {t("importJson")}
          </Button>
          <Input
            ref={jsonInputRef}
            type="file"
            accept=".json"
            aria-label={t("importJson")}
            tabIndex={-1}
            className="hidden"
            onChange={handleJsonSelected}
          />
          <ProviderTransferPanel />
        </div>

        {confirmImport && pendingImportFile && (
          <div className="p-4 rounded-lg mt-3 bg-warning/10 border border-warning/30">
            <div className="flex items-start gap-3">
              <Icon name="warning" size={20} className="text-warning mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning mb-1">{t("confirmDbImport")}</p>
                <p className="text-xs text-text-muted mb-2">
                  {t("confirmDbImportDesc", { file: pendingImportFile.name })}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="warning" size="sm" onClick={handleImportConfirm}>
                    {t("yesImport")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleImportCancel}>
                    {tc("cancel")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {importStatus.message && <div className="mt-3">{renderStatusAlert(importStatus, 0)}</div>}
      </div>

      <div className="pt-3 border-t border-border/50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="build" size={18} className="text-info" />
          <p className="font-medium">{t("maintenance")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            icon="delete_sweep"
            variant="outline"
            size="sm"
            loading={clearCacheLoading}
            onClick={handleClearCache}
          >
            {t("clearCache")}
          </Button>
          <Button
            icon="auto_delete"
            variant="outline"
            size="sm"
            loading={purgeLogsLoading}
            onClick={handlePurgeExpiredLogs}
          >
            {t("purgeExpiredLogs")}
          </Button>
          <Button
            icon="cleaning_services"
            variant="outline"
            size="sm"
            loading={manualVacuumLoading}
            onClick={handleManualVacuum}
          >
            {t("manualVacuum")}
          </Button>
          <Button
            icon="delete_forever"
            variant="outline"
            size="sm"
            loading={purgeQuotaSnapshotsLoading}
            onClick={handlePurgeQuotaSnapshots}
          >
            {t("purgeQuotaSnapshots")}
          </Button>
          <Button
            icon="delete_forever"
            variant="outline"
            size="sm"
            loading={purgeCallLogsLoading}
            onClick={handlePurgeCallLogs}
          >
            {t("purgeCallLogs")}
          </Button>
          <Button
            icon="delete_forever"
            variant="outline"
            size="sm"
            loading={purgeDetailedLogsLoading}
            onClick={handlePurgeDetailedLogs}
          >
            {t("purgeDetailedLogs")}
          </Button>
          <Button
            icon="restart_alt"
            variant="danger"
            size="sm"
            loading={resetUsageLoading}
            onClick={openResetUsageModal}
          >
            {t("resetUsageData")}
          </Button>
        </div>
        <div className="mt-4 border-t border-border/50 pt-3">
          <div className="flex flex-col gap-2">
            {[
              clearCacheStatus,
              purgeLogsStatus,
              manualVacuumStatus,
              purgeQuotaSnapshotsStatus,
              purgeCallLogsStatus,
              purgeDetailedLogsStatus,
              resetUsageStatus,
            ].map(renderStatusAlert)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-center gap-2">
          <Icon name="schedule" size={16} className="text-warning" />
          <div>
            <p className="text-sm font-medium">{t("lastBackup")}</p>
            <p className="text-xs text-text-muted">
              {storageHealth.lastBackupAt
                ? new Date(storageHealth.lastBackupAt).toLocaleString(locale) +
                  " (" +
                  formatRelativeTime(storageHealth.lastBackupAt) +
                  ")"
                : t("noBackupYet")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            icon="backup"
            variant="outline"
            size="sm"
            onClick={handleManualBackup}
            loading={manualBackupLoading}
          >
            {t("backupNow")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBackupsExpanded(!backupsExpanded);
              if (!backupsExpanded && backups.length === 0) loadBackups();
            }}
          >
            {backupsExpanded ? t("hide") : t("viewBackups")}
          </Button>
        </div>
      </div>

      {manualBackupStatus.message && (
        <div className="mb-4">{renderStatusAlert(manualBackupStatus, 0)}</div>
      )}
      {restoreStatus.message && <div className="mb-4">{renderStatusAlert(restoreStatus, 1)}</div>}
      {renderBackupList()}

      {renderRetentionSettings()}
      {renderOptimizationSettings()}
      {renderCompressionAggregationSettings()}

      <ConfirmModal
        isOpen={resetUsageModalOpen}
        onClose={() => !resetUsageLoading && setResetUsageModalOpen(false)}
        onConfirm={handleResetUsageHistory}
        title={t("resetUsageData")}
        message={
          <div className="space-y-3">
            <p className="text-text-muted">
              {t("resetUsageDataDesc") ||
                "Select how far back you want to delete usage, request logs, and analytics data. Provider configuration, connections, API keys, combos, and settings are preserved. This action cannot be undone."}
            </p>
            <Select
              aria-label={t("resetUsageData")}
              value={resetUsagePeriod}
              onChange={(e) => setResetUsagePeriod(e.target.value)}
              options={RESET_USAGE_PERIOD_VALUES.map((value) => ({
                value,
                label: t(`resetUsagePeriod_${value}`) || value,
              }))}
            />
          </div>
        }
        confirmText={resetUsageLoading ? t("resetting") : t("reset")}
        variant="danger"
        loading={resetUsageLoading}
      />
    </Card>
  );
}
