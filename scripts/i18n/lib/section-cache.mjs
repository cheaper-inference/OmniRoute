import crypto from "node:crypto";

const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n+/;
const FENCE_LINE = /^\s*(```|~~~)/;

export function stripFrontMatter(markdown) {
  return markdown.replace(FRONT_MATTER, "");
}

export function stripTopHeading(markdown) {
  return stripFrontMatter(markdown).replace(/^# .+\r?\n+/, "");
}

// Section 0 is the preamble (text before the first `## `); every other section
// starts with its `## ` heading line. Joining with "\n\n" reproduces the body
// modulo trailing whitespace. A `## ` inside a fenced code block never splits.
export function splitSections(markdown) {
  const sections = [[]];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (FENCE_LINE.test(line)) inFence = !inFence;
    if (!inFence && /^## /.test(line) && sections.at(-1).length) sections.push([]);
    sections.at(-1).push(line);
  }
  return sections.map((s) => s.join("\n").replace(/\s+$/, ""));
}

export function sectionHashes(sections) {
  return sections.map((s) =>
    crypto.createHash("sha256").update(s.trim(), "utf8").digest("hex").slice(0, 12)
  );
}

// A cache can only describe one exact source snapshot, in the same section
// order. Missing or malformed cache values cannot contradict that snapshot
// and still authorize reuse. Callers without an exact snapshot cannot infer
// consistency from a timestamp or the current source alone.
export function sectionCacheMatchesSnapshot(previousHashes, exactSections) {
  return (
    Array.isArray(previousHashes) &&
    Array.isArray(exactSections) &&
    previousHashes.length === exactSections.length &&
    sectionHashes(exactSections).every((hash, i) => hash === previousHashes[i])
  );
}
