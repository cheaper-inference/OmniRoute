// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useModelImportHandlers,
  type UseModelImportHandlersParams,
  type UseModelImportHandlersReturn,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelImportHandlers";

type HookResult = UseModelImportHandlersReturn;

const t = ((key: string) => key) as ((key: string) => string) & {
  has: (key: string) => boolean;
};
t.has = () => false;

const notify = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
};

function buildParams(
  overrides: Partial<UseModelImportHandlersParams>
): UseModelImportHandlersParams {
  return {
    providerId: "cloudflare-ai",
    models: [],
    modelMeta: { customModels: [] },
    modelAliases: {},
    connections: [],
    isFreeNoAuth: false,
    handleSetAlias: vi.fn().mockResolvedValue(undefined),
    fetchAliases: vi.fn().mockResolvedValue(undefined),
    fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
    fetchConnections: vi.fn().mockResolvedValue(undefined),
    notify,
    t,
    providerStorageAlias: "cloudflare-ai",
    ...overrides,
  };
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderHook(params: UseModelImportHandlersParams): { get: () => HookResult } {
  let latestResult: HookResult | null = null;
  function Wrapper() {
    const result = useModelImportHandlers(params);
    React.useEffect(() => {
      latestResult = result;
    });
    return null;
  }
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<Wrapper />));
  roots.push({ root, el });
  return {
    get: () => {
      if (!latestResult) throw new Error("Hook did not render");
      return latestResult;
    },
  };
}

function conn(
  id: string,
  active: boolean,
  settings: { autoSync?: boolean; autoFetchModels?: boolean } = {}
) {
  return {
    id,
    isActive: active,
    providerSpecificData: settings,
  };
}

beforeEach(() => {
  // Successful imports intentionally reload the page after 2s; own that timer in each test.
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal("fetch", vi.fn());
  vi.clearAllMocks();
});

afterEach(() => {
  try {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
  } finally {
    // Do not navigate after jsdom teardown or leak fake timers into the next test.
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  }
});

describe("useModelImportHandlers — master autoSync", () => {
  it("isAutoSyncEnabled is true only when every active connection has autoSync on", () => {
    const mixed = renderHook(
      buildParams({ connections: [conn("a", true, { autoSync: true }), conn("b", true)] })
    );
    expect(mixed.get().isAutoSyncEnabled).toBe(false);

    const allOn = renderHook(
      buildParams({
        connections: [conn("a", true, { autoSync: true }), conn("b", true, { autoSync: true })],
      })
    );
    expect(allOn.get().isAutoSyncEnabled).toBe(true);

    const oneOff = renderHook(
      buildParams({
        connections: [conn("a", true, { autoSync: true }), conn("b", false, { autoSync: true })],
      })
    );
    expect(oneOff.get().isAutoSyncEnabled).toBe(true);
  });

  it("handleToggleAutoSync fans out a PUT to every active connection (bug repro)", async () => {
    const fetchConnections = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true), conn("conn-b", true)],
        fetchConnections,
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/providers/conn-b",
      expect.objectContaining({ method: "PUT" })
    );
    expect(
      fetchMock.mock.calls.filter(([url]) => String(url).endsWith("/sync-models"))
    ).toHaveLength(2);
    expect(fetchConnections).toHaveBeenCalled();
  });

  it("excludes inactive connections from the fan-out", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true), conn("conn-inactive", false)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
  });

  it("toggling from a mixed state (one on, one off) turns all active connections on", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, { autoSync: true }), conn("conn-b", true)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(hook.get().isAutoSyncEnabled).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/providers/conn-b",
      expect.objectContaining({ method: "PUT" })
    );
    const firstBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    const secondBody = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(firstBody.providerSpecificData).toEqual({ autoSync: true });
    expect(secondBody.providerSpecificData).toEqual({ autoSync: true });
    expect(
      fetchMock.mock.calls.filter(([url]) => String(url).endsWith("/sync-models"))
    ).toHaveLength(1);
    expect(notify.success).toHaveBeenCalled();
  });

  it("still calls fetchConnections when a fan-out PUT fails (partial failure)", async () => {
    const fetchConnections = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true), conn("conn-b", true)],
        fetchConnections,
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 } as Response);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchConnections).toHaveBeenCalled();
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
    expect(notify.warning).toHaveBeenCalledWith("autoSyncPartialFailure");
  });

  it("notifies error when every fan-out PUT fails", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true), conn("conn-b", true)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: false, status: 500 } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(notify.error).toHaveBeenCalledWith("autoSyncToggleFailed");
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.warning).not.toHaveBeenCalled();
  });

  it("no-ops without a PUT or notification when there are no active connections", async () => {
    const hook = renderHook(buildParams({ connections: [conn("conn-a", false)] }));
    const fetchMock = vi.mocked(fetch);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
  });
});

