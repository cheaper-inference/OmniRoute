import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const copyToClipboard = vi.hoisted(() => vi.fn());

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock("@/shared/utils/clipboard", () => ({ copyToClipboard }));

const { default: JsonTree } = await import("@/shared/components/JsonTree");

afterEach(() => {
  cleanup();
  copyToClipboard.mockReset();
});

async function copyFirstValue() {
  const buttons = screen.getAllByRole("button", { hidden: true });
  const copy = buttons.find((button) => button.getAttribute("aria-label") === "copyTitle");
  expect(copy).toBeDefined();
  fireEvent.click(copy as HTMLElement);
  await waitFor(() => expect(copyToClipboard).toHaveBeenCalledTimes(1));
}

describe("JsonTree adapter → kit JsonTree", () => {
  it("copies through the shared helper, which works on plain HTTP", async () => {
    copyToClipboard.mockResolvedValue(true);
    vi.stubGlobal("navigator", { ...navigator, clipboard: undefined });
    const onCopyError = vi.fn();
    render(<JsonTree value={{ model: "gpt" }} onCopyError={onCopyError} />);
    await copyFirstValue();
    await waitFor(() => expect(onCopyError).not.toHaveBeenCalled());
    vi.unstubAllGlobals();
  });

  it("reports a failed copy", async () => {
    copyToClipboard.mockResolvedValue(false);
    const onCopyError = vi.fn();
    render(<JsonTree value={{ model: "gpt" }} onCopyError={onCopyError} />);
    await copyFirstValue();
    await waitFor(() => expect(onCopyError).toHaveBeenCalledTimes(1));
  });
});
