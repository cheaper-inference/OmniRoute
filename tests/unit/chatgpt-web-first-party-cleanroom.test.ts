import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { isChatGptWebBridgeFailure } from "../../open-sse/utils/chatgptWebBridgeFailure.ts";
import {
  buildChatGptWebBridgeInstallerSource,
  buildChatGptWebIntegrityResolutionSource,
  collectChatGptWebFirstPartyAssetCandidates,
  collectPageAssetCandidates,
  assertChatGptWebSignedIn,
  executeChatGptWebFirstPartyTurn,
  extractChatGptWebFirstPartyAssetReferences,
  parseChatGptWebFirstPartyModuleContract,
  type ChatGptWebFirstPartyModuleContract,
  type ChatGptWebFirstPartyRequest,
} from "../../open-sse/utils/chatgptWebFirstParty.ts";
import type { ChatGptWebResolvedAttachment } from "../../open-sse/utils/chatgptWebAttachments.ts";

type SafePost = (path: string, options: Record<string, unknown>) => Promise<unknown>;

const BRIDGE_KEY = "__omnirouteChatGptFirstPartyV1";
const ABORT_KEY = "__omnirouteChatGptAbortV1";

function createDirectPage(): import("playwright").Page {
  return {
    async evaluate(
      pageFunction: (argument: unknown) => unknown | Promise<unknown>,
      argument: unknown
    ) {
      return pageFunction(argument);
    },
  } as unknown as import("playwright").Page;
}

function installFirstPartyBridge(safePost: SafePost): () => void {
  const root = globalThis as typeof globalThis & Record<string, unknown>;
  const previousBridge = root[BRIDGE_KEY];
  const previousAbortStore = root[ABORT_KEY];
  root[BRIDGE_KEY] = {
    finalizeRequirements: async () => ({}),
    proofManager: { getEnforcementToken: async () => "proof" },
    turnstileManager: { getEnforcementToken: async () => "turnstile" },
    requestClient: { safePost },
    buildSentinelHeaders: () => ({ "OpenAI-Sentinel-Proof-Token": "proof" }),
  };
  return () => {
    if (previousBridge === undefined) delete root[BRIDGE_KEY];
    else root[BRIDGE_KEY] = previousBridge;
    if (previousAbortStore === undefined) delete root[ABORT_KEY];
    else root[ABORT_KEY] = previousAbortStore;
  };
}

