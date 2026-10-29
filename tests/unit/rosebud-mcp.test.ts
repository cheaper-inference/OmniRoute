import test from "node:test";
import assert from "node:assert/strict";
import { rosebudTools } from "../../open-sse/mcp-server/tools/rosebudTools.ts";
import { rosebudArtifactType } from "../../open-sse/services/rosebud/artifact.ts";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("Rosebud tools are distinct, management-scoped and have no default credit cap", () => {
  assert.equal(new Set(rosebudTools.map((tool) => tool.name)).size, rosebudTools.length);
  for (const tool of rosebudTools) assert.deepEqual(tool.scopes, ["manage"]);
  for (const tool of rosebudTools.filter((tool) => tool.name.startsWith("rosebud_generate_"))) {
    const input = tool.inputSchema.parse({
      connectionId: "123e4567-e89b-42d3-a456-426614174000",
      model: "test",
      input: { prompt: "hello" },
    }) as Record<string, unknown>;
    assert.equal(input.maxCredits, undefined);
    assert.ok(input.category);
  }
});
test("process spawning routes are local-only", () => {
  for (const action of ["generate", "connect", "account", "publish", "update"])
    assert.equal(isLocalOnlyPath("/api/rosebud/" + action), true);
});
test("download validation rejects a file in the wrong modality", () => {
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(rosebudArtifactType(png, "image"), "image/png");
  assert.throws(() => rosebudArtifactType(png, "model_3d"), /invalid_artifact/);
  assert.throws(
    () => rosebudArtifactType(Buffer.from("not an asset"), "image"),
    /invalid_artifact/
  );
});
