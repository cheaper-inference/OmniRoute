/**
 * OMNIROUTE_EXECUTION_EXPIRATION_MS — opt-in scaling of the execution
 * deadline for large non-streaming generations.
 *
 * A non-streaming request that legitimately asks for tens of thousands of
 * output tokens can still be mid-decode when the base execution deadline
 * fires — the client gets a hard 504 while the upstream was healthy and
 * working (observed with max_tokens=32768 non-stream vision requests killed
 * at exactly the base deadline, repeatedly). With the env set to "auto" the
 * deadline scales by max_tokens at a conservative ~20ms/token decode floor
 * (50 tok/s), clamped to [base, 15 min]. Unset (the default) must be a
 * byte-for-byte no-op: the base deadline is returned unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { computeNonStreamExecutionExpirationMs } = await import(
  "../../open-sse/services/rateLimitManager.ts"
);

test("unset env (default) keeps the base deadline unchanged", () => {
  assert.equal(computeNonStreamExecutionExpirationMs(120_000, 32_768, {}), 120_000);
  assert.equal(computeNonStreamExecutionExpirationMs(120_000, 0, {}), 120_000);
});

test("auto: large max_tokens scales the deadline past the base", () => {
  const ms = computeNonStreamExecutionExpirationMs(120_000, 32_768, {
    OMNIROUTE_EXECUTION_EXPIRATION_MS: "auto",
  });
  assert.equal(ms, 32_768 * 20, "32768 tok at the 20ms/token decode floor");
});

test("auto: small max_tokens keeps the base deadline (floor semantics)", () => {
  assert.equal(
    computeNonStreamExecutionExpirationMs(120_000, 1024, {
      OMNIROUTE_EXECUTION_EXPIRATION_MS: "auto",
    }),
    120_000
  );
});

test("auto: deadline is capped at 15 minutes", () => {
  const ms = computeNonStreamExecutionExpirationMs(120_000, 1_000_000, {
    OMNIROUTE_EXECUTION_EXPIRATION_MS: "auto",
  });
  assert.equal(ms, 900_000);
});

test("auto: maxTokens=0/undefined keeps the base deadline", () => {
  for (const tokens of [0, undefined]) {
    assert.equal(
      computeNonStreamExecutionExpirationMs(120_000, tokens, {
        OMNIROUTE_EXECUTION_EXPIRATION_MS: "auto",
      }),
      120_000
    );
  }
});

test("numeric env is a fixed floor (ms)", () => {
  assert.equal(
    computeNonStreamExecutionExpirationMs(120_000, 32_768, {
      OMNIROUTE_EXECUTION_EXPIRATION_MS: "600000",
    }),
    600_000
  );
  assert.equal(
    computeNonStreamExecutionExpirationMs(120_000, 32_768, {
      OMNIROUTE_EXECUTION_EXPIRATION_MS: "0",
    }),
    0
  );
});

test("non-numeric (other than auto) and negative values are ignored", () => {
  for (const junk of ["junk", "-5", "1e999"]) {
    assert.equal(
      computeNonStreamExecutionExpirationMs(120_000, 32_768, {
        OMNIROUTE_EXECUTION_EXPIRATION_MS: junk,
      }),
      120_000
    );
  }
});
