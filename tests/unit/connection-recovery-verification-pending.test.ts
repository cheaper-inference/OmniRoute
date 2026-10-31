// The proactive recovery tick clears stale 'error' labels a minute after a failed test. An
// Antigravity account blocked by Google's 403 VALIDATION_REQUIRED is not stale noise: while
// its verification link is stored, the tick must leave the error in place, or every retest
// flips the account back to "connected" before the operator can act on it.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isRecoverableCooldownConnection,
  selectRecoverableConnections,
  toRecoverableConnectionInput,
} from "@/lib/quota/connectionRecovery";

const nowMs = 1_700_000_000_000;
const twoMinutesAgo = new Date(nowMs - 2 * 60 * 1000).toISOString();
const LINK = "https://accounts.google.com/v3/signin/continue?plt=AKgnsbtTEST";

describe("connectionRecovery — Google verification pending", () => {
  it("keeps a stale-looking 'error' label while verification is pending", () => {
    const conn = {
      id: "c1",
      testStatus: "error",
      lastErrorAt: twoMinutesAgo,
      verificationPending: true,
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
    assert.deepEqual(selectRecoverableConnections([conn], nowMs), []);
  });

  it("still recovers the same label once no verification is pending", () => {
    const conn = { id: "c2", testStatus: "error", lastErrorAt: twoMinutesAgo };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), true);
  });

  it("derives verificationPending from a stored Google verification link", () => {
    const base = { id: "c3", testStatus: "error", lastErrorAt: twoMinutesAgo };
    assert.equal(
      toRecoverableConnectionInput({ ...base, providerSpecificData: { verificationUrl: LINK } })
        .verificationPending,
      true
    );
    assert.equal(
      toRecoverableConnectionInput({ ...base, providerSpecificData: { projectId: "p" } })
        .verificationPending,
      false
    );
    assert.equal(
      toRecoverableConnectionInput({
        ...base,
        providerSpecificData: { verificationUrl: "https://example.com/x" },
      }).verificationPending,
      false
    );
  });
});
