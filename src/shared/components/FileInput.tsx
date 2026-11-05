"use client";

import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import {
  FileDropZone as KitFileDropZone,
  FileInput as KitFileInput,
  type FileDropZoneProps,
  type FileInputProps,
} from "@omniroute/ui-kit/file-input";

export type {
  FileDropZoneProps,
  FileInputProps,
  FileRejection,
} from "@omniroute/ui-kit/file-input";

/**
 * FileInput — the kit file picker (`@omniroute/ui-kit/file-input`) with translated text
 * defaults. The kit's `chooseLabel`, `emptyLabel` and `selectedLabel` default to English; this
 * adapter fills them from the `common` namespace, and any prop passed by the caller wins.
 * `onFilesChange` receives the files that passed `accept` / `maxSize` / `multiple`; the rest go to
 * `onFilesRejected`. The kit clears the native value after each change, so the same file can be
 * picked again.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { multiple = false, chooseLabel, emptyLabel, selectedLabel, ...props },
  ref
) {
  const t = useTranslations("common");
  return (
    <KitFileInput
      ref={ref}
      multiple={multiple}
      chooseLabel={chooseLabel ?? t(multiple ? "fileInputChooseMultiple" : "fileInputChoose")}
      emptyLabel={emptyLabel ?? t("fileInputEmpty")}
      selectedLabel={
        selectedLabel ??
        ((files) =>
          files.length === 1 ? files[0].name : t("fileInputSelectedCount", { count: files.length }))
      }
      {...props}
    />
  );
});

/**
 * FileDropZone — the kit drop target around a hidden native file input, with a translated
 * `dropLabel` default (the zone's title and the input's accessible name).
 */
export const FileDropZone = forwardRef<HTMLInputElement, FileDropZoneProps>(function FileDropZone(
  { multiple = false, dropLabel, ...props },
  ref
) {
  const t = useTranslations("common");
  return (
    <KitFileDropZone
      ref={ref}
      multiple={multiple}
      dropLabel={dropLabel ?? t(multiple ? "fileDropLabelMultiple" : "fileDropLabel")}
      {...props}
    />
  );
});
