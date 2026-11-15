// omni-queue rulesets (plan §3.9): config/merge-queue/ruleset.release.json (the status door of a
// release branch), ruleset.queue-refs.json (the queue's own refs) and
// scripts/merge-queue/apply-ruleset.mjs. The GitHub client is a recording fake: no network.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
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
const QUEUE_REFS_TEMPLATE_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  "config",
  "merge-queue",
  "ruleset.queue-refs.json"
);
/** Read lazily so a missing file fails the tests that need it, not the whole file. */
const queueRefsTemplate = () => JSON.parse(readFileSync(QUEUE_REFS_TEMPLATE_PATH, "utf8"));
const BASE = "release/v3.8.55";
const APP_ID = 123456;
const STATUS_CONTEXT = "omni-queue/land";

/** buildRuleset for the release template with the usual inputs; `extra` overrides any of them. */
const build = (extra = {}, tpl = template) =>
  buildRuleset(tpl, { base: BASE, appId: APP_ID, statusContext: STATUS_CONTEXT, ...extra });
const statusRule = (body) => body.rules.find((r) => r.type === "required_status_checks");

/**
 * Recording fake of the github.mjs ruleset methods plus the two GETs apply-ruleset issues: the
 * repository through gh.request (full_name after redirects) and the branch rules. The branch
 * rules are paginated: `branchRules` (or `branchRulePages`, one array per page) is what
 * gh.paginate returns in full; gh.request on that path only ever sees the first page.
 * @param {object[]} existing  rulesets known to the fake (ours and foreign ones)
 * @param {{fullName?: string, branchRules?: object[], branchRulePages?: object[][],
 *          failRules?: boolean}} [opts]
 */
