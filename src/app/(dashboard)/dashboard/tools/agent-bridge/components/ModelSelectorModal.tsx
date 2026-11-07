"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import { cn } from "@/shared/utils/cn";
import { matchesSearch } from "@/shared/utils/turkishText";

interface ProviderModel {
  id: string;
  name: string;
}

interface ModelSelectorModalProps {
  open: boolean;
  currentModel: string;
  onSelect: (model: string) => void;
  onClose: () => void;
}

/**
 * Modal for picking an OmniRoute target model for model-mapping.
 */
export function ModelSelectorModal({
  open,
  currentModel,
  onSelect,
  onClose,
}: ModelSelectorModalProps) {
  const t = useTranslations("agentBridge");
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadModels = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/v1/models");
      const d = (await r.json()) as { data?: ProviderModel[] };
      setModels(Array.isArray(d.data) ? d.data : []);
    } catch {
      setModels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void (async () => {
      await loadModels();
    })();
  }, [open, loadModels]);

  if (!open) return null;

  const filtered = models.filter(
    (model) => matchesSearch(model.id, search) || matchesSearch(model.name, search)
  );

  return (
    <Modal isOpen={open} onClose={onClose} title={t("modelSelectorTitle")} size="sm">
      <div className="flex max-h-[60vh] flex-col gap-2">
        <Input
          type="search"
          icon="search"
          autoFocus
          aria-label={t("modelSelectorSearch")}
          placeholder={t("modelSelectorSearch")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {loading && (
            <p className="py-4 text-center text-xs text-text-muted" role="status">
              {t("loading")}
            </p>
          )}
          {!loading && filtered.length === 0 && (
            <p className="py-4 text-center text-xs text-text-muted">{t("noModelsFound")}</p>
          )}
          {filtered.map((m) => (
            <Button
              key={m.id}
              variant="ghost"
              size="sm"
              fullWidth
              aria-current={m.id === currentModel ? "true" : undefined}
              className={cn(
                "h-auto justify-start py-2 text-left",
                m.id === currentModel && "bg-bg-subtle font-semibold"
              )}
              onClick={() => onSelect(m.id)}
            >
              <span className="truncate font-mono text-xs">{m.id}</span>
              {m.name !== m.id && (
                <span className="ml-2 truncate text-xs text-text-muted">{m.name}</span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
