import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Fal's native transport and schema adapters belong to the engine. Persistence is
// supplied by the app routes, never imported back into the engine.
test("Fal engine modules do not add app-layer dependencies", () => {
  for (const file of [
    "open-sse/handlers/fal/client.ts",
    "open-sse/handlers/imageGeneration/providers/fal.ts",
    "open-sse/handlers/mediaGeneration/fal.ts",
    "open-sse/handlers/imageGeneration.ts",
  ]) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /from ["']@\/lib\/fal\/compatibility["']/, file);
    if (file.includes("/fal/client") || file.includes("/providers/fal")) {
      assert.doesNotMatch(
        source,
        /from ["'](?:@\/|(?:\.\.\/)+src\/)shared\/utils\/fetchTimeout/,
        file
      );
    }
  }
});

test("compatibility routes inject the connection-scoped Fal preparer", () => {
  for (const file of [
    "src/app/api/v1/images/generations/route.ts",
    "src/app/api/v1/images/edits/route.ts",
    "src/app/api/v1/providers/[provider]/images/generations/route.ts",
    "src/app/api/v1/videos/generations/route.ts",
    "src/app/api/v1/music/generations/route.ts",
  ]) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /from "@\/lib\/fal\/compatibility"/, file);
    for (const call of source.matchAll(
      /handle(?:ImageGeneration|FalAIImageEdit|VideoGeneration|MusicGeneration)\(\{\s*([^,]+),/g
    )) {
      assert.match(call[1], /^prepareFalInput(?:: getFalCompatibilityPreparer\(\))?$/, file);
    }
  }
});

test("combo strategies forward the route-injected Fal preparer", () => {
  for (const kind of ["image", "video"]) {
    const strategy = readFileSync(`open-sse/services/${kind}Combo.ts`, "utf8");
    assert.match(strategy, /prepareFalInput: auth\.prepareFalInput/);
    const route = readFileSync(`src/app/api/v1/${kind}s/generations/route.ts`, "utf8");
    assert.match(
      route,
      /execute(?:Image|Video)Combo\([\s\S]*?\{\s*prepareFalInput: getFalCompatibilityPreparer\(\)/
    );
  }
});

test("app and engine timeout exports retain their shared identity", async () => {
  const engine = await import("../../open-sse/utils/fetchTimeout.ts");
  const app = await import("../../src/shared/utils/fetchTimeout.ts");
  assert.equal(app.fetchWithTimeout, engine.fetchWithTimeout);
  assert.equal(app.FetchTimeoutError, engine.FetchTimeoutError);
  assert.equal(app.getConfiguredTimeout, engine.getConfiguredTimeout);
});
