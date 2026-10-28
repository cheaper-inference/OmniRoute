"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import FilesListTab from "../FilesListTab";
import FilesConceptCard from "../components/FilesConceptCard";
import UploadFileModal from "../components/UploadFileModal";
import { mapFileApiToRecord, mapBatchApiToRecord } from "../batch-utils";
import type { FileRecord } from "@/lib/db/files";
import type { BatchRecord } from "@/lib/db/batches";

export default function BatchFilesPage() {
  const t = useTranslations("common");
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [filesTotal, setFilesTotal] = useState(0);
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [filesRes, batchesRes] = await Promise.all([
        fetch("/api/v1/files?limit=20"),
        fetch("/api/v1/batches?limit=20"),
      ]);
      if (filesRes.ok) {
        const data = await filesRes.json();
        setFiles((data.data || []).map(mapFileApiToRecord));
        setFilesTotal(data.total_count || 0);
      }
      if (batchesRes.ok) {
        const data = await batchesRes.json();
        setBatches((data.data || []).map(mapBatchApiToRecord));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  return (
    <div className="flex flex-col gap-6">
      <FilesConceptCard />
      <div className="flex justify-end">
        <Button icon="upload" onClick={() => setShowUpload(true)}>
          {t("filesListUploadButton")}
        </Button>
      </div>
      <FilesListTab
        files={files}
        filesTotal={filesTotal}
        loading={loading}
        onRefresh={fetchAll}
        batches={batches}
      />
      {showUpload && (
        <UploadFileModal
          onClose={() => setShowUpload(false)}
          onUploaded={() => {
            setShowUpload(false);
            void fetchAll();
          }}
        />
      )}
    </div>
  );
}
