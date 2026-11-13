// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: PoolWizard } =
  await import("../../../../src/app/(dashboard)/dashboard/costs/quota-share/components/PoolWizard");

type WizardProps = React.ComponentProps<typeof PoolWizard>;

const mockFetch = vi.fn();

function response(status: number, body: unknown) {
  return { ok: status < 400, status, json: async () => body };
}

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockImplementation(async (url: string, init?: RequestInit) => {
    if (url === "/api/quota/pools" && init?.method === "POST") {
      return response(200, { pool: { id: "pool-new" } });
    }
    return response(200, {});
  });
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function props(overrides: Partial<WizardProps> = {}): WizardProps {
  return {
    open: true,
    onClose: vi.fn(),
    onSaved: vi.fn(),
    connections: [{ id: "conn-1", provider: "openai", name: "primary" }],
    apiKeys: [{ id: "key-1", name: "Key one" }],
    plans: {},
    existingPoolConnectionIds: new Set<string>(),
    groups: [{ id: "group-1", name: "Group one", createdAt: "2026-01-01" }],
    selectedGroupId: "group-1",
    ...overrides,
  };
}

const nextButton = (name = "wizardNext") => screen.getByRole("button", { name });
const requestsTo = (method: string) =>
  mockFetch.mock.calls.filter(([, init]) => (init as RequestInit | undefined)?.method === method);

function currentStep() {
  return document.querySelector('.ci-wizard__steps [aria-current="step"]')?.textContent ?? "";
}

function pickConnection() {
  fireEvent.click(screen.getByRole("checkbox"));
}

function goToKeysStep() {
  pickConnection();
  fireEvent.click(nextButton());
  fireEvent.click(nextButton());
  expect(currentStep()).toContain("wizardStep3Label");
}

describe("PoolWizard on the kit Wizard", () => {
  it("renders the kit Wizard with one entry per step and the step copy as its heading", () => {
    render(<PoolWizard {...props()} />);

    expect(document.querySelector(".ci-wizard")).not.toBeNull();
    const items = Array.from(document.querySelectorAll(".ci-wizard__steps li")).map(
      (item) => item.textContent
    );
    expect(items).toHaveLength(3);
    expect(items[0]).toContain("wizardStep1Label");
    expect(items[1]).toContain("wizardStep2Label");
    expect(items[2]).toContain("wizardStep3Label");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("wizardStep1Title");
    expect(screen.getByText("wizardStep1Subtitle")).toBeTruthy();
    expect(screen.getByText("1 / 3")).toBeTruthy();
  });

  it("keeps Next blocked until a connection is chosen and has no Back on the first step", () => {
    render(<PoolWizard {...props()} />);

    expect(screen.queryByRole("button", { name: "wizardBack" })).toBeNull();
    expect(nextButton().getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(nextButton());
    expect(currentStep()).toContain("wizardStep1Label");

    pickConnection();
    expect(nextButton().getAttribute("aria-disabled")).toBeNull();
    fireEvent.click(nextButton());
    expect(currentStep()).toContain("wizardStep2Label");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("wizardStep2Title");
  });

  it("walks back through the steps and keeps what was entered", () => {
    render(<PoolWizard {...props()} />);
    goToKeysStep();

    fireEvent.click(screen.getByRole("button", { name: "wizardBack" }));
    expect(currentStep()).toContain("wizardStep2Label");
    fireEvent.click(screen.getByRole("button", { name: "wizardBack" }));
    expect(currentStep()).toContain("wizardStep1Label");
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });

  it("creates the pool from the last step with POST then PATCH, then saves and closes", async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();
    render(<PoolWizard {...props({ onSaved, onClose })} />);
    goToKeysStep();

    fireEvent.click(nextButton("wizardCreatePool"));

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(onSaved).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls.map(([url]) => url)).toEqual([
      "/api/quota/pools",
      "/api/quota/pools/pool-new",
    ]);
    expect(requestsTo("POST")).toHaveLength(1);
    expect(JSON.parse(requestsTo("PATCH")[0][1].body)).toEqual({
      allocations: [],
      exclusive: false,
    });
  });

  it("keeps the wizard open and shows the failure next to the actions", async () => {
    const onClose = vi.fn();
    mockFetch.mockImplementation(async () =>
      response(500, { error: { message: "pool create failed" } })
    );
    render(<PoolWizard {...props({ onClose })} />);
    goToKeysStep();

    fireEvent.click(nextButton("wizardCreatePool"));

    const alert = await screen.findByRole("alert");
    expect(alert.closest(".ci-wizard__footer")).not.toBeNull();
    expect(alert.textContent).toContain("pool create failed");
    expect(onClose).not.toHaveBeenCalled();
    expect(nextButton("wizardCreatePool").hasAttribute("disabled")).toBe(false);
  });

  it("disables the actions while saving", async () => {
    let finish: (value: unknown) => void = () => {};
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        })
    );
    render(<PoolWizard {...props()} />);
    goToKeysStep();

    fireEvent.click(nextButton("wizardCreatePool"));

    await waitFor(() =>
      expect(
        (
          document.querySelector(
            "[data-wizard-blocked], .ci-wizard__actions .ci-button:last-child"
          ) as HTMLButtonElement
        ).disabled
      ).toBe(true)
    );
    expect((screen.getByRole("button", { name: "wizardBack" }) as HTMLButtonElement).disabled).toBe(
      true
    );
    await act(async () => finish(response(500, {})));
  });

  it("edits with a single PATCH and blocks saving above 100%", async () => {
    const onSaved = vi.fn();
    const base = props({ open: false, onSaved });
    const pool = {
      id: "pool-1",
      name: "Existing",
      connectionId: "conn-1",
      connectionIds: ["conn-1"],
      groupId: "group-1",
      allocations: [
        { apiKeyId: "key-1", weight: 80, policy: "hard" },
        { apiKeyId: "key-2", weight: 40, policy: "hard" },
      ],
    } as unknown as WizardProps["editPool"];
    const { rerender } = render(<PoolWizard {...base} />);
    rerender(
      <PoolWizard
        {...base}
        open
        editPool={pool}
        apiKeys={[
          { id: "key-1", name: "Key one" },
          { id: "key-2", name: "Key two" },
        ]}
      />
    );

    fireEvent.click(nextButton());
    fireEvent.click(nextButton());

    const save = nextButton("saveChanges");
    expect(save.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(save);
    expect(mockFetch).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "equalSplit" }));
    expect(nextButton("saveChanges").getAttribute("aria-disabled")).toBeNull();
    fireEvent.click(nextButton("saveChanges"));

    await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe("/api/quota/pools/pool-1");
    expect(requestsTo("PATCH")).toHaveLength(1);
  });
});
