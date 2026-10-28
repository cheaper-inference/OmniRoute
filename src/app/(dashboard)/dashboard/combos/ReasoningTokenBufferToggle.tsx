import Checkbox from "@/shared/components/Checkbox";
import InfoTooltip from "@/shared/components/InfoTooltip";

type TranslationFn = {
  (key: string): string;
  has?: (key: string) => boolean;
};

type Props = {
  config: Record<string, any>;
  setConfig: (config: Record<string, any>) => void;
  t: TranslationFn;
};

function getI18nOrFallback(t: TranslationFn, key: string, fallback: string): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key);
  } catch {}
  return fallback;
}

export default function ReasoningTokenBufferToggle({ config, setConfig, t }: Props) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Checkbox
        id="reasoningTokenBufferEnabled"
        data-testid="combo-reasoning-token-buffer-enabled"
        checked={config.reasoningTokenBufferEnabled !== false}
        onChange={(e) => setConfig({ ...config, reasoningTokenBufferEnabled: e.target.checked })}
        className="text-xs text-text-muted"
        label={getI18nOrFallback(t, "reasoningTokenBuffer", "Reasoning token buffer")}
      />
      <InfoTooltip
        text={getI18nOrFallback(
          t,
          "advancedHelp.reasoningTokenBuffer",
          "When enabled (default), OmniRoute may increase max_tokens for reasoning-capable models so they have headroom to think. Turn this off if you need this combo to preserve the client's exact max_tokens."
        )}
      />
    </div>
  );
}
