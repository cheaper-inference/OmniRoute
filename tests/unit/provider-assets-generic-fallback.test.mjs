import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  closeSync,
  existsSync,
  ftruncateSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { open } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const providerAssetsDir = join(root, "public/providers");

const LOCAL_SVG_IDS_WITHOUT_PROVENANCE = [
  "api-airforce",
  "apikey",
  "bazaarlink",
  "brave-search",
  "brave",
  "byteplus",
  "cartesia",
  "cheaperinference",
  "clarifai",
  "command-code",
  "digitalocean",
  "docker-model-runner",
  "droid",
  "duckduckgo-web",
  "freebuff",
  "gitlab-duo",
  "gitlab",
  "haiper",
  "ideogram",
  "inworld",
  "kilo-gateway",
  "kilocode",
  "leonardo",
  "modal",
  "modelscope",
  "nimble-search",
  "nlpcloud",
  "oauth",
  "oci",
  "opencode",
  "openference",
  "playht",
  "qianfan",
  "qiniu",
  "qwencloud",
  "sap",
  "scaleway",
  "searxng-search",
  "serper-search",
  "soniox",
  "synthetic",
  "unorouter",
  "wandb",
  "youcom-search",
];

const LOCAL_PNG_IDS_WITHOUT_PROVENANCE = [
  "adapta-web",
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox-web",
  "blackbox",
  "cliproxyapi",
  "dahl",
  "empower",
  "gigachat",
  "inner-ai",
  "ironclaw",
  "kie",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "logfare",
  "maritalk",
  "nanobot",
  "nanogpt",
  "nscale",
  "oai-cc",
  "oai-r",
  "piapi",
  "predibase",
  "reka",
  "zeroclaw",
];

const CLI_AND_THEME_SVG_IDS_WITHOUT_PROVENANCE = [
  "arena-light",
  "arena-dark",
  "opencode-light",
  "opencode-dark",
];
const CLI_PNG_IDS_WITHOUT_PROVENANCE = ["omp", "letta"];

const retiredAssetNames = [
  ...LOCAL_SVG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.svg`),
  ...LOCAL_PNG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.png`),
  ...CLI_AND_THEME_SVG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.svg`),
  ...CLI_PNG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.png`),
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const retiredFilenamePattern = new RegExp(
  `(^|[^A-Za-z0-9_.-])(${retiredAssetNames.map(escapeRegExp).join("|")})([^A-Za-z0-9_.-]|$)`,
  "m"
);

