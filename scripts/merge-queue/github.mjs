// scripts/merge-queue/github.mjs — WP4. Minimal REST client for omni-queue (fetch, no deps).
//
// Every method returns NORMALIZED objects (shapes below / in eligibility.mjs, checks.mjs,
// classify.mjs) so pure modules never see raw API payloads. Retries with exponential backoff on
// network errors, 5xx, 429 and secondary-rate-limit 403 (honors Retry-After / x-ratelimit-reset).
// Never logs the token or Authorization headers; every error message is redacted.

import { CANDIDATE_PREFIX, commentMarker, isSha } from "./contracts.mjs";

export class GitHubError extends Error {
  /** @param {number} status @param {string} method @param {string} path @param {string} message */
  constructor(status, method, path, message) {
    super(`${method} ${path} → ${status}: ${message}`);
    this.name = "GitHubError";
    this.status = status;
    this.method = method;
    this.path = path;
  }
}

/**
 * @typedef {object} PullSummary
 * @property {number} number
 * @property {boolean} draft
 * @property {string} baseRef
 * @property {string} headSha
 * @property {string} headRef
 * @property {string|null} headRepoFullName
 * @property {string} title
 * @property {string} author
 * @property {string[]} labels
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {PullSummary & {state: "open"|"closed", merged: boolean, mergeable: boolean|null,
 *           mergeableState: string, body: string}} Pull
 */

/**
 * @typedef {object} GitHubClient
 * @property {string} owner
 * @property {string} repo
 * @property {(method: string, path: string, opts?: {query?: object, body?: unknown,
 *            accept?: string, allowStatuses?: number[]}) => Promise<{status: number, data: any,
 *            headers: Headers}>} request
 * @property {(path: string, query?: object) => Promise<any[]>} paginate  follows Link rel="next";
 *            unwraps {total_count, <items>} envelopes (check_runs, workflow_runs, ...)
 *
 * — pull requests / issues —
 * @property {(opts?: {base?: string}) => Promise<PullSummary[]>} listOpenPulls
 * @property {(n: number) => Promise<Pull>} getPull
 * @property {(n: number) => Promise<string[]>} listPullFiles   incl. previous_filename of renames
 * @property {(n: number) => Promise<import("./eligibility.mjs").TimelineEvent[]>} listIssueTimeline
 * @property {(n: number, labels: string[]) => Promise<void>} addLabels
 * @property {(n: number, label: string) => Promise<void>} removeLabel   404 = already absent (ok)
 * @property {(n: number) => Promise<{id: number, body: string, author: string,
 *            createdAt: string}[]>} listIssueComments
 * @property {(n: number, body: string) => Promise<{id: number}>} createIssueComment
 * @property {(n: number, key: string, body: string) => Promise<{posted: boolean}>} commentOnce
 *            posts `body + "\n\n" + contracts.commentMarker(key)` unless a comment on issue/PR n
 *            already contains that marker (then {posted:false}). The ONLY way queue code comments.
 * @property {(opts: {labels?: string[], state?: "open"|"closed"|"all"}) => Promise<{number: number,
 *            title: string, body: string, labels: string[], state: string,
 *            updatedAt: string}[]>} listIssues   issues only (PRs filtered out)
 * @property {(input: {title: string, body: string, labels?: string[]}) => Promise<{number: number}>} createIssue
 * @property {(n: number, patch: {title?: string, body?: string, state?: string}) => Promise<void>} updateIssue
 *
 * — commits / checks / statuses —
 * @property {(branch: string) => Promise<string|null>} getBranchSha   null when absent
 * @property {(sha: string) => Promise<{sha: string, treeSha: string, parents: string[],
 *            message: string}>} getCommit
 * @property {(sha: string) => Promise<import("./checks.mjs").CheckRun[]>} listCheckRuns
 * @property {(checkRunId: number) => Promise<import("./classify.mjs").Annotation[]>} listCheckRunAnnotations
 * @property {(sha: string) => Promise<import("./eligibility.mjs").CommitStatus[]>} listCommitStatuses  newest first
 * @property {(sha: string, s: {state: string, context: string, description: string,
 *            targetUrl?: string}) => Promise<void>} createCommitStatus
 *
 * — merge (squash-api landing) —
 * @property {(n: number, opts: {method: "squash"|"merge", sha: string, commitTitle?: string,
 *            commitMessage?: string}) => Promise<{merged: boolean, sha: string|null,
 *            status: number, message: string}>} mergePull   405/409 → merged:false (no throw)
 *
 * — contents API (state store CAS) —
 * @property {(path: string, ref: string) => Promise<{content: string, sha: string}|null>} getFileContent
 * @property {(path: string, input: {branch: string, message: string, content: string,
 *            sha?: string|null}) => Promise<{ok: true, sha: string}|{ok: false,
 *            conflict: true}>} putFileContent   409/422 sha mismatch → conflict
 * @property {(branch: string, files: {path: string, content: string}[], message: string)
 *            => Promise<string|null>} createOrphanBranch   commit sha; null if branch exists
 *
 * — refs / actions / rulesets —
 * @property {(prefix: string) => Promise<{ref: string, sha: string}[]>} listMatchingBranches
 *            (GET /git/matching-refs/heads/<prefix>; ref = branch name without refs/heads/)
 * @property {(branch: string) => Promise<void>} deleteBranch   refuses names outside
 *            contracts.CANDIDATE_PREFIX; 404/422 = already gone
 * @property {(q: {branch?: string, headSha?: string, event?: string}) => Promise<{id: number,
 *            name: string, status: string, conclusion: string|null, htmlUrl: string,
 *            headSha: string, event: string}[]>} listWorkflowRuns
 * @property {(workflowFile: string, ref: string, inputs: object) => Promise<void>} dispatchWorkflow
 * @property {() => Promise<object[]>} listRulesets
 * @property {(id: number) => Promise<object>} getRuleset
 * @property {(body: object) => Promise<object>} createRuleset
 * @property {(id: number, body: object) => Promise<object>} updateRuleset
 */

