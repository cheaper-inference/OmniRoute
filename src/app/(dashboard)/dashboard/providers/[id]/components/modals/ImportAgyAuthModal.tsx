"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { Button, Checkbox, Input, Modal, SegmentedControl, Textarea } from "@/shared/components";

interface ImportAgyAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type AgyImportTopTab = "local" | "single" | "bulk";
type AgyInputMode = "upload" | "paste";

interface AgyBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

interface AgyBulkResult {
  success: number;
  failed: number;
  total: number;
}

interface AgyBulkError {
  index: number;
  name: string;
  message: string;
}

type JsonRecord = Record<string, unknown>;

const SINGLE_PLACEHOLDER = `{\n  "token": {\n    "access_token": "ya29...",\n    "refresh_token": "1//0..."\n  },\n  "id_token_email": "user@gmail.com"\n}`;
const BULK_PLACEHOLDER = `[\n  { "token": { "access_token": "...", "refresh_token": "..." }, "id_token_email": "a@gmail.com" },\n  { "token": { "access_token": "...", "refresh_token": "..." }, "id_token_email": "b@gmail.com" }\n]`;
const FILE_INPUT_CLASS =
  "cursor-pointer py-1 file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-text-main";

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function pickEmail(doc: JsonRecord): string | null {
  if (typeof doc.id_token_email === "string") return doc.id_token_email;
  if (typeof doc.email === "string") return doc.email;
  return null;
}

/** Client-side shape check mirroring parseAndValidateAgyToken (nested `token.*` or flat). */
function previewAgyJson(json: unknown): { valid: boolean; email: string | null } {
  const doc = asRecord(json);
  if (!doc) return { valid: false, email: null };
  const token = asRecord(doc.token) ?? doc;
  if (!token.access_token || !token.refresh_token) return { valid: false, email: null };
  return { valid: true, email: pickEmail(doc) };
}

async function postJson(url: string, body: unknown): Promise<{ ok: boolean; data: JsonRecord }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as JsonRecord;
  return { ok: res.ok, data };
}

function errorText(data: JsonRecord, fallback: string): string {
  return typeof data.error === "string" && data.error ? data.error : fallback;
}

function useLocalDetect(onSuccess: () => void) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [detecting, setDetecting] = useState(false);
  const [overwrite, setOverwrite] = useState(true);

  const detect = async () => {
    if (detecting) return;
    setDetecting(true);
    try {
      const { ok, data } = await postJson("/api/providers/agy-auth/apply-local", {
        overwriteExisting: overwrite,
      });
      if (!ok) {
        notify.error(errorText(data, t("agyImportLocalNotFound")));
        return;
      }
      notify.success(data.created ? t("agyImportLocalCreated") : t("agyImportLocalRefreshed"));
      onSuccess();
    } catch {
      notify.error(t("agyImportLocalFailed"));
    } finally {
      setDetecting(false);
    }
  };

  return { detecting, overwrite, setOverwrite, detect };
}

