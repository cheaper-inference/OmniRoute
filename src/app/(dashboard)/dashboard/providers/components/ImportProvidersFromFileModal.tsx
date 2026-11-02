"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Button, Checkbox, Modal } from "@/shared/components";
import type {
  ParsedProviderImportEntry,
  ProviderImportParseError,
} from "./parseProviderImportFile";
import { useImportProvidersFromFile } from "./useImportProvidersFromFile";
import {
  downloadProviderImportCsvTemplate,
  formatImportErrorLine,
  visibleImportErrors,
  type ImportResult,
} from "./providerImportFeedback";

interface ImportProvidersFromFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: () => Promise<void>;
}

type Translator = (key: string, values?: Record<string, unknown>) => string;

const PARSE_ERROR_REASON_KEYS = [
  "importErrorMissingProvider",
  "importErrorMissingName",
  "importErrorMissingApiKey",
  "importErrorInvalidPriority",
  "importErrorMalformedRow",
  "importErrorNotArray",
] as const;

/** Per-row parse error list. Split out of the modal to keep it under the LOC ratchet. */
function ParseErrorsList({ errors, t }: { errors: ProviderImportParseError[]; t: Translator }) {
  if (errors.length === 0) return null;
  return (
    <div className="max-h-28 overflow-y-auto rounded border border-error/30 bg-error/10 p-2">
      {errors.map((err, idx) => (
        <div key={idx} className="text-xs text-error">
          {t("importFromFileErrorLine", {
            line: err.line,
            reason: t(
              PARSE_ERROR_REASON_KEYS.includes(
                err.reason as (typeof PARSE_ERROR_REASON_KEYS)[number]
              )
                ? err.reason
                : "importErrorMalformedRow"
            ),
          })}
        </div>
      ))}
    </div>
  );
}

interface EntriesTableProps {
  entries: ParsedProviderImportEntry[];
  selected: Set<number>;
  onToggleRow: (idx: number) => void;
  onToggleAll: (checked: boolean) => void;
  t: Translator;
}

/** Parsed-rows selection checklist (acceptance criterion #3 of #6836). */
function EntriesTable({ entries, selected, onToggleRow, onToggleAll, t }: EntriesTableProps) {
  if (entries.length === 0) return null;
  return (
    <>
      <div className="text-xs text-text-muted">
        {t("importFromFileSelectHint", { count: selected.size, total: entries.length })}
      </div>
      <Table
        className="text-xs"
        containerClassName="max-h-64 overflow-y-auto"
        scrollbarLabel={t("importFromFileTitle")}
      >
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selected.size === entries.length}
                onChange={(e) => onToggleAll(e.target.checked)}
              />
            </TableHead>
            <TableHead>{t("importFromFileColProvider")}</TableHead>
            <TableHead>{t("importFromFileColName")}</TableHead>
            <TableHead>{t("importFromFileColBaseUrl")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox checked={selected.has(idx)} onChange={() => onToggleRow(idx)} />
              </TableCell>
              <TableCell className="font-mono text-text-muted">{entry.provider}</TableCell>
              <TableCell className="font-medium text-text-main">{entry.name}</TableCell>
              <TableCell className="text-text-muted">{entry.baseUrl || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

interface FilePickerRowProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string;
  onFile: (file: File) => void;
  t: Translator;
}

/** File-input trigger + chosen filename display. */
function FilePickerRow({ fileInputRef, fileName, onFile, t }: FilePickerRowProps) {
  return (
    <div className="flex items-center gap-3">
      {/* kit-exception: Hidden native file input, opened by the Button below (no visible raw control). */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.json,text/csv,application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      <Button
        size="sm"
        variant="secondary"
        icon="upload_file"
        onClick={() => fileInputRef.current?.click()}
      >
        {t("importFromFileChoose")}
      </Button>
      {fileName && <span className="text-xs text-text-muted font-mono">{fileName}</span>}
    </div>
  );
}

function ImportResultPanel({ result, t }: { result: ImportResult; t: Translator }) {
  const { shown, extra } = visibleImportErrors(result.errors);
  const failed = result.failed > 0 || shown.length > 0;
  return (
    <div
      className={`px-3 py-2 rounded border text-sm ${
        failed
          ? "border-warning/30 bg-warning/10 text-warning"
          : "border-success/30 bg-success/10 text-success"
      }`}
    >
      {t("importFromFileResult", { success: result.success, failed: result.failed })}
      {shown.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-xs text-text-muted font-normal space-y-0.5">
          {shown.map((err, i) => (
            <li key={i}>{formatImportErrorLine(err)}</li>
          ))}
          {extra > 0 && <li>{t("importFromFileMoreErrors", { count: extra })}</li>}
        </ul>
      )}
    </div>
  );
}

/**
 * Wizard step: upload a CSV/JSON file listing MULTIPLE, possibly different providers,
 * pick which parsed rows to actually import, then submit them in one batch (#6836).
 * Mirrors `ProxyBulkImportModal.tsx`'s parse → review → execute UX. State/handlers live
 * in `useImportProvidersFromFile`; presentation-only pieces are split into the small
 * components above so this component itself stays under the LOC ratchet.
 */
export function ImportProvidersFromFileModal({
  isOpen,
  onClose,
  onImported,
}: ImportProvidersFromFileModalProps) {
  const t = useTranslations("providers");
  const s = useImportProvidersFromFile(onImported);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => s.handleClose(onClose)}
      title={t("importFromFileTitle")}
      maxWidth="xl"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">{t("importFromFileDescription")}</p>
        <p className="text-xs text-text-muted">{t("importFromFileSchemaHint")}</p>

        <FilePickerRow
          fileInputRef={s.fileInputRef}
          fileName={s.fileName}
          onFile={s.handleFile}
          t={t}
        />
        <ParseErrorsList errors={s.errors} t={t} />
        <EntriesTable
          entries={s.entries}
          selected={s.selected}
          onToggleRow={s.toggleRow}
          onToggleAll={s.toggleAll}
          t={t}
        />

        {s.result && <ImportResultPanel result={s.result} t={t} />}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button size="sm" variant="ghost" onClick={downloadProviderImportCsvTemplate}>
            {t("importFromFileDownloadTemplate")}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => s.handleClose(onClose)}>
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            icon="upload"
            onClick={s.handleExecute}
            loading={s.importing}
            disabled={s.selected.size === 0 || s.importing}
          >
            {s.importing
              ? t("importFromFileImporting")
              : t("importFromFileImport", { count: s.selected.size })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
