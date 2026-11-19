import assert from "node:assert/strict";

type Catalog = Pick<
  typeof import("../../src/app/api/v1/models/catalog.ts"),
  | "getUnifiedModelsResponse"
  | "__flushCatalogBackgroundRefreshForTest"
  | "__getCatalogBuilderRunsForTest"
>;

function isColdBuildTimeout(response: Response): boolean {
  return response.status === 503 && response.headers.get("x-omniroute-catalog") === "build-timeout";
}

export async function getSettledModelCatalogResponse(
  catalog: Catalog,
  request = new Request("http://localhost/api/v1/models")
): Promise<Response> {
  const response = await catalog.getUnifiedModelsResponse(request);
  if (!isColdBuildTimeout(response)) return response;

  // These fixtures validate catalog contents. Let the cold build finish
  // after a loaded runner reaches the endpoint's response deadline.
  let runs = catalog.__getCatalogBuilderRunsForTest();
  await catalog.__flushCatalogBackgroundRefreshForTest();
  let settled = await catalog.getUnifiedModelsResponse(request);
  const rereadRuns = catalog.__getCatalogBuilderRunsForTest();
  if (isColdBuildTimeout(settled) && rereadRuns === runs + 1) {
    // Invalidation can make the first result uncacheable. Settle the single
    // replacement the reread already started, then require a cache hit.
    runs = rereadRuns;
    await catalog.__flushCatalogBackgroundRefreshForTest();
    settled = await catalog.getUnifiedModelsResponse(request);
  }
  assert.equal(
    catalog.__getCatalogBuilderRunsForTest(),
    runs,
    "catalog fixture must read the same completed build"
  );
  return settled;
}
