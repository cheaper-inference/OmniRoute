"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";

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
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (picked) validateAndSet(picked);
    // Reset input so the same file can be re-picked after Remove
    e.target.value = "";
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const picked = e.dataTransfer.files?.[0];
    if (picked) validateAndSet(picked);
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
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors select-none ${
            dragging
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/60 hover:bg-bg-alt"
          }`}
          role="button"
          tabIndex={0}
          aria-label={t("uploadModalDropOrPick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
        >
          <Icon
            name="upload_file"
            size={40}
            className={dragging ? "text-accent" : "text-text-muted"}
          />
          <span className="text-sm text-text-main text-center">{t("uploadModalDropOrPick")}</span>
          <span className="text-xs text-text-muted text-center">{t("uploadModalSizeLimit")}</span>
          {/* kit-exception: Native file picker, hidden behind the drop zone: the adapters have no file
                  input, and this one is driven by the zone's click/keyboard handlers. */}
          <input
            ref={inputRef}
            type="file"
            accept=".jsonl"
            className="hidden"
            onChange={handleInputChange}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
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
