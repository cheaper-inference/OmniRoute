#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

import { resolveUiDiffBase, assertUiCandidateUnchanged } from "./resolve-ui-diff-base.mjs";
import { MAX_UI_CATALOG_BYTES } from "./read-ui-catalog.mjs";
import {
  auditNewUiReferences,
  DEFAULT_LIMITS,
  FLAG_REGISTRY_PATH,
  FLAG_CONSUMER_PATH,
} from "./lib/translationReferences.mjs";

const SOURCE = /^src\/.*\.[cm]?[jt]sx?$/;
const SHA = /^[0-9a-f]{40}$/;
const EN = "src/i18n/messages/en.json";
const COMBOS = "src/app/(dashboard)/dashboard/combos/";
const WRAPPER = COMBOS + "comboPageHelpers.tsx";
const TOOLBAR = COMBOS + "ComboListControls.tsx";
const PAGE = COMBOS + "page.tsx";

class IncompleteCheck extends Error {}

function insist(condition, reason) {
  if (!condition) throw new IncompleteCheck(reason);
}

function safePath(value) {
  return (
    typeof value === "string" &&
    !value.includes("\0") &&
    !value.includes("\\") &&
    !path.posix.isAbsolute(value) &&
    !value.split("/").includes("..") &&
    path.posix.normalize(value) === value
  );
}

/** Complete NUL-delimited Git inventory; no shell, network or diff text parsing. */
export function parseChangeInventory(output) {
  insist(output === "" || output.endsWith("\0"), "INCOMPLETE_GIT_INVENTORY");
  const fields = output === "" ? [] : output.slice(0, -1).split("\0");
  const rows = [];
  while (fields.length) {
    const status = fields.shift();
    insist(/^(?:[AMDT]|R\d{1,3})$/.test(status), "UNSUPPORTED_GIT_STATUS");
    const before = fields.shift();
    const after = status.startsWith("R") ? fields.shift() : before;
    insist(safePath(before) && safePath(after), "INVALID_GIT_PATH");
    rows.push(
      status.startsWith("R")
        ? { status: "R", path: after, previousPath: before, similarity: Number(status.slice(1)) }
        : { status, path: after }
    );
  }
  insist(new Set(rows.map((row) => row.path)).size === rows.length, "DUPLICATE_GIT_CHANGE");
  return rows;
}

