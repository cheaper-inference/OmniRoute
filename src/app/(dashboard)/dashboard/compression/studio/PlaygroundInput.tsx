"use client";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Textarea from "@/shared/components/Textarea";
export const LANE_ENGINES = [
  "session-dedup",
  "ccr",
  "lite",
  "rtk",
  "ionizer",
  "headroom",
  "caveman",
  "aggressive",
  "ultra",
] as const;
export interface PlaygroundInputProps {
  text: string;
  onText: (t: string) => void;
  active: string[];
  onToggleActive: (engine: string) => void;
  onRun: () => void;
  loading: boolean;
  fidelityGate: boolean;
  onToggleFidelity: () => void;
  fuzzyDedup: boolean;
  onToggleFuzzy: () => void;
  riskGate: boolean;
  onToggleRisk: () => void;
  quantumLock: boolean;
  onToggleQuantum: () => void;
  heatmap: "ultra" | "universal" | false;
  onToggleHeatmap: () => void;
}

function EngineOptions({
  active,
  onToggleActive,
}: {
  active: string[];
  onToggleActive: (engine: string) => void;
}) {
  const t = useTranslations("compressionStudio");
  return (
    <div>
      <CheckboxGroup label={t("activeCombined")} className="gap-1">
        {LANE_ENGINES.map((engine) => (
          <Checkbox
            key={engine}
            label={engine}
            checked={active.includes(engine)}
            onChange={() => onToggleActive(engine)}
          />
        ))}
        <Checkbox
          disabled
          label={
            <>
              llmlingua <span className="text-[10px]">({t("requiresOnnx")})</span>
            </>
          }
        />
      </CheckboxGroup>
    </div>
  );
}

function ToggleOption({
  testId,
  checked,
  onChange,
  children,
  className = "text-sm",
}: {
  testId: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Checkbox
      className={className}
      data-testid={testId}
      checked={checked}
      onChange={onChange}
      label={children}
    />
  );
}

export function PlaygroundInput({
  text,
  onText,
  active,
  onToggleActive,
  onRun,
  loading,
  fidelityGate,
  onToggleFidelity,
  fuzzyDedup,
  onToggleFuzzy,
  riskGate,
  onToggleRisk,
  quantumLock,
  onToggleQuantum,
  heatmap,
  onToggleHeatmap,
}: PlaygroundInputProps) {
  const t = useTranslations("compressionStudio");
  return (
    <div className="flex flex-col gap-3">
      <Textarea
        data-testid="play-input"
        aria-label={t("inputPlaceholder")}
        className="min-h-[160px] w-full font-mono text-xs"
        value={text}
        onChange={(e) => onText(e.target.value)}
        placeholder={t("inputPlaceholder")}
      />
      <EngineOptions active={active} onToggleActive={onToggleActive} />
      <ToggleOption testId="fidelity-toggle" checked={fidelityGate} onChange={onToggleFidelity}>
        {t("verifyFidelity")}
      </ToggleOption>
      <ToggleOption testId="fuzzy-toggle" checked={fuzzyDedup} onChange={onToggleFuzzy}>
        {t("fuzzyDedup")}
      </ToggleOption>
      <ToggleOption testId="risk-toggle" checked={riskGate} onChange={onToggleRisk}>
        {t("protectSensitive")}
      </ToggleOption>
      <ToggleOption
        testId="quantum-toggle"
        checked={quantumLock}
        onChange={onToggleQuantum}
        className="text-xs"
      >
        {t("quantumLock")}
      </ToggleOption>
      <ToggleOption
        testId="heatmap-toggle"
        checked={Boolean(heatmap)}
        onChange={onToggleHeatmap}
        className="text-xs"
      >
        {t("saliencyHeatmap")} {heatmap ? `(${heatmap})` : ""}
      </ToggleOption>
      <Button
        data-testid="play-run"
        icon="play_arrow"
        fullWidth
        onClick={onRun}
        loading={loading}
        disabled={loading}
      >
        {loading ? t("running") : t("run")}
      </Button>
    </div>
  );
}
