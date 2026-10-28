import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import * as yaml from "js-yaml";
import { assembleStandalone } from "../../../scripts/build/assembleStandalone.mjs";
import { writePublicOpenApi } from "../../../scripts/build/publicOpenApi.mjs";

interface Spec {
  info: { version: string };
  servers: { url: string }[];
  paths: Record<string, unknown>;
}
const root = new URL("../../../", import.meta.url);
const spec = yaml.load(readFileSync(new URL("public/openapi.yaml", root), "utf8")) as Spec;
const pkg = JSON.parse(readFileSync(new URL("package.json", root), "utf8")) as { version: string };

test("public OpenAPI describes the running build version", () => {
  assert.equal(spec.info.version, pkg.version);
});

for (const documentUrl of [
  "https://api.example.test/openapi.yaml",
  "https://api.example.test/omniroute/openapi.yaml",
  "http://localhost:21234/openapi.yaml",
]) {
  test(`OpenAPI requests stay on the deployment serving ${documentUrl}`, () => {
    const server = new URL(spec.servers[0].url, documentUrl);
    assert.equal(
      server.href.replace(/\/$/, "") + "/api/v1/models",
      documentUrl.replace(/\/openapi\.yaml$/, "/api/v1/models")
    );
  });
}

test("public spec preserves canonical operations, schemas and security", () => {
  const canonical = yaml.load(readFileSync(new URL("docs/openapi.yaml", root), "utf8")) as Spec;
  assert.deepEqual(
    { ...spec, info: undefined, servers: undefined },
    { ...canonical, info: undefined, servers: undefined }
  );
  assert.deepEqual({ ...spec.info, version: undefined }, { ...canonical.info, version: undefined });
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
