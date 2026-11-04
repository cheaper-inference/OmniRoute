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

  it("returns null when the pinned connection is gone or has no label", () => {
    assert.equal(findComboStepConnectionLabel(CONNECTIONS, "deadbeef-cccc"), null);
    assert.equal(findComboStepConnectionLabel([{ id: "33333333-cccc" }], "33333333-cccc"), null);
    assert.equal(findComboStepConnectionLabel(undefined, "11111111-aaaa"), null);
  });
});
