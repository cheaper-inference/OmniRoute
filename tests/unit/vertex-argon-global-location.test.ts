import test from "node:test";
import assert from "node:assert/strict";

import { VertexExecutor } from "../../open-sse/executors/vertex.ts";

// Gemini 4 Argon is served only from `global`, the `us`/`eu` multi-regions, europe-west2 and
// asia-southeast1 (Google "Deployments and endpoints" page). Any other region answers 404.
// The dashboard stores `us-central1` on every new Vertex connection, so a stored region must
// not pin Argon there.

function buildUrl(model: string, region?: string) {
  return new VertexExecutor().buildUrl(model, false, 0, {
    accessToken: "token",
    providerSpecificData: { projectId: "proj", ...(region === undefined ? {} : { region }) },
  });
}

test("Argon on an unsupported region is sent to the global location", () => {
  for (const region of [undefined, "us-central1", "europe-west4", "us-east5"]) {
    assert.equal(
      buildUrl("gemini-4-argon", region),
      "https://aiplatform.googleapis.com/v1/projects/proj/locations/global/publishers/google/models/gemini-4-argon:generateContent"
    );
  }
});

test("Argon keeps a region it is served from", () => {
  for (const region of ["global", "us", "eu", "europe-west2", "asia-southeast1"]) {
    assert.ok(
      buildUrl("gemini-4-argon", region).includes(`/locations/${region}/`),
      `${region} must stay`
    );
  }
});

test("other Gemini models keep the configured or default region", () => {
  assert.match(buildUrl("gemini-2.5-flash", "us-central1"), /\/locations\/us-central1\//);
  assert.match(buildUrl("gemini-2.5-flash", "europe-west4"), /\/locations\/europe-west4\//);
  assert.match(buildUrl("gemini-2.5-flash"), /\/locations\/us-central1\//);
  assert.match(buildUrl("gemini-4-argonaut", "us-central1"), /\/locations\/us-central1\//);
});
