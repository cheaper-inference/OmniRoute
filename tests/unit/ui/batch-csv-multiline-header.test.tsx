// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WizardCsvMapping } from "@/lib/batches/types";
import CsvMappingStep from "@/app/(dashboard)/dashboard/batch/components/wizard/CsvMappingStep";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("batch CSV header mapping", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it.each([
    ["LF", 'id,"user\nprompt"\nr1,hello', "user\nprompt"],
    ["CRLF", 'id,"user\r\nprompt"\r\nr1,hello', "user\r\nprompt"],
    ["escaped quotes", 'id,"user ""quoted""\nprompt"\nr1,hello', 'user "quoted"\nprompt'],
    ["single line", "id,prompt\nr1,hello", "prompt"],
  ])("converts a mapped %s header through the real converter", (_, csv, header) => {
    const onJsonlReady = vi.fn();
    function Harness() {
      const [mapping, setMapping] = useState<WizardCsvMapping>({});
      return (
        <CsvMappingStep
          csvContent={csv}
          mapping={mapping}
          onChange={setMapping}
          destination={{ provider: "openai", model: "gpt-4o", endpoint: "/v1/chat/completions" }}
          onJsonlReady={onJsonlReady}
        />
      );
    }
    act(() => root.render(<Harness />));
    const selects = container.querySelectorAll("select");
    expect(selects).toHaveLength(2);
    // Each mapping select sits in the Select adapter's kit Field (KEA-7886); the column
    // header span is a sibling of that Field in the mapping row.
    expect(
      selects[1].closest('[data-slot="field"]')?.parentElement?.querySelector("span")?.textContent
    ).toBe(header);
    act(() => {
      selects[0].value = "custom_id";
      selects[0].dispatchEvent(new Event("change", { bubbles: true }));
    });
    act(() => {
      selects[1].value = "body.messages[0].content";
      selects[1].dispatchEvent(new Event("change", { bubbles: true }));
    });
    const apply = container.querySelector("button")!;
    expect(apply.disabled).toBe(false);
    act(() => apply.click());
    expect(onJsonlReady).toHaveBeenCalledTimes(1);
    const [jsonl, parsed, skipped] = onJsonlReady.mock.calls[0];
    expect(parsed).toBe(1);
    expect(skipped).toBe(0);
    expect(JSON.parse(jsonl)).toEqual({
      custom_id: "r1",
      method: "POST",
      url: "/v1/chat/completions",
      body: { model: "gpt-4o", messages: [{ content: "hello", role: "user" }] },
    });
  });
});
