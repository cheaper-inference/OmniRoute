// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import { usePageState } from "@/app/(dashboard)/dashboard/grok-bot/page-state";
import { useBotDetails } from "@/app/(dashboard)/dashboard/grok-bot/page-effects";
import {
  answerSecret,
  answerPermission,
  submit,
  switchAccount,
  switchBot,
} from "@/app/(dashboard)/dashboard/grok-bot/page-actions";
import messages from "@/i18n/messages/en.json";

const secret = { kind: "secret" as const, seq: "1", entryId: "reused-card", label: "Password" };
const permission = {
  seq: "1",
  entryId: "reused-card",
  requestId: "reused-request",
  action: "read",
  target: "file",
  machineId: "machine",
  status: "pending",
};
function DetailsLoader({ state }: { state: ReturnType<typeof usePageState> }) {
  useBotDetails(state);
  return null;
}
function Harness({ details = false }: { details?: boolean }) {
  const pageState = usePageState();
  // Supply only the active stream identity; state, actions and details effects stay real.
  const selectionRef = useRef("");
  const state = { ...pageState, selectionRef };
  return (
    <>
      {details ? <DetailsLoader state={state} /> : null}
      <button onClick={() => switchAccount(state, "account-a")}>A</button>
      <button onClick={() => switchAccount(state, "account-b")}>B</button>
      <button
        onClick={() => {
          switchBot(state, "bot-x");
          selectionRef.current = `${state.selectedAccount}:bot-x`;
        }}
      >
        Bot
      </button>
      <button
        onClick={() => {
          state.setCards([secret]);
          state.setPermissions([permission]);
          state.setDraft("hello");
        }}
      >
        Populate
      </button>
      <button onClick={() => void answerSecret(state, secret, "test-value")}>Secret</button>
      <button onClick={() => void answerPermission(state, permission, "allow_once")}>
        Permission
      </button>
      <button onClick={() => submit(state)}>Send</button>
      <output>
        {JSON.stringify({
          skills: pageState.skills,
          cards: pageState.cards,
          permissions: pageState.permissions,
          cardBusy: pageState.cardBusy,
          permissionState: pageState.permissionState,
          sendState: pageState.sendState,
        })}
      </output>
    </>
  );
}
function mount(details = false) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Harness details={details} />
    </NextIntlClientProvider>
  );
}
async function click(name: string) {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name }));
  });
}
function view() {
  return JSON.parse(screen.getByRole("status").textContent!);
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("ignores old bot details even when JSON resolves after switching away and back", async () => {
  let finish!: (body: unknown) => void;
  const pending = new Promise((resolve) => {
    finish = resolve;
  });
  let calls = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      if (++calls === 1) return { ok: true, json: () => pending } as Response;
      return Response.json({
        skills: [{ id: "new", name: "New skill", description: "new" }],
        routines: [],
      });
    })
  );
  mount(true);
  await click("A");
  await click("Bot");
  await click("B");
  await click("A");
  await click("Bot");
  await waitFor(() => expect(view().skills[0]?.name).toBe("New skill"));
  await act(async () => {
    finish({ skills: [{ id: "old", name: "Old skill", description: "old" }], routines: [] });
  });
  expect(view().skills[0]?.name).toBe("New skill");
});

it.each(["Secret", "Permission"])(
  "ignores a late %s result after the same account is revisited",
  async (action) => {
    let finish!: (response: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      finish = resolve;
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => pending)
    );
    mount();
    await click("A");
    await click("Bot");
    await click("Populate");
    await click(action);
    await click("B");
    await click("A");
    await click("Bot");
    await click("Populate");
    await act(async () => {
      finish(
        action === "Secret" ? Response.json({ ok: true }) : new Response(null, { status: 409 })
      );
    });
    expect(view().cards).toHaveLength(1);
    expect(view().permissions).toHaveLength(1);
    expect(view().permissionState).toBe("");
  }
);

it("does not publish an old send outcome after returning to the same conversation", async () => {
  let finish!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => pending)
  );
  mount();
  await click("A");
  await click("Bot");
  await click("Populate");
  await click("Send");
  await click("B");
  await click("A");
  await click("Bot");
  await act(async () => {
    finish(Response.json({ ok: true }));
  });
  expect(view().sendState).toBe("idle");
});