function fakeGh(existing = [], opts = {}) {
  const calls = [];
  const store = new Map(existing.map((r) => [r.id, structuredClone(r)]));
  const RULES_PATH = /^\/repos\/[^/]+\/[^/]+\/rules\/branches\/.+$/;
  const rulePages = () => structuredClone(opts.branchRulePages ?? [opts.branchRules ?? []]);
  return {
    calls,
    async request(method, path) {
      calls.push(["request", method, path]);
      if (method !== "GET") throw new Error(`fake: unexpected ${method} ${path}`);
      if (RULES_PATH.test(path)) {
        if (opts.failRules) throw new Error(`GET ${path} → 403: Resource not accessible`);
        return { status: 200, data: rulePages()[0] ?? [] };
      }
      const repo = /^\/repos\/([^/]+\/[^/]+)$/.exec(path);
      if (repo) return { status: 200, data: { full_name: opts.fullName ?? repo[1] } };
      throw new Error(`fake: no route for GET ${path}`);
    },
    async paginate(path) {
      calls.push(["paginate", "GET", path]);
      if (!RULES_PATH.test(path)) throw new Error(`fake: no paginated route for ${path}`);
      if (opts.failRules) throw new Error(`GET ${path} → 403: Resource not accessible`);
      return rulePages().flat();
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

/**
 * required_status_checks parameters as GET echoes them: every flag spelled out, the check as
 * {context, integration_id}. (Shape of the rehearsal ruleset, 2026-11-15.)
 */
const liveStatusParameters = (integrationId = APP_ID, context = STATUS_CONTEXT) => ({
  strict_required_status_checks_policy: false,
  do_not_enforce_on_create: false,
  required_status_checks: [{ context, integration_id: integrationId }],
});

/** asServer() plus the extra parameters GitHub adds to the rules on read. */
function liveEcho(body, id = 42) {
  const server = asServer(body, id);
  server.rules.find((r) => r.type === "required_status_checks").parameters = liveStatusParameters();
  return server;
}

/** A release ruleset body that also carries a pull_request rule (a legacy / drifted shape). */
function withPullRequestRule(body) {
  const copy = structuredClone(body);
  copy.rules.push({
    type: "pull_request",
    parameters: structuredClone(LIVE_PULL_REQUEST_PARAMETERS),
  });
  return copy;
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

// ───────────────────────────── the templates ─────────────────────────────

const RuleSchema = z.object({
  type: z.string(),
  parameters: z.record(z.string(), z.unknown()).optional(),
});
const RulesetTemplateSchema = z.strictObject({
  _comment: z.string(),
  name: z.string().min(1),
  target: z.literal("branch"),
  enforcement: z.literal("active"),
  conditions: z.strictObject({
    ref_name: z.strictObject({
      include: z.array(z.string()).min(1),
      exclude: z.array(z.string()).length(0),
    }),
  }),
  rules: z.array(RuleSchema),
  bypass_actors: z.array(
    z.strictObject({
      actor_id: z.number().int().positive().nullable(),
      actor_type: z.enum(["Integration", "RepositoryRole"]),
      bypass_mode: z.literal("always"),
    })
  ),
});

test("release template: valid REST shape with the base placeholder", () => {
  const parsed = RulesetTemplateSchema.safeParse(template);
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues));
  assert.deepEqual(template.conditions.ref_name.include, [`refs/heads/${BASE_PLACEHOLDER}`]);
});

test("release template: deletion, non_fast_forward and one status check — no pull_request", () => {
  assert.deepEqual(
    template.rules.map((r) => r.type),
    ["deletion", "non_fast_forward", "required_status_checks"]
  );
  assert.ok(!template.rules.some((r) => r.type === "pull_request"), "no pull_request rule");
  for (const type of CHECK_REQUIRING_RULE_TYPES) {
    if (type === "required_status_checks") continue;
    assert.ok(
      !template.rules.some((r) => r.type === type),
      `${type} must not be in the release ruleset`
    );
  }
  assert.deepEqual(statusRule(template).parameters, {
    strict_required_status_checks_policy: false,
    do_not_enforce_on_create: false,
    required_status_checks: [{ context: "{{statusContext}}", integration_id: null }],
  });
});

test("release template: no bypass actor at all (the status is the only door)", () => {
  assert.deepEqual(template.bypass_actors, []);
});

test("queue-refs template: valid REST shape, the queue's refs, App-only bypass slot", () => {
  const qr = queueRefsTemplate();
  const parsed = RulesetTemplateSchema.safeParse(qr);
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues));
  assert.deepEqual(qr.conditions.ref_name.include, [
    "refs/heads/omni-queue-state",
    "refs/heads/omni-queue/**",
  ]);
  assert.deepEqual(qr.rules.map((r) => r.type).sort(), [
    "creation",
    "deletion",
    "non_fast_forward",
    "update",
  ]);
  assert.deepEqual(qr.bypass_actors, [
    { actor_id: null, actor_type: "Integration", bypass_mode: "always" },
  ]);
  assert.ok(!JSON.stringify(qr).includes(BASE_PLACEHOLDER), "no base placeholder");
});

// ───────────────────────────── buildRuleset ─────────────────────────────

test("release ruleset: one required status pinned to the App and no bypass actor", () => {
  const rs = buildRuleset(template, {
    base: "release/v9.9.9",
    appId: 123,
    statusContext: "omni-queue/land",
  });
  assert.deepEqual(rs.bypass_actors, []);
  assert.deepEqual(
    rs.rules.map((r) => r.type),
    ["deletion", "non_fast_forward", "required_status_checks"]
  );
  assert.deepEqual(rs.rules[2].parameters.required_status_checks, [
    { context: "omni-queue/land", integration_id: 123 },
  ]);
  assert.equal(rs.rules[2].parameters.strict_required_status_checks_policy, false);
  assert.equal(rs.rules[2].parameters.do_not_enforce_on_create, false);
});

