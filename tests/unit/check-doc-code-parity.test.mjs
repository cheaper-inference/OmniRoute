import test from "node:test";
import assert from "node:assert/strict";
import { verdicts_alignes } from "../../scripts/check/check-doc-code-parity.mjs";

test("verdicts_alignes - nominal: both verdicts are read from CODE", () => {
  const code = "preview -> rate_limit; failover -> quota_exhausted";
  const changelog = "verdicts now agree"; // a lie: must NOT be the source
  assert.equal(verdicts_alignes({ code, changelog }), true);
});
test("verdicts_alignes - limit: a single verdict -> REJECTED", () => {
  assert.equal(
    verdicts_alignes({ code: "preview -> rate_limit", changelog: "verdicts now agree" }),
    false
  );
});