describe("ChatGPT Web first-party module contract discovery", () => {
  test("discovers semantic helpers without pinning minified export names", () => {
    const source = [
      "async function aa(e,t){let[r,i]=await Promise.all([cc.getEnforcementToken(t,{forceSync:!0}),dd.getEnforcementToken(t)]);return[r,i]}",
      "function ff(e=!1,t=`none`){return gg(`finalized`,e,t)}",
      "async function hh(){return ee.safePost(`/sentinel/chat-requirements/prepare`,{})}",
      "function ii(e,t,n,r,i,a){let o={};return e?.token?o[`OpenAI-Sentinel-Chat-Requirements-Token`]=e.token:o}",
      "export{ff as A,cc as B,dd as C,ee as D,ii as E};",
    ].join(";");

    assert.deepEqual(parseChatGptWebFirstPartyModuleContract(source), {
      finalizeRequirements: "A",
      proofManager: "B",
      turnstileManager: "C",
      requestClient: "D",
      buildSentinelHeaders: "E",
    } satisfies ChatGptWebFirstPartyModuleContract);
  });

  test("accepts the optional first-party send policy on requirement finalization", () => {
    const source = [
      "async function aa(e,t){let[r,i]=await Promise.all([cc.getEnforcementToken(t,{forceSync:!0}),dd.getEnforcementToken(t)]);return[r,i]}",
      "function ff(e=!1,t=`none`,n=rr.SendIfAvailable){return gg(`finalized`,e,t,n)}",
      "async function hh(){return ee.safePost(`/sentinel/chat-requirements/prepare`,{})}",
      "function ii(e,t,n,r,i,a){let o={};return e?.token?o[`OpenAI-Sentinel-Chat-Requirements-Token`]=e.token:o}",
      "export{ff as A,cc as B,dd as C,ee as D,ii as E};",
    ].join(";");

    assert.deepEqual(parseChatGptWebFirstPartyModuleContract(source), {
      finalizeRequirements: "A",
      proofManager: "B",
      turnstileManager: "C",
      requestClient: "D",
      buildSentinelHeaders: "E",
    } satisfies ChatGptWebFirstPartyModuleContract);
  });

  test("fails closed when an upstream asset no longer exposes the observed contract", () => {
    assert.throws(
      () => parseChatGptWebFirstPartyModuleContract("export{unrelated as A};"),
      /first-party module contract/
    );
  });

  test("follows only strict first-party relative chunk references", () => {
    const parent = "https://chatgpt.com/cdn/assets/entry-current.js";
    const source = [
      'import{a}from"./4813494d-current.js";',
      'import("./lazy_chunk-2.js");',
      'import("https://example.com/foreign.js");',
      'const ignored="../outside.js";',
    ].join("");

    assert.deepEqual(extractChatGptWebFirstPartyAssetReferences(source, parent), [
      "https://chatgpt.com/cdn/assets/4813494d-current.js",
      "https://chatgpt.com/cdn/assets/lazy_chunk-2.js",
    ]);
  });

  test("discovers first-party modules exposed only through modulepreload links", () => {
    assert.deepEqual(
      collectChatGptWebFirstPartyAssetCandidates(
        [],
        [
          "https://chatgpt.com/cdn/assets/4813494d-current.js",
          "https://chatgpt.com/cdn/assets/root-current.css",
        ]
      ),
      ["https://chatgpt.com/cdn/assets/4813494d-current.js"]
    );
  });
});

