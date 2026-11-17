// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { translate } = vi.hoisted(() => ({ translate: (key: string) => key }));
vi.mock("next-intl", () => ({ useTranslations: () => translate, useLocale: () => "en" }));
vi.mock("next/link", () => ({ default: ({ children, href }) => <a href={href}>{children}</a> }));
vi.mock("@/shared/components/Modal", () => ({
  default: ({ isOpen, children, onClose, title }) =>
    isOpen ? (
      <section role="dialog" aria-label={title}>
        <button aria-label="dismiss-modal" onClick={onClose}>
          Close
        </button>
        {children}
      </section>
    ) : null,
}));
vi.mock("@/shared/components/Button", () => ({
  default: ({ children, onClick, disabled, type, title, "aria-label": label }) => (
    <button type={type} disabled={disabled} onClick={onClick} title={title} aria-label={label}>
      {children}
    </button>
  ),
}));
vi.mock("@/shared/components/Input", () => ({
  default: ({ label, ...props }) => (
    <label>
      {label}
      <input {...props} />
    </label>
  ),
}));
vi.mock("@/shared/components/Select", () => ({
  default: ({ label, options, children, ...props }) => (
    <label>
      {label}
      <select {...props}>
        {options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
    </label>
  ),
}));
vi.mock("@/shared/components/Toggle", () => ({
  default: ({ checked, onChange, ariaLabel, disabled }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      disabled={disabled}
    />
  ),
}));
vi.mock("@/shared/components/Card", () => ({
  default: ({ children }) => <section>{children}</section>,
}));
vi.mock("@/shared/components/Loading", () => ({
  Spinner: () => <span role="status">Loading</span>,
  CardSkeleton: () => null,
}));
vi.mock("@omniroute/ui-kit/page-header", () => ({
  PageHeader: ({ title, actions }) => (
    <header>
      {title}
      {actions}
    </header>
  ),
}));
vi.mock("@/shared/hooks/useConfirmDialog", () => ({
  useConfirmDialog: () => ({ requestConfirm: async () => true, confirmDialog: null }),
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/ApiKeyFilterBar", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/KeyPolicySixTabEditor", () => ({
  default: ({
    policy,
    formStateOverride,
    onFormStateChange,
    onChange,
    disabled,
    serverReferenceIssues,
  }) => (
    <section>
      <output data-testid="editor-policy">{JSON.stringify(policy)}</output>
      <output data-testid="editor-issues">{JSON.stringify(serverReferenceIssues)}</output>
      <output data-testid="editor-raw-ttl">{formStateOverride?.expiryTtlValue}</output>
      <button
        disabled={disabled}
        onClick={() => {
          const raw = {
            ...formStateOverride,
            expiryMode: "relative",
            expiryTtlValue: "",
            expiryTtlUnit: "seconds",
          };
          onFormStateChange?.(raw);
          onChange?.({ ...policy, expiry: { mode: "relative", ttlSeconds: 86400 } }, true);
        }}
      >
        Clear TTL
      </button>
      <button
        disabled={disabled}
        onClick={() => {
          const raw = {
            ...formStateOverride,
            expiryMode: "relative",
            expiryTtlValue: "90",
            expiryTtlUnit: "seconds",
          };
          onFormStateChange?.(raw);
          onChange?.({ ...policy, expiry: { mode: "relative", ttlSeconds: 90 } }, true);
        }}
      >
        Set exact TTL
      </button>
    </section>
  ),
}));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@omniroute/ui-kit/checkbox", () => ({
  Checkbox: ({ label, checked, onChange }) => (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  ),
}));
vi.mock("@omniroute/ui-kit/alert", () => ({
  Alert: ({ title, description }) => (
    <div role="alert">
      {title}
      {description}
    </div>
  ),
}));