const DEFAULT_API_URL = "https://api.github.com";
const DEFAULT_USER_AGENT = "omni-queue";
const API_VERSION = "2022-11-28";
const PER_PAGE = 100;
const MAX_PAGES = 50;
const MAX_STATUS_DESCRIPTION = 140;

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ───────────────────────────── helpers (exported for tests) ─────────────────────────────

/**
 * Parse an RFC 8288 Link header into {rel: url}.
 * @param {string|null|undefined} header
 * @returns {Object<string, string>}
 */
export function parseLinkHeader(header) {
  const out = {};
  for (const part of String(header ?? "").split(",")) {
    const m = /<([^>]+)>\s*;\s*rel="([^"]+)"/.exec(part);
    if (m) for (const rel of m[2].split(/\s+/)) out[rel] = m[1];
  }
  return out;
}

/**
 * True when a 403/429 is a (primary or secondary) rate limit and thus worth retrying.
 * @param {number} status @param {Headers|null} headers @param {any} data
 */
export function isRateLimited(status, headers, data) {
  if (status === 429) return true;
  if (status !== 403) return false;
  if (headers?.get("retry-after")) return true;
  if (headers?.get("x-ratelimit-remaining") === "0") return true;
  return /rate limit/i.test(String(data?.message ?? ""));
}

/**
 * Delay before retry `attempt` (0-based): Retry-After seconds, else the primary-limit reset
 * time, else exponential backoff. Always within [0, maxDelayMs].
 * @param {number} attempt
 * @param {Headers|null} headers
 * @param {{baseDelayMs: number, maxDelayMs: number, nowMs: number}} opts
 */
