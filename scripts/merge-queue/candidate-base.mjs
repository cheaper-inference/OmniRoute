#!/usr/bin/env node
// scripts/merge-queue/candidate-base.mjs — WP5. Base SHA of an omni-queue candidate push.
//
// ci.yml / quality.yml call this on `push` to `omni-queue/**` to get the SHA every
// base-relative step must compare against (the equivalent of merge_group.base_sha):
//   node scripts/merge-queue/candidate-base.mjs [--sha <commit>] [--ref <branch>]  → prints
//     BASE_SHA=<40-hex>
//     TARGET=<base branch or empty>
//     SOURCE=trailer|self
// Source "trailer": HEAD's Omni-Queue-Base trailer (contracts.parseQueueTrailers) — a batch
// candidate. Source "self": a base-check candidate (the bare base): BASE_SHA=HEAD.
//
// The ref (--ref, default $GITHUB_REF) disambiguates the two kinds: after a merge-ff landing
// the base tip IS a queue merge commit, so a base-check candidate's top commit carries the
// trailer of an older batch. A base-check ref therefore always resolves to itself, and a batch
// ref without a trailer is an error (fail closed: comparing a batch with itself would hide
// every base-relative regression). Without a ref, the trailer decides.
//
// Zero dependencies (node built-ins only), like every module under scripts/merge-queue/.

import { pathToFileURL } from "node:url";
import {
  baseCheckSha12,
  isSha,
  parseCandidateRef,
  parseQueueTrailers,
  sanitizeBase,
} from "./contracts.mjs";
import { createGit } from "./gitexec.mjs";

/**
 * @param {{message: string, headSha: string, ref?: string|null}} input
 *   message = full message of the candidate's top commit; headSha = that commit;
 *   ref = pushed branch (refs/heads/omni-queue/... or omni-queue/...), optional
 * @returns {{baseSha: string, target: string|null, source: "trailer"|"self"}}
 */
export function resolveCandidateBase(input) {
  const headSha = String(input?.headSha ?? "");
  if (!isSha(headSha)) throw new Error(`invalid head sha: ${JSON.stringify(input?.headSha)}`);
  const ref = input?.ref ? String(input.ref) : "";
  let parsed = null;
  if (ref) {
    parsed = parseCandidateRef(ref);
    if (!parsed) throw new Error(`not an omni-queue candidate ref: ${JSON.stringify(ref)}`);
  }

  if (parsed?.kind === "base-check") {
    // basecheck-<sha12>[-r<n>]: the ref names the commit it tests; anything else is a stray push.
    const sha12 = baseCheckSha12(parsed.id);
    if (!sha12 || !headSha.startsWith(sha12)) {
      throw new Error(`base-check ref ${ref} does not name head ${headSha}`);
    }
    return { baseSha: headSha, target: null, source: "self" };
  }

  const trailers = parseQueueTrailers(input?.message);
  if (parsed?.kind === "batch") assertBatchRefNamesHead(parsed.id, headSha, trailers.batch, ref);
  if (!trailers.base) {
    if (parsed?.kind === "batch") {
      throw new Error(`batch candidate ${ref} has no Omni-Queue-Base trailer on ${headSha}`);
    }
    return { baseSha: headSha, target: null, source: "self" };
  }
  if (trailers.base === headSha) throw new Error("Omni-Queue-Base names the candidate itself");
  const target = trailers.target ?? null;
  if (parsed && target !== null && sanitizeBase(target) !== parsed.sanitizedBase) {
    throw new Error(`candidate ref ${ref} does not belong to base ${target}`);
  }
  return { baseSha: trailers.base, target, source: "trailer" };
}

// "b42-r1" → "b42": an infra retry pushes the SAME commit (its trailer keeps the original id)
// under a fresh ref named with batchIdFor(seq, retry).
const batchRoot = (id) => String(id).replace(/-r[1-9][0-9]*$/, "");

/**
 * A batch ref is "<batchId>-<sha12>" (contracts.candidateRef): the suffix must name the pushed
 * commit, and the commit's Omni-Queue-Batch trailer (when present) the same batch sequence.
 * Anything else is a push of the right SHA into the wrong ref (or the reverse).
 */
function assertBatchRefNamesHead(id, headSha, trailerBatch, ref) {
  const m = /^(.+)-([0-9a-f]{12})$/.exec(id);
  if (!m) throw new Error(`malformed batch candidate ref ${ref} (expected <batchId>-<sha12>)`);
  const [, batchId, sha12] = m;
  if (!headSha.startsWith(sha12)) {
    throw new Error(`batch candidate ref ${ref} does not name head ${headSha}`);
  }
  if (trailerBatch !== undefined && batchRoot(trailerBatch) !== batchRoot(batchId)) {
    throw new Error(`batch candidate ref ${ref} names ${batchId}, the commit ${trailerBatch}`);
  }
}

function parseArgs(argv) {
  const out = { sha: "HEAD", ref: undefined };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const value = argv[i + 1];
    if ((arg === "--sha" || arg === "--ref") && value !== undefined && !value.startsWith("--")) {
      out[arg.slice(2)] = value;
      i++;
    } else {
      throw new Error(`usage: candidate-base.mjs [--sha <commit>] [--ref <branch>] (got ${arg})`);
    }
  }
  return out;
}

/**
 * CLI entry. @returns {number} exit code
 * @param {string[]} [argv]
 * @param {{env?: object, cwd?: string, stdout?: (s: string) => void,
 *          stderr?: (s: string) => void}} [io]
 */
export function main(argv = process.argv.slice(2), io = {}) {
  const env = io.env ?? process.env;
  const stdout = io.stdout ?? ((s) => process.stdout.write(s));
  const stderr = io.stderr ?? ((s) => process.stderr.write(s));
  try {
    const args = parseArgs(argv);
    const git = createGit({ cwd: io.cwd ?? process.cwd() });
    const headSha = git.out(["rev-parse", "--verify", `${args.sha}^{commit}`]);
    const message = git.out(["log", "-1", "--format=%B", headSha]);
    const ref = args.ref ?? env.GITHUB_REF ?? null;
    const result = resolveCandidateBase({ message, headSha, ref });
    if (result.source === "trailer") {
      // The base must exist locally (fetch-depth: 0) and be an ancestor of the candidate.
      const ancestor = git.run(["merge-base", "--is-ancestor", result.baseSha, headSha], {
        allowFail: true,
      });
      if (ancestor.code !== 0) {
        throw new Error(`Omni-Queue-Base ${result.baseSha} is not an ancestor of ${headSha}`);
      }
    }
    stdout(`BASE_SHA=${result.baseSha}\nTARGET=${result.target ?? ""}\nSOURCE=${result.source}\n`);
    return 0;
  } catch (error) {
    stderr(`[candidate-base] ${error.message}\n`);
    return 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  process.exitCode = main();
}
