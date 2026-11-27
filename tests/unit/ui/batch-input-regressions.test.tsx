// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import type { WizardDestination, WizardInput } from "@/lib/batches/types";
import NewBatchWizard from "@/app/(dashboard)/dashboard/batch/components/NewBatchWizard";
import InputStep from "@/app/(dashboard)/dashboard/batch/components/wizard/InputStep";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
beforeEach(() => vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true));
const roots: Array<ReturnType<typeof createRoot>> = [];
const destination: WizardDestination = {
  provider: "openai",
  endpoint: "/v1/chat/completions",
  model: "gpt-4o",
};
const rowCount = 60_000;
const jsonl =
  Array.from({ length: rowCount }, (_, i) =>
    JSON.stringify({
      custom_id: `req-${i}`,
      method: "POST",
      url: destination.endpoint,
      body: { model: destination.model, messages: [{ role: "user", content: "hello" }] },
    })
  ).join("\n") + "\n";
const csv =
  "id,prompt\n" +
  Array.from({ length: rowCount }, (_, i) => `req-${i},${"hello".repeat(20)}`).join("\n") +
  "\n";

function readText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
}
// jsdom implements FileReader but not Blob.text(). Keep actual File/Blob objects
// so FormData exercises the browser upload contract, including binary bytes.
const pendingReads = new WeakMap<File, Promise<string>[]>();
function inputFile(content: string, name: string) {
  const file = new File([content], name);
  const reads: Promise<string>[] = [];
  pendingReads.set(file, reads);
  function text(blob: Blob) {
    const result = readText(blob);
    reads.push(result);
    return result;
  }
  Object.defineProperty(file, "text", { value: vi.fn(() => text(file)) });
  const slice = file.slice.bind(file);
  vi.spyOn(file, "slice").mockImplementation((...args) => {
    const blob = slice(...args);
    Object.defineProperty(blob, "text", { value: () => text(blob) });
    return blob;
  });
  return file;
}
function mount(element: React.ReactNode) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  roots.push(root);
  act(() => root.render(element));
  return el;
}
async function pick(el: HTMLElement, file: File) {
  expect(el.isConnected).toBe(true);
  const input = el.querySelector('input[type="file"]')!;
  Object.defineProperty(input, "files", { configurable: true, value: [file] });
  await act(async () => {
    input.dispatchEvent(new Event("change", { bubbles: true }));
    const reads = pendingReads.get(file)!;
    for (let index = 0; index < reads.length; index++) await reads[index];
  });
  expect(el.textContent).not.toContain("wizardInputReading");
}
async function click(el: HTMLElement, key: string) {
  expect(el.isConnected).toBe(true);
  const button = Array.from(el.querySelectorAll("button")).find((b) =>
    b.textContent?.includes(key)
  )!;
  expect(button).toBeDefined();
  expect(button.disabled).toBe(false);
  await act(async () => button.click());
}
function getSelect(el: HTMLElement, label: string): HTMLSelectElement {
  expect(el.isConnected).toBe(true);
  const control = Array.from(el.querySelectorAll("select")).find(
    (select) =>
      select.getAttribute("aria-label") === label ||
      Array.from(select.labels ?? []).some((node) => node.textContent?.trim() === label)
  );
  if (!control) throw new Error(`Missing select: ${label}`);
  return control;
}
async function select(el: HTMLElement, label: string, value: string) {
  const control = getSelect(el, label);
  await act(async () => {
    control.value = value;
    control.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
afterEach(() => {
  for (const root of roots.splice(0)) act(() => root.unmount());
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("retains the original JSONL file while limiting the preview read", async () => {
  let latest: WizardInput = { kind: "jsonl", fileName: null, rawContent: null };
  function Harness() {
    const [input, setInput] = useState(latest);
    latest = input;
    return <InputStep input={input} onChange={setInput} destination={destination} />;
  }
  const el = mount(<Harness />);
  const file = inputFile(jsonl, "large.jsonl");
  await pick(el, file);
  expect(file.size).toBeGreaterThan(5_000_000);
  expect(file.text).not.toHaveBeenCalled();
  expect(file.slice).toHaveBeenCalledTimes(2);
  expect(latest.rawContent!.length).toBeLessThan(jsonl.length);
  expect(latest.originalFile).toBe(file);
  await click(el, "wizardInputKindCsv");
  expect(latest.originalFile).toBeUndefined();
});

test.each([
  { kind: "jsonl", name: "large.jsonl", content: jsonl, rows: rowCount },
  { kind: "csv", name: "large.csv", content: csv, rows: rowCount },
  { kind: "jsonl", name: "small.jsonl", content: jsonl.split("\n")[0] + "\n", rows: 1 },
])(
  "uploads all $rows rows from $name through the complete wizard",
  async ({ kind, name, content, rows }) => {
    let submitted: File | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        if (url === "/api/v1/files") {
          submitted = (options.body as FormData).get("file") as File;
          return { ok: true, json: async () => ({ id: "file-test" }) };
        }
        return { ok: true, json: async () => ({ id: "batch-test" }) };
      })
    );
    const onCreated = vi.fn();
    const openDialogs = new Set(document.body.querySelectorAll<HTMLElement>('[role="dialog"]'));
    mount(
      <NewBatchWizard
        onClose={() => {}}
        onCreated={onCreated}
        availableProviders={[{ id: "openai", name: "OpenAI", models: ["gpt-4o"] }]}
      />
    );
    const el = Array.from(document.body.querySelectorAll<HTMLElement>('[role="dialog"]')).find(
      (dialog) => !openDialogs.has(dialog)
    );
    if (!el) throw new Error("New batch wizard dialog not rendered");
    async function next() {
      expect(el.isConnected).toBe(true);
      const button = Array.from(el.querySelectorAll("button")).find(
        (b) => b.textContent === "wizardNext"
      )!;
      expect(button).toBeDefined();
      expect(button.getAttribute("aria-disabled")).toBeNull();
      await act(async () => button.click());
    }
    await select(el, "wizardProviderLabel", "openai");
    expect(getSelect(el, "wizardModelLabel").value).toBe("gpt-4o");
    await next();
    if (kind === "csv") await click(el, "wizardInputKindCsv");
    const file = inputFile(content, name);
    await pick(el, file);
    if (kind === "csv") {
      await select(el, "id", "custom_id");
      await select(el, "prompt", "body.messages[0].content");
      await click(el, "wizardCsvApplyMapping");
    }
    await next();
    await next();
    await click(el, "wizardCreate");
    expect(submitted).toBeDefined();
    const uploaded = await readText(submitted!);
    expect(uploaded.includes("[...sample only...]")).toBe(false);
    const lines = uploaded.trim().split("\n");
    expect(lines).toHaveLength(rows);
    if (kind === "jsonl") {
      expect(uploaded === content).toBe(true);
      expect(submitted!.size).toBe(file.size);
    } else {
      const expectedPrompt = "hello".repeat(20);
      const mismatchedRow = lines.findIndex((line, index) => {
        const row = JSON.parse(line);
        return (
          row.custom_id !== `req-${index}` || row.body?.messages?.[0]?.content !== expectedPrompt
        );
      });
      expect(mismatchedRow, "index of the first CSV row with unexpected contents").toBe(-1);
      expect(file.text).toHaveBeenCalledOnce();
    }
    expect(onCreated).toHaveBeenCalledWith("batch-test");
  },
  // Hosted runner headroom: 15756 ms (run 45553583018) and 11717 ms (run 45567756509)
  // against the previous 15000 ms limit.
  30000
);
