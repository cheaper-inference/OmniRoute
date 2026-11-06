// tests/unit/combo-step-account-state.test.ts
//
// A combo step shows which account it will use. Three states matter and only
// two were distinguishable before: pinned to a live account, pinned to an
// account that no longer exists (its connection was deleted), and unpinned
// (the strategy picks any account of the provider).
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  findComboStepConnectionLabel,
  formatComboStepAccountLabel,
  listLiveConnectionIds,
  resolveComboStepAccountState,
  resolveLiveConnectionIds,
} from "@/lib/combos/stepAccountState";

const LIVE = ["11111111-aaaa", "22222222-bbbb"];

describe("resolveComboStepAccountState", () => {
  it("reports dynamic when the step pins nothing", () => {
    assert.equal(resolveComboStepAccountState({}, LIVE), "dynamic");
  });

  it("reports pinned when the account still exists", () => {
    assert.equal(resolveComboStepAccountState({ connectionId: "11111111-aaaa" }, LIVE), "pinned");
  });

  it("reports pinned for a fingerprint-expanded connection id of a live row", () => {
    assert.equal(
      resolveComboStepAccountState({ connectionId: "11111111-aaaa|fp|abc" }, LIVE),
      "pinned"
    );
  });

  it("does not let a sibling fingerprint keep a removed fingerprint pin alive", () => {
    const expanded = ["11111111-aaaa|fp|one", "11111111-aaaa|fp|two"];
    assert.equal(
      resolveComboStepAccountState({ connectionId: "11111111-aaaa|fp|two" }, expanded),
      "pinned"
    );
    assert.equal(
      resolveComboStepAccountState({ connectionId: "11111111-aaaa|fp|gone" }, expanded),
      "deleted"
    );
  });

  it("reports pinned for a row pin whose row now lists fingerprints", () => {
    assert.equal(
      resolveComboStepAccountState({ connectionId: "11111111-aaaa" }, [
        "11111111-aaaa|fp|one",
        "11111111-aaaa|fp|two",
      ]),
      "pinned"
    );
  });

  it("reports unroutable when the scope names only removed fingerprints of a live row", () => {
    assert.equal(
      resolveComboStepAccountState({ allowedConnectionIds: ["11111111-aaaa|fp|gone"] }, [
        "11111111-aaaa|fp|one",
      ]),
      "unroutable"
    );
  });

  it("reports deleted when the pinned account is gone", () => {
    assert.equal(resolveComboStepAccountState({ connectionId: "deadbeef-cccc" }, LIVE), "deleted");
  });

  it("does not claim an account is deleted while the connection list is unknown", () => {
    assert.equal(resolveComboStepAccountState({ connectionId: "deadbeef-cccc" }, null), "pinned");
  });

  it("stays dynamic for a scoped step whose allowlist still has a live account", () => {
    assert.equal(
      resolveComboStepAccountState(
        { allowedConnectionIds: ["deadbeef-cccc", "11111111-aaaa"] },
        LIVE
      ),
      "dynamic"
    );
  });

  it("reports unroutable for a scoped step whose whole allowlist is gone", () => {
    assert.equal(
      resolveComboStepAccountState({ allowedConnectionIds: ["deadbeef-cccc"] }, LIVE),
      "unroutable"
    );
  });

  it("stays dynamic when the allowlist is present but empty", () => {
    assert.equal(resolveComboStepAccountState({ allowedConnectionIds: [] }, LIVE), "dynamic");
  });

  it("prefers the pinned account over the allowlist", () => {
    assert.equal(
      resolveComboStepAccountState(
        { connectionId: "11111111-aaaa", allowedConnectionIds: ["deadbeef-cccc"] },
        LIVE
      ),
      "pinned"
    );
  });
});

describe("formatComboStepAccountLabel", () => {
  it("uses the account label when there is one", () => {
    assert.equal(
      formatComboStepAccountLabel("pinned", {
        connectionId: "11111111-aaaa",
        connectionLabel: "me@x",
      }),
      "me@x"
    );
  });

  it("falls back to the short account id", () => {
    assert.equal(
      formatComboStepAccountLabel("pinned", {
        connectionId: "11111111-aaaa",
        connectionLabel: null,
      }),
      "acct 11111111"
    );
  });

  it("names a deleted account and never pretends it is dynamic", () => {
    assert.equal(
      formatComboStepAccountLabel("deleted", {
        connectionId: "deadbeef-cccc",
        connectionLabel: "gone@x",
      }),
      "deleted account (deadbeef)"
    );
  });

  it("says a scoped step has no available account", () => {
    assert.equal(formatComboStepAccountLabel("unroutable", {}), "no available account");
  });

  it("keeps the dynamic wording for unpinned steps", () => {
    assert.equal(formatComboStepAccountLabel("dynamic", {}), "dynamic account");
  });
});