import SaveKeyAsTemplateModal from "@/app/(dashboard)/dashboard/api-manager/components/SaveKeyAsTemplateModal";
import { createDefaultKeyTemplatePolicy } from "@/shared/types/keyTemplates";
import type {
  KeyTemplate,
  KeyTemplateReasoningRule,
  KeyTemplateTokenLimit,
} from "@/shared/types/keyTemplates";
import {
  KeyTemplateReasoningFields,
  KeyTemplateTokenLimitTiming,
} from "@/app/(dashboard)/dashboard/api-manager/components/KeyTemplatePolicyDetails";
import KeyTemplatesLibrarySection from "@/app/(dashboard)/dashboard/api-manager/components/KeyTemplatesLibrarySection";
import ApiManagerPageClient from "@/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const policy = createDefaultKeyTemplatePolicy();
const template: KeyTemplate = {
  id: "template-id",
  name: "Preset",
  description: "",
  revision: 1,
  schemaVersion: 1,
  policy,
  createdAt: "2026-11-08",
  updatedAt: "2026-11-08",
};
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
beforeEach(() => {
  localStorage.clear();
  if (!HTMLElement.prototype.scrollIntoView) HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("Save as template interaction", () => {
  it("fetches once per key and preserves edits and new acknowledgement warnings across parent rerenders", async () => {
    const request = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === "POST"
        ? json(
            {
              code: "ACKNOWLEDGEMENT_REQUIRED",
              warnings: [
                { code: "KEY_BANNED", message: "New warning", requiresAcknowledgement: true },
              ],
            },
            409
          )
        : json({ policy, warnings: [], referenceIssues: [] })
    );
    vi.stubGlobal("fetch", request);
    const props = { onClose: vi.fn(), onSaved: vi.fn() };
    const view = render(
      <SaveKeyAsTemplateModal {...props} sourceKey={{ id: "source", name: "Source" }} />
    );
    await waitFor(() =>
      expect(
        (screen.getByRole("button", { name: "saveAsTemplateAction" }) as HTMLButtonElement).disabled
      ).toBe(false)
    );
    fireEvent.change(screen.getByLabelText("templateNameLabel"), {
      target: { value: "Edited name" },
    });
    fireEvent.click(screen.getByRole("button", { name: "saveAsTemplateAction" }));
    await screen.findByText("New warning");
    view.rerender(
      <SaveKeyAsTemplateModal {...props} sourceKey={{ id: "source", name: "Renamed source" }} />
    );
    expect((screen.getByLabelText("templateNameLabel") as HTMLInputElement).value).toBe(
      "Edited name"
    );
    expect(screen.getByText("New warning")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "saveAsTemplateAction" }) as HTMLButtonElement).disabled
    ).toBe(true);
    fireEvent.click(screen.getByRole("checkbox"));
    view.rerender(
      <SaveKeyAsTemplateModal {...props} sourceKey={{ id: "source", name: "Source" }} />
    );
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
    expect(request.mock.calls.filter(([, init]) => !init?.method)).toHaveLength(1);
  });
  it("requires acknowledgement before submitting the existing-key reference", async () => {
    const request = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === "POST"
        ? json({ template, warnings: [] }, 201)
        : json({
            policy,
            referenceIssues: [],
            warnings: [
              {
                code: "KEY_DISABLED",
                message: "Source is disabled",
                requiresAcknowledgement: true,
              },
            ],
          })
    );
    vi.stubGlobal("fetch", request);
    const saved = vi.fn();
    render(
      <SaveKeyAsTemplateModal
        sourceKey={{ id: "source", name: "Source" }}
        onClose={vi.fn()}
        onSaved={saved}
      />
    );
    await screen.findByText("Source is disabled");
    const save = screen.getByRole("button", { name: "saveAsTemplateAction" });
    expect((save as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.change(screen.getByLabelText("templateNameLabel"), {
      target: { value: "Restricted preset" },
    });
    fireEvent.click(save);
    await waitFor(() => expect(saved).toHaveBeenCalledWith(template));
    const call = request.mock.calls.find(([, init]) => init?.method === "POST")!;
    expect(call[0]).toBe("/api/key-templates");
    expect(JSON.parse(call[1]!.body as string)).toEqual({
      fromKeyId: "source",
      name: "Restricted preset",
      description: "",
      acknowledge: ["KEY_DISABLED"],
    });
  });

  it("does not save when the secret-free policy preview is refused", async () => {
    const request = vi.fn(async () => json({ error: "Cannot capture policy" }, 422));
    vi.stubGlobal("fetch", request);
    const saved = vi.fn();
    render(
      <SaveKeyAsTemplateModal
        sourceKey={{ id: "source", name: "Source" }}
        onClose={vi.fn()}
        onSaved={saved}
      />
    );
    await screen.findByText(/Cannot capture policy/);
    const save = screen.getByRole("button", { name: "saveAsTemplateAction" });
    expect((save as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(save);
    expect(request).toHaveBeenCalledTimes(1);
    expect(saved).not.toHaveBeenCalled();
  });

  it("ignores a late preview for a previously selected key", async () => {
    let resolveOld!: (response: Response) => void;
    const old = new Promise<Response>((resolve) => {
      resolveOld = resolve;
    });
    const request = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === "POST") return json({ template, warnings: [] }, 201);
      if (url.includes("source-a")) return old;
      return json({ policy, referenceIssues: [], warnings: [] });
    });
    vi.stubGlobal("fetch", request);
    const saved = vi.fn();
    const view = render(
      <SaveKeyAsTemplateModal
        sourceKey={{ id: "source-a", name: "Source A" }}
        onClose={vi.fn()}
        onSaved={saved}
      />
    );
    view.rerender(
      <SaveKeyAsTemplateModal
        sourceKey={{ id: "source-b", name: "Source B" }}
        onClose={vi.fn()}
        onSaved={saved}
      />
    );
    await waitFor(() =>
      expect(
        (screen.getByRole("button", { name: "saveAsTemplateAction" }) as HTMLButtonElement).disabled
      ).toBe(false)
    );
    await act(async () =>
      resolveOld(
        json({
          policy,
          referenceIssues: [],
          warnings: [
            { code: "KEY_DISABLED", message: "Old warning", requiresAcknowledgement: true },
          ],
        })
      )
    );
    expect(screen.queryByText("Old warning")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "saveAsTemplateAction" }));
    await waitFor(() => expect(saved).toHaveBeenCalled());
    const call = request.mock.calls.find(([, init]) => init?.method === "POST")!;
    expect(JSON.parse(call[1]!.body as string).fromKeyId).toBe("source-b");
  });
});

