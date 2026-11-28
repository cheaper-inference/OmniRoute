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
import { createDefaultKeyTemplatePolicy } from "../../../src/app/(dashboard)/dashboard/api-manager/keyTemplatePolicyUtils";

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

it("routes typed managed scope names to independent switches instead of unsaved chips", async () => {
  const bodies: Array<{ policy: { key: { scopes: string[] } } }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      if (input === "/api/keys" && init?.method === "POST") {
        bodies.push(JSON.parse(String(init.body)));
        return Response.json({ key: "synthetic-created" }, { status: 201 });
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
  const connect = full.getByRole<HTMLInputElement>("switch", { name: "Connect to MCP" });
  const compression = full.getByRole<HTMLInputElement>("switch", { name: "Read CCR content" });
  const input = full.getByPlaceholderText("Add custom scope...");
  const add = async (scope: string) => {
    await user.type(input, scope);
    await user.click(full.getByRole("button", { name: "Add Scope" }));
  };
  await add("  mcp:connect  ");
  expect(connect.checked).toBe(true);
  expect(compression.checked).toBe(false);
  expect(full.queryByText("mcp:connect")).toBeNull();
  await add("read:compression");
  await add("read:compression");
  expect(compression.checked).toBe(true);
  expect(full.queryByText("read:compression")).toBeNull();
  expect(quick.getByRole<HTMLInputElement>("switch", { name: "Read CCR content" }).checked).toBe(
    true
  );
  expect(full.getByRole<HTMLInputElement>("switch", { name: "Management Access" }).checked).toBe(
    false
  );
  await add("custom:example");
  expect(full.getByText("custom:example")).toBeTruthy();
  await user.click(connect);
  await user.type(screen.getByRole("textbox", { name: "Synthetic key name" }), "Synthetic reader");
  await user.click(screen.getByRole("button", { name: "Create synthetic key" }));
  await waitFor(() => expect(bodies.length).toBe(1));
  expect(bodies[0].policy.key.scopes).toEqual(["custom:example", "read:compression", "self:usage"]);
});

it("serializes both typed permissions in the template editor and preserves lease and custom scopes", async () => {
  const changed = vi.fn();
  function TemplateHarness() {
    const [policy, setPolicy] = useState(createDefaultKeyTemplatePolicy);
    return (
      <KeyPolicySixTabEditor
        policy={policy}
        onChange={(next, dirty) => {
          changed(next, dirty);
          setPolicy(next);
        }}
      />
    );
  }
  const user = userEvent.setup();
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <TemplateHarness />
    </NextIntlClientProvider>
  );
  const input = screen.getByPlaceholderText("Add custom scope...");
  for (const scope of ["mcp:connect", "read:compression", "custom:template"]) {
    await user.type(input, scope);
    await user.click(screen.getByRole("button", { name: "Add Scope" }));
  }
  await user.click(screen.getByRole("switch", { name: "Exclusive Lease" }));
  expect(changed).toHaveBeenLastCalledWith(
    expect.objectContaining({
      key: expect.objectContaining({
        scopes: expect.arrayContaining([
          "mcp:connect",
          "read:compression",
          "custom:template",
          "lease:exclusive",
        ]),
      }),
    }),
    true
  );
  expect(changed.mock.lastCall?.[0].key.scopes).not.toContain("manage");
  await user.click(screen.getByRole("switch", { name: "Read CCR content" }));
  const scopes = changed.mock.lastCall?.[0].key.scopes;
  expect(scopes).not.toContain("read:compression");
  expect(scopes).toEqual(
    expect.arrayContaining(["mcp:connect", "custom:template", "lease:exclusive"])
  );
});
