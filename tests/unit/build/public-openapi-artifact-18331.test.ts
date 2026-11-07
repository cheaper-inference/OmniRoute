import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { assembleStandalone } from "../../../scripts/build/assembleStandalone.mjs";
import { writePublicOpenApi } from "../../../scripts/build/publicOpenApi.mjs";
import { bumpOpenApi } from "../../../scripts/release/dry-run-lts-cut.mjs";

interface Spec {
  info: { version: string };
  servers: { url: string }[];
  paths: Record<string, unknown>;
}
interface Manifest {
  scripts: Record<string, string>;
}
const root = new URL("../../../", import.meta.url);
const pkg = JSON.parse(readFileSync(new URL("package.json", root), "utf8")) as { version: string };

// Generated, never read from the committed copy: that copy may lag docs/openapi.yaml, and pinning
// it here would turn every PR that documents a route red.
const generationRoot = mkdtempSync(join(tmpdir(), "openapi-18331-generated-"));
after(() => rmSync(generationRoot, { recursive: true, force: true }));
writePublicOpenApi(fileURLToPath(root), generationRoot);
const spec = yaml.load(
  readFileSync(join(generationRoot, "public", "openapi.yaml"), "utf8")
) as Spec;

test("the generated spec describes the running build version", () => {
  assert.equal(spec.info.version, pkg.version);
});

for (const documentUrl of [
  "https://api.example.test/openapi.yaml",
  "https://api.example.test/omniroute/openapi.yaml",
  "http://localhost:21234/openapi.yaml",
]) {
  test(`generated requests stay on the deployment serving ${documentUrl}`, () => {
    const server = new URL(spec.servers[0].url, documentUrl);
    assert.equal(
      server.href.replace(/\/$/, "") + "/api/v1/models",
      documentUrl.replace(/\/openapi\.yaml$/, "/api/v1/models")
    );
  });
}

test("the generated spec preserves canonical operations, schemas and security", () => {
  const canonical = yaml.load(readFileSync(new URL("docs/openapi.yaml", root), "utf8")) as Spec;
  assert.deepEqual(
    { ...spec, info: undefined, servers: undefined },
    { ...canonical, info: undefined, servers: undefined }
  );
  assert.deepEqual({ ...spec.info, version: undefined }, { ...canonical.info, version: undefined });
});

test("the committed copy is a generated spec with deployment-relative servers", () => {
  // Not its version or paths: those may lag until the next `npm run gen:public-openapi`.
  const committed = yaml.load(readFileSync(new URL("public/openapi.yaml", root), "utf8")) as Spec;
  assert.deepEqual(committed.servers, spec.servers);
  assert.ok(Object.keys(committed.paths).length > 0);
});

/** A minimal project: the generator needs only package.json and docs/openapi.yaml. */
function createFixtureProject(version: string, specVersion: string) {
  const projectRoot = mkdtempSync(join(tmpdir(), "openapi-18331-fixture-"));
  mkdirSync(join(projectRoot, "docs"));
  writeFileSync(join(projectRoot, "package.json"), JSON.stringify({ version }));
  writeFileSync(
    join(projectRoot, "docs", "openapi.yaml"),
    `openapi: 3.1.0\ninfo:\n  title: Fixture\n  version: ${specVersion}\nservers:\n  - url: http://localhost:20128\npaths: {}\n`
  );
  return projectRoot;
}

test("a route documented after the last regeneration reaches the next generated spec", () => {
  const projectRoot = createFixtureProject("9.8.7", "9.8.7");
  try {
    assert.equal(writePublicOpenApi(projectRoot), true);
    const source = join(projectRoot, "docs", "openapi.yaml");
    writeFileSync(
      source,
      readFileSync(source, "utf8").replace("paths: {}", "paths:\n  /api/new:\n    get: {}")
    );

    assert.equal(writePublicOpenApi(projectRoot), true);
    const refreshed = yaml.load(
      readFileSync(join(projectRoot, "public", "openapi.yaml"), "utf8")
    ) as Spec;
    assert.deepEqual(Object.keys(refreshed.paths), ["/api/new"]);
  } finally {
    rmSync(projectRoot, { recursive: true, force: true });
  }
});

