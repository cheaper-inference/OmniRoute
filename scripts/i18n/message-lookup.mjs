const FORBIDDEN_KEY_SEGMENTS = new Set(["__proto__", "prototype", "constructor"]);

/**
 * Read JSON message data in O(path depth), without scanning sibling properties.
 * Own enumerable data properties preserve JSON semantics without invoking accessors.
 */
export function lookupMessagePath(object, parts) {
  let current = object;
  for (const part of parts) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    if (FORBIDDEN_KEY_SEGMENTS.has(part)) return undefined;
    const descriptor = Object.getOwnPropertyDescriptor(current, part);
    if (!descriptor?.enumerable || !("value" in descriptor)) return undefined;
    current = descriptor.value;
  }
  return current;
}
