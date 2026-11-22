// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ManagedCliRuntimeItem } from "../../../src/lib/cliTools/managedCliRuntimes";
import CliRuntimeUpdatesPanel from "../../../src/app/(dashboard)/dashboard/cli-code/components/CliRuntimeUpdatesPanel";

const { refreshModels } = vi.hoisted(() => ({ refreshModels: vi.fn() }));

vi.mock("@/shared/services/managedCliModelRefresh", () => ({
  refreshManagedCliProviderModels: refreshModels,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

const API_PATH = "/api/cli-tools/runtime/managed";
const IDENTITY_PATH = "/api/settings/cli-versions";

function runtime(overrides: Partial<ManagedCliRuntimeItem> = {}): ManagedCliRuntimeItem {
  return {
    id: "codex",
    name: "Codex CLI",
    packageName: "@openai/codex",
    installedVersion: "0.165.0",
    latestVersion: null,
    installed: true,
    runnable: true,
    source: "external",
    commandPath: "/usr/local/bin/codex",
    updateAvailable: false,
    canUpdate: true,
    checkedAt: null,
    error: null,
    reason: "unchecked",
    ...overrides,
  };
}

function available(overrides: Partial<ManagedCliRuntimeItem> = {}) {
  return runtime({
    latestVersion: "0.170.0",
    updateAvailable: true,
    checkedAt: "2026-11-19T13:17:00.000Z",
    reason: "update_available",
    ...overrides,
  });
}

function updated(item = available()) {
  return {
    item: {
      ...item,
      installedVersion: item.latestVersion,
      source: "managed",
      updateAvailable: false,
      reason: "up_to_date",
    },
    activated: true,
    effects: { clientVersionRefreshed: true, runtimeCacheInvalidated: true },
  };
}

function response(data: unknown, status = 200): Response {
  return { ok: status >= 200 && status < 300, status, json: async () => data } as Response;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe("CLI runtime updates panel", () => {
  const fetchMock = vi.fn();
  let inventory: ManagedCliRuntimeItem[];
  let onRuntimeRequest: (init?: RequestInit) => Response | Promise<Response>;

  function mutationBodies(): Array<{ action: string; toolId?: string }> {
    return fetchMock.mock.calls
      .filter(([url, init]) => url === API_PATH && init?.method === "POST")
      .map(([, init]) => JSON.parse(String(init.body)));
  }

  async function mount() {
    const view = render(<CliRuntimeUpdatesPanel />);
    await screen.findByRole("region", { name: "Codex CLI" });
    await waitFor(() =>
      expect(
        (screen.getByRole("button", { name: "Check for updates" }) as HTMLButtonElement).disabled
      ).toBe(false)
    );
    return view;
  }

  it("formats the checked time in the dashboard locale", async () => {
    const checkedAt = "2026-11-05T13:17:00.000Z";
    inventory = [available({ checkedAt })];
    const view = await mount();
    const time = view.container.querySelector("time");
    expect(time?.getAttribute("datetime")).toBe(checkedAt);
    expect(time?.textContent).toBe(new Date(checkedAt).toLocaleString("en", { hour12: false }));
  });

  beforeEach(() => {
    inventory = [runtime()];
    fetchMock.mockReset();
    refreshModels.mockReset().mockResolvedValue({ attempted: 0, refreshed: 0, failed: 0 });
    onRuntimeRequest = () => response({ items: inventory });
    fetchMock.mockImplementation((url: string, init?: RequestInit) => {
      if (url === API_PATH) return Promise.resolve(onRuntimeRequest(init));
      if (url === IDENTITY_PATH)
        return Promise.resolve(
          response({
            items: [
              { key: "codex", effective: "0.169.0", source: "settings" },
              { key: "claude", effective: "2.1.260", source: "default" },
            ],
          })
        );
      throw new Error(`Unexpected test request: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("distinguishes installed binaries, advertised client versions and unknown updates", async () => {
    await mount();
    const card = screen.getByRole("region", { name: "Codex CLI" });
    expect(within(card).getByText("0.165.0").getAttribute("dir")).toBe("ltr");
    expect(within(card).getByText("Update status unknown")).toBeTruthy();
    expect(within(card).getByText("System or container installation")).toBeTruthy();
    expect(within(card).queryByText("No newer stable release")).toBeNull();
    expect(
      (within(card).getByRole("button", { name: "Update Codex CLI" }) as HTMLButtonElement).disabled
    ).toBe(true);
    expect(await screen.findByText("0.169.0")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Provider client versions" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Codex provider settings" }).getAttribute("href")).toBe(
      "/dashboard/providers/codex"
    );
    expect(mutationBodies()).toEqual([]);
  });

  it("checks without installing and enables an update only after a known newer release", async () => {
    await mount();
    onRuntimeRequest = () => response({ items: [available()] });
    fireEvent.click(screen.getByRole("button", { name: "Check for updates" }));
    await screen.findByText("Update available");
    expect(mutationBodies()).toEqual([{ action: "check" }]);
    expect(
      (screen.getByRole("button", { name: "Update Codex CLI" }) as HTMLButtonElement).disabled
    ).toBe(false);
    expect(refreshModels).not.toHaveBeenCalled();
  });

  it("reports a verified update separately from model discovery failure", async () => {
    inventory = [available()];
    await mount();
    onRuntimeRequest = () => response(updated());
    refreshModels.mockResolvedValue({ attempted: 2, refreshed: 1, failed: 1 });
    fireEvent.click(screen.getByRole("button", { name: "Update Codex CLI" }));
    await screen.findByText(
      "Finished. CLIs updated: 1. Updates not confirmed: 0. Failed checks: 0."
    );
    expect(mutationBodies()).toEqual([{ action: "update", toolId: "codex" }]);
    expect(
      within(screen.getByRole("region", { name: "Codex CLI" })).getByText("Managed by OmniRoute")
    ).toBeTruthy();
    expect(
      screen.getByText(/The CLI update succeeded, but some model refreshes failed/)
    ).toBeTruthy();
    expect(screen.getByText("Model discovery refreshed for 1 provider connection.")).toBeTruthy();
    expect(refreshModels).toHaveBeenCalledWith("codex", expect.any(Function), {
      signal: expect.any(AbortSignal),
    });
    await waitFor(() =>
      expect(fetchMock.mock.calls.filter(([url]) => url === IDENTITY_PATH)).toHaveLength(2)
    );
  });

  it("keeps a no-op response without refreshing provider models", async () => {
    inventory = [available()];
    await mount();
    onRuntimeRequest = () => response({ ...updated(), activated: false });
    fireEvent.click(screen.getByRole("button", { name: "Update Codex CLI" }));
    await screen.findByText(
      "Finished. CLIs updated: 0. Updates not confirmed: 0. Failed checks: 0."
    );
    expect(refreshModels).not.toHaveBeenCalled();
  });

  it("checks and then installs supported detected updates sequentially", async () => {
    const second = available({
      id: "claude",
      name: "Claude Code",
      packageName: "@anthropic-ai/claude-code",
    });
    inventory = [runtime(), runtime({ ...second, latestVersion: null, updateAvailable: false })];
    await mount();
    const pending = deferred<Response>();
    onRuntimeRequest = (init) => {
      const body = JSON.parse(String(init?.body));
      if (body.action === "check")
        return response({
          items: [
            available(),
            second,
            available({
              id: "openclaw",
              name: "OpenClaw",
              canUpdate: false,
              reason: "update_unsupported",
            }),
            available({
              id: "qoder",
              name: "Qoder CLI",
              source: "override",
              canUpdate: false,
              reason: "explicit_override",
            }),
            available({
              id: "droid",
              name: "Droid",
              installed: false,
              source: "missing",
              canUpdate: false,
              reason: "not_installed",
            }),
          ],
        });
      return body.toolId === "codex" ? pending.promise : response(updated(second));
    };
    fireEvent.click(screen.getByRole("button", { name: "Check and update installed CLIs" }));
    await waitFor(() =>
      expect(mutationBodies()).toEqual([{ action: "check" }, { action: "update", toolId: "codex" }])
    );
    expect(
      (screen.getByRole("button", { name: "Update Claude Code" }) as HTMLButtonElement).disabled
    ).toBe(true);
    await act(async () => {
      pending.resolve(response(updated()));
    });
    await screen.findByText(
      "Finished. CLIs updated: 2. Updates not confirmed: 0. Failed checks: 0."
    );
    expect(mutationBodies()).toEqual([
      { action: "check" },
      { action: "update", toolId: "codex" },
      { action: "update", toolId: "claude" },
    ]);
    expect(refreshModels).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(/Model discovery refreshed for/)).toBeNull();
  });

  it("continues the batch after one failed installation and preserves that old version", async () => {
    await mount();
    const second = available({ id: "claude", name: "Claude Code" });
    onRuntimeRequest = (init) => {
      const body = JSON.parse(String(init?.body));
      if (body.action === "check") return response({ items: [available(), second] });
      return body.toolId === "codex"
        ? response(
            { error: { message: "Installation failed. Previous runtime remains active." } },
            502
          )
        : response(updated(second));
    };
    fireEvent.click(screen.getByRole("button", { name: "Check and update installed CLIs" }));
    await screen.findByText(
      "Finished. CLIs updated: 1. Updates not confirmed: 1. Failed checks: 0."
    );
    expect(
      within(screen.getByRole("region", { name: "Codex CLI" })).getByText("0.165.0")
    ).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toContain("Previous runtime remains active");
    expect(refreshModels).toHaveBeenCalledTimes(1);
  });

  it("keeps failed checks distinct from being up to date", async () => {
    inventory = [runtime({ reason: "check_failed", error: "Registry unavailable" })];
    await mount();
    expect(screen.getByText("Check failed")).toBeTruthy();
    expect(screen.getByText("Registry unavailable")).toBeTruthy();
    expect(screen.queryByText("No newer stable release")).toBeNull();
    expect(
      (screen.getByRole("button", { name: "Update Codex CLI" }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it("explains blocked overrides and coordinated OpenClaw updates", async () => {
    inventory = [
      runtime({ source: "override", canUpdate: false, reason: "explicit_override" }),
      available({
        id: "openclaw",
        name: "OpenClaw",
        canUpdate: false,
        reason: "update_unsupported",
      }),
    ];
    await mount();
    expect(screen.getByText(/An explicit CLI binary setting selects/)).toBeTruthy();
    expect(screen.getByText(/OpenClaw requires its coordinated updater/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "OpenClaw update instructions" }).getAttribute("href")
    ).toBe("https://docs.openclaw.ai/install/updating");
    expect(
      (screen.getByRole("button", { name: "Update OpenClaw" }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it("explains why a runnable CLI with an unknown version cannot be updated", async () => {
    inventory = [runtime({ installedVersion: null, canUpdate: false, reason: "version_unknown" })];
    await mount();
    expect(screen.getByText(/This CLI runs, but its installed version/)).toBeTruthy();
    expect(screen.getByText("Update status unknown")).toBeTruthy();
    expect(screen.queryByText("No newer stable release")).toBeNull();
    expect(
      (screen.getByRole("button", { name: "Update Codex CLI" }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it.each([
    [401, "Sign in to OmniRoute with management access"],
    [403, "requires a local connection and management access"],
  ])("shows actionable access failure for HTTP %s", async (status, message) => {
    onRuntimeRequest = () => response({ error: { message: "Denied" } }, Number(status));
    render(<CliRuntimeUpdatesPanel />);
    expect((await screen.findByRole("alert")).textContent).toContain(message);
    onRuntimeRequest = () => response({ items: inventory });
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await screen.findByRole("region", { name: "Codex CLI" });
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("retries a network failure without installing a CLI", async () => {
    onRuntimeRequest = () => Promise.reject(new TypeError("Failed to fetch"));
    render(<CliRuntimeUpdatesPanel />);
    expect((await screen.findByRole("alert")).textContent).toContain("Could not reach OmniRoute");
    onRuntimeRequest = () => response({ items: inventory });
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await screen.findByRole("region", { name: "Codex CLI" });
    expect(mutationBodies()).toEqual([]);
  });

  it("rejects incomplete response data instead of showing false status", async () => {
    onRuntimeRequest = () => response({ items: [{ id: "codex" }] });
    render(<CliRuntimeUpdatesPanel />);
    expect((await screen.findByRole("alert")).textContent).toContain(
      "incomplete runtime information"
    );
    expect(screen.queryByText("No newer stable release")).toBeNull();
  });

  it("blocks duplicate actions even before disabled state renders", async () => {
    await mount();
    const pending = deferred<Response>();
    onRuntimeRequest = () => pending.promise;
    const button = screen.getByRole("button", { name: "Check for updates" });
    act(() => {
      fireEvent.click(button);
      fireEvent.click(button);
    });
    expect(mutationBodies()).toEqual([{ action: "check" }]);
    await act(async () => {
      pending.resolve(response({ items: [available()] }));
    });
    await screen.findByText("Update available");
  });

  it("aborts navigation-away requests and never starts the next batch step", async () => {
    const view = await mount();
    const pending = deferred<Response>();
    let signal: AbortSignal | null = null;
    onRuntimeRequest = (init) => {
      signal = init?.signal ?? null;
      return pending.promise;
    };
    fireEvent.click(screen.getByRole("button", { name: "Check and update installed CLIs" }));
    view.unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      pending.resolve(response({ items: [available()] }));
    });
    expect(mutationBodies()).toEqual([{ action: "check" }]);
    expect(refreshModels).not.toHaveBeenCalled();
  });

  it("does not block runtime management when advertised identity lookup fails", async () => {
    fetchMock.mockImplementation((url: string, init?: RequestInit) =>
      url === IDENTITY_PATH
        ? Promise.resolve(response({}, 500))
        : Promise.resolve(onRuntimeRequest(init))
    );
    await mount();
    expect(await screen.findByText(/Provider client versions could not be loaded/)).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Check for updates" }) as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it("shows a warning for an incomplete provider identity response", async () => {
    fetchMock.mockImplementation((url: string, init?: RequestInit) =>
      url === IDENTITY_PATH
        ? Promise.resolve(response({ items: [] }))
        : Promise.resolve(onRuntimeRequest(init))
    );
    await mount();
    expect(await screen.findByText(/Provider client versions could not be loaded/)).toBeTruthy();
  });

  it("treats a wrong runtime in the update response as failure and does not refresh models", async () => {
    inventory = [available()];
    await mount();
    onRuntimeRequest = () => response(updated(available({ id: "claude" })));
    fireEvent.click(screen.getByRole("button", { name: "Update Codex CLI" }));
    await screen.findByText(
      "Finished. CLIs updated: 0. Updates not confirmed: 1. Failed checks: 0."
    );
    expect(screen.getByRole("alert").textContent).toContain("incomplete runtime information");
    expect(refreshModels).not.toHaveBeenCalled();
  });
  it("shows the npm policy requirement without claiming an update or refreshing models", async () => {
    inventory = [available({ id: "claude", name: "Claude Code" })];
    render(<CliRuntimeUpdatesPanel />);
    await screen.findByRole("region", { name: "Claude Code" });
    const message =
      "This CLI requires stable npm 11.18+ or npm 12. Update npm separately and retry.";
    onRuntimeRequest = () =>
      response({ error: { message, details: { code: "npm_policy_unsupported" } } }, 409);
    fireEvent.click(screen.getByRole("button", { name: "Update Claude Code" }));
    await screen.findByText(
      "Finished. CLIs updated: 0. Updates not confirmed: 1. Failed checks: 0."
    );
    expect(screen.getByRole("alert").textContent).toContain(message);
    expect(refreshModels).not.toHaveBeenCalled();
  });
});