test("buildRuleset fills the branch, the name suffix, the status context and the App id", () => {
  const body = build({ statusContext: "omni-queue/land-x" });
  assert.equal(body.name, `${template.name}: ${BASE}`);
  assert.deepEqual(body.conditions.ref_name.include, [`refs/heads/${BASE}`]);
  assert.deepEqual(body.conditions.ref_name.exclude, []);
  assert.deepEqual(statusRule(body).parameters.required_status_checks, [
    { context: "omni-queue/land-x", integration_id: APP_ID },
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
  build();
  assert.equal(JSON.stringify(template), before);
});

test("buildRuleset without an App id leaves integration_id out (preview only)", () => {
  const body = build({ appId: null });
  assert.deepEqual(statusRule(body).parameters.required_status_checks, [
    { context: STATUS_CONTEXT },
  ]);
  assert.deepEqual(body.bypass_actors, []);
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
    assert.throws(() => build({ base }), /invalid base/, base);
  }
  for (const appId of [0, -1, 1.5, "123"]) {
    assert.throws(() => build({ appId }), /invalid app id/);
  }
  const noPlaceholder = structuredClone(template);
  noPlaceholder.conditions.ref_name.include = ["refs/heads/release/*"];
  assert.throws(() => build({}, noPlaceholder), /\{\{base\}\}/);
  assert.throws(() => build({ appId: 1 }, { ...template, rules: [] }), /rules/);
  assert.throws(
    () => buildRuleset(template, { appId: APP_ID, statusContext: STATUS_CONTEXT }),
    /invalid base/,
    "a template with the base placeholder needs a base"
  );
});

test("buildRuleset: the status context must be a valid context", () => {
  for (const statusContext of [undefined, null, "", "has space", "x".repeat(101), 7]) {
    assert.throws(() => build({ statusContext }), /status context/, String(statusContext));
  }
});

test("release ruleset: any other required check in the template is refused", () => {
  const withRule = (mutate) => {
    const tpl = structuredClone(template);
    mutate(statusRule(tpl).parameters, tpl);
    return tpl;
  };
  // a second check next to the land status
  assert.throws(
    () =>
      build(
        {},
        withRule((p) =>
          p.required_status_checks.push({ context: "Gate / CI", integration_id: null })
        )
      ),
    /exactly one/
  );
  // a different context
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.required_status_checks[0].context = "Gate / CI"))
      ),
    /omni-queue\/land/
  );
  // no check at all
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.required_status_checks = []))
      ),
    /exactly one/
  );
  // strict policy would make the candidate re-validate against a moving base
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.strict_required_status_checks_policy = true))
      ),
    /strict_required_status_checks_policy/
  );
  // both flags must be exactly false: enforcing nothing on creation would let a new branch in
  // without the land status, and a non-boolean must not pass the strict check
  for (const [flag, value] of [
    ["do_not_enforce_on_create", true],
    ["do_not_enforce_on_create", "false"],
    ["do_not_enforce_on_create", undefined],
    ["strict_required_status_checks_policy", "true"],
    ["strict_required_status_checks_policy", 1],
    ["strict_required_status_checks_policy", undefined],
  ]) {
    assert.throws(
      () =>
        build(
          {},
          withRule((p) => {
            if (value === undefined) delete p[flag];
            else p[flag] = value;
          })
        ),
      new RegExp(`${flag} must be false`),
      `${flag}: ${JSON.stringify(value)}`
    );
  }
  // the status rule without parameters
  assert.throws(
    () =>
      build(
        {},
        withRule((_p, tpl) => delete statusRule(tpl).parameters)
      ),
    /required_status_checks needs parameters/
  );
  // an unexpected parameter of the status rule
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.extra_selector = true))
      ),
    /required_status_checks has an unexpected key: extra_selector/
  );
  // a template that pins an App itself: the id comes from --app-id only
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.required_status_checks[0].integration_id = 42))
      ),
    /integration_id of the required status check is filled from --app-id/
  );
  // an unknown key on the check (a pinned app other than ours, an extra selector)
  assert.throws(
    () =>
      build(
        {},
        withRule((p) => (p.required_status_checks[0].extra = 1))
      ),
    /unexpected key/
  );
  // the other check-requiring rule types stay forbidden
  for (const type of CHECK_REQUIRING_RULE_TYPES.filter((t) => t !== "required_status_checks")) {
    assert.throws(
      () =>
        build(
          {},
          withRule((_p, tpl) => tpl.rules.push({ type, parameters: {} }))
        ),
      new RegExp(type),
      type
    );
  }
  // the status rule twice is a duplicate rule type
  assert.throws(
    () =>
      build(
        {},
        withRule((_p, tpl) => tpl.rules.push(structuredClone(statusRule(tpl))))
      ),
    /duplicate rule types: required_status_checks/
  );
});

