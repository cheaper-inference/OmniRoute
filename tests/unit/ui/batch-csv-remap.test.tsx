// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import InputStep from "@/app/(dashboard)/dashboard/batch/components/wizard/InputStep";
import NewBatchWizard from "@/app/(dashboard)/dashboard/batch/components/NewBatchWizard";
import type { WizardInput } from "@/lib/batches/types";
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
afterEach(cleanup);
const csv = "id,prompt,alternate\nr1,hello,revised";
const destination = {
  provider: "openai",
  endpoint: "/v1/chat/completions",
  model: "gpt-4o",
} as const;
function Harness() {
  const [input, setInput] = useState<WizardInput>({
    kind: "csv",
    fileName: null,
    rawContent: null,
  });
  const [visible, setVisible] = useState(true);
  return (
    <>
      <output data-testid="state">{JSON.stringify(input)}</output>
      <button onClick={() => setVisible(!visible)}>toggle step</button>
      {visible && <InputStep input={input} onChange={setInput} destination={destination} />}
    </>
  );
}
function state() {
  return JSON.parse(screen.getByTestId("state").textContent!);
}
async function pick(content = csv, name = "input.csv") {
  const file = new File([content], name);
  Object.defineProperty(file, "text", { value: async () => content });
  await act(async () => {
    fireEvent.change(document.querySelector('input[type="file"]')!, { target: { files: [file] } });
  });
  return file;
}
function select(index: number, value: string) {
  fireEvent.change(screen.getAllByRole("combobox")[index], { target: { value } });
}
function apply() {
  fireEvent.click(screen.getByText("wizardCsvApplyMapping"));
}
async function convertedHarness() {
  render(<Harness />);
  await pick();
  select(0, "custom_id");
  select(1, "body.messages[0].content");
  apply();
  expect(JSON.parse(state().rawContent).body.messages[0].content).toBe("hello");
}
it("keeps source columns and converts again using the changed mapping", async () => {
  await convertedHarness();
  expect(screen.getByText("id")).toBeTruthy();
  expect(screen.getByText("alternate")).toBeTruthy();
  select(1, "");
  select(2, "body.messages[0].content");
  expect(state().rawContent).toBeNull();
  apply();
  expect(JSON.parse(state().rawContent).body.messages[0].content).toBe("revised");
});
it("retains CSV and conversion readiness when the input step remounts", async () => {
  await convertedHarness();
  fireEvent.click(screen.getByText("toggle step"));
  fireEvent.click(screen.getByText("toggle step"));
  expect(screen.getByText("id")).toBeTruthy();
  expect(screen.getByText("wizardInputCsvJsonlReady")).toBeTruthy();
  apply();
  expect(JSON.parse(state().rawContent).custom_id).toBe("r1");
});
it("replaces the source and clears the previous conversion before applying again", async () => {
  await convertedHarness();
  await pick("id,prompt,alternate\nr2,new,other", "replacement.csv");
  expect(state().rawContent).toBeNull();
  expect(screen.queryByText("wizardInputCsvJsonlReady")).toBeNull();
  apply();
  expect(JSON.parse(state().rawContent).custom_id).toBe("r2");
  expect(JSON.parse(state().rawContent).body.messages[0].content).toBe("new");
});
it("clears the CSV source when switching to JSONL", async () => {
  await convertedHarness();
  fireEvent.click(screen.getByText("wizardInputKindJsonl"));
  expect(state().csvContent).toBeUndefined();
  await pick('{"custom_id":"jsonl"}', "input.jsonl");
  expect(state().csvContent).toBeUndefined();
  expect(state().rawContent).toBe('{"custom_id":"jsonl"}');
});
it("blocks wizard navigation until the changed mapping is applied", async () => {
  render(
    <NewBatchWizard
      onClose={() => {}}
      onCreated={() => {}}
      availableProviders={[{ id: "openai", name: "OpenAI", models: ["gpt-4o"] }]}
    />
  );
  select(0, "openai");
  select(2, "gpt-4o");
  fireEvent.click(screen.getByText("wizardNext"));
  fireEvent.click(screen.getByText("wizardInputKindCsv"));
  await pick();
  select(0, "custom_id");
  select(1, "body.messages[0].content");
  apply();
  const next = screen.getByText("wizardNext").closest("button")!;
  expect(next.disabled).toBe(false);
  select(1, "");
  expect(next.disabled).toBe(true);
  select(2, "body.messages[0].content");
  apply();
  expect(next.disabled).toBe(false);
});

it("invalidates the old conversion while a replacement file is still being read", async () => {
  await convertedHarness();
  let finish!: (text: string) => void;
  const pending = new Promise<string>((resolve) => {
    finish = resolve;
  });
  const file = new File(["pending"], "replacement.csv");
  Object.defineProperty(file, "text", { value: () => pending });
  fireEvent.change(document.querySelector('input[type="file"]')!, { target: { files: [file] } });
  expect(state().rawContent).toBeNull();
  expect(screen.queryByText("wizardCsvApplyMapping")).toBeNull();
  await act(async () => {
    finish("id,prompt\nr2,new");
    await pending;
  });
  expect(state().rawContent).toBeNull();
  apply();
  expect(JSON.parse(state().rawContent).custom_id).toBe("r2");
});
