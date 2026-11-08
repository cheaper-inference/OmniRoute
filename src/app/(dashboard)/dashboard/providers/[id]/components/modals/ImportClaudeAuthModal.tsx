"use client";

import Icon from "@/shared/components/Icon";
import { useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Button, Checkbox, Input, Modal, SegmentedControl, Textarea } from "@/shared/components";
interface ImportClaudeAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type ClaudeImportTopTab = "single" | "bulk";
type ClaudeBulkSubMode = "upload" | "paste" | "zip";

interface ClaudeBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

function extractEmailFromClaudeJson(json: unknown): string | null {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return null;
    const oauth =
      doc.claudeAiOauth && typeof doc.claudeAiOauth === "object"
        ? (doc.claudeAiOauth as Record<string, unknown>)
        : null;
    if (!oauth) return null;
    return null; // email comes from bootstrap, not the file
  } catch {
    return null;
  }
}

function previewClaudeJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, email: null };
    const oauth =
      doc.claudeAiOauth && typeof doc.claudeAiOauth === "object"
        ? (doc.claudeAiOauth as Record<string, unknown>)
        : null;
    if (!oauth || !oauth.accessToken || !oauth.refreshToken) return { valid: false, email: null };
    return { valid: true, email: null };
  } catch {
    return { valid: false, email: null };
  }
}

