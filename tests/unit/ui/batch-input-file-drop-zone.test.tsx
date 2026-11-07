// @vitest-environment jsdom
// InputStep's drop zone is the kit FileDropZone: picking or dropping a file reads it into the
// wizard input, the zone is disabled while a read is in flight, and the extension check stays
// soft (a wrong-type file is still read; the validation step flags it).
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

function Harness() {
  const [input, setInput] = useState<WizardInput>({
    kind: "jsonl",
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

const state = () => JSON.parse(screen.getByTestId("input-state").textContent!);
const zone = () => document.querySelector("[data-slot='file-drop-zone']") as HTMLElement;

function jsonlFile(name: string, content = '{"custom_id":"a"}') {
  const file = new File([content], name);
  Object.defineProperty(file, "text", { value: async () => content });
  return file;
}

it("reads a picked .jsonl file and shows its name as the zone title", async () => {
  render(<Harness />);
  const input = screen.getByLabelText("wizardDropOrPick") as HTMLInputElement;
  expect(input.accept).toBe(".jsonl");
  await act(async () => {
    fireEvent.change(input, { target: { files: [jsonlFile("batch.jsonl")] } });
  });
  expect(state()).toMatchObject({ fileName: "batch.jsonl", rawContent: '{"custom_id":"a"}' });
  expect(screen.getByLabelText("batch.jsonl")).toBe(input);
  expect(zone().textContent).toContain("wizardInputReady");
});

it("reads a dropped file and keeps the first one of a multi-file drop", async () => {
  render(<Harness />);
  await act(async () => {
    fireEvent.drop(zone(), {
      dataTransfer: { files: [jsonlFile("first.jsonl"), jsonlFile("second.jsonl")] },
    });
  });
  expect(state().fileName).toBe("first.jsonl");
});

it("still reads a wrong-type file (soft extension check), but an accepted one wins", async () => {
  render(<Harness />);
  await act(async () => {
    fireEvent.drop(zone(), { dataTransfer: { files: [jsonlFile("notes.txt", "plain")] } });
  });
  expect(state()).toMatchObject({ fileName: "notes.txt", rawContent: "plain" });

  cleanup();
  render(<Harness />);
  await act(async () => {
    fireEvent.drop(zone(), {
      dataTransfer: { files: [jsonlFile("good.jsonl"), jsonlFile("notes.txt", "plain")] },
    });
  });
  expect(state().fileName).toBe("good.jsonl");
});

it("disables the zone while a read is in flight", async () => {
  render(<Harness />);
  let finish!: (content: string) => void;
  const slow = new File(["x"], "slow.jsonl");
  Object.defineProperty(slow, "text", {
    value: () => new Promise<string>((resolve) => (finish = resolve)),
  });
  const input = screen.getByLabelText("wizardDropOrPick") as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { files: [slow] } });
  });
  expect(zone().getAttribute("data-disabled")).toBe("true");
  expect(input.disabled).toBe(true);
  expect(zone().textContent).toContain("wizardInputReading");
  await act(async () => finish('{"custom_id":"slow"}'));
  expect(zone().getAttribute("data-disabled")).toBeNull();
  expect(state().fileName).toBe("slow.jsonl");
});
