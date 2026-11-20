#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PACKED_TARBALL_ENV, resolvePrebuiltTarballOption } from "../check/check-pack-boot.mjs";
import { makeGitAncestryProbe, readBuildSha, resolveBuildProvenance } from "./buildProvenance.ts";

import {
  MCP_CLOSURE_SPOT_CHECK_PATH,
  computeMcpClosure,
  findLeakedTestArtifactPaths,
  findMissingMcpClosurePaths,
} from "./mcpPublishedFilesClosure.ts";
import { resolveNpmInvocation } from "./resolveNpmEntry.ts";
import {
  PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_ALLOWED_PATH_MATCHERS,
  PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_MAX_PACKED_BYTES,
  PACK_ARTIFACT_REQUIRED_PATHS,
  exceedsPackedSizeBudget,
  findDuplicatedLocaleCatalogChunks,
  findMissingArtifactPaths,
  localeCatalogChunkLocale,
  findUnexpectedArtifactPaths,
  parseJsonValuesOutput,
} from "./pack-artifact-policy.ts";
import { describeManifestMismatch, readPackedTarball } from "./packedTarballContents.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const ROOT: string = join(__dirname, "..", "..");

function runNpm(args: string[], stdio: "inherit" | "pipe" = "pipe"): string {
  // Prefer running npm's own `npm-cli.js` through the current Node binary.
  // Never treat `npm_execpath` as a JS entry unconditionally: `bun run` points
  // it at the bare `bun` ELF binary, which Node then tries to execute as
  // JavaScript and dumps into the error output (#16321).
  const { command, args: commandArgs } = resolveNpmInvocation(args);

  if (stdio === "inherit") {
    execFileSync(command, commandArgs, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: "inherit",
      maxBuffer: 64 * 1024 * 1024,
    });
    return "";
  }

  const result = spawnSync(command, commandArgs, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      (result.stderr || result.stdout || `npm exited with status ${result.status}`).trim()
    );
  }
  return `${result.stdout || ""}\n${result.stderr || ""}`;
}

function ensureAppStagingReady(): void {
  const missingAppRequiredPaths = PACK_ARTIFACT_REQUIRED_PATHS.filter((requiredPath) =>
    requiredPath.startsWith("dist/")
  ).filter((requiredPath) => !existsSync(join(ROOT, requiredPath)));

  if (missingAppRequiredPaths.length === 0) return;

  console.log("📦 dist/ staging is missing required runtime files; running npm run build:cli...");
  runNpm(["run", "build:cli"], "inherit");
}

type PackReport = {
  files: Array<{ path: string }>;
  filename?: string;
  entryCount?: number;
  size?: number;
  unpackedSize?: number;
};

function findPackReport(value: unknown): PackReport | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const report = findPackReport(item);
      if (report) return report;
    }
    return null;
  }
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  if (Array.isArray(record.files)) return record as unknown as PackReport;
  for (const child of Object.values(record)) {
    const report = findPackReport(child);
    if (report) return report;
  }
  return null;
}

