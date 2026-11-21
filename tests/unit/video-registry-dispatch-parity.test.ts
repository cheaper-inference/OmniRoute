import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Registry and video manager compliance guard.
 *
 * `GET /v1/videos/generations` advertises everything that is in VIDEO_PROVIDERS without
 * marks `unsupported`. The `handleVideoGeneration` manager can do less: it
 * parses `providerConfig.format` with a chain of branches plus job presets, and on
 * if the format is unfamiliar, it responds with `Unsupported video format`. Bye lists
 * diverge, the catalog promises models that the performer is guaranteed
 * rejects from 400 - regardless of keys and balance. Live check 2026-08-30:
 * `minimax/MiniMax-Hailuo-02`, `pollinations/default` and `nanogpt/default`
 * they gave exactly this 400, being in the catalog issue.
 *
 * Parsing is carried out according to the dispatcher text, and not by calling: an unknown format is visible until
 * the first network request, and a live call to each provider in a unit test or
 * goes online or hangs on retrays. Price - the test needs to be corrected if
 * the `format === "..."` chain will be replaced with another construction; then the counter
 * recognized formats will drop to zero and the guard below will say this directly.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");

const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");

function readSource(relativePath: string) {
  return fs.readFileSync(path.join(REPO_ROOT, relativePath), "utf8");
}

/** Formats for which the dispatcher has its own branch. */
function branchFormats() {
  const source = readSource("open-sse/handlers/videoGeneration.ts");
  return new Set(
    [...source.matchAll(/providerConfig\.format === "([a-z0-9-]+)"/g)].map((match) => match[1])
  );
}

/** Formats served by the common submit → poll pipeline of job presets. */
function jobPresetFormats() {
  const source = readSource("open-sse/handlers/videoGeneration/job.ts");
  const block = source.slice(source.indexOf("VIDEO_JOB_PRESETS"));
  return new Set([...block.matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{/gm)].map((match) => match[1]));
}

test("dispatcher formats are still discoverable in the source", () => {
  assert.ok(
    branchFormats().size >= 10,
    "в videoGeneration.ts не нашлось ветвлений по providerConfig.format — " +
      "диспетчер переписан, и разбор в этом тесте пора обновить"
  );
  assert.ok(
    jobPresetFormats().size >= 1,
    "в videoGeneration/job.ts не нашлось job-пресетов — разбор пора обновить"
  );
});

test("every advertised video provider declares a format the dispatcher handles", () => {
  const dispatchable = new Set([...branchFormats(), ...jobPresetFormats()]);

  const broken = Object.entries(VIDEO_PROVIDERS)
    .filter(([, config]) => !config.unsupported)
    .filter(([, config]) => !dispatchable.has(config.format))
    .map(([providerId, config]) => `${providerId} (format: ${config.format})`);

  assert.deepEqual(
    broken,
    [],
    "каталог рекламирует провайдеров, чей формат диспетчер не разбирает — " +
      "либо добавьте ветку, либо пометьте провайдера unsupported:\n  " +
      broken.join("\n  ")
  );
});

test("unsupported providers state a reason", () => {
  const silent = Object.entries(VIDEO_PROVIDERS)
    .filter(([, config]) => config.unsupported)
    .filter(([, config]) => !config.unsupportedReason?.trim())
    .map(([providerId]) => providerId);

  assert.deepEqual(silent, [], "провайдер снят с витрины без причины: " + silent.join(", "));
});
