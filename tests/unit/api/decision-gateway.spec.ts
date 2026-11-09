import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("@/shared/network/safeOutboundFetch", () => ({ safeOutboundFetch: vi.fn() }));
vi.mock("@/shared/network/outboundUrlGuardPolicy", () => ({
  getProviderOutboundGuard: () => "public-only",
}));
vi.mock("@/lib/db/settings", () => ({ resolveProxyForConnection: vi.fn(async () => null) }));

import {
  createDecisionGateway,
  type DecisionGatewayRuntime,
  type DecisionAttempt,
} from "../../../open-sse/handlers/decisionGateway";
import {
  resolveDecisionBackend,
  splitDecisionModel,
  decisionConnectionSchema,
} from "../../../open-sse/config/decisionRegistry";
import {
  DecisionError,
  type DecisionFormat,
  type DecisionCredentials,
} from "../../../open-sse/handlers/decisionTypes";
import { readDecisionJson, DECISION_MAX_BYTES } from "../../../open-sse/handlers/decisionTransport";
import { fetchDecision } from "@/lib/providers/decisionFetch";
import { validateDecisionRequest } from "../../../open-sse/handlers/decisionValidation";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { applyOllamaShowCapabilities } from "@/lib/providerModels/ollamaCapabilities";
import { classifyModelSupportedEndpoints } from "@/shared/constants/modelSupportedEndpoints";
import { resolveEndpointCategory } from "@/shared/constants/endpointCategories";

const input = {
  model: "openai/gpt-6-luna",
  input: "PRIVATE_INPUT",
  questions: [{ type: "predicate", name: "ok", instructions: "Is it safe?" }],
};
const state = {
  model: "basal/current",
  state: { ticket: "PRIVATE_INPUT" },
  questions: { ok: { type: "noul", instructions: "Safe?" } },
};
const native = {
  model: "current",
  answers: { ok: { type: "noul", noul: 0.93 } },
  usage: { input_tokens: 10, output_tokens: 0 },
};
const openai = {
  model: "gpt-6-luna",
  answers: [{ type: "predicate", name: "ok", probability: 0.93 }],
  usage: { input_tokens: 10, output_tokens: 0 },
};
function request(body: unknown, format: DecisionFormat = "systemone", signal?: AbortSignal) {
  return new Request(`http://gateway/v1/${format}`, {
    method: "POST",
    headers: { Authorization: "Bearer client-test" },
    body: JSON.stringify(body),
    signal,
  });
}
function setup(
  overrides: Partial<DecisionGatewayRuntime> = {},
  config: Record<string, unknown> = {}
) {
  const observations: DecisionAttempt[] = [];
  const calls: { url: string; body: unknown }[] = [];
  const credentials: DecisionCredentials = {
    apiKey: "upstream-test",
    connectionId: "allowed",
    providerSpecificData: config,
  };
  const runtime: DecisionGatewayRuntime = {
    authorize: vi.fn(async () => null),
    select: vi.fn(async (_request, provider) => ({
      backend: resolveDecisionBackend(provider, credentials),
      credentials,
    })),
    fetch: vi.fn(async (url, _credentials, init) => {
      const body = init.body ? JSON.parse(String(init.body)) : null;
      calls.push({ url, body });
      if (url.endsWith("/api/tags"))
        return Response.json({ models: [{ name: "clef:27b" }, { name: "chat-only" }] });
      if (url.endsWith("/api/show"))
        return Response.json({
          capabilities: body.model === "chat-only" ? ["completion"] : ["decision", "vision"],
        });
      if (init.method !== "POST")
        return Response.json({ data: [{ id: "gpt-6-luna" }, { id: "current" }] });
      return Response.json(body.input !== undefined ? openai : native);
    }),
    observe: vi.fn(async (_request, attempt) => {
      observations.push(attempt);
    }),
    feedback: vi.fn(async () => {}),
    error: (status, message) => Response.json({ error: { message } }, { status }),
    ...overrides,
  };
  return { runtime, post: createDecisionGateway(runtime), observations, calls };
}

