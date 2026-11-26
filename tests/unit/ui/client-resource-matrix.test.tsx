import { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import ClientResourceMatrix from "@/app/(dashboard)/dashboard/cli-code/manage/ClientResourceMatrix";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: { name?: string; client?: string }) =>
    [key, values?.name, values?.client].filter(Boolean).join(" "),
}));

it("imports a local skill and then sends an assignment to the selected application", async () => {
  const previous = globalThis.IS_REACT_ACT_ENVIRONMENT;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const calls: Record<string, unknown>[] = [];
  let managed = false;
  let enabled = false;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_path: string, options?: RequestInit) => {
      if (options?.body) {
        const payload = JSON.parse(String(options.body));
        calls.push(payload);
        if (payload.action === "import") managed = true;
        if (payload.action === "enable") enabled = true;
      }
      return {
        ok: true,
        json: async () => ({
          items: [
            {
              id: "local-skill",
              name: "fixture",
              managed,
              clients: { codex: { enabled, canEnable: managed && !enabled, canDisable: enabled } },
            },
          ],
          ...(options?.body ? { results: [{ id: "local-skill", ok: true }] } : {}),
        }),
      };
    })
  );

  const button = (label: string) =>
    [...container.querySelectorAll("button")].find((element) => element.textContent === label)!;
  const checkbox = (label: string) =>
    container.querySelector<HTMLInputElement>(`input[aria-label="${label}"]`)!;
  try {
    await act(async () =>
      root.render(<ClientResourceMatrix resource="skills" clients={{ codex: "Codex" }} />)
    );
    expect(checkbox("assignmentLabel fixture Codex").disabled).toBe(true);
    await act(async () => button("reviewImport").click());
    await act(async () => checkbox("selectNamedEntry fixture").click());
    await act(async () => button("importSelected").click());
    expect(checkbox("assignmentLabel fixture Codex").disabled).toBe(false);
    await act(async () => checkbox("assignmentLabel fixture Codex").click());
    expect(checkbox("assignmentLabel fixture Codex").checked).toBe(true);
    expect(calls).toEqual([
      { action: "import", ids: ["local-skill"] },
      { action: "enable", ids: ["local-skill"], client: "codex" },
    ]);
  } finally {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    globalThis.IS_REACT_ACT_ENVIRONMENT = previous;
  }
});
