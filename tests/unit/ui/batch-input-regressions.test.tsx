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
  const button = Array.from(el.querySelectorAll("button")).find((b) =>
    b.textContent?.includes(key)
  )!;
  expect(button).toBeDefined();
  expect(button.disabled).toBe(false);
  await act(async () => button.click());
}
async function select(el: HTMLElement, index: number, value: string) {
  await act(async () => {
    const s = el.querySelectorAll("select")[index];
    s.value = value;
    s.dispatchEvent(new Event("change", { bubbles: true }));
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
    mount(
      <NewBatchWizard
        onClose={() => {}}
        onCreated={onCreated}
        availableProviders={[{ id: "openai", name: "OpenAI", models: ["gpt-4o"] }]}
      />
    );
    // The wizard renders inside the kit Modal (KEA-7886), which portals to document.body,
    // so its controls are queried there instead of in the mount container.
    const el = document.body;
    async function next() {
      const button = el.querySelector("button[data-wizard-next]") as HTMLButtonElement;
      expect(button.disabled).toBe(false);
      await act(async () => button.click());
    }
    await select(el, 0, "openai");
    await select(el, 2, "gpt-4o");
    await next();
    if (kind === "csv") await click(el, "wizardInputKindCsv");
    const file = inputFile(content, name);
    await pick(el, file);
    if (kind === "csv") {
      await select(el, 0, "custom_id");
      await select(el, 1, "body.messages[0].content");
      await click(el, "wizardCsvApplyMapping");
    }
    await next();
    await next();
    await click(el, "wizardCreate");
    expect(submitted).toBeDefined();
    const uploaded = await readText(submitted!);
    expect(uploaded.includes("[...sample only...]")).toBe(false);
    const parsed = uploaded
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    expect(parsed).toHaveLength(rows);
    expect(parsed.map((row) => row.custom_id)).toEqual(
      Array.from({ length: rows }, (_, i) => `req-${i}`)
    );
    if (kind === "jsonl") {
      expect(uploaded === content).toBe(true);
      expect(submitted!.size).toBe(file.size);
    } else {
      expect(parsed.every((row) => row.body.messages[0].content === "hello".repeat(20))).toBe(true);
      expect(file.text).toHaveBeenCalledOnce();
    }
    expect(onCreated).toHaveBeenCalledWith("batch-test");
  },
  15000
);
