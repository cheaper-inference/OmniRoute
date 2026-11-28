"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import {
  Button,
  Input,
  Modal,
  SegmentedControl,
  SegmentedPanel,
  SegmentedTabs,
  Textarea,
} from "@/shared/components";
import { parseGrokAccounts, type GrokAuthAccount } from "./parseGrokAccounts";

interface ImportGrokCliAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ImportGrokCliAuthModal({
  onClose,
  onSuccess,
}: ImportGrokCliAuthModalProps) {
  const notify = useNotificationStore();
  const t = useTranslations("providers");
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [accounts, setAccounts] = useState<GrokAuthAccount[]>([]);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [parseError, setParseError] = useState<string | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Some accounts were saved while others failed: closing must still refresh the list.
  const [importedSome, setImportedSome] = useState(false);
  // Bumped on every new file selection or paste edit, so a slow file read cannot replace
  // the preview of a later input.
  const inputGeneration = useRef(0);

  function handlePreview(json: unknown, unreadable = 0) {
    setParseError(null);
    const { accounts: parsed, rejected } = parseGrokAccounts(json);
    setAccounts(parsed);
    setRejectedCount(rejected + unreadable);
    if (parsed.length === 0) setParseError(t("grokInvalidAuth"));
  }

  function handleClose() {
    if (importedSome) onSuccess();
    else onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // e0274: accept several auth.json files at once; each file is one account.
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const generation = ++inputGeneration.current;
    void Promise.all(files.map((file) => file.text().catch(() => null))).then((texts) => {
      if (generation !== inputGeneration.current) return;
      const docs: unknown[] = [];
      let sawParseFailure = false;
      let unreadable = 0;
      for (const text of texts) {
        if (text == null) {
          sawParseFailure = true;
          unreadable += 1;
          continue;
        }
        try {
          docs.push(JSON.parse(text));
        } catch {
          sawParseFailure = true;
          unreadable += 1;
        }
      }
      if (docs.length === 0) {
        setAccounts([]);
        setRejectedCount(0);
        setParseError(t("grokParseFailed"));
        return;
      }
      if (sawParseFailure && files.length === 1) {
        setAccounts([]);
        setRejectedCount(0);
        setParseError(t("grokParseFailed"));
        return;
      }
      handlePreview(docs.length === 1 ? docs[0] : docs, unreadable);
    });
  }

  function handlePasteChange(text: string) {
    inputGeneration.current += 1;
    setPasteText(text);
    if (!text.trim()) {
      setAccounts([]);
      setRejectedCount(0);
      setParseError(null);
      return;
    }
    try {
      handlePreview(JSON.parse(text));
    } catch {
      setAccounts([]);
      setRejectedCount(0);
      setParseError(t("grokParseFailed"));
    }
  }

  async function handleSubmit() {
    if (accounts.length === 0) return;
    setLoading(true);
    setError(null);
    let ok = 0;
    const failedAccounts: GrokAuthAccount[] = [];
    for (const account of accounts) {
      try {
        const res = await fetch("/api/oauth/grok-cli/import-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: account.doc }),
        });
        if (res.ok) ok += 1;
        else failedAccounts.push(account);
      } catch {
        failedAccounts.push(account);
      }
    }
    setLoading(false);
    const failed = failedAccounts.length;
    if (failed === 0) {
      notify.success(t("grokImportSuccess"));
      onSuccess();
      return;
    }
    if (ok === 0) {
      setError(t("grokImportFailed"));
      return;
    }
    // Partial import: keep the modal open with only the failed accounts, ready to retry.
    notify.success(t("grokImportSuccess"));
    setImportedSome(true);
    setAccounts(failedAccounts);
    setRejectedCount(0);
    setError(t("grokBulkPartial", { ok, failed }));
  }

  const first = accounts[0];

  return (
    <Modal isOpen onClose={handleClose} title={t("grokImportTitle")} size="md">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          {t.rich("grokImportDescription", {
            authPath: (chunks) => <code>{chunks}</code>,
            command: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        {/* Tab toggle */}
        <SegmentedTabs
          value={tab}
          onChange={(next) => setTab(next as typeof tab)}
          className="gap-4"
        >
          <SegmentedControl
            semantics="tabs"
            size="sm"
            options={[
              { value: "upload", label: t("grokUploadFile") },
              { value: "paste", label: t("grokPasteJson") },
            ]}
          />

          {/* Upload tab */}
          <SegmentedPanel value="upload" className="flex flex-col gap-3">
            <Input
              type="file"
              accept=".json"
              multiple
              aria-label={t("grokUploadFile")}
              onChange={handleFileChange}
              inputClassName="cursor-pointer py-1 file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-text-main"
            />
          </SegmentedPanel>

          {/* Paste tab */}
          <SegmentedPanel value="paste" className="flex flex-col gap-3">
            <Textarea
              mono
              className="h-32 resize-none text-sm"
              aria-label={t("grokPasteJson")}
              placeholder='{"https://auth.x.ai::clientId": {"key": "eyJ...", ...}}'
              value={pasteText}
              onChange={(e) => handlePasteChange(e.target.value)}
            />
          </SegmentedPanel>
        </SegmentedTabs>

        {/* Parse error */}
        {parseError && <p className="text-sm text-error">{parseError}</p>}

        {/* Detected info */}
        {accounts.length > 0 && first && (
          <div className="flex flex-col gap-3">
            <div className="bg-success/10 border border-success/20 rounded-md p-3">
              {accounts.length === 1 ? (
                <>
                  <p className="text-sm text-success">
                    {t("grokValidToken")}
                    {first.email ? ` (${first.email})` : ""}
                  </p>
                  {first.hasRefreshToken ? (
                    <p className="text-xs text-success mt-1">{t("grokRefreshIncluded")}</p>
                  ) : (
                    <p className="text-xs text-warning mt-1">{t("grokRefreshMissing")}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-success">
                  {t("grokBulkDetected", { count: accounts.length })}
                </p>
              )}
              {rejectedCount > 0 && (
                <p className="text-xs text-warning mt-1">
                  {t("grokBulkRejected", { count: rejectedCount })}
                </p>
              )}
            </div>
            <Input
              placeholder={t("grokConnectionName")}
              aria-label={t("grokConnectionName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Submit error */}
        {error && <p className="text-sm text-error">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSubmit} fullWidth disabled={accounts.length === 0 || loading}>
            {loading ? t("grokSaving") : t("grokSaveConnection")}
          </Button>
          <Button onClick={handleClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
