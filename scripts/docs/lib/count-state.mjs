import { createHash } from "node:crypto";

export const contentHash = (text) => createHash("sha256").update(text).digest("hex");
const fail = (code, source) => {
  throw Object.assign(new Error(`${code}:${source}`), { code, path: source });
};

// Same source-section contract as run-translation: frontmatter/H1 stripped,
// ## boundaries outside fences, trimmed section text, first12 SHA256 digits.
export function sourceSectionHashes(text) {
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "").replace(/^# .+\r?\n+/, "");
  const sections = [[]];
  let fenced = false;
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (!fenced && /^## /.test(line) && sections.at(-1).length) sections.push([]);
    sections.at(-1).push(line);
  }
  return sections.map((lines) => contentHash(lines.join("\n").trim()).slice(0, 12));
}

export function strictMirrorBody(text) {
  const separator = text.match(/^---\s*$/m);
  if (!separator || separator.index === undefined) fail("COUNT_STRICT_MIRROR_HEADER", "llm.txt");
  return text
    .slice(separator.index + separator[0].length)
    .trimStart()
    .replace(/\r\n/g, "\n");
}

// Locate values by JSON pointer, never by searching for a repeated hash. Only
// existing string leaves are replaced; every other byte remains unchanged.
export function patchJsonStringLeaves(text, leaves) {
  JSON.parse(text);
  const desired = new Map(leaves.map((leaf) => [JSON.stringify(leaf.pointer), leaf]));
  if (desired.size !== leaves.length) fail("COUNT_STATE_DUPLICATE_LEAF", ".i18n-state.json");
  const edits = [];
  const located = new Set();
  let at = 0;
  const ws = () => {
    while (/\s/.test(text[at] ?? "") && at < text.length) at++;
  };
  const stringEnd = () => {
    const start = at++;
    while (at < text.length) {
      if (text[at] === "\\") at += 2;
      else if (text[at++] === '"') return { start, end: at };
    }
    fail("COUNT_STATE_INVALID_STRING", ".i18n-state.json");
  };
  function visit(pointer) {
    ws();
    if (text[at] === "{") {
      at++;
      ws();
      if (text[at] === "}") {
        at++;
        return;
      }
      while (at < text.length) {
        ws();
        const token = stringEnd();
        const key = JSON.parse(text.slice(token.start, token.end));
        ws();
        if (text[at++] !== ":") fail("COUNT_STATE_INVALID_OBJECT", ".i18n-state.json");
        visit([...pointer, key]);
        ws();
        if (text[at++] === "}") return;
      }
    } else if (text[at] === "[") {
      at++;
      ws();
      let index = 0;
      if (text[at] === "]") {
        at++;
        return;
      }
      while (at < text.length) {
        visit([...pointer, index++]);
        ws();
        if (text[at++] === "]") return;
      }
    } else if (text[at] === '"') {
      const token = stringEnd();
      const key = JSON.stringify(pointer);
      const leaf = desired.get(key);
      if (leaf) {
        if (located.has(key)) fail("COUNT_STATE_DUPLICATE_KEY", ".i18n-state.json");
        located.add(key);
        if (
          JSON.parse(text.slice(token.start, token.end)) !== leaf.before ||
          typeof leaf.after !== "string"
        )
          fail("COUNT_STATE_LEAF_PREIMAGE", ".i18n-state.json");
        edits.push({ ...token, key, value: JSON.stringify(leaf.after) });
      }
    } else {
      while (at < text.length && !/[\s,}\]]/.test(text[at])) at++;
    }
  }
  visit([]);
  ws();
  if (at !== text.length || edits.length !== leaves.length)
    fail("COUNT_STATE_LEAF_MISSING", ".i18n-state.json");
  // Build once: repeated whole-document replacement is quadratic for the large
  // translation state even when only a few thousand existing leaves change.
  const chunks = [];
  let previous = 0;
  for (const edit of edits.sort((a, b) => a.start - b.start)) {
    chunks.push(text.slice(previous, edit.start), edit.value);
    previous = edit.end;
  }
  chunks.push(text.slice(previous));
  const result = chunks.join("");
  JSON.parse(result);
  return result;
}

export function planCountState({
  stateText,
  families,
  locales,
  before,
  after,
  generatedPaths = [],
}) {
  const changed = (file) => before.get(file) !== after.get(file);
  const affected = families.filter(
    (source) =>
      source !== "llm.txt" &&
      (changed(source) || locales.some((locale) => changed(`docs/i18n/${locale}/${source}`)))
  );
  const translatedGenerated = generatedPaths.filter((source) => /\.(?:md|txt)$/.test(source));
  if (!affected.length && !translatedGenerated.some(changed))
    return { text: stateText, leaves: [], affected: [] };
  if (!stateText) fail("COUNT_STATE_MISSING", ".i18n-state.json");
  const state = JSON.parse(stateText);
  for (const source of translatedGenerated) {
    if (changed(source) && Object.keys(state.sources?.[source]?.locales ?? {}).length)
      fail("COUNT_TRANSLATION_REQUIRED", source);
  }
  const leaves = [];
  const add = (pointer, oldValue, newValue) => {
    if (oldValue !== newValue) leaves.push({ pointer, before: oldValue, after: newValue });
  };
  for (const source of affected) {
    const entry = state.sources?.[source];
    const sourceBefore = contentHash(before.get(source));
    const sourceAfter = contentHash(after.get(source));
    if (!entry || entry.source_hash !== sourceBefore) fail("COUNT_STATE_SOURCE_PREIMAGE", source);
    const cacheBefore = sourceSectionHashes(before.get(source));
    const cacheAfter = sourceSectionHashes(after.get(source));
    if (cacheBefore.length !== cacheAfter.length) fail("COUNT_STATE_SECTION_SHAPE", source);
    for (const locale of locales) {
      const target = `docs/i18n/${locale}/${source}`;
      const info = entry.locales?.[locale];
      if (
        !info ||
        info.source_hash !== sourceBefore ||
        info.target_hash !== contentHash(before.get(target))
      )
        fail("COUNT_STATE_TARGET_PREIMAGE", target);
      if (Object.hasOwn(info, "section_hashes")) {
        if (JSON.stringify(info.section_hashes) !== JSON.stringify(cacheBefore))
          fail("COUNT_STATE_CACHE_PREIMAGE", target);
        cacheAfter.forEach((value, index) =>
          add(
            ["sources", source, "locales", locale, "section_hashes", index],
            info.section_hashes[index],
            value
          )
        );
      }
      add(["sources", source, "locales", locale, "source_hash"], info.source_hash, sourceAfter);
      add(
        ["sources", source, "locales", locale, "target_hash"],
        info.target_hash,
        contentHash(after.get(target))
      );
    }
    add(["sources", source, "source_hash"], entry.source_hash, sourceAfter);
  }
  return { text: patchJsonStringLeaves(stateText, leaves), leaves, affected };
}
