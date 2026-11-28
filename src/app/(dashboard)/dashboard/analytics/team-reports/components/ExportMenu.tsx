"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";

import { Button } from "@/shared/components";

import { EXPORT_FORMATS, type ExportFormat } from "../reportExport";
import type { ExportNoteState } from "../useReportExport";

interface ExportMenuProps {
  /** The trigger's label. */
  label: string;
  onExport: (format: ExportFormat) => void;
  disabled?: boolean;
  /** Why the menu is disabled; shown on hover and read by screen readers. */
  disabledHint?: string;
}

/** A CSV / JSON choice behind one button. */
export default function ExportMenu({ label, onExport, disabled, disabledHint }: ExportMenuProps) {
  const t = useTranslations("reports");
  const hintId = useId();
  const hinted = Boolean(disabled && disabledHint);
  return (
    <span className="inline-flex" title={hinted ? disabledHint : undefined}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            disabled={disabled}
            aria-describedby={hinted ? hintId : undefined}
          >
            {label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          {EXPORT_FORMATS.map((format) => (
            <DropdownMenuItem key={format} onSelect={() => onExport(format)}>
              {t(format === "csv" ? "exportAsCsv" : "exportAsJson")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {hinted && (
        <span id={hintId} className="sr-only">
          {disabledHint}
        </span>
      )}
    </span>
  );
}

/** The outcome of the last download: a truncation note (status) or a failure (alert). */
export function ExportNote({ note }: { note: ExportNoteState | null }) {
  if (!note) return null;
  return note.failed ? (
    <p role="alert" className="text-sm text-error">
      {note.text}
    </p>
  ) : (
    <p role="status" className="text-sm text-text-muted">
      {note.text}
    </p>
  );
}