describe("ChatGPT Web first-party request execution", () => {
  // Regression: the sentinel headers are what authenticate `/f/conversation`. A bridge
  // without them used to be ignored silently, so the request went out unsigned and
  // ChatGPT answered with a redirect to the app shell (~600KB of HTML) instead of SSE.
  test("never posts an unsigned request when the challenge bridge is incomplete", async () => {
    const root = globalThis as typeof globalThis & Record<string, unknown>;
    const previousBridge = root[BRIDGE_KEY];
    let posted = false;
    // safePost exists so a bug that skips the header check would still reach the network.
    root[BRIDGE_KEY] = {
      requestClient: {
        safePost: async () => {
          posted = true;
          return new Response("{}");
        },
      },
    };
    try {
      await assert.rejects(() =>
        executeChatGptWebFirstPartyTurn(createDirectPage(), {
          prompt: "unsigned probe",
          attachments: [],
          selection: { kind: "free", thinkEnabled: false },
        })
      );
      assert.equal(posted, false, "an unsigned conversation request must never be sent");
    } finally {
      if (previousBridge === undefined) delete root[BRIDGE_KEY];
      else root[BRIDGE_KEY] = previousBridge;
    }
  });

  test("stops reading once a complete client tool envelope is available", async () => {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            'event: delta\\ndata: {"v":"<tool>{\\"name\\":\\"write\\"}</tool>"}\\n\\n'
          )
        );
      },
      cancel() {
        cancelled = true;
      },
    });
    const restoreBridge = installFirstPartyBridge(async (path) => {
      if (path === "/f/conversation") return new Response(stream, { status: 200 });
      throw new Error(`Unexpected first-party path: ${path}`);
    });

    try {
      const body = await executeChatGptWebFirstPartyTurn(createDirectPage(), {
        prompt: "tool probe",
        attachments: [],
        selection: { kind: "free", thinkEnabled: false },
      });
      assert.match(body, /<tool>/);
      assert.equal(cancelled, true);
    } finally {
      restoreBridge();
    }
  });

  async function captureConversationBody(
    selection: ChatGptWebFirstPartyRequest["selection"]
  ): Promise<Record<string, unknown>> {
    let conversationOptions: Record<string, unknown> | null = null;
    const restoreBridge = installFirstPartyBridge(async (path, options) => {
      if (path !== "/f/conversation") throw new Error(`Unexpected first-party path: ${path}`);
      conversationOptions = options;
      return new Response("data: [DONE]\n\n", { status: 200 });
    });
    try {
      await executeChatGptWebFirstPartyTurn(createDirectPage(), {
        prompt: "hello",
        attachments: [],
        selection,
      });
    } finally {
      restoreBridge();
    }
    return conversationOptions!.requestBody as Record<string, unknown>;
  }

  test("sends the picker lane as a thinking slug plus its own effort field", async () => {
    // The ability slider used to be flattened into `system_hints`, so every
    // position produced an identical request. The effort now travels as
    // `thinking_effort`, and only the Free Think toggle keeps the hint.
    const thinking = await captureConversationBody({
      kind: "picker",
      modelLabel: "GPT-6 Sol",
      effortIndex: 3,
    });
    assert.equal(thinking.model, "gpt-6-thinking");
    assert.equal(thinking.thinking_effort, "max");
    assert.deepEqual(thinking.system_hints, []);

    const medium = await captureConversationBody({
      kind: "picker",
      modelLabel: "GPT-5.6 Sol",
      effortIndex: 1,
    });
    assert.equal(medium.model, "gpt-5-6-thinking");
    assert.equal(medium.thinking_effort, "standard");

    const instant = await captureConversationBody({
      kind: "picker",
      modelLabel: "GPT-6 Sol",
      effortIndex: 0,
    });
    assert.equal(instant.model, "gpt-6");
    assert.equal("thinking_effort" in instant, false);
  });

  test("keeps the Pro lane a distinct slug with the captured effort depth", async () => {
    const gpt6Pro = await captureConversationBody({
      kind: "picker",
      modelLabel: "GPT-6 Sol",
      effortIndex: 4,
    });
    assert.equal(gpt6Pro.model, "gpt-6-pro");
    assert.equal(gpt6Pro.thinking_effort, "standard");

    const gpt55Pro = await captureConversationBody({
      kind: "picker",
      modelLabel: "GPT-5.5",
      effortIndex: 4,
    });
    assert.equal(gpt55Pro.model, "gpt-5-5-pro");
    assert.equal(gpt55Pro.thinking_effort, "extended");
  });

  test("uploads image and file inputs before submitting the observed conversation body", async () => {
    const originalFetch = globalThis.fetch;
    const uploadedTypes: string[] = [];
    let registrationIndex = 0;
    let conversationOptions: Record<string, unknown> | null = null;
    globalThis.fetch = (async (_input, init) => {
      uploadedTypes.push(new Headers(init?.headers).get("content-type") ?? "");
      return new Response(null, { status: 201 });
    }) as typeof fetch;
    const restoreBridge = installFirstPartyBridge(async (path, options) => {
      if (path === "/files") {
        registrationIndex += 1;
        return {
          file_id: `file-${registrationIndex}`,
          upload_url: `https://uploads.oaiusercontent.com/file-${registrationIndex}`,
        };
      }
      if (path === "/files/process_upload_stream") {
        return new Response(null, { status: 200 });
      }
      if (path === "/f/conversation") {
        conversationOptions = options;
        return new Response("data: [DONE]\n\n", { status: 200 });
      }
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    const attachments: ChatGptWebResolvedAttachment[] = [
      {
        kind: "image",
        name: "pixel.png",
        mimeType: "image/png",
        size: 4,
        data: Buffer.from([1, 2, 3, 4]),
        width: 1,
        height: 1,
      },
      {
        kind: "file",
        name: "notes.txt",
        mimeType: "text/plain",
        size: 5,
        data: Buffer.from("hello"),
      },
    ];

    try {
      const body = await executeChatGptWebFirstPartyTurn(createDirectPage(), {
        prompt: "Inspect both attachments.",
        attachments,
        selection: { kind: "free", thinkEnabled: true },
      });

      assert.equal(body, "data: [DONE]\n\n");
      assert.deepEqual(uploadedTypes, ["image/png", "text/plain"]);
      const requestBody = conversationOptions?.requestBody as Record<string, unknown>;
      assert.equal(requestBody.model, "auto");
      assert.deepEqual(requestBody.system_hints, ["reason"]);
      const messages = requestBody.messages as Array<Record<string, unknown>>;
      const content = messages[0].content as Record<string, unknown>;
      assert.equal(content.content_type, "multimodal_text");
      assert.deepEqual(content.parts, [
        {
          content_type: "image_asset_pointer",
          asset_pointer: "sediment://file-1",
          size_bytes: 4,
          width: 1,
          height: 1,
        },
        "Inspect both attachments.",
      ]);
      const metadata = messages[0].metadata as Record<string, unknown>;
      const registered = metadata.attachments as Array<Record<string, unknown>>;
      assert.deepEqual(
        registered.map(({ id, mime_type: mimeType, name }) => ({ id, mimeType, name })),
        [
          { id: "file-1", mimeType: "image/png", name: "pixel.png" },
          { id: "file-2", mimeType: "text/plain", name: "notes.txt" },
        ]
      );
    } finally {
      restoreBridge();
      globalThis.fetch = originalFetch;
    }
  });

  test("preserves an upstream conversation 429 for account fallback", async () => {
    const restoreBridge = installFirstPartyBridge(async (path) => {
      if (path === "/f/conversation") return new Response(null, { status: 429 });
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    try {
      await assert.rejects(
        executeChatGptWebFirstPartyTurn(createDirectPage(), {
          prompt: "quota probe",
          attachments: [],
          selection: { kind: "free", thinkEnabled: false },
        }),
        /conversation failed with status 429/
      );
    } finally {
      restoreBridge();
    }
  });

  test("preserves an attachment registration 429 for account fallback", async () => {
    const restoreBridge = installFirstPartyBridge(async (path) => {
      if (path === "/files") return new Response(null, { status: 429 });
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    try {
      await assert.rejects(
        executeChatGptWebFirstPartyTurn(createDirectPage(), {
          prompt: "quota probe",
          attachments: [
            {
              kind: "image",
              name: "pixel.png",
              mimeType: "image/png",
              size: 1,
              data: Buffer.from([1]),
              width: 1,
              height: 1,
            },
          ],
          selection: { kind: "free", thinkEnabled: false },
        }),
        /file registration failed with status 429/
      );
    } finally {
      restoreBridge();
    }
  });
});

describe("ChatGPT Web integrity module resolution", () => {
  const names = { resolveIntegrityModule: "lXE", resolveIntegrity: "f" };

  interface ResolutionBindings {
    resolveIntegrity(proof: unknown): Promise<unknown>;
    loadIntegrityModule(): Promise<Record<string, unknown>>;
  }

  let chunkImporterCount = 0;

  // The generated snippet runs inside the bridge module, so the test evaluates it as a real
  // ES module with the same two bindings the bridge provides: `names` and `importChunk`.
  async function runResolution(
    source: string,
    importChunk: (url: string) => Promise<Record<string, unknown>>
  ): Promise<ResolutionBindings> {
    chunkImporterCount += 1;
    const importerKey = `__chatGptTestImportChunk${chunkImporterCount}`;
    const root = globalThis as typeof globalThis & Record<string, unknown>;
    root[importerKey] = importChunk;
    const code = [
      `const names = ${JSON.stringify(names)};`,
      `const importChunk = url => globalThis[${JSON.stringify(importerKey)}](url);`,
      source,
      `export { resolveIntegrity, loadIntegrityModule };`,
    ].join("\n");
    const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
    return (await import(url)) as ResolutionBindings;
  }

  test("requires the module through the page runtime instead of stubbing its dependencies", async () => {
    const resolveIntegrityHandler = async (proof: unknown) => ({ proof });
    const imported: string[] = [];
    const source = buildChatGptWebIntegrityResolutionSource([
      "https://chatgpt.com/cdn/assets/plain-chunk.js",
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
    ]);

    // No minified dependency id is pinned anymore: the previous shim hardcoded the uuid
    // helper id ("TI"), which chatgpt.com has since renamed, failing every turn.
    assert.doesNotMatch(source, /crypto\.randomUUID/);
    // Top-level await would settle after the installer's `script.onload` check rejects.
    assert.doesNotMatch(source, /^\s*await /);

    const bindings = await runResolution(source, async (url) => {
      imported.push(url);
      if (url.endsWith("runtime-chunk.js")) {
        return {
          __webpack_require__: (id: string) =>
            id === "lXE" ? { f: resolveIntegrityHandler } : { f: () => "wrong module" },
        };
      }
      return { __webpack_modules__: { lXE: () => ({ f: () => "stubbed" }) } };
    });

    assert.deepEqual(await bindings.resolveIntegrity("proof"), { proof: "proof" });
    assert.deepEqual(imported, [
      "https://chatgpt.com/cdn/assets/plain-chunk.js",
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
    ]);
  });

  test("skips chunks that fail to import and keeps looking for the runtime", async () => {
    const source = buildChatGptWebIntegrityResolutionSource([
      "https://chatgpt.com/cdn/assets/broken.js",
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
    ]);

    const bindings = await runResolution(source, async (url) => {
      if (url.endsWith("broken.js")) throw new Error("chunk failed to evaluate");
      return { __webpack_require__: () => ({ f: () => "headers" }) };
    });

    assert.equal(await bindings.resolveIntegrity("proof"), "headers");
  });

  test("names the module id when no loaded chunk exposes the page runtime", async () => {
    const source = buildChatGptWebIntegrityResolutionSource([
      "https://chatgpt.com/cdn/assets/plain-chunk.js",
    ]);
    const bindings = await runResolution(source, async () => ({ __webpack_modules__: {} }));

    await assert.rejects(
      bindings.resolveIntegrity("proof"),
      /integrity module lXE is not registered in the page runtime \(1 chunks loaded\)/
    );
  });

  test("rejects a resolved module that does not export the resolver", async () => {
    const source = buildChatGptWebIntegrityResolutionSource([
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
    ]);
    const bindings = await runResolution(source, async () => ({
      __webpack_require__: () => ({ a: () => "other" }),
    }));

    await assert.rejects(bindings.resolveIntegrity("proof"), /integrity resolver is unavailable/);
  });

  test("drops non-first-party and duplicate chunk URLs", () => {
    const source = buildChatGptWebIntegrityResolutionSource([
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
      "https://chatgpt.com/cdn/assets/runtime-chunk.js",
      "https://evil.example/cdn/assets/runtime-chunk.js",
      "https://chatgpt.com/cdn/assets/not-a-chunk.css",
    ]);

    assert.equal(
      source.match(/"https:\/\/chatgpt\.com\/cdn\/assets\/runtime-chunk\.js"/g)?.length,
      1
    );
    assert.doesNotMatch(source, /evil\.example/);
    assert.doesNotMatch(source, /not-a-chunk\.css/);
  });
});

describe("ChatGPT Web browser asset inventory during navigation", () => {
  test("retries read-only asset inventory when a redirect destroys the frame", async () => {
    let attempts = 0;
    let loadWaits = 0;
    const page = {
      evaluate: async () => {
        attempts += 1;
        if (attempts === 1) {
          throw new Error(
            "page.evaluate: Execution context was destroyed, most likely because of a navigation"
          );
        }
        return {
          modulePreloadUrls: ["https://chatgpt.com/cdn/assets/demo.abc.js"],
          resourceUrls: ["https://other.example/script.js"],
        };
      },
      waitForLoadState: async () => {
        loadWaits += 1;
      },
    } as unknown as import("playwright").Page;
    const result = await collectPageAssetCandidates(page);
    assert.deepEqual(result, ["https://chatgpt.com/cdn/assets/demo.abc.js"]);
    assert.equal(attempts, 2);
    assert.equal(loadWaits, 1);
  });

  test("does not retry unrelated failures or silently ignore permanent redirects", async () => {
    const fail = (message: string) =>
      ({
        evaluate: async () => {
          throw new Error(message);
        },
        waitForLoadState: async () => {},
      }) as unknown as import("playwright").Page;
    await assert.rejects(collectPageAssetCandidates(fail("Page crashed")), /Page crashed/);
    await assert.rejects(
      collectPageAssetCandidates(
        fail("Execution context was destroyed, most likely because of a navigation")
      ),
      /Execution context was destroyed/
    );
  });
});

describe("ChatGPT Web cleanroom stored session preflight", () => {
  test("accepts an authenticated session without exposing user identity", async () => {
    const page = {
      evaluate: async () => ({ ready: true, httpStatus: 200 }),
    } as unknown as import("playwright").Page;
    await assert.doesNotReject(assertChatGptWebSignedIn(page));
  });

  test("rejects an unauthenticated browser state with actionable guidance", async () => {
    const page = {
      evaluate: async () => ({ ready: false, httpStatus: 200 }),
    } as unknown as import("playwright").Page;
    await assert.rejects(assertChatGptWebSignedIn(page), /authenticated browser session/);
  });

  test("recovers one navigation and checks the final document instead", async () => {
    let count = 0;
    const page = {
      evaluate: async () => {
        count++;
        if (count === 1)
          throw new Error("Execution context was destroyed, most likely because of a navigation");
        return { ready: true, httpStatus: 200 };
      },
      waitForLoadState: async () => {},
    } as unknown as import("playwright").Page;
    await assert.doesNotReject(assertChatGptWebSignedIn(page));
    assert.equal(count, 2);
  });
});

describe("ChatGPT Web navigation retry is limited to a destroyed context", () => {
  test("does not retry a navigation timeout, which is not a destroyed context", async () => {
    let attempts = 0;
    const page = {
      evaluate: async () => {
        attempts += 1;
        throw new Error("page.evaluate: Navigation timeout of 30000 ms exceeded");
      },
      waitForLoadState: async () => {},
    } as unknown as import("playwright").Page;
    await assert.rejects(collectPageAssetCandidates(page), /Navigation timeout/);
    await assert.rejects(assertChatGptWebSignedIn(page), /Navigation timeout/);
    assert.equal(attempts, 2);
  });
});

describe("ChatGPT Web session preflight keeps transient failures local", () => {
  const sessionPage = (session: Record<string, unknown>) =>
    ({ evaluate: async () => session }) as unknown as import("playwright").Page;

  test("a 401 from the session endpoint is a credential failure", async () => {
    await assert.rejects(
      assertChatGptWebSignedIn(sessionPage({ ready: false, httpStatus: 401 })),
      /credentials require an authenticated browser session/
    );
  });

  for (const httpStatus of [403, 429, 503]) {
    test(`HTTP ${httpStatus} from the session endpoint stays a local bridge failure`, async () => {
      const error = await assertChatGptWebSignedIn(sessionPage({ ready: false, httpStatus })).then(
        () => null,
        (rejection: unknown) => rejection
      );
      assert.ok(error instanceof Error);
      assert.match(
        error.message,
        new RegExp(`session check is unavailable \\(HTTP ${httpStatus}\\)`)
      );
      assert.equal(isChatGptWebBridgeFailure("chatgpt-web", error), true);
    });
  }

  test("a 200 challenge page that is not JSON is not reported as an expired login", async () => {
    const error = await assertChatGptWebSignedIn(
      sessionPage({ ready: false, httpStatus: 200, unparsable: true })
    ).then(
      () => null,
      (rejection: unknown) => rejection
    );
    assert.ok(error instanceof Error);
    assert.doesNotMatch(error.message, /credentials require/);
    assert.equal(isChatGptWebBridgeFailure("chatgpt-web", error), true);
  });

  test("a signed-out session is not swallowed as a bridge failure", () => {
    assert.equal(
      isChatGptWebBridgeFailure(
        "chatgpt-web",
        "ChatGPT Web credentials require an authenticated browser session; re-import a complete Playwright storage state"
      ),
      false
    );
  });
});

describe("ChatGPT Web bridge installer (strict CSP, no blob module)", () => {
  const ASSET = "https://chatgpt.com/cdn/assets/upstream-abc.js";
  const legacyContract: ChatGptWebFirstPartyModuleContract = {
    finalizeRequirements: "fr",
    proofManager: "pm",
    turnstileManager: "tm",
    requestClient: "rc",
    buildSentinelHeaders: "bs",
  };
  const integrityContract: ChatGptWebFirstPartyModuleContract = {
    ...legacyContract,
    resolveIntegrity: "f",
    resolveIntegrityModule: "lXE",
  };

  type Installer = (
    importChunk: (url: string) => Promise<Record<string, unknown>>
  ) => Promise<void>;
  type ViolationListener = (event: { violatedDirective: string; blockedURI: string }) => void;

  let installerCount = 0;

  // The installer is page-side source text; the test loads it as a real ES module and runs
  // it against a minimal `document` that only tracks the CSP violation listener.
  async function loadInstaller(source: string): Promise<Installer> {
    installerCount += 1;
    const code = `// installer ${installerCount}\nexport default ${source};`;
    const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
    return ((await import(url)) as { default: Installer }).default;
  }

  async function withPageGlobals<T>(
    run: (violations: Set<ViolationListener>) => Promise<T>
  ): Promise<T> {
    const root = globalThis as typeof globalThis & Record<string, unknown>;
    const previousBridge = root[BRIDGE_KEY];
    const hadDocument = "document" in root;
    const previousDocument = root.document;
    const violations = new Set<ViolationListener>();
    const previousFetch = globalThis.fetch;
    // The integrity bridge opens its session request at install time; answer it locally.
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ accessToken: "token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;
    delete root[BRIDGE_KEY];
    root.document = {
      addEventListener: (type: string, listener: ViolationListener) => {
        if (type === "securitypolicyviolation") violations.add(listener);
      },
      removeEventListener: (type: string, listener: ViolationListener) => {
        if (type === "securitypolicyviolation") violations.delete(listener);
      },
    };
    try {
      return await run(violations);
    } finally {
      globalThis.fetch = previousFetch;
      if (previousBridge === undefined) delete root[BRIDGE_KEY];
      else root[BRIDGE_KEY] = previousBridge;
      if (hadDocument) root.document = previousDocument;
      else delete root.document;
    }
  }

  test("is plain source text with no blob module, script element or bundler helper", () => {
    for (const contract of [legacyContract, integrityContract]) {
      const source = buildChatGptWebBridgeInstallerSource(ASSET, contract, [ASSET]);
      assert.equal(typeof source, "string");
      assert.match(source, /^async importChunk => \{/);
      assert.doesNotMatch(
        source,
        /createObjectURL|new Blob|createElement|__name|__webpack_require__\(/
      );
      assert.doesNotMatch(source, /^import /m);
    }
  });

  test("refuses an asset URL outside chatgpt.com before it reaches the page", () => {
    assert.throws(
      () =>
        buildChatGptWebBridgeInstallerSource(
          "https://evil.example/cdn/assets/upstream-abc.js",
          legacyContract
        ),
      /invalid first-party asset URL/
    );
  });

  test("legacy contract imports exactly the validated asset and maps its exports", async () => {
    const installer = await loadInstaller(
      buildChatGptWebBridgeInstallerSource(ASSET, legacyContract)
    );
    await withPageGlobals(async (violations) => {
      const imported: string[] = [];
      await installer(async (url) => {
        imported.push(url);
        return { fr: "finalize", pm: "proof", tm: "turnstile", rc: "client", bs: "headers" };
      });
      assert.deepEqual(imported, [ASSET]);
      const bridge = (globalThis as Record<string, unknown>)[BRIDGE_KEY] as Record<string, unknown>;
      assert.deepEqual(
        {
          finalizeRequirements: bridge.finalizeRequirements,
          proofManager: bridge.proofManager,
          turnstileManager: bridge.turnstileManager,
          requestClient: bridge.requestClient,
          buildSentinelHeaders: bridge.buildSentinelHeaders,
          resolveIntegrity: bridge.resolveIntegrity,
        },
        {
          finalizeRequirements: "finalize",
          proofManager: "proof",
          turnstileManager: "turnstile",
          requestClient: "client",
          buildSentinelHeaders: "headers",
          resolveIntegrity: undefined,
        }
      );
      assert.equal(violations.size, 0, "the CSP listener is detached after install");
    });
  });

  test("integrity contract installs lazily and resolves through validated chunks only", async () => {
    const installer = await loadInstaller(
      buildChatGptWebBridgeInstallerSource(ASSET, integrityContract, [
        "https://evil.example/cdn/assets/runtime-chunk.js",
        "https://chatgpt.com/cdn/assets/runtime-chunk.js",
        "https://chatgpt.com/cdn/assets/runtime-chunk.js",
      ])
    );
    await withPageGlobals(async () => {
      const imported: string[] = [];
      await installer(async (url) => {
        imported.push(url);
        return { __webpack_require__: () => ({ f: async (proof: unknown) => ({ proof }) }) };
      });
      assert.deepEqual(imported, [], "no chunk is imported until a proof is needed");
      const bridge = (globalThis as Record<string, unknown>)[BRIDGE_KEY] as {
        requestClient: { safePost: unknown };
        resolveIntegrity: (proof: unknown) => Promise<unknown>;
      };
      assert.equal(typeof bridge.requestClient.safePost, "function");
      assert.deepEqual(await bridge.resolveIntegrity("p"), { proof: "p" });
      assert.deepEqual(imported, ["https://chatgpt.com/cdn/assets/runtime-chunk.js"]);
    });
  });

  test("keeps an already installed bridge and imports nothing", async () => {
    const installer = await loadInstaller(
      buildChatGptWebBridgeInstallerSource(ASSET, legacyContract)
    );
    await withPageGlobals(async () => {
      const existing = { requestClient: "existing" };
      (globalThis as Record<string, unknown>)[BRIDGE_KEY] = existing;
      let imports = 0;
      await installer(async () => {
        imports += 1;
        return {};
      });
      assert.equal(imports, 0);
      assert.equal((globalThis as Record<string, unknown>)[BRIDGE_KEY], existing);
    });
  });

  test("names the CSP directive when the page refuses the first-party import", async () => {
    const installer = await loadInstaller(
      buildChatGptWebBridgeInstallerSource(ASSET, legacyContract)
    );
    await withPageGlobals(async (violations) => {
      await assert.rejects(
        installer(async (url) => {
          for (const listener of violations) {
            listener({ violatedDirective: "script-src-elem", blockedURI: url });
          }
          throw new TypeError("Failed to fetch dynamically imported module");
        }),
        (error: unknown) => {
          assert.equal(String(error), `Error: csp: script-src-elem blocked ${ASSET}`);
          return true;
        }
      );
      assert.equal(violations.size, 0);
    });
  });

  test("passes a non-CSP import failure through unchanged", async () => {
    const installer = await loadInstaller(
      buildChatGptWebBridgeInstallerSource(ASSET, legacyContract)
    );
    await withPageGlobals(async () => {
      await assert.rejects(
        installer(async () => {
          throw new TypeError("Failed to fetch dynamically imported module");
        }),
        /Failed to fetch dynamically imported module/
      );
    });
  });
});
