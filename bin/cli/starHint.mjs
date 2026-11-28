import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "./data-dir.mjs";
import { t } from "./i18n.mjs";

const OMNIROUTE_REPO_URL = "https://github.com/cheaper-inference/OmniRoute";

/**
 * @param {{ json?: boolean, output?: string, quiet?: boolean }} opts
 * @param {{ isTTY?: boolean, dataDir?: string, write?: (line: string) => void }} deps
 */
export function maybePrintStarHint(opts = {}, deps = {}) {
  const { isTTY = process.stdout.isTTY, write = console.log } = deps;
  if (!isTTY || opts.json || opts.quiet || (opts.output && opts.output !== "table")) return false;

  try {
    const dataDir = deps.dataDir ?? resolveDataDir();
    mkdirSync(dataDir, { recursive: true });
    // An exclusive create lets only one CLI process claim the hint.
    writeFileSync(join(dataDir, ".star-hint-shown"), "", { flag: "wx" });
  } catch {
    return false;
  }

  write(t("common.starHint", { url: OMNIROUTE_REPO_URL }));
  return true;
}
