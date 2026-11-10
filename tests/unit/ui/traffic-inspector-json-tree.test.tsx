// @vitest-environment jsdom
//
// The Traffic Inspector reads bodies through the kit JsonTree. The body may hold live credentials,
// so the Mask toggle must keep every secret off the screen and out of every copy: values through
// the tree's redact hook, keys before the tree sees them (a masked node keeps its key).
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { InterceptedRequest } from "@/mitm/inspector/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { RequestBodyTab } =
  await import("@/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs/RequestBodyTab");
const { JsonViewer } =
  await import("@/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/JsonViewer");

const writeText = vi.fn();

beforeEach(() => {
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
});

afterEach(() => cleanup());

function requestWith(requestBody: string) {
  return { requestBody, requestSize: requestBody.length } as InterceptedRequest;
}

describe("RequestBodyTab secret masking on the kit JsonTree", () => {
  it("masks secret values on screen through the redact hook", () => {
    const { container } = render(
      <RequestBodyTab
        request={requestWith(
          JSON.stringify({ authorization: "Bearer abc.def", note: "plain", key: "sk-abc123" })
        )}
      />
    );

    expect(screen.getByRole("tree")).not.toBeNull();
    expect(container.textContent).not.toContain("abc.def");
    expect(container.textContent).not.toContain("sk-abc123");
    expect(container.textContent).toContain("plain");
    expect(container.querySelectorAll('[data-tone="redacted"]')).toHaveLength(2);
  });

  it("catches a secret the raw text hides behind a JSON escape", () => {
    const { container } = render(
      <RequestBodyTab request={requestWith('{"token":"sk\\u002dabc123"}')} />
    );

    expect(container.textContent).not.toContain("sk-abc123");
    expect(container.querySelector('[data-tone="redacted"]')?.textContent).toBe("••••");
  });

  it("masks a secret used as an object key, which the hook leaves on screen", () => {
    const { container } = render(
      <RequestBodyTab request={requestWith(JSON.stringify({ "sk-abc123": { nested: 1 } }))} />
    );

    expect(container.textContent).not.toContain("sk-abc123");
    expect(container.textContent).toContain("••••");
    expect(container.textContent).toContain("nested");
  });

  it("keeps masked secrets out of a copied ancestor, collapsed or not", async () => {
    const { container } = render(
      <RequestBodyTab
        request={requestWith(JSON.stringify({ a: { b: { c: "Bearer deep.secret", d: "safe" } } }))}
      />
    );

    expect(container.textContent).not.toContain("safe");
    fireEvent.click(container.querySelector('[data-action="copy-value"]') as HTMLElement);
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const copied = writeText.mock.calls[0][0] as string;
    expect(copied).not.toContain("deep.secret");
    expect(copied).toContain("safe");
    expect(copied).toContain("••••");
  });

  it("shows the real values once the secrets are unmasked, and masks the raw text", () => {
    const { container } = render(
      <RequestBodyTab request={requestWith(JSON.stringify({ key: "sk-abc123" }))} />
    );

    fireEvent.click(screen.getByRole("button", { name: "raw" }));
    expect(container.querySelector("pre")?.textContent).toBe('{"key":"••••"}');
    fireEvent.click(screen.getByRole("button", { name: "formatted" }));

    fireEvent.click(screen.getByRole("button", { name: "showSecrets" }));
    expect(container.textContent).toContain("sk-abc123");
    expect(container.querySelector('[data-tone="redacted"]')).toBeNull();
  });
});

describe("JsonViewer on the kit JsonTree", () => {
  it("opens two levels, like the tree it replaces, and folds a node on click", () => {
    const { container } = render(<JsonViewer data={{ a: { b: { c: "deep" } } }} />);

    const rows = () => screen.getAllByRole("treeitem");
    expect(rows()).toHaveLength(3);
    expect(container.textContent).not.toContain("deep");

    fireEvent.click(rows()[2].querySelector('[data-action="toggle"]') as HTMLElement);
    expect(container.textContent).toContain("deep");
  });

  it("takes its labels from i18n", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    const { container } = render(<JsonViewer data={{ a: 1 }} />);

    expect(screen.getByRole("button", { name: "expandAllLevels" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "collapseAllLevels" })).not.toBeNull();
    const copyValue = container.querySelector('[data-action="copy-value"]') as HTMLElement;
    expect(copyValue.getAttribute("aria-label")).toBe("copyTitle");

    fireEvent.click(copyValue);
    expect((await screen.findByRole("alert")).textContent).toBe("copy: failed");
  });

  it("shows a long string whole, as the tree it replaces did", () => {
    const text = "x".repeat(20_000);
    const { container } = render(<JsonViewer data={{ text }} />);

    expect(container.textContent).toContain(text);
  });

  it("copies a node's value and its path", async () => {
    const { container } = render(<JsonViewer data={{ model: "gpt" }} />);
    const row = screen.getAllByRole("treeitem")[1];

    fireEvent.mouseOver(row);
    fireEvent.click(row.querySelector('[data-action="copy-value"]') as HTMLElement);
    await waitFor(() => expect(writeText).toHaveBeenLastCalledWith("gpt"));
    fireEvent.click(row.querySelector('[data-action="copy-path"]') as HTMLElement);
    await waitFor(() => expect(writeText).toHaveBeenLastCalledWith("$.model"));
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });
});
