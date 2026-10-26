"use client";

import { useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";

interface ImportAgyAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type AgyImportTopTab = "local" | "single" | "bulk";
type AgyBulkSubMode = "upload" | "paste";

interface AgyBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

function previewAgyJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, email: null };
    const token =
      doc.token && typeof doc.token === "object" ? (doc.token as Record<string, unknown>) : doc;
    if (!token.access_token || !token.refresh_token) {
      return { valid: false, email: null };
    }
    const email =
      typeof doc.id_token_email === "string"
        ? doc.id_token_email
        : typeof doc.email === "string"
          ? doc.email
          : null;
    return { valid: true, email };
  } catch {
    return { valid: false, email: null };
  }
}

export function ImportAgyAuthModal({ onClose, onSuccess }: ImportAgyAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<AgyImportTopTab>("local");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<AgyBulkSubMode>("upload");

  // Local auto-detection
  const [detectingLocal, setDetectingLocal] = useState(false);
  const [localOverwrite, setLocalOverwrite] = useState(true);

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [singleDetectedEmail, setSingleDetectedEmail] = useState<string | null>(null);
  const [singleParseError, setSingleParseError] = useState<string | null>(null);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<AgyBulkEntry[]>([]);
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

  // ── Local Detection Handler ──
  const handleDetectLocal = async () => {
    if (detectingLocal) return;
    setDetectingLocal(true);
    try {
      const res = await fetch("/api/providers/agy-auth/apply-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          overwriteExisting: localOverwrite,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(data.error || "No local Antigravity CLI or IDE login detected.");
        return;
      }

      notify.success(
        data.created
          ? "Antigravity account connected from local session!"
          : "Local Antigravity connection refreshed successfully!"
      );
      onSuccess();
    } catch {
      notify.error("Failed to connect local Antigravity session");
    } finally {
      setDetectingLocal(false);
    }
  };

  // ── Single Preview & Submit ──
  const handleSinglePreview = (json: unknown) => {
    setSingleParseError(null);
    setSingleDetectedEmail(null);
    setSingleJson(null);

    const { valid, email } = previewAgyJson(json);
    if (!valid) {
      setSingleParseError("Invalid token format (missing access_token or refresh_token)");
      return;
    }
    setSingleDetectedEmail(email);
    if (email && !singleEmail) setSingleEmail(email);
    setSingleJson(json);
  };

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        handleSinglePreview(json);
      } catch {
        setSingleParseError("Could not parse file as JSON");
      }
    };
    reader.readAsText(file);
  };

  const handleSinglePasteChange = (text: string) => {
    setSinglePasteText(text);
    if (!text.trim()) {
      setSingleJson(null);
      setSingleParseError(null);
      setSingleDetectedEmail(null);
      return;
    }
    try {
      handleSinglePreview(JSON.parse(text));
    } catch {
      setSingleParseError("Could not parse pasted content as JSON");
      setSingleJson(null);
    }
  };

  const handleSingleSubmit = async () => {
    if (submitting || !singleJson) return;
    setSubmitting(true);
    try {
      const body = {
        source: { kind: "json", json: singleJson },
        name: singleName.trim() || undefined,
        email: singleEmail.trim() || undefined,
        overwriteExisting,
      };

      const res = await fetch("/api/providers/agy-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error("Account already exists — check Replace existing to overwrite");
        } else {
          notify.error(data.error || "Failed to import Antigravity credentials");
        }
        return;
      }

      notify.success("Antigravity account imported successfully!");
      onSuccess();
    } catch {
      notify.error("Failed to import Antigravity credentials");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Bulk Handlers ──
  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: AgyBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewAgyJson(json);
          newEntries.push({
            name: email || file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: "Invalid JSON",
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
          arr.map((item, i) => {
            const { email } = previewAgyJson(item);
            return {
              name: email || `Account #${i + 1}`,
              json: item,
              parseError: null,
              email,
            };
          })
        );
      } else {
        const { email } = previewAgyJson(arr);
        setBulkEntries([
          {
            name: email || "Account #1",
            json: arr,
            parseError: null,
            email,
          },
        ]);
      }
    } catch {
      setBulkEntries([]);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting || !bulkEntries.length) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);

    const validEntries = bulkEntries.filter((e) => e.json && !e.parseError);
    if (!validEntries.length) {
      notify.error("No valid entries to import");
      setBulkSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/providers/agy-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            name: e.name,
            email: e.email || undefined,
            source: { kind: "json", json: e.json },
          })),
          overwriteExisting,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(data.error || "Bulk import failed");
        return;
      }

      setBulkResult({
        success: data.imported ?? 0,
        failed: data.failed ?? 0,
        total: validEntries.length,
      });

      if (data.errors && Array.isArray(data.errors)) {
        setBulkErrors(data.errors);
      }

      notify.success(`Imported ${data.imported ?? 0} Antigravity account(s)`);
      if ((data.imported ?? 0) > 0) {
        onSuccess();
      }
    } catch {
      notify.error("Failed to run bulk import");
    } finally {
      setBulkSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Connect Antigravity (Google Cloud Code)"
      size="lg"
    >
      <div className="space-y-4">
        {/* Top Tabs */}
        <div className="flex border-b border-border/50 gap-2">
          <button
            type="button"
            onClick={() => setTopTab("local")}
            className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${
              topTab === "local"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            ⚡ 1-Click Local CLI / IDE
          </button>
          <button
            type="button"
            onClick={() => setTopTab("single")}
            className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${
              topTab === "single"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            File / Paste Token
          </button>
          <button
            type="button"
            onClick={() => setTopTab("bulk")}
            className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${
              topTab === "bulk"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Bulk Import
          </button>
        </div>

        {/* ── TAB 1: 1-Click Local CLI / IDE ── */}
        {topTab === "local" && (
          <div className="space-y-4 pt-1">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground space-y-2">
              <p className="font-semibold text-primary flex items-center gap-2">
                <span>⚡</span> Auto-Detect Active Session
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatically detects active Google Cloud Code / Antigravity login credentials from:
              </p>
              <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                <li>Linux Secret Service / Keyring (`service=gemini, user=antigravity`)</li>
                <li>Antigravity IDE local SQLite state database (`state.vscdb`)</li>
                <li>Local CLI token profiles (`~/.gemini/antigravity-cli/`)</li>
              </ul>
              <p className="text-xs text-muted-foreground">
                No browser login, popup windows, or manual OAuth code copy required. The token persists in OmniRoute independently even if you log out of the CLI.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={localOverwrite}
                  onChange={(e) => setLocalOverwrite(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Replace / refresh existing connection if already imported</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
              <Button variant="secondary" onClick={onClose} disabled={detectingLocal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDetectLocal}
                loading={detectingLocal}
                disabled={detectingLocal}
              >
                Import from Local Antigravity
              </Button>
            </div>
          </div>
        )}

        {/* ── TAB 2: Single Import ── */}
        {topTab === "single" && (
          <div className="space-y-4 pt-1">
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSingleSubTab("upload")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  singleSubTab === "upload"
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setSingleSubTab("paste")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  singleSubTab === "paste"
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Paste JSON
              </button>
            </div>

            {singleSubTab === "upload" ? (
              <div className="border border-dashed border-border rounded-lg p-6 text-center space-y-2">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="block w-full text-xs text-muted-foreground file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground">
                  Select `antigravity-oauth-token` or exported token JSON file
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  rows={5}
                  value={singlePasteText}
                  onChange={(e) => handleSinglePasteChange(e.target.value)}
                  placeholder={`{\n  "token": {\n    "access_token": "ya29...",\n    "refresh_token": "1//0..."\n  },\n  "id_token_email": "user@gmail.com"\n}`}
                  className="w-full text-xs font-mono p-3 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            {singleParseError && (
              <p className="text-xs text-destructive">{singleParseError}</p>
            )}

            {singleDetectedEmail && (
              <div className="rounded p-2 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                ✓ Valid token detected: <strong>{singleDetectedEmail}</strong>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Connection Name (Optional)
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="e.g. Work Account"
                  className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Email (Optional override)
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={overwriteExisting}
                  onChange={(e) => setOverwriteExisting(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Replace existing connection if email already exists</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
              <Button variant="secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSingleSubmit}
                loading={submitting}
                disabled={submitting || !singleJson}
              >
                Import Account
              </Button>
            </div>
          </div>
        )}

        {/* ── TAB 3: Bulk Import ── */}
        {topTab === "bulk" && (
          <div className="space-y-4 pt-1">
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBulkSubMode("upload")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  bulkSubMode === "upload"
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => setBulkSubMode("paste")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  bulkSubMode === "paste"
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Paste JSON Array
              </button>
            </div>

            {bulkSubMode === "upload" ? (
              <div className="border border-dashed border-border rounded-lg p-6 text-center space-y-2">
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="block w-full text-xs text-muted-foreground file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground">
                  Select multiple JSON token files
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  rows={5}
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  placeholder={`[\n  { "token": { "access_token": "...", "refresh_token": "..." }, "id_token_email": "a@gmail.com" },\n  { "token": { "access_token": "...", "refresh_token": "..." }, "id_token_email": "b@gmail.com" }\n]`}
                  className="w-full text-xs font-mono p-3 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="text-xs space-y-1">
                <p className="font-medium text-foreground">
                  {bulkEntries.length} file(s) staged:
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                  {bulkEntries.map((e, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs px-2.5 py-1 rounded bg-secondary/40 border border-border/40"
                    >
                      <span className="truncate">{e.name}</span>
                      {e.parseError ? (
                        <span className="text-destructive text-[11px]">{e.parseError}</span>
                      ) : (
                        <span className="text-emerald-400 text-[11px]">Valid</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bulkResult && (
              <div className="p-3 rounded bg-secondary/30 text-xs space-y-1">
                <p className="font-semibold text-foreground">Import Results:</p>
                <p className="text-muted-foreground">
                  ✓ {bulkResult.success} succeeded, ✗ {bulkResult.failed} failed of {bulkResult.total} total
                </p>
                {bulkErrors.map((err, i) => (
                  <p key={i} className="text-destructive text-[11px]">
                    {err.name}: {err.message}
                  </p>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={overwriteExisting}
                  onChange={(e) => setOverwriteExisting(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Replace existing connections on email match</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
              <Button variant="secondary" onClick={onClose} disabled={bulkSubmitting}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleBulkSubmit}
                loading={bulkSubmitting}
                disabled={bulkSubmitting || !bulkEntries.length}
              >
                Import All
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
