// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const copyToClipboard = vi.fn(async () => true);

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/utils/clipboard", () => ({
  copyToClipboard: (text: string) => copyToClipboard(text),
}));

const { default: ManualUpdateCommand } =
  await import("../../../src/app/(dashboard)/dashboard/ManualUpdateCommand");

const COMMAND = "docker compose pull omniroute && docker compose up -d --force-recreate omniroute";

let container: HTMLDivElement;

beforeEach(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  copyToClipboard.mockClear();
});

afterEach(() => {
  container.remove();
});

it("renders the host Docker command and copies it on click", async () => {
  const root = createRoot(container);
  await act(async () => {
    root.render(<ManualUpdateCommand command={COMMAND} />);
  });

  expect(container.querySelector("code")?.textContent).toBe(COMMAND);
  const button = container.querySelector("button");
  expect(button?.textContent).toContain("copy");

  await act(async () => {
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(copyToClipboard).toHaveBeenCalledWith(COMMAND);
  expect(container.querySelector("button")?.textContent).toContain("copied");

  await act(async () => {
    root.unmount();
  });
});
