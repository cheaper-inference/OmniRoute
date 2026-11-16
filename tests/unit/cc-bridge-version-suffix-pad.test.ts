import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const { computeExMachinaVersionSuffix, CCH_SALT } =
  await import("../../open-sse/services/ccBridgeTransforms.ts");
const { computeFingerprint } = await import("../../open-sse/services/claudeCodeFingerprint.ts");

const VERSION = "2.1.280";
const sha3 = (input: string) =>
  createHash("sha256").update(input, "utf8").digest("hex").slice(0, 3);

test("ex-machina cc_version suffix pads missing positions with the character 0", () => {
  // Claude Code samples UTF-16 units 4, 7 and 20 and uses "0" where the text is shorter.
  assert.equal(computeExMachinaVersionSuffix("hi", VERSION), sha3(`${CCH_SALT}000${VERSION}`));
  assert.equal(computeExMachinaVersionSuffix("", VERSION), sha3(`${CCH_SALT}000${VERSION}`));
  assert.equal(
    computeExMachinaVersionSuffix("abcdefgh", VERSION),
    sha3(`${CCH_SALT}eh0${VERSION}`)
  );
});

test("both suffix helpers agree on short first-user text", () => {
  for (const text of ["", "hi", "12345678", "a".repeat(20)]) {
    assert.equal(computeExMachinaVersionSuffix(text, VERSION), computeFingerprint(text, VERSION));
  }
});
