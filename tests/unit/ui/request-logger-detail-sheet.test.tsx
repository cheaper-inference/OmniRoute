// @vitest-environment jsdom
/**
 * RequestLoggerDetail on the kit Sheet + Tabs (#19620): the dialog's name, the close rules that
 * Radix owns now, focus back on the opener, one tab per kind of section, and the things that have
 * to survive the move: copy over plain HTTP, the JSON tree and its persisted expand level.
 */
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";
import { copyToClipboard } from "@/shared/utils/clipboard";
import useJsonTreeExpandStore from "@/store/jsonTreeExpandStore";
import messages from "../../../src/i18n/messages/en.json";

const detail = messages.requestLogger.detail;
const columns = messages.requestLogger.columns;

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// Warm the render path once, outside the per-test budget: the first cold render of the kit and
// the JSON tree takes several seconds on a loaded runner.
beforeAll(() => {
  renderDetail();
  cleanup();
}, 60_000);

beforeEach(() => {
  localStorage.clear();
  useJsonTreeExpandStore.setState({ levels: {} });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const LOG = {
  id: "r1",
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  model: "gpt-test",
  provider: "openai",
  timestamp: "2026-10-21T00:00:00.000Z",
  duration: 40,
  tokens: { in: 1, out: 2 },
};

const FULL_DETAIL = {
  ...LOG,
  requestBody: { messages: [{ role: "user", content: "hello from the user" }] },
  pipelinePayloads: {
    clientRequest: { messages: [{ role: "user", content: "hello from the user" }] },
    providerResponse: { id: "resp-1", output: { nested: { deep: "value" } } },
    streamChunks: { provider: ['data: {"content":"stream-text"}\n\n'] },
  },
};

type DetailProps = Partial<React.ComponentProps<typeof RequestLoggerDetail>>;

function renderDetail(props: DetailProps = {}) {
  const onClose = vi.fn();
  const view = render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <RequestLoggerDetail
        log={LOG}
        detail={FULL_DETAIL}
        loading={false}
        debugEnabled
        onClose={onClose}
        onCopy={copyToClipboard}
        {...props}
      />
    </NextIntlClientProvider>
  );
  return { ...view, onClose, dialog: screen.getByRole("dialog", { name: detail.ariaLabel }) };
}

const openTab = (name: string) => fireEvent.click(screen.getByRole("tab", { name }));

describe("RequestLoggerDetail on the kit Sheet", () => {
  it("is a right-side sheet portalled out of the page, named by the existing label", () => {
    const { container, dialog } = renderDetail();
    expect(dialog.getAttribute("data-slot")).toBe("sheet-content");
    expect(dialog.getAttribute("data-side")).toBe("right");
    expect(container.contains(dialog)).toBe(false);
  });

  it("takes the full width on a phone and caps it on a wide screen", () => {
    const { dialog } = renderDetail();
    expect(dialog.className).toContain("w-full");
    expect(dialog.className).toContain("max-w-225");
  });

  it("closes once on Escape, through the Sheet", async () => {
    const { dialog, onClose } = renderDetail();
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("no longer listens for Escape on the window", () => {
    const { onClose } = renderDetail();
    act(() => {
      globalThis.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes once on a click outside the panel", async () => {
    const { onClose } = renderDetail();
    // Radix arms its outside-pointer listener on a timer after mount.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const overlay = document.querySelector<HTMLElement>('[data-slot="sheet-overlay"]');
    expect(overlay).not.toBeNull();
    // A real click: Radix waits for the click that follows the press (drag-select protection).
    fireEvent.pointerDown(overlay as HTMLElement);
    fireEvent.click(overlay as HTMLElement);
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("stays open on a click inside the panel", async () => {
    const { dialog, onClose } = renderDetail();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.pointerDown(within(dialog).getByRole("tablist"));
    fireEvent.click(within(dialog).getByRole("tablist"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("puts focus back on the row that opened it", async () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
          <button type="button" onClick={() => setOpen(true)}>
            Open row
          </button>
          {open && (
            <RequestLoggerDetail
              log={LOG}
              detail={FULL_DETAIL}
              loading={false}
              debugEnabled
              onClose={() => setOpen(false)}
              onCopy={copyToClipboard}
            />
          )}
        </NextIntlClientProvider>
      );
    }
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open row" });
    opener.focus();
    fireEvent.click(opener);
    const dialog = await screen.findByRole("dialog", { name: detail.ariaLabel });
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });
});

describe("RequestLoggerDetail tabs", () => {
  it("opens on the overview and moves each kind of section to its own tab", () => {
    renderDetail();
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      detail.tabOverview,
      columns.conversation,
      detail.eventStream,
      detail.tabPayloads,
    ]);
    expect(screen.getByTestId("request-log-metadata-grid")).toBeTruthy();
    expect(screen.queryByText(detail.providerEventStream)).toBeNull();

    openTab(detail.eventStream);
    expect(screen.getByText(detail.providerEventStream)).toBeTruthy();
    expect(screen.queryByTestId("request-log-metadata-grid")).toBeNull();

    openTab(columns.conversation);
    expect(screen.getByText(detail.conversationContext)).toBeTruthy();
    expect(screen.queryByText(detail.providerEventStream)).toBeNull();

    openTab(detail.tabPayloads);
    expect(screen.getByText(detail.payload.providerResponse)).toBeTruthy();
    expect(screen.queryByText(detail.conversationContext)).toBeNull();
  });

  it("wires the tabs to their panel for assistive tech", () => {
    renderDetail();
    const tab = screen.getByRole("tab", { name: detail.tabOverview });
    const panel = screen.getByRole("tabpanel");
    expect(tab.getAttribute("aria-selected")).toBe("true");
    expect(tab.getAttribute("aria-controls")).toBe(panel.id);
  });

  it("hides the tabs that have nothing to show", () => {
    renderDetail({ detail: { ...LOG }, debugEnabled: false });
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      detail.tabOverview,
      detail.tabPayloads,
    ]);
  });

  it("keeps the event stream behind detailed logging", () => {
    renderDetail({ debugEnabled: false });
    expect(screen.queryByRole("tab", { name: detail.eventStream })).toBeNull();
  });

  it("keeps the open tab while the next request loads and when it has that section", () => {
    const props = {
      log: LOG,
      debugEnabled: true,
      onClose: () => {},
      onCopy: copyToClipboard,
    };
    const tree = (extra: DetailProps) => (
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <RequestLoggerDetail detail={FULL_DETAIL} loading={false} {...props} {...extra} />
      </NextIntlClientProvider>
    );
    const { rerender } = render(tree({}));
    openTab(detail.eventStream);

    rerender(tree({ log: { ...LOG, id: "r2" }, detail: null, loading: true }));
    expect(
      screen.getByRole("tab", { name: detail.eventStream }).getAttribute("aria-selected")
    ).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toContain(detail.loadingDetails);

    rerender(tree({ log: { ...LOG, id: "r2" } }));
    expect(screen.getByText(detail.providerEventStream)).toBeTruthy();
  });

  it("falls back to the overview when the next request lacks the open tab", () => {
    const props = {
      log: LOG,
      loading: false,
      debugEnabled: true,
      onClose: () => {},
      onCopy: copyToClipboard,
    };
    const tree = (value: unknown) => (
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <RequestLoggerDetail detail={value} {...props} />
      </NextIntlClientProvider>
    );
    const { rerender } = render(tree(FULL_DETAIL));
    openTab(detail.eventStream);

    rerender(tree({ ...LOG }));
    expect(
      screen.getByRole("tab", { name: detail.tabOverview }).getAttribute("aria-selected")
    ).toBe("true");
    expect(screen.getByTestId("request-log-metadata-grid")).toBeTruthy();
  });

  it("shows the loading state on the overview too", () => {
    renderDetail({ detail: null, loading: true });
    expect(screen.getByRole("tabpanel").textContent).toContain(detail.loadingDetails);
  });
});

describe("RequestLoggerDetail keeps its tools on the Sheet", () => {
  it("still copies every section from the header, whichever tab is open", async () => {
    const onCopy = vi.fn(async () => true);
    renderDetail({ onCopy });
    fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
    await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
    const text = onCopy.mock.calls[0][0] as unknown as string;
    expect(text).toContain("PROVIDER STREAM");
    expect(text).toContain(detail.payload.providerResponse);
    expect(text).toContain("resp-1");
  });

  it("cancels the copy-all reset when the sheet unmounts", async () => {
    const onCopy = vi.fn(async () => true);
    const { unmount } = renderDetail({ onCopy });
    const schedule = vi.spyOn(globalThis, "setTimeout");
    const cancel = vi.spyOn(globalThis, "clearTimeout");
    try {
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
      });
      const index = schedule.mock.calls.findIndex(([, delay]) => delay === 2000);
      expect(index).toBeGreaterThanOrEqual(0);
      const timer = schedule.mock.results[index].value;
      unmount();
      expect(cancel).toHaveBeenCalledWith(timer);
    } finally {
      schedule.mockRestore();
      cancel.mockRestore();
    }
  });

  it("replaces the pending copy-all reset on a second successful copy", async () => {
    const onCopy = vi.fn(async () => true);
    const { unmount } = renderDetail({ onCopy });
    const schedule = vi.spyOn(globalThis, "setTimeout");
    const cancel = vi.spyOn(globalThis, "clearTimeout");
    try {
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
      });
      const first = schedule.mock.calls.findIndex(([, delay]) => delay === 2000);
      expect(first).toBeGreaterThanOrEqual(0);
      const timer = schedule.mock.results[first].value;
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
      });
      expect(onCopy).toHaveBeenCalledTimes(2);
      expect(cancel).toHaveBeenCalledWith(timer);
      unmount();
    } finally {
      schedule.mockRestore();
      cancel.mockRestore();
    }
  });

  it("does not schedule a copy-all reset if copying finishes after unmount", async () => {
    let finishCopy: (success: boolean) => void = () => {};
    const onCopy = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          finishCopy = resolve;
        })
    );
    const { unmount } = renderDetail({ onCopy });
    const schedule = vi.spyOn(globalThis, "setTimeout");
    try {
      fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
      expect(onCopy).toHaveBeenCalledTimes(1);
      unmount();
      await act(async () => {
        finishCopy(true);
      });
      expect(schedule.mock.calls.filter(([, delay]) => delay === 2000)).toHaveLength(0);
    } finally {
      schedule.mockRestore();
    }
  });

  it("copies over plain HTTP while the Sheet traps focus", async () => {
    vi.stubGlobal("navigator", { ...navigator, clipboard: undefined });
    const copied: Array<{ value: string; focused: boolean }> = [];
    document.execCommand = vi.fn(() => {
      const active = document.activeElement as HTMLTextAreaElement | null;
      copied.push({ value: active?.value ?? "", focused: active?.tagName === "TEXTAREA" });
      return true;
    }) as typeof document.execCommand;

    const { dialog } = renderDetail();
    const copyAll = within(dialog).getByRole("button", { name: detail.copyAll });
    copyAll.focus();
    fireEvent.click(copyAll);

    await waitFor(() => expect(copied).toHaveLength(1));
    expect(copied[0].focused).toBe(true);
    expect(copied[0].value).toContain("resp-1");
    await waitFor(() => expect(document.activeElement).toBe(copyAll));
    expect(dialog.querySelector("textarea")).toBeNull();
  });

  it("copies one payload section through the same helper", async () => {
    const onCopy = vi.fn(async () => true);
    renderDetail({ onCopy });
    openTab(detail.tabPayloads);
    fireEvent.click(
      screen.getByRole("button", {
        name: detail.copyTitle.replace("{title}", detail.payload.providerResponse),
      })
    );
    await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
    expect(onCopy.mock.calls[0][0]).toContain("resp-1");
  });

  it("renders the payload in the JSON tree and keeps its expand level across tabs", () => {
    renderDetail();
    openTab(detail.tabPayloads);
    expect(screen.getAllByRole("tree").length).toBeGreaterThan(0);
    expect(screen.queryByText("value", { exact: false, selector: "pre" })).toBeNull();

    const levels = screen.getAllByTitle(detail.currentExpandLevel);
    const expandButtons = screen.getAllByRole("button", { name: detail.expandOneLevel });
    expect(levels[levels.length - 1].textContent).toBe("2");
    fireEvent.click(expandButtons[expandButtons.length - 1]);

    openTab(detail.tabOverview);
    openTab(detail.tabPayloads);
    const after = screen.getAllByTitle(detail.currentExpandLevel);
    expect(after[after.length - 1].textContent).toBe("3");
    expect(useJsonTreeExpandStore.getState().levels.providerResponse).toBe(3);
  });

  it("keeps the account masked until emails are made visible", () => {
    const account = "logs.user@example.com";
    renderDetail({ log: { ...LOG, account }, detail: { ...LOG, account } });
    expect(screen.queryByText(account)).toBeNull();
    expect(screen.getByText(/log\*{6}@\*{8}com/)).toBeTruthy();
  });
});