export function retryDelayMs(attempt, headers, { baseDelayMs, maxDelayMs, nowMs }) {
  const clamp = (ms) => Math.min(maxDelayMs, Math.max(0, Math.round(ms)));
  const retryAfter = headers?.get("retry-after")?.trim();
  if (retryAfter && /^\d+$/.test(retryAfter)) return clamp(Number(retryAfter) * 1000);
  if (headers?.get("x-ratelimit-remaining") === "0") {
    const reset = Number(headers.get("x-ratelimit-reset"));
    if (Number.isFinite(reset) && reset > 0) return clamp(reset * 1000 - nowMs + 1000);
  }
  return clamp(baseDelayMs * 2 ** attempt);
}

/** "a/b c" → "a/b%20c": encodes each path segment, keeps the separators. */
export function encodePath(path) {
  return String(path)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

const labelNames = (labels) =>
  (labels ?? []).map((l) => (typeof l === "string" ? l : l?.name)).filter(Boolean);

/** @returns {PullSummary} */
export function normalizePullSummary(raw) {
  return {
    number: raw.number,
    draft: raw.draft === true,
    baseRef: raw.base?.ref ?? "",
    headSha: raw.head?.sha ?? "",
    headRef: raw.head?.ref ?? "",
    headRepoFullName: raw.head?.repo?.full_name ?? null,
    title: String(raw.title ?? ""),
    author: raw.user?.login ?? "",
    labels: labelNames(raw.labels),
    createdAt: raw.created_at ?? "",
    updatedAt: raw.updated_at ?? "",
  };
}

/** @returns {Pull} */
export function normalizePull(raw) {
  return {
    ...normalizePullSummary(raw),
    state: raw.state === "closed" ? "closed" : "open",
    merged: raw.merged === true || Boolean(raw.merged_at),
    mergeable: typeof raw.mergeable === "boolean" ? raw.mergeable : null,
    mergeableState: String(raw.mergeable_state ?? "unknown"),
    body: String(raw.body ?? ""),
  };
}

/**
 * Normalize one issue timeline event. Server-side `created_at`/`actor` are trusted; `committed`
 * events carry only git dates (author/committer), which are forgeable, so createdAt is null.
 * @returns {import("./eligibility.mjs").TimelineEvent}
 */
export function normalizeTimelineEvent(raw) {
  const event = String(raw.event ?? "");
  const out = {
    event,
    actor: raw.actor?.login ?? null,
    createdAt: event === "committed" ? null : (raw.created_at ?? null),
  };
  if ((event === "labeled" || event === "unlabeled") && raw.label?.name) out.label = raw.label.name;
  const sha = raw.commit_id ?? (event === "committed" ? raw.sha : undefined);
  if (sha) out.sha = sha;
  return out;
}

/** @returns {import("./checks.mjs").CheckRun} */
export function normalizeCheckRun(raw) {
  return {
    id: raw.id,
    name: String(raw.name ?? ""),
    status: String(raw.status ?? ""),
    conclusion: raw.conclusion ?? null,
    startedAt: raw.started_at ?? null,
    completedAt: raw.completed_at ?? null,
    htmlUrl: raw.html_url ?? null,
    appSlug: raw.app?.slug ?? null,
    output: {
      title: raw.output?.title ?? null,
      summary: raw.output?.summary ?? null,
      text: raw.output?.text ?? null,
    },
  };
}

/** @returns {import("./classify.mjs").Annotation} */
export function normalizeAnnotation(raw) {
  return {
    path: raw.path ?? null,
    title: raw.title ?? null,
    message: String(raw.message ?? ""),
    level: String(raw.annotation_level ?? raw.level ?? "notice"),
  };
}

/** @returns {import("./eligibility.mjs").CommitStatus} */
export function normalizeStatus(raw) {
  return {
    context: String(raw.context ?? ""),
    state: raw.state,
    creator: raw.creator?.login ?? null,
    description: String(raw.description ?? ""),
    createdAt: raw.created_at ?? "",
    targetUrl: raw.target_url ?? null,
  };
}

export function normalizeIssue(raw) {
  return {
    number: raw.number,
    title: String(raw.title ?? ""),
    body: String(raw.body ?? ""),
    labels: labelNames(raw.labels),
    state: String(raw.state ?? ""),
    updatedAt: raw.updated_at ?? "",
  };
}

export function normalizeComment(raw) {
  return {
    id: raw.id,
    body: String(raw.body ?? ""),
    author: raw.user?.login ?? "",
    createdAt: raw.created_at ?? "",
  };
}

export function normalizeWorkflowRun(raw) {
  return {
    id: raw.id,
    name: String(raw.name ?? ""),
    status: String(raw.status ?? ""),
    conclusion: raw.conclusion ?? null,
    htmlUrl: raw.html_url ?? "",
    headSha: raw.head_sha ?? "",
    event: String(raw.event ?? ""),
  };
}

/** Items of a list response: the array itself, or the array inside a {total_count, …} envelope. */
function unwrapItems(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      if (key !== "total_count" && Array.isArray(value)) return value;
    }
  }
  return [];
}

