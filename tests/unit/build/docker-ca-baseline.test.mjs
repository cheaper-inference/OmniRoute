import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// eMudhra intermediate CA compromise (2026-10-20, https://emudhra.we-have-a-problem.com/):
// node and Bun ship their own root store, so the images must use runtimes that reject the
// compromised intermediates. These are the first patched releases; Dependabot may bump the
// pins upward, but nothing may go below them or back to a floating major-only tag.
const MIN = { node: [26, 12, 1], bun: [1, 4, 4] };

const read = (rel) => readFileSync(new URL(`../../../${rel}`, import.meta.url), "utf8");

function parseVersion(tag) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-|$)/.exec(tag);
  return m ? m.slice(1).map(Number) : null;
}

function atLeast(version, min) {
  for (let i = 0; i < 3; i++) if (version[i] !== min[i]) return version[i] > min[i];
  return true;
}

function imageTags(text, image) {
  const re = new RegExp(`(?:^FROM\\s+|image:\\s*)${image.replace("/", "\\/")}:(\\S+)`, "gm");
  return [...text.matchAll(re)].map((m) => m[1]);
}

const cases = [
  ["Dockerfile", "node", MIN.node],
  ["docker/devin-bridge/compose.yml", "node", MIN.node],
  ["docker/devin-bridge/Dockerfile", "node", MIN.node],
  ["Dockerfile.bun", "oven/bun", MIN.bun],
];

for (const [file, image, min] of cases) {
  test(`${file}: every ${image} image is pinned to a patch release >= ${min.join(".")}`, () => {
    const tags = imageTags(read(file), image);
    assert.ok(tags.length > 0, `no ${image} image found in ${file}`);
    for (const tag of tags) {
      const version = parseVersion(tag);
      assert.ok(
        version,
        `${file}: ${image}:${tag} must pin a full x.y.z version, not a floating tag`
      );
      assert.ok(
        atLeast(version, min),
        `${file}: ${image}:${tag} still trusts the compromised eMudhra CAs; need >= ${min.join(".")}`
      );
    }
  });
}
