// Differential harness: the prompt-budget primitives against upstream's own.
//
// Slices the real functions out of the upstream index.mjs verbatim and compares
// them with the port over random inputs, including multi-byte text (where byte
// vs character slicing diverges) and the exact boundary values.
//
//   node --import tsx/esm scripts/ad-hoc/agy-prompt-render-diff.mjs [upstream.mjs]
import fs from "node:fs";
import path from "node:path";

import {
  clipHistoryPart,
  clipMiddle,
  clipPartsToBytes,
  promptTextBytes,
  utf8Bytes,
  utf8Prefix,
} from "../../open-sse/services/agyPromptRender.ts";

const upstreamPath = process.argv[2] || "C:/Users/Jr/AppData/Local/Temp/opencode/agydiff/index.mjs";
const source = fs.readFileSync(upstreamPath, "utf8");

const slice = (from, to, label) => {
  const start = source.indexOf(from);
  if (start < 0) throw new Error(`missing ${label} start: ${from}`);
  const end = source.indexOf(to, start);
  if (end < 0) throw new Error(`missing ${label} end: ${to}`);
  return source.slice(start, end);
};

const fnSlice = (name, nextName) => slice(`function ${name}(`, `function ${nextName}(`, name);

const constants = slice(
  "const HISTORY_BLOCK_CLIP_BYTES",
  "function isMetaOnlyUserText",
  "history constants"
);

const harness = `// GENERATED in-memory by agy-prompt-render-diff.mjs
const maxInitialPromptBytes = () => 112 * 1024
${constants}
export { utf8Bytes, promptTextBytes, utf8Prefix, clipMiddle, clipPartsToBytes, headTail, clipHistoryText }
`;

const tmp = path.join(
  process.env.TEMP || process.env.TMPDIR || ".",
  `agy-prompt-render-diff-${process.pid}.mjs`
);
fs.writeFileSync(tmp, harness);
const upstream = await import(`file:///${tmp.replace(/\\/g, "/")}`);
fs.unlinkSync(tmp);

// ── Sample data ─────────────────────────────────────────────────────────────

let seed = 0x2f6e2b1;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const pick = (items) => items[Math.floor(rand() * items.length)];

const ALPHABET = ["a", "Z", "0", " ", "\n", "\t", "é", "ü", "λ", "漢", "字", "🎉", "🙂", "—"];

function randomText(maxLength) {
  const length = Math.floor(rand() * maxLength);
  let out = "";
  for (let i = 0; i < length; i++) out += pick(ALPHABET);
  return out;
}

function randomParts(count) {
  return Array.from({ length: count }, () =>
    rand() < 0.2
      ? { type: "image", mimeType: "image/png", data: "QUJD" }
      : { type: "text", text: randomText(4000) }
  );
}

const cases = { checked: 0, failed: 0 };
const fail = (label, detail) => {
  cases.failed++;
  console.error(`FAIL ${label}: ${detail}`);
};

function compare(label, left, right, input) {
  cases.checked++;
  const same =
    typeof left === "string" && typeof right === "string"
      ? left === right
      : JSON.stringify(left) === JSON.stringify(right);
  if (!same && cases.failed < 12) {
    fail(
      label,
      `input=${JSON.stringify(input).slice(0, 240)} mine=${JSON.stringify(left).slice(0, 200)} upstream=${JSON.stringify(right).slice(0, 200)}`
    );
  } else if (!same) {
    cases.failed++;
  }
}

// ── Byte accounting ─────────────────────────────────────────────────────────

for (let i = 0; i < 300; i++) {
  const text = randomText(500);
  compare("utf8Bytes", utf8Bytes(text), upstream.utf8Bytes(text), text);
  const bytes = Math.floor(rand() * 400);
  compare("utf8Prefix", utf8Prefix(text, bytes), upstream.utf8Prefix(text, bytes), { text, bytes });
}

const partSets = [
  [],
  [{ type: "text", text: "" }],
  [{ type: "text", text: "x" }],
  [{ type: "image", mimeType: "image/png", data: "QUJD" }],
  [
    { type: "text", text: "a" },
    { type: "image", mimeType: "image/png", data: "QUJD" },
    { type: "text", text: "b" },
  ],
];
for (const parts of partSets) {
  compare("promptTextBytes", promptTextBytes(parts), upstream.promptTextBytes(parts), parts);
}
for (let i = 0; i < 200; i++) {
  const parts = randomParts(1 + Math.floor(rand() * 4));
  compare("promptTextBytes", promptTextBytes(parts), upstream.promptTextBytes(parts), parts);
}

// ── Clipping ────────────────────────────────────────────────────────────────

for (let i = 0; i < 400; i++) {
  const text = randomText(1200);
  const limit = Math.floor(rand() * 3000);
  compare("clipMiddle", clipMiddle(text, limit), upstream.clipMiddle(text, limit), {
    text,
    limit,
  });
}

// The exact boundary: one byte under, exactly, and one byte over the input size.
for (const text of ["", "a", "漢", "漢字", "🎉🎉", "abc🎉def"]) {
  const total = utf8Bytes(text);
  for (const limit of [0, 1, 2, 3, total - 1, total, total + 1]) {
    compare("clipMiddle@boundary", clipMiddle(text, limit), upstream.clipMiddle(text, limit), {
      text,
      limit,
    });
  }
}

for (let i = 0; i < 300; i++) {
  const parts = randomParts(1 + Math.floor(rand() * 5));
  const limit = Math.floor(rand() * 8000);
  compare(
    "clipPartsToBytes",
    clipPartsToBytes(parts, limit),
    upstream.clipPartsToBytes(parts, limit),
    {
      parts,
      limit,
    }
  );
}

for (let i = 0; i < 300; i++) {
  const text = randomText(30000);
  compare("clipHistoryText", upstream.clipHistoryText(text), upstream.clipHistoryText(text), text);
  if (upstream.utf8Bytes(text) > 12 * 1024) {
    compare(
      "headTail",
      clipHistoryPart({ type: "text", text }).text,
      upstream.clipHistoryText(text),
      text
    );
  }
}

console.log(
  `${cases.failed === 0 ? "OK" : "FAILED"}: ${cases.checked} comparisons, ${cases.failed} mismatches`
);
process.exit(cases.failed === 0 ? 0 : 1);
