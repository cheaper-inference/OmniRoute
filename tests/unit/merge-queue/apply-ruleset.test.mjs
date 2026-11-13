// omni-queue ruleset (plan §3.9): config/merge-queue/ruleset.release.json and
// scripts/merge-queue/apply-ruleset.mjs. The GitHub client is a recording fake: no network.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { z } from "zod";
import {
  BASE_PLACEHOLDER,
  CHECK_REQUIRING_RULE_TYPES,
  DEFAULT_TEMPLATE_PATH,
  applyRuleset,
  buildRuleset,
  diffRulesets,
  isProductionRepository,
  main,
  normalizeRuleset,
} from "../../../scripts/merge-queue/apply-ruleset.mjs";

const template = JSON.parse(readFileSync(DEFAULT_TEMPLATE_PATH, "utf8"));
const BASE = "release/v3.8.55";
const APP_ID = 123456;

/** Recording fake of the github.mjs ruleset methods. */
function fakeGh(existing = []) {
  const calls = [];
  const store = new Map(existing.map((r) => [r.id, structuredClone(r)]));
  return {
    calls,
    async listRulesets() {
      calls.push(["listRulesets"]);
      return [...store.values()].map((r) => ({
        id: r.id,
        name: r.name,
        target: r.target,
        source_type: r.source_type ?? "Repository",
        enforcement: r.enforcement,
      }));
    },
    async getRuleset(id) {
      calls.push(["getRuleset", id]);
      return structuredClone(store.get(id));
    },
    async createRuleset(body) {
      calls.push(["createRuleset", body]);
      return { id: 999, ...body };
    },
    async updateRuleset(id, body) {
      calls.push(["updateRuleset", id, body]);
      return { id, ...body };
    },
  };
}

const writes = (gh) =>
  gh.calls.filter(([m]) => m === "createRuleset" || m === "updateRuleset").map(([m]) => m);

/** What GitHub returns for an applied ruleset: same content plus server-only fields. */
function asServer(body, id = 42) {
  return {
    id,
    node_id: "RRS_x",
    source_type: "Repository",
    source: "acme/sandbox",
    current_user_can_bypass: "always",
    created_at: "2026-11-13T00:00:00Z",
    updated_at: "2026-11-13T00:00:00Z",
    _links: { self: { href: "https://api.github.com/x" } },
    ...structuredClone(body),
    // the API lists exclude/actors in its own order and echoes defaults
    bypass_actors: [...body.bypass_actors].reverse(),
  };
}

const capture = () => {
  const lines = { out: [], err: [] };
  return {
    lines,
    out: (l) => lines.out.push(l),
    err: (l) => lines.err.push(l),
  };
};

// ───────────────────────────── the template ─────────────────────────────

const RulesetTemplateSchema = z.strictObject({
  _comment: z.string(),
  name: z.string().min(1),
  target: z.literal("branch"),
  enforcement: z.literal("active"),
  conditions: z.strictObject({
    ref_name: z.strictObject({
      include: z.array(z.string()).length(1),
      exclude: z.array(z.string()).length(0),
    }),
  }),
  rules: z.array(
    z.object({ type: z.string(), parameters: z.record(z.string(), z.unknown()).optional() })
  ),
  bypass_actors: z.array(
    z.strictObject({
      actor_id: z.number().int().positive().nullable(),
      actor_type: z.enum(["Integration", "RepositoryRole"]),
      bypass_mode: z.literal("always"),
    })
  ),
});

test("template: valid REST shape with the base placeholder", () => {
  const parsed = RulesetTemplateSchema.safeParse(template);
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues));
  assert.deepEqual(template.conditions.ref_name.include, [`refs/heads/${BASE_PLACEHOLDER}`]);
});

test("template: exactly deletion, non_fast_forward and pull_request — no check requirement", () => {
  const types = template.rules.map((r) => r.type).sort();
  assert.deepEqual(types, ["deletion", "non_fast_forward", "pull_request"]);
  for (const type of CHECK_REQUIRING_RULE_TYPES) {
    assert.ok(!types.includes(type), `${type} must not be in the release ruleset`);
  }
  const pr = template.rules.find((r) => r.type === "pull_request");
  assert.equal(pr.parameters.required_approving_review_count, 0);
  for (const flag of [
    "dismiss_stale_reviews_on_push",
    "require_code_owner_review",
    "require_last_push_approval",
    "required_review_thread_resolution",
  ]) {
    assert.equal(pr.parameters[flag], false, flag);
  }
});

