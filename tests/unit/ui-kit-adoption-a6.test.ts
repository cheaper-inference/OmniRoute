import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit, slice A6: the context, playground, webhooks, translator,
// media-providers, compression, search-tools, memory and orchestration screens. Each test
// keeps one hand-made pattern from coming back to these folders once the kit API replaced
// it. A kept occurrence is listed with its reason; a listed one that no longer exists fails
// too, so the lists cannot go stale.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DASH = "src/app/(dashboard)/dashboard";
const AREAS = [
  "context",
  "playground",
  "webhooks",
  "translator",
  "media-providers",
  "compression",
  "search-tools",
  "memory",
  "orchestration",
];

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

/** Path relative to the dashboard folder, e.g. `memory/components/tabs/MemoriesTab.tsx`. */
const rel = (p: string) => path.relative(path.join(ROOT, DASH), p).split(path.sep).join("/");

const SOURCES = AREAS.flatMap((area) => walk(path.join(ROOT, DASH, area))).map((file) => ({
  file: rel(file),
  source: fs.readFileSync(file, "utf8"),
}));

test("the slice scans the nine A6 areas", () => {
  assert.ok(SOURCES.length > 150, `only ${SOURCES.length} files found`);
  for (const area of AREAS)
    assert.ok(
      SOURCES.some((s) => s.file.startsWith(`${area}/`)),
      `no file under ${area}/`
    );
});

// ── Flow nodes ───────────────────────────────────────────────────────────────────────────

test("flow nodes: every canvas node is framed by the kit FlowNode", () => {
  const nodes = SOURCES.filter((s) => /\/nodes\/[A-Z]\w*Node\.tsx$/.test(s.file));
  assert.deepEqual(nodes.map((n) => n.file).sort(), [
    "compression/studio/nodes/EngineNode.tsx",
    "compression/studio/nodes/IoNode.tsx",
    "orchestration/nodes/ActivityNode.tsx",
    "orchestration/nodes/OrchestratorNode.tsx",
    "orchestration/nodes/OverflowNode.tsx",
    "orchestration/nodes/SourceNode.tsx",
    "orchestration/nodes/WorkNode.tsx",
  ]);
  for (const { file, source } of nodes) {
    assert.match(source, /<FlowNode\b/, `${file} renders the kit FlowNode`);
    // The frame is the kit's: no hand-made border + background + radius box, no glow, and no
    // text under the 12px floor (the kit node sets 12px, and 14px for the `md` title).
    assert.doesNotMatch(source, /className="[^"]*\brounded-(?:lg|xl)\b[^"]*\bborder/, file);
    assert.doesNotMatch(source, /boxShadow|borderColor/, `${file} draws no frame colour by hand`);
    assert.doesNotMatch(source, /text-\[\d+px\]/, `${file} sets no text size by hand`);
  }
});

test("flow nodes: labels come from the message catalog, not fixed English", () => {
  const read = (file: string) => SOURCES.find((s) => s.file === file)?.source ?? "";
  const io = read("compression/studio/nodes/IoNode.tsx");
  assert.match(io, /useTranslations\("compressionStudio"\)/);
  assert.doesNotMatch(io, /"Input"|"Output"|>tokens</);
  const engine = read("compression/studio/nodes/EngineNode.tsx");
  assert.match(engine, /useTranslations\("compressionStudio"\)/);
  assert.doesNotMatch(engine, />skip</);
});
