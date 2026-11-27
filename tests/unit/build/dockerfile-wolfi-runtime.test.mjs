import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function parseStages(source) {
  const stages = new Map();
  for (const block of source.split(/^FROM /m).slice(1)) {
    const [header, ...lines] = block.split(/\r?\n/);
    const [, base, name] = /^(\S+)\s+AS\s+(\S+)\s*$/.exec(header) ?? [];
    if (name) {
      const instructions = lines
        .filter((line) => !line.trimStart().startsWith("#"))
        .join("\n")
        .replace(/\\\n[ \t]*/g, " ");
      stages.set(name, { base, instructions });
    }
  }
  return stages;
}

const dockerfile = readFileSync(new URL("../../../Dockerfile", import.meta.url), "utf8");
const stages = parseStages(dockerfile);

function stage(name) {
  const found = stages.get(name);
  assert.ok(found, `Dockerfile must declare ${name}`);
  return found;
}

function apkAddArguments(instructions) {
  return [...instructions.matchAll(/\bapk\s+add\s+([^&|;\n]+)/g)].flatMap((match) =>
    match[1].trim().split(/\s+/)
  );
}

test("Docker runtime uses digest-pinned Wolfi and the builder keeps its Node 26 base", () => {
  assert.match(
    stage("runtime-os").base,
    /^cgr\.dev\/chainguard\/wolfi-base(?::[^@\s]+)?@sha256:[a-f0-9]{64}$/
  );
  assert.equal(stage("runner-base").base, "runtime-os");
  assert.equal(stage("builder").base, "base");
  assert.match(stage("base").base, /^node:26\.\d/);
});

test("Wolfi installs Node and npm, preserves UID and GID 1000, and checks the Node floor", () => {
  const { instructions } = stage("runtime-os");
  const packages = apkAddArguments(instructions);
  for (const name of ["nodejs-26", "npm-12"]) {
    assert.ok(packages.includes(name), `runtime-os must install ${name} via apk`);
  }
  assert.match(instructions, /\baddgroup -g 1000 node(?=\s|$)/);
  assert.match(instructions, /\badduser -u 1000 -G node(?=\s)[^&|;\n]*\snode(?=\s|$)/);
  assert.match(
    instructions,
    /\bnode -e "[^"\n]*process\.versions\.node[^"\n]*26\.12\.1[^"\n]*process\.exit\(1\)/,
    "runtime-os must check the running Node binary against the 26.12.1 floor"
  );
});

test("Wolfi runtime stages use no apt-get commands", () => {
  for (const name of [
    "runtime-os",
    "runner-base",
    "runner-web",
    "runner-cli-core",
    "runner-cli-no-docker",
    "runner-cli",
  ]) {
    assert.doesNotMatch(stage(name).instructions, /\bapt-get\b/, `${name} must use Wolfi packages`);
  }
});

test("runner-web installs Playwright Chromium with Wolfi libraries and Xvfb", () => {
  const { instructions } = stage("runner-web");
  const packages = apkAddArguments(instructions);
  for (const name of ["xvfb", "xkbcomp", "xkeyboard-config", "so:libnss3.so"]) {
    assert.ok(packages.includes(name), `runner-web must install ${name} via apk`);
  }
  assert.ok(
    packages.every((arg) => !/^chromium(?:[@=~<>]|$)/.test(arg)),
    "runner-web must use Playwright's Chromium without installing Wolfi's chromium package"
  );
  assert.match(instructions, /&&\s+install -d -o node -g node -m 0755 \/tmp\/\.X11-unix\s+&&/);
  assert.doesNotMatch(instructions, /\bchmod\s+1?7{3}\b/);
  assert.match(instructions, /\bnode node_modules\/playwright\/cli\.js install chromium(?=\s|$)/);
  assert.doesNotMatch(instructions, /--with-deps\b/);
  assert.match(instructions, /\/lib\/ld-linux-\*\.so\.\* --list[^\n]*\bgrep 'not found'/);
  assert.match(
    instructions,
    /^ENV PLAYWRIGHT_BROWSERS_PATH=\/home\/node\/\.cache\/ms-playwright$/m
  );
});
