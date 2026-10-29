"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import { ModelSelectorModal } from "./ModelSelectorModal";

export interface MappingRow {
  source: string;
  target: string;
}

interface ModelMappingTableProps {
  agentId: string;
  mappings: MappingRow[];
  onSave: (agentId: string, mappings: MappingRow[]) => Promise<void>;
}

/**
 * Editable table: source model → target OmniRoute model.
 */
export function ModelMappingTable({ agentId, mappings, onSave }: ModelMappingTableProps) {
  const t = useTranslations("agentBridge");
  const [rows, setRows] = useState<MappingRow[]>(mappings);
  const [selectorOpen, setSelectorOpen] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const updateTarget = (index: number, target: string) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, target } : r)));
    setSelectorOpen(null);
  };

  const addMapping = () => {
    setRows((prev) => [...prev, { source: "", target: "" }]);
  };

  const removeMapping = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSource = (index: number, source: string) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, source } : r)));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(agentId, rows);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {rows.length === 0 ? (
        <div className="rounded-control border border-border bg-bg-subtle px-4 py-6 text-center">
          <p className="mb-3 text-xs text-text-muted">
            {t("noMappingsDesc") ||
              "No model mappings configured yet. Add mappings to route agent requests through OmniRoute."}
          </p>
          <Button size="sm" variant="secondary" icon="add" onClick={addMapping}>
            {t("addMapping") || "Add mapping"}
          </Button>
        </div>
      ) : (
        <>
          <Table className="text-sm" scrollbarLabel={t("modelMappingsLabel")}>
            <TableHeader>
              <TableRow>
                <TableHead>{t("sourceModel") || "Source model (agent native)"}</TableHead>
                <TableHead>{t("targetModel") || "Target model (OmniRoute)"}</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">{t("removeMapping")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input
                      type="text"
                      value={row.source}
                      onChange={(e) => updateSource(i, e.target.value)}
                      aria-label={t("sourceModel") || "Source model (agent native)"}
                      placeholder={t("mappingSourcePlaceholder")}
                      inputClassName="font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      className="justify-between font-mono"
                      aria-label={`${t("targetModel") || "Target model (OmniRoute)"}: ${row.target || t("selectModel") || "Select…"}`}
                      onClick={() => setSelectorOpen(i)}
                    >
                      {row.target || (
                        <span className="text-text-muted italic">
                          {t("selectModel") || "Select…"}
                        </span>
                      )}
                      <Icon name="expand_more" size={12} className="text-text-muted" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      icon="delete"
                      onClick={() => removeMapping(i)}
                      aria-label={t("removeMapping")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-text-muted">{t("mappingWildcardHint")}</p>

          <div className="flex items-center justify-between">
            <Button size="sm" variant="outline" icon="add" onClick={addMapping}>
              {t("addMapping") || "Add mapping"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? t("saving") || "Saving…" : t("saveMappings") || "Save mappings"}
            </Button>
          </div>
        </>
      )}

      {selectorOpen !== null && (
        <ModelSelectorModal
          open
          currentModel={rows[selectorOpen]?.target ?? ""}
          onSelect={(model) => updateTarget(selectorOpen, model)}
          onClose={() => setSelectorOpen(null)}
        />
      )}
    </div>
  );
}
