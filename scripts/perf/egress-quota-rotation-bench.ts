/**
 * Egress quota-rotation bench — scripts/perf/egress-quota-rotation-bench.ts
 *
 * Measures the cost of the quota-refusal egress scope (rotatesEgressOnQuotaRefusal) on the
 * refusal path and on the selection read, plus the hard bound of the refusal store that the
 * widened write feeds.
 *
 * Usage:
 *   npm run bench:egress-quota-rotation
 *   npm run bench:egress-quota-rotation -- --iterations 200000
 *   node --expose-gc --import tsx/esm scripts/perf/egress-quota-rotation-bench.ts --json
 *
 * METHODOLOGY & LIMITATIONS:
 *  - Node event loop is single-threaded; numbers are machine-specific. Compare only reports
 *    from the same host with a similar loadAvg (docs/ops/PERF_BASELINE.md).
 *  - The 429 write fires the selector switch asynchronously and off the request path
 *    (maybeSwitchOnSetAside), so that work is deliberately outside the measured loop.
 *  - The write is measured over a POOL of distinct members: re-noting a member already set
 *    aside is an early return, so a single-key loop would measure the early return instead.
 *  - --expose-gc is required for the retained-heap number; without it (and without --json)
 *    only the bound check runs.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";

// Hermetic data dir: importing the modules below opens the SQLite store on demand.
const TMP_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egressbench-"));
process.env.DATA_DIR = TMP_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";

const args = process.argv.slice(2);
const ITERATIONS = Number(args[args.indexOf("--iterations") + 1]) || 100_000;
const AS_JSON = args.includes("--json");
const WIDEN_ENV = "OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS";

const { rotatesEgressOnQuotaRefusal } = await import("../../open-sse/config/providerErrorRules.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");

type Row = { name: string; usPerOp: number; opsPerSec: number };
const rows: Row[] = [];

function bench(name: string, iterations: number, fn: (i: number) => void): void {
  for (let i = 0; i < Math.min(10_000, iterations); i++) fn(i); // warmup
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn(i);
  const elapsedMs = performance.now() - start;
  const usPerOp = (elapsedMs * 1000) / iterations;
  rows.push({
    name,
    usPerOp: Math.round(usPerOp * 1000) / 1000,
    opsPerSec: iterations / (elapsedMs / 1000),
  });
  if (!AS_JSON) {
    console.log(
      `${name.padEnd(52)} ${iterations.toLocaleString()} ops in ${elapsedMs.toFixed(1)}ms | ` +
        `${usPerOp.toFixed(3)}µs/op | ${Math.round(iterations / (elapsedMs / 1000)).toLocaleString()} ops/s`
    );
  }
}

/** Distinct-address pool, so the write path never hits its "already set aside" early return. */
const POOL = 1024;
const memberOf = (i: number) => ({
  type: "http",
  host: `10.4.${Math.floor(i / 256)}.${i % 256}`,
  port: 8080,
});

const settle = (): void => {
  const gc = (globalThis as { gc?: () => void }).gc;
  for (let i = 0; i < 4; i++) gc?.();
};

// ---- scope predicate: the only new work in this change -------------------------------
delete process.env[WIDEN_ENV];
bench("scope predicate, family provider (opencode-go)", ITERATIONS, () =>
  rotatesEgressOnQuotaRefusal("opencode-go")
);
bench("scope predicate, other provider, widening OFF (default)", ITERATIONS, () =>
  rotatesEgressOnQuotaRefusal("openai")
);
process.env[WIDEN_ENV] = "all";
bench("scope predicate, other provider, widening ON", ITERATIONS, () =>
  rotatesEgressOnQuotaRefusal("openai")
);
delete process.env[WIDEN_ENV];

// ---- refusal write and selection read -------------------------------------------------
// The store warns on every set-aside (its own production logging). Silenced here only so the
// bench output stays parseable — the behaviour is untouched.
const realWarn = console.warn;
console.warn = () => {};
bench("429 write (noteProxyOutcome), family provider", ITERATIONS, (i) => {
  noteProxyOutcome("opencode-go", { proxy: memberOf(i % POOL), upstreamStatus: 429 });
});
process.env[WIDEN_ENV] = "all";
bench("429 write (noteProxyOutcome), other provider, widening ON", ITERATIONS, (i) => {
  noteProxyOutcome("openai", { proxy: memberOf(i % POOL), upstreamStatus: 429 });
});
delete process.env[WIDEN_ENV];

memory.__resetProxyRefusalMemoryForTesting();
const firstKey = memory.proxyEgressKey(memberOf(0));
bench("isProxyAvoided read (selection path)", ITERATIONS, () => memory.isProxyAvoided(firstKey));

// ---- the WORKING flow: a successful request must pay nothing new ----------------------
// These two rows are the A/B: run this script with the change reverted (the 429 arm back to
// the family-only scope) and they must be indistinguishable. The new predicate is evaluated
// only INSIDE the `status === 429` branch, after the short-circuit, so a 200 never reaches it.
memory.__resetProxyRefusalMemoryForTesting();
memory.noteProxyRefusal(memory.proxyEgressKey(memberOf(0)), "ip_quota_429");
bench("200 success path (working flow, in-scope provider)", ITERATIONS, () =>
  noteProxyOutcome("opencode-go", { proxy: memberOf(0), upstreamStatus: 200 })
);
bench("200 success path (working flow, widened provider)", ITERATIONS, () =>
  noteProxyOutcome("openai", { proxy: memberOf(0), upstreamStatus: 200 })
);

// ---- the hard bound the widened write must respect -----------------------------------
const DISTINCT = 10_000;
// The bound must be proven for the WIDENED write, which is the one this change adds.
process.env[WIDEN_ENV] = "all";
memory.__resetProxyRefusalMemoryForTesting();
for (let i = 0; i < DISTINCT; i++) {
  noteProxyOutcome("openai", { proxy: memberOf(i), upstreamStatus: 429 });
}
const sizeAfter = memory.__proxyRefusalMemorySizeForTesting();

settle();
memory.__resetProxyRefusalMemoryForTesting();
settle();
const bytesBefore = process.memoryUsage().heapUsed;
for (let i = 0; i < DISTINCT; i++) {
  noteProxyOutcome("openai", { proxy: memberOf(i), upstreamStatus: 429 });
}
settle();
const retainedBytes = Math.max(0, process.memoryUsage().heapUsed - bytesBefore);
delete process.env[WIDEN_ENV];

const summary = {
  iterations: ITERATIONS,
  distinctAddressesWritten: DISTINCT,
  refusalStoreSizeAfter: sizeAfter,
  boundedAt: 1000,
  boundHeld: sizeAfter <= 1000,
  retainedMiBFor1000Entries: Math.round((retainedBytes / 1048576) * 1000) / 1000,
  bytesPerEntry: sizeAfter > 0 ? Math.round(retainedBytes / sizeAfter) : null,
  rows,
};

console.warn = realWarn;
if (AS_JSON) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(
    `\nbound: ${DISTINCT.toLocaleString()} distinct addresses -> store holds ${sizeAfter} entries ` +
      `(cap 1000) ${sizeAfter <= 1000 ? "OK" : "VIOLATED"}`
  );
  console.log(
    `retained heap for ${sizeAfter} entries: ${summary.retainedMiBFor1000Entries} MiB ` +
      `(${summary.bytesPerEntry} bytes/entry, --expose-gc ${(globalThis as { gc?: () => void }).gc ? "on" : "OFF"})`
  );
}

fs.rmSync(TMP_DATA_DIR, { recursive: true, force: true });
if (!summary.boundHeld) process.exitCode = 1;
