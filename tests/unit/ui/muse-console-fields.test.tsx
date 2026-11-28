// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import QuotaScrapingFields from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/QuotaScrapingFields";
import { EMPTY_QUOTA_SCRAPING_FIELDS } from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues";

let unmount: (() => void) | undefined;
afterEach(() => {
  act(() => unmount?.());
  document.body.innerHTML = "";
});

it("renders editable Muse credentials without exposing the session as plain text", () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  unmount = () => root.unmount();
  const changed = vi.fn();
  act(() =>
    root.render(
      <QuotaScrapingFields
        provider="muse-code"
        values={{ ...EMPTY_QUOTA_SCRAPING_FIELDS, museTeamId: "team-synthetic" }}
        onChange={changed}
        t={(key) => key}
        editMode
      />
    )
  );
  const session = container.querySelector<HTMLInputElement>('input[name="museConsoleSession"]');
  const team = container.querySelector<HTMLInputElement>('input[name="museTeamId"]');
  expect(session?.type).toBe("password");
  expect(session?.value).toBe("");
  expect(team?.value).toBe("team-synthetic");
  expect(container.textContent).toContain("llama_dev_sess");
  expect(container.textContent).toContain("Leave blank to keep the stored session.");
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(session, "synthetic-session");
    session?.dispatchEvent(new Event("input", { bubbles: true }));
  });
  expect(changed).toHaveBeenCalledWith({ museConsoleSession: "synthetic-session" });
});
