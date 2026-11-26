// Docker regression tests from #21036 by same7adel.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function stripHashComments(source) {
  return source
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
}

test("Dockerfile.bun copies package-lock.json and enforces --frozen-lockfile --ignore-scripts (#21014)", () => {
  const bunDocker = stripHashComments(read("Dockerfile.bun"));
  assert.match(
    bunDocker,
    /^COPY\s+package\.json\s+package-lock\.json\b/m,
    "Dockerfile.bun builder must copy package-lock.json so Bun has a lockfile to enforce"
  );
  assert.match(
    bunDocker,
    /^RUN\s+test\s+-f\s+package-lock\.json\b/m,
    "Dockerfile.bun must fail closed if the lockfile is missing from build context"
  );
  assert.match(
    bunDocker,
    /^RUN\s+bun\s+install\s+--frozen-lockfile\s+--ignore-scripts\b/m,
    "Dockerfile.bun must enforce --frozen-lockfile and --ignore-scripts"
  );
  assert.doesNotMatch(
    bunDocker,
    /^RUN\s+bun\s+install(?!.*--frozen-lockfile)/m,
    "no unfrozen `bun install` may remain in Dockerfile.bun"
  );
});

test("tproxy native build and VNC chromium Dockerfile contain no floating latest/npx --yes (#21014)", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.doesNotMatch(
    pkg.scripts?.["build:native:tproxy"] ?? "",
    /npx\s+--yes/,
    "package.json build:native:tproxy must not use npx --yes"
  );
  const tproxyHelper = read("scripts/build/build-tproxy-native.mjs")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !/^\s*\/\//.test(l))
    .join("\n");
  assert.doesNotMatch(tproxyHelper, /npx/, "build-tproxy-native.mjs must not spawn npx");

  const chromiumDocker = stripHashComments(read("docker/vnc-browser/chromium/Dockerfile"));
  assert.doesNotMatch(chromiumDocker, /:latest\b/, "VNC chromium Dockerfile must not use :latest");
  assert.match(
    chromiumDocker,
    /^FROM\s+linuxserver\/chromium:[^\s@]+@sha256:[a-f0-9]{64}\s*$/m,
    "VNC chromium Dockerfile must pin tag + sha256 digest"
  );
});
