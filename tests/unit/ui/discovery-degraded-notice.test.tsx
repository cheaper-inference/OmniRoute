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
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

function mockCatalog(payload: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (input === "/api/provider-models" && init?.method === "POST") {
        return { ok: true } as Response;
      }
      return { ok: true, json: async () => payload } as Response;
    })
  );
}

const DEGRADED = {
  source: "local_catalog",
  warning: "API unavailable — using local catalog",
  degraded: true,
  error: "HTTP 500",
};

/**
 * The built-in catalog some providers are expected to use: the server sends a
 * warning with it, but the discovery did not fail.
 */
const EXPECTED_CATALOG = {
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
  it("keeps the reason of the fallback out of the status line and in the state", async () => {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ ...DEGRADED, models: [{ id: "new-model", name: "New Model" }] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    // The server's own text is a log line, not the headline.
    expect(progress.status).not.toContain("API unavailable");
    expect(progress.logs).toContain("API unavailable — using local catalog");
  });

  it("shows the fallback notice above the status line of the import dialog", async () => {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ ...DEGRADED, models: [{ id: "new-model", name: "New Model" }] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

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

  it("keeps the degraded state visible after a successful import, without a reload", async () => {
    const fetchProviderModelMeta = vi.fn().mockResolvedValue(undefined);
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = renderHook(
      buildParams({
        connections: [{ id: "conn-1", isActive: true }],
        fetchProviderModelMeta,
      })
    );
    mockCatalog({ ...DEGRADED, models: [{ id: "new-model", name: "New Model" }] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.importedCount).toBe(1);
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    // The dialog keeps the notice: the page must not reload under the operator.
    expect(setTimeoutSpy.mock.calls.some(([, delay]) => delay === 2000)).toBe(false);
    expect(fetchProviderModelMeta).toHaveBeenCalled();
    setTimeoutSpy.mockRestore();
  });

  it("ends in the warning phase when the fallback catalog holds no model", async () => {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ ...DEGRADED, models: [] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("warning");
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    expect(progress.status).toBe("noModelsFound");
  });

  it("keeps the phase message out of the log of the empty fallback catalog", async () => {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ ...DEGRADED, models: [] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    // The server's own text is the log line, the phase message is the status.
    expect(progress.logs).toContain("API unavailable — using local catalog");
    expect(progress.logs).not.toContain("noModelsFound");
  });

  it("ends in the warning phase when the fallback catalog holds no new model", async () => {
    const hook = renderHook(
      buildParams({
        connections: [{ id: "conn-1", isActive: true }],
        models: [{ id: "known-model", name: "Known Model" }],
      })
    );
    mockCatalog({ ...DEGRADED, models: [{ id: "known-model", name: "Known Model" }] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("warning");
    expect(progress.degraded).toBe(true);
    expect(progress.degradedCause).toBe("HTTP 500");
    expect(progress.status).toBe("allModelsAlreadyImported");
  });

  it("leaves a successful import unchanged: no degraded state, and the page reloads", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ source: "api", models: [{ id: "new-model", name: "New Model" }] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(setTimeoutSpy.mock.calls.some(([, delay]) => delay === 2000)).toBe(true);
    setTimeoutSpy.mockRestore();
  });

  it("ends in the done phase when the built-in catalog is the source the operator asked for", async () => {
    const hook = renderHook(
      buildParams({
        connections: [{ id: "conn-1", isActive: true }],
        models: [{ id: "known-model", name: "Known Model" }],
      })
    );
    mockCatalog({
      ...EXPECTED_CATALOG,
      models: [{ id: "known-model", name: "Known Model" }],
    });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(progress.status).toBe("allModelsAlreadyImported");

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

  it("ends in the done phase when the expected catalog holds no model", async () => {
    const hook = renderHook(buildParams({ connections: [{ id: "conn-1", isActive: true }] }));
    mockCatalog({ ...EXPECTED_CATALOG, models: [] });

    await act(async () => {
      await hook.get().handleImportModels();
    });

    const progress = hook.get().importProgress;
    expect(progress.phase).toBe("done");
    expect(progress.degraded).toBeFalsy();
    expect(progress.degradedCause).toBeUndefined();
    expect(progress.status).toBe("noModelsFound");
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

  const kitIcons = (line: Element) => line.querySelectorAll("[data-icon]");
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
              : "progress_activity"
      );
    });
  }
});