const SKIPPED_DIRECTORY_NAMES = new Set([
  ".cache",
  ".next",
  "coverage",
  "dist",
  "dist-electron",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const SKIPPED_ROOT_DIRECTORY_NAMES = new Set([...SKIPPED_DIRECTORY_NAMES, ".claude", ".git"]);
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".py",
  ".sh",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

// The largest audited tracked file is .i18n-state.json at ~4.8 MB (2026-11-20). 64 MiB is
// far above any real tracked text file and far below V8's maximum string length (~512 MiB),
// so a file under the bound always decodes into one string.
const MAX_AUDITED_FILE_BYTES = 64 * 1024 * 1024;

function collectTextFiles(repoRoot, absolutePath) {
  const files = [];

  for (const entry of readdirSync(absolutePath, { withFileTypes: true })) {
    const entryPath = join(absolutePath, entry.name);
    const relativePath = relative(repoRoot, entryPath);
    if (
      entry.isDirectory() &&
      !SKIPPED_DIRECTORY_NAMES.has(entry.name) &&
      relativePath !== "public/providers"
    ) {
      files.push(...collectTextFiles(repoRoot, entryPath));
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

// Fallback for a source tree without git metadata: walk the working tree with the scope rules.
function walkAuditedReferenceFiles(repoRoot) {
  const entries = readdirSync(repoRoot, { withFileTypes: true });
  const rootFiles = entries.filter((entry) => entry.isFile()).map((e) => join(repoRoot, e.name));
  const referenceRoots = entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("_") &&
        !SKIPPED_ROOT_DIRECTORY_NAMES.has(entry.name)
    )
    .map((entry) => entry.name);
  return [
    ...rootFiles,
    ...referenceRoots.flatMap((directory) => collectTextFiles(repoRoot, join(repoRoot, directory))),
  ];
}

// The same scope as the walk, applied to a git path (always "/"-separated).
function isAuditedTrackedPath(relativePath) {
  const segments = relativePath.split("/");
  // Root-level files are audited whatever their extension, as the walk does.
  if (segments.length === 1) return true;
  const [rootDirectory] = segments;
  if (rootDirectory.startsWith("_") || SKIPPED_ROOT_DIRECTORY_NAMES.has(rootDirectory)) {
    return false;
  }
  if (relativePath.startsWith("public/providers/")) return false;
  if (segments.slice(1, -1).some((segment) => SKIPPED_DIRECTORY_NAMES.has(segment))) return false;
  return TEXT_EXTENSIONS.has(extname(relativePath));
}

// Location variables set by a git hook would point git at another repository.
function gitEnvironment() {
  const env = { ...process.env };
  for (const name of [
    "GIT_DIR",
    "GIT_WORK_TREE",
    "GIT_INDEX_FILE",
    "GIT_OBJECT_DIRECTORY",
    "GIT_COMMON_DIR",
  ]) {
    delete env[name];
  }
  return env;
}

function runGit(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    env: gitEnvironment(),
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

// Tracked regular files of repoRoot, or null when repoRoot is not the top of a git work tree
// (no .git, git missing, or a directory nested inside some other repository).
function listTrackedFiles(repoRoot) {
  try {
    const topLevel = runGit(repoRoot, ["rev-parse", "--show-toplevel"]).toString("utf8").trim();
    if (realpathSync(topLevel) !== realpathSync(repoRoot)) return null;
    return runGit(repoRoot, ["ls-files", "-z"]).toString("utf8").split("\0").filter(Boolean);
  } catch {
    return null;
  }
}

function isRegularFile(absolutePath) {
  try {
    return lstatSync(absolutePath).isFile();
  } catch {
    return false;
  }
}

// The files the retired-reference audit reads: tracked files only, so temporary files,
// logs and fixtures that the test run or the CI job writes into the tree are never read.
function collectAuditedReferenceFiles(repoRoot = root) {
  const tracked = listTrackedFiles(repoRoot);
  if (tracked === null) {
    return { source: "walk", files: walkAuditedReferenceFiles(repoRoot) };
  }
  const files = tracked
    .filter(isAuditedTrackedPath)
    .map((relativePath) => join(repoRoot, ...relativePath.split("/")))
    // Symlinks, gitlinks and tracked files deleted from the work tree are not read (the walk
    // did not read them either).
    .filter(isRegularFile);
  return { source: "git", files };
}

// Reads at most min(size at open, maxBytes) bytes, so the decoded string can never reach
// V8's maximum string length, even if the file grows while it is read.
async function readBoundedUtf8(filePath, maxBytes) {
  const handle = await open(filePath, "r");
  try {
    const { size } = await handle.stat();
    if (size > maxBytes) return { size, content: null };
    const buffer = Buffer.allocUnsafe(size);
    let total = 0;
    while (total < size) {
      const { bytesRead } = await handle.read(buffer, total, size - total, total);
      if (bytesRead === 0) break;
      total += bytesRead;
    }
    return { size, content: buffer.toString("utf8", 0, total) };
  } finally {
    await handle.close();
  }
}

// Every problem is collected per file, so one oversized or unreadable file is reported by
// name instead of aborting the audit with an unrelated error.
async function auditReferenceFiles(files, repoRoot = root, maxBytes = MAX_AUDITED_FILE_BYTES) {
  const findings = { references: [], oversized: [], unreadable: [] };
  const readConcurrency = 64;

  for (let offset = 0; offset < files.length; offset += readConcurrency) {
    const batch = files.slice(offset, offset + readConcurrency);
    await Promise.all(
      batch.map(async (filePath) => {
        const displayPath = relative(repoRoot, filePath).split(sep).join("/");
        let result;
        try {
          result = await readBoundedUtf8(filePath, maxBytes);
        } catch (error) {
          findings.unreadable.push(`${displayPath} (${error?.code ?? error?.message ?? error})`);
          return;
        }
        if (result.content === null) {
          findings.oversized.push(`${displayPath} (${result.size} bytes > ${maxBytes} bytes)`);
          return;
        }
        const match = result.content.match(retiredFilenamePattern);
        if (match) findings.references.push(`${displayPath} still references ${match[2]}`);
      })
    );
  }

  for (const list of Object.values(findings)) list.sort();
  return findings;
}

function assertCleanAudit(findings) {
  assert.deepEqual(findings.references, [], findings.references.join("\n"));
  assert.deepEqual(
    findings.oversized,
    [],
    `audited files above the ${MAX_AUDITED_FILE_BYTES}-byte bound:\n${findings.oversized.join("\n")}`
  );
  assert.deepEqual(
    findings.unreadable,
    [],
    `audited files that could not be read:\n${findings.unreadable.join("\n")}`
  );
}

test("provider bundle retires exactly the 78 unresolved assets and keeps the generic icon", () => {
  assert.equal(retiredAssetNames.length, 78);
  assert.equal(new Set(retiredAssetNames).size, 78);

  for (const assetName of retiredAssetNames) {
    assert.equal(
      existsSync(join(providerAssetsDir, assetName)),
      false,
      `${assetName} must not be distributed without provenance`
    );
  }

  const distributedAssets = readdirSync(providerAssetsDir).filter((name) =>
    [".jpg", ".png", ".svg"].includes(extname(name))
  );
  // v3.8.51 /merge-batch: 148 was this PR's own non-target baseline; three sibling
  // provenance PRs (#11735, #11736, #11711) landed first and independently retired
  // 6 further unproven files this PR never targeted (freebuff-dark.svg,
  // freebuff-light.svg, freebuff.png, openvecta.svg, picoclaw.jpg, zoocode.png),
  // so the real pre-fix count was 142, not 148. This fix retires the unresolved
  // Nimble asset as well, leaving 141 distributed assets.
  // notrack-web: operator-supplied logomark with a provenance record (unresolved
  // status, non-blocking) ships in the bundle — 141 → 142.
  // runcrate (#18061): contributor-supplied logomark with a provenance record
  // (unresolved status, non-blocking) ships in the bundle — 142 → 143.
  // gisoo (#18112): contributor-supplied logomark with a provenance record
  // (unresolved status, non-blocking) ships in the bundle — 143 → 144.
  // Sign in with ChatGPT (#15201): the official SIWC black/white ChatGPT marks, each with a
  // provenance record (probable status, non-blocking), ship in the bundle — 144 → 146.
  // inf-code: logomark built from the official Token Infinity InfCode vector
  // logo, with a provenance record (unresolved status, non-blocking) ships
  // in the bundle — 146 → 147.
  assert.equal(distributedAssets.length, 147, "all 147 non-target assets must remain");
  assert.ok(distributedAssets.includes("cli-generic.svg"));
});

test("tracked source and documentation surfaces have no retired asset reference", async (t) => {
  const { source, files } = collectAuditedReferenceFiles();
  t.diagnostic(
    `audited ${files.length} files (${source === "git" ? "git ls-files" : "tree walk"})`
  );
  assert.ok(files.length > 0, "the audit must read at least one file");

  assertCleanAudit(await auditReferenceFiles(files));
});

const SPARSE_FIXTURE_BYTES = 600 * 1024 * 1024;

// A file larger than V8's maximum string length that costs no disk: open, ftruncate, close.
function createSparseFile(filePath, bytes) {
  const fd = openSync(filePath, "wx");
  try {
    ftruncateSync(fd, bytes);
  } finally {
    closeSync(fd);
  }
  const stats = statSync(filePath);
  if (stats.size !== bytes) throw new Error(`size is ${stats.size} bytes, expected ${bytes}`);
  if (typeof stats.blocks === "number" && stats.blocks * 512 > 1024 * 1024) {
    throw new Error(`the file system allocated ${stats.blocks * 512} bytes (not sparse)`);
  }
}

function gitIsAvailable() {
  try {
    execFileSync("git", ["--version"], { env: gitEnvironment(), stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Regression: the queue's base check runs the whole unit suite in the "Fast Quality Gates"
// job, where an untracked file of more than 512 MiB sat in a walked directory and the old
// walk-and-readFile audit died with "RangeError: Invalid string length" (run 44795004759).
// The fixture repository lives in the OS temp dir so that the 600 MB file can never be read
// by another test that walks this checkout while the suite runs.
test("the audit reads tracked files only and reports an oversized file by name", async (t) => {
  if (!gitIsAvailable()) {
    t.skip("git is not available: the tracked-file listing cannot be exercised");
    return;
  }
  const repoRoot = mkdtempSync(join(tmpdir(), "provider-assets-audit-"));
  const noGitRoot = mkdtempSync(join(tmpdir(), "provider-assets-audit-nogit-"));
  try {
    runGit(repoRoot, ["init", "--quiet"]);
    mkdirSync(join(repoRoot, "tests"));
    writeFileSync(join(repoRoot, "README.md"), "# fixture\n");
    writeFileSync(join(repoRoot, "tests", "tracked.md"), "tracked fixture\n");
    runGit(repoRoot, ["add", "README.md", "tests/tracked.md"]);

    const untrackedHugeFile = join(repoRoot, "tests", "run-output.txt");
    try {
      createSparseFile(untrackedHugeFile, SPARSE_FIXTURE_BYTES);
    } catch (error) {
      t.skip(`cannot create a ${SPARSE_FIXTURE_BYTES}-byte sparse file in ${tmpdir()}: ${error}`);
      return;
    }

    // The fixture is in scope: the walk reaches it, and the bounded read names it instead of
    // throwing "Invalid string length".
    const walked = walkAuditedReferenceFiles(repoRoot);
    assert.ok(walked.includes(untrackedHugeFile), "the walk must reach the untracked fixture");
    const walkedFindings = await auditReferenceFiles(walked, repoRoot);
    assert.deepEqual(walkedFindings.oversized, [
      `tests/run-output.txt (${SPARSE_FIXTURE_BYTES} bytes > ${MAX_AUDITED_FILE_BYTES} bytes)`,
    ]);
    assert.deepEqual(walkedFindings.references, []);
    assert.deepEqual(walkedFindings.unreadable, []);

    const { source, files } = collectAuditedReferenceFiles(repoRoot);
    const findings = await auditReferenceFiles(files, repoRoot);
    assert.equal(source, "git");
    assert.equal(files.includes(untrackedHugeFile), false, "untracked files must not be audited");
    assert.deepEqual(files.map((file) => relative(repoRoot, file).split(sep).join("/")).sort(), [
      "README.md",
      "tests/tracked.md",
    ]);
    assertCleanAudit(findings);

    // A tracked file over the bound fails the audit with its name and size.
    const tightFindings = await auditReferenceFiles(files, repoRoot, 12);
    assert.deepEqual(tightFindings.oversized, ["tests/tracked.md (16 bytes > 12 bytes)"]);

    // Without git metadata the audit falls back to the walk instead of auditing nothing.
    mkdirSync(join(noGitRoot, "docs"));
    writeFileSync(join(noGitRoot, "docs", "guide.md"), "see providers/cli-generic.svg\n");
    const fallback = collectAuditedReferenceFiles(noGitRoot);
    assert.equal(fallback.source, "walk");
    assert.deepEqual(fallback.files, [join(noGitRoot, "docs", "guide.md")]);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
    rmSync(noGitRoot, { recursive: true, force: true });
  }
});

test("the tracked-path scope matches the walk's scope rules", () => {
  for (const [relativePath, expected] of [
    ["package.json", true],
    ["LICENSE", true],
    ["docs/guide.md", true],
    ["open-sse/services/combo.ts", true],
    [".github/workflows/ci.yml", true],
    ["docs/image.png", false],
    ["public/providers/openai.svg", false],
    ["public/providers.json", true],
    ["_tasks/plan.md", false],
    [".claude/notes.md", false],
    [".git/config.json", false],
    ["node_modules/pkg/index.js", false],
    ["packages/ui-kit/dist/index.js", false],
    ["packages/ui-kit/node_modules/pkg/index.js", false],
    ["src/coverage/report.ts", false],
    ["src/_private/notes.md", true],
  ]) {
    assert.equal(isAuditedTrackedPath(relativePath), expected, relativePath);
  }
});
