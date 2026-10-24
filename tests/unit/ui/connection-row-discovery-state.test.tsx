// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import ConnectionRow, {
  type ConnectionRowProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

// A failed model discovery used to leave no trace on the provider page: the
// next read looked healthy. The connection row now shows the outcome of the
// last discovery — the state, the cause and how long ago it happened — without
// any click and without saying anything about the model list itself.

const noop = () => {};

function buildProps(overrides: Partial<ConnectionRowProps> = {}): ConnectionRowProps {
  return {
    connection: { id: "conn-1", isActive: true, priority: 1 },
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

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

function discoveryLabel(el: HTMLElement): HTMLElement | null {
  return el.querySelector<HTMLElement>('[data-testid="connection-discovery-state"]');
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}

describe("ConnectionRow discovery outcome", () => {
  it("shows the failed discovery, its cause and its age", () => {
    const el = render(
      <ConnectionRow
        {...buildProps({
          connection: {
            id: "conn-1",
            isActive: true,
            priority: 1,
            discoveryState: { status: "degraded", cause: "HTTP 500", at: hoursAgo(2) },
          },
        })}
      />
    );

    const label = discoveryLabel(el);
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain("Model discovery failed");
    expect(label?.textContent).toContain("2 hours ago");
    expect(label?.textContent).toContain("HTTP 500");
    expect(label?.getAttribute("title")).toContain("HTTP 500");
  });

  it("shows no label for a successful discovery", () => {
    const el = render(
      <ConnectionRow
        {...buildProps({
          connection: {
            id: "conn-1",
            isActive: true,
            priority: 1,
            discoveryState: { status: "healthy", cause: null, at: hoursAgo(2) },
          },
        })}
      />
    );

    expect(discoveryLabel(el)).toBeNull();
  });

  it("shows no label for a connection that was never refreshed", () => {
    const el = render(<ConnectionRow {...buildProps()} />);

    expect(discoveryLabel(el)).toBeNull();
  });

  it("tells two connections of one provider apart", () => {
    const el = render(
      <>
        <ConnectionRow
          {...buildProps({
            connection: {
              id: "conn-1",
              isActive: true,
              priority: 1,
              discoveryState: { status: "degraded", cause: "HTTP 500", at: hoursAgo(2) },
            },
          })}
        />
        <ConnectionRow
          {...buildProps({
            connection: {
              id: "conn-2",
              isActive: true,
              priority: 2,
              discoveryState: { status: "healthy", cause: null, at: hoursAgo(2) },
            },
          })}
        />
      </>
    );

    expect(el.querySelectorAll('[data-testid="connection-discovery-state"]')).toHaveLength(1);
  });

  it("never invents a cause when the state carries none", () => {
    const el = render(
      <ConnectionRow
        {...buildProps({
          connection: {
            id: "conn-1",
            isActive: true,
            priority: 1,
            discoveryState: { status: "degraded", cause: null, at: hoursAgo(2) },
          },
        })}
      />
    );

    const label = discoveryLabel(el);
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain("Model discovery failed");
    expect(label?.textContent).not.toContain("HTTP");
    expect(label?.querySelector("[data-testid='connection-discovery-cause']")).toBeNull();
  });
});
