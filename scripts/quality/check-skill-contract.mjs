#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TEMPLATES = fileURLToPath(new URL("../../config/quality/skill-templates/", import.meta.url));
const TEMPLATES_IN_REPO = "config/quality/skill-templates";
const CONTRACTS = [
  "quality-scan/SKILL.md",
  "validate-release-green/SKILL.md",
  "_shared/base-green.md",
  "green-prs/SKILL.md",
  "sweep-reds/SKILL.md",
  "merge-prs/SKILL.md",
  "merge-batch/SKILL.md",
  "_shared/merge-gates.md",
  "_shared/validation-gate.md",
  "_shared/protected-surfaces.md",
  "_shared/credit-preservation.md",
];

// Reads each template as committed at `ref` (for example origin/release/vX.Y.Z), so a checkout
// that is behind or edited cannot report drift that the base does not have.
export function readTemplatesAt(ref, cwd = process.cwd()) {
  if (typeof ref !== "string" || ref === "" || ref.startsWith("-")) {
    throw new Error(`"${ref}" is not a git ref`);
  }
  return (path) => {
    const spec = `${ref}:${TEMPLATES_IN_REPO}/${path}`;
    try {
      return execFileSync("git", ["cat-file", "blob", spec], {
        cwd,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch {
      throw new Error(`cannot read ${TEMPLATES_IN_REPO}/${path} at ${ref}`);
    }
  };
}

// `templates` is a directory of templates, or a function that returns one template's text.
export function inspectSkillContracts(root, templates = TEMPLATES) {
  if (!existsSync(root)) return { ok: false, status: "NOT_INSTALLED", files: [] };
  const read =
    typeof templates === "function"
      ? templates
      : (path) => readFileSync(resolve(templates, path), "utf8");
  const files = CONTRACTS.map((path) => {
    const installed = resolve(root, path);
    const expected = read(path);
    const status = !existsSync(installed)
      ? "MISSING"
      : readFileSync(installed, "utf8") === expected
        ? "MATCH"
        : "DRIFT";
    return { path, status };
  });
  const ok = files.every((file) => file.status === "MATCH");
  return { ok, status: ok ? "MATCH" : "INCOMPLETE", files };
}

function parseArgs(args) {
  let root;
  let ref;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--ref") {
      if (i + 1 >= args.length) throw new Error("--ref needs a value");
      ref = args[++i];
    } else if (arg.startsWith("--ref=")) {
      ref = arg.slice("--ref=".length);
      if (!ref) throw new Error("--ref needs a value");
    } else {
      root = arg;
    }
  }
  return { root, ref };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const { root, ref } = parseArgs(process.argv.slice(2));
    const result = inspectSkillContracts(
      root || resolve(".agents/skills"),
      ref ? readTemplatesAt(ref) : TEMPLATES
    );
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ok ? 0 : 1;
  } catch (error) {
    console.error(`[quality-skill-contract] ${error.message}`);
    process.exitCode = 1;
  }
}
