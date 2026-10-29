"use client";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import Select from "@/shared/components/Select";

// src/app/(dashboard)/dashboard/playground/components/PresetPicker.tsx

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePresets } from "../hooks/usePresets";
import type { ConfigState, ConfigStateSetter } from "./StudioConfigPane";

interface PresetPickerProps {
  configState: ConfigState;
  setConfigState: ConfigStateSetter;
}

/**
 * PresetPicker — load/save playground presets.
 *
 * Presets are stored in DB via /api/playground/presets (F3 backend).
 * Load applies preset values to configState; Save opens a name-input modal.
 */
export default function PresetPicker({ configState, setConfigState }: PresetPickerProps) {
  const t = useTranslations("playground");
  const { presets, loading, list, create, remove } = usePresets();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    void list();
  }, [list]);

  function handleLoad(presetId: string) {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;

    setConfigState((current) => ({
      ...current,
      endpoint: preset.endpoint as ConfigState["endpoint"],
      model: preset.model,
      systemPrompt: preset.system ?? current.systemPrompt,
      params: {
        ...current.params,
        ...(typeof preset.params === "object" && preset.params != null ? preset.params : {}),
      },
    }));
  }

  async function handleSave() {
    if (!presetName.trim()) {
      setSaveError(t("nameRequired"));
      return;
    }

    setSaving(true);
    setSaveError(null);

    const result = await create({
      name: presetName.trim(),
      endpoint: configState.endpoint,
      model: configState.model,
      system: configState.systemPrompt || null,
      params: configState.params as Record<string, unknown>,
    });

    setSaving(false);

    if (result == null) {
      setSaveError(t("failedToSavePreset"));
      return;
    }

    setSaveModalOpen(false);
    setPresetName("");
  }

  function openSave() {
    setSaveModalOpen(true);
    setPresetName("");
    setSaveError(null);
  }

  function closeSave() {
    setSaveModalOpen(false);
    setPresetName("");
    setSaveError(null);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {t("presetsLabel")}
        </span>

        {/* Load preset select (native kit select: the value is reset after each load) */}
        <div className="flex items-center gap-2">
          <Select
            disabled={loading || presets.length === 0}
            onChange={(e) => {
              if (e.target.value) {
                handleLoad(e.target.value);
                // Reset select to placeholder after loading
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="flex-1"
            selectClassName="text-xs"
            aria-label={t("loadPreset")}
          >
            <option value="" disabled>
              {loading
                ? t("loadingPresets")
                : presets.length === 0
                  ? t("noPresets")
                  : t("loadPresetPlaceholder")}
            </option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={openSave}
            className="shrink-0 text-xs"
            aria-label={t("savePreset")}
          >
            {t("save")}
          </Button>
        </div>

        {/* Preset list with delete buttons (compact) */}
        {presets.length > 0 && (
          <div className="flex flex-col gap-1">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center justify-between text-[11px] text-text-muted hover:text-text-main group"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLoad(preset.id)}
                  className="h-auto min-h-0 flex-1 justify-start truncate px-1 py-0.5 text-left text-[11px] font-normal"
                  aria-label={`Load preset "${preset.name}"`}
                >
                  {preset.name}
                  <span className="ml-1.5 opacity-60">{preset.model}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => void remove(preset.id)}
                  className="text-text-muted hover:text-error opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                  aria-label={`Delete preset "${preset.name}"`}
                  icon="delete"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save preset modal (kit Dialog via the Modal adapter: focus trap, Escape, portal) */}
      <Modal
        isOpen={saveModalOpen}
        onClose={closeSave}
        title={t("savePreset")}
        size="sm"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeSave}>
              {t("cancel")}
            </Button>
            <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
              {saving ? t("savingPreset") : t("save")}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleSave();
            }}
            placeholder={t("presetNamePlaceholder")}
            aria-label={t("presetNamePlaceholder")}
            autoFocus
            error={saveError ?? undefined}
          />
        </div>
      </Modal>
    </>
  );
}
