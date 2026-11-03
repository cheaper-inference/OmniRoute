import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { transformSource } from "../../scripts/dev/codemod-material-icons.mjs";

test("static ligature span becomes <Icon name> with size from text-[Npx] and a11y preserved", () => {
  const input = `export function A() {\n  return <span className="material-symbols-outlined text-[16px] text-text-muted" aria-hidden="true">search</span>;\n}\n`;
  const { code, converted, leftovers } = transformSource(input, "A.tsx");
  assert.equal(converted, 1);
  assert.deepEqual(leftovers, []);
  assert.match(code, /import Icon from "@\/shared\/components\/Icon";/);
  assert.match(code, /<Icon name="search" size=\{16\} className="text-text-muted" \/>/);
  assert.doesNotMatch(code, /material-symbols-outlined/);
});

test("aria-label becomes ariaLabel; dynamic content becomes name={expr}; existing import is reused", () => {
  const input = `import Icon from "@/shared/components/Icon";\nconst x = <span aria-label="Close" className="material-symbols-outlined">close</span>;\nconst y = <span className="material-symbols-outlined text-[20px]">{item.icon}</span>;\n`;
  const { code, converted } = transformSource(input, "B.tsx");
  assert.equal(converted, 2);
  assert.equal(code.match(/import Icon from/g)!.length, 1);
  assert.match(code, /<Icon name="close" ariaLabel="Close" \/>/);
  assert.match(code, /<Icon name=\{item\.icon\} size=\{20\} \/>/);
});

test("a span the codemod cannot parse is reported, not mangled", () => {
  const input = `const z = <span className={cn("material-symbols-outlined", active && "fill-1")} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>;\n`;
  const { code, converted, leftovers } = transformSource(input, "C.tsx");
  assert.equal(converted, 0);
  assert.equal(code, input);
  assert.deepEqual(leftovers, [{ file: "C.tsx", line: 1 }]);
});

test("leftover detection does not leak regex state between files", () => {
  // A long first file whose manual span sits far into the text, then a short second file whose
  // manual span sits before that offset — a global regex `.test()` would miss the second one.
  const first = `${"const pad = 1;\n".repeat(40)}const a = <span className={cn("material-symbols-outlined", x)}>{icon}</span>;\n`;
  const second = `const b = <span className={cn("material-symbols-outlined", y)}>{icon}</span>;\n`;
  const one = transformSource(first, "first.tsx");
  const two = transformSource(second, "second.tsx");
  assert.equal(one.leftovers.length, 1);
  assert.equal(two.leftovers.length, 1);
  assert.deepEqual(two.leftovers, [{ file: "second.tsx", line: 1 }]);
});

// First statement of a module after leading comments/whitespace (directive prologue check).
function firstStatement(code: string): string {
  const body = code.replace(/^(?:\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/)*/, "");
  return body.split("\n")[0];
}

test("the import goes after a directive that follows a leading docblock", () => {
  const input = `/**\n * Health page.\n */\n"use client";\n\nimport { useState } from "react";\n\nexport function A() {\n  return <span className="material-symbols-outlined">search</span>;\n}\n`;
  const { code, converted } = transformSource(input, "D.tsx");
  assert.equal(converted, 1);
  assert.equal(firstStatement(code), '"use client";');
  assert.ok(code.startsWith('/**\n * Health page.\n */\n"use client";\n\nimport Icon from'));
  assert.ok(code.indexOf("import Icon from") < code.indexOf('import { useState } from "react";'));
});

test("single-quoted and use-server directives behind comments stay first", () => {
  for (const directive of ["'use client'", '"use server";', "'use client';"]) {
    const input = `// leading line comment\n/* block */\n${directive}\nimport x from "y";\nconst a = <span className="material-symbols-outlined">close</span>;\n`;
    const { code, converted } = transformSource(input, "E.tsx");
    assert.equal(converted, 1);
    assert.equal(firstStatement(code), directive);
  }
});

test("a file without a directive keeps the import at the very top", () => {
  const input = `import x from "y";\nconst a = <span className="material-symbols-outlined">close</span>;\n`;
  const { code } = transformSource(input, "F.tsx");
  assert.ok(code.startsWith('import Icon from "@/shared/components/Icon";\nimport x from "y";\n'));
});

test("multi-line dynamic spans are reported at the line of their opening <span", () => {
  const input = [
    "export function A({ active, icon }) {",
    "  return (",
    "    <div>",
    "      <span",
    '        className={`material-symbols-outlined text-[16px] ${active ? "text-primary" : ""}`}',
    '        aria-hidden="true"',
    "      >",
    "        check",
    "      </span>",
    "      <span",
    "        className={cn(",
    '          "material-symbols-outlined",',
    '          active && "text-primary"',
    "        )}",
    "      >",
    "        {icon}",
    "      </span>",
    "    </div>",
    "  );",
    "}",
    "",
  ].join("\n");
  const { code, converted, leftovers } = transformSource(input, "G.tsx");
  assert.equal(converted, 0);
  assert.equal(code, input);
  assert.deepEqual(leftovers, [
    { file: "G.tsx", line: 4 },
    { file: "G.tsx", line: 10 },
  ]);
});

test("a multi-line static template-literal span converts after whitespace normalisation", () => {
  const input = [
    "const a = (",
    "  <span",
    "    className={`material-symbols-outlined",
    "      text-[18px] text-text-muted`}",
    '    aria-hidden="true"',
    "  >",
    "    search",
    "  </span>",
    ");",
    "",
  ].join("\n");
  const { code, converted, leftovers } = transformSource(input, "H.tsx");
  assert.equal(converted, 1);
  assert.deepEqual(leftovers, []);
  assert.match(code, /<Icon name="search" size=\{18\} className="text-text-muted" \/>/);
  assert.doesNotMatch(code, /material-symbols-outlined/);
});

test("the CLI exits 2 and prints manual: file:line for a multi-line dynamic span", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "codemod-icons-"));
  try {
    const file = path.join(dir, "Multi.tsx");
    fs.writeFileSync(
      file,
      'export const A = ({ on }) => (\n  <span\n    className={cn("material-symbols-outlined", on && "x")}\n  >\n    {on}\n  </span>\n);\n'
    );
    const res = spawnSync(
      process.execPath,
      [path.resolve("scripts/dev/codemod-material-icons.mjs"), dir],
      { encoding: "utf8" }
    );
    assert.equal(res.status, 2, res.stdout + res.stderr);
    assert.match(
      res.stdout,
      new RegExp(`manual: ${file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:2`)
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
