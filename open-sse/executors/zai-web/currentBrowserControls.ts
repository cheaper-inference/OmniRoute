import type { Locator, Page } from "playwright";
import { z } from "zod";
import { buildErrorBody } from "../../utils/error.ts";
import { browserModelName, type ZaiThinkingConfig, type ZaiVlmConfig } from "./protocol.ts";

const completionSchema = z.object({
  model: z.string(),
  features: z.object({
    enable_thinking: z.literal(true),
    reasoning_effort: z.enum(["low", "high", "max"]),
    web_search: z.literal(false),
    auto_web_search: z.literal(false),
    vlm_web_search_enable: z.literal(false),
    vlm_tools_enable: z.literal(false),
    vlm_website_mode: z.literal(false),
    image_generation: z.literal(false),
  }),
});

export function matchesCurrentZaiBrowserRequest(
  body: unknown,
  expected: { model: string; effort: ZaiThinkingConfig["effort"] }
): boolean {
  const parsed = completionSchema.safeParse(body);
  return (
    parsed.success &&
    parsed.data.model === expected.model &&
    parsed.data.features.reasoning_effort === expected.effort
  );
}

async function openCurrentModelMenu(page: Page): Promise<Locator | null> {
  const later = page.getByRole("button", { name: "Maybe Later", exact: true });
  if (await later.isVisible()) await later.evaluate((element) => (element as HTMLElement).click());
  const tour = page.locator('#driver-popover-content [aria-label="Close"]');
  if (await tour.isVisible()) await tour.evaluate((element) => (element as HTMLElement).click());

  const selector = page.locator('[aria-label="Select a model"]').first();
  await selector.waitFor({ state: "visible", timeout: 10_000 });
  await selector.evaluate((element) => (element as HTMLElement).click());
  const legacy = page
    .locator("[data-dropdown-menu-trigger]")
    .filter({ hasText: "Deep Think", visible: true })
    .first();
  const slider = page.getByRole("slider", { name: "Effort", exact: true });
  await legacy
    .or(slider.filter({ visible: true }))
    .first()
    .waitFor({ state: "visible", timeout: 10_000 });
  if (await legacy.isVisible()) {
    await page.keyboard.press("Escape");
    return null;
  }
  const menu = page.getByRole("menu").filter({ has: slider });
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  return menu;
}

async function selectCurrentModelAndEffort(
  page: Page,
  menu: Locator,
  modelId: string,
  effort: ZaiThinkingConfig["effort"]
): Promise<string> {
  const name = browserModelName(modelId);
  const model = menu
    .locator('[aria-label="model-item"]')
    .filter({ hasText: name })
    .filter({ has: page.getByText(name, { exact: true }) });
  const value = await model.getAttribute("data-value");
  if (!value) throw new Error("Z.ai model-menu item has no model value");
  if ((await model.getAttribute("data-selected")) !== "true") {
    await model.evaluate((element) => (element as HTMLElement).click());
    await page
      .locator('[aria-label="Select a model"]')
      .first()
      .evaluate((element) => (element as HTMLElement).click());
    await menu.waitFor({ state: "visible", timeout: 5_000 });
  }
  if ((await model.getAttribute("data-selected")) !== "true") {
    throw new Error("Z.ai model-menu selection was not applied");
  }
  const slider = menu.getByRole("slider", { name: "Effort", exact: true });
  const label = { low: "Low", high: "High", max: "Max" }[effort];
  if ((await slider.getAttribute("aria-valuetext")) !== label) {
    await slider.press(effort === "max" ? "End" : "Home");
    if (effort === "high") await slider.press("ArrowRight");
    await page.waitForFunction(
      (expected) =>
        document
          .querySelector('[role="slider"][aria-label="Effort"]')
          ?.getAttribute("aria-valuetext") === expected,
      label,
      { timeout: 3_000 }
    );
  }
  if ((await slider.getAttribute("aria-valuetext")) !== label) {
    throw new Error("Z.ai effort selection was not applied");
  }
  await page.keyboard.press("Escape");
  return value;
}

/** Return false after closing the menu when the original layout owns configuration. */
export async function tryConfigureCurrentZaiBrowserRequest(
  page: Page,
  input: { modelId: string; thinking: ZaiThinkingConfig; vlm: ZaiVlmConfig }
): Promise<boolean> {
  const menu = await openCurrentModelMenu(page);
  if (!menu) return false;
  if (!input.thinking.enabled || !input.thinking.effortSupported) {
    throw new Error("The current Z.ai model menu requires supported thinking effort");
  }
  if (input.vlm.webSearchEnabled || input.vlm.toolsEnabled || input.vlm.websiteModeEnabled) {
    throw new Error("The current Z.ai page has no configurable Search or Tools control");
  }
  const model = await selectCurrentModelAndEffort(page, menu, input.modelId, input.thinking.effort);
  await page.route(
    (url) => url.origin === "https://chat.z.ai" && url.pathname === "/api/v2/chat/completions",
    async (route) => {
      if (route.request().method() !== "POST") return route.continue();
      let body: unknown;
      try {
        body = route.request().postDataJSON();
      } catch {
        body = null;
      }
      if (!matchesCurrentZaiBrowserRequest(body, { model, effort: input.thinking.effort })) {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify(
            buildErrorBody(
              400,
              "Z.ai browser request settings do not match the requested model and features",
              undefined,
              { type: "invalid_request_error" }
            )
          ),
        });
        return;
      }
      await route.continue();
    }
  );
  return true;
}
