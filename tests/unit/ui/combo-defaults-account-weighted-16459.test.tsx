// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { chooseKitSelectValue, kitSelectByLabel } from "../../helpers/kitSelect";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

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

async function renderTab(strategy: string) {
  const patches: Patch[] = [];
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") patches.push({ url, body: JSON.parse(String(init.body)) });
      const data = url.endsWith("/combo-defaults")
        ? { comboDefaults: { strategy } }
        : url === "/api/providers"
          ? []
          : { fallbackStrategy: "round-robin", stickyRoundRobinLimit: 7 };
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
