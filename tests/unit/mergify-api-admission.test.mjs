import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

const config = load(readFileSync(new URL("../../.mergify.yml", import.meta.url), "utf8"));
const apiCheck = "API Route Typecheck";
const requiredChecks = [
  "Merge integrity (changelog + generated skills)",
  "Gate / CI",
  "Gate / Quality",
];
const check = (name, conclusion = "success", app = "github-actions") => ({
  name,
  conclusion,
  app,
});
const anchors = () => requiredChecks.map((name) => check(name));

// Evaluate only the documented check-filter grammar used by this configuration.
// Unknown predicates fail the test instead of being assumed true. This is a
// configuration regression, not a claim to execute the hosted Mergify service.
// https://docs.mergify.com/configuration/conditions/
function matches(condition, checks) {
  if (typeof condition !== "string") {
    const keys = Object.keys(condition);
    assert.equal(keys.length, 1);
    const operator = keys[0];
    assert.ok(operator === "and" || operator === "or");
    const results = condition[operator].map((entry) => matches(entry, checks));
    return operator === "and" ? results.every(Boolean) : results.some(Boolean);
  }
  const filter = (attribute) => {
    if (attribute === "success") return checks.filter((item) => item.conclusion === "success");
    if (attribute === "pending") return checks.filter((item) => item.conclusion === "pending");
    assert.equal(attribute, "failure", `unmodeled check attribute: ${attribute}`);
    return checks.filter((item) =>
      ["failure", "error", "cancelled", "timed_out", "action_required"].includes(item.conclusion)
    );
  };
  const count = /^#check-(success|failure|pending)(>=|=)(\d+)$/.exec(condition);
  if (count) {
    const actual = filter(count[1]).length;
    const expected = Number(count[3]);
    return count[2] === ">=" ? actual >= expected : actual === expected;
  }
  const named = /^check-(success|failure)=(?:@([^/]+)\/)?(.+)$/.exec(condition);
  assert.ok(named, `unmodeled merge condition: ${condition}`);
  return filter(named[1]).some(
    (item) => item.name === named[3] && (!named[2] || item.app === named[2])
  );
}

function admits(rule, checks) {
  assert.ok(Array.isArray(rule.merge_conditions) && rule.merge_conditions.length > 0);
  return rule.merge_conditions.every((condition) => matches(condition, checks));
}

assert.ok(config.queue_rules.length > 0);
for (const rule of config.queue_rules) {
  test(`${rule.name}: current API success permits otherwise passing admission`, () => {
    assert.equal(admits(rule, [...anchors(), check(apiCheck)]), true);
  });

  test(`${rule.name}: missing, neutral, skipped or stale API evidence blocks admission`, () => {
    for (const conclusion of [null, "neutral", "skipped", "stale"]) {
      const checks = anchors();
      if (conclusion) checks.push(check(apiCheck, conclusion));
      assert.equal(admits(rule, checks), false, `API conclusion: ${conclusion ?? "missing"}`);
    }
  });

  test(`${rule.name}: another app cannot satisfy the API check by copying its name`, () => {
    assert.equal(admits(rule, [...anchors(), check(apiCheck, "success", "unrelated-app")]), false);
  });

  test(`${rule.name}: incomplete and unsuccessful API executions stay blocked`, () => {
    for (const conclusion of ["pending", "failure", "cancelled", "timed_out", "action_required"]) {
      assert.equal(admits(rule, [...anchors(), check(apiCheck, conclusion)]), false, conclusion);
    }
  });

  test(`${rule.name}: the existing advisory build exception cannot waive API evidence`, () => {
    assert.equal(admits(rule, [...anchors(), check("Build (advisory)", "failure")]), false);
  });

  test(`${rule.name}: existing advisory policy remains scoped after API success`, () => {
    const checks = [...anchors(), check(apiCheck)];
    assert.equal(admits(rule, [...checks, check("Build (advisory)", "failure")]), true);
    assert.equal(admits(rule, [...checks, check("Build", "failure")]), false);
  });
}
