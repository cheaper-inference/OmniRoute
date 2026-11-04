/**
 * DOCKER_AMD64_RUNNER — moves docker-publish's amd64 leg off the .113 `omni-build` slot.
 *
 * On 2026-11-03 the amd64 leg took 90-165 min on omniroute-113-5 while the same Dockerfile built
 * arm64 in 20-45 min on the 16 GB / 4 vCPU hosted runner. `blacksmith` sends amd64 to
 * blacksmith-4vcpu-ubuntu-2404 (16 GB), `hosted` to ubuntu-24.04 (16 GB), and leaving the
 * variable unset keeps the previous routing. The expressions are evaluated here, not
 * string-matched, so each variable combination is checked for the runner it really picks.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflow = load(
  fs.readFileSync(path.join(repoRoot, ".github/workflows/docker-publish.yml"), "utf8")
) as {
  jobs: Record<
    string,
    {
      "runs-on": string;
      if?: string;
      concurrency?: { group: string; "cancel-in-progress": string };
    }
  >;
};

type Value = string | boolean | string[] | null;
type Context = Record<string, Value>;

// Minimal evaluator for the GitHub expression subset these fields use: string literals,
// dotted context names, ==, !=, &&, ||, parentheses, fromJSON() and format().
function evaluate(source: string, context: Context): Value {
  const body = source
    .trim()
    .replace(/^\$\{\{/, "")
    .replace(/\}\}$/, "");
  const tokens = body.match(/'(?:[^']|'')*'|&&|\|\||==|!=|[(),]|[A-Za-z_][\w.-]*/g) ?? [];
  let index = 0;
  const peek = () => tokens[index];
  const next = () => tokens[index++];
  const truthy = (value: Value) => value !== "" && value !== null && value !== false;

  function primary(): Value {
    const token = next();
    if (token === "(") {
      const value = or();
      assert.equal(next(), ")");
      return value;
    }
    if (token.startsWith("'")) return token.slice(1, -1).replace(/''/g, "'");
    if (peek() === "(") {
      next();
      const args: Value[] = [];
      while (peek() !== ")") {
        args.push(or());
        if (peek() === ",") next();
      }
      next();
      if (token === "fromJSON") return JSON.parse(String(args[0]));
      if (token === "format") {
        return String(args[0]).replace(/\{(\d+)\}/g, (_, n) => String(args[Number(n) + 1]));
      }
      throw new Error(`unsupported function ${token}`);
    }
    if (token === "true" || token === "false") return token === "true";
    return context[token] ?? "";
  }
  function comparison(): Value {
    const left = primary();
    if (peek() === "==" || peek() === "!=") {
      const operator = next();
      const equal = String(left) === String(primary());
      return operator === "==" ? equal : !equal;
    }
    return left;
  }
  function and(): Value {
    let value = comparison();
    while (peek() === "&&") {
      next();
      const right = comparison();
      value = truthy(value) ? right : value;
    }
    return value;
  }
  function or(): Value {
    let value = and();
    while (peek() === "||") {
      next();
      const right = and();
      value = truthy(value) ? value : right;
    }
    return value;
  }
  const result = or();
  assert.equal(index, tokens.length, `unparsed tail in ${source}`);
  return result;
}

const VPS_ON = { "vars.USE_VPS_RUNNER": "true", "vars.USE_VPS_BUILD_RUNNER": "true" };
const BLACKSMITH = { "vars.DOCKER_AMD64_RUNNER": "blacksmith" };
const build = workflow.jobs.build;
const ctx = (arch: string, vars: Context): Context => ({
  "matrix.arch": arch,
  "github.ref": "refs/heads/release/v3.8.53",
  ...vars,
});

test("amd64 runner per DOCKER_AMD64_RUNNER value", () => {
  const cases: Array<[Context, Value]> = [
    [VPS_ON, ["self-hosted", "omni-build", "omni-build-60gb"]],
    [{}, "ubuntu-24.04"],
    [
      { ...VPS_ON, ...BLACKSMITH, "needs.prepare.outputs.blacksmith": "true" },
      "blacksmith-4vcpu-ubuntu-2404",
    ],
    [{ ...BLACKSMITH, "needs.prepare.outputs.blacksmith": "true" }, "blacksmith-4vcpu-ubuntu-2404"],
    // Monthly Blacksmith budget spent: hosted, never the .113 slot (its preflight is skipped).
    [{ ...VPS_ON, ...BLACKSMITH, "needs.prepare.outputs.blacksmith": "false" }, "ubuntu-24.04"],
    [{ ...VPS_ON, "vars.DOCKER_AMD64_RUNNER": "hosted" }, "ubuntu-24.04"],
  ];
  for (const [vars, expected] of cases) {
    assert.deepEqual(
      evaluate(build["runs-on"], ctx("amd64", vars)),
      expected,
      JSON.stringify(vars)
    );
  }
});

