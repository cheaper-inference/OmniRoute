// Contract for config/merge-queue/config.json (omni-queue). The runtime validator in
// scripts/merge-queue/config.mjs is dependency-free on purpose (the queue workflow never runs
// `npm ci`), so the file is ALSO validated here with Zod, and both validators must agree on a
// battery of mutated configs (differential test).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { z } from "zod";
import {
  DEFAULT_CONFIG_PATH,
  LANDING_ACTORS,
  isManagedBase,
  loadConfig,
  validateConfig,
} from "../../../scripts/merge-queue/config.mjs";
import { matchesGlob } from "../../../scripts/merge-queue/contracts.mjs";

const raw = JSON.parse(readFileSync(DEFAULT_CONFIG_PATH, "utf8"));

const label = z.string().regex(/^[^\s,][^,]{0,49}$/);
const unique = (list) => new Set(list).size === list.length;
const anchoredRegExp = z.string().refine((source) => {
  try {
    new RegExp(source);
    return source.startsWith("^") && source.endsWith("$");
  } catch {
    return false;
  }
});

const STATUS_CONTEXT_RE = /^[A-Za-z0-9._/-]{1,100}$/;
const NOREPLY_RE = /^[^\s@]+@users\.noreply\.github\.com$/;

const LandingSchema = z
  .strictObject({
    mode: z.enum(["merge-ff", "squash-api"]),
    actor: z.enum(["app", "owner"]).default("app"),
    identity: z
      .strictObject({
        name: z.string().trim().min(1),
        email: z.string().regex(NOREPLY_RE),
      })
      .optional(),
    statusContext: z.string().regex(STATUS_CONTEXT_RE).default("omni-queue/land"),
  })
  .refine((l) => (l.actor === "owner") === (l.identity !== undefined));

const ConfigSchema = z
  .strictObject({
    schemaVersion: z.literal(1),
    label,
    protectedApprovalLabel: label,
    approvers: z
      .array(z.string().regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/))
      .min(1)
      .refine(unique),
    appSlug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,33}$/),
    bases: anchoredRegExp,
    blockLabels: z.array(label).refine(unique),
    batch: z
      .strictObject({
        maxSize: z.number().int().min(1).max(32),
        minSize: z.number().int().min(1).max(32),
        maxWaitMinutes: z.number().int().min(0).max(1440),
      })
      .refine((b) => b.minSize <= b.maxSize),
    landing: LandingSchema,
    requiredChecks: z.array(z.string().trim().min(1)).min(1).refine(unique),
    advisoryChecks: z.array(z.string().trim().min(1)).refine(unique),
    aggregateChecks: z.array(z.string().trim().min(1)).refine(unique),
    checksTimeoutMinutes: z.number().int().min(10).max(1440),
    infraRetries: z.number().int().min(0).max(5),
    preferGreenPrChecks: z.boolean(),
    prGreenCheck: z.string().trim().min(1),
    protectedPaths: z.array(z.string().trim().min(1)).min(1).refine(unique),
    mode: z.enum(["shadow", "live"]),
  })
  .refine((c) => c.label !== c.protectedApprovalLabel)
  .refine((c) => !c.requiredChecks.some((name) => c.advisoryChecks.includes(name)))
  .refine((c) => ![...c.requiredChecks, ...c.aggregateChecks].includes(c.landing.statusContext));

test("the shipped config passes the Zod schema and the runtime validator", () => {
  const parsed = ConfigSchema.safeParse(raw);
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues ?? []));
  assert.deepEqual(validateConfig(raw), { ok: true, config: raw, errors: [] });
  assert.equal(loadConfig().label, "omni-queue");
});

test("the shipped config lands as the owner with the noreply identity", () => {
  assert.deepEqual(LANDING_ACTORS, ["app", "owner"]);
  assert.deepEqual(raw.landing, {
    mode: "merge-ff",
    actor: "owner",
    identity: {
      name: "diegosouzapw",
      email: "8016841+diegosouzapw@users.noreply.github.com",
    },
    statusContext: "omni-queue/land",
  });
});

test("landing: actor owner needs a noreply identity", () => {
  const bad = validateConfig({ ...raw, landing: { mode: "merge-ff", actor: "owner" } });
  assert.equal(bad.ok, false);
  assert.match(bad.errors.join("\n"), /landing\.identity/);
  const leaked = validateConfig({
    ...raw,
    landing: { mode: "merge-ff", actor: "owner", identity: { name: "x", email: "x@gmail.com" } },
  });
  assert.equal(leaked.ok, false);
  assert.match(leaked.errors.join("\n"), /users\.noreply\.github\.com/);
});

test("landing: an identity is only accepted for the owner actor", () => {
  const identity = { name: "x", email: "1+x@users.noreply.github.com" };
  for (const landing of [
    { mode: "merge-ff", identity },
    { mode: "merge-ff", actor: "app", identity },
  ]) {
    const result = validateConfig({ ...raw, landing });
    assert.equal(result.ok, false);
    assert.match(result.errors.join("\n"), /landing\.identity/);
  }
});

