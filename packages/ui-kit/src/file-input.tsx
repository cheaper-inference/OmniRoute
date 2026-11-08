"use client";

import { forwardRef, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, InputHTMLAttributes, ReactNode } from "react";
import { FileUp, Upload } from "lucide-react";
import { cn } from "./lib/utils";

export type FileRejectionReason = "type" | "size" | "count";

export interface FileRejection {
  file: File;
  reason: FileRejectionReason;
}

/** Mirrors the native `accept` grammar: `.ext`, `type/*` and exact MIME types. */
export function fileMatchesAccept(file: File, accept?: string): boolean {
  if (!accept?.trim()) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
}

/**
 * Splits files into accepted and rejected ones. Each file is checked against
 * `accept`, then `maxSize` (bytes), then — without `multiple` — the one-file limit.
 */
export function partitionFiles(
  files: readonly File[],
  options: { accept?: string; maxSize?: number; multiple?: boolean },
): { accepted: File[]; rejected: FileRejection[] } {
  const accepted: File[] = [];
  const rejected: FileRejection[] = [];
  for (const file of files) {
    if (!fileMatchesAccept(file, options.accept)) rejected.push({ file, reason: "type" });
    else if (options.maxSize != null && file.size > options.maxSize) rejected.push({ file, reason: "size" });
    else if (!options.multiple && accepted.length > 0) rejected.push({ file, reason: "count" });
    else accepted.push(file);
  }
  return { accepted, rejected };
}

type NativeFileProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "size" | "children" | "title"
>;

interface FileSelectionProps extends NativeFileProps {
  /** Accepted files, after `accept`, `maxSize` and `multiple` filtering. */
  onFilesChange?: (files: File[]) => void;
  /** Files dropped or picked that did not pass the filters. */
  onFilesRejected?: (rejections: FileRejection[]) => void;
  /** Maximum size per file, in bytes. */
  maxSize?: number;
  /** Error styling plus `aria-invalid`; pair with a visible message (Field `error`, Alert). */
  invalid?: boolean;
  /**
   * Rendered as `aria-required`, never as the native `required` attribute: the native value is
   * cleared after each change, so native validation would block every form submit. Check for a
   * selected file in your submit handler.
   */
  required?: boolean;
}

function createFileSelector({
  accept,
  maxSize,
  multiple,
  onFilesChange,
  onFilesRejected,
}: Pick<FileSelectionProps, "accept" | "maxSize" | "multiple" | "onFilesChange" | "onFilesRejected">) {
  return (list: FileList | null | undefined) => {
    const { accepted, rejected } = partitionFiles(Array.from(list ?? []), { accept, maxSize, multiple });
    if (rejected.length) onFilesRejected?.(rejected);
    if (accepted.length) onFilesChange?.(accepted);
    return accepted;
  };
}

