import fs from "node:fs";
import { applyEdits, modify, parse, printParseErrorCode, type ParseError } from "jsonc-parser";

import { readPrivateConfigFile } from "../privateConfigFile";

/**
 * Write `patches` into the JSON/JSONC file at `configPath` and return the new text, leaving every
 * other key (and comment) as it was. A missing file starts from `{}`. A file that does not parse
 * aborts instead of being replaced.
 */
export function mergeJsonConfig(
  configPath: string | undefined,
  patches: Array<[path: string[], value: unknown]>
): string {
  let text = "{}";
  if (configPath && fs.existsSync(configPath)) {
    text = readPrivateConfigFile(configPath);
    const errors: ParseError[] = [];
    const parsed = parse(text, errors, { allowTrailingComma: true });
    if (errors.length > 0 || !parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      const detail = errors[0] ? printParseErrorCode(errors[0].error) : "root must be an object";
      throw new Error(
        `Existing ${configPath} is not a valid JSON object (${detail}); refusing to overwrite it.`
      );
    }
  }
  for (const [path, value] of patches) {
    text = applyEdits(
      text,
      modify(text, path, value, { formattingOptions: { insertSpaces: true, tabSize: 2 } })
    );
  }
  return text;
}

/** Read one value from existing JSON text, or undefined. */
export function readJsonValue(configPath: string | undefined, path: string[]): unknown {
  if (!configPath || !fs.existsSync(configPath)) return undefined;
  let node: unknown = parse(readPrivateConfigFile(configPath), [], { allowTrailingComma: true });
  for (const key of path) {
    if (!node || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return node;
}
