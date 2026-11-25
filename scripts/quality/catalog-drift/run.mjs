import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { parseArgs } from "node:util";

import { z } from "zod";

import { isMainModule } from "../../lib/is-main-module.mjs";
import { FETCH_DEFAULTS, createHostThrottle, fetchSource } from "./fetchSource.mjs";
import { loadManifest, probeUrlErrors } from "./manifest.mjs";
import { backsFindings, classifyResponse, evaluateProbe, measureText } from "./probes.mjs";
import { buildReport, renderMarkdown } from "./report.mjs";

const RETRY_FAILURES = new Set(["network", "timeout", "http", "gone"]);
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REDIRECTS = 20;
const REPLAY_TAG = /^[a-zA-Z0-9_-]+$/;
const REPLAY_CONTENT_TYPES = { json: "application/json", html: "text/html", txt: "text/plain" };
const catalogSnapshot = z.object({
  catalogCuratedAt: z.iso.date(),
  catalogRows: z.array(
    z.object({
      provider: z.string().min(1),
      modelId: z.string().min(1),
      poolKey: z.string().nullable(),
      monthlyTokens: z.number().int().nonnegative(),
      freeType: z.string().min(1),
    })
  ),
});

/** @typedef {import("./manifest.mjs").Manifest} Manifest */
/** @typedef {import("./report.mjs").ProbeResult} ProbeResult */
/** @typedef {{ schemaVersion: 1, probes: Record<string, object>, providers: Record<string, object> }} DriftState */

async function readReplay(probe, { dir, tag }) {
  const extensions = probe.type === "page-text" ? ["html", "txt"] : ["json"];
  for (const extension of extensions) {
    try {
      const text = await readFile(join(dir, probe.id + "." + tag + "." + extension), "utf8");
      return { ok: true, status: 200, contentType: REPLAY_CONTENT_TYPES[extension], text };
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  throw new Error("Missing replay source for " + probe.id + " (" + tag + ")");
}

function createLiveFetch({ allowedHosts, fetchImpl, now, sleep }) {
  const hosts = new Set(allowedHosts);
  const throttle = createHostThrottle({ now, sleep });
  return async (url, init) => {
    let target = url;
    for (let redirects = 0; ; redirects++) {
      await throttle.wait(new URL(target).hostname);
      init.signal.throwIfAborted();
      // Validate each hop before sending the next GET.
      const response = await fetchImpl(target, { ...init, redirect: "manual" });
      if (!REDIRECT_STATUSES.has(response.status) || redirects === MAX_REDIRECTS) return response;
      const location = response.headers.get("location");
      const next = location && URL.parse(location, target);
      if (!next || probeUrlErrors("redirect", next.href, hosts).length) return response;
      void response.body?.cancel().catch(() => {});
      target = next.href;
    }
  };
}

async function fetchWithRetry(probe, fetchImpl, sleep) {
  const result = await fetchSource(probe.url, { fetchImpl });
  if (result.ok || !RETRY_FAILURES.has(result.failure)) return result;

  await sleep(FETCH_DEFAULTS.retryDelayMs);
  return fetchSource(probe.url, { fetchImpl });
}

/** @returns {ProbeResult} */
function resultForSource(probe, source, catalogRows) {
  const { id, provider, type, url } = probe;
  const base = {
    id,
    provider,
    type,
    url,
    httpStatus: source.status,
    textChars: null,
    findings: [],
    stats: null,
  };
  if (!source.ok) return { ...base, status: "fetch-failed" };

  const textChars = measureText(probe, source);
  if (classifyResponse(probe, source) === "invalid-response") {
    return { ...base, textChars, status: "invalid-response" };
  }
  const evaluation = evaluateProbe(probe, source, { catalogRows });
  const findings = [...evaluation.findings, ...backsFindings(probe, catalogRows)];
  return {
    ...base,
    textChars,
    findings,
    stats: evaluation.stats,
    status: findings.some(({ severity }) => severity === "drift") ? "drift" : "ok",
  };
}

/** @param {{
 *   manifest: Manifest, catalogRows: object[], catalogCuratedAt: string,
 *   replay?: {dir: string, tag: string}|null, only?: string|null, state?: DriftState,
 *   now?: () => number, fetchImpl?: typeof fetch, sleep?: (ms: number) => Promise<unknown>,
 *   deadlineMs?: number
 * }} options */
export async function runDrift({
  manifest,
  catalogRows,
  catalogCuratedAt,
  replay = null,
  only = null,
  state = { schemaVersion: 1, probes: {}, providers: {} },
  now = Date.now,
  fetchImpl = globalThis.fetch,
  sleep = delay,
}) {
  if (replay && !REPLAY_TAG.test(replay.tag)) throw new Error("Invalid replay tag");
  const runAt = new Date(now()).toISOString();
  const liveFetch = createLiveFetch({ allowedHosts: manifest.allowedHosts, fetchImpl, now, sleep });
  const probeResults = [];
  for (const probe of manifest.probes) {
    if (only !== null && probe.provider !== only) continue;
    const source = replay
      ? await readReplay(probe, replay)
      : await fetchWithRetry(probe, liveFetch, sleep);
    probeResults.push(resultForSource(probe, source, catalogRows));
  }

  return {
    report: buildReport({ runAt, catalogCuratedAt, manifest, probeResults, catalogRows, only }),
    state,
  };
}

async function readCatalog(file) {
  if (file) return catalogSnapshot.parse(JSON.parse(await readFile(file, "utf8")));

  const { FREE_MODEL_BUDGETS, FREE_CATALOG_CURATED_AT } =
    await import("../../../open-sse/config/freeModelCatalog.data.ts");
  return { catalogRows: FREE_MODEL_BUDGETS, catalogCuratedAt: FREE_CATALOG_CURATED_AT };
}

async function main() {
  const { values } = parseArgs({
    options: {
      out: { type: "string" },
      manifest: { type: "string" },
      catalog: { type: "string" },
      replay: { type: "string" },
      "replay-tag": { type: "string" },
      // The state file is reserved for consecutive-run tracking.
      state: { type: "string" },
      only: { type: "string" },
    },
  });
  if (!values.out) throw new Error("--out <dir> is required");
  const tag = values["replay-tag"];
  if (Boolean(values.replay) !== Boolean(tag)) {
    throw new Error("--replay and --replay-tag are required together");
  }

  const manifest = loadManifest(values.manifest ?? new URL("./manifest.json", import.meta.url));
  const catalog = await readCatalog(values.catalog);
  const { report } = await runDrift({
    manifest,
    ...catalog,
    only: values.only,
    replay: values.replay ? { dir: values.replay, tag } : null,
  });
  const markdown = renderMarkdown(report);
  await mkdir(values.out, { recursive: true });
  await Promise.all([
    writeFile(join(values.out, "report.json"), JSON.stringify(report, null, 2) + "\n"),
    writeFile(join(values.out, "report.md"), markdown),
  ]);
}

if (isMainModule(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
