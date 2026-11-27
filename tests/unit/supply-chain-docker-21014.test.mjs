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

test("Bun builder runs the pinned package install script before bun run build (#21014)", () => {
  const builder = stripHashComments(read("Dockerfile.bun"))
    .split(/^FROM[ \t]+\S+[ \t]+AS[ \t]+builder[ \t]*$/im)[1]
    ?.split(/^FROM\s/im)[0];
  assert.ok(builder, "Dockerfile.bun must have a builder stage");

  const instructions = builder.replace(/\\\r?\n/g, " ");
  const install = instructions.search(/^RUN bun install\b[^\n]*--ignore-scripts\b/m);
  const bunInstall = instructions.search(
    /(?:^RUN|&&)\s+\(cd node_modules\/bun\s+&&\s+bun install\.js\)/m
  );
  const build = instructions.search(/^RUN bun run (?:--quiet )?build\b/m);

  assert.ok(
    install >= 0 && install < bunInstall && bunInstall < build,
    "Bun builder must run the pinned bun install.js after --ignore-scripts and before bun run build"
  );

  const verification = instructions.slice(bunInstall).split("\n", 1)[0];
  assert.match(
    verification,
    /&&\s+expected_version="\$\(bun -e 'process\.stdout\.write\(require\("\.\/package\.json"\)\.devDependencies\.bun\)'\)"/,
    "Bun builder must read the expected Bun version from package.json devDependencies.bun"
  );
  assert.match(
    verification,
    /&&\s+actual_version="\$\(node_modules\/\.bin\/bun --version\)"\s+&&\s+if \[ "\$actual_version" != "\$expected_version" \]; then .*\bexit 1;\s+fi\s*$/,
    "Bun builder must compare the installed binary version with the pin and fail on mismatch"
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
