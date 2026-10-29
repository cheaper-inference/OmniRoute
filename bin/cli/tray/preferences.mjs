import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { resolveDataDir } from "../data-dir.mjs";
import { writePrivateFileAtomic } from "../private-file.mjs";

const preferenceSchema = z.object({ version: z.literal(1), tray: z.boolean() });

/** Shared CLI preference; absent or invalid files leave each caller's legacy default intact. */
export function loadTrayPreference() {
  try {
    const parsed = preferenceSchema.safeParse(
      JSON.parse(readFileSync(join(resolveDataDir(), "tray-preferences.json"), "utf8"))
    );
    return parsed.success ? parsed.data.tray : undefined;
  } catch {
    return undefined;
  }
}

export function saveTrayPreference(tray) {
  const preference = preferenceSchema.parse({ version: 1, tray });
  writePrivateFileAtomic(
    join(resolveDataDir(), "tray-preferences.json"),
    `${JSON.stringify(preference, null, 2)}\n`
  );
}

export function resolveTrayPreference(options = {}, fallback = false) {
  return typeof options.tray === "boolean" ? options.tray : (loadTrayPreference() ?? fallback);
}
