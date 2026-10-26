"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import SegmentedControl from "@/shared/components/SegmentedControl";
import CsvMappingStep from "./CsvMappingStep";
import type { WizardInput, WizardCsvMapping, WizardDestination } from "@/lib/batches/types";

const MAX_FULL_BYTES = 5_000_000; // 5 MB — full read threshold (D7)
const SAMPLE_HEAD_BYTES = 5_000_000;
const SAMPLE_TAIL_BYTES = 100_000;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function readFileContent(file: File): Promise<string> {
  if (file.size <= MAX_FULL_BYTES) {
    return await file.text();
  }
  // Sampling for large files (D7)
  const headText = await file.slice(0, SAMPLE_HEAD_BYTES).text();
  const tailText = await file.slice(file.size - SAMPLE_TAIL_BYTES).text();
  return headText + "\n[...sample only...]\n" + tailText;
}

function getSourceContent(input: WizardInput): string | null | undefined {
  return input.kind === "csv" ? input.csvContent : input.rawContent;
}

interface InputStepProps {
  input: WizardInput;
  onChange: (input: WizardInput) => void;
  destination: WizardDestination | null;
}

export default function InputStep({ input, onChange, destination }: InputStepProps) {
  const t = useTranslations("common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  // B-2b — synchronous stale-proof guard for concurrent drops/picks in the same
  // event-loop tick (React state lags behind dispatches within a tick).
  const isReadingRef = useRef(false);
  const inputRevisionRef = useRef(0);

  const isJsonl = input.kind === "jsonl";
  const isCsv = input.kind === "csv";

  function handleKindChange(kind: "jsonl" | "csv") {
    inputRevisionRef.current += 1;
    onChange({
      kind,
      fileName: null,
      rawContent: null,
      csvMapping: kind === "csv" ? {} : undefined,
    });
  }

  async function processFile(file: File) {
    // B-2/B-2b race guard — ref is checked & flipped synchronously so concurrent
    // calls in the same tick (e.g. drop + file-input-change firing back-to-back)
    // cannot both pass. State mirror is for UI only.
    if (isReadingRef.current) return;
    isReadingRef.current = true;
    const inputRevision = inputRevisionRef.current;
    const expectedExt = isJsonl ? ".jsonl" : ".csv";
    if (!file.name.toLowerCase().endsWith(expectedExt)) {
      // Soft warning — don't block, let validation catch it
    }
    setIsReading(true);
    if (isCsv) onChange({ ...input, rawContent: null });
    try {
      // CSV conversion needs every row; JSONL keeps a bounded preview (D7).
      const content = input.kind === "csv" ? await file.text() : await readFileContent(file);
      // A format change invalidates the pending file without skipping read cleanup.
      if (inputRevision !== inputRevisionRef.current) return;
      onChange({
        kind: input.kind,
        fileName: file.name,
        rawContent: isCsv ? null : content,
        csvContent: isCsv ? content : undefined,
        originalFile: input.kind === "jsonl" ? file : undefined,
        csvMapping: input.kind === "csv" ? (input.csvMapping ?? {}) : undefined,
      });
    } catch (err) {
      console.error("[InputStep] file read error:", err);
    } finally {
      isReadingRef.current = false;
      setIsReading(false);
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be re-picked
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleCsvMappingChange(mapping: WizardCsvMapping) {
    onChange({ ...input, rawContent: null, csvMapping: mapping });
  }

  function handleJsonlReady(jsonl: string, _rowsParsed: number, _rowsSkipped: number) {
    // Replace rawContent with the converted JSONL so validation step gets it
    onChange({ ...input, rawContent: jsonl, csvMapping: input.csvMapping });
  }

  const sourceContent = getSourceContent(input);
  const isLargeFile = sourceContent != null && sourceContent.includes("[...sample only...]");
  const hasFile = input.fileName != null && sourceContent != null;
  const csvMappingReady = isCsv && input.rawContent != null;

  // For CSV: needs mapping complete + jsonl generated to be "ready"
  // rawContent will be updated by handleJsonlReady once mapping applied

  const acceptAttr = isJsonl ? ".jsonl" : ".csv";

  return (
    <div className="flex flex-col gap-6">
      {/* Kind toggle */}
      <SegmentedControl
        aria-label={t("wizardStep2Input")}
        className="self-start"
        value={isJsonl ? "jsonl" : "csv"}
        onChange={(next) => handleKindChange(next as "jsonl" | "csv")}
        options={[
          { value: "jsonl", label: t("wizardInputKindJsonl") },
          { value: "csv", label: t("wizardInputKindCsv") },
        ]}
      />

      {/* Drop zone — disabled while reading to prevent race (B-2) */}
      <div
        role="button"
        tabIndex={isReading ? -1 : 0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isReading && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (isReading) return;
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        aria-disabled={isReading}
        className={`rounded-xl border-2 border-dashed p-8 flex flex-col items-center gap-3 transition-colors
          ${isReading ? "cursor-wait opacity-60 pointer-events-none" : "cursor-pointer"}
          ${isDragging ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"}`}
      >
        <Icon name="upload_file" size={30} className="text-text-muted" />
        {isReading ? (
          <span className="text-sm text-text-muted">{t("wizardInputReading")}</span>
        ) : hasFile ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-text-main font-medium">{input.fileName}</span>
            <span className="text-xs text-text-muted">
              {isLargeFile ? t("wizardInputLargeFileLabel") : t("wizardInputReady")}
            </span>
          </div>
        ) : (
          <span className="text-sm text-text-muted">{t("wizardDropOrPick")}</span>
        )}
        {/* kit-exception: Native file picker, hidden behind the drop zone (the adapters have no file input). */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>

      {/* Large file warning */}
      {isLargeFile && (
        <div className="rounded-lg border border-warning/25 bg-warning/10 px-3 py-2 text-xs text-warning">
          {t("wizardInputLargeFileWarning")}
        </div>
      )}

      {/* CSV mapping (inline step 2.5) */}
      {isCsv && !isReading && hasFile && input.csvContent && (
        <div className="rounded-xl border border-border p-4">
          <CsvMappingStep
            csvContent={input.csvContent}
            mapping={input.csvMapping ?? {}}
            onChange={handleCsvMappingChange}
            destination={destination}
            onJsonlReady={handleJsonlReady}
          />
          {csvMappingReady && (
            <p className="mt-3 text-xs text-success">{t("wizardInputCsvJsonlReady")}</p>
          )}
        </div>
      )}
    </div>
  );
}
