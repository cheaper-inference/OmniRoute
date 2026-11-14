import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normalizeRootUrl,
  publicTarget,
  resolveTarget,
  isLoopbackUrl,
} from "../../../../bin/cli/launch/core/target.mjs";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };

const noContext = { resolveContext: () => null };

test("local default, PORT env, --port; root URL has no /v1", () => {
  assert.equal(resolveTarget({}, { env: {}, ...noContext }).rootUrl, "http://127.0.0.1:20128");
  assert.equal(resolveTarget({}, { env: { PORT: "3000" }, ...noContext }).port, 3000);
  const t = resolveTarget({ port: "4000" }, { env: {}, ...noContext });
  assert.equal(t.kind, "local");
  assert.equal(t.rootUrl, "http://127.0.0.1:4000");
  assert.throws(
    () => resolveTarget({ port: "abc" }, { env: {}, ...noContext }),
    (e: ErrLike) => e.code === "UsageError"
  );
  assert.equal(normalizeRootUrl("https://x.example/v1/"), "https://x.example");
});

test("--remote / --base-url win and are remote; bad URLs are usage errors", () => {
  const t = resolveTarget({ remote: "https://gw.example/v1" }, { env: {}, ...noContext });
  assert.deepEqual([t.kind, t.rootUrl, t.port], ["remote", "https://gw.example", undefined]);
  assert.equal(
    resolveTarget({ baseUrl: "http://10.0.0.2:20128" }, { env: {}, ...noContext }).kind,
    "remote"
  );
  assert.throws(
    () => resolveTarget({ remote: "ftp://x" }, { env: {}, ...noContext }),
    (e: ErrLike) => e.code === "UsageError"
  );
  assert.throws(
    () => resolveTarget({ remote: "https://u:p@x" }, { env: {}, ...noContext }),
    (e: ErrLike) => e.code === "UsageError"
  );
});

test("context: remote baseUrl becomes the target; credential only for its own origin", () => {
  const ctx = { baseUrl: "https://ctx.example", accessToken: "ctx-token" };
  const deps = { env: {}, resolveContext: (name: string) => (name === "work" ? ctx : null) };
  const t = resolveTarget({ context: "work" }, deps);
  assert.equal(t.rootUrl, "https://ctx.example");
  assert.deepEqual(t.credential, { value: "ctx-token", source: "context" });
  const other = resolveTarget({ context: "work", remote: "https://other.example" }, deps);
  assert.deepEqual(
    other.credential,
    { value: undefined, source: "none" },
    "token never sent to another origin"
  );
  const local = resolveTarget(
    {},
    {
      env: { OMNIROUTE_CONTEXT: "work" },
      resolveContext: () => ({ baseUrl: "http://localhost:20128" }),
    }
  );
  assert.equal(local.kind, "local");
});

test("credential precedence: option > --api-key-env > context > OMNIROUTE_API_KEY > none", () => {
  const env = { MY_KEY: "from-env-name", OMNIROUTE_API_KEY: "from-default-env" };
  assert.deepEqual(
    resolveTarget({ apiKey: "opt", apiKeyEnv: "MY_KEY" }, { env, ...noContext }).credential,
    { value: "opt", source: "option" }
  );
  assert.deepEqual(
    resolveTarget({ token: "tok" }, { env, ...noContext }).credential.source,
    "option"
  );
  assert.deepEqual(resolveTarget({ apiKeyEnv: "MY_KEY" }, { env, ...noContext }).credential, {
    value: "from-env-name",
    source: "env",
  });
  assert.throws(
    () => resolveTarget({ apiKeyEnv: "NOPE" }, { env, ...noContext }),
    (e: ErrLike) => e.code === "UsageError"
  );
  assert.throws(
    () => resolveTarget({ apiKeyEnv: "bad-name" }, { env, ...noContext }),
    (e: ErrLike) => e.code === "UsageError"
  );
  assert.deepEqual(resolveTarget({}, { env, ...noContext }).credential, {
    value: "from-default-env",
    source: "env",
  });
  assert.deepEqual(resolveTarget({}, { env: {}, ...noContext }).credential, {
    value: undefined,
    source: "none",
  });
});

test("publicTarget drops the secret; loopback detection", () => {
  const t = resolveTarget({ apiKey: "secret" }, { env: {}, ...noContext });
  assert.ok(!JSON.stringify(publicTarget(t)).includes("secret"));
  assert.equal(publicTarget(t).credentialSource, "option");
  assert.equal(isLoopbackUrl("http://[::1]:1"), true);
  assert.equal(isLoopbackUrl("http://example.com"), false);
});