describe("native decision contracts", () => {
  it("preserves OpenAI predicate, typed choices, score, messages, cache options and probabilities", async () => {
    const s = setup();
    const body = {
      ...input,
      input: [
        {
          role: "user",
          content: [
            { type: "input_json", data: { ok: true } },
            { type: "input_image", image_url: "https://example.com/test.png" },
          ],
        },
      ],
      prompt_cache_options: { mode: "explicit", ttl: "30m" },
      questions: [
        ...input.questions,
        {
          type: "choice",
          name: "choice",
          instructions: "Pick",
          choices: [{ value: "true" }, { value: true }],
        },
        {
          type: "score",
          name: "score",
          instructions: "Rate",
          levels: [{ label: "low" }, { label: "high" }],
        },
      ],
    };
    const result = await s.post(request(body, "decisions"), "decisions");
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual(openai);
    expect(s.calls.at(-1)).toEqual({
      url: "https://api.openai.com/v1/decisions",
      body: { ...body, model: "gpt-6-luna" },
    });
    expect(result.headers.get("X-OmniRoute-Cost-Status")).toBe("unknown");
    expect(s.observations[0]).not.toHaveProperty("input");
    expect(JSON.stringify(s.observations)).not.toContain("PRIVATE_INPUT");
    expect(JSON.stringify(s.observations)).not.toContain("upstream-test");
  });
  it("does not inspect an unrelated broken Ollama model during inference", async () => {
    const inspected: string[] = [];
    const s = setup({
      fetch: vi.fn(async (url, _credentials, init) => {
        if (url.endsWith("/api/tags"))
          return Response.json({ models: [{ name: "clef:27b" }, { name: "removed-chat" }] });
        if (url.endsWith("/api/show")) {
          const model = JSON.parse(String(init.body)).model;
          inspected.push(model);
          return model === "clef:27b"
            ? Response.json({ capabilities: ["decision"] })
            : new Response(null, { status: 404 });
        }
        return Response.json(native);
      }),
    });
    const response = await s.post(
      request({ ...state, model: "ollama-cloud/clef:27b" }),
      "systemone"
    );
    expect(response.status).toBe(200);
    expect(inspected).toEqual(["clef:27b"]);
  });
  it("rejects inference if the requested Ollama capability lookup fails", async () => {
    const fetch = vi.fn(async (url: string) =>
      url.endsWith("/api/tags")
        ? Response.json({ models: [{ name: "clef:27b" }] })
        : new Response(null, { status: 404 })
    );
    const s = setup({ fetch });
    const response = await s.post(
      request({ ...state, model: "ollama-cloud/clef:27b" }),
      "systemone"
    );
    expect(response.status).toBe(404);
    expect(fetch.mock.calls.map(([url]) => new URL(url).pathname)).toEqual([
      "/api/tags",
      "/api/show",
    ]);
  });
  it("forwards a native structured OpenAI input without conversion", async () => {
    const s = setup();
    const body = {
      ...input,
      input: { role: "user", content: [{ type: "input_text", text: "ticket" }] },
    };
    expect((await s.post(request(body, "decisions"), "decisions")).status).toBe(200);
    expect(s.calls.at(-1)?.body).toEqual({ ...body, model: "gpt-6-luna" });
  });
  it("preserves a native empty OpenAI answers array", async () => {
    const response = { ...openai, answers: [] };
    const s = setup({
      fetch: vi.fn(async (_url, _c, init) =>
        Response.json(init.method === "POST" ? response : { data: [{ id: "gpt-6-luna" }] })
      ),
    });
    const result = await s.post(request(input, "decisions"), "decisions");
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual(response);
  });
  it("preserves named System One questions and native confidence/refusal fields", async () => {
    const response = {
      ...native,
      answers: {
        ok: {
          type: "choice",
          choice: null,
          refused: "yes",
          deferred: true,
          probabilities: { yes: 0.4, no: 0.6 },
          confidence: 0.6,
        },
      },
    };
    const s = setup({
      fetch: vi.fn(async (_url, _credentials, init) =>
        init.method === "POST"
          ? Response.json(response)
          : Response.json({ models: [{ name: "current" }] })
      ),
    });
    const result = await s.post(request(state), "systemone");
    expect(await result.json()).toEqual(response);
  });
  it("preserves OpenAI refusal without inventing an answer", async () => {
    const refused = {
      ...openai,
      answers: [{ type: "refusal", name: "ok" }],
    };
    const s = setup({
      fetch: vi.fn(async (_u, _c, init) =>
        Response.json(init.method === "POST" ? refused : { data: [{ id: "gpt-6-luna" }] })
      ),
    });
    expect(await (await s.post(request(input, "decisions"), "decisions")).json()).toEqual(refused);
  });
  it("validates mixed named noul, choice and score questions", () => {
    const body = {
      ...state,
      questions: {
        ...state.questions,
        c: { type: "choice", instructions: "Pick", criteria: { a: "A", b: "B" } },
        s: { type: "score", instructions: "Rate", criteria: ["low", "high"] },
      },
    };
    expect(validateDecisionRequest("systemone", body)).toEqual(body);
  });
  it.each([
    null,
    [],
    {},
    { ...input, questions: {} },
    { ...input, questions: [] },
    { ...input, input: null },
    {
      ...input,
      questions: [
        { type: "choice", instructions: "Pick", choices: [{ value: "same" }, { value: "same" }] },
      ],
    },
  ])("rejects invalid Decisions bodies", (body) => {
    expect(() => validateDecisionRequest("decisions", body)).toThrow(DecisionError);
  });
  it.each([
    { ...state, questions: [] },
    { ...state, questions: {} },
    { ...state, questions: { x: { type: "unknown" } } },
    { ...state, state: undefined },
  ])("rejects invalid System One bodies", (body) => {
    expect(() => validateDecisionRequest("systemone", body)).toThrow(DecisionError);
  });
  it("rejects incompatible protocols before inference", async () => {
    const s = setup();
    expect(
      (await s.post(request({ ...input, model: "basal/current" }, "decisions"), "decisions")).status
    ).toBe(400);
    expect(s.runtime.fetch).not.toHaveBeenCalled();
  });
});