export function inspectNewUiReferences({ cwd, snapshot, env = process.env } = {}) {
  const repo = path.resolve(cwd || process.cwd());
  const started = performance.now();
  const gitEnv = {
    PATH: env.PATH || "/usr/bin:/bin",
    LANG: "C.UTF-8",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
  };
  function git(args, maxBuffer = 4 * 1024 * 1024) {
    insist(performance.now() - started < 30000, "GIT_ADAPTER_TIME_LIMIT");
    try {
      return execFileSync(
        "git",
        [
          "--no-pager",
          "-c",
          "core.fsmonitor=false",
          "-c",
          "gc.auto=0",
          "-c",
          "maintenance.auto=false",
          ...args,
        ],
        {
          cwd: repo,
          env: gitEnv,
          encoding: "utf8",
          timeout: Math.max(1, Math.min(10000, 30000 - Math.floor(performance.now() - started))),
          maxBuffer,
          stdio: ["ignore", "pipe", "pipe"],
        }
      );
    } catch {
      throw new IncompleteCheck("GIT_READ_FAILED");
    }
  }
  try {
    let comparison;
    let history = null;
    if (snapshot) {
      insist(
        SHA.test(snapshot.base || "") &&
          SHA.test(snapshot.candidate || "") &&
          snapshot.base !== snapshot.candidate,
        "EXACT_TREE_PAIR_REQUIRED"
      );
      for (const id of [snapshot.base, snapshot.candidate]) {
        insist(git(["cat-file", "-t", id]).trim() === "tree", "SNAPSHOT_MUST_BE_TREE");
      }
      comparison = { kind: "snapshot", base: snapshot.base, candidate: snapshot.candidate };
    } else {
      // The existing resolver owns CI-event semantics. No guessed fallback base.
      history = resolveUiDiffBase({ cwd: repo, env });
      comparison = { kind: "commit", base: history.baseSha, candidate: history.candidateSha };
      for (const id of [comparison.base, comparison.candidate]) {
        insist(git(["cat-file", "-t", id]).trim() === "commit", "COMPARISON_MUST_BE_COMMIT");
      }
    }
    const inventoryRaw = git([
      "diff",
      "--name-status",
      "-z",
      "--find-renames",
      comparison.base,
      comparison.candidate,
      "--",
    ]);
    const inventory = parseChangeInventory(inventoryRaw);
    const changes = inventory.flatMap((row) => {
      const inSource = SOURCE.test(row.path);
      if (row.status !== "R") return inSource ? [row] : [];
      const wasSource = SOURCE.test(row.previousPath);
      // A scope transition is a removal or an addition to the analyzed source tree.
      // Inbound code must not inherit reference exemptions from fixtures or archives.
      if (wasSource && !inSource) return [{ status: "D", path: row.previousPath }];
      if (!wasSource && inSource) return [{ status: "A", path: row.path }];
      return inSource ? [row] : [];
    });
    insist(
      changes.every(
        (row) =>
          row.status !== "T" &&
          SOURCE.test(row.path) &&
          (!row.previousPath || SOURCE.test(row.previousPath))
      ),
      "UNSUPPORTED_SOURCE_CHANGE"
    );
    const baseFiles = {};
    const headFiles = {};
    const blobReceipts = [];
    const sourcePaths = new Set();
    let bytes = 0;
    function readSource(ref, file, required) {
      const entry = git(["ls-tree", "-lz", ref, "--", file], 65536);
      if (!entry) {
        insist(!required, "REQUIRED_SOURCE_MISSING");
        return null;
      }
      const match = /^(\d+) blob ([a-f0-9]{40})\s+(\d+)\t([^\0]+)\0$/.exec(entry);
      insist(
        match && ["100644", "100755"].includes(match[1]) && match[4] === file,
        "SOURCE_MUST_BE_REGULAR_BLOB"
      );
      const size = Number(match[3]);
      insist(
        size <= DEFAULT_LIMITS.maxFileBytes &&
          bytes + size <= DEFAULT_LIMITS.maxTotalBytes &&
          (sourcePaths.has(file) || sourcePaths.size < DEFAULT_LIMITS.maxFiles),
        "SOURCE_READ_LIMIT"
      );
      const source = git(["cat-file", "blob", match[2]], DEFAULT_LIMITS.maxFileBytes);
      insist(Buffer.byteLength(source) === size, "INCOMPLETE_SOURCE_BLOB");
      bytes += size;
      sourcePaths.add(file);
      blobReceipts.push({
        ref,
        path: file,
        blob: match[2],
        bytes: size,
        sha256: createHash("sha256").update(source).digest("hex"),
      });
      return source;
    }
    function add(files, ref, file, required = false) {
      if (Object.hasOwn(files, file)) return;
      const source = readSource(ref, file, required);
      if (source !== null) files[file] = source;
    }
    for (const row of changes) {
      if (row.status !== "A") add(baseFiles, comparison.base, row.previousPath || row.path, true);
      if (row.status !== "D") add(headFiles, comparison.candidate, row.path, true);
    }
    const affectedFiles = [];
    if (
      changes.some((row) => row.path.startsWith(COMBOS) || row.previousPath?.startsWith(COMBOS))
    ) {
      for (const file of [WRAPPER, PAGE, TOOLBAR]) {
        add(baseFiles, comparison.base, file);
        add(headFiles, comparison.candidate, file);
      }
      if (
        changes.some(
          (row) => [WRAPPER, PAGE].includes(row.path) || [WRAPPER, PAGE].includes(row.previousPath)
        )
      ) {
        affectedFiles.push(
          ...[PAGE, TOOLBAR].filter(
            (file) => Object.hasOwn(baseFiles, file) && Object.hasOwn(headFiles, file)
          )
        );
      }
    }
    if (changes.some((row) => [FLAG_REGISTRY_PATH, FLAG_CONSUMER_PATH].includes(row.path))) {
      for (const file of [FLAG_REGISTRY_PATH, FLAG_CONSUMER_PATH]) {
        add(baseFiles, comparison.base, file);
        add(headFiles, comparison.candidate, file);
      }
    }
    const catalogReceipts = [];
    function readCatalog(ref) {
      const entry = git(["ls-tree", "-lz", ref, "--", EN], 65536);
      const match = /^(\d+) blob ([a-f0-9]{40})\s+(\d+)\t([^\0]+)\0$/.exec(entry);
      insist(
        match &&
          ["100644", "100755"].includes(match[1]) &&
          match[4] === EN &&
          Number(match[3]) <= MAX_UI_CATALOG_BYTES,
        "INVALID_CATALOG_BLOB"
      );
      const text = git(["cat-file", "blob", match[2]], MAX_UI_CATALOG_BYTES);
      insist(Buffer.byteLength(text) === Number(match[3]), "INCOMPLETE_CATALOG_BLOB");
      const value = JSON.parse(text);
      insist(value && typeof value === "object" && !Array.isArray(value), "INVALID_CATALOG_OBJECT");
      catalogReceipts.push({
        ref,
        path: EN,
        blob: match[2],
        bytes: Number(match[3]),
        sha256: createHash("sha256").update(text).digest("hex"),
      });
      return value;
    }
    const baseEn = readCatalog(comparison.base);
    const headEn = readCatalog(comparison.candidate);
    const result = auditNewUiReferences({
      comparison,
      changes,
      affectedFiles,
      baseFiles,
      headFiles,
      baseEn,
      headEn,
    });
    insist(
      git([
        "diff",
        "--name-status",
        "-z",
        "--find-renames",
        comparison.base,
        comparison.candidate,
        "--",
      ]) === inventoryRaw,
      "IMMUTABLE_INVENTORY_CHANGED"
    );
    if (history) assertUiCandidateUnchanged(repo, history.candidateSha);
    return {
      gate: "i18n-new-ui-references",
      ...result,
      comparison,
      history,
      ok: result.status === "PASS",
      incomplete: result.status === "INCOMPLETE",
      incompleteDetails: result.incomplete,
      inventory,
      sourceChangeCount: changes.length,
      blobReceipts,
      catalogReceipts,
      adapterMilliseconds: performance.now() - started,
      candidateWritten: false,
      productImported: false,
      translationsChecked: false,
    };
  } catch (error) {
    return {
      gate: "i18n-new-ui-references",
      status: "INCOMPLETE",
      ok: false,
      incomplete: true,
      violations: [],
      incompleteDetails: [
        {
          reason:
            error instanceof IncompleteCheck ? error.message : "UNREADABLE_COMPARISON_OR_CATALOG",
        },
      ],
      candidateWritten: false,
      productImported: false,
      translationsChecked: false,
    };
  }
}