describe("template library failures", () => {
  it.each(["TEMPLATE_NAME_CONFLICT", "REVISION_CONFLICT"])(
    "distinguishes %s and requires reload only for revision conflicts",
    async (code) => {
      const request = vi.fn(async (_url: string, init?: RequestInit) =>
        init?.method === "PATCH" ? json({ code }, 409) : json({ template, referenceIssues: [] })
      );
      vi.stubGlobal("fetch", request);
      render(
        <KeyTemplatesLibrarySection
          templates={[template]}
          onRefreshTemplates={vi.fn()}
          onUseTemplate={vi.fn()}
        />
      );
      fireEvent.click(screen.getByRole("button", { name: "editTemplateAction Preset" }));
      await waitFor(() =>
        expect(
          (screen.getByRole("button", { name: "saveChanges" }) as HTMLButtonElement).disabled
        ).toBe(false)
      );
      fireEvent.click(screen.getByRole("button", { name: "saveChanges" }));
      await screen.findByText(
        code === "REVISION_CONFLICT" ? "templateRevisionConflictError" : "templateNameConflictError"
      );
      const reload = screen.queryByRole("button", { name: "templateReloadAction" });
      if (code === "REVISION_CONFLICT") {
        expect(reload).toBeTruthy();
        expect(
          (screen.getByRole("button", { name: "saveChanges" }) as HTMLButtonElement).disabled
        ).toBe(true);
        fireEvent.click(reload!);
        await waitFor(() =>
          expect(
            (screen.getByRole("button", { name: "saveChanges" }) as HTMLButtonElement).disabled
          ).toBe(false)
        );
      } else {
        expect(reload).toBeNull();
        fireEvent.change(screen.getByLabelText("templateNameLabel"), {
          target: { value: "Another" },
        });
        expect(
          (screen.getByRole("button", { name: "saveChanges" }) as HTMLButtonElement).disabled
        ).toBe(false);
      }
    }
  );

  it("shows unreadable templates as delete-only and never presents a fetch failure as an empty library", async () => {
    const request = vi.fn(async () => json({ deleted: true }));
    vi.stubGlobal("fetch", request);
    const refresh = vi.fn();
    render(
      <KeyTemplatesLibrarySection
        templates={[]}
        unreadable={[
          { id: "bad-policy", name: "Broken", revision: 2, code: "SOURCE_POLICY_UNREADABLE" },
        ]}
        loadError="Library unavailable"
        onRefreshTemplates={refresh}
        onUseTemplate={vi.fn()}
      />
    );
    const row = screen.getByTestId("unreadable-template-bad-policy");
    expect(within(row).getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByText("noTemplatesYet")).toBeNull();
    expect(screen.getByText("Library unavailable")).toBeTruthy();
    fireEvent.click(within(row).getByRole("button", { name: "deleteTemplateAction Broken" }));
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(request).toHaveBeenCalledWith("/api/key-templates/bad-policy", { method: "DELETE" });
  });
});

