/**
 * Child process for parse-model A/B. Measures parseModel() cost in isolation.
 *
 * The module under test is chosen by the first argument: baseline | fixed.
 * console.* writes from the baseline variant are allowed to hit stdout (a real
 * pipe, as in production) so the synchronous-write cost is genuinely incurred.
 * The timing result is written to STDERR so it never contaminates measured I/O.
 *
 * Usage: node --import tsx/esm scripts/perf/parse-model-ab-child.ts [baseline|fixed]
 */
import { performance } from "node:perf_hooks";

const variant = process.argv[2] ?? "baseline";
const mod =
  variant === "baseline"
    ? await import("../../open-sse/services/modelBaseline.ts")
    : await import("../../open-sse/services/model.ts");
const { parseModel } = mod as { parseModel: (s: string) => unknown };

// Samples: 1 of 3 triggers shouldTreatAsExactModelId -> the console.debug path.
// Keep identical across variants so the comparison is apples-to-apples.
const SAMPLES = ["openai/gpt-4o", "deepseek/deepseek-chat", "mistral/mistral-large"];
const N = 20_000;

// Warm-up (JIT + module init) — not measured.
for (let i = 0; i < 2_000; i++) parseModel(SAMPLES[i % SAMPLES.length]);

const t0 = performance.now();
let sink = 0;
for (let i = 0; i < N; i++) {
  const p = parseModel(SAMPLES[i % SAMPLES.length]) as {
    provider?: string | null;
    model?: string | null;
  };
  sink += (p.provider?.length ?? 0) + (p.model?.length ?? 0);
}
const ms = performance.now() - t0;

// Result on stderr only. Keep the sink alive so nothing is optimized away.
process.stderr.write(`${variant}\t${ms.toFixed(1)}\t${sink >= 0 ? "ok" : "sink"}\n`);
