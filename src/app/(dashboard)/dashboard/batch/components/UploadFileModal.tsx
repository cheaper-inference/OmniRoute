"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { FileDropZone } from "@/shared/components/FileInput";

const MAX_BYTES = 512 * 1024 * 1024; // 512 MB

interface Props {
  onClose: () => void;
  onUploaded: (fileId: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadFileModal({ onClose, onUploaded }: Props) {
  const t = useTranslations("common");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Escape, the overlay click and the focus trap come from the Modal adapter (kit Dialog).

  function validateAndSet(picked: File) {
    setError(null);
    if (!picked.name.endsWith(".jsonl")) {
      setError(t("uploadModalError"));
      return;
    }
    if (picked.size > MAX_BYTES) {
      setError(t("uploadModalError"));
      return;
    }
    setFile(picked);
  }

  async function handleUpload() {
    if (!file || uploading) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("purpose", "batch"); // D22 hardcoded
      form.append("file", file);
      const res = await fetch("/api/v1/files", { method: "POST", body: form });
      if (!res.ok) {
        setError(t("uploadModalError"));
        return;
      }
      const data = (await res.json()) as { id: string };
      onUploaded(data.id);
      onClose();
    } catch (err) {
      console.error("[UploadFileModal]", err);
      setError(t("uploadModalError"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="md"
      title={
        <span className="flex items-center gap-2">
          <Icon name="upload_file" size={20} className="text-accent" />
          {t("uploadModalTitle")}
        </span>
      }
      bodyClassName="px-6 py-5 flex flex-col gap-4"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {t("uploadModalCancel")}
          </Button>
          <Button
            onClick={() => void handleUpload()}
            disabled={!file || uploading}
            className="gap-2"
          >
            {uploading ? (
              <>
                <Icon name="progress_activity" size={16} className="animate-spin" />
                {t("uploadFileModalUploading")}
              </>
            ) : (
              <>
                <Icon name="upload" size={16} />
                {t("uploadModalUpload")}
              </>
            )}
          </Button>
        </>
      }
    >
      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-error/10 border border-error/25 text-error text-sm"
        >
          <Icon name="error" size={16} />
          {error}
        </div>
      )}

      {/* Drop zone or file info */}
      {!file ? (
        <FileDropZone
          accept=".jsonl"
          maxSize={MAX_BYTES}
          dropLabel={t("uploadModalDropOrPick")}
          description={t("uploadModalSizeLimit")}
          invalid={error !== null}
          onFilesChange={(files) => validateAndSet(files[0])}
          onFilesRejected={(rejections) => {
            // A second file dropped on this single-file zone is ignored, like before; a wrong
            // extension or a file over 512 MB shows the error banner.
            if (rejections.some((rejection) => rejection.reason !== "count")) {
              setError(t("uploadModalError"));
            }
          }}
        />
      ) : (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-alt border border-border">
          <Icon name="description" size={24} className="text-accent" />
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-sm font-medium text-text-main truncate" title={file.name}>
              {file.name}
            </span>
            <span className="text-xs text-text-muted">{formatBytes(file.size)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFile(null);
              setError(null);
            }}
            className="shrink-0 text-xs text-text-muted hover:text-error hover:border-error/40"
          >
            {t("uploadFileModalRemove")}
          </Button>
        </div>
      )}
    </Modal>
  );
}