describe("provider selection and discovery", () => {
  it.each(["basal", "ollama-local", "julia-local"])(
    "routes %s through its configured native transport",
    async (provider) => {
      const config =
        provider === "julia-local"
          ? {
              decision: {
                format: "systemone",
                endpoint: "http://julia:9001/custom/ask",
                models: ["julia-1"],
              },
            }
          : {};
      const model =
        provider === "ollama-local"
          ? "clef:27b"
          : provider === "julia-local"
            ? "julia-1"
            : "current";
      const s = setup({}, config);
      const result = await s.post(
        request({ ...state, model: `${provider}/${model}` }),
        "systemone"
      );
      expect(result.status).toBe(200);
      expect(s.calls.at(-1)?.body).toEqual({ ...state, model });
      expect(s.calls.at(-1)?.url).toBe(
        provider === "julia-local"
          ? "http://julia:9001/custom/ask"
          : provider === "basal"
            ? "http://localhost:8000/v1/systemone"
            : "http://localhost:11434/v1/systemone"
      );
    }
  );
  it("uses configured container hostname and port", () => {
    expect(
      resolveDecisionBackend("ollama-local", {
        providerSpecificData: { baseUrl: "http://ollama:9911/v1" },
      }).url
    ).toBe("http://ollama:9911/v1/systemone");
  });
  it.each(["unknown/model", "openai/unknown", "ollama-local/chat-only", "ollama-local/missing"])(
    "rejects unknown or non-decision model %s",
    async (model) => {
      const s = setup();
      const format = model.startsWith("openai") ? "decisions" : "systemone";
      const result = await s.post(
        request({ ...(format === "decisions" ? input : state), model }, format),
        format
      );
      expect([400, 404]).toContain(result.status);
      expect(s.calls.filter((c) => c.body && !c.url.endsWith("/api/show"))).toHaveLength(0);
    }
  );
  it("does not guess Julia's HTTP endpoint", () => {
    expect(() => resolveDecisionBackend("julia-local", {})).toThrow(DecisionError);
  });
  it("supports opt-in future System One engines without changing HTTP routes", () => {
    expect(
      resolveDecisionBackend("future", {
        providerSpecificData: {
          decision: { format: "systemone", endpoint: "https://example.com/ask", models: ["v2"] },
        },
      }).models
    ).toEqual(["v2"]);
  });
  it("classifies decision-only and mixed models accurately", () => {
    expect(classifyModelSupportedEndpoints(["systemone"])).toEqual({ type: "decisions" });
    expect(classifyModelSupportedEndpoints(["systemone", "chat"])).toEqual({});
    expect(
      applyOllamaShowCapabilities({ id: "new" }, { capabilities: ["decision"] }).supportedEndpoints
    ).toEqual(["systemone"]);
    expect(resolveEndpointCategory("/v1/systemone")).toBe("decisions");
    expect(resolveEndpointCategory("/v1/decisions")).toBe("decisions");
  });
});

