// @vitest-environment jsdom
// KEA-9388 + KEA-9389: the Quality › New suite dialog.
// - "Model (optional)" is optional: a case without a model saves (the runner falls back to the
//   run target, then to its default), and the request omits `model` rather than sending "".
// - Missing required fields are flagged inline next to the field and the first one is focused;
//   the errors are no longer toast-only.
// KEA-9519: Suite Name, Description and Case Name carry the save route's length limits
// (formLimits.ts): a value over the limit is flagged as it is typed and the save sends nothing.
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import EvalsTab from "@/app/(dashboard)/dashboard/usage/components/EvalsTab";
import {
  EVAL_CASE_NAME_MAX_LENGTH,
  EVAL_SUITE_DESCRIPTION_MAX_LENGTH,
  EVAL_SUITE_NAME_MAX_LENGTH,
} from "@/shared/constants/formLimits";
import { useNotificationStore } from "@/store/notificationStore";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const fetchMock = vi.fn<typeof fetch>();
const saves = () =>
  fetchMock.mock.calls.filter(
    ([url, init]) => url === "/api/evals/suites" && init?.method === "POST"
  );

// The page shows an empty state (and no "New Suite") without at least one suite; real
// installs always carry the built-in ones.
const builtIn = {
  id: "golden-set",
  name: "Golden Set",
  source: "built-in",
  cases: [
    {
      id: "gs-1",
      name: "greets",
      model: "gpt-4o",
      input: { messages: [{ role: "user", content: "Say hello" }] },
      expected: { strategy: "contains", value: "hello" },
    },
  ],
};

beforeEach(() => {
  useNotificationStore.setState({ notifications: [] });
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (url, init) =>
    url === "/api/evals/suites" && init?.method === "POST"
      ? reply({ suite: { id: "suite-1" } }, 201)
      : reply({ suites: [builtIn], recentRuns: [], scorecard: null, targets: [], apiKeys: [] })
  );
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Plain DOM lookups: role queries walk the whole accessibility tree of this large page on
// every call.
const button = (root: ParentNode, text: string) =>
  Array.from(root.querySelectorAll("button")).find((node) =>
    node.textContent?.includes(text)
  ) as HTMLButtonElement;

async function openBuilder() {
  render(<EvalsTab />);
  await screen.findByText("New Suite");
  fireEvent.click(button(document, "New Suite"));
  await screen.findByText("Create Eval Suite");
  return document.querySelector<HTMLElement>('[role="dialog"]')!;
}

const field = (dialog: HTMLElement, label: RegExp) =>
  within(dialog).getByLabelText(label) as HTMLInputElement | HTMLTextAreaElement;
const type = (node: HTMLElement, value: string) => fireEvent.change(node, { target: { value } });
const alerts = (dialog: HTMLElement) =>
  Array.from(dialog.querySelectorAll('[role="alert"]')).map((node) => node.textContent);
const toasts = () => useNotificationStore.getState().notifications.map((n) => n.message);

function fillRequired(dialog: HTMLElement) {
  type(field(dialog, /^Suite Name/), "QA-test-suite");
  type(field(dialog, /^Case Name/), "greets");
  type(field(dialog, /^User Prompt/), "Say hello");
  type(field(dialog, /^Expected Value/), "hello");
}

describe("Quality › New suite (KEA-9388, KEA-9389)", () => {
  it("saves a case whose optional Model is empty, omitting `model` from the request", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    expect(field(dialog, /^Model \(optional\)/).value).toBe("");

    fireEvent.click(button(dialog, "Create Suite"));

    await waitFor(() => expect(saves()).toHaveLength(1));
    const body = JSON.parse(String(saves()[0][1]?.body));
    expect(body.name).toBe("QA-test-suite");
    expect(body.cases).toHaveLength(1);
    expect(body.cases[0]).toEqual({
      name: "greets",
      input: { messages: [{ role: "user", content: "Say hello" }] },
      expected: { strategy: "contains", value: "hello" },
      tags: [],
    });
    expect(alerts(dialog)).toEqual([]);
  });

  it("still sends the model when one is typed", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    type(field(dialog, /^Model \(optional\)/), "  gpt-4o-mini ");
    fireEvent.click(button(dialog, "Create Suite"));
    await waitFor(() => expect(saves()).toHaveLength(1));
    expect(JSON.parse(String(saves()[0][1]?.body)).cases[0].model).toBe("gpt-4o-mini");
  });

  it("says what the empty Model does", async () => {
    const dialog = await openBuilder();
    const model = field(dialog, /^Model \(optional\)/);
    const hint = document.getElementById(model.getAttribute("aria-describedby") ?? "");
    expect(hint?.textContent).toBe(
      'Used when a run targets "Suite defaults". If empty, the case runs on gpt-4o.'
    );
  });

  it("flags every missing required field inline and focuses the first one", async () => {
    const dialog = await openBuilder();
    // Nothing is flagged before the user tries to save.
    expect(alerts(dialog)).toEqual([]);

    fireEvent.click(button(dialog, "Create Suite"));

    expect(alerts(dialog)).toEqual([
      "Suite name is required",
      "Case Name is required",
      "Add a system prompt or a user prompt",
      "Expected Value is required",
    ]);
    for (const label of [/^Suite Name/, /^Case Name/, /^User Prompt/, /^Expected Value/]) {
      expect(field(dialog, label).getAttribute("aria-invalid")).toBe("true");
    }
    // The optional fields are not flagged.
    expect(field(dialog, /^Model \(optional\)/).getAttribute("aria-invalid")).toBeNull();
    expect(field(dialog, /^System Prompt/).getAttribute("aria-invalid")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(field(dialog, /^Suite Name/)));
    expect(saves()).toHaveLength(0);
    // The field carries the message: no toast repeats it off-screen.
    expect(toasts()).toEqual([]);
  });

  it("clears each message as its field is filled and focuses the next invalid field", async () => {
    const dialog = await openBuilder();
    fireEvent.click(button(dialog, "Create Suite"));
    type(field(dialog, /^Suite Name/), "QA-test-suite");
    type(field(dialog, /^Case Name/), "greets");
    expect(alerts(dialog)).toEqual([
      "Add a system prompt or a user prompt",
      "Expected Value is required",
    ]);

    fireEvent.click(button(dialog, "Create Suite"));
    await waitFor(() => expect(document.activeElement).toBe(field(dialog, /^User Prompt/)));

    // A system prompt alone satisfies "at least one message".
    type(field(dialog, /^System Prompt/), "Be brief");
    expect(alerts(dialog)).toEqual(["Expected Value is required"]);
  });
});

