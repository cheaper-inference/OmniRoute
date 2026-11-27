// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const barrel = await import("@/shared/components");
const kit = await import("@omniroute/ui-kit/inline-code");

afterEach(() => cleanup());

// Kit `inline-code`: the chip for a model id, an environment variable, a flag or a path inside
// text, in place of `<code className="rounded bg-… px-1 font-mono text-xs">` on each screen.
describe("InlineCode re-export → kit InlineCode", () => {
  it("is the kit component, available from the shared components barrel", () => {
    expect(barrel.InlineCode).toBe(kit.InlineCode);
  });

  it("renders a <code> chip that takes layout classes and native attributes", () => {
    const { InlineCode } = barrel;
    render(
      <p>
        Set{" "}
        <InlineCode className="break-all" title="Environment variable">
          OMNIROUTE_API_KEY
        </InlineCode>{" "}
        first.
      </p>
    );
    const code = screen.getByText("OMNIROUTE_API_KEY");
    expect(code.tagName).toBe("CODE");
    expect(code.getAttribute("data-slot")).toBe("inline-code");
    expect(code.className).toContain("ci-inline-code");
    expect(code.className).toContain("break-all");
    expect(code.getAttribute("title")).toBe("Environment variable");
  });
});
