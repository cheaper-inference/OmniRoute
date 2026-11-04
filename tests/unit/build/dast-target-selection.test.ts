import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import Ajv from "ajv";
import { parse } from "yaml";

type Step = { name?: string; run?: string; env?: Record<string, string> };
const root = new URL("../../../", import.meta.url);
const read = (name: string) => fs.readFileSync(new URL(name, root), "utf8");
const workflow = parse(read(".github/workflows/dast-smoke.yml")) as {
  jobs: Record<string, { env?: Record<string, string>; steps: Step[] }>;
};
const job = workflow.jobs["dast-smoke"];
const startup = job.steps.find((step) => step.name === "Start OmniRoute and require health")!;
const scanner = job.steps.find((step) => step.name?.startsWith("Schemathesis smoke"))!;
const promptfoo = job.steps.find((step) => step.name === "promptfoo injection-guard (blocking)")!;
const schema = parse(read("docs/openapi.yaml")) as {
  paths: Record<string, Record<string, unknown>>;
  components: {
    responses: Record<
      string,
      { content: { "application/json": { schema: Record<string, unknown> & { $ref?: string } } } }
    >;
    schemas: Record<string, Record<string, unknown>>;
  };
};
const promptConfig = parse(read("promptfooconfig.yaml")) as {
  providers: { config: { validateStatus: string } }[];
  tests: { vars: { prompt: string }; assert: { type: string; value: string }[] }[];
};
const environmentKeys = [
  "DATA_DIR",
  "NODE_ENV",
  "API_KEY_SECRET",
  "JWT_SECRET",
  "REQUIRE_API_KEY",
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "INJECTION_GUARD_MODE",
];
const previousEnvironment = new Map(environmentKeys.map((key) => [key, process.env[key]]));
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dast-auth-"));
process.env.DATA_DIR = directory;
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "test-dast-auth-fixture-only";
process.env.REQUIRE_API_KEY = startup.env?.REQUIRE_API_KEY ?? "";
process.env.OMNIROUTE_API_KEY = startup.env?.OMNIROUTE_API_KEY ?? "";
process.env.INJECTION_GUARD_MODE = startup.env?.INJECTION_GUARD_MODE ?? "";
delete process.env.ROUTER_API_KEY;
delete process.env.JWT_SECRET;
const core = await import("../../../src/lib/db/core.ts");
const keys = await import("../../../src/lib/db/apiKeys.ts");
const { clientApiPolicy } = await import("../../../src/server/authz/policies/clientApi.ts");
const { enforceClientApiRouteAuth } =
  await import("../../../src/shared/utils/clientApiRouteAuth.ts");
const { createInjectionGuard } = await import("../../../src/middleware/promptInjectionGuard.ts");

test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(directory, { recursive: true, force: true });
  for (const [key, value] of previousEnvironment) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function selectedOperations(include: RegExp, exclude: RegExp): string[] {
  const methods = new Set(["get", "post", "put", "patch", "delete", "head", "options", "trace"]);
  return Object.entries(schema.paths)
    .flatMap(([pathname, operations]) =>
      include.test(pathname) && !exclude.test(pathname)
        ? Object.keys(operations)
            .filter((method) => methods.has(method))
            .map((method) => `${method.toUpperCase()} ${pathname}`)
        : []
    )
    .sort();
}

function requestFor(pathname: string, credential?: string): Request {
  return new Request(`http://localhost${pathname}`, {
    method: pathname.endsWith("/models") ? "GET" : "POST",
    ...(pathname.endsWith("/models")
      ? {}
      : { body: JSON.stringify({ model: "fixture", messages: [] }) }),
    headers: credential === undefined ? {} : { authorization: `Bearer ${credential}` },
  });
}

async function policyFor(request: Request) {
  return clientApiPolicy.evaluate({
    request,
    classification: {
      routeClass: "CLIENT_API",
      reason: "client_api_v1",
      normalizedPath: new URL(request.url).pathname,
    },
    requestId: "dast-fixture-test",
  });
}

