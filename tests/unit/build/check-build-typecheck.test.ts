// tests/unit/build/check-build-typecheck.test.ts
// Unit tests for the decision logic in check-build-typecheck.mjs.
//
// What is unique to this gate is the pair of guards that stop it being satisfied
// without fixing anything: `--update` refusing to bank a regression, and the
// @ts-nocheck scan that makes an opted-out file visible at all (such a file
// reports no diagnostics, so nothing else here can see it).
//
// `noCheckOffset` is pinned against the positions where tsc's rule and the
// obvious implementations disagree. Each of these was a real miss at some point:
// a fixed read window, a shebang, and a comment that merely mentions the pragma.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  countLineSuppressions,
  fingerprintDrift,
  noCheckOffset,
  scanNoCheckFiles,
  suppressionDrift,
  suppressedIntersection,
  updateRefusal,
} from "../../../scripts/check/ratchet.mjs";

const regression = {
  file: "src/lib/example.ts",
  code: "TS2322",
  liveCount: 1,
  baselineCount: 0,
};

function withTempTree(files: Record<string, string>, run: (root: string) => void) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "nocheck-"));
  try {
    for (const [rel, content] of Object.entries(files)) {
      const full = path.join(root, rel);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, content);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("updateRefusal: allows the rewrite when nothing regressed", () => {
  assert.equal(updateRefusal([], { force: false }), null);
});

test("updateRefusal: blocks the rewrite when a new error appeared", () => {
  const reason = updateRefusal([regression], { force: false });
  assert.notEqual(reason, null);
  assert.match(reason, /1 pair/);
});

test("updateRefusal: counts every regressed pair, not just the first", () => {
  const reason = updateRefusal([regression, { ...regression, code: "TS2339" }], { force: false });
  assert.notEqual(reason, null);
  assert.match(reason, /2 pair/);
});

test("updateRefusal: --force is the only way to freeze new debt", () => {
  assert.equal(updateRefusal([regression], { force: true }), null);
});

test("updateRefusal: defaults to refusing (force is opt-in, not implicit)", () => {
  assert.notEqual(updateRefusal([regression]), null);
});

test("scanNoCheckFiles: finds files that silence the whole file", () => {
  withTempTree(
    {
      "src/opted-out.ts": "// @ts-nocheck\nexport {};\n",
      "src/deep/also-out.ts": "\n//   @ts-nocheck  \nexport {};\n",
      "src/clean.ts": "export {};\n",
    },
    (root) => {
      const found = scanNoCheckFiles(["src/opted-out.ts", "src/deep/also-out.ts", "src/clean.ts"], root);
      assert.deepEqual(found, ["src/deep/also-out.ts", "src/opted-out.ts"]);
    }
  );
});

test("scanNoCheckFiles: catches the directive behind a long header", () => {
  const banner = Array.from({ length: 60 }, (_, i) => `// line ${i} of the header`).join("\n");
  withTempTree({ "src/hidden.ts": `${banner}\n// @ts-nocheck\nexport {};\n` }, (root) => {
    assert.deepEqual(scanNoCheckFiles(["src/hidden.ts"], root), ["src/hidden.ts"]);
  });
});

test("scanNoCheckFiles: skips a file it cannot read rather than failing the run", () => {
  withTempTree({ "src/present.ts": "export {};\n" }, (root) => {
    assert.deepEqual(scanNoCheckFiles(["src/missing.ts", "src/present.ts"], root), []);
  });
});

// --- noCheckOffset against tsc's own rule ---------------------------------
// Each case below was, at some point, a way for a real directive to go unseen.
// Keep them as a table: these are one-character differences.

const HONOURED = [
  ["// @ts-nocheck\nexport {};\n", "leading trivia"],
  ["// @ts-nocheck\r\nexport {};\n", "CRLF line ending"],
  ["// @ts-nocheck: because the SDK is untyped\nexport {};\n", "colon separator"],
  ["//@ts-nocheck\nexport {};\n", "no space after the slashes"],
  ["/// @ts-nocheck\nexport {};\n", "triple slash"],
  ["#!/usr/bin/env node\n// @ts-nocheck\nexport {};\n", "after a shebang"],
  ["/* (c) Someone */ // @ts-nocheck\nexport {};\n", "after a block comment"],
  [
    Array.from({ length: 60 }, (_, i) => `// header line ${i}`).join("\n") +
      "\n// @ts-nocheck\nexport {};\n",
    "past a sixty-line licence banner",
  ],
];

for (const [source, label] of HONOURED) {
  test(`noCheckOffset: honoured — ${label}`, () => {
    assert.notEqual(noCheckOffset(source), -1);
  });
}

const IGNORED = [
  ["// @ts-nocheckX\nexport {};\n", "a letter continues the pragma word"],
  ["// @ts-nocheck-ish\nexport {};\n", "a hyphen continues the pragma word"],
  ["// Do not add @ts-nocheck here.\nexport {};\n", "prose only"],
  ["/*\n@ts-nocheck\n*/\nexport {};\n", "inside a block comment"],
  ["export const x = 1;\n// @ts-nocheck\n", "after the first statement"],
];

for (const [source, label] of IGNORED) {
  test(`noCheckOffset: ignored — ${label}`, () => {
    assert.equal(noCheckOffset(source), -1);
  });
}

test("noCheckOffset: directive below a comment that merely mentions the pragma", () => {
  // The first occurrence is prose, the second is the directive. Judging only the
  // first match reports this file as checked while tsc ignores it entirely.
  const source =
    "// Do not ever add @ts-nocheck to this file.\n" +
    "// @ts-nocheck\n" +
    "export {};\n";
  assert.notEqual(noCheckOffset(source), -1);
});

// --- suppressedIntersection -------------------------------------------------

test("suppressedIntersection: reports files that are both counted and opted out", () => {
  assert.deepEqual(suppressedIntersection(["src/a.ts", "src/b.ts"], ["src/b.ts", "src/c.ts"]), [
    "src/b.ts",
  ]);
});

test("suppressedIntersection: must be asked about the baseline side, not the live one", () => {
  // An opted-out file reports no diagnostics, so it disappears from the live run.
  // Intersecting against the live side is empty by construction.
  const baselineFiles = ["bin/cli/tray/tray.ts"];
  const liveFiles: string[] = [];
  const noCheck = ["bin/cli/tray/tray.ts"];

  assert.deepEqual(suppressedIntersection(baselineFiles, noCheck), ["bin/cli/tray/tray.ts"]);
  assert.deepEqual(suppressedIntersection(liveFiles, noCheck), []);
});

// --- line-level suppressions ------------------------------------------------
// @ts-ignore and @ts-expect-error are per-line, so they are counted rather than
// frozen by name. One added comment line removes a diagnostic; if that is not
// recorded, the gate reads the removal as progress.

test("countLineSuppressions: counts both pragmas, per file", () => {
  withTempTree(
    {
      "src/a.ts": "// @ts-ignore\nconst x = 1;\n// @ts-expect-error\nconst y = 2;\n",
      "src/b.ts": "// @ts-expect-error: upstream type bug\nconst z = 3;\n",
      "src/clean.ts": "const w = 4;\n",
    },
    (root) => {
      assert.deepEqual(countLineSuppressions(["src/a.ts", "src/b.ts", "src/clean.ts"], root), {
        "src/a.ts": 2,
        "src/b.ts": 1,
      });
    }
  );
});

test("countLineSuppressions: counts every shape tsc honours", () => {
  // tsc accepts the pragma as a leading comment, trailing after code, and inside
  // both block-comment forms. Missing any of them is a one-line bypass.
  withTempTree(
    {
      "src/leading.ts": "// @ts-ignore\nconst a = 1;\n",
      "src/trailing.ts": "const b = 1; // @ts-ignore\n",
      "src/block.ts": "/* @ts-expect-error */\nconst c = 1;\n",
      "src/jsdoc.ts": "/** @ts-ignore */\nconst d = 1;\n",
      "src/none.ts": "const e = 1;\n",
    },
    (root) => {
      const files = [
        "src/leading.ts",
        "src/trailing.ts",
        "src/block.ts",
        "src/jsdoc.ts",
        "src/none.ts",
      ];
      assert.deepEqual(countLineSuppressions(files, root), {
        "src/leading.ts": 1,
        "src/trailing.ts": 1,
        "src/block.ts": 1,
        "src/jsdoc.ts": 1,
      });
    }
  );
});

test("countLineSuppressions: handles CRLF files", () => {
  withTempTree({ "src/crlf.ts": "// @ts-ignore\r\nconst x = 1;\r\n" }, (root) => {
    assert.deepEqual(countLineSuppressions(["src/crlf.ts"], root), { "src/crlf.ts": 1 });
  });
});

test("suppressionDrift: a newly added suppression is a regression", () => {
  const drift = suppressionDrift({ "src/a.ts": 1 }, { "src/a.ts": 2, "src/b.ts": 1 });
  assert.deepEqual(drift, [
    { file: "src/a.ts", was: 1, live: 2 },
    { file: "src/b.ts", was: 0, live: 1 },
  ]);
});

test("suppressionDrift: removing a suppression is not a regression", () => {
  assert.deepEqual(suppressionDrift({ "src/a.ts": 3 }, { "src/a.ts": 1 }), []);
});

// --- fingerprintDrift -------------------------------------------------------
// A program that shrank produces fewer diagnostics without anything being fixed,
// so its shape is frozen too.

const fingerprint = {
  files: 6047,
  include: ["src/**/*.ts"],
  exclude: ["node_modules"],
  compilerOptions: { strict: false, skipLibCheck: true },
};

test("fingerprintDrift: an unchanged program reports nothing", () => {
  assert.deepEqual(fingerprintDrift(fingerprint, { ...fingerprint }), []);
});

test("fingerprintDrift: adding or deleting a source file is not drift", () => {
  // Ordinary work changes the count; failing on it would make the gate something
  // people route around. Shrinking the *program* (exclude/include/options) is the
  // signal that matters.
  assert.deepEqual(fingerprintDrift(fingerprint, { ...fingerprint, files: 6100 }), []);
  assert.deepEqual(fingerprintDrift(fingerprint, { ...fingerprint, files: 6000 }), []);
});

test("fingerprintDrift: a relaxed compiler option is reported", () => {
  const drift = fingerprintDrift(fingerprint, {
    ...fingerprint,
    compilerOptions: { ...fingerprint.compilerOptions, noUncheckedIndexedAccess: false },
  });
  assert.ok(drift.some((d) => d.startsWith("compilerOptions")));
});

test("fingerprintDrift: a changed include list is reported", () => {
  const drift = fingerprintDrift(fingerprint, {
    ...fingerprint,
    include: ["src/**/*.ts", "electron/**/*.ts"],
  });
  assert.ok(drift.some((d) => d.startsWith("include")));
});

test("fingerprintDrift: a changed exclude list is reported", () => {
  const drift = fingerprintDrift(fingerprint, {
    ...fingerprint,
    exclude: [...fingerprint.exclude, "src/broken"],
  });
  assert.ok(drift.some((d) => d.startsWith("exclude")));
});

test("fingerprintDrift: no recorded fingerprint means nothing to compare", () => {
  assert.deepEqual(fingerprintDrift(null, fingerprint), []);
});
