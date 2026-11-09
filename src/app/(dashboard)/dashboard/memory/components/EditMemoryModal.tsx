"use client";

import { useId, useState } from "react";
import { Modal, Button, Input, Select } from "@/shared/components";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import Textarea from "@/shared/components/Textarea";

interface Memory {
  id: string;
  type: "factual" | "episodic" | "procedural" | "semantic";
  key: string;
  content: string;
  metadata: Record<string, unknown>;
}

interface Props {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditMemoryModal({ memory, isOpen, onClose, onSaved }: Props) {
  const t = useTranslations("memory");
  const [type, setType] = useState<"factual" | "episodic" | "procedural" | "semantic">("factual");
  const [key, setKey] = useState("");
  const contentId = useId();
  const metadataId = useId();
  const [content, setContent] = useState("");
  const [metadataStr, setMetadataStr] = useState("{}");
  const [metadataError, setMetadataError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Adjust-during-render (React docs pattern): when the modal (re)opens for a
  // memory, seed the form fields from it before painting — no effect round-trip.
  const [prevSync, setPrevSync] = useState<{ memory: Memory | null; isOpen: boolean }>({
    memory: null,
    isOpen: false,
  });
  if (memory !== prevSync.memory || isOpen !== prevSync.isOpen) {
    setPrevSync({ memory, isOpen });
    if (memory && isOpen) {
      setType(memory.type);
      setKey(memory.key);
      setContent(memory.content);
      setMetadataStr(JSON.stringify(memory.metadata ?? {}, null, 2));
      setMetadataError("");
      setError("");
    }
  }

  const handleMetadataChange = (value: string) => {
    setMetadataStr(value);
    try {
      JSON.parse(value);
      setMetadataError("");
    } catch {
      setMetadataError(t("editModal.metadataInvalid"));
    }
  };

  const handleSave = async () => {
    if (!memory) return;
    if (metadataError) return;
    setIsSaving(true);
    setError("");
    try {
      let metadata: Record<string, unknown> = {};
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        setError(t("editModal.metadataInvalid"));
        return;
      }
      const res = await fetch(`/api/memory/${memory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, key, content, metadata }),
      });
      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error?.message ?? t("editModal.saveFailed"));
      }
    } catch {
      setError(t("editModal.saveFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("editModal.title")}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            disabled={!key.trim() || !content.trim() || Boolean(metadataError)}
          >
            {t("save")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-xs text-error">
            {error}
          </div>
        )}
        <Select
          label={t("type")}
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="w-full"
        >
          <option value="factual">{t("factual")}</option>
          <option value="episodic">{t("episodic")}</option>
          <option value="procedural">{t("procedural")}</option>
          <option value="semantic">{t("semantic")}</option>
        </Select>
        <Input
          label={t("key")}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={t("keyPlaceholder")}
          className="w-full"
        />
        <Field label={t("content")} htmlFor={contentId}>
          <Textarea
            id={contentId}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("contentPlaceholder")}
            rows={4}
            className="resize-y text-sm"
          />
        </Field>
        <Field
          label={t("editModal.metadataLabel")}
          htmlFor={metadataId}
          error={metadataError || undefined}
        >
          <Textarea
            id={metadataId}
            value={metadataStr}
            onChange={(e) => handleMetadataChange(e.target.value)}
            rows={4}
            spellCheck={false}
            error={Boolean(metadataError)}
            className="resize-y font-mono text-xs"
          />
        </Field>
      </div>
    </Modal>
  );
}
