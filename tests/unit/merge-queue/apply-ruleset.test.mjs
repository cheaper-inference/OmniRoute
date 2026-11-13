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
  LANDING_BLOCKING_RULE_TYPES,
  applyRuleset,
  buildRuleset,
  checkLandingPath,
  diffRulesets,
  isProductionRepository,
  main,
  normalizeRuleset,
} from "../../../scripts/merge-queue/apply-ruleset.mjs";

const template = JSON.parse(readFileSync(DEFAULT_TEMPLATE_PATH, "utf8"));
const BASE = "release/v3.8.55";
const APP_ID = 123456;

/**
 * Recording fake of the github.mjs ruleset methods plus the two GETs apply-ruleset issues
 * through gh.request: the repository (full_name after redirects) and the branch rules.
 * @param {object[]} existing  rulesets known to the fake (ours and foreign ones)
 * @param {{fullName?: string, branchRules?: object[], failRules?: boolean}} [opts]
 */
function fakeGh(existing = [], opts = {}) {
  const calls = [];
  const store = new Map(existing.map((r) => [r.id, structuredClone(r)]));
  return {
    calls,
    async request(method, path) {
      calls.push(["request", method, path]);
      if (method !== "GET") throw new Error(`fake: unexpected ${method} ${path}`);
      if (/^\/repos\/[^/]+\/[^/]+\/rules\/branches\/.+$/.test(path)) {
        if (opts.failRules) throw new Error(`GET ${path} → 403: Resource not accessible`);
        return { status: 200, data: structuredClone(opts.branchRules ?? []) };
      }
      const repo = /^\/repos\/([^/]+\/[^/]+)$/.exec(path);
      if (repo) return { status: 200, data: { full_name: opts.fullName ?? repo[1] } };
      throw new Error(`fake: no route for GET ${path}`);
    },
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
      if (!store.has(id)) throw new Error(`GET /rulesets/${id} → 404: Not Found`);
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

/**
 * pull_request parameters exactly as GET /repos/{o}/{r}/rulesets/{id} echoes them (copied from
 * the live "Require PR on default branch" ruleset, 2026-11-13), with the flags our template sets.
 */
const LIVE_PULL_REQUEST_PARAMETERS = Object.freeze({
  required_approving_review_count: 0,
  dismiss_stale_reviews_on_push: false,
  required_reviewers: [],
  require_code_owner_review: false,
  dismissal_restriction: { enabled: false, allowed_actors: [] },
  require_last_push_approval: false,
  required_review_thread_resolution: false,
  require_extra_approval_for_unattributed_changes: false,
  allowed_merge_methods: ["merge", "squash", "rebase"],
});

/** asServer() plus the extra parameters GitHub adds to a pull_request rule on read. */
function liveEcho(body, id = 42) {
  const server = asServer(body, id);
  server.rules.find((r) => r.type === "pull_request").parameters = structuredClone(
    LIVE_PULL_REQUEST_PARAMETERS
  );
  return server;
}

/** The live foreign ruleset that also covers the active release (the default branch). */
const REQUIRE_PR_ON_DEFAULT = Object.freeze({
  id: 21899981,
  name: "Require PR on default branch",
  target: "branch",
  source_type: "Repository",
  source: "cheaper-inference/OmniRoute",
  enforcement: "active",
  conditions: { ref_name: { exclude: [], include: ["~DEFAULT_BRANCH"] } },
  rules: [
    {
      type: "pull_request",
      parameters: {
        ...LIVE_PULL_REQUEST_PARAMETERS,
        require_extra_approval_for_unattributed_changes: true,
      },
    },
  ],
  bypass_actors: [],
});

/** GET /rules/branches/<base> for the default release branch once our ruleset (id) exists. */
function branchRulesWithForeignPullRequest(ownId) {
  const from = (rulesetId) => ({
    ruleset_source_type: "Repository",
    ruleset_source: "cheaper-inference/OmniRoute",
    ruleset_id: rulesetId,
  });
  return [
    { type: "deletion", ...from(15605329) },
    { type: "non_fast_forward", ...from(15605329) },
    {
      type: "pull_request",
      parameters: REQUIRE_PR_ON_DEFAULT.rules[0].parameters,
      ...from(21899981),
    },
    { type: "deletion", ...from(ownId) },
    { type: "non_fast_forward", ...from(ownId) },
    { type: "pull_request", parameters: LIVE_PULL_REQUEST_PARAMETERS, ...from(ownId) },
  ];
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
    // GitHub stores true when absent (live GET); pinned so the noop comparison is stable
    "require_extra_approval_for_unattributed_changes",
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
  const badBaseGh = fakeGh([]);
  assert.equal(
    await main(["--base", "release/*", "--app-id", "1"], sandbox, { gh: badBaseGh, ...badBase }),
    2,
    "an invalid --base is a usage error like the others"
  );
  assert.match(badBase.lines.err.join("\n"), /invalid base branch/);
  assert.deepEqual(badBaseGh.calls, [], "rejected before any API call");
});

test("main prints usage with --help", async () => {
  const io = capture();
  assert.equal(await main(["--help"], {}, io), 0);
  assert.match(io.lines.out.join("\n"), /--base <branch>/);
});

// ───────────────────────────── review round 2 ─────────────────────────────

test("noop against the real GET payload (dismissal_restriction, required_reviewers, flags)", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const echo = liveEcho(desired, 42);
  assert.deepEqual(diffRulesets(echo, desired), []);
  const gh = fakeGh([echo]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, { action: "noop", id: 42, diff: [] });
  assert.deepEqual(writes(gh), [], "a second run must not PUT again");
});

