import { spawnSync } from "node:child_process";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import {
  RECOUNT_CONTEXT,
  RECOUNT_KEYS,
  diffFacts,
  findStaleClaims,
  spellings,
} from "../../scripts/release/free-tier-recount.mjs";

const CLI = fileURLToPath(new URL("../../scripts/release/free-tier-recount.mjs", import.meta.url));
const freeOfferChange = [{ key: "code.hasFreeProviders", before: 160, after: 144 }];

describe("diffFacts", () => {
  it("reports only changed recount keys in recount order", () => {
    assert.deepEqual(
      diffFacts(
        { code: { freeModels: 321, hasFreeProviders: 160, migrations: 250 }, providers: 394 },
        { code: { freeModels: 321, hasFreeProviders: 144, migrations: 252 }, providers: 395 }
      ),
      [{ key: "providers", before: 394, after: 395 }, ...freeOfferChange]
    );
  });

  it("skips keys missing from both snapshots and reports a number-to-object change once", () => {
    const audio = { providers: 9, unit: "native", quota: { characters: 1 } };
    assert.deepEqual(
      diffFacts({ code: { freeAudioProviders: 1 } }, { code: { freeAudioProviders: audio } }),
      [{ key: "code.freeAudioProviders", before: 1, after: audio }]
    );
  });

  it("compares nested objects independent of key order", () => {
    const before = { providers: 3, byKind: { audio: { providers: 2, quota: 7 }, video: 1 } };
    const after = { byKind: { video: 1, audio: { quota: 7, providers: 2 } }, providers: 3 };
    assert.deepEqual(
      diffFacts({ code: { freeMediaProviders: before } }, { code: { freeMediaProviders: after } }),
      []
    );
  });

  it("reports keys introduced or removed by a snapshot", () => {
    assert.deepEqual(
      diffFacts({ code: { freeSearchProviders: 4 } }, { code: { freeFetchProviders: 2 } }),
      [
        { key: "code.freeSearchProviders", before: 4, after: undefined },
        { key: "code.freeFetchProviders", before: undefined, after: 2 },
      ]
    );
  });
});

describe("spellings", () => {
  it("includes the number and both rounded forms", () => {
    assert.deepEqual(spellings("code.hasFreeProviders", 160), ["160", "160+", "150+"]);
    assert.deepEqual(spellings("code.hasFreeProviders", 54), ["54", "50+"]);
  });

  it("keeps labels literal and skips objects and missing values", () => {
    assert.deepEqual(spellings("code.headlineSteadyLabel", "~1.62B"), ["~1.62B"]);
    assert.deepEqual(spellings("code.freeMediaProviders", { providers: 3 }), []);
    assert.deepEqual(spellings("code.freeFetchProviders", undefined), []);
  });
});

describe("findStaleClaims", () => {
  it("reports a rounded old count once per line and key", () => {
    const text = "150+ with a free offer and 160 marked free";
    assert.deepEqual(
      findStaleClaims({
        changes: freeOfferChange,
        files: [{ path: "README.md", content: `\n  ${text}  \n` }],
      }),
      [{ path: "README.md", line: 2, key: "code.hasFreeProviders", text }]
    );
  });

  it("requires same-line context and skips embedded numbers and versions", () => {
    const content = [
      "with a free offer",
      '<img width="160">',
      "v3.8.150 with a free offer",
      "v3.8.160 with a free offer",
      "1500 with a free offer",
      "1600 with a free offer",
      "160.5 with a free offer",
      "x160 with a free offer",
      "160é with a free offer",
    ].join("\n");
    assert.deepEqual(
      findStaleClaims({ changes: freeOfferChange, files: [{ path: "README.md", content }] }),
      []
    );
  });

  it("reports a legacy spelling even when snapshots agree", () => {
    const text = "155 catalog entries marked free/no-auth";
    assert.deepEqual(
      findStaleClaims({ changes: [], files: [{ path: "README.md", content: text }] }),
      [{ path: "README.md", line: 1, key: "code.hasFreeProviders", text }]
    );
  });

  it("does not scan an unchanged count outside the legacy spellings", () => {
    const facts = { code: { hasFreeProviders: 144 } };
    const files = [{ path: "README.md", content: "144 with a free offer" }];
    assert.deepEqual(findStaleClaims({ changes: diffFacts(facts, facts), files }), []);
  });

  it("matches a token label literally", () => {
    const changes = [{ key: "code.headlineSteadyLabel", before: "~1.62B", after: "~90M" }];
    const text = "~1.62B free tokens";
    const files = [{ path: "README.md", content: `~1x62B free tokens\n${text}` }];
    assert.deepEqual(findStaleClaims({ changes, files }), [
      { path: "README.md", line: 2, key: "code.headlineSteadyLabel", text },
    ]);
  });

  it("has a context expression for every recount key", () => {
    for (const key of RECOUNT_KEYS) {
      assert.ok(RECOUNT_CONTEXT[key] instanceof RegExp, key);
    }
  });
});

describe("recount CLI", () => {
  it("exits with status 2 and identifies an unreadable before snapshot", () => {
    const ref = "refs/heads/does-not-exist-zz";
    const result = spawnSync(process.execPath, [CLI, `--before=${ref}`], { encoding: "utf8" });
    assert.equal(result.status, 2);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /--before.*refs\/heads\/does-not-exist-zz/);
  });

  it("rejects missing options or unexpected arguments as usage errors", () => {
    for (const args of [[], ["--before=HEAD", "--unknown"], ["--before=HEAD", "--after="]]) {
      const result = spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8" });
      assert.equal(result.status, 2);
      assert.equal(result.stdout, "");
      assert.match(result.stderr, /Usage:/);
    }
  });
});
