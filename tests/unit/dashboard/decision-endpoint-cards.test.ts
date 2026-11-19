import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  "src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx",
  "utf8"
);
test("the dashboard renders and counts all three public decision routes", () => {
  const catalog = source.match(/const DECISION_ENDPOINTS = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  assert.deepEqual(
    [...catalog.matchAll(/path: "([^"]+)"/g)].map((m) => m[1]),
    ["/v1/decisions", "/v1beta/decisions", "/v1/systemone"]
  );
  assert.match(source, /DECISION_ENDPOINTS\.map\([\s\S]*?<EndpointCard[\s\S]*?path=\{path\}/);
  assert.match(source, /const availableEndpointCount[\s\S]*?\+\s*DECISION_ENDPOINTS\.length/);
});

test("Messages uses the chat catalogue with the same loading state", () => {
  assert.match(
    source,
    /path="\/v1\/messages"\s+models=\{endpointData\.chat\}\s+modelsLoading=\{modelsLoading\}/
  );
});

test("decision cards use the endpoint-specific count", () => {
  assert.match(source, /modelCount=\{decisionEndpointModelCount\(allModels, path\)\}/);
});
