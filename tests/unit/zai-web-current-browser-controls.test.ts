import assert from "node:assert/strict";
import { test } from "node:test";
import type { Page, Route } from "playwright";
import { configureZaiBrowserRequest } from "../../open-sse/executors/zai-web/browserAutomation.ts";
import {
  matchesCurrentZaiBrowserRequest,
  tryConfigureCurrentZaiBrowserRequest,
} from "../../open-sse/executors/zai-web/currentBrowserControls.ts";

type Kind = "selector" | "legacy" | "layout" | "menu" | "model" | "slider" | "hidden" | "text";
const modelIds: Record<string, string> = {
  "GLM-5.3-Flash": "x-preview-l",
  "GLM-5.3": "glm-5.3",
  "GLM-5.2": "glm-5.2",
};

class BrowserFixture {
  selected = "GLM-5.3-Flash";
  effort = "Max";
  menuOpen = false;
  markerWaited = false;
  ignoreEffortKeys = false;
  legacy = false;
  guard?: (route: Route) => Promise<void>;
  predicate?: (url: URL) => boolean;
  page = {
    locator: (selector: string) => {
      if (selector === "[data-dropdown-menu-trigger]") return new FixtureLocator(this, "legacy");
      if (selector.startsWith("#driver")) return new FixtureLocator(this, "hidden");
      if (selector === '[aria-label="Select a model"]') return new FixtureLocator(this, "selector");
      throw new Error(`Unexpected selector: ${selector}`);
    },
    getByRole: (role: string) =>
      new FixtureLocator(this, role === "menu" ? "menu" : role === "slider" ? "slider" : "hidden"),
    getByText: (label: string) => new FixtureLocator(this, "text", label),
    keyboard: {
      press: async () => {
        this.menuOpen = false;
      },
    },
    waitForFunction: async (_fn: unknown, expected: string) => {
      assert.equal(this.effort, expected, "effort must be applied before submission");
    },
    route: async (predicate: (url: URL) => boolean, guard: (route: Route) => Promise<void>) => {
      this.predicate = predicate;
      this.guard = guard;
    },
  } as unknown as Page;
}

class FixtureLocator {
  constructor(
    readonly fixture: BrowserFixture,
    readonly kind: Kind,
    readonly label = ""
  ) {}
  first() {
    return this;
  }
  filter(options: { hasText?: string; has?: unknown; visible?: boolean }) {
    return options.hasText && this.kind === "model"
      ? new FixtureLocator(this.fixture, "model", options.hasText)
      : this;
  }
  or() {
    return new FixtureLocator(this.fixture, "layout");
  }
  locator() {
    return new FixtureLocator(this.fixture, "model");
  }
  getByRole() {
    return new FixtureLocator(this.fixture, "slider");
  }
  getByText(label: string) {
    return new FixtureLocator(this.fixture, "text", label);
  }
  async count() {
    return this.kind === "text" && this.label === this.fixture.selected ? 1 : 0;
  }
  async isVisible() {
    return this.kind === "legacy" ? this.fixture.legacy && this.fixture.markerWaited : false;
  }
  async waitFor() {
    if (this.kind === "legacy" && !this.fixture.legacy)
      throw new Error("CURRENT_LAYOUT_HAS_NO_DEEP_THINK_TRIGGER");
    if (this.kind === "layout") this.fixture.markerWaited = true;
    if (this.kind === "menu") assert.equal(this.fixture.menuOpen, true);
  }
  async evaluate(action: (element: HTMLElement) => unknown) {
    return action({
      click: () => {
        if (this.kind === "selector") this.fixture.menuOpen = !this.fixture.menuOpen;
        if (this.kind === "model") {
          this.fixture.selected = this.label;
          this.fixture.menuOpen = false;
        }
      },
    } as unknown as HTMLElement);
  }
  async getAttribute(name: string) {
    if (this.kind === "slider" && name === "aria-valuetext") return this.fixture.effort;
    if (this.kind === "model" && name === "data-value") return modelIds[this.label] ?? null;
    if (this.kind === "model" && name === "data-selected")
      return String(this.label === this.fixture.selected);
    return null;
  }
  async press(key: string) {
    if (this.fixture.ignoreEffortKeys) return;
    if (key === "Home") this.fixture.effort = "Low";
    if (key === "ArrowRight") this.fixture.effort = "High";
    if (key === "End") this.fixture.effort = "Max";
  }
}

const input = {
  modelId: "glm-5.3-flash",
  thinking: { enabled: true, effort: "max" as const, effortSupported: true, supported: true },
  vlm: { toolsEnabled: false, webSearchEnabled: false, websiteModeEnabled: false },
};

test("configure the current model-menu layout instead of waiting for Deep Think", async () => {
  const fixture = new BrowserFixture();
  await configureZaiBrowserRequest(fixture.page, input);
  assert.equal(fixture.markerWaited, true);
  assert.equal(fixture.menuOpen, false);
  assert.equal(typeof fixture.guard, "function");
});

