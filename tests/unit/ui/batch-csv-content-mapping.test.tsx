// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WizardCsvMapping } from "@/lib/batches/types";
import CsvMappingStep from "@/app/(dashboard)/dashboard/batch/components/wizard/CsvMappingStep";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

describe("batch CSV content mapping gate", () => {
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

  it.each(["body.messages[0].content", "body.input", "body.prompt"])(
    "requires content before applying %s and disables Apply when removed",
    (contentPath) => {
      const onJsonlReady = vi.fn();
      function Harness() {
        const [mapping, setMapping] = useState<WizardCsvMapping>({});
        return (
          <CsvMappingStep
            csvContent={"id,role,prompt\nr1,assistant,hello"}
            mapping={mapping}
            onChange={setMapping}
            destination={{ provider: "openai", model: "gpt-4o", endpoint: "/v1/chat/completions" }}
            onJsonlReady={onJsonlReady}
          />
        );
      }
      act(() => root.render(<Harness />));
      const selects = container.querySelectorAll("select");
      function select(index: number, value: string) {
        act(() => {
          selects[index].value = value;
          selects[index].dispatchEvent(new Event("change", { bubbles: true }));
        });
      }
      select(0, "custom_id");
      select(1, "body.messages[0].role");
      const apply = container.querySelector("button")!;
      expect(apply.disabled).toBe(true);
      act(() => apply.click());
      expect(onJsonlReady).not.toHaveBeenCalled();
      select(2, contentPath);
      expect(apply.disabled).toBe(false);
      act(() => apply.click());
      expect(onJsonlReady).toHaveBeenCalledTimes(1);
      const [jsonl, parsed, skipped] = onJsonlReady.mock.calls[0];
      expect(parsed).toBe(1);
      expect(skipped).toBe(0);
      const request = JSON.parse(jsonl);
      expect(request.custom_id).toBe("r1");
      expect(request.body.messages[0].role).toBe("assistant");
      if (contentPath === "body.messages[0].content") {
        expect(request.body.messages[0].content).toBe("hello");
      } else {
        expect(request.body[contentPath.slice("body.".length)]).toBe("hello");
      }
      select(2, "");
      expect(apply.disabled).toBe(true);
    }
  );
});
