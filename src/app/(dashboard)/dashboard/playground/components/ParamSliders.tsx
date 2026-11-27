"use client";

// src/app/(dashboard)/dashboard/playground/components/ParamSliders.tsx

import { useTranslations } from "next-intl";
import { Slider } from "@omniroute/ui-kit/slider";
import Input from "@/shared/components/Input";
import NumberInput, { whenNumber } from "@/shared/components/NumberInput";
import Toggle from "@/shared/components/Toggle";

export interface PlaygroundParams {
  temperature: number;
  max_tokens: number;
  top_p: number;
  presence_penalty: number;
  frequency_penalty: number;
  seed: number | null;
  stop: string;
  jsonMode: boolean;
  // #6241: canonical reasoning params — surfaced by ReasoningControls only when the selected
  // model supports thinking. `effort: ""` means "not set" (left off the request body).
  effort: string;
  thinking: boolean;
}

export const DEFAULT_PARAMS: PlaygroundParams = {
  temperature: 1.0,
  max_tokens: 1024,
  top_p: 1.0,
  presence_penalty: 0,
  frequency_penalty: 0,
  seed: null,
  stop: "",
  jsonMode: false,
  effort: "",
  thinking: false,
};

interface ParamSlidersProps {
  params: PlaygroundParams;
  setParams: (params: PlaygroundParams) => void;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted font-medium">{label}</span>
        <NumberInput
          size="xs"
          value={value}
          min={min}
          max={max}
          step={step}
          aria-label={label}
          onValueChange={whenNumber((v) => onChange(Math.min(max, Math.max(min, v))))}
          className="w-20 min-w-0"
          inputClassName="text-right"
        />
      </div>
      <Slider
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        showValue={false}
        onValueChange={(next) => onChange(next)}
      />
    </div>
  );
}

/**
 * Sliders for temperature, max_tokens, top_p, penalties, seed, stop, JSON mode.
 * Props: { params, setParams }
 */
export default function ParamSliders({ params, setParams }: ParamSlidersProps) {
  const t = useTranslations("playground");
  function update<K extends keyof PlaygroundParams>(key: K, value: PlaygroundParams[K]) {
    setParams({ ...params, [key]: value });
  }

  return (
    <div className="space-y-3">
      <SliderRow
        label={t("temperature")}
        value={params.temperature}
        min={0}
        max={2}
        step={0.01}
        onChange={(v) => update("temperature", v)}
      />

      <SliderRow
        label={t("maxTokens")}
        value={params.max_tokens}
        min={1}
        max={32768}
        step={1}
        onChange={(v) => update("max_tokens", Math.round(v))}
      />

      <SliderRow
        label={t("topP")}
        value={params.top_p}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => update("top_p", v)}
      />

      <SliderRow
        label={t("presencePenalty")}
        value={params.presence_penalty}
        min={-2}
        max={2}
        step={0.01}
        onChange={(v) => update("presence_penalty", v)}
      />

      <SliderRow
        label={t("frequencyPenalty")}
        value={params.frequency_penalty}
        min={-2}
        max={2}
        step={0.01}
        onChange={(v) => update("frequency_penalty", v)}
      />

      {/* Seed input */}
      <NumberInput
        label={t("seed")}
        size="xs"
        precision={0}
        value={params.seed ?? null}
        placeholder={t("seedPlaceholder")}
        onValueChange={(seed) => update("seed", seed)}
      />

      {/* Stop sequences */}
      <Input
        label={t("stopSequences")}
        type="text"
        value={params.stop}
        placeholder={t("stopSequencesPlaceholder")}
        onChange={(e) => update("stop", e.target.value)}
        size="xs"
      />

      {/* JSON mode toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted font-medium">{t("jsonMode")}</span>
        <Toggle
          size="sm"
          checked={params.jsonMode}
          onChange={() => update("jsonMode", !params.jsonMode)}
          ariaLabel={t("jsonMode")}
        />
      </div>
    </div>
  );
}
