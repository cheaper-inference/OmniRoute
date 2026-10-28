import test from "node:test";
import assert from "node:assert/strict";

const { computerFilePathAllowed } =
  await import("../../../src/app/api/providers/[id]/grok-bot/computer-file/route.ts");

test("a computer file path must stay inside a published root", () => {
  const roots = ["/home/houminxi", "/home/houminxi/terminals"];
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/probe.txt", roots), true);
  assert.equal(computerFilePathAllowed("/tmp/probe.txt", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi-other/probe.txt", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/../../etc/passwd", roots), false);
  assert.equal(computerFilePathAllowed("/etc/passwd", ["/etc/"]), true);
});