export function ImportClaudeAuthModal({ onClose, onSuccess }: ImportClaudeAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<ClaudeImportTopTab>("single");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<ClaudeBulkSubMode>("upload");

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<ClaudeBulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<{ index: number; name: string; message: string }[]>(
    []
  );
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);
  const [zipExtracting, setZipExtracting] = useState(false);

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setSingleJson(json);
      } catch {
        notify.error(
          typeof t.has === "function" && t.has("claudeImportInvalidJson")
            ? t("claudeImportInvalidJson")
            : "Could not parse the file as JSON"
        );
      }
    };
    reader.readAsText(file);
  };

  const handleSingleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let rawJson: unknown;
      if (singleSubTab === "upload") {
        rawJson = singleJson;
      } else {
        try {
          rawJson = JSON.parse(singlePasteText);
        } catch {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportInvalidJson")
              ? t("claudeImportInvalidJson")
              : "Could not parse the pasted content as JSON"
          );
          return;
        }
      }

      const body =
        singleSubTab === "paste"
          ? {
              source: { kind: "text", text: singlePasteText },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            }
          : {
              source: { kind: "json", json: rawJson },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            };

      const res = await fetch("/api/providers/claude-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportDuplicate")
              ? t("claudeImportDuplicate")
              : 'Account already exists — enable "Replace existing" to overwrite'
          );
        } else if (data.code === "identity_unverified") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportIdentityUnverified")
              ? t("claudeImportIdentityUnverified")
              : 'Bootstrap could not verify the account. Enable "Replace existing" or provide an email.'
          );
        } else {
          notify.error(
            data.error ||
              (typeof t.has === "function" && t.has("claudeImportFailed")
                ? t("claudeImportFailed")
                : "Failed to import Claude auth")
          );
        }
        return;
      }

      notify.success(
        typeof t.has === "function" && t.has("claudeImportSuccess")
          ? t("claudeImportSuccess")
          : "Claude connection imported successfully"
      );
      onSuccess();
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportFailed")
          ? t("claudeImportFailed")
          : "Failed to import Claude auth"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: ClaudeBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const email = extractEmailFromClaudeJson(json);
          newEntries.push({
            name: file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: t("claudeImportInvalidJson"),
            email: null,
          });
        }
        pending--;
        if (pending === 0) setBulkEntries((prev) => [...prev, ...newEntries]);
      };
      reader.readAsText(file);
    });
  };

  const handleBulkPasteChange = (text: string) => {
    setBulkPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setBulkEntries([]);
      return;
    }
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        setBulkEntries(
          arr.map((item, i) => ({
            name: t("claudeImportEntryName", { number: i + 1 }),
            json: item,
            parseError: null,
            email: null,
          }))
        );
      } else {
        setBulkEntries([
          {
            name: t("claudeImportEntryName", { number: 1 }),
            json: arr,
            parseError: null,
            email: null,
          },
        ]);
      }
    } catch {
      setBulkEntries([
        {
          name: t("claudeImportParseError"),
          json: null,
          parseError: t("claudeImportInvalidJson"),
          email: null,
        },
      ]);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipExtracting(true);
    try {
      const res = await fetch("/api/providers/claude-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/zip" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkZipError")
              ? t("claudeImportBulkZipError")
              : "Failed to extract ZIP")
        );
        return;
      }
      const entries: ClaudeBulkEntry[] = (data.entries || []).map(
        (e: { name: string; json: unknown; parseError: string | null }) => ({
          name: e.name,
          json: e.json,
          parseError: e.parseError,
          email: null,
        })
      );
      setBulkEntries(entries);
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkZipError")
          ? t("claudeImportBulkZipError")
          : "Failed to extract ZIP"
      );
    } finally {
      setZipExtracting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);
    try {
      const validEntries = bulkEntries.filter((e) => e.json !== null);
      if (validEntries.length === 0) {
        notify.error(t("claudeImportNoValidEntries"));
        return;
      }
      const res = await fetch("/api/providers/claude-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name,
            email: e.email || undefined,
          })),
          overwriteExisting,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkFailed")
              ? t("claudeImportBulkFailed")
              : "Some entries failed to import")
        );
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, total: data.total });
      if (data.errors?.length > 0) setBulkErrors(data.errors);
      if (data.success > 0) {
        notify.success(
          typeof t.has === "function" && t.has("claudeImportBulkSuccess")
            ? t("claudeImportBulkSuccess", { count: data.success })
            : `Imported ${data.success} Claude connections`
        );
        if (data.failed === 0) onSuccess();
      }
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkFailed")
          ? t("claudeImportBulkFailed")
          : "Some entries failed to import"
      );
    } finally {
      setBulkSubmitting(false);
    }
  };

  const tabLabels: Record<ClaudeImportTopTab, string> = {
    single:
      typeof t.has === "function" && t.has("claudeImportTabSingle")
        ? t("claudeImportTabSingle")
        : "Single",
    bulk:
      typeof t.has === "function" && t.has("claudeImportTabBulk")
        ? t("claudeImportTabBulk")
        : "Bulk",
  };

  const modalTitle =
    typeof t.has === "function" && t.has("claudeImportModalTitle")
      ? t("claudeImportModalTitle")
      : "Import Claude Auth";

  return (
    <Modal isOpen onClose={onClose} title={modalTitle}>
      <div className="flex flex-col gap-4">
        {/* Top tabs */}
        <SegmentedControl
          size="sm"
          value={topTab}
          onChange={(next) => setTopTab(next as ClaudeImportTopTab)}
          options={(["single", "bulk"] as ClaudeImportTopTab[]).map((tab) => ({
            value: tab,
            label: tabLabels[tab],
          }))}
        />

        {topTab === "single" && (
          <div className="flex flex-col gap-3">
            {/* Sub-tabs */}
            <SegmentedControl
              size="sm"
              value={singleSubTab}
              onChange={(next) => setSingleSubTab(next as "upload" | "paste")}
              options={[
                {
                  value: "upload",
                  label:
                    typeof t.has === "function" && t.has("claudeImportTabUpload")
                      ? t("claudeImportTabUpload")
                      : "Upload file",
                },
                {
                  value: "paste",
                  label:
                    typeof t.has === "function" && t.has("claudeImportTabPaste")
                      ? t("claudeImportTabPaste")
                      : "Paste JSON",
                },
              ]}
            />
            {singleSubTab === "upload" ? (
              <div>
                <Input
                  label={
                    typeof t.has === "function" && t.has("claudeImportFileLabel")
                      ? t("claudeImportFileLabel")
                      : "Choose .credentials.json"
                  }
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  inputClassName="cursor-pointer py-1 file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-text-main"
                />
                {singleJson && previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-success">
                    {t("providerDetailValidClaudeCredentialsFile")}
                  </p>
                )}
                {singleJson && !previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-error">
                    {typeof t.has === "function" && t.has("claudeImportInvalidShape")
                      ? t("claudeImportInvalidShape")
                      : "The file is not a valid .credentials.json"}
                  </p>
                )}
              </div>
            ) : (
              <Field
                htmlFor="claude-import-single-paste"
                label={
                  typeof t.has === "function" && t.has("claudeImportPasteLabel")
                    ? t("claudeImportPasteLabel")
                    : "Paste the JSON content"
                }
              >
                <Textarea
                  id="claude-import-single-paste"
                  value={singlePasteText}
                  onChange={(e) => setSinglePasteText(e.target.value)}
                  rows={6}
                  className="font-mono text-xs"
                  placeholder='{ "claudeAiOauth": { ... } }'
                />
              </Field>
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <Input
                  label={
                    typeof t.has === "function" && t.has("claudeImportEmailLabel")
                      ? t("claudeImportEmailLabel")
                      : "Account email"
                  }
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="auto-detected"
                />
              </div>
              <div>
                <Input
                  label={
                    typeof t.has === "function" && t.has("claudeImportNameLabel")
                      ? t("claudeImportNameLabel")
                      : "Connection name (optional)"
                  }
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder={t("providerDetailMyClaudeAccountPlaceholder")}
                />
              </div>
            </div>
            <Checkbox
              label={
                typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                  ? t("claudeImportOverwriteLabel")
                  : "Replace existing connection if account already exists"
              }
              checked={overwriteExisting}
              onChange={(e) => setOverwriteExisting(e.target.checked)}
            />
            <Button
              loading={submitting}
              onClick={handleSingleSubmit}
              disabled={singleSubTab === "upload" ? !singleJson : !singlePasteText.trim()}
            >
              {typeof t.has === "function" && t.has("claudeImportSubmit")
                ? t("claudeImportSubmit")
                : "Import"}
            </Button>
          </div>
        )}

        {topTab === "bulk" && (
          <div className="flex flex-col gap-3">
            {/* Sub-mode tabs */}
            <SegmentedControl
              size="sm"
              value={bulkSubMode}
              onChange={(next) => {
                setBulkSubMode(next as ClaudeBulkSubMode);
                setBulkEntries([]);
              }}
              options={(["upload", "paste", "zip"] as ClaudeBulkSubMode[]).map((mode) => ({
                value: mode,
                label:
                  mode === "upload"
                    ? typeof t.has === "function" && t.has("claudeImportBulkModeUpload")
                      ? t("claudeImportBulkModeUpload")
                      : "Upload files"
                    : mode === "paste"
                      ? typeof t.has === "function" && t.has("claudeImportBulkModePaste")
                        ? t("claudeImportBulkModePaste")
                        : "Paste JSON array"
                      : typeof t.has === "function" && t.has("claudeImportBulkModeZip")
                        ? t("claudeImportBulkModeZip")
                        : "Upload ZIP",
              }))}
            />

            {bulkSubMode === "upload" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkUploadHint")
                    ? t("claudeImportBulkUploadHint")
                    : "Drop or pick up to 50 .credentials.json files (256KB each, 10MB total)."}
                </p>
                <Input
                  type="file"
                  accept=".json"
                  multiple
                  aria-label={
                    typeof t.has === "function" && t.has("claudeImportBulkModeUpload")
                      ? t("claudeImportBulkModeUpload")
                      : "Upload files"
                  }
                  onChange={handleBulkFilesChange}
                  inputClassName="cursor-pointer py-1 file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-text-main"
                />
              </div>
            )}
            {bulkSubMode === "paste" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkPasteHint")
                    ? t("claudeImportBulkPasteHint")
                    : "Paste an array of objects: [{ json, name?, email? }, ...]"}
                </p>
                <Textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={6}
                  aria-label={
                    typeof t.has === "function" && t.has("claudeImportBulkModePaste")
                      ? t("claudeImportBulkModePaste")
                      : "Paste JSON array"
                  }
                  className="font-mono text-xs"
                  placeholder="[{ ... }, { ... }]"
                />
              </div>
            )}
            {bulkSubMode === "zip" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkZipHint")
                    ? t("claudeImportBulkZipHint")
                    : "ZIP containing .json entries. Max 50 entries, 10MB unpacked."}
                </p>
                {zipExtracting ? (
                  <p className="text-xs text-text-muted animate-pulse">
                    {typeof t.has === "function" && t.has("claudeImportBulkZipExtracting")
                      ? t("claudeImportBulkZipExtracting")
                      : "Extracting ZIP…"}
                  </p>
                ) : (
                  <Input
                    type="file"
                    accept=".zip"
                    aria-label={
                      typeof t.has === "function" && t.has("claudeImportBulkModeZip")
                        ? t("claudeImportBulkModeZip")
                        : "Upload ZIP"
                    }
                    onChange={handleZipUpload}
                    inputClassName="cursor-pointer py-1 file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-text-main"
                  />
                )}
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto">
                {bulkEntries.map((e, i) => (
                  <div
                    key={i}
                    className={`text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-error" : "text-text-main"}`}
                  >
                    <Icon name={e.parseError ? "error" : "check_circle"} size={12} />
                    {e.name}
                    {e.email ? ` (${e.email})` : ""}
                    {e.parseError ? ` — ${e.parseError}` : ""}
                  </div>
                ))}
              </div>
            )}

            <Checkbox
              label={
                typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                  ? t("claudeImportOverwriteLabel")
                  : "Replace existing connection if account already exists"
              }
              checked={overwriteExisting}
              onChange={(e) => setOverwriteExisting(e.target.checked)}
            />

            {bulkResult && (
              <div className="rounded bg-bg-subtle px-2 py-1.5 text-xs">
                {bulkResult.success}/{bulkResult.total} imported
                {bulkResult.failed > 0 ? `, ${bulkResult.failed} failed` : ""}
              </div>
            )}
            {bulkErrors.length > 0 && (
              <div className="rounded border border-error/30 bg-error/5 px-2 py-1.5 max-h-28 overflow-y-auto">
                {bulkErrors.map((e) => (
                  <div key={e.index} className="text-xs text-error py-0.5">
                    {e.name}: {e.message}
                  </div>
                ))}
              </div>
            )}

            <Button
              loading={bulkSubmitting}
              onClick={handleBulkSubmit}
              disabled={bulkEntries.filter((e) => e.json !== null).length === 0}
            >
              {typeof t.has === "function" && t.has("claudeImportBulkSubmit")
                ? t("claudeImportBulkSubmit")
                : "Import all"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ──── ApplyClaudeAuthModal ────────────────────────────────────────────────────

export function ApplyClaudeAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("claudeApplyModalTitle")
      ? t("claudeApplyModalTitle")
      : "Apply to Local Claude Code";
  const targetLabel =
    typeof t.has === "function" && t.has("claudeApplyTargetLabel")
      ? t("claudeApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("claudeApplyBackupLabel")
      ? t("claudeApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("claudeApplyWarning")
      ? t("claudeApplyWarning")
      : "This will replace the existing claudeAiOauth section. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("claudeApplyConfirmCheckbox")
      ? t("claudeApplyConfirmCheckbox")
      : "I confirm I want to replace the existing claudeAiOauth section";
  const applyText =
    typeof t.has === "function" && t.has("claudeApply") ? t("claudeApply") : "Apply";
  const mcpHint =
    typeof t.has === "function" && t.has("claudeApplyMcpHint")
      ? t("claudeApplyMcpHint")
      : "Existing MCP OAuth state will be preserved.";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.claude/.credentials.json
          </code>
          <p className="mt-1 text-xs text-text-muted">{t("providerDetailPathAutoDetected")}</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <code className="block rounded bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main">
            {"~/.claude/credentials-{timestamp}.bak"}
          </code>
        </div>
        <div className="rounded bg-info/10 border border-info/20 px-3 py-2 text-xs text-info">
          {mcpHint}
        </div>
        <p className="text-sm text-text-muted">{warning}</p>
        <Checkbox
          label={confirmText}
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            loading={inProgress}
            disabled={!confirmed || inProgress}
            onClick={() => void onConfirm(connectionId)}
          >
            {applyText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
