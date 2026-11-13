// Boundary test (architecture section 1 rules 1-4, 5.1 "adapter purity / boundary", 16.2 step 1).
// Static scan of bin/cli/launch/adapters/*.mjs and bin/cli/launch/contract.mjs, plus runtime
// invariants on every adapter found (vacuous until adapter streams land).

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import { checkPlanInvariants } from "./_helpers/golden.mjs";
import type { LaunchPlan } from "../../../../bin/cli/launch/contract.d.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const LAUNCH_DIR = join(ROOT, "bin/cli/launch");
const ADAPTERS_DIR = join(LAUNCH_DIR, "adapters");
const CONTRACT_FILE = join(LAUNCH_DIR, "contract.mjs");

const ADAPTER_ALLOWED_IMPORTS = new Set(["../contract.mjs"]);
/** The documented exceptions at the top of contract.mjs (section 1 rule 1). */
const CONTRACT_ALLOWED_IMPORTS = new Set([
  "../utils/claudeWindowEnv.mjs",
  "../../../src/shared/launch/viewSelect.ts",
]);

/**
 * Replace comments with spaces and string/template contents with "x", keeping specifiers of
 * import-like statements readable through a separate pass. Good enough for our own source
 * (no regex literals containing quotes in adapters by convention).
 */
function stripComments(source: string): string {
  let out = "";
  let i = 0;
  let quote: string | null = null;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (quote) {
      out += ch;
      if (ch === "\\") {
        out += next ?? "";
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      i++;
      continue;
    }
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      out += source.slice(i, stop).replace(/[^\n]/g, " ");
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    out += ch;
    i++;
  }
  return out;
}