test("gen:public-openapi regenerates the committed path from the current directory", () => {
  const projectRoot = createFixtureProject("9.8.7", "old");
  try {
    const script = fileURLToPath(new URL("scripts/build/publicOpenApi.mjs", root));
    const run = () => spawnSync(process.execPath, [script], { cwd: projectRoot, encoding: "utf8" });

    const first = run();
    assert.equal(first.status, 0, first.stderr);
    assert.match(first.stdout, /updated/);
    const target = join(projectRoot, "public", "openapi.yaml");
    assert.equal((yaml.load(readFileSync(target, "utf8")) as Spec).info.version, "9.8.7");
    assert.match(run().stdout, /up to date/);
    assert.match(
      (JSON.parse(readFileSync(new URL("package.json", root), "utf8")) as Manifest).scripts[
        "gen:public-openapi"
      ],
      /^node scripts\/build\/publicOpenApi\.mjs$/
    );
  } finally {
    rmSync(projectRoot, { recursive: true, force: true });
  }
});

test("a cycle bump keeps generating the new version and moves the committed copy too", () => {
  const projectRoot = createFixtureProject("3.8.54", "3.8.54");
  try {
    writePublicOpenApi(projectRoot);
    const target = join(projectRoot, "public", "openapi.yaml");
    assert.equal((yaml.load(readFileSync(target, "utf8")) as Spec).info.version, "3.8.54");

    // The committed copy keeps its body through the bump, like docs/openapi.yaml.
    const committed = readFileSync(new URL("public/openapi.yaml", root), "utf8");
    const bumped = yaml.load(bumpOpenApi(committed, "9.9.9")) as Spec;
    assert.equal(bumped.info.version, "9.9.9");
    assert.deepEqual(bumped.servers, spec.servers);
  } finally {
    rmSync(projectRoot, { recursive: true, force: true });
  }
});

test("dev and the isolated build leave the tracked public spec alone", () => {
  // Source pin: running either one here would mean booting Next or a full build. Only the
  // assembly step, which writes to its output directory, may generate the spec.
  for (const script of ["scripts/dev/run-next.mjs", "scripts/build/build-next-isolated.mjs"]) {
    assert.doesNotMatch(readFileSync(new URL(script, root), "utf8"), /writePublicOpenApi/, script);
  }
  assert.match(
    readFileSync(new URL("scripts/build/assembleStandalone.mjs", root), "utf8"),
    /writePublicOpenApi\(projectRoot, resolvedOutDir\)/
  );
});

test("packaging refreshes stale metadata and repeated generation does not rewrite the artifact", () => {
  const projectRoot = mkdtempSync(join(tmpdir(), "openapi-18331-"));
  try {
    const distDir = join(projectRoot, ".build", "next");
    const outDir = join(projectRoot, "out");
    mkdirSync(join(distDir, "standalone"), { recursive: true });
    mkdirSync(join(projectRoot, "docs"));
    mkdirSync(join(projectRoot, "public"));
    writeFileSync(join(projectRoot, "package.json"), JSON.stringify({ version: "9.8.7" }));
    writeFileSync(
      join(projectRoot, "docs", "openapi.yaml"),
      "openapi: 3.1.0\ninfo:\n  title: Fixture\n  version: old\nservers:\n  - url: http://localhost:20128\npaths: {}\n"
    );
    writeFileSync(join(projectRoot, "public", "openapi.yaml"), "stale public artifact");
    assembleStandalone({ projectRoot, distDir, outDir, copyNatives: false });
    const target = join(outDir, "public", "openapi.yaml");
    const packaged = yaml.load(readFileSync(target, "utf8")) as Spec;
    assert.equal(packaged.info.version, "9.8.7");
    assert.equal(
      new URL(packaged.servers[0].url, "https://proxy.test/nested/base/openapi.yaml").href,
      "https://proxy.test/nested/base/"
    );
    const before = statSync(target).mtimeMs;
    assert.equal(writePublicOpenApi(projectRoot, outDir), false);
    assert.equal(statSync(target).mtimeMs, before);
  } finally {
    rmSync(projectRoot, { recursive: true, force: true });
  }
});
