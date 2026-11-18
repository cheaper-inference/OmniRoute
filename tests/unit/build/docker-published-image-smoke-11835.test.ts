import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const workflow = readFileSync(path.join(root, ".github/workflows/docker-publish.yml"), "utf8");

test("published version is smoke-tested before latest promotion", () => {
  const versionManifest = workflow.indexOf("Create Docker Hub version manifests");
  const smoke = workflow.indexOf("Smoke-test published Docker image");
  const latestPromotion = workflow.indexOf("Promote Docker Hub latest tags");

  assert.ok(versionManifest >= 0, "version manifest step must exist");
  assert.ok(smoke > versionManifest, "smoke test must follow version publication");
  assert.ok(latestPromotion > smoke, "latest promotion must follow the smoke test");
});

test("smoke test verifies the container health status", () => {
  const smoke = workflow.match(
    /- name: Smoke-test published Docker image[\s\S]*?(?=\n      - name:|\n      - uses:|\n\s*$)/
  );

  assert.ok(smoke, "published image smoke-test step must exist");
  assert.match(smoke[0], /docker run/);
  assert.match(smoke[0], /docker inspect/);
  assert.match(smoke[0], /healthy/);
});

test("latest promotion requires Node and Web and moves Bun aliases only when complete", () => {
  const promotion = workflow.match(
    /- name: Promote Docker Hub latest tags[\s\S]*?(?=\n      - name: Inspect image)/
  );

  assert.ok(promotion, "Docker Hub latest promotion must exist");
  assert.match(promotion[0], /for suffix in "" -web; do/);
  assert.match(promotion[0], /promote_tag "\$suffix"/);
  assert.match(promotion[0], /docker-image-complete\.mjs/);
  assert.match(promotion[0], /add_bun_alias "\$\{PUBLISH_BUN_BASE:-false\}" -bun/);
  assert.match(promotion[0], /add_bun_alias "\$\{PUBLISH_BUN_WEB:-false\}" -web-bun/);
  assert.doesNotMatch(promotion[0], /if docker.*imagetools inspect/);
  assert.match(workflow, /Promote GHCR latest tags/);
});
