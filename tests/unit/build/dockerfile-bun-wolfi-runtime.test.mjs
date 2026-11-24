import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const dockerfile = readFileSync(new URL("../../../Dockerfile.bun", import.meta.url), "utf8");
const stages = dockerfile
  .split("\n")
  .filter((line) => !/^\s*#/.test(line))
  .join("\n")
  .split(/(?=^FROM )/m);

function stage(name) {
  const body = stages.find((text) => text.split("\n", 1)[0].endsWith(` AS ${name}`));
  assert.ok(body, `stage ${name} not found`);
  return body;
}

test("Bun runners use digest-pinned Wolfi and the build uses version-pinned oven/bun", () => {
  assert.match(stage("base"), /^FROM oven\/bun:\d+\.\d+\.\d+(?:-slim)? AS base$/m);
  assert.match(
    stage("runtime-os"),
    /^FROM cgr\.dev\/chainguard\/wolfi-base:latest@sha256:[0-9a-f]{64} AS runtime-os$/m
  );
  assert.match(stage("runner-base"), /^FROM runtime-os AS runner-base$/m);
  assert.match(stage("runner-web"), /^FROM runner-base AS runner-web$/m);
});

test("Wolfi copies the builder's Bun binary and retains bun UID and GID 1000", () => {
  const runtime = stage("runtime-os");
  assert.match(runtime, /^COPY --from=base \/usr\/local\/bin\/bun \/usr\/local\/bin\/bun$/m);
  assert.match(runtime, /\baddgroup -g 1000 bun\b/);
  assert.match(runtime, /\badduser -u 1000 -G bun\b[^\n]*\bbun$/m);
});

test("Bun runtime stages contain no apt-get commands", () => {
  for (const name of ["runtime-os", "runner-base", "runner-web"]) {
    assert.doesNotMatch(stage(name), /\bapt-get\b/, `${name} must not use apt-get`);
  }
});
