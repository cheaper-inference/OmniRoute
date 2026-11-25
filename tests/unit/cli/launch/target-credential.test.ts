import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveTarget } from "../../../../bin/cli/launch/core/target.mjs";

type ErrLike = { code?: string; message?: string };

const noContext = { resolveContext: () => null };

test("credential precedence: option > --api-key-env > context > OMNIROUTE_API_KEY > none", () => {
  const env = { OMNIROUTE_API_KEY: " envkey ", MY_KEY: " mine " };
  const ctx = { resolveContext: () => ({ name: "c" }), credentialFor: () => "ctxkey" };
  assert.deepEqual(resolveTarget({ token: " tok " }, { env, ...ctx }).credential, {
    value: "tok",
    source: "option",
  });
  assert.deepEqual(resolveTarget({ apiKeyEnv: "MY_KEY" }, { env, ...ctx }).credential, {
    value: "mine",
    source: "env",
  });
  assert.deepEqual(resolveTarget({}, { env, ...ctx }).credential, {
    value: "ctxkey",
    source: "context",
  });
  assert.deepEqual(resolveTarget({}, { env, ...noContext }).credential, {
    value: "envkey",
    source: "env",
  });
  assert.deepEqual(resolveTarget({}, { env: {}, ...noContext }).credential, {
    value: undefined,
    source: "none",
  });
});

test("--api-key-env: invalid name and unset variable are usage errors", () => {
  assert.throws(
    () => resolveTarget({ apiKeyEnv: "1BAD" }, { env: {}, ...noContext }),
    (e: ErrLike) =>
      e.code === "UsageError" && e.message === "--api-key-env must be an env var name: 1BAD"
  );
  assert.throws(
    () => resolveTarget({ apiKeyEnv: " UNSET " }, { env: { UNSET: " " }, ...noContext }),
    (e: ErrLike) => e.code === "UsageError" && e.message === "--api-key-env UNSET is not set"
  );
});

test("context: resolver and credential errors are ignored; context resolves once", () => {
  let calls = 0;
  const t = resolveTarget(
    {},
    {
      env: { OMNIROUTE_CONTEXT: "work", OMNIROUTE_API_KEY: "k" },
      resolveContext: (name?: string) => {
        calls++;
        assert.equal(name, "work");
        return { baseUrl: "https://gw.example/v1/" };
      },
      credentialFor: () => {
        throw new Error("x");
      },
    }
  );
  assert.equal(calls, 1);
  assert.deepEqual(
    [t.kind, t.rootUrl, t.port, t.contextName],
    ["remote", "https://gw.example", undefined, "work"]
  );
  assert.deepEqual(t.credential, { value: "k", source: "env" });
  const broken = resolveTarget(
    {},
    {
      env: {},
      resolveContext: () => {
        throw new Error("broken");
      },
    }
  );
  assert.equal(broken.kind, "local");
  assert.equal(broken.credential.source, "none");
});

test("context with loopback or blank baseUrl stays local; --port skips the context URL", () => {
  const loop = { resolveContext: () => ({ baseUrl: "http://localhost:20128" }) };
  assert.equal(resolveTarget({}, { env: {}, ...loop }).kind, "local");
  const blank = { resolveContext: () => ({ baseUrl: " " }) };
  assert.equal(resolveTarget({}, { env: {}, ...blank }).kind, "local");
  const remote = {
    resolveContext: () => ({ baseUrl: "https://gw.example" }),
    credentialFor: (_ctx: object, url: string) => `for:${url}`,
  };
  const t = resolveTarget({ port: "5000" }, { env: {}, ...remote });
  assert.deepEqual([t.kind, t.port], ["local", 5000]);
  assert.deepEqual(t.credential, { value: "for:http://127.0.0.1:5000", source: "context" });
  assert.throws(
    () => resolveTarget({}, { env: {}, resolveContext: () => ({ baseUrl: "ftp://gw.example" }) }),
    (e: ErrLike) => e.code === "UsageError" && /context baseUrl/.test(e.message)
  );
  assert.equal(
    resolveTarget({ baseUrl: "http://10.0.0.2" }, { env: {}, ...noContext }).kind,
    "remote"
  );
});
