import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import TokenLimitSettings from "@/app/(dashboard)/dashboard/api-manager/components/TokenLimitSettings";

const limit = {
  id: "limit-1",
  apiKeyId: "key-1",
  scopeType: "global",
  scopeValue: "",
  tokenLimit: 2000000,
  tokensUsed: 500000,
  remaining: 1500000,
  resetInterval: "monthly",
  resetTime: "00:00",
  enabled: true,
  periodStartAt: Date.UTC(2026, 9, 1),
  nextResetAt: Date.UTC(2026, 10, 1),
};
let records: (typeof limit)[];
let failLoad: boolean;
let failSave: boolean;
let mutations: Record<string, unknown>[];

beforeEach(() => {
  records = [{ ...limit }];
  failLoad = false;
  failSave = false;
  mutations = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        const body = JSON.parse(String(init.body));
        mutations.push(body);
        if (failSave)
          return Response.json({ error: { message: "Quota conflict" } }, { status: 409 });
        records = [{ ...limit, ...body }];
        return Response.json({ success: true, limit: records[0] });
      }
      if (init?.method === "DELETE") {
        records = [];
        return Response.json({ success: true });
      }
      if (failLoad) return Response.json({ error: { message: "Access denied" } }, { status: 403 });
      return Response.json({ apiKeyId: "key-1", limits: records });
    })
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("per-key token quota dashboard", () => {
  it("displays limits created through the API with exact consumption and remaining credit", async () => {
    render(<TokenLimitSettings apiKeyId="key-1" />);
    expect(await screen.findByText("1,500,000")).toBeTruthy();
    expect(screen.getByText("500,000")).toBeTruthy();
    expect(screen.getByText("2,000,000")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("25");
  });

  it("creates a fixed two-million-token credit using the same management API", async () => {
    records = [];
    render(<TokenLimitSettings apiKeyId="key-1" />);
    fireEvent.click(await screen.findByRole("button", { name: "Add token limit" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Token allowance" }), {
      target: { value: "2000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save token limit" }));
    await waitFor(() => expect(mutations.length).toBe(1));
    expect(mutations[0]).toMatchObject({
      apiKeyId: "key-1",
      scopeType: "global",
      tokenLimit: 2000000,
      resetInterval: "never",
      enabled: true,
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("edits the existing ID without losing scope or interval", async () => {
    records = [{ ...limit, scopeType: "model", scopeValue: "gpt-4o" }];
    render(<TokenLimitSettings apiKeyId="key-1" />);
    fireEvent.click(await screen.findByRole("button", { name: "Edit token limit" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Token allowance" }), {
      target: { value: "3000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save token limit" }));
    await waitFor(() =>
      expect(mutations[0]).toMatchObject({
        id: "limit-1",
        apiKeyId: "key-1",
        scopeType: "model",
        scopeValue: "gpt-4o",
        resetInterval: "monthly",
        tokenLimit: 3000000,
      })
    );
  });

  it("refreshes remaining credit without changing the allowance", async () => {
    render(<TokenLimitSettings apiKeyId="key-1" />);
    await screen.findByText("1,500,000");
    records = [{ ...limit, tokensUsed: 2000000, remaining: 0 }];
    fireEvent.click(screen.getByRole("button", { name: "Refresh usage" }));
    expect(await screen.findByText("Exhausted")).toBeTruthy();
    expect(screen.getByText("0")).toBeTruthy();
    expect(mutations).toEqual([]);
  });

  it("does not send a fractional allowance to the API", async () => {
    render(<TokenLimitSettings apiKeyId="key-1" />);
    fireEvent.click(await screen.findByRole("button", { name: "Add token limit" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Token allowance" }), {
      target: { value: "1.5" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Save token limit" }).closest("form")!);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(mutations).toEqual([]);
  });

  it("keeps the draft and displays structured server errors on failed save", async () => {
    failSave = true;
    render(<TokenLimitSettings apiKeyId="key-1" />);
    fireEvent.click(await screen.findByRole("button", { name: "Edit token limit" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Token allowance" }), {
      target: { value: "3000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save token limit" }));
    expect(await screen.findByText("Quota conflict")).toBeTruthy();
    expect(
      (screen.getByRole("spinbutton", { name: "Token allowance" }) as HTMLInputElement).value
    ).toBe("3000000");
  });

  it("shows a load error instead of claiming there are no limits", async () => {
    failLoad = true;
    render(<TokenLimitSettings apiKeyId="key-1" />);
    expect(await screen.findByText("Access denied")).toBeTruthy();
    expect(screen.queryByText("No token limits configured.")).toBeNull();
    expect(screen.queryByRole("button", { name: "Add token limit" })).toBeNull();
  });

  it("deletes only after explicit confirmation", async () => {
    render(<TokenLimitSettings apiKeyId="key-1" />);
    fireEvent.click(await screen.findByRole("button", { name: "Delete token limit" }));
    expect(records.length).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "Confirm deletion" }));
    expect(await screen.findByText("No token limits configured.")).toBeTruthy();
  });
});