test("queue-refs ruleset: only the App may create, update or delete", () => {
  const rs = buildRuleset(queueRefsTemplate(), { appId: APP_ID });
  assert.equal(rs.name, queueRefsTemplate().name, "fixed name, no branch suffix");
  assert.deepEqual(rs.conditions.ref_name.include, [
    "refs/heads/omni-queue-state",
    "refs/heads/omni-queue/**",
  ]);
  assert.deepEqual(rs.conditions.ref_name.exclude, []);
  assert.deepEqual(rs.rules.map((r) => r.type).sort(), [
    "creation",
    "deletion",
    "non_fast_forward",
    "update",
  ]);
  assert.deepEqual(rs.bypass_actors, [
    { actor_id: APP_ID, actor_type: "Integration", bypass_mode: "always" },
  ]);
  assert.equal(rs.enforcement, "active");
  assert.equal(rs._comment, undefined);
  assert.ok(!JSON.stringify(rs).includes("{{"));

  const preview = buildRuleset(queueRefsTemplate(), { appId: null });
  assert.deepEqual(preview.bypass_actors, [], "no App id: the slot is left out (preview)");
  assert.throws(
    () => buildRuleset(queueRefsTemplate(), { base: BASE, appId: APP_ID }),
    /\{\{base\}\}/,
    "a template without the placeholder takes no base"
  );
});

// ───────────────────────────── normalize / diff ─────────────────────────────

test("normalizeRuleset ignores server-only fields, ordering and off-by-default params", () => {
  const body = build();
  const server = asServer(body);
  server.rules = [...server.rules].reverse();
  const status = statusRule(server);
  status.parameters = {
    ...liveStatusParameters(),
    required_status_checks: [{ integration_id: APP_ID, context: STATUS_CONTEXT }],
    some_future_flag: false,
  };
  assert.deepEqual(normalizeRuleset(server), normalizeRuleset(body));
  assert.deepEqual(diffRulesets(server, body), []);

  // list ordering is also ignored inside a pull_request rule (kept: the same canonicalization)
  const legacy = withPullRequestRule(body);
  const legacyServer = asServer(legacy);
  const pr = legacyServer.rules.find((r) => r.type === "pull_request");
  pr.parameters = {
    ...pr.parameters,
    allowed_merge_methods: ["squash", "rebase", "merge"],
    required_reviewers: [],
    automatic_copilot_code_review_enabled: false,
  };
  assert.deepEqual(diffRulesets(legacyServer, legacy), []);
});

test("diffRulesets lists a creation, field changes, added/removed rules and actors", () => {
  const body = build();
  const created = diffRulesets(null, body);
  assert.ok(created.includes(`+ name: ${JSON.stringify(body.name)}`));
  assert.ok(created.includes("+ rule deletion"));
  assert.ok(created.includes("+ rule non_fast_forward"));
  assert.ok(
    created.includes(
      `+ rule required_status_checks ${JSON.stringify({
        required_status_checks: [{ context: STATUS_CONTEXT, integration_id: APP_ID }],
      })}`
    )
  );
  assert.ok(!created.some((l) => l.startsWith("+ bypass")), "no bypass actor is created");

  const drifted = asServer(body);
  drifted.enforcement = "evaluate";
  drifted.rules = drifted.rules
    .filter((r) => r.type !== "deletion")
    .concat([{ type: "pull_request", parameters: { required_approving_review_count: 1 } }]);
  statusRule(drifted).parameters = {
    ...liveStatusParameters(777),
    strict_required_status_checks_policy: true,
  };
  drifted.bypass_actors = [
    { actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "pull_request" },
    { actor_id: 777, actor_type: "Integration", bypass_mode: "always" },
  ];
  const diff = diffRulesets(drifted, body);
  assert.deepEqual(diff, [
    '~ enforcement: "evaluate" → "active"',
    "+ rule deletion",
    `~ rule required_status_checks.required_status_checks: [{"context":"${STATUS_CONTEXT}","integration_id":777}] → [{"context":"${STATUS_CONTEXT}","integration_id":${APP_ID}}]`,
    "~ rule required_status_checks.strict_required_status_checks_policy: true → (unset)",
    '- rule pull_request {"required_approving_review_count":1}',
    "- bypass Integration:777 (always)",
    "- bypass RepositoryRole:5 (pull_request)",
  ]);
});