test("DAST selects both documented inference operations and preserves the management set", () => {
  const include = new RegExp(scanner.run!.match(/--include-path-regex '([^']+)'/)![1]);
  const exclude = new RegExp(scanner.run!.match(/--exclude-path-regex '([^']+)'/)![1]);
  const old = selectedOperations(/^\/v1\/(chat\/completions|models)$|^\/api\/(auth|keys)/, exclude);
  const selected = selectedOperations(include, exclude);
  assert.ok(old.length > 0, "the documented management set must not be empty");
  assert.equal(selected.length, old.length + 2);
  assert.ok(old.every((operation) => selected.includes(operation)));
  assert.deepEqual(
    selected.filter((operation) => !old.includes(operation)),
    ["GET /api/v1/models", "POST /api/v1/chat/completions"]
  );
  assert.ok(selected.every((operation) => !/ \/api\/auth\/(oidc\/|login)/.test(operation)));
});

test("DAST requires inference auth and scopes the synthetic fixture to startup and promptfoo", () => {
  assert.equal(startup.env?.REQUIRE_API_KEY, "true");
  assert.match(startup.env?.OMNIROUTE_API_KEY ?? "", /^ci-dast-.*-fixture$/);
  assert.equal(promptfoo.env?.OMNIROUTE_API_KEY, startup.env?.OMNIROUTE_API_KEY);
  assert.equal(job.env?.OMNIROUTE_API_KEY, undefined);
  assert.equal(scanner.env?.OMNIROUTE_API_KEY, undefined);
  assert.doesNotMatch(scanner.run!, /--(?:header|auth|request-tls-cert)\b|Bearer|Authorization/i);
  for (const step of job.steps.filter((step) => step !== startup && step !== promptfoo)) {
    assert.equal(step.env?.OMNIROUTE_API_KEY, undefined);
  }
  assert.equal(job.steps.filter((step) => step.env?.REQUIRE_API_KEY === "false").length, 0);
});

test("the DAST configuration rejects missing inference credentials before a body is consumed", async () => {
  for (const pathname of ["/api/v1/models", "/api/v1/chat/completions"]) {
    const request = requestFor(pathname);
    const outcome = await policyFor(request);
    assert.equal(outcome.allow, false);
    if (!outcome.allow) assert.equal(outcome.status, 401);
    const response = await enforceClientApiRouteAuth(request);
    assert.equal(response?.status, 401);
    assert.equal(request.bodyUsed, false);
  }
});

test("the DAST configuration rejects an invalid inference credential", async () => {
  for (const pathname of ["/api/v1/models", "/api/v1/chat/completions"]) {
    const request = requestFor(pathname, "invalid-dast-fixture");
    const outcome = await policyFor(request);
    assert.equal(outcome.allow, false);
    if (!outcome.allow) assert.equal(outcome.status, 401);
    assert.equal((await enforceClientApiRouteAuth(request))?.status, 401);
  }
});

test("the promptfoo fixture passes auth and its real prompts still trigger the injection guard", async () => {
  const fixture = promptfoo.env?.OMNIROUTE_API_KEY;
  assert.ok(fixture && fixture === startup.env?.OMNIROUTE_API_KEY);
  const request = requestFor("/api/v1/chat/completions", fixture);
  assert.equal((await policyFor(request)).allow, true);
  assert.equal(await enforceClientApiRouteAuth(request), null);
  const guard = createInjectionGuard({ logger: null });
  assert.equal(promptConfig.tests.length, 2);
  for (const scenario of promptConfig.tests) {
    assert.equal(
      guard({ model: "gpt-4o-mini", messages: [{ role: "user", content: scenario.vars.prompt }] })
        .blocked,
      true
    );
  }
});

