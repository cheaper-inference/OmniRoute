import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";

it("flushes manual React roots without an unsupported act environment warning", async () => {
  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
  try {
    await act(async () => root.render(<Counter />));
    const button = container.querySelector("button");
    expect(button?.textContent).toBe("0");
    await act(async () => button?.click());
    expect(button?.textContent).toBe("1");
    await act(async () => root.unmount());
    expect(errors.mock.calls.map((args) => args.join(" ")).join("\n")).not.toContain(
      "testing environment is not configured to support act"
    );
  } finally {
    await act(async () => root.unmount());
    container.remove();
    errors.mockRestore();
  }
});