test("diffRulesets reports a missing or drifted App bypass on the queue-refs ruleset", () => {
  const body = buildRuleset(queueRefsTemplate(), { appId: APP_ID });

  // creation lists the App bypass actor
  assert.ok(diffRulesets(null, body).includes(`+ bypass Integration:${APP_ID} (always)`));

  // a live ruleset without the App actor: the addition is reported (never a noop)
  const missing = asServer(body, 11);
  missing.bypass_actors = [];
  assert.deepEqual(diffRulesets(missing, body), [`+ bypass Integration:${APP_ID} (always)`]);

  // the App present only in pull_request mode: the mode change is reported
  const prOnly = asServer(body, 11);
  prOnly.bypass_actors = [
    { actor_id: APP_ID, actor_type: "Integration", bypass_mode: "pull_request" },
  ];
  assert.deepEqual(diffRulesets(prOnly, body), [
    `~ bypass Integration:${APP_ID}: pull_request → always`,
  ]);

  // a live ruleset identical to the desired one is still a noop
  assert.deepEqual(diffRulesets(asServer(body, 11), body), []);
});

// ───────────────────────────── applyRuleset ─────────────────────────────

test("applyRuleset creates the ruleset when no ruleset has its name", async () => {
  const desired = build();
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
  const desired = build();
  const drifted = asServer(desired, 42);
  // the old design's admin bypass is still on the live ruleset: applying removes it
  drifted.bypass_actors = [{ actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" }];
  const gh = fakeGh([drifted]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, {
    action: "update",
    id: 42,
    diff: ["- bypass RepositoryRole:5 (always)"],
  });
  const update = gh.calls.find(([m]) => m === "updateRuleset");
  assert.equal(update[1], 42);
  assert.deepEqual(update[2], desired);
  assert.deepEqual(writes(gh), ["updateRuleset"]);
});

test("applyRuleset is a noop when the live ruleset already matches", async () => {
  const desired = build();
  const gh = fakeGh([asServer(desired, 42)]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, { action: "noop", id: 42, diff: [] });
  assert.deepEqual(writes(gh), []);
});

test("applyRuleset --dry-run reports create/update but never calls a write method", async () => {
  const desired = build();
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
  const desired = build();
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
  const desired = build();
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
  assert.deepEqual(created.bypass_actors, []);
  assert.deepEqual(statusRule(created).parameters.required_status_checks, [
    { context: STATUS_CONTEXT, integration_id: 4242 },
  ]);
  assert.deepEqual(io.lines.err, []);
});

test("main takes the status context and the landing actor from the queue config", async () => {
  const config = { landing: { mode: "merge-ff", actor: "app", statusContext: "omni-queue/other" } };
  const gh = fakeGh([]);
  const io = capture();
  const code = await main(
    ["--base", BASE, "--app-id", "7"],
    { GITHUB_REPOSITORY: "acme/sandbox" },
    { gh, config, ...io }
  );
  assert.equal(code, 0);
  const created = gh.calls.find(([m]) => m === "createRuleset")[1];
  assert.deepEqual(statusRule(created).parameters.required_status_checks, [
    { context: "omni-queue/other", integration_id: 7 },
  ]);
});

test("main --kind queue-refs applies the queue refs ruleset: no --base, App id required", async () => {
  const sandbox = { GITHUB_REPOSITORY: "acme/sandbox" };
  const gh = fakeGh([]);
  const io = capture();
  const code = await main(["--kind", "queue-refs", "--app-id", "4242"], sandbox, { gh, ...io });
  assert.equal(code, 0, io.lines.err.join("\n"));
  const created = gh.calls.find(([m]) => m === "createRuleset")[1];
  assert.equal(created.name, queueRefsTemplate().name);
  assert.deepEqual(created.conditions.ref_name.include, [
    "refs/heads/omni-queue-state",
    "refs/heads/omni-queue/**",
  ]);
  assert.deepEqual(created.bypass_actors, [
    { actor_id: 4242, actor_type: "Integration", bypass_mode: "always" },
  ]);
  assert.ok(
    !gh.calls.some(([m, , path]) => m === "paginate" || /rules\/branches/.test(path ?? "")),
    "no landing-path read: there is no release branch to land on"
  );
  assert.deepEqual(io.lines.err, []);

  // a second run on the same live ruleset is a noop
  const again = fakeGh([asServer(created, 11)]);
  const io2 = capture();
  assert.equal(
    await main(["--kind", "queue-refs", "--app-id", "4242"], sandbox, { gh: again, ...io2 }),
    0
  );
  assert.deepEqual(writes(again), []);
  assert.match(io2.lines.out.join("\n"), /apply-ruleset: noop /);

  // dry-run without an App id previews without the bypass actor and says so
  const dry = capture();
  assert.equal(
    await main(["--kind", "queue-refs", "--dry-run"], sandbox, { gh: fakeGh([]), ...dry }),
    0
  );
  assert.match(dry.lines.err.join("\n"), /leaves out the omni-queue App bypass actor/);
});

test("main: --kind queue-refs takes no --base; release still requires it; unknown kind refused", async () => {
  const sandbox = { GITHUB_REPOSITORY: "acme/sandbox" };
  const silent = { out: () => {}, err: () => {} };
  const withBase = fakeGh([]);
  const io = capture();
  assert.equal(
    await main(["--kind", "queue-refs", "--base", BASE, "--app-id", "1"], sandbox, {
      gh: withBase,
      ...io,
    }),
    2
  );
  assert.match(io.lines.err.join("\n"), /queue-refs takes no --base/);
  assert.deepEqual(withBase.calls, []);

  const noBase = capture();
  assert.equal(
    await main(["--kind", "release", "--app-id", "1"], sandbox, { gh: fakeGh(), ...noBase }),
    2
  );
  assert.match(noBase.lines.err.join("\n"), /--base is required/);
  assert.equal(
    await main(["--kind", "bogus", "--app-id", "1"], sandbox, { gh: fakeGh(), ...silent }),
    2
  );
});

test("a real apply without --app-id is refused for both kinds", async () => {
  const sandbox = { GITHUB_REPOSITORY: "acme/sandbox" };
  for (const argv of [
    ["--base", BASE],
    ["--kind", "queue-refs"],
  ]) {
    const gh = fakeGh([]);
    const io = capture();
    assert.equal(await main(argv, sandbox, { gh, ...io }), 2, argv.join(" "));
    assert.match(io.lines.err.join("\n"), /needs --app-id/, argv.join(" "));
    assert.deepEqual(gh.calls, [], "refused before any API call");
  }
});

test("the production lock covers --kind queue-refs too", async () => {
  const gh = fakeGh([]);
  const io = capture();
  const code = await main(
    ["--kind", "queue-refs", "--repo", "cheaper-inference/OmniRoute", "--app-id", "1"],
    {},
    { gh, ...io }
  );
  assert.equal(code, 2);
  assert.deepEqual(gh.calls, []);
  assert.match(io.lines.err.join("\n"), /refusing to write a ruleset on cheaper-inference/);

  const live = fakeGh([]);
  assert.equal(
    await main(
      ["--kind", "queue-refs", "--repo", "cheaper-inference/OmniRoute", "--app-id", "1"],
      { OMNI_QUEUE_ALLOW_PRODUCTION_RULESET: "1" },
      { gh: live, out: () => {}, err: () => {} }
    ),
    0
  );
  assert.deepEqual(writes(live), ["createRuleset"]);
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
  assert.match(preview.lines.err.join("\n"), /leaves integration_id unpinned/);

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

test("noop against the real GET payload (every flag spelled out, check as echoed)", async () => {
  const desired = build();
  const echo = liveEcho(desired, 42);
  assert.deepEqual(diffRulesets(echo, desired), []);
  const gh = fakeGh([echo]);
  const result = await applyRuleset({ gh, base: BASE, desired, dryRun: false });
  assert.deepEqual(result, { action: "noop", id: 42, diff: [] });
  assert.deepEqual(writes(gh), [], "a second run must not PUT again");
});

test("a status check that drifted on the server is still drift (strict, context, app pin)", () => {
  const desired = build();
  const strictOn = liveEcho(desired);
  statusRule(strictOn).parameters.strict_required_status_checks_policy = true;
  assert.deepEqual(diffRulesets(strictOn, desired), [
    "~ rule required_status_checks.strict_required_status_checks_policy: true → (unset)",
  ]);

  const otherApp = liveEcho(desired);
  statusRule(otherApp).parameters = liveStatusParameters(777);
  const appDiff = diffRulesets(otherApp, desired);
  assert.equal(appDiff.length, 1);
  assert.match(appDiff[0], /^~ rule required_status_checks\.required_status_checks: .*777.* → /);

  const noPin = liveEcho(desired);
  statusRule(noPin).parameters.required_status_checks = [{ context: STATUS_CONTEXT }];
  assert.equal(diffRulesets(noPin, desired).length, 1, "an unpinned check is not the same check");
});

test("a pull_request flag or dismissal restriction that is really on is still drift", () => {
  // normalizeRuleset still canonicalizes every rule type, a legacy pull_request rule included
  const desired = withPullRequestRule(build());
  const flagOn = asServer(desired);
  flagOn.rules.find(
    (r) => r.type === "pull_request"
  ).parameters.require_extra_approval_for_unattributed_changes = true;
  assert.deepEqual(diffRulesets(flagOn, desired), [
    "~ rule pull_request.require_extra_approval_for_unattributed_changes: true → (unset)",
  ]);

  const restricted = asServer(desired);
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
  const desired = build();
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
  assert.throws(() => build({}, badTemplate), /duplicate rule types: deletion/);
  assert.throws(
    () =>
      diffRulesets(null, {
        ...desired,
        rules: [...desired.rules, { type: "required_status_checks" }],
      }),
    /duplicate rule types: required_status_checks/
  );
});

test("applyRuleset refuses a same-named repository ruleset with another target", async () => {
  const desired = build();
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
        m === "paginate" && verb === "GET" && path === `/repos/acme/sandbox/rules/branches/${BASE}`
    )
  );
  assert.ok(!gh.calls.some(([m, id]) => m === "getRuleset" && id === 15605329), "safe rules skip");
  assert.ok(LANDING_BLOCKING_RULE_TYPES.includes("pull_request"));
});

test("landing path, actor owner: a pull_request rule of another ruleset blocks unless admins bypass it", async () => {
  const check = async (bypass_actors, opts = {}) => {
    const foreign = { ...structuredClone(REQUIRE_PR_ON_DEFAULT), bypass_actors };
    const gh = fakeGh([foreign], { branchRules: branchRulesWithForeignPullRequest(42) });
    return checkLandingPath({
      gh,
      repo: "acme/sandbox",
      base: BASE,
      ownRulesetId: 42,
      appId: null, // the owner lands: the App id is not needed to tell
      actor: "owner",
      ...opts,
    });
  };
  const blocked = await check([]);
  assert.equal(blocked.blockers.length, 1, JSON.stringify(blocked));
  assert.match(
    blocked.blockers[0],
    /^rule pull_request from ruleset 21899981 \(Repository cheaper-inference\/OmniRoute\) on release\/v3\.8\.55: the repository owner is not an "always" bypass actor/
  );
  assert.deepEqual(blocked.warnings, []);

  const always = (actor_type, actor_id) => [{ actor_type, actor_id, bypass_mode: "always" }];
  assert.deepEqual(await check(always("RepositoryRole", 5)), { blockers: [], warnings: [] });
  assert.deepEqual(await check(always("OrganizationAdmin", 1)), { blockers: [], warnings: [] });
  // the App bypassing is irrelevant when the owner lands
  assert.equal((await check(always("Integration", APP_ID), { appId: APP_ID })).blockers.length, 1);
  // other roles, and bypass modes that do not cover a direct push
  assert.equal((await check(always("RepositoryRole", 4))).blockers.length, 1, "write role");
  assert.equal(
    (await check([{ actor_type: "RepositoryRole", actor_id: 5, bypass_mode: "pull_request" }]))
      .blockers.length,
    1,
    "a PR-only bypass misses the owner's direct push"
  );
  // the same ruleset, judged for the App: the admin role is not the App
  assert.equal(
    (await check(always("RepositoryRole", 5), { actor: "app", appId: APP_ID })).blockers.length,
    1
  );
  await assert.rejects(check([], { actor: "root" }), /invalid landing actor/);
});

test("landing path, actor owner: an unreadable bypass list blocks; own ruleset is skipped", async () => {
  const rules = [
    {
      type: "pull_request",
      ruleset_id: 555,
      ruleset_source_type: "Organization",
      ruleset_source: "acme",
    },
    // our own status rule must not block our own landing
    { type: "required_status_checks", ruleset_id: 42, ruleset_source_type: "Repository" },
  ];
  const gh = fakeGh([], { branchRules: rules });
  const report = await checkLandingPath({
    gh,
    repo: "acme/sandbox",
    base: BASE,
    ownRulesetId: 42,
    appId: null,
    actor: "owner",
  });
  assert.equal(report.blockers.length, 1);
  assert.match(report.blockers[0], /ruleset 555 \(Organization acme\).*not readable/);
});

test("checkLandingPath reads every page of the branch rules, not only the first 100", async () => {
  const safePage = Array.from({ length: 100 }, () => ({
    type: "deletion",
    ruleset_id: 15605329,
    ruleset_source_type: "Repository",
    ruleset_source: "cheaper-inference/OmniRoute",
  }));
  const foreignPr = branchRulesWithForeignPullRequest(42).find(
    (r) => r.type === "pull_request" && r.ruleset_id !== 42
  );
  const gh = fakeGh([REQUIRE_PR_ON_DEFAULT], { branchRulePages: [safePage, [foreignPr]] });
  const report = await checkLandingPath({
    gh,
    repo: "acme/sandbox",
    base: BASE,
    ownRulesetId: 42,
    appId: APP_ID,
  });
  assert.equal(report.blockers.length, 1, JSON.stringify(report));
  assert.match(report.blockers[0], /^rule pull_request from ruleset 21899981 /);
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
  const config = { landing: { mode: "merge-ff", actor: "app", statusContext: STATUS_CONTEXT } };
  const code = await main(["--base", BASE, "--app-id", String(APP_ID)], sandbox, {
    gh,
    config,
    ...io,
  });
  assert.equal(code, 1);
  assert.deepEqual(writes(gh), ["createRuleset"], "our ruleset is still written");
  const errors = io.lines.err.join("\n");
  assert.match(
    errors,
    /error: landing push would be rejected: rule pull_request from ruleset 21899981/
  );
  // the hint says what the runbook says: the status door replaces the other ruleset
  assert.match(errors, /remove those rulesets \(the status door replaces them\)/);
  assert.doesNotMatch(errors, /bypass actor of those rulesets/);

  // the repository config lands as the owner: the blocker names the owner, the hint is the same
  const owned = fakeGh([REQUIRE_PR_ON_DEFAULT], {
    branchRules: branchRulesWithForeignPullRequest(999),
  });
  const ownedIo = capture();
  assert.equal(
    await main(["--base", BASE, "--app-id", String(APP_ID)], sandbox, { gh: owned, ...ownedIo }),
    1
  );
  const ownedErrors = ownedIo.lines.err.join("\n");
  assert.match(ownedErrors, /the repository owner is not an "always" bypass actor/);
  assert.match(ownedErrors, /remove those rulesets \(the status door replaces them\)/);
  assert.doesNotMatch(ownedErrors, /add the repository admin role/);
  assert.doesNotMatch(ownedErrors, /omni-queue App/);

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
