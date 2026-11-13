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
  isManagedBase,
  loadConfig,
  validateConfig,
} from "../../../scripts/merge-queue/config.mjs";

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
    landing: z.strictObject({ mode: z.enum(["merge-ff", "squash-api"]) }),
    requiredChecks: z.array(z.string().trim().min(1)).min(1).refine(unique),
    advisoryChecks: z.array(z.string().trim().min(1)).refine(unique),
    checksTimeoutMinutes: z.number().int().min(10).max(1440),
    infraRetries: z.number().int().min(0).max(5),
    preferGreenPrChecks: z.boolean(),
    prGreenCheck: z.string().trim().min(1),
    protectedPaths: z.array(z.string().trim().min(1)).min(1).refine(unique),
    mode: z.enum(["shadow", "live"]),
  })
  .refine((c) => c.label !== c.protectedApprovalLabel)
  .refine((c) => !c.requiredChecks.some((name) => c.advisoryChecks.includes(name)));

test("the shipped config passes the Zod schema and the runtime validator", () => {
  const parsed = ConfigSchema.safeParse(raw);
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues ?? []));
  assert.deepEqual(validateConfig(raw), { ok: true, config: raw, errors: [] });
  assert.equal(loadConfig().label, "omni-queue");
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
  "no required checks": (c) => (c.requiredChecks = []),
  "blank required check": (c) => (c.requiredChecks = ["  "]),
  "advisory overlaps required": (c) => (c.advisoryChecks = ["Gate / CI"]),
  "timeout too small": (c) => (c.checksTimeoutMinutes = 5),
  "negative infra retries": (c) => (c.infraRetries = -1),
  "too many infra retries": (c) => (c.infraRetries = 6),
  "string boolean": (c) => (c.preferGreenPrChecks = "true"),
  "empty pr green check": (c) => (c.prGreenCheck = ""),
  "no protected paths": (c) => (c.protectedPaths = []),
  "unknown mode": (c) => (c.mode = "on"),
  "valid: squash-api landing": (c) => (c.landing.mode = "squash-api"),
  "valid: live mode": (c) => (c.mode = "live"),
  "valid: no block labels": (c) => (c.blockLabels = []),
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
