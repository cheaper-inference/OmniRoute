/**
 * A/B benchmark: chatCore.ts module-load time, baseline vs lazy-import variant.
 *
 * Both files live in open-sse/handlers/ so relative (./chatCore/..., ../services/...)
 * and @/ alias specifiers resolve identically. Each measurement spawns a FRESH
 * node process, so neither variant benefits from the other's cached module graph.
 * Runs alternate baseline/variant to cancel out machine drift.
 *
 * Usage:
 *   node scripts/perf/chatcore-loadtime-ab.mjs [--runs 7]
 *
 * chatCoreBaseline.ts is the pre-change file, materialised via:
 *   git show HEAD:open-sse/handlers/chatCore.ts > open-sse/handlers/chatCoreBaseline.ts
 * It is a benchmark fixture only and must NOT be committed.
 */
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const runsArg = args.indexOf("--runs");
const RUNS = runsArg !== -1 ? Number(args[runsArg + 1]) : 7;

const VARIANTS = [
  ["baseline", "./open-sse/handlers/chatCoreBaseline.ts"],
  ["lazy", "./open-sse/handlers/chatCore.ts"],
];

/** Import one variant in a fresh process; report the measured ms on stdout. */
function measure(target) {
  const code = `
    const t0 = performance.now();
    await import(${JSON.stringify(target)});
    console.log("MS=" + (performance.now() - t0).toFixed(0));
  `;
  const res = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--import",
      "./open-sse/utils/setupPolyfill.ts",
      "--input-type=module",
      "-e",
      code,
    ],
    { encoding: "utf8", env: { ...process.env, NODE_ENV: "production" } }
  );
  const m = /MS=(\d+)/.exec(res.stdout || "");
  if (!m) {
    process.stderr.write(`FAILED (${target}):\n${(res.stderr || "").slice(-800)}\n`);
    return null;
  }
  return Number(m[1]);
}

const samples = { baseline: [], lazy: [] };

for (let i = 0; i < RUNS; i++) {
  for (const [name, target] of VARIANTS) {
    const ms = measure(target);
    if (ms !== null) samples[name].push(ms);
  }
  const fmt = (n) => (n === undefined ? "  --" : `${n}ms`).padStart(6);
  process.stdout.write(
    `run ${String(i + 1).padStart(2)}:  baseline ${fmt(samples.baseline[i])}   lazy ${fmt(samples.lazy[i])}\n`
  );
}

function median(xs) {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : null;
}

const b = median(samples.baseline);
const l = median(samples.lazy);
process.stdout.write(
  `\n=== chatCore.ts module-load, median of ${samples.baseline.length} fresh-process runs ===\n`
);
process.stdout.write(`baseline: ${b} ms   (all: ${samples.baseline.join(", ")})\n`);
process.stdout.write(`lazy:     ${l} ms   (all: ${samples.lazy.join(", ")})\n`);
if (b && l) {
  const delta = b - l;
  const pct = ((delta / b) * 100).toFixed(1);
  process.stdout.write(
    `delta:    ${delta > 0 ? "-" : "+"}${Math.abs(delta)} ms (${delta > 0 ? "-" : "+"}${Math.abs(Number(pct))}%)\n`
  );
}
