/**
 * A/B benchmark: parseModel() with the original console.* logging (baseline) vs
 * the level-gated logger (fixed). Each measurement is a fresh child process;
 * variants alternate per round to cancel thermal/scheduling drift. console.*
 * writes hit a real stdout pipe; timing arrives on stderr.
 *
 * The baseline fixture (open-sse/services/modelBaseline.ts) is regenerated from
 * BASE_REF before running and deleted afterward — it is a benchmark-only artifact
 * and must never be committed. This keeps the benchmark reproducible even after
 * this change is merged (it always compares against the pre-change code).
 *
 * Usage: node scripts/perf/parse-model-ab.mjs
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { writeFileSync, rmSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const child = join(here, "parse-model-ab-child.ts");
const baselinePath = join(root, "open-sse", "services", "modelBaseline.ts");
const ROUNDS = 11; // odd so each variant gets equal first-slots
const BASE_REF = process.env.BASE_REF || "origin/release/v3.8.52";

// Regenerate baseline from the pre-change ref (benchmark-only; deleted after).
const show = spawnSync("git", ["show", `${BASE_REF}:open-sse/services/model.ts`], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
});
if (show.status !== 0) {
  process.stderr.write(`Failed to extract baseline from ${BASE_REF}: ${show.stderr}\n`);
  process.exit(1);
}
writeFileSync(baselinePath, show.stdout);

const runs = { baseline: [], fixed: [] };
try {
  for (let r = 0; r < ROUNDS; r++) {
    // Alternate order each round to avoid systematic first/second bias.
    const order = r % 2 === 0 ? ["baseline", "fixed"] : ["fixed", "baseline"];
    for (const variant of order) {
      const res = spawnSync(process.execPath, ["--import", "tsx/esm", child, variant], {
        cwd: root,
        encoding: "utf8",
      });
      const line = (res.stderr || "").trim().split("\n").pop() || "";
      const ms = parseFloat(line.split("\t")[1]);
      if (!Number.isFinite(ms)) {
        throw new Error(`FAILED ${variant}: ${res.stderr}\n${res.stdout}`);
      }
      runs[variant].push(ms);
    }
  }

  function stats(xs) {
    const s = [...xs].sort((a, b) => a - b);
    const med = s[Math.floor(s.length / 2)];
    const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
    return { med, mean, min: s[0], max: s[s.length - 1] };
  }

  const b = stats(runs.baseline);
  const f = stats(runs.fixed);
  const dMed = b.med - f.med;
  const pct = ((b.med - f.med) / b.med) * 100;

  process.stdout.write(
    `parseModel A/B — ${ROUNDS} rounds, fresh process each, alternating order\n\n`
  );
  process.stdout.write(`variant   median     mean      min      max   (ms for 20k calls)\n`);
  process.stdout.write(
    `baseline  ${b.med.toFixed(1).padStart(6)}  ${b.mean.toFixed(1).padStart(6)}  ${b.min.toFixed(1).padStart(6)}  ${b.max.toFixed(1).padStart(6)}\n`
  );
  process.stdout.write(
    `fixed     ${f.med.toFixed(1).padStart(6)}  ${f.mean.toFixed(1).padStart(6)}  ${f.min.toFixed(1).padStart(6)}  ${f.max.toFixed(1).padStart(6)}\n\n`
  );
  process.stdout.write(
    `median delta: ${dMed.toFixed(1)} ms / 20k calls = ${pct.toFixed(1)}% faster (fixed)\n`
  );
  process.stdout.write(
    `per call: baseline ${((b.med * 1000) / 20000).toFixed(2)} us -> fixed ${((f.med * 1000) / 20000).toFixed(2)} us\n`
  );
} finally {
  // Always remove the benchmark-only baseline fixture — it must never be committed.
  rmSync(baselinePath, { force: true });
}