test("a server-side flag or dismissal restriction that is really on is still drift", () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const flagOn = liveEcho(desired);
  flagOn.rules.find(
    (r) => r.type === "pull_request"
  ).parameters.require_extra_approval_for_unattributed_changes = true;
  assert.deepEqual(diffRulesets(flagOn, desired), [
    "~ rule pull_request.require_extra_approval_for_unattributed_changes: true → (unset)",
  ]);

  const restricted = liveEcho(desired);
  restricted.rules.find((r) => r.type === "pull_request").parameters.dismissal_restriction = {
    enabled: true,
    allowed_actors: [{ actor_id: 9, actor_type: "Team" }],
  };
  const diff = diffRulesets(restricted, desired);
  assert.equal(diff.length, 1);
  assert.match(
    diff[0],
    /^~ rule pull_request\.dismissal_restriction: \{.*"enabled":true.*\} → \(unset\)$/
  );
});

test("duplicate rule types: reported as drift in the live ruleset, refused in the template", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const dup = liveEcho(desired, 42);
  dup.rules.push({ type: "deletion" });
  assert.deepEqual(diffRulesets(dup, desired), [
    "- rule deletion: 1 duplicate(s) in the current ruleset",
  ]);
  const gh = fakeGh([dup]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.equal(result.action, "update");
  assert.deepEqual(writes(gh), ["updateRuleset"]);

  const badTemplate = structuredClone(template);
  badTemplate.rules.push({ type: "deletion" });
  assert.throws(
    () => buildRuleset(badTemplate, { base: BASE, appId: APP_ID }),
    /duplicate rule types: deletion/
  );
  assert.throws(
    () => diffRulesets(null, { ...desired, rules: [...desired.rules, { type: "pull_request" }] }),
    /duplicate rule types: pull_request/
  );
});

test("applyRuleset refuses a same-named repository ruleset with another target", async () => {
  const desired = buildRuleset(template, { base: BASE, appId: APP_ID });
  const gh = fakeGh([{ ...liveEcho(desired, 8), target: "tag" }]);
  await assert.rejects(
    applyRuleset({ gh, base: BASE, desired, dryRun: false }),
    /already exists with target "tag" \(id 8\)/
  );
  assert.deepEqual(writes(gh), []);
});

test("checkLandingPath flags a foreign pull_request rule the App does not bypass", async () => {
  const gh = fakeGh([REQUIRE_PR_ON_DEFAULT], {
    branchRules: branchRulesWithForeignPullRequest(42),
  });
  const report = await checkLandingPath({
    gh,
    repo: "acme/sandbox",
    base: BASE,
    ownRulesetId: 42,
    appId: APP_ID,
  });
  assert.equal(report.blockers.length, 1, JSON.stringify(report));
  assert.match(
    report.blockers[0],
    /^rule pull_request from ruleset 21899981 \(Repository cheaper-inference\/OmniRoute\) on release\/v3\.8\.55: the omni-queue App \(Integration 123456\) is not an "always" bypass actor$/
  );
  assert.deepEqual(report.warnings, []);
  assert.ok(
    gh.calls.some(
      ([m, verb, path]) =>
        m === "request" && verb === "GET" && path === `/repos/acme/sandbox/rules/branches/${BASE}`
    )
  );
  assert.ok(!gh.calls.some(([m, id]) => m === "getRuleset" && id === 15605329), "safe rules skip");
  assert.ok(LANDING_BLOCKING_RULE_TYPES.includes("pull_request"));
});

test("checkLandingPath accepts an always/exempt App bypass, not a pull_request-only one", async () => {
  const check = async (bypass_mode, appId = APP_ID) => {
    const foreign = {
      ...structuredClone(REQUIRE_PR_ON_DEFAULT),
      bypass_actors: [{ actor_id: APP_ID, actor_type: "Integration", bypass_mode }],
    };
    const gh = fakeGh([foreign], { branchRules: branchRulesWithForeignPullRequest(42) });
    return checkLandingPath({ gh, repo: "acme/sandbox", base: BASE, ownRulesetId: 42, appId });
  };
  assert.deepEqual(await check("always"), { blockers: [], warnings: [] });
  assert.deepEqual(await check("exempt"), { blockers: [], warnings: [] });
  assert.equal((await check("pull_request")).blockers.length, 1, "PR-only bypass misses pushes");
  assert.equal((await check("always", 999)).blockers.length, 1, "another App id is not ours");
  const noAppId = await check("always", null);
  assert.equal(noAppId.blockers.length, 1);
  assert.match(noAppId.blockers[0], /without --app-id/);
});

