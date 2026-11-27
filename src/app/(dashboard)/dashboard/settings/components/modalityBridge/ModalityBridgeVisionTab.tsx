"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Field } from "@omniroute/ui-kit/field";

import {
  Card,
  Collapsible,
  ModelSelectField,
  NumberInput,
  Select,
  Textarea,
  Toggle,
} from "@/shared/components";
import {
  MODALITY_BRIDGE_DEFAULTS,
  resolveVisionBridgeRuntimeSettings,
  type VisionBridgeMode,
} from "@/shared/constants/modalityBridgeDefaults";
import { VISION_BRIDGE_DEFAULTS } from "@/shared/constants/visionBridgeDefaults";

import ModalityBridgeStatsRow from "./ModalityBridgeStatsRow";
import ModalityBridgeTestButton from "./ModalityBridgeTestButton";

interface VisionState {
  modalityBridgeVisionEnabled: boolean;
  modalityBridgeVisionMode: VisionBridgeMode;
  modalityBridgeVisionModel: string;
  modalityBridgeVisionTaskAware: boolean;
  visionBridgeRerouteTextOnly: boolean;
  modalityBridgeVisionPrompt: string;
  modalityBridgeVisionTimeout: number;
  modalityBridgeVisionMaxImages: number;
  modalityBridgeVisionMaxChars: number;
  modalityBridgeCacheEnabled: boolean;
  modalityBridgeCacheTtlMinutes: number;
  modalityBridgeCacheMaxEntries: number;
}

function fromApi(data: Record<string, unknown>): VisionState {
  const runtime = resolveVisionBridgeRuntimeSettings(data);
  return {
    modalityBridgeVisionEnabled: runtime.enabled,
    modalityBridgeVisionMode: runtime.mode,
    modalityBridgeVisionModel: runtime.model,
    modalityBridgeVisionTaskAware: runtime.taskAware,
    visionBridgeRerouteTextOnly: data.visionBridgeRerouteTextOnly === true,
    modalityBridgeVisionPrompt: runtime.prompt,
    modalityBridgeVisionTimeout: runtime.timeoutMs,
    modalityBridgeVisionMaxImages: runtime.maxImages,
    modalityBridgeVisionMaxChars: runtime.maxChars,
    modalityBridgeCacheEnabled: runtime.cacheEnabled,
    modalityBridgeCacheTtlMinutes: runtime.cacheTtlMinutes,
    modalityBridgeCacheMaxEntries: runtime.cacheMaxEntries,
  };
}

// The field already brings an edited value into min/max when the edit ends; an empty field
// (`null`) falls back to the default. The clamp stays as the last guard before the PATCH.
function clampNumber(value: number | null, min: number, max: number, fallback: number): number {
  return Math.min(max, Math.max(min, Math.trunc(value ?? fallback)));
}

