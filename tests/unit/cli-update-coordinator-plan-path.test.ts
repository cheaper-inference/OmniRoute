/**
 * The detached coordinator receives the plan file path as a command-line argument. It may only
 * read the file the launcher wrote: a regular file named plan-<uuid>.json directly inside the
 * operation directory, owned by the current user. Anything else is refused before any read.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tx = await import("../../bin/cli/updateTransaction.mjs");

const ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";
const OTHER_ID = "11111111-2222-4333-8444-555555555555";

function fixture() {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "omni-plan-path-")));
  const opDir = path.join(root, "managed-update", ID);
  const outside = path.join(root, "elsewhere");
  fs.mkdirSync(opDir, { recursive: true });
  fs.mkdirSync(outside);
  const planFile = path.join(opDir, `plan-${ID}.json`);
  fs.writeFileSync(planFile, "{}");
  return { root, opDir, outside, planFile };
}

test("a plan file the launcher wrote is accepted, absolute or relative to the working directory", () => {
  const f = fixture();
  try {
    assert.equal(tx.resolveCoordinatorPlanPath(f.planFile, f.opDir), f.planFile);
    const relative = path.relative(process.cwd(), f.planFile);
    assert.equal(tx.resolveCoordinatorPlanPath(relative, f.opDir), f.planFile);
    // The expected directory may itself be reached through a link.
    const viaLink = path.join(f.root, "link-to-op");
    fs.symlinkSync(f.opDir, viaLink);
    assert.equal(tx.resolveCoordinatorPlanPath(f.planFile, viaLink), f.planFile);
    assert.equal(
      tx.resolveCoordinatorPlanPath(path.join(viaLink, `plan-${ID}.json`), f.opDir),
      f.planFile
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("a path that climbs out with .. is refused", () => {
  const f = fixture();
  try {
    fs.writeFileSync(path.join(f.outside, `plan-${ID}.json`), "{}");
    const climbing = path.join(f.opDir, "..", "..", "elsewhere", `plan-${ID}.json`);
    assert.equal(tx.resolveCoordinatorPlanPath(climbing, f.opDir), null);
    assert.equal(
      tx.resolveCoordinatorPlanPath(`${f.planFile}/../../../../etc/passwd`, f.opDir),
      null
    );
    assert.equal(
      tx.resolveCoordinatorPlanPath(path.relative(process.cwd(), climbing), f.opDir),
      null
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("a valid-looking file in another directory is refused", () => {
  const f = fixture();
  try {
    const stray = path.join(f.outside, `plan-${OTHER_ID}.json`);
    fs.writeFileSync(stray, "{}");
    assert.equal(tx.resolveCoordinatorPlanPath(stray, f.opDir), null);
    // A sub-directory of the operation directory is not the operation directory.
    const nested = path.join(f.opDir, "nested");
    fs.mkdirSync(nested);
    fs.writeFileSync(path.join(nested, `plan-${ID}.json`), "{}");
    assert.equal(
      tx.resolveCoordinatorPlanPath(path.join(nested, `plan-${ID}.json`), f.opDir),
      null
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("a link inside the directory that points outside is refused, a link to the real file too", () => {
  const f = fixture();
  try {
    const target = path.join(f.outside, "secret.json");
    fs.writeFileSync(target, '{"plan":"stolen"}');
    const link = path.join(f.opDir, `plan-${OTHER_ID}.json`);
    fs.symlinkSync(target, link);
    assert.equal(tx.resolveCoordinatorPlanPath(link, f.opDir), null);
    const linkToReal = path.join(f.opDir, `plan-${"2".repeat(8)}-2222-4222-8222-222222222222.json`);
    fs.symlinkSync(f.planFile, linkToReal);
    assert.equal(tx.resolveCoordinatorPlanPath(linkToReal, f.opDir), null);
    // A link in the PARENT chain that leads out of the directory is refused as well.
    const dirLink = path.join(f.root, "dir-link");
    fs.symlinkSync(f.outside, dirLink);
    fs.writeFileSync(path.join(f.outside, `plan-${ID}.json`), "{}");
    assert.equal(
      tx.resolveCoordinatorPlanPath(path.join(dirLink, `plan-${ID}.json`), f.opDir),
      null
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("names outside the launcher's pattern are refused", () => {
  const f = fixture();
  try {
    for (const name of [
      "plan.json",
      `plan-${ID}.json.bak`,
      `plan-${ID}.JSON.tmp`,
      "plan-not-a-uuid.json",
      `PLAN-${ID}.json`,
      `plan-${ID}`,
      `x-plan-${ID}.json`,
      "coordinator.mjs",
      "state.json",
    ]) {
      const file = path.join(f.opDir, name);
      fs.writeFileSync(file, "{}");
      assert.equal(tx.resolveCoordinatorPlanPath(file, f.opDir), null, name);
    }
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("only a regular file counts: a directory with the right name is refused, and so is a missing file", () => {
  const f = fixture();
  try {
    const dir = path.join(f.opDir, `plan-${OTHER_ID}.json`);
    fs.mkdirSync(dir);
    assert.equal(tx.resolveCoordinatorPlanPath(dir, f.opDir), null);
    assert.equal(
      tx.resolveCoordinatorPlanPath(
        path.join(f.opDir, `plan-${"3".repeat(8)}-3333-4333-8333-333333333333.json`),
        f.opDir
      ),
      null
    );
    assert.equal(tx.resolveCoordinatorPlanPath(f.planFile, path.join(f.root, "missing-dir")), null);
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("a file owned by another user is refused when the platform reports owners", () => {
  const f = fixture();
  try {
    const owner = fs.lstatSync(f.planFile).uid;
    assert.equal(
      tx.resolveCoordinatorPlanPath(f.planFile, f.opDir, { getuid: () => owner }),
      f.planFile
    );
    assert.equal(
      tx.resolveCoordinatorPlanPath(f.planFile, f.opDir, { getuid: () => owner + 1 }),
      null
    );
    // No uid on the platform (Windows): the other checks still decide.
    assert.equal(
      tx.resolveCoordinatorPlanPath(f.planFile, f.opDir, { getuid: () => undefined }),
      f.planFile
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("malformed arguments are refused without touching the filesystem", () => {
  const touched: string[] = [];
  const deps = {
    realpathSync: (p: string) => {
      touched.push(p);
      return p;
    },
    lstatSync: (p: string) => {
      touched.push(p);
      throw new Error("must not be called");
    },
  };
  for (const arg of [undefined, null, 42, {}, "", "a\0b", "x".repeat(5000)]) {
    assert.equal(tx.resolveCoordinatorPlanPath(arg, "/tmp/dir", deps), null);
  }
  assert.equal(tx.resolveCoordinatorPlanPath(`/tmp/dir/plan-${ID}.json`, "", deps), null);
  assert.equal(tx.resolveCoordinatorPlanPath(`/tmp/dir/plan-${ID}.json`, undefined, deps), null);
  assert.deepEqual(touched, []);
});

test("planFileName builds only the pattern the coordinator accepts", () => {
  assert.equal(tx.planFileName(ID), `plan-${ID}.json`);
  assert.throws(() => tx.planFileName("../x"), /operation id/i);
});

test("coordinatorMain refuses everything but a valid plan before reading or acting (exit 2)", async () => {
  const f = fixture();
  try {
    assert.equal(await tx.coordinatorMain("/etc/passwd", f.opDir), 2);
    assert.equal(await tx.coordinatorMain(path.join(f.outside, `plan-${ID}.json`), f.opDir), 2);
    // Right place and name, wrong content: not JSON, then JSON that is not a plan.
    fs.writeFileSync(f.planFile, "not json");
    assert.equal(await tx.coordinatorMain(f.planFile, f.opDir), 2);
    fs.writeFileSync(f.planFile, JSON.stringify({ plan: { operationId: "x" }, runtime: {} }));
    assert.equal(await tx.coordinatorMain(f.planFile, f.opDir), 2);
    fs.writeFileSync(f.planFile, "null");
    assert.equal(await tx.coordinatorMain(f.planFile, f.opDir), 2);
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});
