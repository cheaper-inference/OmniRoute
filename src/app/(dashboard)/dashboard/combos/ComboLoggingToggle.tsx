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

/**
 * Per-combo "Logging" switch. ON by default; turning it off withholds request
 * and response message content from call logs for every request routed through
 * this combo. Metadata (timestamp, model, provider, status, duration, token
 * counts, errors) is still recorded.
 */
export default function ComboLoggingToggle({ config, setConfig, t }: Props) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Checkbox
        id="comboNoLog"
        data-testid="combo-logging-enabled"
        checked={config.noLog !== true}
        onChange={(e) => setConfig({ ...config, noLog: !e.target.checked })}
        className="text-xs text-text-muted"
        label={getI18nOrFallback(t, "comboLoggingToggle", "Logging")}
      />
      <InfoTooltip
        text={getI18nOrFallback(
          t,
          "advancedHelp.comboLogging",
          "When off, every request routed through this combo stores only call-log metadata: timestamp, model, provider, status, duration, token counts and errors. Request and response message content is never saved. This adds a combo-level opt-out; it does not change existing API-key or request-header controls."
        )}
      />
    </div>
  );
}