describe("reliability and security", () => {
  beforeEach(() => vi.clearAllMocks());
  it.each([401, 403, 429])(
    "respects auth, endpoint, model and key rate rejection %s",
    async (status) => {
      const s = setup({ authorize: vi.fn(async () => new Response(null, { status })) });
      expect((await s.post(request(state), "systemone")).status).toBe(status);
      expect(s.runtime.select).not.toHaveBeenCalled();
      expect(s.runtime.fetch).not.toHaveBeenCalled();
    }
  );
  it.each([403, 429, 503])(
    "respects scope, cooldown or disabled-connection rejection %s",
    async (status) => {
      const s = setup({
        select: vi.fn(async () => {
          throw new DecisionError(status, "connection_unavailable");
        }),
      });
      expect((await s.post(request(state), "systemone")).status).toBe(status);
      expect(s.runtime.fetch).not.toHaveBeenCalled();
    }
  );
  it.each([401, 403, 404, 429, 500])(
    "sanitizes upstream HTTP %s without leaking its body",
    async (status) => {
      const s = setup({
        fetch: vi.fn(async (_url, _c, init) =>
          init.method === "POST"
            ? new Response("PRIVATE_INPUT upstream-test", { status })
            : Response.json({ models: [{ name: "current" }] })
        ),
      });
      const result = await s.post(request(state), "systemone");
      expect(result.status).toBe(status);
      expect(await result.text()).not.toMatch(/PRIVATE_INPUT|upstream-test/);
      expect(s.observations[0].failure).toBe(`upstream_http_${status}`);
      expect(s.runtime.feedback).toHaveBeenCalledOnce();
    }
  );
  it("handles malformed upstream JSON", async () => {
    const s = setup({ fetch: vi.fn(async () => new Response("not json")) });
    expect((await s.post(request(state), "systemone")).status).toBe(502);
    expect(s.observations[0].failure).toBe("invalid_json");
  });
  it("handles connection failure without replay", async () => {
    const s = setup({
      fetch: vi.fn(async () => {
        throw new Error("PRIVATE_INPUT upstream-test");
      }),
    });
    expect((await s.post(request(state), "systemone")).status).toBe(502);
    expect(s.runtime.fetch).toHaveBeenCalledOnce();
  });
  it("times out even when the response headers arrived but its body stalled", async () => {
    const s = setup(
      {
        fetch: vi.fn(
          async () =>
            new Response(
              new ReadableStream({
                start(controller) {
                  controller.enqueue(new TextEncoder().encode("{"));
                },
              })
            )
        ),
      },
      {
        decision: {
          format: "systemone",
          endpoint: "http://test/ask",
          models: ["current"],
          timeoutMs: 100,
        },
      }
    );
    const result = await s.post(request(state), "systemone");
    expect(result.status).toBe(504);
    expect(s.observations[0].failure).toBe("timeout");
  });
  it("respects caller cancellation", async () => {
    const controller = new AbortController();
    const s = setup({
      fetch: vi.fn(async () => {
        controller.abort();
        throw new Error("abort");
      }),
    });
    expect((await s.post(request(state, "systemone", controller.signal), "systemone")).status).toBe(
      499
    );
    expect(s.runtime.fetch).toHaveBeenCalledOnce();
  });
  it("only falls back when explicitly configured and rechecks target policy", async () => {
    const s = setup(
      {},
      {
        decision: {
          format: "systemone",
          endpoint: "http://primary/ask",
          models: ["current"],
          fallbackModels: ["basal/secondary"],
        },
      }
    );
    s.runtime.fetch = vi.fn(async (_url, _c, init) => {
      const body = JSON.parse(String(init.body));
      return body.model === "current" ? new Response(null, { status: 503 }) : Response.json(native);
    });
    // Both models are explicitly available on the selected connection.
    s.runtime.select = vi.fn(async (_r, provider) => ({
      backend: {
        ...resolveDecisionBackend(provider, {
          providerSpecificData: {
            decision: {
              format: "systemone",
              endpoint: "http://primary/ask",
              models: ["current", "secondary"],
              fallbackModels: ["basal/secondary"],
            },
          },
        }),
      },
      credentials: {},
    }));
    const result = await createDecisionGateway(s.runtime)(request(state), "systemone");
    expect(result.status).toBe(200);
    expect(s.runtime.authorize).toHaveBeenCalledWith(expect.any(Request), "basal/secondary");
    expect(result.headers.get("X-OmniRoute-Fallback-Attempts")).toBe("1");
  });
  it("records exact reported zero cost, never a fabricated local price", async () => {
    const s = setup({
      fetch: vi.fn(async (_url, _c, init) =>
        Response.json(
          init.method === "POST"
            ? { ...native, usage: { cost: 0 } }
            : { models: [{ name: "current" }] }
        )
      ),
    });
    const result = await s.post(request(state), "systemone");
    expect(result.headers.get("X-OmniRoute-Response-Cost")).toBe("0");
    expect(s.observations[0].cost).toBe(0);
  });
  it("bounds request and response streams", async () => {
    const chunks = new ReadableStream({
      start(c) {
        c.enqueue(new Uint8Array(DECISION_MAX_BYTES + 1));
        c.close();
      },
    });
    await expect(readDecisionJson(new Response(chunks))).rejects.toMatchObject({
      category: "payload_too_large",
    });
    const s = setup();
    const r = request(state);
    r.headers.set("content-length", String(DECISION_MAX_BYTES + 1));
    expect((await s.post(r, "systemone")).status).toBe(413);
    expect(s.runtime.select).not.toHaveBeenCalled();
  });
  it.each([
    "http://169.254.169.254/latest/meta-data",
    "http://metadata.google.internal/computeMetadata/v1/",
    "file:///etc/passwd",
    "http://user:password@localhost:8000/",
  ])("blocks metadata, non-HTTP and embedded credentials %s", async (url) => {
    await expect(fetchDecision(url, {}, {})).rejects.toThrow();
    expect(safeOutboundFetch).not.toHaveBeenCalled();
  });
  it("uses the established guard and disables redirects/retries", async () => {
    vi.mocked(safeOutboundFetch).mockResolvedValue(Response.json({}));
    await fetchDecision("http://basal:8000/v1/systemone", {}, {});
    expect(safeOutboundFetch).toHaveBeenCalledWith(
      "http://basal:8000/v1/systemone",
      expect.objectContaining({ guard: "public-only", allowRedirect: false, retry: false })
    );
  });
  it("rejects bad configuration and malformed model IDs", () => {
    expect(
      decisionConnectionSchema.safeParse({ format: "chat", endpoint: "http://test" }).success
    ).toBe(false);
    for (const id of ["clef", "basal/", "/foo", "basal/x?url=evil"])
      expect(() => splitDecisionModel(id)).toThrow();
  });
});

