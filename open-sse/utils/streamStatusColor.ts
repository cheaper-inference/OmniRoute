import { COLORS } from "./usageTracking.ts";

type ColorEnv = Record<string, string | undefined>;

/**
 * Whether the terminal `[STREAM]` status gets an ANSI color. Opt-in only:
 * - `APP_LOG_COLORS=true|1|yes|on` forces it on, `false|0|no|off` forces it off;
 * - otherwise it is on only when stdout is a TTY and `NO_COLOR` is not set.
 * Docker, journald and log collectors (non-TTY stdout) therefore keep plain text by default.
 * Read at call time so a per-process override is honoured.
 */
export function shouldColorStreamStatus(
  env: ColorEnv = process.env,
  isTTY: boolean | undefined = process.stdout?.isTTY
): boolean {
  const explicit = env.APP_LOG_COLORS?.trim().toLowerCase();
  if (explicit && ["1", "true", "yes", "on"].includes(explicit)) return true;
  if (explicit && ["0", "false", "no", "off"].includes(explicit)) return false;
  if (env.NO_COLOR !== undefined) return false;
  return isTTY === true;
}

/** Color terminal status text only; file logging strips ANSI decoration. */
export function formatStreamStatus(status: string, colored = shouldColorStreamStatus()): string {
  if (!colored) return status;
  let color = "";
  if (status === "complete") color = COLORS.green;
  else if (status.startsWith("client_disconnect") || status === "aborted") color = COLORS.yellow;
  else if (status.startsWith("error:")) color = COLORS.red;
  return color ? `${color}${status}${COLORS.reset}` : status;
}
