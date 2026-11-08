import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, stat, rm, mkdir, symlink } from "node:fs/promises";
import { createDecipheriv, createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  nativeAccountFromCredentials,
  NativeZcodeHostManager,
  prepareNativeAccountState,
  resolveNativeRuntime,
} from "../../open-sse/executors/zcode/nativeHostManager.ts";

test("runtime pin survives new releases and falls back only to its explicit previous version", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-pin-test-"));
  const previousEnv = process.env.ZCODE_NATIVE_RUNTIME;
  delete process.env.ZCODE_NATIVE_RUNTIME;
  try {
    const pinned = join(root, "pinned");
    await mkdir(pinned);
    for (const name of ["node", "server-core.js", "zcode.cjs"])
      await writeFile(join(pinned, name), "fixture");
    const directory = join(root, "zcode-native-runtime");
    await mkdir(directory);
    await writeFile(join(directory, "current.json"), JSON.stringify({ runtime: pinned }));
    assert.equal(await resolveNativeRuntime(root), pinned);
    await writeFile(
      join(directory, "current.json"),
      JSON.stringify({ runtime: join(root, "missing"), previousRuntime: pinned })
    );
    assert.equal(await resolveNativeRuntime(root), pinned);
    await writeFile(
      join(directory, "current.json"),
      JSON.stringify({ runtime: join(root, "missing") })
    );
    await assert.rejects(resolveNativeRuntime(root), /pinned ZCode runtime is unavailable/);
  } finally {
    if (previousEnv === undefined) delete process.env.ZCODE_NATIVE_RUNTIME;
    else process.env.ZCODE_NATIVE_RUNTIME = previousEnv;
    await rm(root, { recursive: true, force: true });
  }
});

test("native account state is encrypted, isolated, preserves refresh, and rejects identity replacement", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-account-test-"));
  const account = nativeAccountFromCredentials({
    connectionId: "one/../../escape",
    accessToken: "access-one",
    idToken: "jwt-one",
    authType: "oauth",
    providerSpecificData: { family: "zai", userId: "user-one" },
  });
  try {
    const first = await prepareNativeAccountState(root, account);
    assert.equal(first.directory.startsWith(`${root}/`), true);
    const path = join(first.directory, ".zcode/v2/credentials.json");
    const stored = await readFile(path, "utf8");
    assert.equal(stored.includes("access-one"), false);
    assert.equal((await stat(path)).mode & 0o777, 0o600);
    const encrypted = JSON.parse(stored)["oauth:zai:access_token"] as string;
    const [iv, tag, data] = encrypted
      .slice("enc:v1:".length)
      .split(".")
      .map((v) => Buffer.from(v, "base64url"));
    const decipher = createDecipheriv(
      "aes-256-gcm",
      createHash("sha256").update(first.secret).digest(),
      iv
    );
    decipher.setAuthTag(tag);
    assert.equal(Buffer.concat([decipher.update(data), decipher.final()]).toString(), "access-one");
    await writeFile(path, JSON.stringify({ nativeRefreshedState: "preserved" }));
    const same = await prepareNativeAccountState(root, account);
    assert.equal(same.secret, first.secret);
    assert.equal(JSON.parse(await readFile(path, "utf8")).nativeRefreshedState, "preserved");
    const second = await prepareNativeAccountState(root, {
      ...account,
      connectionId: "two",
      userId: "user-two",
    });
    assert.notEqual(second.directory, first.directory);
    assert.notEqual(second.secret, first.secret);
    await assert.rejects(
      prepareNativeAccountState(root, { ...account, userId: "other" }),
      /identity changed/
    );
    const reauth = await prepareNativeAccountState(root, { ...account, accessToken: "access-new" });
    assert.notEqual(reauth.fingerprint, first.fingerprint);
    assert.equal(JSON.parse(await readFile(path, "utf8")).nativeRefreshedState, undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("incomplete OAuth identity is rejected before starting a host", () => {
  assert.throws(
    () => nativeAccountFromCredentials({ connectionId: "a", accessToken: "a" }),
    /complete OAuth/
  );
});

test("managed child excludes caller exec arguments, reuses identity, and closes on shutdown", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-process-test-"));
  const runtime = join(root, "runtime");
  await mkdir(runtime);
  await symlink(process.execPath, join(runtime, "node"));
  await writeFile(
    join(runtime, "server-core.js"),
    `
    if (process.execArgv.length) process.exit(2);
    if (JSON.stringify(process.argv.slice(2)) !== '["1"]') process.exit(8);
    if (process.env.NODE_OPTIONS) process.exit(9);
    if (process.env.ZCODE_DATA_BASE_DIR !== process.env.ZCODE_DESKTOP_HOME_DIR) process.exit(3);
    if (!process.env.ZCODE_CREDENTIAL_SECRET) process.exit(4);
    if (process.env.ZCODE_SERVICE_AUTHORITY_MODE || process.env.ZCODE_EGRESS_PROXY) process.exit(5);
    if (require('node:os').homedir() !== process.env.ZCODE_DATA_BASE_DIR) process.exit(6);
    if (process.env.XDG_CONFIG_HOME !== require('node:path').join(process.env.ZCODE_DATA_BASE_DIR, '.config')) process.exit(7);
    process.send({type:'ready',port:12345,version:'fixture'});
    setInterval(()=>{},1000);
  `
  );
  const manager = new NativeZcodeHostManager({
    runtime,
    stateRoot: join(root, "state"),
    startupTimeoutMs: 2000,
  });
  const credentials = {
    connectionId: "one",
    accessToken: "test",
    idToken: "test-jwt",
    authType: "oauth",
    providerSpecificData: { family: "zai", userId: "user" },
    // Caller metadata must never become executable/argv or launch environment.
    command: "/untrusted/caller-command",
    args: ["--eval", "process.exit(10)"],
  };
  let pid: number | undefined;
  const oldAuthority = process.env.ZCODE_SERVICE_AUTHORITY_MODE;
  const oldProxy = process.env.ZCODE_EGRESS_PROXY;
  process.env.ZCODE_SERVICE_AUTHORITY_MODE = "standalone-server";
  process.env.ZCODE_EGRESS_PROXY = "http://127.0.0.1:1";
  try {
    const [first, concurrent] = await Promise.all([
      manager.ensure(credentials),
      manager.ensure(credentials),
    ]);
    assert.equal(first, concurrent);
    pid = JSON.parse(await readFile(join(first, "run/status.json"), "utf8")).pid;
    assert.equal(await manager.ensure(credentials), first);
    assert.equal(JSON.parse(await readFile(join(first, "run/status.json"), "utf8")).pid, pid);
  } finally {
    if (oldAuthority === undefined) delete process.env.ZCODE_SERVICE_AUTHORITY_MODE;
    else process.env.ZCODE_SERVICE_AUTHORITY_MODE = oldAuthority;
    if (oldProxy === undefined) delete process.env.ZCODE_EGRESS_PROXY;
    else process.env.ZCODE_EGRESS_PROXY = oldProxy;
    await manager.close();
    await rm(root, { recursive: true, force: true });
  }
  assert.throws(() => process.kill(pid!, 0), { code: "ESRCH" });
});

test("native host singleton is shared across independently loaded server chunks", async () => {
  const moduleUrl = new URL("../../open-sse/executors/zcode/nativeHostManager.ts", import.meta.url);
  const first = await import(`${moduleUrl.href}?chunk=inference`);
  const second = await import(`${moduleUrl.href}?chunk=quota`);
  assert.equal(first.nativeZcodeHosts, second.nativeZcodeHosts);
});
