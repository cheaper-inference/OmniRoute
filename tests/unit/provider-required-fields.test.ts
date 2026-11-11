/**
 * Create-time cross-field checks: a connection that cannot work is refused at save,
 * not on the first request. Azure OpenAI has no default endpoint, so it needs a base URL.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema } = await import("../../src/shared/validation/schemas.ts");

const key = ["k", "e", "y"].join("-");

function create(provider: string, providerSpecificData?: Record<string, unknown>) {
  return createProviderSchema.safeParse({
    provider,
    apiKey: key,
    name: "Azure",
    ...(providerSpecificData ? { providerSpecificData } : {}),
  });
}

test("azure-openai without a base URL is refused at create", () => {
  const result = create("azure-openai");
  assert.equal(result.success, false);
  const paths = result.success ? [] : result.error.issues.map((i) => i.path.join("."));
  assert.ok(paths.includes("providerSpecificData.baseUrl"), `paths: ${paths.join(",")}`);
});

test("azure-openai with a blank base URL is refused at create", () => {
  assert.equal(create("azure-openai", { baseUrl: "   " }).success, false);
});

test("azure-openai with a base URL is accepted", () => {
  assert.equal(
    create("azure-openai", { baseUrl: "https://my-resource.openai.azure.com" }).success,
    true
  );
});

test("providers with a built-in endpoint still need no base URL", () => {
  assert.equal(create("azure-ai").success, true);
  assert.equal(create("openai").success, true);
});