test("promptfoo retains its HTTP 400 and SECURITY_001 assertions", () => {
  assert.equal(promptConfig.providers[0].config.validateStatus, "status === 400");
  assert.ok(
    promptConfig.tests.every((scenario) =>
      scenario.assert.some(
        (assertion) =>
          assertion.type === "javascript" &&
          assertion.value.includes("body.error.code === 'SECURITY_001'")
      )
    )
  );
  assert.equal(
    promptfoo.run,
    "./node_modules/.bin/promptfoo eval -c promptfooconfig.yaml --no-cache"
  );
});

test("the real proxy requires credentials before the optional models handler gate", async () => {
  const { NextRequest } = await import("next/server");
  const { unstable_doesMiddlewareMatch } = await import("next/experimental/testing/server");
  const { proxy, config } = await import("../../../src/proxy.ts");
  const { updateSettings } = await import("../../../src/lib/db/settings.ts");
  const { getModelCatalogAuthRejection } =
    await import("../../../src/app/api/v1/models/catalogRequest.ts");
  const { AUTHZ_HEADER_ROUTE_CLASS } = await import("../../../src/server/authz/headers.ts");
  assert.ok(config.matcher.includes("/api/:path*"));
  assert.equal(startup.env?.OMNIROUTE_BASE_PATH, undefined);
  assert.equal(job.env?.OMNIROUTE_BASE_PATH, undefined);
  assert.match(
    read("next.config.mjs"),
    /source:\s*"\/v1\/:path\*",\s*destination:\s*"\/api\/v1\/:path\*"/
  );
  await updateSettings({ requireAuthForModels: false });
  for (const pathname of [
    "/api/v1/models",
    "/api/v1/chat/completions",
    "/v1/models",
    "/v1/chat/completions",
  ]) {
    // Compile the actual source matcher before evaluating the original URL: no post-rewrite assumption.
    assert.equal(
      unstable_doesMiddlewareMatch({
        config,
        url: `http://localhost${pathname}`,
        nextConfig: { basePath: "" },
      }),
      true
    );
    for (const credential of [undefined, "invalid-dast-fixture"]) {
      const request = new NextRequest(requestFor(pathname, credential));
      const response = await proxy(request);
      assert.equal(response.status, 401);
      assert.equal(response.headers.get(AUTHZ_HEADER_ROUTE_CLASS), "CLIENT_API");
      assert.equal((await response.json()).error.code, "AUTH_002");
      assert.equal(request.bodyUsed, false);
    }
  }
  assert.equal(
    await getModelCatalogAuthRejection(
      requestFor("/api/v1/models"),
      { requireAuthForModels: false },
      {}
    ),
    null
  );
});

test("both inference 401 contracts validate the real proxy envelope and reject malformed errors", async () => {
  const { NextRequest } = await import("next/server");
  const { proxy } = await import("../../../src/proxy.ts");
  for (const [pathname, method] of [
    ["/api/v1/models", "get"],
    ["/api/v1/chat/completions", "post"],
  ]) {
    const operation = schema.paths[pathname][method] as {
      responses: Record<string, { $ref: string }>;
    };
    const responseReference = operation.responses["401"]?.$ref;
    assert.match(responseReference, /^#\/components\/responses\/[^/]+$/);
    const responseContract = schema.components.responses[responseReference.split("/").at(-1)!];
    const declared = responseContract.content["application/json"].schema;
    let bodySchema = declared;
    if (declared.$ref) {
      assert.match(declared.$ref, /^#\/components\/schemas\/[^/]+$/);
      bodySchema = schema.components.schemas[declared.$ref.split("/").at(-1)!];
    }
    const validate = new Ajv({ strict: true })
      .addKeyword({ keyword: "example", valid: true })
      .compile(bodySchema);
    for (const credential of [undefined, "invalid-dast-fixture"]) {
      const response = await proxy(new NextRequest(requestFor(pathname, credential)));
      assert.equal(response.status, 401);
      assert.equal(validate(await response.json()), true);
    }
    for (const malformed of [{}, { error: "Unauthorized" }, { error: { code: "AUTH_002" } }]) {
      assert.equal(validate(malformed), false);
    }
  }
});
