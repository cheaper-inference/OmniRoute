// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import {
  ConsoleBar,
  ConversationPanel,
  type ConversationHandlers,
  type ConversationState,
} from "@/app/(dashboard)/dashboard/grok-bot/panels";
import messages from "@/i18n/messages/en.json";

const t = (key: string) => key;
afterEach(cleanup);
function state(overrides: Partial<ConversationState> = {}): ConversationState {
  return {
    stateLabel: "idle",
    runState: "",
    linkLost: false,
    blocked: false,
    needsSignIn: false,
    historyUnavailable: false,
    loading: false,
    terminal: false,
    messages: [],
    window: 40,
    cards: [],
    cardFailed: false,
    cardBusy: false,
    permissions: [],
    permissionFailed: false,
    computers: [],
    draft: "",
    sendState: "",
    fanState: "",
    uploadNote: "",
    ...overrides,
  };
}
function handlers(): ConversationHandlers {
  return {
    onRetry: vi.fn(),
    onOlder: vi.fn(),
    onAnswer: vi.fn(),
    onConnector: vi.fn(),
    onWidget: vi.fn(),
    onDismissWidget: vi.fn(),
    onSecret: vi.fn(),
    onDiscardDraft: vi.fn(),
    onDraft: vi.fn(),
    onSubmit: vi.fn(),
    onUpload: vi.fn(),
  };
}
function conversation(value: ConversationState, actions: ConversationHandlers) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ConversationPanel t={t} state={value} handlers={actions} />
    </NextIntlClientProvider>
  );
}

it("keeps labelled native account selection and disabled roster semantics through the Select adapter", () => {
  const onAccount = vi.fn();
  const onBot = vi.fn();
  const onToggleDetails = vi.fn();
  const { rerender } = render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ConsoleBar
        accounts={[{ id: "a", name: "Main" }]}
        roster={[]}
        chiefLabel="Chief"
        selectedAccount=""
        selectedBot=""
        rosterLoading={false}
        stateLabel="idle"
        onAccount={onAccount}
        onBot={onBot}
        onToggleDetails={onToggleDetails}
        t={t}
      />
    </NextIntlClientProvider>
  );
  const account = screen.getByRole("combobox", { name: "accountsTitle" });
  expect(account.className).toContain("ci-native-select");
  expect(
    (screen.getByRole("combobox", { name: "rosterTitle" }) as HTMLSelectElement).disabled
  ).toBe(true);
  fireEvent.change(account, { target: { value: "a" } });
  expect(onAccount).toHaveBeenCalledWith("a");
  rerender(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ConsoleBar
        accounts={[{ id: "a", name: "Main" }]}
        roster={[]}
        chiefLabel="Chief"
        selectedAccount="a"
        selectedBot=""
        rosterLoading={true}
        stateLabel="idle"
        onAccount={onAccount}
        onBot={onBot}
        onToggleDetails={onToggleDetails}
        t={t}
      />
    </NextIntlClientProvider>
  );
  expect(
    (screen.getByRole("combobox", { name: "rosterTitle" }) as HTMLSelectElement).disabled
  ).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "detailsTitle" }));
  expect(onToggleDetails).toHaveBeenCalledOnce();
  expect(onBot).not.toHaveBeenCalled();
});

it("keeps multi-select values, custom form submission, dismissal and busy disabling with kit controls", () => {
  const card = {
    kind: "widget" as const,
    seq: "1",
    entryId: "widget",
    prompt: "Choose tools",
    options: [
      { label: "Read", value: "read" },
      { label: "Write", value: "write" },
    ],
    allowCustom: true,
    multiSelect: true,
    dismissOnMoveOn: true,
  };
  const actions = handlers();
  const { rerender } = render(conversation(state({ cards: [card] }), actions));
  const read = screen.getByRole("checkbox", { name: "Read" });
  expect(read.className).toContain("ci-checkbox");
  fireEvent.click(read);
  fireEvent.click(screen.getByRole("checkbox", { name: "Write" }));
  fireEvent.click(screen.getByRole("button", { name: "widgetSubmit" }));
  expect(actions.onWidget).toHaveBeenLastCalledWith(card, "read\nwrite");
  fireEvent.click(read);
  fireEvent.click(screen.getByRole("button", { name: "widgetSubmit" }));
  expect(actions.onWidget).toHaveBeenLastCalledWith(card, "write");
  const custom = screen.getByRole("textbox", { name: "Choose tools" });
  fireEvent.change(custom, { target: { value: "other" } });
  fireEvent.submit(custom.closest("form")!);
  expect(actions.onWidget).toHaveBeenLastCalledWith(card, "other");
  fireEvent.click(screen.getByRole("button", { name: "widgetDismiss" }));
  expect(actions.onDismissWidget).toHaveBeenCalledWith(card);
  rerender(conversation(state({ cards: [card], cardBusy: true }), actions));
  const calls = vi.mocked(actions.onWidget).mock.calls.length;
  fireEvent.click(screen.getByRole("button", { name: "widgetSubmit" }));
  expect(actions.onWidget).toHaveBeenCalledTimes(calls);
});

it("preserves password form values and submit type instead of silently turning submit into a plain button", () => {
  const card = { kind: "secret" as const, seq: "1", entryId: "secret", label: "Service password" };
  const actions = handlers();
  render(conversation(state({ cards: [card] }), actions));
  const input = screen.getByLabelText("Service password") as HTMLInputElement;
  expect(input.type).toBe("password");
  expect(input.className).toContain("ci-input");
  fireEvent.change(input, { target: { value: "local-test-value" } });
  const button = screen.getByRole("button", { name: "widgetSubmit" }) as HTMLButtonElement;
  expect(button.type).toBe("submit");
  fireEvent.click(button);
  expect(actions.onSecret).toHaveBeenCalledExactlyOnceWith(card, "local-test-value");
});

it("retains compose submit, file cancellation, and repeated same-file selection without uploading bytes", () => {
  const actions = handlers();
  const { rerender } = render(conversation(state(), actions));
  const send = screen.getByRole("button", { name: "sendButton" }) as HTMLButtonElement;
  expect(send.disabled).toBe(true);
  expect(send.className).toContain("ci-button");
  const composer = screen.getByRole("textbox", { name: "sendPlaceholder" });
  fireEvent.change(composer, { target: { value: "hello" } });
  expect(actions.onDraft).toHaveBeenCalledWith("hello");
  rerender(conversation(state({ draft: "hello" }), actions));
  fireEvent.submit(composer.closest("form")!);
  expect(actions.onSubmit).toHaveBeenCalledOnce();
  const file = screen.getByLabelText("attachButton") as HTMLInputElement;
  fireEvent.change(file, { target: { files: [] } });
  expect(actions.onUpload).not.toHaveBeenCalled();
  const attachment = new File(["test"], "sample.txt", { type: "text/plain" });
  fireEvent.change(file, { target: { files: [attachment] } });
  expect(file.value).toBe("");
  fireEvent.change(file, { target: { files: [attachment] } });
  expect(actions.onUpload).toHaveBeenCalledTimes(2);
  expect(actions.onUpload).toHaveBeenLastCalledWith("sample.txt");
});
