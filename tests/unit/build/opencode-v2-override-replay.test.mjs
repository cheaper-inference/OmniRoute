import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import semver from "semver";

const manifest = JSON.parse(
  readFileSync(
    new URL("../../../@omniroute/opencode-plugin-v2/package.json", import.meta.url),
    "utf8"
  )
);

// npm 10 may replay an edge using its already overridden spec. A selective
// security pin must still select itself, or replay can restore the old consumer
// range (for example rimraf's glob ^10.3.7). Real npm ci remains the integration check.
function selectiveRule(name) {
  const matches = Object.entries(manifest.overrides).filter(([key]) => key.startsWith(`${name}@`));
  assert.equal(matches.length, 1, `review the ${name} security override topology`);
  const [key, pin] = matches[0];
  assert.ok(typeof pin === "string" && semver.valid(pin), `review the ${name} pin`);
  const range = key.slice(name.length + 1);
  assert.ok(semver.validRange(range), `review the ${name} selector`);
  return { range, pin };
}

for (const name of ["glob", "minimatch"]) {
  test(`OpenCode v2 ${name} retains its security pin after override replay`, () => {
    const { range, pin } = selectiveRule(name);
    assert.ok(
      semver.satisfies(pin, range),
      `${name}@${pin} falls outside its selector ${range}; npm 10 can lose the override on replay`
    );
  });
}

for (const [name, consumer, pin, vulnerableRange, closedRange, later] of [
  ["glob", "^10.3.7", "14.0.3", ">=9.0.0 <14.0.2", ">=9.0.0 <=14.0.3", "14.0.4"],
  ["minimatch", "^10.0.3", "11.0.4", ">=7.0.0 <11.0.1", ">=7.0.0 <=11.0.4", "11.0.5"],
]) {
  test(`${name} replay control distinguishes the consumer, chosen pin and later versions`, () => {
    assert.ok(semver.intersects(consumer, vulnerableRange));
    assert.equal(semver.satisfies(pin, vulnerableRange), false);
    assert.ok(semver.intersects(consumer, closedRange));
    assert.ok(semver.satisfies(pin, closedRange));
    assert.equal(semver.satisfies(later, closedRange), false);
  });
}