/** Every module specifier: static import/export-from, side-effect import, import(), require(). */
export function listImports(source: string): string[] {
  const code = stripComments(source);
  const specs: string[] = [];
  const patterns = [
    /\bimport\s+(?:[\w*{}\s,$]+?\s+from\s+)?["'`]([^"'`]+)["'`]/g,
    /\bexport\s+(?:\*|\{[^}]*\})\s*(?:as\s+\w+\s+)?from\s+["'`]([^"'`]+)["'`]/g,
    /\bimport\s*\(\s*["'`]?([^"'`)]*)["'`]?\s*\)/g,
    /\brequire\s*\(\s*["'`]?([^"'`)]*)["'`]?\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of code.matchAll(pattern)) specs.push(match[1]);
  }
  return specs;
}

/** Violations of section 1 rule 1 in one adapter source. Empty array = clean. */
export function adapterViolations(source: string, file = "adapter.mjs"): string[] {
  const code = stripComments(source);
  const problems: string[] = [];
  for (const spec of listImports(source)) {
    if (!ADAPTER_ALLOWED_IMPORTS.has(spec)) {
      problems.push(`${file}: forbidden import ${JSON.stringify(spec)} (only ../contract.mjs)`);
    }
  }
  if (/\bfetch\s*\(/.test(code)) problems.push(`${file}: fetch( is forbidden`);
  if (/\bprocess\s*(?:\.|\[)/.test(code)) problems.push(`${file}: process.* reads are forbidden`);
  if (/\bglobalThis\s*(?:\.|\[)\s*["'`]?(?:process|fetch)\b/.test(code)) {
    problems.push(`${file}: globalThis.process / globalThis.fetch is forbidden`);
  }
  if (/\b(?:eval|Function)\s*\(/.test(code)) problems.push(`${file}: eval / Function is forbidden`);
  return problems;
}

/** Violations of section 1 rule 4 in contract.mjs: only the documented re-exports. */
export function contractViolations(source: string): string[] {
  return listImports(source)
    .filter((spec) => !CONTRACT_ALLOWED_IMPORTS.has(spec))
    .map((spec) => `contract.mjs: undocumented import ${JSON.stringify(spec)}`);
}

function adapterFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".mjs"))
    .sort()
    .map((name) => join(dir, name));
}

function scanDir(dir: string): string[] {
  return adapterFiles(dir).flatMap((file) =>
    adapterViolations(readFileSync(file, "utf8"), relative(ROOT, file))
  );
}

test("every adapter imports only ../contract.mjs and reads no process/fetch (vacuous when none)", () => {
  assert.deepEqual(scanDir(ADAPTERS_DIR), []);
});

test("contract.mjs imports nothing beyond the documented exceptions", () => {
  const source = readFileSync(CONTRACT_FILE, "utf8");
  assert.deepEqual(contractViolations(source), []);
  const imports = listImports(source).sort();
  assert.deepEqual(imports, [...CONTRACT_ALLOWED_IMPORTS].sort());
  for (const spec of CONTRACT_ALLOWED_IMPORTS) {
    assert.ok(source.includes(spec), `exception ${spec} is documented in the header`);
  }
});

test("the scanner catches each forbidden pattern (inline fixtures)", () => {
  const clean = `// mentions process.env and fetch( in a comment only
import { defineAdapter, ensureV1 } from "../contract.mjs";
/* import fs from "node:fs" inside a block comment */
export default defineAdapter({ id: "x", plan: (ctx) => ensureV1(ctx.gateway.rootUrl) });
`;
  assert.deepEqual(adapterViolations(clean), []);

  const cases: Array<[string, RegExp]> = [
    [`import fs from "node:fs";`, /forbidden import "node:fs"/],
    [`import { spawn } from "node:child_process";`, /node:child_process/],
    [`import * as net from "node:net";`, /node:net/],
    [`import http from "node:http";`, /node:http/],
    [`import https from "node:https";`, /node:https/],
    [`import os from "node:os";`, /node:os/],
    [`import "node:fs";`, /node:fs/],
    [`import other from "./codex.mjs";`, /\.\/codex\.mjs/],
    [`import { x } from "../core/plan.mjs";`, /\.\.\/core\/plan\.mjs/],
    [`export { y } from "../core/state.mjs";`, /\.\.\/core\/state\.mjs/],
    [`const m = await import("node:os");`, /node:os/],
    [`const m = require("fs");`, /"fs"/],
    [`const r = fetch("http://x");`, /fetch\( is forbidden/],
    [`const home = process.env.HOME;`, /process\.\* reads/],
    [`const p = process["platform"];`, /process\.\* reads/],
    [`const f = globalThis.fetch;`, /globalThis/],
  ];
  for (const [source, expected] of cases) {
    const problems = adapterViolations(
      `import { createPlan } from "../contract.mjs";\n${source}\n`
    );
    assert.ok(
      problems.some((problem) => expected.test(problem)),
      `expected ${expected} for ${JSON.stringify(source)}, got ${JSON.stringify(problems)}`
    );
  }
});

test("the directory scan catches a forbidden import in a temp adapters dir", () => {
  const dir = mkdtempSync(join(tmpdir(), "olx-boundary-"));
  try {
    writeFileSync(join(dir, "good.mjs"), `import { createPlan } from "../contract.mjs";\n`);
    writeFileSync(
      join(dir, "bad.mjs"),
      `import { createPlan } from "../contract.mjs";\nimport { readFileSync } from "node:fs";\n`
    );
    const problems = scanDir(dir);
    assert.equal(problems.length, 1);
    assert.match(problems[0], /bad\.mjs: forbidden import "node:fs"/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("contract scanner rejects an undocumented import", () => {
  assert.deepEqual(
    contractViolations(`export { claudeWindowEnv } from "../utils/claudeWindowEnv.mjs";`),
    []
  );
  assert.match(contractViolations(`import fs from "node:fs";`)[0], /undocumented import/);
});

test("every adapter satisfies the plan invariants under a throwing process/fetch proxy", async () => {
  const files = adapterFiles(ADAPTERS_DIR).filter((file) => !file.endsWith("index.mjs"));
  for (const file of files) {
    const mod = await import(pathToFileURL(file).href);
    const adapter = mod.default;
    assert.ok(adapter && typeof adapter.plan === "function", `${file} default-exports an adapter`);
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: adapter.capabilities.modelList.view });
    const realFetch = globalThis.fetch;
    const realEnv = process.env;
    const trap = new Proxy(
      {},
      {
        get() {
          throw new Error(`${adapter.id}: plan() read process.env`);
        },
      }
    );
    let plan: LaunchPlan | undefined;
    try {
      globalThis.fetch = (() => {
        throw new Error(`${adapter.id}: plan() called fetch`);
      }) as typeof fetch;
      Object.defineProperty(process, "env", { value: trap, configurable: true, writable: true });
      try {
        plan = adapter.plan(ctx);
      } catch (error) {
        // ModelRequired etc. are fine for the default fixture; purity is what this test pins.
        if ((error as { name?: string })?.name !== "LaunchError") throw error;
        continue;
      }
    } finally {
      Object.defineProperty(process, "env", { value: realEnv, configurable: true, writable: true });
      globalThis.fetch = realFetch;
    }
    if (plan) checkPlanInvariants(plan, ctx, { adapter });
  }
});
