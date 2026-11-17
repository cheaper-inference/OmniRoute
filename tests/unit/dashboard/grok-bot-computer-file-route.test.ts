import test from "node:test";
import assert from "node:assert/strict";

const { computerFilePathAllowed } =
  await import("../../../src/app/api/providers/[id]/grok-bot/computer-file/route.ts");

test("a computer file path must stay inside a published root", () => {
  const roots = ["/home/houminxi", "/home/houminxi/terminals"];
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/probe.txt", roots), true);
  assert.equal(computerFilePathAllowed("/tmp/probe.txt", roots), false);
  // The client may decode escapes or treat a backslash as a separator, so a parent
  // segment hidden in either spelling must be refused before it ever gets there.
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/%2e%2e/secret", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/%2E%2E/secret", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals\\..\\..\\secret", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/..%5csecret", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/%zz", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/a%20b.txt", roots), true);
  assert.equal(computerFilePathAllowed("/home/houminxi-other/probe.txt", roots), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/../../etc/passwd", roots), false);
  assert.equal(computerFilePathAllowed("/etc/passwd", ["/etc/"]), true);
});

test("a parent segment is refused even when it normalises inside the root", () => {
  // A symlink named `link` makes `link/..` resolve elsewhere on the client, while
  // normalising the string reports a path that looks contained.
  assert.equal(computerFilePathAllowed("/home/houminxi/link/../outside/secret.txt", ["/home/houminxi"]), false);
  assert.equal(computerFilePathAllowed("/home/houminxi/../etc/passwd", ["/home/houminxi"]), false);
});

test("a path with a NUL byte is refused", () => {
  assert.equal(computerFilePathAllowed("/home/houminxi/terminals/a\u0000b.txt", ["/home/houminxi"]), false);
});
