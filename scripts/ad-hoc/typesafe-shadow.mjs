/**
 * Offline boundary replay. Input is an operator-reviewed catalog/policy plus
 * task events and synthetic or previously approved recorded System One answers.
 * Emits a JSON report to stdout. No credentials, network, launchers or routes.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { z } from "zod";
import {
  recommendShadow,
  compareShadowOutcome,
  summarizeShadow,
} from "../../open-sse/services/typesafe/shadow.ts";

const replaySchema = z
  .object({
    schemaVersion: z.literal(1),
    profiles: z.array(z.unknown()).max(255),
    policy: z.unknown(),
    events: z
      .array(
        z
          .object({
            task: z.unknown(),
            recording: z.unknown().optional(),
            outcome: z.unknown().optional(),
          })
          .strict()
      )
      .min(1)
      .max(1000),
  })
  .strict();

export function runShadowReplay(value) {
  const parsed = replaySchema.safeParse(value);
  if (!parsed.success) throw new Error("Invalid shadow replay bundle");
  const { profiles, policy, events } = parsed.data;
  const records = [];
  const comparisons = [];
  const seen = new Set();
  for (const event of events) {
    const recommendation = recommendShadow({ task: event.task, profiles, policy }, event.recording);
    const key = JSON.stringify([recommendation.taskId, recommendation.boundaryId]);
    if (seen.has(key)) throw new Error("Duplicate boundary in shadow replay");
    seen.add(key);
    records.push(recommendation);
    if (event.outcome !== undefined) {
      comparisons.push(compareShadowOutcome(recommendation, event.outcome));
    }
  }
  return {
    schemaVersion: 1,
    mode: "shadow",
    records,
    comparisons,
    pendingOutcomes: records.length - comparisons.length,
    // Never blend synthetic outcomes into measured production statistics.
    synthetic: summarizeShadow(comparisons.filter((c) => c.outcome.source === "synthetic")),
    recorded: summarizeShadow(comparisons.filter((c) => c.outcome.source === "recorded")),
  };
}

function main(args) {
  if (args.length === 1 && args[0] === "--help") {
    process.stdout.write(
      "Usage: node scripts/ad-hoc/typesafe-shadow.mjs --input <bundle.json>\n" +
        "Offline only. Emits metadata-only recommendations and observed-outcome comparisons as JSON.\n" +
        "Profiles/policy must be operator-reviewed. Evidence fields are opaque reference IDs.\n" +
        "Synthetic/recorded denotes provenance, not independently verified outcome evidence.\n" +
        "No routes change, no agents launch, and no TypeSafe API call is made.\n"
    );
    return;
  }
  if (args.length !== 2 || args[0] !== "--input") throw new Error("Invalid arguments");
  const text = readFileSync(resolve(args[1]), "utf8");
  if (Buffer.byteLength(text) > 4 * 1024 * 1024) throw new Error("Replay file too large");
  const report = runShadowReplay(JSON.parse(text));
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    main(process.argv.slice(2));
  } catch {
    // Do not echo JSON parse errors, paths, task summaries or raw input.
    process.stderr.write(
      "Shadow replay failed: check arguments and validated input. Use --help.\n"
    );
    process.exitCode = 1;
  }
}