test("checkLandingPath: unreadable bypass list blocks, unknown rule types only warn", async () => {
  const rules = [
    {
      type: "pull_request",
      ruleset_id: 555,
      ruleset_source_type: "Organization",
      ruleset_source: "acme",
    },
    { type: "max_file_size", ruleset_id: 21899981, ruleset_source_type: "Repository" },
    { type: "creation", ruleset_id: 21899981 },
  ];
  const gh = fakeGh([REQUIRE_PR_ON_DEFAULT], { branchRules: rules });
  const report = await checkLandingPath({
    gh,
    repo: "acme/sandbox",
    base: BASE,
    ownRulesetId: null,
    appId: APP_ID,
  });
  assert.equal(report.blockers.length, 1);
  assert.match(report.blockers[0], /ruleset 555 \(Organization acme\).*not readable/);
  assert.equal(report.warnings.length, 1);
  assert.match(report.warnings[0], /^rule max_file_size from ruleset 21899981/);
});

test("main: a real apply exits 1 when another ruleset would reject the landing push", async () => {
  const sandbox = { GITHUB_REPOSITORY: "acme/sandbox" };
  const gh = fakeGh([REQUIRE_PR_ON_DEFAULT], {
    branchRules: branchRulesWithForeignPullRequest(999),
  });
  const io = capture();
  const code = await main(["--base", BASE, "--app-id", String(APP_ID)], sandbox, { gh, ...io });
  assert.equal(code, 1);
  assert.deepEqual(writes(gh), ["createRuleset"], "our ruleset is still written");
  const errors = io.lines.err.join("\n");
  assert.match(
    errors,
    /error: landing push would be rejected: rule pull_request from ruleset 21899981/
  );
  assert.match(errors, /add the omni-queue App as an always bypass actor/);

  const dry = fakeGh([REQUIRE_PR_ON_DEFAULT], {
    branchRules: branchRulesWithForeignPullRequest(1),
  });
  const dryIo = capture();
  assert.equal(
    await main(["--base", BASE, "--app-id", String(APP_ID), "--dry-run"], sandbox, {
      gh: dry,
      ...dryIo,
    }),
    0,
    "dry-run only warns"
  );
  assert.match(dryIo.lines.err.join("\n"), /warning: landing push would be rejected/);
  assert.deepEqual(writes(dry), []);

  const blind = fakeGh([], { failRules: true });
  const blindIo = capture();
  assert.equal(
    await main(["--base", BASE, "--app-id", String(APP_ID)], sandbox, { gh: blind, ...blindIo }),
    1,
    "a landing path that cannot be read is not reported as fine"
  );
  assert.match(
    blindIo.lines.err.join("\n"),
    /could not read the rules enforced on release\/v3\.8\.55/
  );
});

test("main: the production lock also holds for an alias that resolves to production", async () => {
  const alias = "acme/omniroute-renamed";
  const gh = fakeGh([], { fullName: "cheaper-inference/OmniRoute" });
  const io = capture();
  const code = await main(["--base", BASE, "--repo", alias, "--app-id", "1"], {}, { gh, ...io });
  assert.equal(code, 2);
  assert.deepEqual(writes(gh), []);
  assert.deepEqual(
    gh.calls.map(([m, verb, path]) => [m, verb, path]),
    [["request", "GET", `/repos/${alias}`]],
    "only the resolution GET runs before refusing"
  );
  assert.match(io.lines.err.join("\n"), /resolves to cheaper-inference\/OmniRoute \(production\)/);

  const allowed = fakeGh([], { fullName: "cheaper-inference/OmniRoute" });
  const code2 = await main(
    ["--base", BASE, "--repo", alias, "--app-id", "1"],
    { OMNI_QUEUE_ALLOW_PRODUCTION_RULESET: "1" },
    { gh: allowed, out: () => {}, err: () => {} }
  );
  assert.equal(code2, 0);
  assert.deepEqual(writes(allowed), ["createRuleset"]);

  const unresolved = fakeGh([], { fullName: "" });
  const io3 = capture();
  assert.equal(
    await main(["--base", BASE, "--repo", alias, "--app-id", "1"], {}, { gh: unresolved, ...io3 }),
    1
  );
  assert.deepEqual(writes(unresolved), []);
  assert.match(io3.lines.err.join("\n"), /could not resolve the repository/);
});