function runPackDryRun(): PackReport {
  const output = runNpm(["pack", "--dry-run", "--json", "--ignore-scripts"]);

  const packReport = parseJsonValuesOutput(output)
    .map(findPackReport)
    .find((report): report is PackReport => report !== null);

  if (!packReport || !Array.isArray(packReport.files)) {
    throw new Error("npm pack --dry-run --json did not return the expected files[] payload.");
  }

  return packReport;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 1024) {
    return `${bytes || 0} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

// --policy-only: skip the build (ensureAppStagingReady → build:cli) and the
// required-runtime-files check (which needs the built dist/). Source-side policy checks
// still run against the real `npm pack --dry-run` file list: unexpected files (e.g. stray
// bin/*.sh), test/spec leaks, and missing MCP closure files. This catches source regressions
// cheaply on the fast-path (PR→release), instead of only on the release PR's full Package
// Artifact job. See incident v3.8.36 (#5029).
const POLICY_ONLY = process.argv.includes("--policy-only");

/**
 * #20644 — the report for an already-packed tarball (--tarball / OMNIROUTE_PACKED_TARBALL):
 * its own entries and sizes instead of a second `npm pack --dry-run`, after checking that
 * its package.json name/version are ./package.json's. Also returns the tarball's
 * dist/BUILD_SHA so provenance is judged on the bytes that ship.
 */
async function readPrebuiltPackReport(
  tarballPath: string
): Promise<{ report: PackReport; buildSha: string }> {
  if (!existsSync(tarballPath)) {
    throw new Error(
      `prebuilt tarball not found: ${tarballPath} (from --tarball/${PACKED_TARBALL_ENV})`
    );
  }
  const contents = await readPackedTarball(tarballPath, {
    capture: ["package.json", "dist/BUILD_SHA"],
  });
  const rootManifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const mismatches = describeManifestMismatch(contents.captured["package.json"], {
    name: rootManifest.name,
    version: rootManifest.version,
  });
  if (mismatches.length > 0) {
    throw new Error(
      `prebuilt tarball ${contents.filename} does not match ./package.json: ${mismatches.join(", ")}`
    );
  }
  return {
    report: {
      files: contents.files.map((file) => ({ path: file.path })),
      filename: contents.filename,
      entryCount: contents.entryCount,
      size: contents.size,
      unpackedSize: contents.unpackedSize,
    },
    buildSha: (contents.captured["dist/BUILD_SHA"] ?? "").trim(),
  };
}

async function main(): Promise<void> {
  const prebuiltTarball: string | null = resolvePrebuiltTarballOption(process.argv.slice(2));
  let packReport: PackReport;
  let buildSha: string;
  if (prebuiltTarball) {
    // No build and no pack: the tarball IS the artifact; validate what it holds.
    console.log(`📦 Validating the prebuilt tarball ${prebuiltTarball} — not packing`);
    ({ report: packReport, buildSha } = await readPrebuiltPackReport(prebuiltTarball));
  } else {
    if (!POLICY_ONLY) ensureAppStagingReady();
    packReport = runPackDryRun();
    buildSha = readBuildSha(process.cwd());
  }
  const artifactPaths: string[] = packReport.files.map((file) => file.path);
  const unexpectedPaths: string[] = findUnexpectedArtifactPaths(artifactPaths, {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    pathMatchers: PACK_ARTIFACT_ALLOWED_PATH_MATCHERS,
  });
  const missingRequiredPaths: string[] = POLICY_ONLY
    ? []
    : findMissingArtifactPaths(artifactPaths, PACK_ARTIFACT_REQUIRED_PATHS);

  // #3821 — broad `files` prefixes (open-sse/, src/lib/, ...) would otherwise allow
  // co-located *.test.* / __tests__ leaks; ban them explicitly on the real pack list.
  const leakedTestPaths: string[] = findLeakedTestArtifactPaths(artifactPaths);

  // #3578 — MCP runs from published TypeScript source; every reachable file must pack.
  const mcpClosure: string[] = computeMcpClosure(ROOT);
  const missingMcpPaths: string[] = findMissingMcpClosurePaths(artifactPaths, mcpClosure);

  // #20439 — each full locale catalog may be bundled into at most one server chunk.
  const localeCatalogChunks: number = artifactPaths.filter(
    (filePath) => localeCatalogChunkLocale(filePath) !== null
  ).length;
  const duplicatedCatalogChunks: string[] = findDuplicatedLocaleCatalogChunks(artifactPaths);

  console.log("📦 npm pack artifact summary");
  console.log(`   File:          ${packReport.filename}`);
  console.log(`   Entry count:   ${packReport.entryCount}`);
  console.log(`   Packed size:   ${formatBytes(packReport.size)}`);
  console.log(`   Unpacked size: ${formatBytes(packReport.unpackedSize)}`);
  console.log(`   MCP closure:   ${mcpClosure.length} source files checked`);
  console.log(`   Locale catalog chunks: ${localeCatalogChunks}`);

  if (unexpectedPaths.length > 0) {
    console.error("\n❌ Unexpected files were found in the npm publish artifact:");
    for (const unexpectedPath of unexpectedPaths) {
      console.error(`   - ${unexpectedPath}`);
    }
  }

  if (missingRequiredPaths.length > 0) {
    console.error("\n❌ Required runtime files are missing from the npm publish artifact:");
    for (const missingPath of missingRequiredPaths) {
      console.error(`   - ${missingPath}`);
    }
  }

  if (leakedTestPaths.length > 0) {
    console.error(
      "\n❌ Test/spec files leaked into the npm publish artifact (tighten package.json files negations):"
    );
    for (const leakedPath of leakedTestPaths) {
      console.error(`   - ${leakedPath}`);
    }
  }

  if (missingMcpPaths.length > 0) {
    console.error(
      "\n❌ MCP-reachable source files are missing from the npm publish artifact (would 404 --mcp):"
    );
    for (const missingPath of missingMcpPaths) {
      console.error(`   - ${missingPath}`);
    }
    if (missingMcpPaths.includes(MCP_CLOSURE_SPOT_CHECK_PATH)) {
      console.error(`   (includes the #3578 bug file ${MCP_CLOSURE_SPOT_CHECK_PATH})`);
    }
  }

  if (duplicatedCatalogChunks.length > 0) {
    console.error(
      "\n❌ Locale catalogs are bundled into more than one server chunk (#20439 — a route handler or another non-page context reached src/i18n/request.ts; use src/i18n/routeHandlerTranslations.ts):"
    );
    for (const duplicatedPath of duplicatedCatalogChunks) {
      console.error(`   - ${duplicatedPath}`);
    }
  }

  const overPackedBudget = exceedsPackedSizeBudget(packReport.size);
  if (overPackedBudget) {
    console.error(
      `\n❌ Packed size ${formatBytes(packReport.size)} is over the ${formatBytes(PACK_ARTIFACT_MAX_PACKED_BYTES)} budget (PACK_ARTIFACT_MAX_PACKED_BYTES); npm rejected 3.8.54 with E413 at 206.1 MB.`
    );
  }

  if (
    unexpectedPaths.length > 0 ||
    missingRequiredPaths.length > 0 ||
    leakedTestPaths.length > 0 ||
    missingMcpPaths.length > 0 ||
    duplicatedCatalogChunks.length > 0 ||
    overPackedBudget
  ) {
    process.exit(1);
  }

  // #10427: an artifact is only shippable if it can be traced to the release line. The
  // 2026-08-14 gateway outage was a package built from a feature branch that predated the
  // fix it was supposed to carry — nothing in this gate noticed. Skipped under
  // --policy-only, which deliberately runs without a build (no dist/BUILD_SHA to check).
  if (!POLICY_ONLY) {
    const provenance = resolveBuildProvenance({
      buildSha,
      isAncestorOfRelease: makeGitAncestryProbe(
        process.env.OMNIROUTE_RELEASE_REF || "origin/main",
        process.cwd()
      ),
      allowOverride: process.env.OMNIROUTE_ALLOW_CANARY_BUILD === "1",
    });
    console.log(`\n[provenance] ${provenance.message}`);
    if (!provenance.ok) {
      console.error("\n❌ Build provenance check failed.");
      process.exit(1);
    }
  }

  console.log("\n✅ Pack artifact policy check passed.");
}

main().catch((error) => {
  console.error(`\n❌ Pack artifact validation failed: ${error.message}`);
  process.exit(1);
});