test("arm64 stays on the hosted ARM runner whatever the selector says", () => {
  for (const runner of ["", "blacksmith", "hosted"]) {
    const vars = { ...VPS_ON, "vars.DOCKER_AMD64_RUNNER": runner };
    assert.equal(evaluate(build["runs-on"], ctx("arm64", vars)), "ubuntu-24.04-arm");
  }
});

test("only an amd64 leg on the .113 slot shares heavy-build-main", () => {
  const group = build.concurrency!.group;
  assert.equal(evaluate(group, ctx("amd64", VPS_ON)), "heavy-build-main");
  for (const runner of ["blacksmith", "hosted"]) {
    assert.equal(
      evaluate(group, ctx("amd64", { ...VPS_ON, "vars.DOCKER_AMD64_RUNNER": runner })),
      "docker-publish-amd64-refs/heads/release/v3.8.53"
    );
  }
  assert.equal(
    evaluate(group, ctx("arm64", VPS_ON)),
    "docker-publish-arm-refs/heads/release/v3.8.53"
  );
});

test("the omni-build preflight is skipped once amd64 leaves the slot", () => {
  const condition = workflow.jobs["runner-preflight"].if!;
  const base: Context = {
    "github.event_name": "push",
    "needs.prepare.outputs.skip": "false",
    "github.repository": "cheaper-inference/OmniRoute",
    ...VPS_ON,
  };
  assert.equal(evaluate(condition, base), true);
  for (const runner of ["blacksmith", "hosted"]) {
    assert.equal(evaluate(condition, { ...base, "vars.DOCKER_AMD64_RUNNER": runner }), false);
  }
});

test("prepare follows the selector; merge follows prepare's budget verdict", () => {
  // 2026-11-03: `prepare` waited 3 h for a hosted ubuntu-latest slot behind ~300 queued PR runs
  // while the amd64 build itself was already routed to Blacksmith.
  const prepare = workflow.jobs.prepare["runs-on"];
  assert.equal(evaluate(prepare, BLACKSMITH), "blacksmith-2vcpu-ubuntu-2404");
  assert.equal(evaluate(prepare, { "vars.DOCKER_AMD64_RUNNER": "hosted" }), "ubuntu-latest");
  assert.equal(evaluate(prepare, {}), "ubuntu-latest");

  const merge = workflow.jobs.merge["runs-on"];
  assert.equal(
    evaluate(merge, { ...BLACKSMITH, "needs.prepare.outputs.blacksmith": "true" }),
    "blacksmith-2vcpu-ubuntu-2404"
  );
  assert.equal(
    evaluate(merge, { ...BLACKSMITH, "needs.prepare.outputs.blacksmith": "false" }),
    "ubuntu-latest"
  );
  assert.equal(evaluate(merge, {}), "ubuntu-latest");
});

test("runner offline alert follows the selected self-hosted amd64 leg", () => {
  const condition = workflow.jobs["runner-alert"].if!;
  const context = (event: string, overrides: Context = {}): Context => ({
    "github.event_name": event,
    "github.repository": "cheaper-inference/OmniRoute",
    ...VPS_ON,
    ...overrides,
  });

  for (const event of ["schedule", "workflow_dispatch"]) {
    assert.equal(evaluate(condition, context(event)), true);
    assert.equal(
      evaluate(condition, context(event, { "vars.DOCKER_AMD64_RUNNER": "custom" })),
      true,
      "an unrecognized selector preserves the self-hosted fallback"
    );
    for (const runner of ["blacksmith", "hosted"]) {
      assert.equal(
        evaluate(condition, context(event, { "vars.DOCKER_AMD64_RUNNER": runner })),
        false,
        `${event}: ${runner} does not depend on the omni-build slot`
      );
    }
    for (const disabled of [
      { "vars.USE_VPS_RUNNER": "false" },
      { "vars.USE_VPS_BUILD_RUNNER": "false" },
      { "vars.USE_VPS_RUNNER": "false", "vars.USE_VPS_BUILD_RUNNER": "false" },
    ]) {
      assert.equal(evaluate(condition, context(event, disabled)), false);
    }
  }
  for (const event of ["push", "release"]) {
    assert.equal(evaluate(condition, context(event)), false);
  }
  assert.equal(
    evaluate(condition, context("schedule", { "github.repository": "example/fork" })),
    false
  );
  assert.equal(
    evaluate(condition, context("workflow_dispatch", { "github.repository": "example/fork" })),
    true,
    "the existing manual-dispatch behavior on forks is preserved"
  );
});
