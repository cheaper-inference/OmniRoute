// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useModelImportHandlers,
  type ImportProgress,
  type UseModelImportHandlersParams,
  type UseModelImportHandlersReturn,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelImportHandlers";
import { resolveNoNewModelsPhase } from "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning";
import ImportProgressModal from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ImportProgressModal";

/**
 * The model import dialog is the first screen that shows the operator the
 * list came from the built-in catalog: the banner sits above the status line
 * and carries the reason, and the server's own text stays in the log.
 *
 * The global UI polyfill backs `useTranslations` with the real `en.json`, so
 * the test proves the sentence the banner shows is the one every locale
 * carries.
 */

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
    providerId: "openai",
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
    providerStorageAlias: "openai",
    ...overrides,
  };
}

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

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

beforeEach(() => {
  // Successful imports intentionally reload the page after 2s; own that timer in each test.
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
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

/** The sync answers a degraded discovery with 502, its source, warning and cause. */
function mockSync(ok: boolean, status: number, body: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok, status, json: async () => body }) as unknown as Response)
  );
}

const DEGRADED = {
  error: "HTTP 500",
  source: "local_catalog",
  warning: "API unavailable — using local catalog",
};

/**
 * The built-in catalog some providers are expected to use: the server sends a
 * warning with it, but the discovery did not fail.
 */
const EXPECTED_CATALOG = {
  ok: true,
  source: "local_catalog",
  intentional: true,
  warning: "Model discovery is not configured for this provider — using local catalog",
};

describe("the phase of the model import dialog", () => {
  it("follows the degraded character, not the warning text", () => {
    // A catalog the operator asked for is not a fallback: no warning phase.
    expect(resolveNoNewModelsPhase("API unavailable — using local catalog", false)).toBe("done");
    // A degraded discovery is never announced as a success.
    expect(resolveNoNewModelsPhase(null, true)).toBe("warning");
    expect(resolveNoNewModelsPhase("API unavailable — using local catalog", true)).toBe("warning");
    // Called with the warning text alone, the historical rule still holds.
    expect(resolveNoNewModelsPhase("API unavailable — using local catalog")).toBe("warning");
    expect(resolveNoNewModelsPhase(null)).toBe("done");
  });
});

