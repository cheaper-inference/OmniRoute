// @vitest-environment jsdom
/**
 * Providers area, kit FileTrigger (adoption slice A1). The three "pick a file" buttons of the
 * provider pages used a hidden native input clicked through a ref. They now wrap their Button
 * in the kit FileTrigger: the input is out of the tab order and of the accessibility tree, the
 * same file can be picked twice in a row, and a file the picker filter would have hidden is
 * still read (the parser reports what is wrong with it, as before).
 */
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HarImportButton from "@/app/(dashboard)/dashboard/providers/[id]/components/HarImportButton";
import { ImportProvidersFromFileModal } from "@/app/(dashboard)/dashboard/providers/components/ImportProvidersFromFileModal";
import { OAuthExportImportModal } from "@/app/(dashboard)/dashboard/providers/components/OAuthExportImportModal";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function file(name: string, type: string, text: string): File {
  return new File([text], name, { type });
}

function pick(input: HTMLInputElement, picked: File) {
  fireEvent.change(input, { target: { files: [picked] } });
}

/** The hidden native input the kit FileTrigger renders next to its child control. */
function expectKitFileInput(input: HTMLInputElement) {
  expect(input.type).toBe("file");
  expect(input.hidden).toBe(true);
  expect(input.tabIndex).toBe(-1);
  expect(input.className).not.toContain("hidden");
}

describe("HarImportButton", () => {
  function show(onImport = vi.fn()) {
    render(<HarImportButton provider="copilot-m365-web" onImport={onImport} />);
    return {
      onImport,
      input: screen.getByTestId("har-import-input") as HTMLInputElement,
      button: screen.getByTestId("har-import-button") as HTMLButtonElement,
    };
  }

  it("opens the kit file input from the button", () => {
    const { input, button } = show();
    expectKitFileInput(input);
    expect(input.accept).toBe(".har,application/json");
    const click = vi.spyOn(input, "click").mockImplementation(() => {});
    fireEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("reads the picked file and reports a file that is not a HAR", async () => {
    const { input, onImport } = show();
    pick(input, file("session.har", "", "not json"));
    expect((await screen.findByTestId("har-import-error")).textContent).toMatch(/valid JSON/);
    expect(onImport).not.toHaveBeenCalled();
  });

  it("still reads a file the picker filter would have hidden", async () => {
    const { input } = show();
    pick(input, file("session.txt", "text/plain", "not json"));
    expect((await screen.findByTestId("har-import-error")).textContent).toMatch(/valid JSON/);
  });
});

describe("ImportProvidersFromFileModal", () => {
  it("opens the kit file input from Choose file and lists the parsed rows", async () => {
    render(<ImportProvidersFromFileModal isOpen onClose={() => {}} onImported={async () => {}} />);
    const input = document.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).not.toBeNull();
    expectKitFileInput(input!);
    const click = vi.spyOn(input!, "click").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: /choose/i }));
    expect(click).toHaveBeenCalledTimes(1);

    pick(
      input!,
      file(
        "providers.json",
        "application/json",
        JSON.stringify([{ provider: "openai", name: "Main", apiKey: "sk-test" }])
      )
    );
    await waitFor(() => expect(screen.getByText("providers.json")).toBeTruthy());
    expect(await screen.findByText("openai")).toBeTruthy();
  });
});

describe("OAuthExportImportModal", () => {
  it("opens the kit file input from Choose file", () => {
    render(<OAuthExportImportModal isOpen onClose={() => {}} onImported={async () => {}} />);
    const input = screen.getByLabelText("Account export JSON file") as HTMLInputElement;
    expectKitFileInput(input);
    const click = vi.spyOn(input, "click").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: /Choose.*file/i }));
    expect(click).toHaveBeenCalledTimes(1);
  });
});