describe("useModelImportHandlers — upstream model auto-fetch", () => {
  it("defaults to off until every active connection explicitly enables it", () => {
    const defaultOff = renderHook(buildParams({ connections: [conn("a", true)] }));
    expect(defaultOff.get().isAutoFetchModelsEnabled).toBe(false);

    const allOn = renderHook(
      buildParams({
        connections: [
          conn("a", true, { autoFetchModels: true }),
          conn("b", true, { autoFetchModels: true }),
        ],
      })
    );
    expect(allOn.get().isAutoFetchModelsEnabled).toBe(true);
  });

  it("enables auto-fetch on every active connection", async () => {
    const fetchConnections = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({ connections: [conn("conn-a", true), conn("conn-b", true)], fetchConnections })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoFetchModels();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, init] of fetchMock.mock.calls) {
      expect(init).toEqual(
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ providerSpecificData: { autoFetchModels: true } }),
        })
      );
    }
    expect(fetchConnections).toHaveBeenCalled();
  });
});

describe("useModelImportHandlers — import through the model sync", () => {
  function syncResponse(ok: boolean, status: number, body: Record<string, unknown>) {
    return { ok, status, json: async () => body } as unknown as Response;
  }

  it("imports a connection's models through sync-models, not one row per model", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const handleSetAlias = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        providerId: "openrouter",
        providerStorageAlias: "openrouter",
        connections: [conn("or-1", true)],
        modelAliases: { "kept-model": "openrouter/vendor/kept-model" },
        handleSetAlias,
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(
      syncResponse(true, 200, {
        ok: true,
        source: "api",
        addedModelIds: ["vendor/new-model", "vendor/kept-model"],
        removedModelIds: ["vendor/gone-model"],
      })
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "/api/providers/or-1/sync-models?mode=import",
    ]);
    expect(fetchMock.mock.calls[0]?.[1]?.method).toBe("POST");
    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.importedCount).toBe(2);
    expect(progress.status).toBe("importSuccessCount");
    expect(progress.logs).toContain("modelsNoLongerListed");
    expect(progress.logs).toContain("− vendor/gone-model");
    // A model the import adds keeps its bare-id alias when the alias is free.
    expect(handleSetAlias).toHaveBeenCalledTimes(1);
    expect(handleSetAlias).toHaveBeenCalledWith("vendor/new-model", "new-model", "openrouter");
    expect(setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 2000)).toHaveLength(1);
    setTimeoutSpy.mockRestore();
  });

  it("gives a shared bare alias to the first added model only", async () => {
    const handleSetAlias = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        providerId: "openrouter",
        providerStorageAlias: "openrouter",
        connections: [conn("or-1", true)],
        handleSetAlias,
      })
    );
    vi.mocked(fetch).mockResolvedValue(
      syncResponse(true, 200, {
        ok: true,
        source: "api",
        addedModelIds: ["a/foo", "b/foo"],
        removedModelIds: [],
      })
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    // `b/foo` must not take over the `foo` alias the import just gave `a/foo`.
    expect(handleSetAlias).toHaveBeenCalledTimes(1);
    expect(handleSetAlias).toHaveBeenCalledWith("a/foo", "foo", "openrouter");
  });

  it("says the catalog is up to date when the listing holds nothing new", async () => {
    const hook = renderHook(buildParams({ connections: [conn("c-1", true)] }));
    vi.mocked(fetch).mockResolvedValue(
      syncResponse(true, 200, { ok: true, source: "api", addedModelIds: [], removedModelIds: [] })
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.status).toBe("allModelsAlreadyImported");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("names a provider that publishes no model list", async () => {
    const hook = renderHook(buildParams({ connections: [conn("c-1", true)] }));
    vi.mocked(fetch).mockResolvedValue(
      syncResponse(true, 200, {
        ok: true,
        source: "local_catalog",
        intentional: true,
        warning: "Model discovery is not configured for this provider — using local catalog",
        addedModelIds: [],
      })
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.status).toBe("providerPublishesNoModelList");
  });

  it("ends a free-only import whose provider lists no free model with that message", async () => {
    const hook = renderHook(buildParams({ connections: [conn("c-1", true)] }));
    vi.mocked(fetch).mockResolvedValue(
      syncResponse(true, 200, { ok: true, freeFilterEmpty: true })
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    expect(hook.get().importProgress.status).toBe("noFreeModelsFound");
  });

  it("reports a failed sync as an error with the server's message", async () => {
    const hook = renderHook(buildParams({ connections: [conn("c-1", true)] }));
    vi.mocked(fetch).mockResolvedValue(syncResponse(false, 404, { error: "Connection not found" }));

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("error");
    expect(progress.error).toBe("Connection not found");
  });
});

// A no-auth provider used without a connection has no synced catalog and no
// scheduled sync: its listed models are stored as imported custom rows.
describe("useModelImportHandlers — no-auth listing import", () => {
  const rejected = {
    ok: false,
    status: 400,
    json: async () => ({
      error: {
        message: "Invalid request",
        details: [{ field: "apiFormat", message: "Invalid enum value" }],
      },
    }),
  } as unknown as Response;

  function noAuthParams(overrides: Partial<UseModelImportHandlersParams> = {}) {
    return buildParams({
      providerId: "aihorde",
      providerStorageAlias: "aihorde",
      isFreeNoAuth: true,
      connections: [],
      ...overrides,
    });
  }

  function mockImport(catalog: Array<Record<string, unknown>>, failingIds: string[]) {
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      if (input === "/api/provider-models" && init?.method === "POST") {
        const { modelId } = JSON.parse(String(init.body));
        return failingIds.includes(modelId) ? rejected : ({ ok: true } as Response);
      }
      return { ok: true, json: async () => ({ models: catalog }) } as Response;
    });
  }

  it("reads the provider's listing and preserves a discovered per-model targetFormat", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = renderHook(noAuthParams());
    mockImport(
      [
        {
          id: "grok-4.6",
          name: "Grok 4.6",
          apiFormat: "chat-completions",
          supportedEndpoints: ["chat"],
          targetFormat: "openai",
        },
      ],
      []
    );

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("/api/providers/aihorde/models?refresh=true");
    expect(setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 2000)).toHaveLength(1);
    const createCall = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/provider-models" && init?.method === "POST"
    );
    expect(JSON.parse(String(createCall?.[1]?.body))).toEqual(
      expect.objectContaining({ provider: "aihorde", modelId: "grok-4.6", targetFormat: "openai" })
    );
  });

  it("flags a degraded listing, imports it and refreshes the list in place", async () => {
    const fetchProviderModelMeta = vi.fn().mockResolvedValue(undefined);
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = renderHook(noAuthParams({ fetchProviderModelMeta }));
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      if (input === "/api/provider-models" && init?.method === "POST") {
        return { ok: true } as Response;
      }
      return {
        ok: true,
        json: async () => ({
          source: "local_catalog",
          warning: "API unavailable — using local catalog",
          error: "HTTP 500",
          models: [{ id: "listed-model" }],
        }),
      } as Response;
    });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.importedCount).toBe(1);
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    expect(progress.logs).toContain("API unavailable — using local catalog");
    // The degraded notice must stay on screen: no reload, the list is refreshed in place.
    expect(setTimeoutSpy.mock.calls.some(([, delay]) => delay === 2000)).toBe(false);
    expect(fetchProviderModelMeta).toHaveBeenCalledTimes(2);
    setTimeoutSpy.mockRestore();
  });

  it("reports an error instead of success when every model is rejected (bug repro)", async () => {
    const handleSetAlias = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(noAuthParams({ handleSetAlias }));
    mockImport([{ id: "tts-rt-v2" }, { id: "stt-async-v5" }], ["tts-rt-v2", "stt-async-v5"]);

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("error");
    expect(progress.importedCount).toBe(0);
    expect(progress.error).toContain("apiFormat: Invalid enum value");
    expect(progress.logs.some((line) => line.includes("tts-rt-v2"))).toBe(true);
    expect(handleSetAlias).not.toHaveBeenCalled();
  });

  it("counts only the models the server accepted and keeps the failures on screen", async () => {
    const handleSetAlias = vi.fn().mockResolvedValue(undefined);
    const fetchProviderModelMeta = vi.fn().mockResolvedValue(undefined);
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = renderHook(noAuthParams({ handleSetAlias, fetchProviderModelMeta }));
    mockImport([{ id: "tts-rt-v2" }, { id: "stt-async-v5" }], ["tts-rt-v2"]);

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.importedCount).toBe(1);
    expect(progress.logs.some((line) => line.includes("bulkFailedCount"))).toBe(true);
    expect(handleSetAlias).toHaveBeenCalledTimes(1);
    expect(handleSetAlias).toHaveBeenCalledWith("stt-async-v5", "stt-async-v5", "aihorde");
    // No 2s auto-reload (it would wipe the failure lines); the listing is refreshed in place.
    expect(setTimeoutSpy.mock.calls.some(([, delay]) => delay === 2000)).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect(fetchProviderModelMeta).toHaveBeenCalledTimes(2);
    setTimeoutSpy.mockRestore();
  });
});