describe("Quality › New suite length limits (KEA-9519)", () => {
  it("flags a suite name over the limit as it is typed, sends nothing and focuses it", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    const name = field(dialog, /^Suite Name/);
    type(name, "s".repeat(EVAL_SUITE_NAME_MAX_LENGTH + 1));

    // Shown while typing, before any save attempt.
    expect(alerts(dialog)).toEqual(["Suite Name can have at most 200 characters (currently 201)"]);
    expect(name.getAttribute("aria-invalid")).toBe("true");

    fireEvent.click(button(dialog, "Create Suite"));

    await waitFor(() => expect(document.activeElement).toBe(name));
    expect(saves()).toHaveLength(0);
    expect(toasts()).toEqual([]);
  });

  it("accepts a suite name exactly at the limit, measured after trimming", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    const atLimit = "s".repeat(EVAL_SUITE_NAME_MAX_LENGTH);
    type(field(dialog, /^Suite Name/), `  ${atLimit}  `);
    expect(alerts(dialog)).toEqual([]);

    fireEvent.click(button(dialog, "Create Suite"));

    await waitFor(() => expect(saves()).toHaveLength(1));
    expect(JSON.parse(String(saves()[0][1]?.body)).name).toBe(atLimit);
  });

  it("flags a description over the limit and accepts one at the limit", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    const description = field(dialog, /^Description/);
    type(description, "d".repeat(EVAL_SUITE_DESCRIPTION_MAX_LENGTH + 1));
    expect(alerts(dialog)).toEqual([
      "Description can have at most 2,000 characters (currently 2,001)",
    ]);

    fireEvent.click(button(dialog, "Create Suite"));
    await waitFor(() => expect(document.activeElement).toBe(description));
    expect(saves()).toHaveLength(0);

    type(description, "d".repeat(EVAL_SUITE_DESCRIPTION_MAX_LENGTH));
    expect(alerts(dialog)).toEqual([]);
    fireEvent.click(button(dialog, "Create Suite"));
    await waitFor(() => expect(saves()).toHaveLength(1));
  });

  it("flags a case name over the limit and sends nothing", async () => {
    const dialog = await openBuilder();
    fillRequired(dialog);
    const caseName = field(dialog, /^Case Name/);
    type(caseName, "c".repeat(EVAL_CASE_NAME_MAX_LENGTH + 1));
    expect(alerts(dialog)).toEqual(["Case Name can have at most 200 characters (currently 201)"]);

    fireEvent.click(button(dialog, "Create Suite"));
    await waitFor(() => expect(document.activeElement).toBe(caseName));
    expect(saves()).toHaveLength(0);
  });
});