export default function ModalityBridgeVisionTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<VisionState | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (cancelled) return;
        setSettings(fromApi(asSettingsRecord(data)));
      })
      .catch(() => {
        if (!cancelled) setSettings(fromApi({}));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = async (patch: Partial<VisionState>) => {
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
      console.error("Failed to update Modality Bridge settings:", error);
    }
  };

  if (!settings) return null;

  const setLocal = (patch: Partial<VisionState>) => {
    setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
  };

  const commitNumber = (
    key:
      | "modalityBridgeVisionTimeout"
      | "modalityBridgeVisionMaxImages"
      | "modalityBridgeCacheTtlMinutes"
      | "modalityBridgeCacheMaxEntries",
    next: number | null,
    min: number,
    max: number,
    fallback: number
  ) => {
    const value = clampNumber(next, min, max, fallback);
    setLocal({ [key]: value });
    void update({ [key]: value });
  };

  const commitMaxChars = (next: number | null) => {
    // 0 disables the cap and is a valid value in its own right — only values
    // between 1 and 99 (below the schema's floor) get pulled up to 100.
    const value =
      next !== null && next <= 0
        ? 0
        : clampNumber(next, 100, 50000, MODALITY_BRIDGE_DEFAULTS.visionMaxChars);
    setLocal({ modalityBridgeVisionMaxChars: value });
    void update({ modalityBridgeVisionMaxChars: value });
  };

  return (
    <Card
      title={t("modalityBridgeVisionTitle")}
      subtitle={t("modalityBridgeVisionDesc")}
      icon="image_search"
    >
      <div className="space-y-4">
        <Toggle
          checked={settings.modalityBridgeVisionEnabled}
          onChange={(checked) => void update({ modalityBridgeVisionEnabled: checked })}
          label={t("visionBridgeEnabledLabel")}
          description={t("visionBridgeEnabledDesc")}
        />

        <Toggle
          checked={settings.visionBridgeRerouteTextOnly}
          onChange={(checked) => void update({ visionBridgeRerouteTextOnly: checked })}
          label={t("visionBridgeRerouteTextOnlyLabel")}
          description={t("visionBridgeRerouteTextOnlyDesc")}
        />

        <Select
          id="modality-bridge-mode"
          data-testid="modality-bridge-mode"
          label={t("modalityBridgeMode")}
          value={settings.modalityBridgeVisionMode}
          onChange={(event) =>
            void update({ modalityBridgeVisionMode: event.target.value as VisionBridgeMode })
          }
          hint={
            settings.modalityBridgeVisionMode === "auto"
              ? t("modalityBridgeModeAutoHint")
              : settings.modalityBridgeVisionMode === "describe"
                ? t("modalityBridgeModeDescribeHint")
                : t("modalityBridgeModeRerouteHint")
          }
        >
          <option value="auto">{t("modalityBridgeModeAuto")}</option>
          <option value="describe">{t("modalityBridgeModeDescribe")}</option>
          <option value="reroute">{t("modalityBridgeModeReroute")}</option>
        </Select>

        <ModelSelectField
          label={t("modalityBridgeVisionModel")}
          value={settings.modalityBridgeVisionModel}
          placeholder={t("modalityBridgeVisionModelAuto")}
          allowEmpty
          // #10809: read the unified catalog (all configured providers +
          // user-added custom models — matching the Audio tab's modelSource)
          // so active upstream vision models are never missed. #10703: the
          // filter still lists only vision-capable models, so text-only code
          // models (cmd/gpt-5.3-codex, cmd/deepseek/deepseek-v4-pro, …) never
          // appear as Vision Bridge candidates. allowCustomInput keeps an
          // editable text field so operators can type a self-hosted / unlisted
          // vision model.
          modelSource="catalog"
          modelFilter={(model) => model.supportsVision === true}
          allowCustomInput
          testId="modality-bridge-vision-model"
          onChange={(value) => void update({ modalityBridgeVisionModel: value })}
          className="text-sm"
        />

        <Toggle
          checked={settings.modalityBridgeVisionTaskAware}
          onChange={(checked) => void update({ modalityBridgeVisionTaskAware: checked })}
          label={t("modalityBridgeTaskAware")}
          description={t("modalityBridgeTaskAwareDesc")}
        />

        <Field label={t("modalityBridgePrompt")} htmlFor="modality-bridge-prompt">
          <Textarea
            id="modality-bridge-prompt"
            className="min-h-[100px]"
            value={settings.modalityBridgeVisionPrompt}
            onChange={(event) =>
              setLocal({ modalityBridgeVisionPrompt: event.currentTarget.value })
            }
            onBlur={(event) => {
              const value = event.currentTarget.value.trim();
              setLocal({ modalityBridgeVisionPrompt: value });
              void update({ modalityBridgeVisionPrompt: value });
            }}
          />
        </Field>

        <Collapsible title={t("modalityBridgeAdvanced")} icon="tune">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              data-testid="modality-bridge-timeout"
              label={t("modalityBridgeTimeoutMs")}
              min={1000}
              max={300000}
              value={settings.modalityBridgeVisionTimeout}
              onValueChange={(value) => setLocal({ modalityBridgeVisionTimeout: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeVisionTimeout",
                  next,
                  1000,
                  300000,
                  VISION_BRIDGE_DEFAULTS.timeoutMs
                )
              }
            />
            <NumberInput
              data-testid="modality-bridge-max-images"
              label={t("modalityBridgeMaxImages")}
              min={1}
              max={20}
              value={settings.modalityBridgeVisionMaxImages}
              onValueChange={(value) => setLocal({ modalityBridgeVisionMaxImages: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeVisionMaxImages",
                  next,
                  1,
                  20,
                  VISION_BRIDGE_DEFAULTS.maxImagesPerRequest
                )
              }
            />
            <NumberInput
              data-testid="modality-bridge-max-chars"
              label={t("visionMaxCharsLabel")}
              hint={t("visionMaxCharsHint")}
              min={0}
              max={50000}
              placeholder="0"
              value={settings.modalityBridgeVisionMaxChars}
              onValueChange={(value) => setLocal({ modalityBridgeVisionMaxChars: value ?? 0 })}
              onValueCommit={(next) => commitMaxChars(next)}
            />
            <div className="md:col-span-2">
              <Toggle
                checked={settings.modalityBridgeCacheEnabled}
                onChange={(checked) => void update({ modalityBridgeCacheEnabled: checked })}
                label={t("modalityBridgeCacheEnabled")}
                description={t("modalityBridgeCacheEnabledDesc")}
              />
            </div>
            <NumberInput
              data-testid="modality-bridge-cache-ttl"
              label={t("modalityBridgeCacheTtlMinutes")}
              min={1}
              max={1440}
              value={settings.modalityBridgeCacheTtlMinutes}
              onValueChange={(value) => setLocal({ modalityBridgeCacheTtlMinutes: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeCacheTtlMinutes",
                  next,
                  1,
                  1440,
                  MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes
                )
              }
            />
            <NumberInput
              data-testid="modality-bridge-cache-max-entries"
              label={t("modalityBridgeCacheMaxEntries")}
              min={10}
              max={5000}
              value={settings.modalityBridgeCacheMaxEntries}
              onValueChange={(value) => setLocal({ modalityBridgeCacheMaxEntries: value ?? 0 })}
              onValueCommit={(next) =>
                commitNumber(
                  "modalityBridgeCacheMaxEntries",
                  next,
                  10,
                  5000,
                  MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries
                )
              }
            />
          </div>
        </Collapsible>

        <ModalityBridgeStatsRow kind="vision" />
        <ModalityBridgeTestButton />
      </div>
    </Card>
  );
}

function asSettingsRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}