test("wait for the legacy marker and close the menu before delegating", async () => {
  const fixture = new BrowserFixture();
  fixture.legacy = true;
  assert.equal(await tryConfigureCurrentZaiBrowserRequest(fixture.page, input), false);
  assert.equal(fixture.markerWaited, true);
  assert.equal(fixture.menuOpen, false);
  assert.equal(fixture.guard, undefined);
});

test("select and verify another model without confusing Flash with GLM-5.3", async () => {
  const fixture = new BrowserFixture();
  await configureZaiBrowserRequest(fixture.page, { ...input, modelId: "glm-5.3" });
  assert.equal(fixture.selected, "GLM-5.3");
  assert.equal(fixture.menuOpen, false);
});

for (const [effort, label] of [
  ["low", "Low"],
  ["high", "High"],
  ["max", "Max"],
] as const) {
  test(`apply and verify ${effort} effort`, async () => {
    const fixture = new BrowserFixture();
    fixture.effort = effort === "max" ? "Low" : "Max";
    await configureZaiBrowserRequest(fixture.page, {
      ...input,
      thinking: { ...input.thinking, effort },
    });
    assert.equal(fixture.effort, label);
    assert.equal(typeof fixture.guard, "function");
  });
}

test("an unapplied effort selection prevents installing the request guard", async () => {
  const fixture = new BrowserFixture();
  fixture.ignoreEffortKeys = true;
  await assert.rejects(
    configureZaiBrowserRequest(fixture.page, {
      ...input,
      thinking: { ...input.thinking, effort: "low" },
    }),
    /effort must be applied/
  );
  assert.equal(fixture.guard, undefined);
});

for (const feature of ["webSearchEnabled", "toolsEnabled", "websiteModeEnabled"] as const) {
  test(`reject unavailable ${feature} instead of changing the request`, async () => {
    const fixture = new BrowserFixture();
    await assert.rejects(
      configureZaiBrowserRequest(fixture.page, {
        ...input,
        vlm: { ...input.vlm, [feature]: true },
      }),
      /no configurable Search or Tools control/
    );
    assert.equal(fixture.guard, undefined);
  });
}

const completion = () => ({
  model: "x-preview-l",
  features: {
    enable_thinking: true,
    reasoning_effort: "max",
    web_search: false,
    auto_web_search: false,
    vlm_web_search_enable: false,
    vlm_tools_enable: false,
    vlm_website_mode: false,
    image_generation: false,
  },
});

test("the request boundary rejects missing, changed and malformed model/features", () => {
  const expected = { model: "x-preview-l", effort: "max" as const };
  assert.equal(matchesCurrentZaiBrowserRequest(completion(), expected), true);
  assert.equal(
    matchesCurrentZaiBrowserRequest({ ...completion(), model: "glm-5.3" }, expected),
    false
  );
  for (const key of Object.keys(completion().features)) {
    const missing = completion();
    delete missing.features[key];
    assert.equal(matchesCurrentZaiBrowserRequest(missing, expected), false, key);
    const changed = completion();
    changed.features[key] = key === "reasoning_effort" ? "low" : !changed.features[key];
    assert.equal(matchesCurrentZaiBrowserRequest(changed, expected), false, key);
  }
  for (const malformed of [null, [], {}, { features: [] }]) {
    assert.equal(matchesCurrentZaiBrowserRequest(malformed, expected), false);
  }
});

test("guard only forwards a matching request and returns a sanitized local error otherwise", async () => {
  const fixture = new BrowserFixture();
  await configureZaiBrowserRequest(fixture.page, input);
  assert.equal(fixture.predicate?.(new URL("https://chat.z.ai/api/v2/chat/completions")), true);
  assert.equal(
    fixture.predicate?.(new URL("https://other.example/api/v2/chat/completions")),
    false
  );
  assert.equal(fixture.predicate?.(new URL("https://chat.z.ai/api/v1/files")), false);
  async function dispatch(body: unknown, malformed = false) {
    let forwarded = false;
    let error: { status: number; body: string } | undefined;
    const route = {
      request: () => ({
        method: () => "POST",
        postDataJSON: () => {
          if (malformed) throw new Error("private request data must not escape");
          return body;
        },
      }),
      continue: async () => {
        forwarded = true;
      },
      fulfill: async (response: { status: number; body: string }) => {
        error = response;
      },
    } as unknown as Route;
    await fixture.guard?.(route);
    return { forwarded, error };
  }
  assert.deepEqual(await dispatch(completion()), { forwarded: true, error: undefined });
  for (const bad of [null, {}, { ...completion(), model: "other" }]) {
    const result = await dispatch(bad);
    assert.equal(result.forwarded, false);
    assert.equal(result.error?.status, 400);
    assert.equal(JSON.parse(result.error!.body).error.code, "bad_request");
  }
  const malformed = await dispatch(null, true);
  assert.equal(malformed.forwarded, false);
  assert.equal(malformed.error?.body.includes("private request data"), false);
});