describe("provider-independent decision connections", () => {
  it.each(["decisions", "systemone"])(
    "resolves a compatible %s server without a provider allowlist",
    (apiType) => {
      const backend = resolveDecisionBackend("openai-compatible-custom", {
        providerSpecificData: {
          apiType,
          baseUrl: "https://decider.example/v1",
          modelsPath: "/catalog",
        },
      });
      expect(backend.format).toBe(apiType);
      expect(backend.url).toBe(`https://decider.example/v1/${apiType}`);
      expect(backend.modelsUrl).toBe("https://decider.example/v1/catalog");
    }
  );
  it("supports an explicitly configured arbitrary hosted engine", () => {
    expect(
      resolveDecisionBackend("custom-julia", {
        providerSpecificData: {
          decision: {
            format: "systemone",
            endpoint: "https://julia.example/judge",
            models: ["julia-1"],
          },
        },
      }).models
    ).toEqual(["julia-1"]);
  });
  it("routes Ollama Cloud through its native capability discovery", () => {
    expect(resolveDecisionBackend("ollama-cloud", {})).toMatchObject({
      url: "https://ollama.com/v1/systemone",
      modelsUrl: "https://ollama.com/api/tags",
      discovery: "ollama",
    });
  });
});

describe("Cloudflare System One transport", () => {
  it("uses discovered names, model-specific Workers URL and unwraps native answers", async () => {
    const fetcher = vi.fn(async (url: string, _credentials: unknown, init: RequestInit) => {
      if (init.method !== "POST")
        return Response.json({
          success: true,
          result: [{ id: "opaque-id", name: "@cf/cloudflare/clef" }, { name: "@cf/meta/chat" }],
        });
      expect(url).toBe(
        "https://api.cloudflare.com/client/v4/accounts/account-test/ai/run/%40cf/cloudflare/clef"
      );
      expect(JSON.parse(String(init.body)).model).toBe("clef");
      return Response.json({ success: true, result: native });
    });
    const s = setup({ fetch: fetcher }, { accountId: "account-test" });
    const response = await s.post(
      request({ ...state, model: "cloudflare-ai/@cf/cloudflare/clef" }),
      "systemone"
    );
    expect(response.status).toBe(200);
    expect((await response.json()).answers).toEqual(native.answers);
    expect(s.observations[0].cost).toBeNull();
  });
});

it("normal Cloudflare import classifies native decision models before exposing them", async () => {
  const { parseCloudflareModelsSearch } =
    await import("../../../src/app/api/providers/[id]/models/discovery/cloudflareModels");
  expect(
    parseCloudflareModelsSearch({
      result: [{ name: "@cf/cloudflare/clef", task: { name: "Text Generation" } }],
    })[0]
  ).toMatchObject({
    id: "@cf/cloudflare/clef",
    supportedEndpoints: ["systemone"],
    modelType: "decisions",
    apiFormat: "systemone",
  });
});

it("adds a unique idempotency key to each native inference attempt", async () => {
  const headers: string[] = [];
  const s = setup({
    fetch: vi.fn(async (_url, _credentials, init) => {
      if (init.method !== "POST") return Response.json({ data: [{ id: "current" }] });
      const key = new Headers(init.headers).get("Idempotency-Key");
      expect(key).toMatch(/^[0-9a-f-]{36}$/);
      headers.push(key!);
      return Response.json(native);
    }),
  });
  expect((await s.post(request(state), "systemone")).status).toBe(200);
  expect((await s.post(request(state), "systemone")).status).toBe(200);
  expect(new Set(headers).size).toBe(2);
});
