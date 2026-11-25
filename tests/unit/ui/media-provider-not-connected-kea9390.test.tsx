// @vitest-environment jsdom
// KEA-9390 — Media: "Generate" stayed enabled for a provider with no saved connection, sent a
// request that can only fail ("No credentials for image provider: …"), and the page opened on
// the alphabetically first provider whether or not anything could run it.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const { default: MediaPageClient } =
  await import("../../../src/app/(dashboard)/dashboard/cache/media/MediaPageClient");
const { chooseKitSelectValue, kitSelectByLabel, kitSelectOptions, kitSelectValue } =
  await import("../../helpers/kitSelect");

let el: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
let fetchMock: ReturnType<typeof vi.fn>;

type ConnectionsReply = Array<{ provider: string }> | "unreachable";

/** Renders the page; `/api/providers` answers `connections`, every other call `generation`. */
async function renderPage(
  connections: ConnectionsReply,
  generation: () => Response = () => new Response(JSON.stringify({ data: [] }), { status: 200 })
) {
  fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    if (String(input) === "/api/providers") {
      if (connections === "unreachable") throw new Error("network down");
      return new Response(JSON.stringify({ connections }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return generation();
  });
  vi.stubGlobal("fetch", fetchMock);
  el = document.createElement("div");
  document.body.appendChild(el);
  root = createRoot(el);
  await act(async () => {
    root.render(<MediaPageClient />);
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function typePrompt(text: string) {
  const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )?.set;
  act(() => {
    setter?.call(textarea, text);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function generateButton(): HTMLButtonElement {
  const button = Array.from(el.querySelectorAll("button")).find((candidate) =>
    candidate.textContent?.trim().startsWith("Generate")
  );
  if (!button) throw new Error("Generate button not found");
  return button as HTMLButtonElement;
}

const generationCalls = () =>
  fetchMock.mock.calls.filter(([input]) => String(input) !== "/api/providers");

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  act(() => root.unmount());
  el.remove();
  vi.unstubAllGlobals();
});

it("does not let an unconnected provider send a request that can only fail", async () => {
  await renderPage([]);
  // Nothing is connected: the alphabetical default stays, shown for what it is.
  expect(kitSelectValue(kitSelectByLabel("Provider", el))).toBe("adobe-firefly");
  typePrompt("a lighthouse at dusk");

  const button = generateButton();
  expect(button.disabled).toBe(true);
  expect(el.textContent).toContain("No provider for this media type is connected yet");
  expect(el.textContent).toContain("Adobe Firefly (Image/Video) needs a connection");
  const link = Array.from(el.querySelectorAll("a")).find((anchor) =>
    anchor.textContent?.includes("Connect this provider")
  );
  expect(link?.getAttribute("href")).toBe("/dashboard/providers");

  await act(async () => button.click());
  expect(generationCalls()).toHaveLength(0);
});

it("opens on a connected provider instead of the alphabetically first one", async () => {
  await renderPage([{ provider: "openai" }]);
  expect(kitSelectValue(kitSelectByLabel("Provider", el))).toBe("openai");
  expect(kitSelectValue(kitSelectByLabel("Model", el))).toMatch(/^openai\//);
  typePrompt("a lighthouse at dusk");
  expect(generateButton().disabled).toBe(false);
  expect(el.textContent).not.toContain("is not connected");

  await act(async () => generateButton().click());
  expect(generationCalls()).toHaveLength(1);
  expect(String(generationCalls()[0][0])).toBe("/api/v1/images/generations");
});

it("marks the providers that have no connection in the provider list", async () => {
  await renderPage([{ provider: "openai" }]);
  const labels = kitSelectOptions(kitSelectByLabel("Provider", el)).map((option) => option.label);
  expect(labels).toContain("Adobe Firefly (Image/Video) (not connected)");
  expect(labels).toContain("OpenAI");
  // Keyless providers need no connection: never marked.
  expect(labels).toContain("AI Horde");
});

it("blocks an unconnected provider the user picks, with a way to connect it", async () => {
  await renderPage([{ provider: "openai" }]);
  chooseKitSelectValue(kitSelectByLabel("Provider", el), "adobe-firefly");
  typePrompt("a lighthouse at dusk");

  expect(generateButton().disabled).toBe(true);
  expect(el.textContent).toContain("Adobe Firefly (Image/Video) is not connected");
  expect(el.textContent).not.toContain("No provider for this media type is connected yet");

  // A keyless provider runs without a connection.
  chooseKitSelectValue(kitSelectByLabel("Provider", el), "aihorde");
  expect(generateButton().disabled).toBe(false);
  expect(el.textContent).not.toContain("is not connected");
});

it("prefers a connected provider on the other media tabs too", async () => {
  await renderPage([{ provider: "fal-ai" }]);
  const videoTab = Array.from(el.querySelectorAll<HTMLElement>("[role=tab]")).find((tab) =>
    tab.textContent?.includes("Video Generation")
  ) as HTMLElement;
  await act(async () => videoTab.click());

  expect(kitSelectValue(kitSelectByLabel("Provider", el))).toBe("fal-ai");
  typePrompt("waves");
  expect(generateButton().disabled).toBe(false);

  chooseKitSelectValue(kitSelectByLabel("Provider", el), "adobe-firefly");
  expect(generateButton().disabled).toBe(true);
});

it("stays usable when the connection list cannot be read", async () => {
  await renderPage("unreachable");
  typePrompt("a lighthouse at dusk");
  // Unknown is not "not connected": the server stays the judge.
  expect(generateButton().disabled).toBe(false);
  const labels = kitSelectOptions(kitSelectByLabel("Provider", el)).map((option) => option.label);
  expect(labels.some((label) => label.endsWith("(not connected)"))).toBe(false);
});

it("points a credentials failure at the provider's connection, not at a page name", async () => {
  await renderPage(
    [{ provider: "openai" }],
    () =>
      new Response(JSON.stringify({ error: { message: "Invalid API key" } }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
  );
  typePrompt("a lighthouse at dusk");
  await act(async () => generateButton().click());
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(el.textContent).toContain("Invalid API key");
  const action = Array.from(el.querySelectorAll("a")).find((anchor) =>
    anchor.textContent?.includes("Open provider connections")
  );
  expect(action?.getAttribute("href")).toBe("/dashboard/providers");
  expect(el.textContent).not.toContain("Configure API keys in Providers");
});