describe("template loading and draft validation", () => {
  it("routes key creation reference errors into the actionable policy editor", async () => {
    const issue = {
      path: "key.proxyId",
      code: "PROXY_NOT_FOUND",
      value: "missing-proxy",
      message: "Missing proxy",
      blocking: true,
    };
    const staleTemplate = {
      ...template,
      policy: { ...policy, key: { ...policy.key, proxyId: "missing-proxy" } },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        if (url === "/api/keys" && init?.method === "POST")
          return json({ code: "REFERENCE_INVALID", issues: [issue] }, 422);
        if (url === "/api/keys") return json({ keys: [] });
        if (url === "/api/key-templates") return json({ templates: [staleTemplate] });
        if (url === "/api/key-templates/template-id")
          return json({ template: staleTemplate, referenceIssues: [] });
        return json({});
      })
    );
    render(<ApiManagerPageClient />);
    fireEvent.click((await screen.findAllByRole("button", { name: "createKey" }))[0]);
    fireEvent.change(screen.getByLabelText("keyName"), { target: { value: "Fresh" } });
    await screen.findByRole("option", { name: /Preset/ });
    fireEvent.change(screen.getByLabelText("templatePickerLabel"), {
      target: { value: "template-id" },
    });
    await waitFor(() =>
      expect((screen.getByLabelText("templatePickerLabel") as HTMLSelectElement).value).toBe(
        "template-id"
      )
    );
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "createKey" }));
    await waitFor(() =>
      expect(JSON.parse(screen.getByTestId("editor-issues").textContent!)).toEqual([issue])
    );
  });
  const first = { ...template, id: "first", name: "First" };
  const second = { ...template, id: "second", name: "Second" };
  function installPageRequests(detail: (url: string) => Promise<Response>) {
    const request = vi.fn(async (url: string, init?: RequestInit) => {
      if (url.startsWith("/api/key-templates/")) return detail(url);
      if (url === "/api/key-templates") return json({ templates: [first, second] });
      if (url === "/api/keys" && init?.method === "POST")
        return json(
          {
            key: "fixture-only",
            id: "created",
            name: "Fresh",
            policy: JSON.parse(init.body as string).policy,
          },
          201
        );
      if (url === "/api/keys") return json({ keys: [] });
      if (url === "/api/providers") return json({ connections: [] });
      return json({});
    });
    vi.stubGlobal("fetch", request);
    return request;
  }

  it("disables quick permission controls until the selected template policy arrives", async () => {
    let resolveDetail!: (response: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveDetail = resolve;
    });
    installPageRequests(() => pending);
    render(<ApiManagerPageClient />);
    fireEvent.click((await screen.findAllByRole("button", { name: "createKey" }))[0]);
    fireEvent.change(screen.getByLabelText("templatePickerLabel"), { target: { value: "first" } });
    for (const label of [
      "managementAccess",
      "ownUsageVisibility",
      "sharedAccountQuotaVisibility",
      "localUsageCommand",
    ]) {
      expect((screen.getByRole("checkbox", { name: label }) as HTMLInputElement).disabled).toBe(
        true
      );
    }
    await act(async () => resolveDetail(json({ template: first, referenceIssues: [] })));
    expect(
      (screen.getByRole("checkbox", { name: "managementAccess" }) as HTMLInputElement).disabled
    ).toBe(false);
  });

  it("disables the library policy editor while refreshing template detail", async () => {
    let resolveDetail!: (response: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveDetail = resolve;
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(() => pending)
    );
    render(
      <KeyTemplatesLibrarySection
        templates={[first]}
        onUseTemplate={vi.fn()}
        onRefreshTemplates={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "editTemplateAction First" }));
    expect((screen.getByRole("button", { name: "Clear TTL" }) as HTMLButtonElement).disabled).toBe(
      true
    );
    await act(async () => resolveDetail(json({ template: first, referenceIssues: [] })));
    expect((screen.getByRole("button", { name: "Clear TTL" }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it("does not let a closed create-form request overwrite a newly selected template", async () => {
    let resolveOld!: (response: Response) => void;
    const old = new Promise<Response>((r) => {
      resolveOld = r;
    });
    installPageRequests((url) =>
      url.endsWith("/first")
        ? old
        : Promise.resolve(json({ template: second, referenceIssues: [] }))
    );
    render(<ApiManagerPageClient />);
    fireEvent.click((await screen.findAllByRole("button", { name: "createKey" }))[0]);
    fireEvent.change(screen.getByLabelText("templatePickerLabel"), { target: { value: "first" } });
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "dismiss-modal" })
    );
    fireEvent.click(screen.getAllByRole("button", { name: "createKey" })[0]);
    fireEvent.change(screen.getByLabelText("templatePickerLabel"), { target: { value: "second" } });
    await waitFor(() =>
      expect((screen.getByLabelText("templatePickerLabel") as HTMLSelectElement).value).toBe(
        "second"
      )
    );
    await act(async () => resolveOld(json({ template: first, referenceIssues: [] })));
    expect((screen.getByLabelText("templatePickerLabel") as HTMLSelectElement).value).toBe(
      "second"
    );
  });

  it("keeps an invalid raw TTL invalid instead of silently replacing it with one day", async () => {
    const request = installPageRequests(async () =>
      json({ template: second, referenceIssues: [] })
    );
    render(<ApiManagerPageClient />);
    fireEvent.click((await screen.findAllByRole("button", { name: "createKey" }))[0]);
    fireEvent.change(screen.getByLabelText("keyName"), { target: { value: "Fresh" } });
    fireEvent.click(screen.getByRole("button", { name: "customizeFullPolicy" }));
    fireEvent.click(screen.getByRole("button", { name: "Clear TTL" }));
    const submit = within(screen.getByRole("dialog")).getByRole("button", { name: "createKey" });
    expect((submit as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(submit);
    expect(
      request.mock.calls.some(([url, init]) => url === "/api/keys" && init?.method === "POST")
    ).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Set exact TTL" }));
    expect((submit as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(submit);
    await waitFor(() =>
      expect(
        request.mock.calls.some(([url, init]) => url === "/api/keys" && init?.method === "POST")
      ).toBe(true)
    );
    const call = request.mock.calls.find(
      ([url, init]) => url === "/api/keys" && init?.method === "POST"
    )!;
    expect(JSON.parse(call[1]!.body as string).policy.expiry).toEqual({
      mode: "relative",
      ttlSeconds: 90,
    });
  });

  it("does not change the edit target when an earlier template detail arrives late", async () => {
    let resolveOld!: (response: Response) => void;
    const old = new Promise<Response>((r) => {
      resolveOld = r;
    });
    const request = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") return json({ template: second });
      if (url.endsWith("/first")) return old;
      return json({ template: second, referenceIssues: [] });
    });
    vi.stubGlobal("fetch", request);
    render(
      <KeyTemplatesLibrarySection
        templates={[first, second]}
        onUseTemplate={vi.fn()}
        onRefreshTemplates={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "editTemplateAction First" }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "dismiss-modal" })
    );
    fireEvent.click(screen.getByRole("button", { name: "editTemplateAction Second" }));
    await screen.findByTestId("editor-policy");
    await act(async () => resolveOld(json({ template: first, referenceIssues: [] })));
    expect((screen.getByLabelText("templateNameLabel") as HTMLInputElement).value).toBe("Second");
    fireEvent.click(screen.getByRole("button", { name: "saveChanges" }));
    await waitFor(() =>
      expect(request.mock.calls.some(([, init]) => init?.method === "PATCH")).toBe(true)
    );
    expect(request.mock.calls.find(([, init]) => init?.method === "PATCH")![0]).toBe(
      "/api/key-templates/second"
    );
  });
});

