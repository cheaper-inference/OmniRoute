import assert from "node:assert/strict";

type Catalog = Pick<
  typeof import("../../src/app/api/v1/models/catalog.ts"),
  | "getUnifiedModelsResponse"
  | "__flushCatalogBackgroundRefreshForTest"
  | "__getCatalogBuilderRunsForTest"
>;

export async function getSettledModelCatalogResponse(
  catalog: Catalog,
  request = new Request("http://localhost/api/v1/models")
): Promise<Response> {
  const response = await catalog.getUnifiedModelsResponse(request);
  if (response.status !== 503 || response.headers.get("x-omniroute-catalog") !== "build-timeout") {
    return response;
  }

  // These fixtures validate catalog contents. Let the same cold build finish
  // after a loaded runner reaches the endpoint's response deadline.
  const runs = catalog.__getCatalogBuilderRunsForTest();
  await catalog.__flushCatalogBackgroundRefreshForTest();
  const settled = await catalog.getUnifiedModelsResponse(request);
  assert.equal(
    catalog.__getCatalogBuilderRunsForTest(),
    runs,
    "catalog fixture must read the same completed build"
  );
  return settled;
}
