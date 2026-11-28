// @vitest-environment jsdom

import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiManagerPageClient from "@/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient";

const fetchMock = vi.fn<typeof fetch>();
const createRequests = () =>
  fetchMock.mock.calls.filter(([url, init]) => url === "/api/keys" && init?.method === "POST");

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (url, init) =>
    Response.json(url === "/api/keys" && init?.method === "POST" ? { key: "omni_test_key" } : {})
  );
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function openCreateDialog() {
  render(<ApiManagerPageClient />);
  fireEvent.click(await screen.findByRole("button", { name: "Create Your First Key" }));
  const dialog = within(screen.getByRole("dialog", { name: "Create API Key" }));
  return {
    dialog,
    name: dialog.getByRole<HTMLInputElement>("textbox", { name: "Key Name" }),
    create: dialog.getByRole<HTMLButtonElement>("button", { name: "Create API Key" }),
  };
}

describe("API key creation name validation (KEA-9789)", () => {
  it.each([
    [
      "a 600-character name",
      "n".repeat(600),
      "Key Name can have at most 200 characters (currently 600)",
    ],
    [
      "unsupported characters",
      '<script>"é💥',
      "Key name can only contain letters, numbers, spaces, hyphens, and underscores",
    ],
  ])("shows an inline error and blocks creation for %s", async (_case, value, error) => {
    const { dialog, name, create } = await openCreateDialog();

    fireEvent.change(name, { target: { value } });

    expect.soft(dialog.queryByRole("alert")?.textContent).toBe(error);
    expect.soft(name.getAttribute("aria-invalid")).toBe("true");
    expect.soft(name.getAttribute("maxlength")).toBeNull();
    expect(name.value).toBe(value);
    expect(create.disabled).toBe(true);
    fireEvent.click(create);
    expect(createRequests()).toHaveLength(0);
  });

  it("submits the full 200-character name including an accented letter", async () => {
    const { dialog, name, create } = await openCreateDialog();
    const atLimit = `${"n".repeat(199)}é`;

    fireEvent.change(name, { target: { value: atLimit } });

    expect(dialog.queryByRole("alert")).toBeNull();
    expect(create.disabled).toBe(false);
    fireEvent.click(create);
    await screen.findByText("Key created successfully!");

    expect(createRequests()).toHaveLength(1);
    expect(JSON.parse(String(createRequests()[0][1]?.body))).toMatchObject({ name: atLimit });
  });
});
