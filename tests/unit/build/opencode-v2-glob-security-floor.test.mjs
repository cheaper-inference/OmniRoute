import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import semver from "semver";

const lock = JSON.parse(
  readFileSync(
    new URL("../../../@omniroute/opencode-plugin-v2/package-lock.json", import.meta.url),
    "utf8"
  )
);

// GHSA-3g3m-2fjr-6pw4 and GHSA-g3hv-75wg-m249. Cover the standalone
// development/CI tree, including copies below consumers such as rimraf.
const floors = { glob: "14.0.2", minimatch: "11.0.1" };

function assertDependencySecurityFloor(candidate, name) {
  assert.ok(
    candidate?.packages &&
      typeof candidate.packages === "object" &&
      !Array.isArray(candidate.packages),
    "the standalone lock must expose its packages"
  );
  const suffix = `node_modules/${name}`;
  const copies = Object.entries(candidate.packages).filter(
    ([location]) => location === suffix || location.endsWith(`/${suffix}`)
  );
  assert.ok(copies.length > 0, `${name} must remain visible to this dependency contract`);
  for (const [location, entry] of copies) {
    const version = typeof entry?.version === "string" ? semver.valid(entry.version) : null;
    assert.ok(version, `${location}: review an unsupported ${name} version`);
    assert.ok(
      semver.gte(version, floors[name]),
      `${location}: ${entry.version} predates the ${name} security floor ${floors[name]}`
    );
  }
}

for (const name of Object.keys(floors)) {
  test(`the OpenCode v2 toolchain includes the ${name} security fix`, () => {
    assertDependencySecurityFloor(lock, name);
  });
}

test("a fixed top-level glob cannot hide a vulnerable copy below rimraf", () => {
  assert.throws(
    () =>
      assertDependencySecurityFloor(
        {
          packages: {
            "node_modules/glob": { version: "14.0.3" },
            "node_modules/rimraf/node_modules/glob": { version: "10.5.0" },
          },
        },
        "glob"
      ),
    /rimraf\/node_modules\/glob: 10\.5\.0 predates the glob security floor 14\.0\.2/
  );
});

test("a fixed top-level minimatch cannot hide a vulnerable copy below rimraf", () => {
  assert.throws(
    () =>
      assertDependencySecurityFloor(
        {
          packages: {
            "node_modules/minimatch": { version: "11.0.4" },
            "node_modules/rimraf/node_modules/minimatch": { version: "9.0.9" },
          },
        },
        "minimatch"
      ),
    /rimraf\/node_modules\/minimatch: 9\.0\.9 predates the minimatch security floor 11\.0\.1/
  );
});

test("the dependency floors reject the last affected versions", () => {
  for (const [name, version] of Object.entries({ glob: "14.0.1", minimatch: "11.0.0" })) {
    assert.throws(
      () =>
        assertDependencySecurityFloor(
          { packages: { [`node_modules/${name}`]: { version } } },
          name
        ),
      /predates the .* security floor/
    );
  }
});

test("the dependency floors accept patched copies at either depth", () => {
  for (const [name, version] of Object.entries(floors)) {
    assert.doesNotThrow(() =>
      assertDependencySecurityFloor(
        {
          packages: {
            [`node_modules/${name}`]: { version },
            [`node_modules/rimraf/node_modules/${name}`]: { version },
          },
        },
        name
      )
    );
    assert.doesNotThrow(() =>
      assertDependencySecurityFloor(
        { packages: { [`node_modules/rimraf/node_modules/${name}`]: { version } } },
        name
      )
    );
  }
});

test("the dependency floors reject empty or missing package evidence", () => {
  for (const name of Object.keys(floors)) {
    assert.throws(() => assertDependencySecurityFloor({}, name), /lock must expose its packages/);
    assert.throws(
      () =>
        assertDependencySecurityFloor(
          { packages: { [`node_modules/${name}-lookalike`]: { version: floors[name] } } },
          name
        ),
      /must remain visible to this dependency contract/
    );
  }
});

test("the dependency floors reject malformed or missing versions", () => {
  for (const name of Object.keys(floors)) {
    for (const version of ["not-a-version", "", undefined]) {
      assert.throws(
        () =>
          assertDependencySecurityFloor(
            { packages: { [`node_modules/${name}`]: { version } } },
            name
          ),
        /review an unsupported .* version/
      );
    }
  }
});
