// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { getCodexServiceTierBadge } from "@/app/(dashboard)/dashboard/providers/[id]/components/codexServiceTierBadge";
import CodexFastTierTab from "@/app/(dashboard)/dashboard/settings/components/CodexFastTierTab";
import { CodexConnectionFields } from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/CodexFingerprintFields";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => values?.model || key,
}));
vi.mock("@/shared/components", async () => ({
  Button: (await import("@/shared/components/Button")).default,
  Card: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
  Toggle: ({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) => (
    <input
      type="checkbox"
      aria-label="toggle"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
  Select: ({
    label,
    value,
    options,
    onChange,
    disabled,
  }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    disabled?: boolean;
  }) => (
    <select aria-label={label} value={value} onChange={onChange} disabled={disabled}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));
let root: Root;
let el: HTMLDivElement;
let saved: { enabled: boolean; tier: string; supportedModels: string[] };
beforeEach(() => {
  saved = {
    enabled: true,
    tier: "priority",
    supportedModels: ["gpt-6-astra", "gpt-6.1-sol", "custom-legacy-model"],
  };
  el = document.createElement("div");
  document.body.appendChild(el);
  root = createRoot(el);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") saved = JSON.parse(String(init.body)).codexServiceTier;
      return { ok: true, json: async () => ({ codexServiceTier: saved }) };
    })
  );
});
afterEach(async () => {
  await act(async () => root.unmount());
  el.remove();
  vi.unstubAllGlobals();
});
async function change(select: HTMLSelectElement, value: string) {
  await act(async () => {
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

it("selects and reloads Ultrafast globally, scopes checklist and preserves other-tier choices", async () => {
  await act(async () => root.render(<CodexFastTierTab />));
  const select = el.querySelector("select")!;
  expect(select.querySelector('option[value="ultrafast"]')).not.toBeNull();
  await change(select, "ultrafast");
  expect(saved.tier).toBe("ultrafast");
  await act(async () =>
    el
      .querySelector("button[aria-expanded]")!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }))
  );
  const modelInputs = () =>
    Array.from(el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).filter(
      (input) => input.getAttribute("aria-label") !== "toggle"
    );
  expect(
    modelInputs()
      .map((input) => input.getAttribute("aria-label"))
      .sort()
  ).toEqual(["gpt-6-astra", "gpt-6.1-sol"].sort());
  await act(async () => modelInputs()[0].click());
  expect(saved.supportedModels).toContain("custom-legacy-model");
  await change(select, "priority");
  expect(modelInputs().map((input) => input.getAttribute("aria-label"))).toContain(
    "custom-legacy-model"
  );
  await change(select, "ultrafast");
  await act(async () => root.render(<CodexFastTierTab key="reload" />));
  expect(el.querySelector("select")!.value).toBe("ultrafast");
});

it("offers the connection default, emits its saved value and restores it", async () => {
  const onChange = vi.fn();
  const props = {
    t: (key: string) => key,
    reasoningEffort: "medium",
    serviceTier: "default" as const,
    fingerprintMode: "session" as const,
    promptCacheKeyScope: "client" as const,
    openaiStoreEnabled: false,
    allowPaidCredits: false,
    showFingerprintMode: false,
    onChange,
  };
  await act(async () => root.render(<CodexConnectionFields {...props} />));
  const select = Array.from(el.querySelectorAll("select")).find((s) =>
    s.querySelector('option[value="priority"]')
  )!;
  const option = select.querySelector('option[value="ultrafast"]');
  expect(option).not.toBeNull();
  await change(select, "ultrafast");
  expect(onChange).toHaveBeenCalledWith({ codexServiceTier: "ultrafast" });
  await act(async () =>
    root.render(<CodexConnectionFields {...props} {...{ serviceTier: "ultrafast" as const }} />)
  );
  expect(select.value).toBe("ultrafast");
});

it("labels configured Ultrafast without claiming upstream application", () => {
  const badge = getCodexServiceTierBadge((key) => key, "ultrafast", true);
  expect(badge?.label).toBe("Ultrafast");
  expect(badge?.title).toContain("gpt-6-astra");
  expect(badge?.title).toContain("gpt-6.1-sol");
  expect(badge?.title).not.toContain("active");
  expect(getCodexServiceTierBadge((key) => key, "priority", false)?.label).toBe("Fast");
  expect(getCodexServiceTierBadge((key) => key, "flex", false)?.label).toBe("Flex");
});
