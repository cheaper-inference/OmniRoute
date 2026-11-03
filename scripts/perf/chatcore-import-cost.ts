/**
 * Benchmark: per-import marginal cost of chatCore.ts's direct dependencies.
 *
 * chatCore.ts statically imports ~164 modules. This script imports each direct
 * dependency of chatCore in source order, timing each one, so we can identify
 * which imports dominate module-load time and are worth lazy-loading.
 *
 * Marginal cost semantics: modules already evaluated are cached and cost ~0,
 * so the numbers show who pays for each shared subgraph first (import order
 * mirrors chatCore's own evaluation order).
 *
 * Usage: node --import tsx/esm scripts/perf/chatcore-import-cost.ts
 */
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";
import path from "node:path";

const handlerPath = path.resolve("open-sse/handlers/chatCore.ts");
const source = readFileSync(handlerPath, "utf8");

const handlerDir = path.dirname(handlerPath);
const specifiers: string[] = [];
// Only real import/export statements — not prose inside comments.
const re = /^\s*(?:import|export)[^;]*?from\s+"([^"]+)"/gm;
let m: RegExpExecArray | null;
while ((m = re.exec(source))) {
  const spec = m[1];
  if (specifiers.includes(spec)) continue;
  // Relative specifiers must resolve against chatCore.ts's own directory.
  specifiers.push(spec.startsWith(".") ? pathToFileURL(path.resolve(handlerDir, spec)).href : spec);
}

// Import chatCore itself LAST for the end-to-end number.
const handlerUrl = pathToFileURL(handlerPath).href;

const rows: Array<{ spec: string; ms: number }> = [];
let last = performance.now();
for (const spec of specifiers) {
  try {
    await import(spec);
  } catch (err) {
    process.stderr.write(`SKIP ${spec}: ${(err as Error).message.split("\n")[0]}\n`);
    continue;
  }
  const now = performance.now();
  rows.push({ spec, ms: now - last });
  last = now;
}

const totalImports = rows.reduce((s, r) => s + r.ms, 0);
rows.sort((a, b) => b.ms - a.ms);

process.stdout.write(`\n=== top direct imports of chatCore by marginal load cost ===\n`);
for (const r of rows.slice(0, 40)) {
  process.stdout.write(`${r.ms.toFixed(0).padStart(6)} ms  ${r.spec}\n`);
}
process.stdout.write(
  `---\nsum of direct-import costs: ${totalImports.toFixed(0)} ms (${rows.length} modules)\n`
);

const t0 = performance.now();
await import(handlerUrl);
const chatCoreMs = performance.now() - t0;
process.stdout.write(
  `chatCore.ts itself (everything cached by now): ${chatCoreMs.toFixed(0)} ms\n`
);