describe("the model import dialog", () => {
  async function importWith(ok: boolean, status: number, body: Record<string, unknown>) {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockSync(ok, status, body);
    await act(async () => {
      await hook.get().handleImportModels();
    });
    return hook;
  }

  it("keeps the reason of the fallback out of the status line and in the state", async () => {
    const hook = await importWith(false, 502, DEGRADED);

    const progress = hook.get().importProgress;
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    // The server's own text is a log line, not the headline.
    expect(progress.status).not.toContain("API unavailable");
    expect(progress.logs).toContain("API unavailable — using local catalog");
  });

  it("shows the fallback notice above the status line of the import dialog", async () => {
    const hook = await importWith(false, 502, DEGRADED);

    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    await act(async () => {
      root.render(
        <ImportProgressModal
          importProgress={hook.get().importProgress}
          isOpen
          onClose={() => {}}
          t={t as never}
        />
      );
    });
    roots.push({ root, el });

    // The dialog content is portaled to document.body by the kit Dialog, so the
    // notice is asserted against the document, not the mount container.
    const notice = document.body.querySelector('[data-testid="discovery-degraded-notice"]');
    expect(notice).not.toBeNull();
    expect(notice?.textContent).toContain("Couldn't reach the provider's model list");
    expect(
      document.body.querySelector('[data-testid="discovery-degraded-cause"]')?.textContent
    ).toBe("HTTP 500");
  });

  it("ends a degraded import in the warning phase, stores nothing and does not reload", async () => {
    // The sync refuses to store a fallback catalog: pinning it would hide the
    // real failure behind models the provider may no longer serve.
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = await importWith(false, 502, DEGRADED);

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("warning");
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    expect(progress.importedCount).toBe(0);
    expect(progress.status).toBe("noNewModelsAdded");
    expect(progress.status).not.toBe("allModelsAlreadyImported");
    expect(setTimeoutSpy.mock.calls.some(([, delay]) => delay === 2000)).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    setTimeoutSpy.mockRestore();
  });

  it("keeps the phase message out of the log of the degraded import", async () => {
    const hook = await importWith(false, 502, DEGRADED);

    const progress = hook.get().importProgress;
    // The server's own text is the log line, the phase message is the status.
    expect(progress.logs).toEqual(["API unavailable — using local catalog"]);
    expect(progress.logs).not.toContain("noNewModelsAdded");
  });

  it("leaves a successful import unchanged: no degraded state, and the page reloads", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = await importWith(true, 200, {
      ok: true,
      source: "api",
      addedModelIds: ["new-model"],
      removedModelIds: [],
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 2000)).toHaveLength(1);
    expect(vi.getTimerCount()).toBe(1);
    // Closing the completion modal must not cancel the page-level navigation.
    act(() => hook.get().setShowImportModal(false));
    expect(vi.getTimerCount()).toBe(1);
    setTimeoutSpy.mockRestore();
  });

  it("ends in the done phase when the built-in catalog is the source the operator asked for", async () => {
    const hook = await importWith(true, 200, { ...EXPECTED_CATALOG, addedModelIds: [] });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(progress.status).toBe("providerPublishesNoModelList");

    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    await act(async () => {
      root.render(
        <ImportProgressModal importProgress={progress} isOpen onClose={() => {}} t={t as never} />
      );
    });
    roots.push({ root, el });

    // The catalog the operator asked for is not a fallback: no notice, no reason.
    expect(document.body.querySelector('[data-testid="discovery-degraded-notice"]')).toBeNull();
  });
  it("refreshes the model list after a sync, but not after a refused one", async () => {
    const fetchProviderModelMeta = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({ connections: [{ id: "conn-1", isActive: true }], fetchProviderModelMeta })
    );
    mockSync(false, 502, DEGRADED);

    await act(async () => {
      await hook.get().handleImportModels();
    });

    // A refused (degraded) import changed nothing, so there is nothing to reload.
    expect(fetchProviderModelMeta).not.toHaveBeenCalled();

    mockSync(true, 200, { ok: true, source: "api", addedModelIds: [], removedModelIds: [] });
    await act(async () => {
      await hook.get().handleImportModels();
    });

    // A sync that answered reloads the list, whatever it stored.
    expect(fetchProviderModelMeta).toHaveBeenCalledTimes(1);
  });

  it("imports the models of a built-in catalog the operator asked for, without a notice", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = await importWith(true, 200, {
      ...EXPECTED_CATALOG,
      addedModelIds: ["known-model"],
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(progress.importedCount).toBe(1);
    expect(progress.status).toBe("importSuccessCount");
    // The server's note on its catalog stays visible as a log line.
    expect(progress.logs).toContain(EXPECTED_CATALOG.warning);
    expect(setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 2000)).toHaveLength(1);
    setTimeoutSpy.mockRestore();
  });

  it("ends in the done phase when the expected catalog adds no model", async () => {
    const hook = await importWith(true, 200, { ...EXPECTED_CATALOG, addedModelIds: [] });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(progress.importedCount).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("the status icon of the model import dialog", () => {
  const PHASES = ["fetching", "importing", "done", "warning", "error"] as const;

  function progress(phase: (typeof PHASES)[number], degraded: boolean): ImportProgress {
    return {
      phase,
      current: 0,
      total: 0,
      status: "status",
      logs: [],
      error: "",
      importedCount: 0,
      degraded,
      degradedCause: degraded ? "HTTP 500" : undefined,
    };
  }

  function renderModal(progress: ImportProgress) {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    act(() => {
      root.render(
        <ImportProgressModal importProgress={progress} isOpen onClose={() => {}} t={t as never} />
      );
    });
    roots.push({ root, el });
    // The status line: the row that carries the status text. The dialog is portaled
    // to document.body by the kit Modal, so the row is looked up on the document.
    const line = document.body
      .querySelector(".text-sm.font-medium.text-text-main")
      ?.closest("div.flex.items-center.gap-3");
    if (!line) throw new Error("status line of the import dialog not found");
    return line;
  }

  // The running phases draw the kit Spinner; every other state a Lucide icon.
  const kitIcons = (line: Element) => line.querySelectorAll("[data-icon], [data-slot='spinner']");
  const legacySpans = (line: Element) => line.querySelectorAll("span.material-symbols-outlined");

  for (const phase of PHASES) {
    it(`shows exactly one status icon when degraded in the ${phase} phase`, () => {
      const line = renderModal(progress(phase, true));
      // The orange warning is the only icon: no phase icon, no spinner, no legacy span.
      expect(legacySpans(line)).toHaveLength(0);
      expect(kitIcons(line)).toHaveLength(1);
      expect(kitIcons(line)[0].getAttribute("data-icon")).toBe("warning");
      expect(kitIcons(line)[0].getAttribute("class")).toContain("text-warning");
    });

    it(`shows exactly one status icon when healthy in the ${phase} phase`, () => {
      const line = renderModal(progress(phase, false));
      expect(legacySpans(line)).toHaveLength(0);
      expect(kitIcons(line)).toHaveLength(1);
      expect(kitIcons(line)[0].getAttribute("data-icon")).toBe(
        phase === "done"
          ? "check_circle"
          : phase === "warning"
            ? "warning"
            : phase === "error"
              ? "error"
              : null
      );
      expect(kitIcons(line)[0].getAttribute("data-slot")).toBe(
        phase === "fetching" || phase === "importing" ? "spinner" : null
      );
    });
  }
});
