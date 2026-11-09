"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { csvToJsonl, parseCsvHeaders } from "@/lib/batches/csvToJsonl";
import type { WizardCsvMapping, WizardDestination } from "@/lib/batches/types";

const MAPPING_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "" },
  { value: "custom_id", label: "custom_id" },
  { value: "body.messages[0].content", label: "body.messages[0].content" },
  { value: "body.messages[0].role", label: "body.messages[0].role" },
  { value: "body.input", label: "body.input" },
  { value: "body.prompt", label: "body.prompt" },
  { value: "body.max_tokens", label: "body.max_tokens" },
  { value: "body.temperature", label: "body.temperature" },
];

interface ConversionResult {
  rowsParsed: number;
  rowsSkipped: number;
  errors: Array<{ row: number; reason: string }>;
}

interface CsvMappingStepProps {
  csvContent: string;
  mapping: WizardCsvMapping;
  onChange: (mapping: WizardCsvMapping) => void;
  destination: WizardDestination | null;
  onJsonlReady: (jsonl: string, rowsParsed: number, rowsSkipped: number) => void;
}

export default function CsvMappingStep({
  csvContent,
  mapping,
  onChange,
  destination,
  onJsonlReady,
}: CsvMappingStepProps) {
  const t = useTranslations("common");
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  const columns = parseCsvHeaders(csvContent);

  const mappingValues = Object.values(mapping);
  const hasCustomId = mappingValues.includes("custom_id");
  const hasContent =
    mappingValues.some((v) => v.startsWith("body.messages[") && v.endsWith(".content")) ||
    mappingValues.includes("body.input") ||
    mappingValues.includes("body.prompt");

  const isValid = hasCustomId && hasContent;

  function handleColumnMap(column: string, fieldPath: string) {
    const next = { ...mapping };
    if (!fieldPath) {
      delete next[column];
    } else {
      next[column] = fieldPath;
    }
    onChange(next);
  }

  function handleApply() {
    if (!isValid || !destination) return;

    let result: ReturnType<typeof csvToJsonl>;
    try {
      result = csvToJsonl({
        csv: csvContent,
        mapping,
        defaults: {
          method: "POST",
          url: destination.endpoint,
          model: destination.model,
        },
      });
    } catch (err) {
      console.error("[CsvMappingStep] csvToJsonl error:", err);
      return;
    }

    setConversionResult({
      rowsParsed: result.rowsParsed,
      rowsSkipped: result.rowsSkipped,
      errors: result.errors,
    });

    if (result.jsonl) {
      onJsonlReady(result.jsonl, result.rowsParsed, result.rowsSkipped);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-text-main">{t("wizardCsvMappingTitle")}</p>

      {columns.length === 0 && <p className="text-xs text-text-muted">{t("wizardCsvNoColumns")}</p>}

      <div className="flex flex-col gap-3">
        {columns.map((col) => (
          <div key={col} className="flex items-center gap-3">
            <span className="text-xs text-text-muted font-mono min-w-[120px] truncate">{col}</span>
            <span className="text-xs text-text-muted">→</span>
            <Select
              aria-label={col}
              className="flex-1"
              selectClassName="text-xs"
              value={mapping[col] ?? ""}
              onChange={(e) => handleColumnMap(col, e.target.value)}
            >
              {MAPPING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value === "" ? t("wizardCsvIgnoreColumn") : opt.label}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>

      {/* Validation hints */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs">
          <Icon
            name={hasCustomId ? "check_circle" : "radio_button_unchecked"}
            size={14}
            className={hasCustomId ? "text-success" : "text-text-muted"}
          />
          <span className={hasCustomId ? "text-success" : "text-text-muted"}>
            {t("wizardCsvCustomIdMapped")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Icon
            name={hasContent ? "check_circle" : "radio_button_unchecked"}
            size={14}
            className={hasContent ? "text-success" : "text-text-muted"}
          />
          <span className={hasContent ? "text-success" : "text-text-muted"}>
            {t("wizardCsvContentMapped")}
          </span>
        </div>
      </div>

      {/* Apply button */}
      <Button disabled={!isValid || !destination} onClick={handleApply} className="self-start">
        {t("wizardCsvApplyMapping")}
      </Button>

      {/* Conversion feedback */}
      {conversionResult && (
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-success">
            {t("wizardCsvRowsParsed", { count: conversionResult.rowsParsed })}
          </span>
          {conversionResult.rowsSkipped > 0 && (
            <span className="text-warning">
              {t("wizardCsvRowsSkipped", { count: conversionResult.rowsSkipped })}
            </span>
          )}
          {conversionResult.errors.slice(0, 5).map((e) => (
            <span key={e.row} className="text-error">
              {t("wizardCsvRowError", { row: e.row, reason: e.reason })}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
