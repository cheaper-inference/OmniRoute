import test from "node:test";
import assert from "node:assert/strict";

import {
  OMP_ROLE_PREFIX,
  apiErrorText,
  buildOmpRolesPreview,
  buildOmpRolesRequest,
  ompRolesMatch,
} from "../../../src/app/(dashboard)/dashboard/cli-code/components/ompRolesCard.ts";
import { ompSettingsSchema } from "../../../src/shared/validation/schemas/cli.ts";

// The Oh My Pi card writes roles through /api/cli-tools/omp-settings (the #16523
// modelRoles API) instead of a second, text-rewriting route. These pin the
// request it sends and how it reads the response back.

test("request carries bare model ids and null for a cleared role", () => {
  const body = buildOmpRolesRequest("http://localhost:20128/v1", {
    default: "cc/claude-sonnet-5",
    tiny: "",
  });
  assert.deepEqual(body, {
    baseUrl: "http://localhost:20128/v1",
    roles: { default: "cc/claude-sonnet-5", tiny: null },
  });
  assert.ok(!JSON.stringify(body).includes(OMP_ROLE_PREFIX), "the route adds the prefix");
});

test("the request body passes the omp-settings schema", () => {
  const parsed = ompSettingsSchema.safeParse(
    buildOmpRolesRequest("http://localhost:20128", { plan: "cx/gpt-5.6", designer: "" })
  );
  assert.equal(parsed.success, true, JSON.stringify(parsed.error?.issues));
});

test("a role omp-settings does not know is rejected by the schema", () => {
  const parsed = ompSettingsSchema.safeParse({
    baseUrl: "http://localhost:20128",
    roles: { memory: "cc/claude-sonnet-5" },
  });
  assert.equal(parsed.success, false);
});

test("preview lists the pending role assignments", () => {
  assert.equal(
    buildOmpRolesPreview({ default: "cc/claude-sonnet-5", tiny: "" }),
    "modelRoles:\n  default: omniroute/cc/claude-sonnet-5\n  # tiny: (removed)\n"
  );
  assert.equal(buildOmpRolesPreview({}), "");
});

test("read-back verification compares the roles the route returns", () => {
  assert.equal(
    ompRolesMatch({ default: "cc/a", tiny: "" }, { default: "cc/a", plan: "cx/b" }),
    true
  );
  assert.equal(ompRolesMatch({ default: "cc/a" }, { default: "cc/b" }), false);
  assert.equal(ompRolesMatch({ tiny: "" }, { tiny: "cc/a" }), false);
});

test("error text reads both route error shapes", () => {
  assert.equal(apiErrorText({ error: "plain" }, "fallback"), "plain");
  assert.equal(
    apiErrorText({ error: { code: "config_unparseable", message: "refused" } }, "fallback"),
    "refused"
  );
  assert.equal(apiErrorText({}, "fallback"), "fallback");
});