it("allows editing routing targets, budgets, tags and token reset configuration", () => {
  const initial: KeyTemplateReasoningRule = {
    name: "Rule",
    description: "",
    scope: "apiKey",
    comboId: null,
    connectionId: null,
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  };
  function Form() {
    const [rule, setRule] = React.useState(initial);
    const [limit, setLimit] = React.useState<KeyTemplateTokenLimit>({
      scopeType: "global" as const,
      scopeValue: "",
      tokenLimit: 100,
      resetInterval: "daily" as const,
      resetTime: "00:00",
      enabled: true,
    });
    return (
      <>
        <KeyTemplateReasoningFields
          rule={rule}
          onChange={(p) => setRule((v) => ({ ...v, ...p }))}
          combos={[{ id: "combo-id", label: "Chosen combo" }]}
          connections={[]}
        />
        <KeyTemplateTokenLimitTiming
          limit={limit}
          onChange={(p) => setLimit((v) => ({ ...v, ...p }))}
        />
        <output data-testid="details-result">{JSON.stringify({ rule, limit })}</output>
      </>
    );
  }
  render(<Form />);
  fireEvent.change(screen.getByLabelText("templateRuleTargetKind"), { target: { value: "combo" } });
  fireEvent.change(screen.getByLabelText("templateRuleTargetCombo"), {
    target: { value: "combo-id" },
  });
  fireEvent.change(screen.getByLabelText("templateRuleBudgetAction"), { target: { value: "set" } });
  fireEvent.change(screen.getByLabelText("templateRuleBudgetTokens"), { target: { value: "512" } });
  fireEvent.change(screen.getByLabelText("templateRulePriority"), { target: { value: "8" } });
  fireEvent.click(screen.getByRole("button", { name: "templateAddTag" }));
  fireEvent.change(screen.getByLabelText("templateRuleRequestTag 1"), {
    target: { value: "deep" },
  });
  fireEvent.change(screen.getByLabelText("templateTokenResetTime"), { target: { value: "04:30" } });
  fireEvent.click(screen.getByRole("checkbox", { name: "templateTokenEnabled" }));
  const result = JSON.parse(screen.getByTestId("details-result").textContent!);
  expect(result.rule).toMatchObject({
    targetKind: "combo",
    targetComboId: "combo-id",
    budgetAction: "set",
    budgetTokens: 512,
    priority: 8,
    requestTags: ["deep"],
  });
  expect(result.limit).toMatchObject({ resetTime: "04:30", enabled: false });
  fireEvent.click(screen.getByRole("checkbox", { name: "templateTokenUseDefaultTime" }));
  expect(JSON.parse(screen.getByTestId("details-result").textContent!).limit.resetTime).toBeNull();
});
