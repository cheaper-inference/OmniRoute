// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import en from "@/i18n/messages/en.json";
import fa from "@/i18n/messages/fa.json";
import GlobalConfigTab from "@/app/(dashboard)/dashboard/settings/components/proxy/GlobalConfigTab";

const locale = vi.hoisted(() => ({ current: "en" as "en" | "fa" }));
vi.mock("next-intl", async () => {
  const { createTranslator } = await import("use-intl/core");
  return {
    useLocale: () => locale.current,
    useTranslations: (namespace: string) =>
      createTranslator({
        locale: locale.current,
        messages: locale.current === "fa" ? fa : en,
        namespace,
      }),
  };
});

// The configuration editor is outside this control's workflow. Keep the actual
// shared Card, Toggle, Button and Spinner, including their accessibility behavior.
vi.mock("@/shared/components", async () => {
  const [card, toggle, button, input, spinner, badge] = await Promise.all([
    import("@/shared/components/Card"),
    import("@/shared/components/Toggle"),
    import("@/shared/components/Button"),
    import("@/shared/components/Input"),
    import("@/shared/components/Loading"),
    import("@/shared/components/Badge"),
  ]);
  return {
    Card: card.default,
    Toggle: toggle.default,
    Button: button.default,
    Input: input.default,
    Spinner: spinner.Spinner,
    Badge: badge.default,
    ProxyConfigModal: () => null,
  };
});

const snapshot = (enabled: boolean, revision = 4) => ({
  defaultNewConnectionProxyEnabled: enabled,
  perKeyProxyEnabled: false,
  settingsRevision: revision,
});
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
let fetchMock: ReturnType<typeof vi.fn>;
let saved = snapshot(false);
let patchReply: (init: RequestInit) => Promise<Response>;
let loadReply: () => Promise<Response>;
const control = () =>
  screen.getByRole("switch", {
    name: (locale.current === "fa" ? fa : en).settings.defaultNewConnectionProxyEnabled,
  });

beforeEach(() => {
  locale.current = "en";
  saved = snapshot(false);
  loadReply = async () => json(saved);
  patchReply = async (init) => {
    const body = JSON.parse(String(init.body));
    saved = {
      ...saved,
      defaultNewConnectionProxyEnabled: body.defaultNewConnectionProxyEnabled,
      settingsRevision: saved.settingsRevision + 1,
    };
    return json(saved);
  };
  fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === "/api/settings/proxy?level=global") return json({ proxy: null });
    if (String(input) !== "/api/settings") throw new Error("Unexpected request");
    return init?.method === "PATCH" ? patchReply(init) : loadReply();
  });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("new connection proxy preference", () => {
  for (const enabled of [false, true]) {
    it(`loads confirmed ${enabled} without another settings GET`, async () => {
      saved = snapshot(enabled);
      render(<GlobalConfigTab />);
      await waitFor(() => expect(control().getAttribute("aria-checked")).toBe(String(enabled)));
      expect(
        screen
          .getByRole("switch", { name: en.settings.perKeyProxyEnabled })
          .getAttribute("aria-checked")
      ).toBe("false");
      expect(fetchMock.mock.calls.filter(([url]) => url === "/api/settings")).toHaveLength(1);
    });
  }

  it("keeps the saved value during loading and saving, and sends only the preference plus revision", async () => {
    const load = deferred<Response>();
    const save = deferred<Response>();
    loadReply = () => load.promise;
    patchReply = () => save.promise;
    render(<GlobalConfigTab />);
    expect(screen.queryByRole("switch")).toBeNull();
    load.resolve(json(snapshot(false)));
    await waitFor(() => expect(control()).toBeTruthy());
    fireEvent.click(control());
    fireEvent.click(control());
    expect(control().getAttribute("aria-checked")).toBe("false");
    expect((control() as HTMLInputElement).disabled).toBe(true);
    const patches = fetchMock.mock.calls.filter(([, init]) => init?.method === "PATCH");
    expect(patches).toHaveLength(1);
    expect(JSON.parse(patches[0][1].body)).toEqual({
      defaultNewConnectionProxyEnabled: true,
      expectedRevision: 4,
    });
    save.resolve(json(snapshot(true, 5)));
    await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
  });

  for (const status of [401, 403, 409, 400, 500]) {
    it(`preserves the last confirmed value on HTTP ${status} and reloads before retry`, async () => {
      patchReply = async () => json({ error: "synthetic" }, status);
      render(<GlobalConfigTab />);
      await waitFor(() => expect(control()).toBeTruthy());
      fireEvent.click(control());
      await screen.findByRole("alert");
      expect(control().getAttribute("aria-checked")).toBe("false");
      saved = snapshot(true, 9);
      fireEvent.click(screen.getByRole("button", { name: en.common.retry }));
      await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
      expect(screen.queryByRole("alert")).toBeNull();
    });
  }

  for (const failure of ["network", "invalid-json", "missing-confirmation"]) {
    it(`does not claim success on ${failure}`, async () => {
      patchReply = async () => {
        if (failure === "network") throw new TypeError("Network unavailable");
        if (failure === "invalid-json") return new Response("broken");
        return json({ ...snapshot(false), settingsRevision: 5 });
      };
      render(<GlobalConfigTab />);
      await waitFor(() => expect(control()).toBeTruthy());
      fireEvent.click(control());
      await screen.findByRole("alert");
      expect(control().getAttribute("aria-checked")).toBe("false");
    });
  }

  it("load failure shows a retry and never invents a saved state", async () => {
    loadReply = async () => json({}, 503);
    render(<GlobalConfigTab />);
    await screen.findByRole("alert");
    expect(screen.queryByRole("switch")).toBeNull();
    loadReply = async () => json(snapshot(true));
    fireEvent.click(screen.getByRole("button", { name: en.common.retry }));
    await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
  });

  it("uses the shared ON default for a missing setting and rejects malformed persisted values", async () => {
    loadReply = async () => json({ perKeyProxyEnabled: false, settingsRevision: 4 });
    const view = render(<GlobalConfigTab />);
    await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
    view.unmount();
    loadReply = async () => json({ ...snapshot(false), defaultNewConnectionProxyEnabled: "false" });
    render(<GlobalConfigTab />);
    await screen.findByRole("alert");
    expect(screen.queryByRole("switch")).toBeNull();
  });

  it("remount reads the persisted selection; late reads after unmount cannot change it", async () => {
    const stale = deferred<Response>();
    loadReply = () => stale.promise;
    const old = render(<GlobalConfigTab />);
    old.unmount();
    loadReply = async () => json(saved);
    const view = render(<GlobalConfigTab />);
    await waitFor(() => expect(control()).toBeTruthy());
    stale.resolve(json(snapshot(true, 99)));
    expect(control().getAttribute("aria-checked")).toBe("false");
    fireEvent.click(control());
    await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
    view.unmount();
    render(<GlobalConfigTab />);
    await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
  });

  for (const language of ["en", "fa"] as const) {
    it(`has a translated accessible name and keyboard activation in ${language}`, async () => {
      locale.current = language;
      const view = render(
        <div dir={language === "fa" ? "rtl" : "ltr"}>
          <GlobalConfigTab />
        </div>
      );
      await waitFor(() => expect(control()).toBeTruthy());
      const user = userEvent.setup();
      control().focus();
      await user.keyboard(" ");
      await waitFor(() => expect(control().getAttribute("aria-checked")).toBe("true"));
      expect(view.container.textContent).toContain(
        (language === "fa" ? fa : en).settings.defaultNewConnectionProxyEnabledDesc
      );
    });
  }
});
