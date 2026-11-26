"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Card, Collapsible, ModelSelectField, NumberInput, Toggle } from "@/shared/components";
import type { ApiModel } from "@/shared/components/ModelSelectField";
import {
  MODALITY_BRIDGE_DEFAULTS,
  resolveAudioBridgeRuntimeSettings,
} from "@/shared/constants/modalityBridgeDefaults";

import ModalityBridgeAudioTestButton from "./ModalityBridgeAudioTestButton";
import ModalityBridgeStatsRow from "./ModalityBridgeStatsRow";

interface AudioState {
  modalityBridgeAudioEnabled: boolean;
  modalityBridgeAudioModel: string;
  modalityBridgeAudioTimeout: number;
  modalityBridgeAudioMaxClips: number;
}

function fromApi(data: Record<string, unknown>): AudioState {
  const runtime = resolveAudioBridgeRuntimeSettings(data);
  return {
    modalityBridgeAudioEnabled: runtime.enabled,
    modalityBridgeAudioModel: runtime.model,
    modalityBridgeAudioTimeout: runtime.timeoutMs,
    modalityBridgeAudioMaxClips: runtime.maxClips,
  };
}

function asSettingsRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

// The field already brings an edited value into min/max when the edit ends; an empty field
// (`null`) falls back to the default. The clamp stays as the last guard before the PATCH.
function clampNumber(value: number | null, min: number, max: number, fallback: number): number {
  return Math.min(max, Math.max(min, Math.trunc(value ?? fallback)));
}

export default function ModalityBridgeAudioTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<AudioState | null>(null);
  const isSttModel = useCallback(
    (model: ApiModel) => model.type === "audio" && model.subtype === "transcription",
    []
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (!cancelled) setSettings(fromApi(asSettingsRecord(data)));
      })
      .catch(() => {
        if (!cancelled) setSettings(fromApi({}));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = async (patch: Partial<AudioState>) => {
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (response.ok) {
        setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
      }
    } catch (error) {
      console.error("Failed to update Audio Bridge settings:", error);
    }
  };

  if (!settings) return null;

  const setLocal = (patch: Partial<AudioState>) => {
    setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
  };
  const commitNumber = (
    key: "modalityBridgeAudioTimeout" | "modalityBridgeAudioMaxClips",
    next: number | null,
    min: number,
    max: number,
    fallback: number
  ) => {
    const value = clampNumber(next, min, max, fallback);
    setLocal({ [key]: value });
    void update({ [key]: value });
  };

  return (
    <Card
      title={t("modalityBridgeAudioTitle")}
      subtitle={t("modalityBridgeAudioDesc")}
      icon="graphic_eq"
    >
      <div className="space-y-4">
        <Toggle
          checked={settings.modalityBridgeAudioEnabled}
          onChange={(checked) => void update({ modalityBridgeAudioEnabled: checked })}
          label={t("modalityBridgeAudioEnabled")}
          description={t("modalityBridgeAudioEnabledDesc")}
        />

        <ModelSelectField
          label={t("modalityBridgeAudioModel")}
          value={settings.modalityBridgeAudioModel}
          placeholder={t("modalityBridgeAudioModelAuto")}
          allowEmpty
          modelFilter={isSttModel}
          modelSource="catalog"
          onChange={(value) => void update({ modalityBridgeAudioModel: value })}
          className="text-sm"
        />

        <Collapsible title={t("modalityBridgeAdvanced")} icon="tune">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              data-testid="modality-bridge-audio-timeout"
              label={t("modalityBridgeTimeoutMs")}
              min={1000}
              max={300000}
              value={settings.modalityBridgeAudioTimeout}
              onValueChange={(value) => setLocal({ modalityBridgeAudioTimeout: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeAudioTimeout",
                  next,
                  1000,
                  300000,
                  MODALITY_BRIDGE_DEFAULTS.audioTimeoutMs
                )
              }
            />
            <NumberInput
              data-testid="modality-bridge-audio-max-clips"
              label={t("modalityBridgeAudioMaxClips")}
              min={1}
              max={10}
              value={settings.modalityBridgeAudioMaxClips}
              onValueChange={(value) => setLocal({ modalityBridgeAudioMaxClips: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeAudioMaxClips",
                  next,
                  1,
                  10,
                  MODALITY_BRIDGE_DEFAULTS.audioMaxClips
                )
              }
            />
          </div>
        </Collapsible>

        <ModalityBridgeStatsRow kind="audio" />
        <ModalityBridgeAudioTestButton />
      </div>
    </Card>
  );
}