function useSingleImport(onSuccess: () => void) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [json, setJson] = useState<unknown>(null);
  const [pasteText, setPasteText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [overwrite, setOverwrite] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [detectedEmail, setDetectedEmail] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const preview = (value: unknown) => {
    setDetectedEmail(null);
    setJson(null);
    const result = previewAgyJson(value);
    if (!result.valid) {
      setParseError(t("agyImportInvalidToken"));
      return;
    }
    setParseError(null);
    setDetectedEmail(result.email);
    if (result.email && !email) setEmail(result.email);
    setJson(value);
  };

  const parseAndPreview = (text: string, failureMessage: string) => {
    try {
      preview(JSON.parse(text));
    } catch {
      setJson(null);
      setParseError(failureMessage);
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseAndPreview(await file.text(), t("agyImportParseFileFailed"));
  };

  const onPaste = (text: string) => {
    setPasteText(text);
    if (text.trim()) {
      parseAndPreview(text, t("agyImportParsePasteFailed"));
      return;
    }
    setJson(null);
    setParseError(null);
    setDetectedEmail(null);
  };

  const submit = async () => {
    if (submitting || !json) return;
    setSubmitting(true);
    try {
      const { ok, data } = await postJson("/api/providers/agy-auth/import", {
        source: { kind: "json", json },
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        overwriteExisting: overwrite,
      });
      if (!ok) {
        const duplicate = data.code === "duplicate_account";
        notify.error(duplicate ? t("agyImportDuplicate") : errorText(data, t("agyImportFailed")));
        return;
      }
      notify.success(t("agyImportSuccess"));
      onSuccess();
    } catch {
      notify.error(t("agyImportFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    ...{ json, pasteText, name, setName, email, setEmail, overwrite, setOverwrite },
    ...{ submitting, detectedEmail, parseError, onFile, onPaste, submit },
  };
}

function toBulkEntry(json: unknown, fallbackName: string): AgyBulkEntry {
  const { email } = previewAgyJson(json);
  return { name: email || fallbackName, json, parseError: null, email };
}

async function readBulkFile(file: File, invalidLabel: string): Promise<AgyBulkEntry> {
  try {
    return toBulkEntry(JSON.parse(await file.text()), file.name.replace(/\.json$/, ""));
  } catch {
    return { name: file.name, json: null, parseError: invalidLabel, email: null };
  }
}

function useBulkStaging() {
  const t = useTranslations("providers");
  const [entries, setEntries] = useState<AgyBulkEntry[]>([]);
  const [pasteText, setPasteText] = useState("");

  const onFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const staged = await Promise.all(
      files.map((file) => readBulkFile(file, t("agyImportInvalidJson")))
    );
    setEntries((prev) => [...prev, ...staged]);
  };

  const onPaste = (text: string) => {
    setPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setEntries([]);
      return;
    }
    try {
      const parsed: unknown = JSON.parse(trimmed);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      setEntries(
        items.map((item, i) => toBulkEntry(item, t("agyImportAccountN", { index: i + 1 })))
      );
    } catch {
      setEntries([]);
    }
  };

  return { entries, pasteText, onFiles, onPaste };
}

function useBulkImport(onSuccess: () => void) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const staging = useBulkStaging();
  const [overwrite, setOverwrite] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<AgyBulkError[]>([]);
  const [result, setResult] = useState<AgyBulkResult | null>(null);

  const submit = async () => {
    if (submitting || !staging.entries.length) return;
    const valid = staging.entries.filter((e) => e.json && !e.parseError);
    if (!valid.length) {
      notify.error(t("agyImportNoValidEntries"));
      return;
    }
    setSubmitting(true);
    setErrors([]);
    setResult(null);
    try {
      const { ok, data } = await postJson("/api/providers/agy-auth/import-bulk", {
        entries: valid.map((e) => ({
          name: e.name,
          email: e.email || undefined,
          source: { kind: "json", json: e.json },
        })),
        overwriteExisting: overwrite,
      });
      if (!ok) {
        notify.error(errorText(data, t("agyImportBulkFailed")));
        return;
      }
      const imported = Number(data.imported ?? 0);
      setResult({ success: imported, failed: Number(data.failed ?? 0), total: valid.length });
      if (Array.isArray(data.errors)) setErrors(data.errors as AgyBulkError[]);
      notify.success(t("agyImportBulkSuccess", { count: imported }));
      if (imported > 0) onSuccess();
    } catch {
      notify.error(t("agyImportBulkRunFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return { ...staging, overwrite, setOverwrite, submitting, errors, result, submit };
}

function ModalActions({
  onClose,
  onSubmit,
  busy,
  disabled,
  submitLabel,
}: {
  onClose: () => void;
  onSubmit: () => void;
  busy: boolean;
  disabled: boolean;
  submitLabel: string;
}) {
  const t = useTranslations("providers");
  return (
    <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
      <Button variant="secondary" onClick={onClose} disabled={busy}>
        {t("cancel")}
      </Button>
      <Button variant="primary" onClick={onSubmit} loading={busy} disabled={disabled}>
        {submitLabel}
      </Button>
    </div>
  );
}

function LocalTab({ onClose, onSuccess }: ImportAgyAuthModalProps) {
  const t = useTranslations("providers");
  const local = useLocalDetect(onSuccess);
  return (
    <div className="space-y-4 pt-1">
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm space-y-2">
        <p className="font-semibold text-primary">{t("agyImportLocalHeading")}</p>
        <p className="text-xs text-text-muted leading-relaxed">{t("agyImportLocalIntro")}</p>
        <ul className="text-xs text-text-muted list-disc list-inside space-y-1">
          <li>{t("agyImportLocalSourceEnv")}</li>
          <li>{t("agyImportLocalSourceKeyring")}</li>
          <li>{t("agyImportLocalSourceCli")}</li>
        </ul>
        <p className="text-xs text-text-muted">{t("agyImportLocalNote")}</p>
      </div>
      <Checkbox
        label={t("agyImportLocalOverwrite")}
        checked={local.overwrite}
        onChange={(e) => local.setOverwrite(e.target.checked)}
      />
      <ModalActions
        onClose={onClose}
        onSubmit={local.detect}
        busy={local.detecting}
        disabled={local.detecting}
        submitLabel={t("agyImportLocalSubmit")}
      />
    </div>
  );
}

function InputModeToggle({
  value,
  onChange,
  uploadLabel,
  pasteLabel,
}: {
  value: AgyInputMode;
  onChange: (next: AgyInputMode) => void;
  uploadLabel: string;
  pasteLabel: string;
}) {
  return (
    <SegmentedControl
      size="sm"
      value={value}
      onChange={(next) => onChange(next as AgyInputMode)}
      options={[
        { value: "upload", label: uploadLabel },
        { value: "paste", label: pasteLabel },
      ]}
    />
  );
}

function SingleSourceInput({ single }: { single: ReturnType<typeof useSingleImport> }) {
  const t = useTranslations("providers");
  const [mode, setMode] = useState<AgyInputMode>("upload");
  return (
    <>
      <InputModeToggle
        value={mode}
        onChange={setMode}
        uploadLabel={t("agyImportUploadFile")}
        pasteLabel={t("agyImportPasteJson")}
      />
      {mode === "upload" ? (
        <div className="space-y-1">
          <Input
            type="file"
            accept=".json"
            aria-label={t("agyImportUploadFile")}
            onChange={single.onFile}
            inputClassName={FILE_INPUT_CLASS}
          />
          <p className="text-[11px] text-text-muted">{t("agyImportFileHint")}</p>
        </div>
      ) : (
        <Textarea
          rows={5}
          aria-label={t("agyImportPasteJson")}
          value={single.pasteText}
          onChange={(e) => single.onPaste(e.target.value)}
          placeholder={SINGLE_PLACEHOLDER}
          className="font-mono text-xs"
        />
      )}
    </>
  );
}

function SingleTab({ onClose, onSuccess }: ImportAgyAuthModalProps) {
  const t = useTranslations("providers");
  const single = useSingleImport(onSuccess);
  return (
    <div className="space-y-4 pt-1">
      <SingleSourceInput single={single} />
      {single.parseError && <p className="text-xs text-error">{single.parseError}</p>}
      {single.detectedEmail && (
        <div className="rounded p-2 bg-success/10 border border-success/20 text-xs text-success">
          {t("agyImportValidToken")} <strong>{single.detectedEmail}</strong>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Input
          label={t("agyImportConnectionName")}
          value={single.name}
          onChange={(e) => single.setName(e.target.value)}
          placeholder={t("agyImportConnectionNamePlaceholder")}
        />
        <Input
          type="email"
          label={t("agyImportEmailLabel")}
          value={single.email}
          onChange={(e) => single.setEmail(e.target.value)}
          placeholder="name@example.com"
        />
      </div>
      <Checkbox
        label={t("agyImportReplaceSingle")}
        checked={single.overwrite}
        onChange={(e) => single.setOverwrite(e.target.checked)}
      />
      <ModalActions
        onClose={onClose}
        onSubmit={single.submit}
        busy={single.submitting}
        disabled={single.submitting || !single.json}
        submitLabel={t("agyImportSubmitSingle")}
      />
    </div>
  );
}

function BulkSourceInput({ bulk }: { bulk: ReturnType<typeof useBulkImport> }) {
  const t = useTranslations("providers");
  const [mode, setMode] = useState<AgyInputMode>("upload");
  return (
    <>
      <InputModeToggle
        value={mode}
        onChange={setMode}
        uploadLabel={t("agyImportUploadFiles")}
        pasteLabel={t("agyImportPasteJsonArray")}
      />
      {mode === "upload" ? (
        <div className="space-y-1">
          <Input
            type="file"
            accept=".json"
            multiple
            aria-label={t("agyImportUploadFiles")}
            onChange={bulk.onFiles}
            inputClassName={FILE_INPUT_CLASS}
          />
          <p className="text-[11px] text-text-muted">{t("agyImportBulkFileHint")}</p>
        </div>
      ) : (
        <Textarea
          rows={5}
          aria-label={t("agyImportPasteJsonArray")}
          value={bulk.pasteText}
          onChange={(e) => bulk.onPaste(e.target.value)}
          placeholder={BULK_PLACEHOLDER}
          className="font-mono text-xs"
        />
      )}
    </>
  );
}

function BulkStagedList({ entries }: { entries: AgyBulkEntry[] }) {
  const t = useTranslations("providers");
  if (!entries.length) return null;
  return (
    <div className="text-xs space-y-1">
      <p className="font-medium">{t("agyImportStaged", { count: entries.length })}</p>
      <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
        {entries.map((e, idx) => (
          <div
            key={`${e.name}-${idx}`}
            className="flex items-center justify-between px-2.5 py-1 rounded bg-bg-subtle border border-border/40"
          >
            <span className="truncate">{e.name}</span>
            {e.parseError ? (
              <span className="text-error text-[11px]">{e.parseError}</span>
            ) : (
              <span className="text-success text-[11px]">{t("agyImportValid")}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BulkResultPanel({ result, errors }: { result: AgyBulkResult; errors: AgyBulkError[] }) {
  const t = useTranslations("providers");
  return (
    <div className="p-3 rounded bg-bg-subtle text-xs space-y-1">
      <p className="font-semibold">{t("agyImportResults")}</p>
      <p className="text-text-muted">{t("agyImportResultsSummary", { ...result })}</p>
      {errors.map((err, i) => (
        <p key={`${err.name}-${i}`} className="text-error text-[11px]">
          {err.name}: {err.message}
        </p>
      ))}
    </div>
  );
}

function BulkTab({ onClose, onSuccess }: ImportAgyAuthModalProps) {
  const t = useTranslations("providers");
  const bulk = useBulkImport(onSuccess);
  return (
    <div className="space-y-4 pt-1">
      <BulkSourceInput bulk={bulk} />
      <BulkStagedList entries={bulk.entries} />
      {bulk.result && <BulkResultPanel result={bulk.result} errors={bulk.errors} />}
      <Checkbox
        label={t("agyImportReplaceBulk")}
        checked={bulk.overwrite}
        onChange={(e) => bulk.setOverwrite(e.target.checked)}
      />
      <ModalActions
        onClose={onClose}
        onSubmit={bulk.submit}
        busy={bulk.submitting}
        disabled={bulk.submitting || !bulk.entries.length}
        submitLabel={t("agyImportSubmitBulk")}
      />
    </div>
  );
}

export function ImportAgyAuthModal({ onClose, onSuccess }: ImportAgyAuthModalProps) {
  const t = useTranslations("providers");
  const [topTab, setTopTab] = useState<AgyImportTopTab>("local");

  return (
    <Modal isOpen onClose={onClose} title={t("agyImportTitle")} size="lg">
      <div className="space-y-4">
        <SegmentedControl
          size="sm"
          value={topTab}
          onChange={(next) => setTopTab(next as AgyImportTopTab)}
          options={[
            { value: "local", label: t("agyImportTabLocal") },
            { value: "single", label: t("agyImportTabSingle") },
            { value: "bulk", label: t("agyImportTabBulk") },
          ]}
        />
        {topTab === "local" && <LocalTab onClose={onClose} onSuccess={onSuccess} />}
        {topTab === "single" && <SingleTab onClose={onClose} onSuccess={onSuccess} />}
        {topTab === "bulk" && <BulkTab onClose={onClose} onSuccess={onSuccess} />}
      </div>
    </Modal>
  );
}