test("template: App bypass slot (filled from --app-id) and the admin role (id 5)", () => {
  const app = template.bypass_actors.find((a) => a.actor_type === "Integration");
  const admin = template.bypass_actors.find((a) => a.actor_type === "RepositoryRole");
  assert.deepEqual(app, { actor_id: null, actor_type: "Integration", bypass_mode: "always" });
  assert.deepEqual(admin, { actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" });
  assert.equal(template.bypass_actors.length, 2);
});

// ───────────────────────────── buildRuleset ─────────────────────────────

test("buildRuleset fills the branch, the name suffix and the App id; keeps the admin", () => {
  const body = buildRuleset(template, { base: BASE, appId: APP_ID });
  assert.equal(body.name, `${template.name}: ${BASE}`);
  assert.deepEqual(body.conditions.ref_name.include, [`refs/heads/${BASE}`]);
  assert.deepEqual(body.conditions.ref_name.exclude, []);
  assert.deepEqual(body.bypass_actors, [
    { actor_id: APP_ID, actor_type: "Integration", bypass_mode: "always" },
    { actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" },
  ]);
  assert.equal(body._comment, undefined, "private keys are stripped from the REST body");
  assert.ok(!JSON.stringify(body).includes("{{"));
  assert.deepEqual(
    body.rules.map((r) => r.type),
    template.rules.map((r) => r.type)
  );
});

test("buildRuleset does not mutate the template", () => {
  const before = JSON.stringify(template);
  buildRuleset(template, { base: BASE, appId: APP_ID });
  assert.equal(JSON.stringify(template), before);
});

test("buildRuleset without an App id leaves the Integration actor out, admin stays", () => {
  const body = buildRuleset(template, { base: BASE, appId: null });
  assert.deepEqual(body.bypass_actors, [
    { actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" },
  ]);
});

test("buildRuleset rejects unsafe branches, bad App ids and templates without a placeholder", () => {
  for (const base of [
    "",
    "release/*",
    "release/v3.8.?",
    "refs/heads/release/v1.2.3",
    "release/../main",
    "release//v1",
    "/release/v1",
    "release/v1/",
    "release/.hidden",
    "release/v1.lock",
    "release v1",
  ]) {
    assert.throws(() => buildRuleset(template, { base, appId: APP_ID }), /invalid base/, base);
  }
  for (const appId of [0, -1, 1.5, "123"]) {
    assert.throws(() => buildRuleset(template, { base: BASE, appId }), /invalid app id/);
  }
  const noPlaceholder = structuredClone(template);
  noPlaceholder.conditions.ref_name.include = ["refs/heads/release/*"];
  assert.throws(() => buildRuleset(noPlaceholder, { base: BASE, appId: APP_ID }), /\{\{base\}\}/);
  assert.throws(() => buildRuleset({ ...template, rules: [] }, { base: BASE, appId: 1 }), /rules/);
});

// ───────────────────────────── normalize / diff ─────────────────────────────

test("normalizeRuleset ignores server-only fields, ordering and off-by-default params", () => {
  const body = buildRuleset(template, { base: BASE, appId: APP_ID });
  const server = asServer(body);
  server.rules = [...server.rules].reverse();
  const pr = server.rules.find((r) => r.type === "pull_request");
  pr.parameters = {
    ...pr.parameters,
    allowed_merge_methods: ["squash", "rebase", "merge"],
    required_reviewers: [],
    automatic_copilot_code_review_enabled: false,
  };
  assert.deepEqual(normalizeRuleset(server), normalizeRuleset(body));
  assert.deepEqual(diffRulesets(server, body), []);
});

test("diffRulesets lists a creation, field changes, added/removed rules and actors", () => {
  const body = buildRuleset(template, { base: BASE, appId: APP_ID });
  const created = diffRulesets(null, body);
  assert.ok(created.includes(`+ name: ${JSON.stringify(body.name)}`));
  assert.ok(created.includes("+ rule deletion"));
  assert.ok(created.includes("+ rule non_fast_forward"));
  assert.ok(created.some((l) => l.startsWith("+ rule pull_request {")));
  assert.ok(created.includes(`+ bypass Integration:${APP_ID} (always)`));
  assert.ok(created.includes("+ bypass RepositoryRole:5 (always)"));

  const drifted = asServer(body);
  drifted.enforcement = "evaluate";
  drifted.rules = drifted.rules
    .filter((r) => r.type !== "deletion")
    .concat([
      {
        type: "required_status_checks",
        parameters: { strict_required_status_checks_policy: true },
      },
    ]);
  drifted.rules.find((r) => r.type === "pull_request").parameters.required_approving_review_count =
    1;
  drifted.bypass_actors = [
    { actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "pull_request" },
    { actor_id: 777, actor_type: "Integration", bypass_mode: "always" },
  ];
  const diff = diffRulesets(drifted, body);
  assert.deepEqual(diff, [
    '~ enforcement: "evaluate" → "active"',
    "+ rule deletion",
    "~ rule pull_request.required_approving_review_count: 1 → (unset)",
    '- rule required_status_checks {"strict_required_status_checks_policy":true}',
    `+ bypass Integration:${APP_ID} (always)`,
    "~ bypass RepositoryRole:5: pull_request → always",
    "- bypass Integration:777 (always)",
  ]);
});

// ───────────────────────────── applyRuleset ─────────────────────────────

test("applyRuleset creates the ruleset when no ruleset has its name", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const gh = fakeGh([{ id: 7, name: "Protect release branches", target: "branch", rules: [] }]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.equal(result.action, "create");
  assert.equal(result.id, 999);
  assert.ok(result.diff.length > 0);
  assert.deepEqual(writes(gh), ["createRuleset"]);
  assert.deepEqual(gh.calls.find(([m]) => m === "createRuleset")[1], desired);
  assert.ok(
    !gh.calls.some(([m, id]) => m === "getRuleset" && id === 7),
    "other rulesets untouched"
  );
});

test("applyRuleset updates a same-named ruleset that drifted", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const drifted = asServer(desired, 42);
  drifted.bypass_actors = drifted.bypass_actors.filter((a) => a.actor_type !== "Integration");
  const gh = fakeGh([drifted]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, {
    action: "update",
    id: 42,
    diff: [`+ bypass Integration:${APP_ID} (always)`],
  });
  const update = gh.calls.find(([m]) => m === "updateRuleset");
  assert.equal(update[1], 42);
  assert.deepEqual(update[2], desired);
  assert.deepEqual(writes(gh), ["updateRuleset"]);
});

test("applyRuleset is a noop when the live ruleset already matches", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const gh = fakeGh([asServer(desired, 42)]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, { action: "noop", id: 42, diff: [] });
  assert.deepEqual(writes(gh), []);
});

test("applyRuleset --dry-run reports create/update but never calls a write method", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const empty = fakeGh([]);
  const create = await applyRuleset({ gh: empty, base: BASE, desired, dryRun: true });
  assert.equal(create.action, "create");
  assert.equal(create.id, null);
  assert.deepEqual(writes(empty), []);

  const drifted = asServer(desired, 42);
  drifted.enforcement = "disabled";
  const existing = fakeGh([drifted]);
  const update = await applyRuleset({ gh: existing, base: BASE, desired, dryRun: true });
  assert.equal(update.action, "update");
  assert.deepEqual(update.diff, ['~ enforcement: "disabled" → "active"']);
  assert.deepEqual(writes(existing), []);
});

test("applyRuleset refuses duplicates and a body that targets another branch", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const dup = fakeGh([asServer(desired, 1), asServer(desired, 2)]);
  await assert.rejects(
    applyRuleset({ gh: dup, base: BASE, desired, dryRun: false }),
    /2 repository rulesets/
  );
  assert.deepEqual(writes(dup), []);
  await assert.rejects(
    applyRuleset({ gh: fakeGh([]), base: "release/v9.9.9", desired, dryRun: false }),
    /does not target refs\/heads\/release\/v9\.9\.9/
  );
});