test("landing: defaults keep the App as the actor", () => {
  const ok = validateConfig({ ...raw, landing: { mode: "merge-ff" } });
  assert.equal(ok.ok, true, JSON.stringify(ok.errors));
  assert.deepEqual(ok.config.landing, {
    mode: "merge-ff",
    actor: "app",
    statusContext: "omni-queue/land",
  });
});

test("landing: unknown actor and unknown keys are rejected", () => {
  for (const landing of [
    { mode: "merge-ff", actor: "bot" },
    { mode: "merge-ff", force: true },
  ]) {
    const result = validateConfig({ ...raw, landing });
    assert.equal(result.ok, false);
    assert.match(result.errors.join("\n"), /landing/);
  }
});

test("landing: statusContext is a plain status context", () => {
  for (const statusContext of ["", "a b", "x".repeat(101), "Gate / CI", "ok\n", 7]) {
    const result = validateConfig({ ...raw, landing: { mode: "merge-ff", statusContext } });
    assert.equal(result.ok, false, JSON.stringify(statusContext));
    assert.match(result.errors.join("\n"), /landing\.statusContext/, JSON.stringify(statusContext));
  }
  const ok = validateConfig({ ...raw, landing: { mode: "merge-ff", statusContext: "a.b/c_d-e" } });
  assert.equal(ok.ok, true, JSON.stringify(ok.errors));
});

test("landing: statusContext must not collide with a required or aggregate check", () => {
  const asRequired = validateConfig({
    ...raw,
    requiredChecks: [...raw.requiredChecks, "ci"],
    landing: { mode: "merge-ff", statusContext: "ci" },
  });
  assert.equal(asRequired.ok, false);
  assert.match(asRequired.errors.join("\n"), /landing\.statusContext/);
  const asAggregate = validateConfig({
    ...raw,
    aggregateChecks: ["ci"],
    landing: { mode: "merge-ff", statusContext: "ci" },
  });
  assert.equal(asAggregate.ok, false);
  assert.match(asAggregate.errors.join("\n"), /landing\.statusContext/);
  // The default context is checked too, not only an explicit one.
  const asDefault = validateConfig({
    ...raw,
    requiredChecks: [...raw.requiredChecks, "omni-queue/land"],
    landing: { mode: "merge-ff" },
  });
  assert.equal(asDefault.ok, false);
  assert.match(asDefault.errors.join("\n"), /landing\.statusContext/);
});

test("owner decisions D-Q1..D-Q3 and the shadow start are pinned", () => {
  assert.equal(raw.landing.mode, "merge-ff");
  assert.equal(raw.batch.maxSize, 6);
  assert.equal(raw.label, "omni-queue");
  assert.notEqual(raw.label, "queue", "must not collide with the Mergify label during shadow");
  assert.equal(raw.mode, "shadow");
  assert.deepEqual(raw.approvers, ["diegosouzapw"]);
});

test("acceptance mirrors the Mergify merge_conditions of .mergify.yml", () => {
  assert.deepEqual(raw.requiredChecks, [
    "Gate / CI",
    "Gate / Quality",
    "Merge integrity (changelog + generated skills)",
  ]);
  assert.deepEqual(raw.advisoryChecks, ["Build (advisory)"]);
  assert.equal(raw.checksTimeoutMinutes, 240);
});

test("aggregate gates are the two always() gate jobs of ci.yml and quality.yml", () => {
  assert.deepEqual(raw.aggregateChecks, ["Gate / CI", "Gate / Quality"]);
});

test("protected instruction surfaces cover protected-surfaces.md", () => {
  for (const glob of [
    "**/AGENTS.md",
    "**/CLAUDE.md",
    "**/GEMINI.md",
    ".agents/**",
    ".claude/**",
    "skills/**/SKILL.md",
    "config/quality/skill-templates/**",
    "**/llm.txt",
    ".github/copilot-instructions.md",
  ]) {
    assert.ok(raw.protectedPaths.includes(glob), glob);
  }
});

test("workflows and the queue's own code and config are protected surfaces", () => {
  // The queue runs scripts/merge-queue and reads config/merge-queue from the default branch,
  // and a candidate runs the workflows of its own tree with repository secrets: a change to any
  // of them needs the second label, like an agent-instruction surface.
  const isProtected = (path) => raw.protectedPaths.some((glob) => matchesGlob(path, glob));
  for (const path of [
    ".github/workflows/ci.yml",
    ".github/workflows/omni-queue.yml",
    ".github/workflows/new-workflow.yml",
    ".github/actions/setup/action.yml",
    "scripts/merge-queue/tick.mjs",
    "config/merge-queue/config.json",
    "config/merge-queue/ruleset.release.json",
    ".mergify.yml",
  ]) {
    assert.equal(isProtected(path), true, path);
  }
  for (const path of [
    "src/app/page.tsx",
    "scripts/release/reconcile-changelog.mjs",
    "docs/ops/OMNI_QUEUE.md",
    ".github/dependabot.yml",
  ]) {
    assert.equal(isProtected(path), false, path);
  }
});

