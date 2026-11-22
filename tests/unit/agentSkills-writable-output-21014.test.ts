/**
 * Regression guards for #21014 / #20998:
 * Agent Skills runtime generation under `readOnlyRootFilesystem: true` must redirect
 * apply-mode writes via `OMNIROUTE_SKILLS_OUTPUT_DIR` (under `DATA_DIR`) rather than
 * mounting an `emptyDir` at `/app/skills` (which would shadow the 46 bundled SKILL.md
 * files and drop `computeCoverage()` to 0).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

import { generateAgentSkills } from "../../src/lib/agentSkills/generator.ts";
import {
  computeCoverage,
  fetchSkillMarkdown,
  refreshCatalog,
} from "../../src/lib/agentSkills/catalog.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function mkTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-21014-"));
}

function findKubectl(): string | null {
  for (const candidate of [
    "kubectl",
    "/Users/same7adel/.docker/bin/kubectl",
    "/usr/local/bin/kubectl",
  ]) {
    try {
      execFileSync(candidate, ["version", "--client"], { stdio: "ignore" });
      return candidate;
    } catch {
      // continue probing
    }
  }
  return null;
}

test("OMNIROUTE_SKILLS_OUTPUT_DIR redirects apply-mode writes away from a read-only cwd/skills", async (t) => {
  const root = mkTmpDir();
  const bundledSkills = path.join(root, "skills");
  const writableDataSkills = path.join(root, "data", "skills");
  fs.mkdirSync(bundledSkills, { recursive: true });
  // Simulate readOnlyRootFilesystem on <cwd>/skills (skip chmod enforcement check if running as uid 0).
  fs.chmodSync(bundledSkills, 0o555);

  const prevCwd = process.cwd();
  const prevEnv = process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
  t.after(() => {
    process.chdir(prevCwd);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
    } else {
      process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = prevEnv;
    }
    try {
      fs.chmodSync(bundledSkills, 0o755);
    } catch {
      // ignore
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  process.chdir(root);
  process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = writableDataSkills;
  refreshCatalog();

  const report = await generateAgentSkills({
    dryRun: false,
    prune: false,
    onlyIds: ["cli-health"],
  });

  assert.deepEqual(report.errors, [], "apply-mode generation must succeed without EROFS");
  assert.deepEqual(report.generated, ["cli-health"]);
  assert.ok(
    fs.existsSync(path.join(writableDataSkills, "cli-health", "SKILL.md")),
    "generated SKILL.md must be written under OMNIROUTE_SKILLS_OUTPUT_DIR"
  );
  assert.equal(
    fs.existsSync(path.join(bundledSkills, "cli-health", "SKILL.md")),
    false,
    "read-only <cwd>/skills must not be written to"
  );
});

test("unset or blank OMNIROUTE_SKILLS_OUTPUT_DIR preserves default <cwd>/skills behavior", async (t) => {
  const root = mkTmpDir();
  const prevCwd = process.cwd();
  const prevEnv = process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
  t.after(() => {
    process.chdir(prevCwd);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
    } else {
      process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = prevEnv;
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  process.chdir(root);
  process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = "   ";
  refreshCatalog();

  const report = await generateAgentSkills({
    dryRun: false,
    prune: false,
    onlyIds: ["cli-health"],
  });

  assert.deepEqual(report.errors, []);
  assert.ok(
    fs.existsSync(path.join(root, "skills", "cli-health", "SKILL.md")),
    "blank/unset OMNIROUTE_SKILLS_OUTPUT_DIR must keep <cwd>/skills default"
  );
});

test("explicit outputDir option takes precedence over OMNIROUTE_SKILLS_OUTPUT_DIR", async (t) => {
  const envDir = mkTmpDir();
  const explicitDir = mkTmpDir();
  const prevEnv = process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
  t.after(() => {
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
    } else {
      process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = prevEnv;
    }
    fs.rmSync(envDir, { recursive: true, force: true });
    fs.rmSync(explicitDir, { recursive: true, force: true });
  });

  process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = envDir;
  const report = await generateAgentSkills({
    dryRun: false,
    prune: false,
    outputDir: explicitDir,
    onlyIds: ["cli-health"],
  });

  assert.deepEqual(report.errors, []);
  assert.ok(fs.existsSync(path.join(explicitDir, "cli-health", "SKILL.md")));
  assert.equal(fs.existsSync(path.join(envDir, "cli-health", "SKILL.md")), false);
});

test("bundled catalog reads (computeCoverage + fetchSkillMarkdown) stay intact when OMNIROUTE_SKILLS_OUTPUT_DIR points to an empty dir", async (t) => {
  const emptyWritable = mkTmpDir();
  const prevCwd = process.cwd();
  const prevEnv = process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
  t.after(() => {
    process.chdir(prevCwd);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_SKILLS_OUTPUT_DIR;
    } else {
      process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = prevEnv;
    }
    fs.rmSync(emptyWritable, { recursive: true, force: true });
  });

  process.chdir(REPO_ROOT);
  process.env.OMNIROUTE_SKILLS_OUTPUT_DIR = emptyWritable;
  refreshCatalog();

  const coverage = computeCoverage();
  const expectedTotal = coverage.api.total + coverage.cli.total + coverage.config.total;
  assert.ok(expectedTotal > 0, "expected non-empty canonical skill totals");
  assert.equal(
    coverage.totalSkills,
    expectedTotal,
    "computeCoverage() must continue reading all shipped canonical SKILL.md files from <cwd>/skills"
  );

  const md = await fetchSkillMarkdown("cli-health");
  assert.equal(md.source, "filesystem");
  assert.ok(md.body.length > 0);
});

test("Kustomize and Helm Deployment manifests point OMNIROUTE_SKILLS_OUTPUT_DIR under DATA_DIR and never mount /app/skills", () => {
  const k8sDeploy = yaml.load(
    fs.readFileSync(path.join(REPO_ROOT, "deploy/kubernetes/base/deployment.yaml"), "utf8")
  ) as {
    spec?: {
      template?: {
        spec?: {
          containers?: Array<{
            env?: Array<{ name: string; value?: string }>;
            volumeMounts?: Array<{ name: string; mountPath: string }>;
          }>;
        };
      };
    };
  };
  const container = k8sDeploy.spec?.template?.spec?.containers?.[0];
  assert.ok(container, "expected omniroute container in deploy/kubernetes/base/deployment.yaml");
  const skillsEnv = (container.env ?? []).find((e) => e.name === "OMNIROUTE_SKILLS_OUTPUT_DIR");
  assert.equal(
    skillsEnv?.value,
    "/app/data/skills",
    "k8s base Deployment must set OMNIROUTE_SKILLS_OUTPUT_DIR=/app/data/skills"
  );
  const mounts = (container.volumeMounts ?? []).map((m) => m.mountPath);
  assert.ok(mounts.includes("/app/data"), "k8s base Deployment must mount /app/data");
  assert.ok(
    !mounts.includes("/app/skills"),
    "k8s base Deployment must never mount a volume over /app/skills (would hide bundled SKILL.md)"
  );

  const kubectl = findKubectl();
  if (kubectl) {
    for (const target of [
      "deploy/kubernetes/base",
      "deploy/kubernetes/overlays/k8s",
      "deploy/kubernetes/overlays/k3s",
    ]) {
      const rendered = execFileSync(kubectl, ["kustomize", path.join(REPO_ROOT, target)], {
        encoding: "utf8",
      });
      const docs = yaml.loadAll(rendered) as Array<{
        kind?: string;
        spec?: {
          template?: {
            spec?: {
              containers?: Array<{
                env?: Array<{ name: string; value?: string }>;
                volumeMounts?: Array<{ mountPath: string }>;
              }>;
            };
          };
        };
      }>;
      const dep = docs.find((d) => d && d.kind === "Deployment");
      const c = dep?.spec?.template?.spec?.containers?.[0];
      assert.equal(
        c?.env?.find((e) => e.name === "OMNIROUTE_SKILLS_OUTPUT_DIR")?.value,
        "/app/data/skills",
        `${target}: rendered Deployment must preserve OMNIROUTE_SKILLS_OUTPUT_DIR=/app/data/skills`
      );
      assert.ok(
        !(c?.volumeMounts ?? []).some((m) => m.mountPath === "/app/skills"),
        `${target}: rendered Deployment must never mount /app/skills`
      );
    }
  }

  const helmDeploy = fs.readFileSync(
    path.join(REPO_ROOT, "deploy/helm/omniroute/templates/deployment.yaml"),
    "utf8"
  );
  assert.match(helmDeploy, /- name: OMNIROUTE_SKILLS_OUTPUT_DIR/);
  assert.match(
    helmDeploy,
    /printf "%s\/skills" \(\.Values\.config\.dataDir \| trimSuffix "\/"\) \| quote/
  );
  assert.doesNotMatch(
    helmDeploy,
    /mountPath:\s*\/app\/skills\b/,
    "Helm Deployment template must never mount /app/skills"
  );
});
