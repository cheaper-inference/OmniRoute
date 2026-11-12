import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { matchGrokBotConnection } from "../../src/lib/oauth/services/persistGrokBotConnection.ts";

const rows = [
  { id: "row-1", email: "user@example.com", providerSpecificData: { accountId: "acct-1" } },
  { id: "row-2", email: null, providerSpecificData: { accountId: "acct-2" } },
];

describe("matchGrokBotConnection", () => {
  it("prefers the email match", () => {
    const match = matchGrokBotConnection(rows, "user@example.com", "acct-2");
    assert.equal(match?.id, "row-1");
  });

  it("matches the email case-insensitively", () => {
    const match = matchGrokBotConnection(rows, "USER@example.com", null);
    assert.equal(match?.id, "row-1");
  });

  it("falls back to the account id when the email is unknown", () => {
    const match = matchGrokBotConnection(rows, null, "acct-2");
    assert.equal(match?.id, "row-2");
  });

  it("returns null when nothing matches", () => {
    const match = matchGrokBotConnection(rows, "other@example.com", "acct-9");
    assert.equal(match, null);
  });

  it("returns null when both identifiers are missing", () => {
    const match = matchGrokBotConnection(rows, null, null);
    assert.equal(match, null);
  });
});
