// @vitest-environment jsdom
/**
 * #18075 — `CodexServiceModeSettings` had no test of its own. It loads the key's saved Codex
 * service mode, asks for confirmation before a change and only then PATCHes the key.
 *
 * The Select adapter renders a Radix Select, which jsdom cannot open; it is replaced by a native
 * <select> that calls `onChange` with the same `{ target: { value } }` shape the adapter emits.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../src/shared/components/Select", () => ({
  default: ({
    label,
    value,
    disabled,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
    options: { value: string; label: string }[];
    onChange: (event: { target: { value: string } }) => void;
  }) => (
    <label>
      {label}
      <select
        data-testid="mode"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange({ target: { value: e.target.value } })}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  ),
}));

let CodexServiceModeSettings: typeof import("../../../src/shared/components/CodexServiceModeSettings").default;

beforeAll(async () => {
  ({ default: CodexServiceModeSettings } =
    await import("../../../src/shared/components/CodexServiceModeSettings"));
}, 180_000);

let root: Root;
let container: HTMLDivElement;
let fetchMock: ReturnType<typeof vi.fn>;

function stubFetch(
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>
): void {
  fetchMock = vi.fn(async (url: string, init?: RequestInit) => handler(url, init));
  vi.stubGlobal("fetch", fetchMock);
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function renderSettings() {
  await act(async () => {
    root.render(<CodexServiceModeSettings apiKeyId="key/1" />);
  });
  await vi.waitFor(() =>
    expect(container.querySelector<HTMLSelectElement>("[data-testid='mode']")?.disabled).toBe(false)
  );
  return container.querySelector<HTMLSelectElement>("[data-testid='mode']") as HTMLSelectElement;
}

function choose(select: HTMLSelectElement, value: string) {
  act(() => {
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

const dialog = () => document.querySelector<HTMLElement>("[role='alertdialog'], [role='dialog']");
const dialogButton = (name: string) =>
  [...(dialog()?.querySelectorAll<HTMLButtonElement>("button") ?? [])].find(
    (b) => b.textContent?.trim() === name
  );

describe("CodexServiceModeSettings", () => {
  it("loads the saved mode for the URL-encoded key", async () => {
    stubFetch(() => Response.json({ codexServiceMode: "priority" }));
    const select = await renderSettings();
    expect(fetchMock.mock.calls[0][0]).toBe("/api/keys/key%2F1");
    expect(select.value).toBe("priority");
    expect(container.textContent).toContain("Codex service mode for this API key");
  });

  it("falls back to inherit for an unknown saved value", async () => {
    stubFetch(() => Response.json({ codexServiceMode: "turbo" }));
    const select = await renderSettings();
    expect(select.value).toBe("inherit");
  });

  it("confirms before saving, then PATCHes the chosen mode", async () => {
    stubFetch((_url, init) =>
      init?.method === "PATCH"
        ? Response.json({ codexServiceMode: JSON.parse(String(init.body)).codexServiceMode })
        : Response.json({ codexServiceMode: "inherit" })
    );
    const select = await renderSettings();
    choose(select, "flex");

    await vi.waitFor(() => expect(dialog()).not.toBeNull());
    expect(dialog()?.textContent).toContain("Apply “Force Flex” to this API key?");
    // Nothing is written until the user confirms.
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === "PATCH")).toBe(false);

    await act(async () => {
      dialogButton("Save mode")?.click();
    });
    await vi.waitFor(() => expect(dialog()).toBeNull());
    const patch = fetchMock.mock.calls.find(([, init]) => init?.method === "PATCH");
    expect(patch?.[0]).toBe("/api/keys/key%2F1");
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual({ codexServiceMode: "flex" });
    expect(select.value).toBe("flex");
  });

  it("cancelling the confirmation keeps the saved mode and writes nothing", async () => {
    stubFetch(() => Response.json({ codexServiceMode: "default" }));
    const select = await renderSettings();
    choose(select, "priority");
    await vi.waitFor(() => expect(dialog()).not.toBeNull());
    await act(async () => {
      dialogButton("Cancel")?.click();
    });
    await vi.waitFor(() => expect(dialog()).toBeNull());
    expect(select.value).toBe("default");
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === "PATCH")).toBe(false);
  });

  it("shows the save error inside the dialog and keeps it open", async () => {
    stubFetch((_url, init) =>
      init?.method === "PATCH"
        ? new Response("{}", { status: 500 })
        : Response.json({ codexServiceMode: "inherit" })
    );
    const select = await renderSettings();
    choose(select, "default");
    await vi.waitFor(() => expect(dialog()).not.toBeNull());
    await act(async () => {
      dialogButton("Save mode")?.click();
    });
    await vi.waitFor(() =>
      expect(dialog()?.textContent).toContain("Could not save the service mode.")
    );
    expect(select.value).toBe("inherit");
  });

  it("offers a retry when the saved mode cannot be loaded", async () => {
    let calls = 0;
    stubFetch(() => {
      calls += 1;
      return calls === 1
        ? new Response("{}", { status: 500 })
        : Response.json({ codexServiceMode: "flex" });
    });
    await act(async () => {
      root.render(<CodexServiceModeSettings apiKeyId="k" />);
    });
    await vi.waitFor(() =>
      expect(container.querySelector("[role='alert']")?.textContent).toBe(
        "Could not load the saved service mode."
      )
    );
    const select = container.querySelector<HTMLSelectElement>("[data-testid='mode']");
    expect(select?.disabled).toBe(true);
    const retry = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Retry"
    );
    await act(async () => {
      retry?.click();
    });
    await vi.waitFor(() => expect(select?.value).toBe("flex"));
    expect(select?.disabled).toBe(false);
    expect(container.querySelector("[role='alert']")).toBeNull();
  });
});
