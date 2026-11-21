// @vitest-environment jsdom
import React, { useState } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import { useKeyTemplateCreation } from "../../../src/app/(dashboard)/dashboard/api-manager/useKeyTemplateCreation";
import { useCreateKeySubmission } from "../../../src/app/(dashboard)/dashboard/api-manager/useCreateKeySubmission";
import QuickKeyPermissionControls from "../../../src/app/(dashboard)/dashboard/api-manager/components/QuickKeyPermissionControls";
import KeyPolicySixTabEditor from "../../../src/app/(dashboard)/dashboard/api-manager/components/KeyPolicySixTabEditor";

function CreateHarness() {
  const draft = useKeyTemplateCreation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useCreateKeySubmission(draft, {
    isSubmitting,
    setIsSubmitting,
    focusName() {},
    async onCreated() {},
  });
  return (
    <>
      <input
        aria-label="Synthetic key name"
        value={draft.newKeyName}
        onChange={(e) => draft.setNewKeyName(e.target.value)}
      />
      <fieldset aria-label="Quick permissions">
        <QuickKeyPermissionControls
          draft={draft}
          disabled={isSubmitting || draft.loadingTemplatePolicy}
        />
      </fieldset>
      <fieldset aria-label="Full permissions">
        <KeyPolicySixTabEditor
          policy={draft.draftCreatePolicy}
          formStateOverride={draft.createKeyFormState}
          onFormStateChange={draft.syncCreateKeyFormState}
          disabled={isSubmitting}
        />
      </fieldset>
      <button disabled={isSubmitting} onClick={submit}>
        Create synthetic key
      </button>
      {draft.createError && <p role="alert">{draft.createError}</p>}
    </>
  );
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("quick and full creation share independent permissions, keyboard operation and failure/loading state", async () => {
  const bodies: Array<{ policy: { key: { scopes: string[] } } }> = [];
  let finish!: (response: Response) => void;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      if (input === "/api/keys" && init?.method === "POST") {
        bodies.push(JSON.parse(String(init.body)));
        return new Promise<Response>((resolve) => {
          finish = resolve;
        });
      }
      return Response.json({
        data: [],
        combos: [],
        connections: [],
        groups: [],
        pools: [],
        proxies: [],
      });
    })
  );
  const user = userEvent.setup();
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <CreateHarness />
    </NextIntlClientProvider>
  );
  const quick = within(screen.getByRole("group", { name: "Quick permissions" }));
  const full = within(screen.getByRole("group", { name: "Full permissions" }));
  const connect = quick.getByRole("switch", { name: "Connect to MCP" }) as HTMLInputElement;
  expect(connect.checked).toBe(false);
  expect(
    (quick.getByRole("switch", { name: "Read CCR content" }) as HTMLInputElement).checked
  ).toBe(false);
  await user.type(screen.getByRole("textbox", { name: "Synthetic key name" }), "Synthetic reader");
  connect.focus();
  await user.keyboard(" ");
  expect(connect.checked).toBe(true);
  expect((full.getByRole("switch", { name: "Connect to MCP" }) as HTMLInputElement).checked).toBe(
    true
  );
  await user.click(full.getByRole("switch", { name: "Read CCR content" }));
  await user.click(screen.getByRole("button", { name: "Create synthetic key" }));
  await waitFor(() => expect(bodies.length).toBe(1));
  expect(connect.disabled).toBe(true);
  finish(Response.json({ error: "Synthetic failed save" }, { status: 500 }));
  await screen.findByRole("alert");
  expect(connect.checked).toBe(true);
  expect(connect.disabled).toBe(false);
  expect(
    (screen.getByRole("textbox", { name: "Synthetic key name" }) as HTMLInputElement).value
  ).toBe("Synthetic reader");
  expect(bodies[0].policy.key.scopes).toEqual(["mcp:connect", "read:compression", "self:usage"]);
  await user.click(quick.getByRole("switch", { name: "Read CCR content" }));
  await user.click(screen.getByRole("button", { name: "Create synthetic key" }));
  await waitFor(() => expect(bodies.length).toBe(2));
  finish(Response.json({ key: "synthetic-created" }, { status: 201 }));
  await waitFor(() => expect(connect.disabled).toBe(false));
  expect(bodies[1].policy.key.scopes).toEqual(["mcp:connect", "self:usage"]);
});
