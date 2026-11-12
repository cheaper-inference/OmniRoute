// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    key === "codexAccountRole" ? `Role: ${values?.role}` : key,
}));

import ConnectionRow, {
  type ConnectionRowProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanup: Array<() => void> = [];
const noop = () => {};

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});
afterEach(() => {
  while (cleanup.length) cleanup.pop()?.();
  document.body.innerHTML = "";
});

async function mount(providerSpecificData: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.append(el);
  const root = createRoot(el);
  cleanup.push(() => act(() => root.unmount()));
  const props: ConnectionRowProps = {
    connection: { id: "a", provider: "codex", name: "Synthetic", providerSpecificData },
    isOAuth: true,
    isCodex: true,
    isFirst: true,
    isLast: true,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    onToggleQuotaVisibility: noop,
  };
  await act(async () => root.render(<ConnectionRow {...props} />));
  return el;
}

describe("Codex operational row identity (collapsed)", () => {
  it("shows the readable plan and keeps the raw value in the tooltip", async () => {
    const el = await mount({ chatgptPlanType: "self_serve_business_prolite" });
    expect(el.textContent).toContain("Business Pro Lite");
    expect(el.textContent).not.toContain("self_serve_business_prolite");
    expect(el.querySelector('[title="self_serve_business_prolite"]')).not.toBeNull();
  });

  it("shows the workspace account kind, name and role without expanding details", async () => {
    const el = await mount({
      chatgptPlanType: "team",
      workspaceStructure: "workspace",
      workspaceName: "Acme",
      workspaceRole: "account-owner",
    });
    expect(el.textContent).toContain("codexAccountBusiness");
    expect(el.textContent).toContain("Acme");
    expect(el.querySelector('[title="Role: account-owner"]')).not.toBeNull();
  });

  it("marks a personal plan on the collapsed row", async () => {
    const el = await mount({ chatgptPlanType: "plus", workspaceStructure: "personal" });
    expect(el.textContent).toContain("codexAccountPersonal");
    expect(el.textContent).toContain("Plus");
  });
});
