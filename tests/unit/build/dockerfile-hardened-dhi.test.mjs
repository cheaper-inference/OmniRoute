import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (name) => readFileSync(new URL(`../../../${name}`, import.meta.url), "utf8");

function stageBody(dockerfile, name) {
  const stages = dockerfile.split(/^\s*FROM[ \t]+/im).slice(1);
  const header = new RegExp(`^\\S+[ \\t]+AS[ \\t]+${name}[ \\t]*$`, "i");
  const stage = stages.find((block) => header.test(block.split(/\r?\n/, 1)[0]));
  assert.ok(stage, `Dockerfile must declare ${name}`);
  return stage
    .split(/\r?\n/)
    .slice(1)
    .filter((line) => !line.trimStart().startsWith("#"))
    .join("\n")
    .replace(/\\\n[ \t]*/g, " ");
}

function envValues(body) {
  return new Map(
    Array.from(body.matchAll(/^[ \t]*ENV[ \t]+(\w+)=(.+)$/gim), ([, key, value]) => [
      key,
      value.trim(),
    ])
  );
}

const dockerfile = read("Dockerfile.hardened");
const hardened = stageBody(dockerfile, "runner-hardened");
const base = stageBody(read("Dockerfile"), "runner-base");

test("hardened runtime uses a tagged and digest-pinned DHI Node image", () => {
  assert.match(dockerfile, /^FROM dhi\.io\/node:[^@\s]+@sha256:[a-f0-9]{64} AS runner-hardened$/m);
});

test("hardened runtime has no RUN instruction and uses UID and GID 1000", () => {
  assert.doesNotMatch(hardened, /^[ \t]*RUN\b/im);
  const users = [...hardened.matchAll(/^[ \t]*USER[ \t]+(\S+)[ \t]*$/gim)];
  assert.deepEqual(
    users.map(([, user]) => user),
    ["1000:1000"]
  );
});

test("hardened runtime starts Node and checks health without a shell", () => {
  const healthcheck = /^[ \t]*HEALTHCHECK[ \t]+(.*?)\s+CMD[ \t]+(.+)$/im;
  const health = healthcheck.exec(hardened);
  const baseHealth = healthcheck.exec(base);
  assert.ok(health, "runner-hardened must declare a HEALTHCHECK");
  assert.ok(baseHealth, "runner-base must declare a HEALTHCHECK");
  assert.equal(health[1], baseHealth[1]);
  assert.deepEqual(JSON.parse(health[2]), ["node", "healthcheck.mjs"]);

  const cmd = /^[ \t]*CMD[ \t]+(.+)$/im.exec(hardened);
  assert.ok(cmd, "runner-hardened must declare a CMD");
  assert.deepEqual(JSON.parse(cmd[1]), ["node", "dev/run-standalone.mjs"]);
  assert.doesNotMatch(hardened, /^[ \t]*ENTRYPOINT\b(?![ \t]+\[\][ \t]*$)/im);
});

test("hardened runtime requires an API key and uses the persistent data path", () => {
  const env = envValues(hardened);
  assert.equal(env.get("REQUIRE_API_KEY"), "true");
  assert.equal(env.get("DATA_DIR"), "/app/data");
});

test("hardened runtime keeps the runner-base environment defaults", () => {
  const env = envValues(hardened);
  const baseEnv = envValues(base);
  for (const key of [
    "NODE_ENV",
    "PORT",
    "HOSTNAME",
    "OMNIROUTE_MEMORY_MB",
    "NODE_OPTIONS",
    "DATA_DIR",
    "REQUIRE_API_KEY",
    "OMNIROUTE_MIGRATIONS_DIR",
  ]) {
    assert.ok(baseEnv.has(key), `runner-base must define ${key}`);
    assert.equal(env.get(key), baseEnv.get(key), `${key} must match runner-base`);
  }
});