test("applyRuleset ignores an organization ruleset with the same name", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const org = { ...asServer(desired, 5), source_type: "Organization" };
  const gh = fakeGh([org]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.equal(result.action, "create");
  assert.deepEqual(writes(gh), ["createRuleset"]);
});

// ───────────────────────────── main / production lock ─────────────────────────────

test("isProductionRepository matches the org repo and its old name, case-insensitively", () => {
  assert.equal(isProductionRepository("cheaper-inference/OmniRoute"), true);
  assert.equal(isProductionRepository("diegosouzapw/OmniRoute"), true);
  assert.equal(isProductionRepository("CHEAPER-INFERENCE/omniroute"), true);
  assert.equal(isProductionRepository("cheaper-inference/omni-queue-sandbox"), false);
});

test("main refuses a real apply on production without the override and writes nothing", async () => {
  const gh = fakeGh([]);
  const io = capture();
  const code = await main(
    ["--base", BASE, "--repo", "cheaper-inference/OmniRoute", "--app-id", String(APP_ID)],
    {},
    { gh, out: io.out, err: io.err }
  );
  assert.equal(code, 2);
  assert.deepEqual(gh.calls, [], "not even a read before the lock");
  assert.match(
    io.lines.err.join("\n"),
    /refusing to write a ruleset on cheaper-inference\/OmniRoute/
  );
});