describe("listLiveConnectionIds", () => {
  it("returns null when the builder payload has no connection list", () => {
    assert.equal(listLiveConnectionIds(undefined), null);
  });

  it("returns an empty list when the provider has no connections left", () => {
    assert.deepEqual(listLiveConnectionIds([]), []);
  });

  it("keeps string ids and drops malformed entries", () => {
    assert.deepEqual(
      listLiveConnectionIds([
        { id: "11111111-aaaa" },
        null,
        "oops",
        { id: 42 },
        { id: "22222222-bbbb" },
      ]),
      ["11111111-aaaa", "22222222-bbbb"]
    );
  });
});

describe("resolveLiveConnectionIds", () => {
  it("stays unknown until the builder payload has providers", () => {
    assert.equal(
      resolveLiveConnectionIds({ providersLoaded: false, providerConnections: undefined }),
      null
    );
    assert.equal(
      resolveLiveConnectionIds({ providersLoaded: false, providerConnections: [] }),
      null
    );
  });

  it("returns the provider's ids once the payload has loaded", () => {
    assert.deepEqual(
      resolveLiveConnectionIds({
        providersLoaded: true,
        providerConnections: [{ id: "11111111-aaaa" }, { id: "22222222-bbbb" }],
      }),
      ["11111111-aaaa", "22222222-bbbb"]
    );
  });

  it("reports a loaded provider without connections as an empty list, not as unknown", () => {
    assert.deepEqual(
      resolveLiveConnectionIds({ providersLoaded: true, providerConnections: [] }),
      []
    );
  });

  it("reports a provider missing from a loaded payload as having no connections", () => {
    assert.deepEqual(
      resolveLiveConnectionIds({ providersLoaded: true, providerConnections: undefined }),
      []
    );
  });
});

describe("findComboStepConnectionLabel", () => {
  const CONNECTIONS = [
    { id: "11111111-aaaa", label: "me@x" },
    { id: "22222222-bbbb|fp|fpx", label: "fp@x" },
  ];

  it("returns the label of the pinned connection", () => {
    assert.equal(findComboStepConnectionLabel(CONNECTIONS, "11111111-aaaa"), "me@x");
  });

  it("matches a fingerprint pin against the row it came from", () => {
    assert.equal(findComboStepConnectionLabel(CONNECTIONS, "11111111-aaaa|fp|other"), "me@x");
    assert.equal(findComboStepConnectionLabel(CONNECTIONS, "22222222-bbbb|fp|fpx"), "fp@x");
  });

  it("labels each fingerprint of one row with its own account", () => {
    const siblings = [
      { id: "11111111-aaaa|fp|one", label: "Account 1" },
      { id: "11111111-aaaa|fp|two", label: "Account 2" },
      { id: "11111111-aaaa|fp|three", label: "Account 3" },
    ];
    assert.equal(findComboStepConnectionLabel(siblings, "11111111-aaaa|fp|one"), "Account 1");
    assert.equal(findComboStepConnectionLabel(siblings, "11111111-aaaa|fp|two"), "Account 2");
    assert.equal(findComboStepConnectionLabel(siblings, "11111111-aaaa|fp|three"), "Account 3");
  });

  it("gives a removed fingerprint no label from its siblings", () => {
    const siblings = [
      { id: "11111111-aaaa|fp|one", label: "Account 1" },
      { id: "11111111-aaaa|fp|two", label: "Account 2" },
    ];
    assert.equal(findComboStepConnectionLabel(siblings, "11111111-aaaa|fp|gone"), null);
  });

  it("does not name one fingerprint for a row pin that covers several", () => {
    const siblings = [
      { id: "11111111-aaaa|fp|one", label: "Account 1" },
      { id: "11111111-aaaa|fp|two", label: "Account 2" },
    ];
    assert.equal(findComboStepConnectionLabel(siblings, "11111111-aaaa"), null);
    assert.equal(findComboStepConnectionLabel(siblings.slice(0, 1), "11111111-aaaa"), "Account 1");
  });

  it("returns null when the pinned connection is gone or has no label", () => {
    assert.equal(findComboStepConnectionLabel(CONNECTIONS, "deadbeef-cccc"), null);
    assert.equal(findComboStepConnectionLabel([{ id: "33333333-cccc" }], "33333333-cccc"), null);
    assert.equal(findComboStepConnectionLabel(undefined, "11111111-aaaa"), null);
  });
});