function mergeIds(...ids: Array<string | undefined | false>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export interface FileInputProps extends FileSelectionProps {
  /**
   * Visible text of the picker control. Defaults to "Choose file" / "Choose files".
   * When naming the input with `aria-label` instead of a `Field`, include this text in it.
   */
  chooseLabel?: string;
  /** Status shown before anything is chosen. Defaults to "No file chosen". */
  emptyLabel?: string;
  /** Status shown after a selection. Defaults to the file name or "N files selected". */
  selectedLabel?: (files: readonly File[]) => string;
  className?: string;
}

/**
 * A button-style native file picker. Compose with `Field` for the visible label.
 * The status line keeps the last accepted selection; when the app clears its selection,
 * remount the component with a new `key` to reset it.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  {
    className,
    id,
    accept,
    multiple = false,
    maxSize,
    disabled,
    invalid = false,
    required,
    "aria-required": ariaRequired,
    chooseLabel,
    emptyLabel = "No file chosen",
    selectedLabel = (files) => (files.length === 1 ? files[0].name : `${files.length} files selected`),
    onFilesChange,
    onFilesRejected,
    "aria-describedby": describedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const statusId = `${inputId}-status`;
  const [chosen, setChosen] = useState<readonly File[]>([]);
  const select = createFileSelector({ accept, maxSize, multiple, onFilesChange, onFilesRejected });
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const accepted = select(event.currentTarget.files);
    if (accepted.length) setChosen(accepted);
    // Clear the native value so picking the same file again fires `change`.
    event.currentTarget.value = "";
  };

  return (
    <div
      data-slot="file-input"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn("ci-file-input", className)}
    >
      <label htmlFor={inputId} className="ci-file-input__control">
        <input
          ref={ref}
          id={inputId}
          type="file"
          className="ci-file-input__native"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-required={required || ariaRequired || undefined}
          aria-describedby={mergeIds(statusId, describedBy)}
          onChange={onChange}
          {...props}
        />
        <span className="ci-file-input__button" aria-hidden="true">
          <Upload />
          {chooseLabel ?? (multiple ? "Choose files" : "Choose file")}
        </span>
      </label>
      <span id={statusId} className="ci-file-input__status">
        {chosen.length ? selectedLabel(chosen) : emptyLabel}
      </span>
    </div>
  );
});

export interface FileDropZoneProps extends FileSelectionProps {
  /** Main line; also the input's accessible name unless `aria-label(ledby)` is passed. */
  dropLabel?: ReactNode;
  /** Secondary line (formats, size limit). Linked through `aria-describedby`. */
  description?: ReactNode;
  /** Defaults to a file-upload icon. */
  icon?: ReactNode;
  className?: string;
}

/** A labelled drop target around a visually hidden native file input. */
export const FileDropZone = forwardRef<HTMLInputElement, FileDropZoneProps>(function FileDropZone(
  {
    className,
    id,
    accept,
    multiple = false,
    maxSize,
    disabled,
    invalid = false,
    required,
    "aria-required": ariaRequired,
    dropLabel,
    description,
    icon,
    onFilesChange,
    onFilesRejected,
    "aria-describedby": describedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": labelledBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const titleId = `${inputId}-title`;
  const descriptionId = description != null ? `${inputId}-description` : undefined;
  const [dragging, setDragging] = useState(false);
  // dragenter/dragleave also fire for child elements; count them to know when the pointer leaves.
  const depth = useRef(0);
  const select = createFileSelector({ accept, maxSize, multiple, onFilesChange, onFilesRejected });
  const stop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const isFileDrag = (event: DragEvent<HTMLLabelElement>) =>
    Array.from(event.dataTransfer?.types ?? []).includes("Files");

  return (
    <label
      htmlFor={inputId}
      data-slot="file-drop-zone"
      data-dragging={dragging || undefined}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn("ci-file-drop-zone", className)}
      onDragEnter={(event) => {
        stop(event);
        if (disabled || !isFileDrag(event)) return;
        depth.current += 1;
        setDragging(true);
      }}
      onDragOver={(event) => {
        stop(event);
        if (event.dataTransfer) event.dataTransfer.dropEffect = disabled ? "none" : "copy";
      }}
      onDragLeave={(event) => {
        stop(event);
        depth.current = Math.max(0, depth.current - 1);
        if (depth.current === 0) setDragging(false);
      }}
      onDrop={(event) => {
        stop(event);
        depth.current = 0;
        setDragging(false);
        if (!disabled) select(event.dataTransfer?.files);
      }}
    >
      <input
        ref={ref}
        id={inputId}
        type="file"
        className="ci-file-drop-zone__native"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-required={required || ariaRequired || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? labelledBy : (labelledBy ?? titleId)}
        aria-describedby={mergeIds(descriptionId, describedBy)}
        onChange={(event) => {
          select(event.currentTarget.files);
          // Clear the native value so picking the same file again fires `change`.
          event.currentTarget.value = "";
        }}
        {...props}
      />
      <span className="ci-file-drop-zone__icon" aria-hidden="true">
        {icon ?? <FileUp />}
      </span>
      <span id={titleId} className="ci-file-drop-zone__title">
        {dropLabel ?? (multiple ? "Drop files here or choose files" : "Drop a file here or choose one")}
      </span>
      {description != null && (
        <span id={descriptionId} className="ci-file-drop-zone__description">
          {description}
        </span>
      )}
    </label>
  );
});
