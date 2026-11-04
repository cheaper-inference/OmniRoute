import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { contentHash } from "./count-state.mjs";
import { readChatModelCountSnapshot } from "../../check/lib/staticChatModelMetadata.mjs";

const fail = (code, file) => {
  throw Object.assign(new Error(`${code}:${file}`), { code, path: file });
};

export function requireRegularFile(root, relative, io = fs) {
  if (
    !relative ||
    path.isAbsolute(relative) ||
    relative.includes("\\") ||
    relative.includes("\0") ||
    relative.split("/").some((part) => !part || part === "." || part === "..")
  )
    fail("COUNT_UNSAFE_PATH", relative);
  let current = path.resolve(root);
  for (const part of relative.split("/")) {
    current = path.join(current, part);
    let stat;
    try {
      stat = io.lstatSync(current);
    } catch {
      fail("COUNT_REQUIRED_FILE_MISSING", relative);
    }
    if (stat.isSymbolicLink()) fail("COUNT_SYMLINK_TARGET", relative);
  }
  if (!io.statSync(current).isFile()) fail("COUNT_NOT_REGULAR_FILE", relative);
  return current;
}

export function readCountFiles(root, paths, io = fs) {
  return new Map(
    [...new Set(paths)].map((relative) => [
      relative,
      io.readFileSync(requireRegularFile(root, relative, io), "utf8"),
    ])
  );
}

export function countSourceFingerprint(root, io = fs) {
  const names = [
    "src/shared/constants/providers.ts",
    "src/shared/validation/providerSchema.ts",
    "src/shared/constants/serviceKinds.ts",
    "src/shared/constants/routingStrategies.ts",
    "src/shared/constants/cliTools.ts",
    "src/shared/constants/cliToolsGrokBuild.ts",
    "open-sse/config/freeModelCatalog.ts",
    "open-sse/config/freeModelCatalog.data.ts",
    "config/i18n.json",
    "scripts/docs/lib/count-claims.json",
    "scripts/docs/lib/count-facts.mjs",
    "scripts/docs/lib/read-count-facts.ts",
    "scripts/docs/gen-readme-hero.mjs",
    "scripts/docs/gen-readme-promise-pillars.mjs",
    "scripts/docs/gen-readme-comparison-table.mjs",
    "scripts/docs/gen-readme-cli-terminal.mjs",
    "scripts/docs/gen-readme-free-tier-budget.mjs",
    "scripts/docs/gen-provider-reference.ts",
    "scripts/docs/readme-fonts.mjs",
    "scripts/docs/readme-diagram-theme.mjs",
    "scripts/docs/lib/count-sync.mjs",
    "scripts/docs/lib/count-state.mjs",
    "scripts/docs/lib/count-io.mjs",
    "scripts/docs/lib/count-finance-guard.mjs",
    "scripts/docs/sync-counts.mjs",
    "scripts/check/check-docs-counts-sync.mjs",
    "scripts/check/lib/staticCountMetadata.mjs",
    "scripts/check/lib/modelMetadataReader.mjs",
    "scripts/check/lib/staticChatModelMetadata.mjs",
    "prettier.config.mjs",
  ];
  function walk(relative) {
    for (const entry of io.readdirSync(path.join(root, relative), { withFileTypes: true })) {
      const name = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walk(name);
      else if (entry.name.endsWith(".ts")) names.push(name);
    }
  }
  walk("src/shared/constants/providers");
  const records = names
    .sort()
    .map((name) => [name, contentHash(io.readFileSync(requireRegularFile(root, name, io)))]);
  // Bind every public source actually traversed by the model-ID projection.
  // Changing or adding an imported catalog changes this graph fingerprint.
  records.push([
    "chat-model-source-graph",
    contentHash(JSON.stringify(readChatModelCountSnapshot(root, { io }).sources)),
  ]);
  records.push([
    "migration-filenames",
    contentHash(
      JSON.stringify(
        io
          .readdirSync(path.join(root, "src/lib/db/migrations"))
          .filter((name) => name.endsWith(".sql"))
          .sort()
      )
    ),
  ]);
  records.push([
    "executor-filenames",
    contentHash(JSON.stringify(io.readdirSync(path.join(root, "open-sse/executors")).sort())),
  ]);
  records.push([
    "package-version",
    String(JSON.parse(io.readFileSync(path.join(root, "package.json"), "utf8")).version),
  ]);
  return contentHash(JSON.stringify(records));
}

// Preflight every target before writing. Each file is replaced atomically;
// failures restore only files still equal to this command's own output. A
// concurrent edit is never overwritten during compensation.
export function applyCountPlan({ root, plan, verifyInputs = () => true, io = fs }) {
  const checkInputs = () => {
    if (!verifyInputs()) fail("COUNT_SOURCE_CHANGED_DURING_RUN", "source-inputs");
  };
  checkInputs();
  const jobs = plan.changes.map((change) => {
    const file = requireRegularFile(root, change.path, io);
    if (contentHash(io.readFileSync(file)) !== change.beforeHash)
      fail("COUNT_TARGET_PREIMAGE_CHANGED", change.path);
    return {
      ...change,
      file,
      mode: io.statSync(file).mode,
      temporary: `${file}.docs-counts-${process.pid}-${randomBytes(6).toString("hex")}`,
      committed: false,
    };
  });
  const cleanup = () => {
    for (const job of jobs) {
      try {
        io.unlinkSync(job.temporary);
      } catch {}
    }
  };
  try {
    for (const job of jobs)
      io.writeFileSync(job.temporary, job.after, { flag: "wx", mode: job.mode });
    checkInputs();
    for (const job of jobs) {
      if (contentHash(io.readFileSync(job.file)) !== job.beforeHash)
        fail("COUNT_TARGET_PREIMAGE_CHANGED", job.path);
      io.renameSync(job.temporary, job.file);
      job.committed = true;
    }
    checkInputs();
  } catch (error) {
    const unrestored = [];
    for (const job of [...jobs].reverse().filter((job) => job.committed)) {
      try {
        if (contentHash(io.readFileSync(job.file)) !== job.afterHash) {
          unrestored.push(job.path);
          continue;
        }
        io.writeFileSync(job.temporary, job.before, { flag: "wx", mode: job.mode });
        io.renameSync(job.temporary, job.file);
      } catch {
        unrestored.push(job.path);
      }
    }
    cleanup();
    if (unrestored.length)
      throw Object.assign(new Error("COUNT_COMPENSATION_REVIEW_REQUIRED"), {
        code: "COUNT_COMPENSATION_REVIEW_REQUIRED",
        paths: unrestored,
      });
    throw error;
  }
  cleanup();
  return { written: jobs.length, stateReviewRequired: plan.stateReviewRequired };
}
