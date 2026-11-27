// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { chooseKitSelectValue, kitSelectByLabel } from "../../helpers/kitSelect";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

const { default: ComboDefaultsTab } =
  await import("../../../src/app/(dashboard)/dashboard/settings/components/ComboDefaultsTab");

type Patch = { url: string; body: Record<string, unknown> };
let root: ReturnType<typeof createRoot> | undefined;
let container: HTMLDivElement | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  container?.remove();
  vi.unstubAllGlobals();
});

type GeminiCacheServer = { mode?: "off" | "implicit"; failNextSettingsPatch?: boolean };

async function renderTab(strategy: string, geminiCacheServer: GeminiCacheServer = {}) {
  const patches: Patch[] = [];
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") {
        const body = JSON.parse(String(init.body));
        patches.push({ url, body });
        if (url === "/api/settings") {
          if (geminiCacheServer.failNextSettingsPatch) {
            geminiCacheServer.failNextSettingsPatch = false;
            return { ok: false } as Response;
          }
          if (body.geminiPromptCacheMode !== undefined) {
            geminiCacheServer.mode = body.geminiPromptCacheMode;
          }
        }
      }
      const data = url.endsWith("/combo-defaults")
        ? { comboDefaults: { strategy } }
        : url === "/api/providers"
          ? []
          : {
              fallbackStrategy: "round-robin",
              stickyRoundRobinLimit: 7,
              geminiPromptCacheMode: geminiCacheServer.mode,
            };
      return { ok: true, json: async () => data } as Response;
    })
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root!.render(<ComboDefaultsTab />));
  return patches;
}

// KEA-7886: the default-strategy picker is the kit Select (was a role="tab" strip).
function chooseStrategy(value: string) {
  chooseKitSelectValue(kitSelectByLabel("comboStrategyAria", container!), value);
}

async function clickButton(text: string, selector = "button") {
  const button = Array.from(container!.querySelectorAll<HTMLButtonElement>(selector)).find((el) =>
    el.textContent?.includes(text)
  );
  expect(button, `button ${text} must be rendered`).toBeDefined();
  await act(async () => button!.click());
}

it("#16459 selecting weighted combo defaults does not PATCH global account routing", async () => {
  const patches = await renderTab("priority");
  chooseStrategy("weighted");
  await act(async () => {});
  expect(patches).toEqual([]);
});

it("#16459 saving weighted combo defaults keeps weighted only at combo scope", async () => {
  const patches = await renderTab("weighted");
  await clickButton("saveComboDefaults");
  const comboPatch = patches.find((patch) => patch.url.endsWith("/combo-defaults"));
  expect(comboPatch?.body.comboDefaults).toMatchObject({ strategy: "weighted" });
  const settingsPatch = patches.find((patch) => patch.url === "/api/settings");
  expect(settingsPatch).toBeDefined();
  expect(settingsPatch!.body).not.toHaveProperty("fallbackStrategy");
  expect(settingsPatch!.body).not.toHaveProperty("stickyRoundRobinLimit");
});

it("#16459 supported round-robin combo defaults still sync account strategy and sticky limit", async () => {
  const patches = await renderTab("priority");
  chooseStrategy("round-robin");
  await act(async () => {});
  expect(patches[0]).toEqual({ url: "/api/settings", body: { fallbackStrategy: "round-robin" } });
  await clickButton("saveComboDefaults");
  expect(patches.filter((patch) => patch.url === "/api/settings")[1].body).toMatchObject({
    fallbackStrategy: "round-robin",
    stickyRoundRobinLimit: 7,
  });
});

it("renders the Gemini cache switch off by default and saves an explicit opt-in", async () => {
  const patches = await renderTab("priority");
  const toggle = container!.querySelector<HTMLInputElement>(
    '[role="switch"][aria-label="geminiPromptCacheMode"]'
  );
  expect(toggle?.getAttribute("aria-checked")).toBe("false");
  await act(async () => toggle!.click());
  expect(toggle?.getAttribute("aria-checked")).toBe("true");
  expect(patches).toEqual([]);
  await clickButton("saveComboDefaults");
  expect(patches.find(({ url }) => url === "/api/settings")?.body).toMatchObject({
    geminiPromptCacheMode: "implicit",
  });
  expect(
    patches.find(({ url }) => url.endsWith("/combo-defaults"))?.body.comboDefaults
  ).not.toHaveProperty("geminiPromptCacheMode");
});

it.each([
  ["implicit", "off", "true"],
  ["off", "implicit", "false"],
] as const)(
  "does not overwrite a concurrent Gemini cache change from %s to %s on an unrelated save",
  async (loaded, current, checked) => {
    const server: GeminiCacheServer = { mode: loaded };
    const patches = await renderTab("priority", server);
    const toggle = container!.querySelector('[role="switch"][aria-label="geminiPromptCacheMode"]');
    expect(toggle?.getAttribute("aria-checked")).toBe(checked);

    // Another settings client updates the value while the original tab stays open.
    server.mode = current;
    await clickButton("saveComboDefaults");
    expect(patches.find(({ url }) => url === "/api/settings")?.body).not.toHaveProperty(
      "geminiPromptCacheMode"
    );
    expect(server.mode).toBe(current);
  }
);

it("retries an explicit Gemini cache opt-out and only sends it until the save succeeds", async () => {
  const server: GeminiCacheServer = { mode: "implicit", failNextSettingsPatch: true };
  const patches = await renderTab("priority", server);
  const toggle = container!.querySelector<HTMLInputElement>(
    '[role="switch"][aria-label="geminiPromptCacheMode"]'
  );
  expect(toggle?.getAttribute("aria-checked")).toBe("true");
  await act(async () => toggle!.click());
  expect(toggle?.getAttribute("aria-checked")).toBe("false");

  await clickButton("saveComboDefaults");
  expect(server.mode).toBe("implicit");
  await clickButton("saveComboDefaults");
  expect(server.mode).toBe("off");
  await clickButton("saveComboDefaults");

  const settings = patches.filter(({ url }) => url === "/api/settings");
  expect(settings).toHaveLength(3);
  expect(settings[0].body).toHaveProperty("geminiPromptCacheMode", "off");
  expect(settings[1].body).toHaveProperty("geminiPromptCacheMode", "off");
  expect(settings[2].body).not.toHaveProperty("geminiPromptCacheMode");
});

it("omits the Gemini cache setting when the toggle returns to its loaded value", async () => {
  const patches = await renderTab("priority", { mode: "off" });
  const toggle = container!.querySelector<HTMLInputElement>(
    '[role="switch"][aria-label="geminiPromptCacheMode"]'
  );
  expect(toggle?.getAttribute("aria-checked")).toBe("false");
  await act(async () => toggle!.click());
  await act(async () => toggle!.click());
  await clickButton("saveComboDefaults");
  expect(patches.find(({ url }) => url === "/api/settings")?.body).not.toHaveProperty(
    "geminiPromptCacheMode"
  );
});