// #19329 base-red: the "copied" reset timers outlived the component. When the Vitest worker was
// still alive two seconds after the last copy click, the timer fired after jsdom teardown and the
// state update threw "window is not defined" as an unhandled error, failing the whole UI job.
describe("RequestLoggerDetail clears its copied-state timers on unmount", () => {
  const RESET_MS = 2000;

  function trackResetTimers() {
    const pending = new Set<unknown>();
    const realSet = globalThis.setTimeout;
    const realClear = globalThis.clearTimeout;
    vi.spyOn(globalThis, "setTimeout").mockImplementation(((
      handler: TimerHandler,
      ms?: number,
      ...args: unknown[]
    ) => {
      const id = realSet(handler as () => void, ms, ...args);
      if (ms === RESET_MS) pending.add(id);
      return id;
    }) as unknown as typeof setTimeout);
    vi.spyOn(globalThis, "clearTimeout").mockImplementation(((id?: unknown) => {
      pending.delete(id);
      return realClear(id as Parameters<typeof clearTimeout>[0]);
    }) as unknown as typeof clearTimeout);
    return pending;
  }

  it("copy all leaves no reset timer behind after unmount", async () => {
    const pending = trackResetTimers();
    const onCopy = vi.fn(async () => true);
    const { unmount } = renderDetail({ onCopy });
    fireEvent.click(screen.getByRole("button", { name: detail.copyAll }));
    await waitFor(() => expect(pending.size).toBe(1));
    unmount();
    expect(pending.size).toBe(0);
  });

  it("copying the stream section leaves no reset timer behind after unmount", async () => {
    const pending = trackResetTimers();
    const onCopy = vi.fn(async () => true);
    const { unmount } = renderDetail({ onCopy });
    openTab(detail.eventStream);
    fireEvent.click(
      screen.getByRole("button", {
        name: detail.copyTitle.replace("{title}", detail.providerEventStream),
      })
    );
    await waitFor(() => expect(pending.size).toBe(1));
    unmount();
    expect(pending.size).toBe(0);
  });
});
