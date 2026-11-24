import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CodexAccountActions from "@/app/(dashboard)/dashboard/providers/[id]/components/CodexAccountActions";
import type { ConnectionRowProps } from "@/app/(dashboard)/dashboard/providers/[id]/components/connectionRowTypes";
afterEach(cleanup);
describe("Codex account actions menu", () => {
  it("keeps named actions behind three dots and preserves account callbacks", () => {
    const onEdit = vi.fn(),
      onDelete = vi.fn();
    render(
      <CodexAccountActions
        {...({
          connection: { id: "account", isActive: true },
          onEdit,
          onDelete,
          onRetest: vi.fn(),
          onToggleActive: vi.fn(),
        } as unknown as ConnectionRowProps)}
      />
    );
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("dialog", { name: "Actions" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onEdit).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledOnce();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
  });
});