function main() {
  const args = process.argv.slice(2);
  const options = {};
  let baseTree;
  let candidateTree;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--json") continue;
    insist(
      ["--repo", "--base-tree", "--candidate-tree"].includes(arg) && args[index + 1],
      "UNSUPPORTED_CLI_ARGUMENT"
    );
    const value = args[++index];
    if (arg === "--repo") options.cwd = value;
    else if (arg === "--base-tree") baseTree = value;
    else candidateTree = value;
  }
  insist(Boolean(baseTree) === Boolean(candidateTree), "EXACT_TREE_PAIR_REQUIRED");
  if (baseTree) options.snapshot = { base: baseTree, candidate: candidateTree };
  const result = inspectNewUiReferences(options);
  const json = JSON.stringify(result);
  insist(Buffer.byteLength(json) <= 2 * 1024 * 1024, "REPORT_BYTE_LIMIT");
  console.log(json);
  process.exitCode = result.status === "PASS" ? 0 : result.status === "FAIL" ? 1 : 2;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    main();
  } catch (error) {
    console.log(
      JSON.stringify({
        gate: "i18n-new-ui-references",
        status: "INCOMPLETE",
        ok: false,
        incomplete: true,
        incompleteDetails: [
          { reason: error instanceof IncompleteCheck ? error.message : "INVALID_CLI_ARGUMENTS" },
        ],
      })
    );
    process.exitCode = 2;
  }
}
