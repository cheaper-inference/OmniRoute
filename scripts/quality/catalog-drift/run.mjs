import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { parseArgs } from "node:util";

import { z } from "zod";

import { isMainModule } from "../../lib/is-main-module.mjs";
import { FETCH_DEFAULTS, createHostThrottle, fetchSource } from "./fetchSource.mjs";
import { loadManifest, probeUrlErrors } from "./manifest.mjs";
import { backsFindings, classifyResponse, evaluateProbe, measureText } from "./probes.mjs";
import { buildReport, renderMarkdown } from "./report.mjs";
import {
  FETCH_FAILURE_THRESHOLD,
  emptyState,
  loadState,
  recordFetch,
  recordProviderRun,
} from "./state.mjs";

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
/** @typedef {import("./state.mjs").DriftState} DriftState */

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

async function fetchWithRetry(probe, fetchImpl, sleep, remainingMs) {
  const attempt = () =>
    fetchSource(probe.url, {
      fetchImpl,
      timeoutMs: Math.max(1, Math.min(FETCH_DEFAULTS.timeoutMs, remainingMs())),
    });
  const result = await attempt();
  if (
    result.ok ||
    !RETRY_FAILURES.has(result.failure) ||
    remainingMs() <= FETCH_DEFAULTS.retryDelayMs
  )
    return result;

  await sleep(FETCH_DEFAULTS.retryDelayMs);
  return remainingMs() > 0 ? attempt() : result;
}

function probeResultBase({ id, provider, type, url }) {
  return { id, provider, type, url, httpStatus: null, textChars: null, findings: [], stats: null };
}

/** @returns {ProbeResult} */
function resultForSource(probe, source, catalogRows, prevTextChars) {
  const base = { ...probeResultBase(probe), httpStatus: source.status };
  if (!source.ok) return { ...base, status: "fetch-failed", detail: source.detail };

  const textChars = measureText(probe, source);
  if (classifyResponse(probe, source, prevTextChars) === "invalid-response") {
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

function failureFinding(result, source) {
  const kind =
    result.status === "invalid-response"
      ? "invalid-response"
      : source.failure === "gone"
        ? "gone"
        : "unreachable";
  const message =
    result.status === "invalid-response"
      ? "The probe received an invalid response in consecutive runs"
      : "The probe could not read the source in consecutive runs";
  return {
    provider: result.provider,
    probeId: result.id,
    kind,
    severity: "drift",
    message,
    details: { status: result.httpStatus, ...(result.detail && { detail: result.detail }) },
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
  state = emptyState(),
  now = Date.now,
  fetchImpl = globalThis.fetch,
  sleep = delay,
  deadlineMs = FETCH_DEFAULTS.deadlineMs,
}) {
  if (replay && !REPLAY_TAG.test(replay.tag)) throw new Error("Invalid replay tag");
  const startedAt = now();
  const runAt = new Date(startedAt).toISOString();
  const remainingMs = () => deadlineMs - (now() - startedAt);
  const liveFetch = createLiveFetch({ allowedHosts: manifest.allowedHosts, fetchImpl, now, sleep });
  const probeResults = [];
  for (const probe of manifest.probes) {
    if (only !== null && probe.provider !== only) continue;
    if (remainingMs() <= 0) {
      probeResults.push({ ...probeResultBase(probe), status: "skipped", detail: "deadline" });
      continue;
    }

    const source = replay
      ? await readReplay(probe, replay)
      : await fetchWithRetry(probe, liveFetch, sleep, remainingMs);
    const result = resultForSource(probe, source, catalogRows, state.probes[probe.id]?.textChars);
    const failed = result.status === "fetch-failed" || result.status === "invalid-response";
    const recorded = recordFetch(
      state,
      probe.id,
      failed ? "failed" : "ok",
      runAt,
      result.textChars
    );
    state = recorded.state;
    if (failed && recorded.consecutiveFailures >= FETCH_FAILURE_THRESHOLD) {
      result.findings.push(failureFinding(result, source));
    }
    probeResults.push(result);
  }

  const report = buildReport({
    runAt,
    catalogCuratedAt,
    manifest,
    probeResults,
    catalogRows,
    only,
  });
  for (const [provider, result] of Object.entries(report.providers)) {
    const recorded = recordProviderRun(state, provider, result.fingerprint, runAt);
    state = recorded.state;
    result.consecutiveRuns = recorded.consecutiveRuns;
  }
  return { report, state };
}

async function saveState(file, state) {
  await mkdir(dirname(file), { recursive: true });
  const temporary = file + "." + randomUUID() + ".tmp";
  try {
    await writeFile(temporary, JSON.stringify(state, null, 2) + "\n");
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
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
  const { report, state } = await runDrift({
    manifest,
    ...catalog,
    only: values.only,
    state: values.state ? loadState(values.state) : emptyState(),
    replay: values.replay ? { dir: values.replay, tag } : null,
  });
  if (values.state) await saveState(values.state, state);
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