test("bases only matches exact release branches", () => {
  const config = loadConfig();
  assert.equal(isManagedBase(config, "release/v3.8.54"), true);
  for (const base of ["main", "release/v3.8", "release/v3.8.54-rc", "xrelease/v3.8.54", ""]) {
    assert.equal(isManagedBase(config, base), false, base);
  }
});

const clone = () => structuredClone(raw);
const MUTATIONS = {
  "missing label": (c) => delete c.label,
  "unknown top-level key": (c) => (c.extra = true),
  "wrong schemaVersion": (c) => (c.schemaVersion = 2),
  "label with comma": (c) => (c.label = "a,b"),
  "label equals protected label": (c) => (c.protectedApprovalLabel = c.label),
  "empty approvers": (c) => (c.approvers = []),
  "invalid approver login": (c) => (c.approvers = ["bad login"]),
  "duplicate approvers": (c) => (c.approvers = ["a", "a"]),
  "null approver": (c) => (c.approvers = [null]),
  "numeric approver": (c) => (c.approvers = [123]),
  "boolean approver": (c) => (c.approvers = [true]),
  "valid approver next to a null one": (c) => (c.approvers = ["diegosouzapw", null]),
  "numeric block label": (c) => (c.blockLabels = [123]),
  "uppercase app slug": (c) => (c.appSlug = "Omni"),
  "unanchored bases": (c) => (c.bases = "release/.*"),
  "invalid bases regexp": (c) => (c.bases = "^release/(v$"),
  "batch maxSize zero": (c) => (c.batch.maxSize = 0),
  "batch maxSize too big": (c) => (c.batch.maxSize = 33),
  "batch minSize above maxSize": (c) => (c.batch.minSize = 7),
  "batch unknown key": (c) => (c.batch.priority = 1),
  "fractional wait": (c) => (c.batch.maxWaitMinutes = 1.5),
  "unknown landing mode": (c) => (c.landing.mode = "rebase"),
  "landing extra key": (c) => (c.landing.force = true),
  "unknown landing actor": (c) => (c.landing.actor = "bot"),
  "owner actor without identity": (c) => delete c.landing.identity,
  "identity with a non-noreply email": (c) => (c.landing.identity.email = "x@gmail.com"),
  "identity with an empty name": (c) => (c.landing.identity.name = ""),
  "identity with an extra key": (c) => (c.landing.identity.signingKey = "x"),
  "app actor with an identity": (c) => (c.landing.actor = "app"),
  "empty status context": (c) => (c.landing.statusContext = ""),
  "status context with a space": (c) => (c.landing.statusContext = "a b"),
  "status context equal to a required check": (c) => {
    c.requiredChecks.push("ci");
    c.landing.statusContext = "ci";
  },
  "no required checks": (c) => (c.requiredChecks = []),
  "blank required check": (c) => (c.requiredChecks = ["  "]),
  "advisory overlaps required": (c) => (c.advisoryChecks = ["Gate / CI"]),
  "missing aggregate checks": (c) => delete c.aggregateChecks,
  "aggregate checks not an array": (c) => (c.aggregateChecks = "Gate / CI"),
  "blank aggregate check": (c) => (c.aggregateChecks = [" "]),
  "duplicate aggregate checks": (c) => (c.aggregateChecks = ["Gate / CI", "Gate / CI"]),
  "timeout too small": (c) => (c.checksTimeoutMinutes = 5),
  "negative infra retries": (c) => (c.infraRetries = -1),
  "too many infra retries": (c) => (c.infraRetries = 6),
  "string boolean": (c) => (c.preferGreenPrChecks = "true"),
  "empty pr green check": (c) => (c.prGreenCheck = ""),
  "no protected paths": (c) => (c.protectedPaths = []),
  "unknown mode": (c) => (c.mode = "on"),
  "valid: squash-api landing": (c) => (c.landing.mode = "squash-api"),
  "valid: app actor without identity": (c) => {
    c.landing.actor = "app";
    delete c.landing.identity;
  },
  "valid: landing with only a mode": (c) => (c.landing = { mode: "merge-ff" }),
  "valid: custom status context": (c) => (c.landing.statusContext = "queue.land/v2"),
  "valid: live mode": (c) => (c.mode = "live"),
  "valid: no block labels": (c) => (c.blockLabels = []),
  "valid: no aggregate checks": (c) => (c.aggregateChecks = []),
  "valid: zero wait and zero retries": (c) => {
    c.batch.maxWaitMinutes = 0;
    c.infraRetries = 0;
  },
};

for (const [name, mutate] of Object.entries(MUTATIONS)) {
  test(`runtime validator agrees with Zod: ${name}`, () => {
    const config = clone();
    mutate(config);
    const zodOk = ConfigSchema.safeParse(config).success;
    const runtime = validateConfig(config);
    assert.equal(runtime.ok, zodOk, `zod=${zodOk} runtime=${JSON.stringify(runtime.errors)}`);
    assert.equal(zodOk, name.startsWith("valid:"), "mutation table expectation");
  });
}

test("non-object configs are rejected", () => {
  for (const value of [null, [], "x", 1]) assert.equal(validateConfig(value).ok, false);
});
