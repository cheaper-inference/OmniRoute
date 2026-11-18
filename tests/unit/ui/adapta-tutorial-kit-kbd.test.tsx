// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { AdaptaTutorialModal } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/components/AdaptaTutorialModal");

afterEach(() => cleanup());

describe("AdaptaTutorialModal shortcuts", () => {
  it("draws the devtools shortcuts as kit keys, the combination as one group", () => {
    render(<AdaptaTutorialModal isOpen onClose={vi.fn()} />);
    const keys = Array.from(document.body.querySelectorAll('[data-slot="kbd"]'));
    expect(keys.map((key) => key.textContent)).toEqual(["F12", "Cmd", "Option", "I"]);
    const group = document.body.querySelector('[data-slot="kbd-group"]')!;
    expect(group.textContent).toBe("Cmd+Option+I");
  });
});