function errorMessage(data, fallback) {
  if (data && typeof data === "object") {
    const parts = [String(data.message ?? fallback)];
    if (Array.isArray(data.errors)) {
      for (const e of data.errors.slice(0, 5)) {
        parts.push(typeof e === "string" ? e : String(e?.message ?? e?.code ?? ""));
      }
    }
    return parts.filter(Boolean).join("; ").slice(0, 1000);
  }
  return String(data || fallback).slice(0, 1000);
}

// ───────────────────────────── client ─────────────────────────────

/**
 * @param {{token: string, repository: string, apiUrl?: string, fetchImpl?: typeof fetch,
 *          sleep?: (ms: number) => Promise<void>, log?: (msg: string) => void,
 *          maxRetries?: number, userAgent?: string, baseDelayMs?: number, maxDelayMs?: number,
 *          nowMs?: () => number, botLogin?: string}} options
 *   baseDelayMs/maxDelayMs/nowMs tune the backoff (tests); botLogin, when set, makes commentOnce
 *   count only markers in comments authored by that login (a third party cannot pre-post one).
 * @returns {GitHubClient}
 */
export function createGitHubClient(options) {
  const {
    token,
    repository,
    apiUrl = DEFAULT_API_URL,
    fetchImpl = globalThis.fetch,
    sleep = defaultSleep,
    log = () => {},
    maxRetries = 4,
    userAgent = DEFAULT_USER_AGENT,
    baseDelayMs = 1000,
    maxDelayMs = 120_000,
    nowMs = () => Date.now(),
    botLogin,
  } = options ?? {};
  if (!token || typeof token !== "string") throw new Error("createGitHubClient: token required");
  const m = /^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/.exec(String(repository ?? ""));
  if (!m) throw new Error(`createGitHubClient: invalid repository ${JSON.stringify(repository)}`);
  const [, owner, repo] = m;
  const apiBase = String(apiUrl).replace(/\/+$/, "");
  const apiOrigin = new URL(apiBase).origin;
  const repoPath = `/repos/${owner}/${repo}`;

  const redact = (text) =>
    String(text ?? "")
      .split(token)
      .join("***");

  /** Resolve a path (relative to the API root) or a pagination URL on the same origin. */
  function resolveUrl(path, query) {
    let url;
    if (/^https?:\/\//i.test(path)) {
      url = new URL(path);
      if (url.origin !== apiOrigin)
        throw new Error(`refusing to call foreign origin ${url.origin}`);
    } else {
      url = new URL(`${apiBase}${path.startsWith("/") ? "" : "/"}${path}`);
    }
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
    return url;
  }

  async function request(method, path, opts = {}) {
    const { query, body, accept, allowStatuses = [] } = opts;
    const url = resolveUrl(path, query);
    const shown = `${url.pathname}${url.search}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: accept ?? "application/vnd.github+json",
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": userAgent,
    };
    let payload;
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
    for (let attempt = 0; ; attempt++) {
      let res;
      try {
        res = await fetchImpl(url.href, { method, headers, body: payload });
      } catch (error) {
        const message = redact(error?.message ?? error);
        if (attempt >= maxRetries) throw new GitHubError(0, method, shown, `network: ${message}`);
        const delay = retryDelayMs(attempt, null, { baseDelayMs, maxDelayMs, nowMs: nowMs() });
        log(`${method} ${shown} → network error (${message}); retry in ${delay} ms`);
        await sleep(delay);
        continue;
      }
      const text = await res.text();
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }
      const status = res.status;
      if (status < 400 || allowStatuses.includes(status)) {
        return { status, data, headers: res.headers };
      }
      const retryable = status >= 500 || isRateLimited(status, res.headers, data);
      if (retryable && attempt < maxRetries) {
        const delay = retryDelayMs(attempt, res.headers, {
          baseDelayMs,
          maxDelayMs,
          nowMs: nowMs(),
        });
        log(`${method} ${shown} → ${status}; retry ${attempt + 1}/${maxRetries} in ${delay} ms`);
        await sleep(delay);
        continue;
      }
      throw new GitHubError(status, method, shown, redact(errorMessage(data, res.statusText)));
    }
  }

  async function paginate(path, query = {}, { maxPages = MAX_PAGES } = {}) {
    const items = [];
    let next = path;
    let q = { per_page: PER_PAGE, ...query };
    for (let page = 0; next; page++) {
      if (page >= maxPages) {
        log(`paginate ${path}: stopped after ${maxPages} pages`);
        break;
      }
      const res = await request("GET", next, { query: q });
      items.push(...unwrapItems(res.data));
      next = parseLinkHeader(res.headers.get("link")).next ?? null;
      q = undefined; // the next URL already carries every query parameter
    }
    return items;
  }

  const r = (suffix) => `${repoPath}${suffix}`;
  const assertNumber = (n) => {
    if (!Number.isSafeInteger(n) || n <= 0) throw new Error(`invalid issue/PR number: ${n}`);
  };
  const assertSha = (sha) => {
    if (!isSha(sha)) throw new Error(`invalid sha: ${sha}`);
  };
  const toBase64 = (s) => Buffer.from(String(s), "utf8").toString("base64");
  const fromBase64 = (s) => Buffer.from(String(s).replace(/\s+/g, ""), "base64").toString("utf8");

  async function listIssueComments(n) {
    assertNumber(n);
    return (await paginate(r(`/issues/${n}/comments`))).map(normalizeComment);
  }

  async function createIssueComment(n, body) {
    assertNumber(n);
    const res = await request("POST", r(`/issues/${n}/comments`), { body: { body } });
    return { id: res.data?.id };
  }

  return {
    owner,
    repo,
    request,
    paginate,

    async listOpenPulls({ base } = {}) {
      const query = { state: "open", ...(base ? { base } : {}) };
      return (await paginate(r("/pulls"), query)).map(normalizePullSummary);
    },

    async getPull(n) {
      assertNumber(n);
      return normalizePull((await request("GET", r(`/pulls/${n}`))).data);
    },

    async listPullFiles(n) {
      assertNumber(n);
      const files = new Set();
      for (const f of await paginate(r(`/pulls/${n}/files`))) {
        if (f.filename) files.add(f.filename);
        if (f.previous_filename) files.add(f.previous_filename);
      }
      return [...files];
    },

    async listIssueTimeline(n) {
      assertNumber(n);
      return (await paginate(r(`/issues/${n}/timeline`))).map(normalizeTimelineEvent);
    },

    async addLabels(n, labels) {
      assertNumber(n);
      await request("POST", r(`/issues/${n}/labels`), { body: { labels } });
    },

    async removeLabel(n, label) {
      assertNumber(n);
      await request("DELETE", r(`/issues/${n}/labels/${encodeURIComponent(label)}`), {
        allowStatuses: [404],
      });
    },

    listIssueComments,
    createIssueComment,

    async commentOnce(n, key, body) {
      const marker = commentMarker(key);
      const existing = await listIssueComments(n);
      const found = existing.some(
        (c) => c.body.includes(marker) && (!botLogin || c.author === botLogin)
      );
      if (found) return { posted: false };
      await createIssueComment(n, `${body}\n\n${marker}`);
      return { posted: true };
    },

    async listIssues({ labels, state = "open" } = {}) {
      const query = { state, ...(labels?.length ? { labels: labels.join(",") } : {}) };
      return (await paginate(r("/issues"), query))
        .filter((i) => !i.pull_request)
        .map(normalizeIssue);
    },

    async createIssue({ title, body, labels }) {
      const res = await request("POST", r("/issues"), {
        body: { title, body, ...(labels ? { labels } : {}) },
      });
      return { number: res.data?.number };
    },

    async updateIssue(n, patch) {
      assertNumber(n);
      await request("PATCH", r(`/issues/${n}`), { body: patch });
    },

    async getBranchSha(branch) {
      const res = await request("GET", r(`/git/ref/heads/${encodePath(branch)}`), {
        allowStatuses: [404],
      });
      if (res.status === 404) return null;
      // A prefix match returns an array (older API behavior): only an exact ref counts.
      if (Array.isArray(res.data)) return null;
      return res.data?.object?.sha ?? null;
    },

    async getCommit(sha) {
      assertSha(sha);
      const { data } = await request("GET", r(`/git/commits/${sha}`));
      return {
        sha: data.sha,
        treeSha: data.tree?.sha ?? "",
        parents: (data.parents ?? []).map((p) => p.sha),
        message: String(data.message ?? ""),
      };
    },

    async listCheckRuns(sha) {
      assertSha(sha);
      return (await paginate(r(`/commits/${sha}/check-runs`), { filter: "all" })).map(
        normalizeCheckRun
      );
    },

    async listCheckRunAnnotations(checkRunId) {
      assertNumber(checkRunId);
      return (await paginate(r(`/check-runs/${checkRunId}/annotations`))).map(normalizeAnnotation);
    },

    async listCommitStatuses(sha) {
      assertSha(sha);
      const statuses = (await paginate(r(`/commits/${sha}/statuses`))).map(normalizeStatus);
      // Newest first; the sort is stable, so equal timestamps keep the API order.
      return statuses
        .map((s, i) => ({ s, i, t: Date.parse(s.createdAt) || 0 }))
        .sort((a, b) => b.t - a.t || a.i - b.i)
        .map(({ s }) => s);
    },

    async createCommitStatus(sha, { state, context, description, targetUrl }) {
      assertSha(sha);
      await request("POST", r(`/statuses/${sha}`), {
        body: {
          state,
          context,
          description: String(description ?? "").slice(0, MAX_STATUS_DESCRIPTION),
          ...(targetUrl ? { target_url: targetUrl } : {}),
        },
      });
    },

    async mergePull(n, { method, sha, commitTitle, commitMessage }) {
      assertNumber(n);
      assertSha(sha);
      const res = await request("PUT", r(`/pulls/${n}/merge`), {
        body: {
          merge_method: method,
          sha,
          ...(commitTitle !== undefined ? { commit_title: commitTitle } : {}),
          ...(commitMessage !== undefined ? { commit_message: commitMessage } : {}),
        },
        allowStatuses: [405, 409],
      });
      return {
        merged: res.status < 300 && res.data?.merged === true,
        sha: res.status < 300 ? (res.data?.sha ?? null) : null,
        status: res.status,
        message: String(res.data?.message ?? ""),
      };
    },

    async getFileContent(path, ref) {
      const res = await request("GET", r(`/contents/${encodePath(path)}`), {
        query: { ref },
        allowStatuses: [404],
      });
      if (res.status === 404) return null;
      const data = res.data;
      if (!data || Array.isArray(data) || data.type !== "file") {
        throw new Error(`getFileContent: ${path} is not a file`);
      }
      if (data.encoding === "base64" && typeof data.content === "string") {
        return { content: fromBase64(data.content), sha: data.sha };
      }
      // Files over 1 MB come back without inline content: read the blob instead.
      const blob = (await request("GET", r(`/git/blobs/${data.sha}`))).data;
      return { content: fromBase64(blob.content), sha: data.sha };
    },

    async putFileContent(path, { branch, message, content, sha }) {
      const res = await request("PUT", r(`/contents/${encodePath(path)}`), {
        body: {
          message,
          content: toBase64(content),
          branch,
          ...(sha ? { sha } : {}),
        },
        allowStatuses: [409, 422],
      });
      if (res.status === 409) return { ok: false, conflict: true };
      if (res.status === 422) {
        const message422 = errorMessage(res.data, "Unprocessable Entity");
        if (/\bsha\b/i.test(message422)) return { ok: false, conflict: true };
        throw new GitHubError(422, "PUT", `${r("/contents/")}${path}`, redact(message422));
      }
      return { ok: true, sha: res.data?.content?.sha };
    },

    async createOrphanBranch(branch, files, message) {
      const tree = [];
      for (const file of files) {
        const blob = await request("POST", r("/git/blobs"), {
          body: { content: toBase64(file.content), encoding: "base64" },
        });
        tree.push({ path: file.path, mode: "100644", type: "blob", sha: blob.data.sha });
      }
      const treeRes = await request("POST", r("/git/trees"), { body: { tree } });
      const commit = await request("POST", r("/git/commits"), {
        body: { message, tree: treeRes.data.sha, parents: [] },
      });
      const ref = await request("POST", r("/git/refs"), {
        body: { ref: `refs/heads/${branch}`, sha: commit.data.sha },
        allowStatuses: [422],
      });
      if (ref.status === 422) {
        const msg = errorMessage(ref.data, "Unprocessable Entity");
        if (/already exists/i.test(msg)) return null;
        throw new GitHubError(422, "POST", r("/git/refs"), redact(msg));
      }
      return commit.data.sha;
    },

    async listMatchingBranches(prefix) {
      const refs = await paginate(r(`/git/matching-refs/heads/${encodePath(prefix)}`));
      return refs.map((x) => ({
        ref: String(x.ref ?? "").replace(/^refs\/heads\//, ""),
        sha: x.object?.sha ?? "",
      }));
    },

    async deleteBranch(branch) {
      const name = String(branch ?? "");
      if (
        !name.startsWith(CANDIDATE_PREFIX) ||
        name.length === CANDIDATE_PREFIX.length ||
        name.split("/").some((s) => s === ".." || s === "")
      ) {
        throw new Error(`deleteBranch: refusing to delete ${JSON.stringify(name)}`);
      }
      await request("DELETE", r(`/git/refs/heads/${encodePath(name)}`), {
        allowStatuses: [404, 422],
      });
    },

    async listWorkflowRuns({ branch, headSha, event } = {}) {
      const query = {
        ...(branch ? { branch } : {}),
        ...(headSha ? { head_sha: headSha } : {}),
        ...(event ? { event } : {}),
      };
      const runs = await paginate(r("/actions/runs"), query, { maxPages: 10 });
      return runs.map(normalizeWorkflowRun);
    },

    async dispatchWorkflow(workflowFile, ref, inputs) {
      await request(
        "POST",
        r(`/actions/workflows/${encodeURIComponent(workflowFile)}/dispatches`),
        {
          body: { ref, inputs },
        }
      );
    },

    async listRulesets() {
      return paginate(r("/rulesets"));
    },

    async getRuleset(id) {
      assertNumber(id);
      return (await request("GET", r(`/rulesets/${id}`))).data;
    },

    async createRuleset(body) {
      return (await request("POST", r("/rulesets"), { body })).data;
    },

    async updateRuleset(id, body) {
      assertNumber(id);
      return (await request("PUT", r(`/rulesets/${id}`), { body })).data;
    },
  };
}