test("main allows the production dry-run, and the real apply only with the override", async () => {
  const dry = fakeGh([]);
  const io = capture();
  const code = await main(
    ["--base", BASE, "--repo", "cheaper-inference/OmniRoute", "--app-id", "1", "--dry-run"],
    {},
    { gh: dry, out: io.out, err: io.err }
  );
  assert.equal(code, 0);
  assert.deepEqual(writes(dry), []);
  const printed = io.lines.out.join("\n");
  assert.match(
    printed,
    /apply-ruleset: create "omni-queue release protection: release\/v3\.8\.55"/
  );
  assert.match(printed, /dry-run, nothing was written/);
  assert.match(printed, /"refs\/heads\/release\/v3\.8\.55"/);

  const live = fakeGh([]);
  const code2 = await main(
    ["--base", BASE, "--repo", "cheaper-inference/OmniRoute", "--app-id", "1"],
    { OMNI_QUEUE_ALLOW_PRODUCTION_RULESET: "1" },
    { gh: live, out: () => {}, err: () => {} }
  );
  assert.equal(code2, 0);
  assert.deepEqual(writes(live), ["createRuleset"]);

  const notOne = fakeGh([]);
  const code3 = await main(
    ["--base", BASE, "--repo", "cheaper-inference/OmniRoute", "--app-id", "1"],
    { OMNI_QUEUE_ALLOW_PRODUCTION_RULESET: "true" },
    { gh: notOne, out: () => {}, err: () => {} }
  );
  assert.equal(code3, 2, "only the exact value 1 unlocks production");
  assert.deepEqual(notOne.calls, []);
});

test("main applies on a sandbox repo, reading repo and App id from the environment", async () => {
  const gh = fakeGh([]);
  const io = capture();
  const code = await main(
    ["--base", BASE],
    { GITHUB_REPOSITORY: "cheaper-inference/omni-queue-sandbox", OMNI_QUEUE_APP_ID: "4242" },
    { gh, out: io.out, err: io.err }
  );
  assert.equal(code, 0);
  const created = gh.calls.find(([m]) => m === "createRuleset")[1];
  assert.deepEqual(created.bypass_actors[0], {
    actor_id: 4242,
    actor_type: "Integration",
    bypass_mode: "always",
  });
  assert.deepEqual(io.lines.err, []);
});

test("main: usage errors, a real apply without App id, and API failures", async () => {
  const silent = { out: () => {}, err: () => {} };
  const sandbox = { GITHUB_REPOSITORY: "acme/sandbox" };
  assert.equal(await main([], sandbox, { gh: fakeGh(), ...silent }), 2, "--base is required");
  assert.equal(await main(["--base", BASE, "--bogus"], sandbox, { gh: fakeGh(), ...silent }), 2);
  assert.equal(await main(["--base", BASE], {}, { gh: fakeGh(), ...silent }), 2, "no repo");
  assert.equal(
    await main(["--base", BASE, "--app-id", "12x"], sandbox, { gh: fakeGh(), ...silent }),
    2
  );

  const noApp = fakeGh([]);
  const io = capture();
  assert.equal(await main(["--base", BASE], sandbox, { gh: noApp, ...io }), 2);
  assert.match(io.lines.err.join("\n"), /needs --app-id/);
  assert.deepEqual(noApp.calls, []);

  const preview = capture();
  assert.equal(
    await main(["--base", BASE, "--dry-run"], sandbox, { gh: fakeGh([]), ...preview }),
    0
  );
  assert.match(preview.lines.err.join("\n"), /leaves out the omni-queue App bypass actor/);

  const failing = {
    ...fakeGh([]),
    async listRulesets() {
      throw new Error("GET /rulesets → 403: Resource not accessible by integration");
    },
  };
  const io2 = capture();
  assert.equal(await main(["--base", BASE, "--app-id", "1"], sandbox, { gh: failing, ...io2 }), 1);
  assert.match(io2.lines.err.join("\n"), /403/);

  const badBase = capture();
  assert.equal(
    await main(["--base", "release/*", "--app-id", "1"], sandbox, { gh: fakeGh([]), ...badBase }),
    1
  );
  assert.match(badBase.lines.err.join("\n"), /invalid base branch/);
});

test("main prints usage with --help", async () => {
  const io = capture();
  assert.equal(await main(["--help"], {}, io), 0);
  assert.match(io.lines.out.join("\n"), /--base <branch>/);
});
