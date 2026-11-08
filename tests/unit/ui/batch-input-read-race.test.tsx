// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import InputStep from "@/app/(dashboard)/dashboard/batch/components/wizard/InputStep";
import type { WizardInput } from "@/lib/batches/types";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each([
  ["jsonl", "csv", false, false],
  ["csv", "jsonl", false, false],
  ["jsonl", "csv", true, false],
  ["csv", "jsonl", true, false],
  ["jsonl", "csv", false, true],
] as const)(
  "does not restore %s after switching to %s during a file read (reject=%s, return=%s)",
  async (from, to, rejectRead, returnToOriginal) => {
    const finalKind = returnToOriginal ? from : to;
    function Harness() {
      const [input, setInput] = useState<WizardInput>({
        kind: from,
        fileName: null,
        rawContent: null,
      });
      return (
        <>
          <output data-testid="input-state">{JSON.stringify(input)}</output>
          <InputStep input={input} onChange={setInput} destination={null} />
        </>
      );
    }
    let finishRead!: (content: string) => void;
    let failRead!: (reason: Error) => void;
    const pendingRead = new Promise<string>((resolve, reject) => {
      finishRead = resolve;
      failRead = reject;
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const file = new File(["placeholder"], `old.${from}`);
    Object.defineProperty(file, "text", { value: () => pendingRead });
    const { container } = render(<Harness />);
    fireEvent.change(container.querySelector('input[type="file"]')!, { target: { files: [file] } });
    fireEvent.click(screen.getByText(to === "csv" ? "wizardInputKindCsv" : "wizardInputKindJsonl"));
    if (returnToOriginal) {
      fireEvent.click(screen.getByText("wizardInputKindJsonl"));
    }
    expect(JSON.parse(screen.getByTestId("input-state").textContent!).kind).toBe(finalKind);
    await act(async () => {
      if (rejectRead) failRead(new Error("read failed"));
      else finishRead("stale file content");
      await pendingRead.catch(() => {});
    });
    expect(JSON.parse(screen.getByTestId("input-state").textContent!)).toMatchObject({
      kind: finalKind,
      fileName: null,
      rawContent: null,
    });
    expect(screen.queryByText("wizardInputReading")).toBeNull();
    const nextContent = finalKind === "csv" ? "id,prompt\nnext,hello" : '{"custom_id":"next"}';
    const nextFile = new File([nextContent], `new.${finalKind}`);
    Object.defineProperty(nextFile, "text", { value: async () => nextContent });
    await act(async () => {
      fireEvent.change(container.querySelector('input[type="file"]')!, {
        target: { files: [nextFile] },
      });
    });
    const recovered = JSON.parse(screen.getByTestId("input-state").textContent!);
    expect(recovered).toMatchObject({
      kind: finalKind,
      fileName: `new.${finalKind}`,
    });
    if (finalKind === "csv") {
      // The race contract concerns the selected source, whether CSV is stored
      // separately from converted JSONL or still shares rawContent.
      expect(recovered.csvContent ?? recovered.rawContent).toBe(nextContent);
      if (recovered.csvContent !== undefined) expect(recovered.rawContent).toBeNull();
      expect(screen.getByText("id")).toBeTruthy();
      expect(screen.getByText("prompt")).toBeTruthy();
    } else {
      expect(recovered.rawContent).toBe(nextContent);
      expect(recovered.csvContent).toBeUndefined();
    }
  }
);
