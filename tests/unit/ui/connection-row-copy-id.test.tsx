// @vitest-environment jsdom
import React, { act } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ConnectionRow, {
  type ConnectionRowProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";
import { ConnectionPinTip } from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionIdChip";

// The per-request account pin (`x-omniroute-connection`) already exists in the chat
// handler, but no dashboard surface exposed a connection's id. Each connection row now
// carries a copyable id chip, and the Connections section explains how to use it.

const CONNECTION_ID = "abcdef12-3456-7890-abcd-ef1234567890";
const noop = () => {};

function buildProps(overrides: Partial<ConnectionRowProps> = {}): ConnectionRowProps {
  return {
    connection: { id: CONNECTION_ID, isActive: true, priority: 1 },
    isOAuth: false,
    isFirst: false,
    isLast: false,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    ...overrides,
  } as ConnectionRowProps;
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(node: React.ReactElement) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(node));
  roots.push({ root, el });
  return el;
}

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
});

function findChip(el: HTMLElement): HTMLButtonElement {
  const chip = el.querySelector<HTMLButtonElement>('[data-testid="connection-id-chip"]');
  expect(chip).not.toBeNull();
  return chip as HTMLButtonElement;
}

describe("ConnectionRow connection-id chip", () => {
  it("shows the first 8 characters of the connection id", () => {
    const el = render(<ConnectionRow {...buildProps()} />);
    const chip = findChip(el);
    expect(chip.textContent).toContain("abcdef12…");
    expect(chip.textContent).not.toContain(CONNECTION_ID);
  });

  it("copies the FULL connection id and flips to the copied state", async () => {
    const el = render(<ConnectionRow {...buildProps()} />);
    const chip = findChip(el);
    await act(async () => {
      chip.click();
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(CONNECTION_ID);
    expect(findChip(el).textContent).toContain("Copied");
  });

  it("names the real pin header (x-omniroute-connection) in its tooltip", () => {
    const el = render(<ConnectionRow {...buildProps()} />);
    const chip = findChip(el);
    expect(chip.title).toContain("x-omniroute-connection");
    expect(chip.title).not.toContain("x-connection-id");
    expect(chip.getAttribute("aria-label")).toBe(chip.title);
  });

  it("renders no chip when the connection has no id", () => {
    const el = render(
      <ConnectionRow {...buildProps({ connection: { id: "", isActive: true, priority: 1 } })} />
    );
    expect(el.querySelector('[data-testid="connection-id-chip"]')).toBeNull();
  });
});

describe("ConnectionPinTip", () => {
  it("documents the x-omniroute-connection header and the copy chip", () => {
    const el = render(<ConnectionPinTip />);
    const text = el.textContent || "";
    expect(text).toContain("x-omniroute-connection");
    expect(text).not.toContain("x-connection-id");
  });
});

describe("chat pin header (regression guard)", () => {
  // The media playground cards send `x-connection-id: <providerId>` to the chat route.
  // Aliasing that header to the pin would force a non-existent connection and fail
  // every playground chat — the chat handler must read ONLY x-omniroute-connection.
  const chatSource = readFileSync(
    path.resolve(__dirname, "../../../src/sse/handlers/chat.ts"),
    "utf8"
  );

  it("reads the pin from exactly one x-omniroute-connection header lookup", () => {
    const reads = chatSource.match(/headers\.get\(\s*["']x-omniroute-connection["']\s*\)/g) || [];
    expect(reads).toHaveLength(1);
  });

  it("never reads x-connection-id", () => {
    expect(chatSource).not.toMatch(/["']x-connection-id["']/i);
  });
});
