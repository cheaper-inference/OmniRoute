import { expect, test } from "@playwright/test";
import { configureZaiBrowserRequest } from "../../open-sse/executors/zai-web/browserAutomation.ts";

// This fixture covers browser interactions, not the live Z.ai markup or slider implementation.
const modelMenu = `
  <button aria-label="Select a model">GLM-5.3-Flash</button>
  <div role="menu" hidden>
    <button aria-label="model-item" data-value="x-preview-l" data-selected="true">GLM-5.3-Flash</button>
    <button aria-label="model-item" data-value="glm-5.3" data-selected="false">GLM-5.3</button>
    <div role="slider" aria-label="Effort" aria-valuetext="Max"
      aria-valuemin="0" aria-valuemax="2" aria-valuenow="2" tabindex="0"
      style="width: 120px; height: 20px"></div>
  </div>
  <div role="menu" hidden><button aria-label="model-item">GLM-5.3</button></div>
  <script>
    const selector = document.querySelector('[aria-label="Select a model"]');
    const menu = document.querySelector('[role="menu"]');
    selector.addEventListener("click", () => { menu.hidden = !menu.hidden; });
    for (const model of menu.querySelectorAll('[aria-label="model-item"]')) {
      model.addEventListener("click", () => {
        for (const item of menu.querySelectorAll('[aria-label="model-item"]')) {
          item.dataset.selected = String(item === model);
        }
        selector.textContent = model.textContent;
        menu.hidden = true;
      });
    }
    const slider = menu.querySelector('[role="slider"]');
    slider.addEventListener("keydown", (event) => {
      let value = Number(slider.getAttribute("aria-valuenow"));
      if (event.key === "Home") value = 0;
      else if (event.key === "End") value = 2;
      else if (event.key === "ArrowRight") value = Math.min(2, value + 1);
      else return;
      event.preventDefault();
      slider.setAttribute("aria-valuenow", String(value));
      slider.setAttribute("aria-valuetext", ["Low", "High", "Max"][value]);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") menu.hidden = true;
    });
  </script>
`;

const input = {
  modelId: "glm-5.3",
  thinking: { enabled: true, effort: "max" as const, effortSupported: true, supported: true },
  vlm: { toolsEnabled: false, webSearchEnabled: false, websiteModeEnabled: false },
};

for (const [effort, label] of [
  ["low", "Low"],
  ["high", "High"],
  ["max", "Max"],
] as const) {
  test(`current model menu switches models and applies ${effort} effort in Chromium`, async ({
    page,
  }) => {
    await page.setContent(modelMenu);
    if (effort === "max") {
      await page.locator('[role="slider"]').evaluate((slider) => {
        slider.setAttribute("aria-valuenow", "0");
        slider.setAttribute("aria-valuetext", "Low");
      });
    }

    await configureZaiBrowserRequest(page, {
      ...input,
      thinking: { ...input.thinking, effort },
    });

    await expect(page.getByRole("button", { name: "Select a model", exact: true })).toHaveText(
      "GLM-5.3"
    );
    await expect(page.locator('[data-value="glm-5.3"]')).toHaveAttribute("data-selected", "true");
    await expect(page.locator('[data-value="x-preview-l"]')).toHaveAttribute(
      "data-selected",
      "false"
    );
    await expect(page.locator('[role="slider"]')).toHaveAttribute("aria-valuetext", label);
    await expect(page.locator('[role="menu"]').first()).toBeHidden();
  });
}

test("an unavailable model uses the explicit five-second attribute timeout", async ({ page }) => {
  test.setTimeout(40_000);
  page.setDefaultTimeout(30_000);
  await page.setContent(modelMenu);
  let failure: unknown;
  try {
    await configureZaiBrowserRequest(page, { ...input, modelId: "glm-5.2" });
  } catch (error) {
    failure = error;
  }
  expect(failure).toBeInstanceOf(Error);
  expect((failure as Error).message).toContain("Timeout 5000ms exceeded");
});
