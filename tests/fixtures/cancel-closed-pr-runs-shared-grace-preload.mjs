import { writeSync } from "node:fs";

const API_ORIGIN = "https://fixture.invalid";
const REPO = "cheaper-inference/OmniRoute";
const HEAD_OWNER = REPO.slice(0, REPO.indexOf("/"));
const PR_NUMBER = 42;
const HEAD_REF = "fix/thing";
const HEAD_SHA = "head-current";

if (process.env.OMNIROUTE_CANCEL_TEST_SCENARIO !== "shared-grace") {
  throw new Error("shared-grace fixture loaded without its explicit test scenario");
}

const rawIds = process.env.OMNIROUTE_CANCEL_TEST_IDS ?? "";
const idParts = rawIds.split(",");
const ids = idParts.map(Number);
if (
  rawIds.length === 0 ||
  idParts.some((part) => !/^[1-9]\d*$/.test(part)) ||
  ids.some((id) => !Number.isSafeInteger(id)) ||
  new Set(ids).size !== ids.length
) {
  throw new Error("shared-grace fixture requires unique positive safe-integer run ids");
}

let logicalNowMs = 0;
let emitted = false;
const forced = new Set();
const normalCancelIds = [];
const forceCancelIds = [];
const cancelOperationOrder = [];
const sleepsMs = [];
const requestTrace = [];
const queuedReadIds = [];
const terminalReadIds = [];

Date.now = () => logicalNowMs;
globalThis.setTimeout = (callback, delay = 0, ...args) => {
  const delayMs = Math.max(0, Number(delay) || 0);
  logicalNowMs += delayMs;
  sleepsMs.push(delayMs);
  queueMicrotask(() => callback(...args));
  return {
    hasRef: () => false,
    ref() {
      return this;
    },
    unref() {
      return this;
    },
  };
};
globalThis.clearTimeout = () => {};

function run(id, overrides = {}) {
  return {
    id,
    name: "CI",
    status: "queued",
    event: "pull_request",
    head_branch: HEAD_REF,
    head_sha: HEAD_SHA,
    head_repository: { full_name: REPO },
    pull_requests: [{ number: PR_NUMBER }],
    ...overrides,
  };
}

function reply(status, body = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return body;
    },
  };
}

function hasExactQuery(url, expected) {
  const entries = Object.entries(expected);
  return (
    url.hash === "" &&
    url.searchParams.size === entries.length &&
    entries.every(([key, value]) => {
      const values = url.searchParams.getAll(key);
      return values.length === 1 && values[0] === value;
    })
  );
}

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(typeof input === "string" ? input : input.url);
  const method = init.method ?? "GET";
  if (url.origin !== API_ORIGIN) {
    throw new Error(`shared-grace fixture rejected unexpected origin: ${url.origin}`);
  }
  requestTrace.push(`${method} ${url.pathname}`);

  if (method === "GET" && url.pathname === `/repos/${REPO}/pulls/${PR_NUMBER}`) {
    if (url.search !== "" || url.hash !== "") {
      throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.href}`);
    }
    return reply(200, {
      number: PR_NUMBER,
      state: "closed",
      head: { ref: HEAD_REF, sha: HEAD_SHA, repo: { full_name: REPO } },
      base: { repo: { full_name: REPO } },
    });
  }
  if (method === "GET" && url.pathname === `/repos/${REPO}/pulls`) {
    if (
      !hasExactQuery(url, {
        state: "open",
        head: `${HEAD_OWNER}:${HEAD_REF}`,
        per_page: "100",
        page: "1",
      })
    ) {
      throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.href}`);
    }
    return reply(200, []);
  }
  if (method === "GET" && url.pathname === `/repos/${REPO}/actions/runs`) {
    if (!hasExactQuery(url, { branch: HEAD_REF, per_page: "100", page: "1" })) {
      throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.href}`);
    }
    return reply(200, { workflow_runs: ids.map((id) => run(id)) });
  }

  const runPathPrefix = `/repos/${REPO}/actions/runs/`;
  if (!url.pathname.startsWith(runPathPrefix)) {
    throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.pathname}`);
  }
  if (url.search !== "" || url.hash !== "") {
    throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.href}`);
  }
  const match = url.pathname
    .slice(runPathPrefix.length)
    .match(/^(\d+)(?:\/(force-cancel|cancel))?$/);
  if (!match) {
    throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.pathname}`);
  }
  const idText = match[1];
  const id = Number(idText);
  const operation = match[2];
  if (idText !== String(id) || !ids.includes(id)) {
    throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.pathname}`);
  }
  if (method === "POST" && operation === "cancel") {
    normalCancelIds.push(id);
    cancelOperationOrder.push(`normal:${id}`);
    return reply(202);
  }
  if (method === "POST" && operation === "force-cancel") {
    forced.add(id);
    forceCancelIds.push(id);
    cancelOperationOrder.push(`force:${id}`);
    return reply(202);
  }
  if (method === "GET" && operation === undefined) {
    const status = forced.has(id) ? "completed" : "queued";
    if (status === "completed") terminalReadIds.push(id);
    else queuedReadIds.push(id);
    return reply(
      200,
      run(id, {
        status,
        conclusion: status === "completed" ? "cancelled" : null,
      })
    );
  }

  throw new Error(`shared-grace fixture received unexpected request: ${method} ${url.pathname}`);
};

function emitSummary() {
  if (emitted) return;
  emitted = true;
  const summary = {
    logicalNowMs,
    sleepsMs,
    normalCancelIds,
    forceCancelIds,
    cancelOperationOrder,
    requestTrace,
    queuedReadIds,
    terminalReadIds,
  };
  writeSync(3, JSON.stringify(summary));
}

process.once("beforeExit", emitSummary);
process.once("exit", emitSummary);
