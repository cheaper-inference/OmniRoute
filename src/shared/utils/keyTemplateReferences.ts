import { KEY_TEMPLATE_ALL_COMBOS_RULE } from "../types/keyTemplates.ts";

const PATTERN_CHARS = /[*?[\]]/;

/**
 * Only concrete combo names require a database reference. `combo/*` and
 * wildcard patterns are not literals; an `rt-` prefix alone is not a wildcard.
 */
export function isLiteralKeyTemplateComboReference(name: string): boolean {
  return name !== KEY_TEMPLATE_ALL_COMBOS_RULE && !PATTERN_CHARS.test(name);
}
