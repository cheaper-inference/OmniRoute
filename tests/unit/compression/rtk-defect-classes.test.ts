import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyRtkCompression,
  processRtkText,
} from "../../../open-sse/services/compression/engines/rtk/index.ts";
import {
  smartTruncate,
  splitFileSegments,
} from "../../../open-sse/services/compression/engines/rtk/smartTruncate.ts";
import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";

// One case per defect class: (1) a lossy filter selected by a content regex alone, (2) status and
// outcome lines dropped by the line stages, (3) a truncation marker that keeps the pre-cap count
// ("0 lines"), (4) a multi-file result elided as one blob, (5) the hard cap applied to a non-shell
// file read because its content matched a detector.

const filter = (overrides: Record<string, unknown>) =>
  ({
    id: "test",
    name: "test",
    description: "",
    commandTypes: ["test"],
    category: "generic",
    priority: 50,
    stripPatterns: [],
    keepPatterns: [],
    priorityPatterns: [],
    collapsePatterns: [],
    stripAnsi: false,
    replace: [],
    matchOutput: [],
    truncateLineAt: 0,
    onEmpty: "",
    filterStderr: false,
    maxLines: 0,
    preserveHead: 20,
    preserveTail: 20,
    tests: [],
    ...overrides,
  }) as Parameters<typeof applyLineFilter>[1];

test("include-only keep stage keeps outcome markers next to an incidental match", () => {
  const result = applyLineFilter(
    "VET_OK\nTEST_EXIT=0\n[COMPRESSED:x] kept\n1 warning: something\n",
    filter({ keepPatterns: ["warning"] })
  );
  assert.match(result.text, /VET_OK/);
  assert.match(result.text, /TEST_EXIT=0/);
  assert.match(result.text, /warning/);
});

test("drop stage never removes an outcome line", () => {
  const result = applyLineFilter(
    "SUCCESS\nTEST_EXIT=0\nnoise\n",
    filter({ stripPatterns: ["SUCCESS", "EXIT", "noise"] })
  );
  assert.match(result.text, /SUCCESS/);
  assert.match(result.text, /TEST_EXIT=0/);
  assert.equal(result.text.includes("noise"), false);
});

test("collapse stage never collapses an outcome marker away", () => {
  const result = applyLineFilter("VET_OK\nVET_OK\n", filter({ collapsePatterns: ["VET_OK"] }));
  assert.equal(result.text.split("\n").filter(Boolean).length, 2);
});

test("multi-file result is elided per file, not as one blob", () => {
  const blob = ["a.ts", "b.ts", "c.ts", "d.ts"]
    .flatMap((name) => [
      `--- ${name} ---`,
      ...Array.from({ length: 100 }, (_, i) => `${name}:${i}`),
    ])
    .join("\n");
  const { text, droppedLines } = smartTruncate(blob, {
    maxLines: 180,
    preserveHead: 24,
    preserveTail: 24,
  });
  assert.ok(droppedLines > 0);
  for (const name of ["a.ts", "b.ts", "c.ts", "d.ts"]) {
    assert.ok(text.includes(`--- ${name} ---`), `header for ${name} must survive`);
  }
});

test("single-file content is never split by the header detector", () => {
  assert.equal(splitFileSegments("--- a.ts ---\nline\nline"), null);
  assert.equal(splitFileSegments("---\nfrontmatter: true\n---\nbody"), null);
});

test("char cap leaves an accurate dropped-line count in the text", () => {
  const text = Array.from({ length: 6 }, (_, i) => `line${i} `.repeat(60)).join("\n");
  const { text: out, droppedLines } = smartTruncate(text, { maxChars: 300, maxLines: 1000 });
  assert.ok(droppedLines > 0);
  assert.equal(out.includes("[rtk:truncated 0 lines]"), false);
  const stated = Number(out.match(/\[rtk:truncated (\d+) lines\]/)?.[1]);
  assert.equal(stated, droppedLines);
});

test("a weakly-detected filter cannot delete lines", () => {
  const markdown = ["# Title", "", "* first bullet", "* second bullet", "", "prose after"].join(
    "\n"
  );
  // `matchRtkFilter` may still route this to a lossy filter (content fallback), but the
  // destructive stages require a confirmed command, so nothing may disappear.
  const result = processRtkText(markdown, { command: "cat README.md", config: { enabled: true } });
  assert.match(result.text, /# Title/);
  assert.match(result.text, /prose after/);
});

// End-to-end: the guard has to hold through applyRtkCompression, where a bash tool result used to
// come back as just the bullets that matched git-branch's `^\*\s+\S+` probe.
test("bash cat of a markdown file keeps its content", () => {
  const markdown = [
    "# Project",
    "Intro prose.",
    "",
    "* bullet one",
    "* bullet two",
    "",
    "## Install",
    "npm install",
  ].join("\n");
  const result = applyRtkCompression(
    {
      messages: [
        { role: "user", content: "read the readme" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "c1",
              type: "function",
              function: { name: "bash", arguments: JSON.stringify({ command: "cat README.md" }) },
            },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: markdown },
      ],
    },
    { stepConfig: { enabled: true } }
  );
  const messages = (result.body as { messages: Array<{ content?: unknown }> }).messages;
  const text = String(messages.at(-1)?.content ?? "");
  assert.match(text, /## Install/);
  assert.match(text, /npm install/);
});

// A non-shell read whose content happens to contain `Error:` is still a document: one content
// detector hit (confidence 0.25) must not unlock the generic line cap.
test("non-shell file read is not capped by a single content-detector hit", () => {
  const content = Array.from({ length: 300 }, (_, i) => `line ${i}: Error: nothing here`).join(
    "\n"
  );
  const result = applyRtkCompression(
    {
      messages: [
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "c2",
              type: "function",
              function: { name: "read", arguments: JSON.stringify({ path: "src/a.ts" }) },
            },
          ],
        },
        { role: "tool", tool_call_id: "c2", content },
      ],
    },
    { stepConfig: { enabled: true } }
  );
  const messages = (result.body as { messages: Array<{ content?: unknown }> }).messages;
  assert.equal(String(messages.at(-1)?.content ?? ""), content);
});
