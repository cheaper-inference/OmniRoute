"use client";

import { Toggle } from "@/shared/components";
import { providerText } from "../providerCredentialText";

/**
 * Standalone per-model "Logging" toggle, rendered beside (not inside) the
 * Compatibility popover — the user asked for it next to the button.
 *
 * Semantics (independent of connection/global, per the settled answers):
 *   - ON  (checked): this model logs its call-log payloads
 *   - OFF (checked=false): this model withholds message content
 * The toggle writes `noLog` (true = withhold). Parent-level connection/global
 * toggles can still force no-log via the chatCore OR — this toggle is never
 * disabled by them, and never re-enables logging on its own.
 *
 * Shared by ModelRow (built-in list) and PassthroughModelRow / CustomModels
 * (custom list) so both sections stay in sync.
 */
export default function ModelLoggingToggle({
  modelNoLog,
  compatSaving,
  disabled,
  t,
  onToggleLogging,
}: {
  /** Per-model no-log flag as persisted (undefined = unset = logging ON). */
  modelNoLog: boolean | undefined;
  compatSaving?: boolean;
  disabled?: boolean;
  t: (key: string) => string;
  onToggleLogging: (nextLoggingEnabled: boolean) => void;
}) {
  const loggingEnabled = modelNoLog !== true;
  const label = providerText(t, "modelLoggingToggle", "Logging");
  return (
    <Toggle
      size="sm"
      label={label}
      title={label}
      checked={loggingEnabled}
      disabled={disabled || compatSaving}
      onChange={onToggleLogging}
    />
  );
}
