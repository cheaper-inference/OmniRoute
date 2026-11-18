/**
 * #17393 — the Combo Control Center's "Configured targets" card must show the
 * configured MODEL and the pinned ACCOUNT in full.
 *
 * Before the fix the row rendered `target.label` as its headline. The combo
 * builder stores the ACCOUNT label in `label` (buildPrecisionComboModelStep),
 * so the row showed "user@example.com" where the model belonged, and the
 * account itself was cut to `shortId(connectionId)` ("abc1234…").
 */
import { describe, it, vi } from "vitest";
import assert from "node:assert/strict";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (key === "accountShort") return `account ${String(values?.id ?? "")}`;
    if (key === "dynamic") return "dynamic";
    return key;
  },
}));

import { TargetConfiguredRow } from "@/app/(dashboard)/dashboard/combos/ComboControlCenterClient";
import { getComboControlCenterTargets } from "@/lib/combos/controlCenter";

function buildTarget(
  options: { label?: string | null; connectionLabels?: Record<string, string> } = {}
) {
  const label = options.label === undefined ? "user@example.com" : options.label;
  const targets = getComboControlCenterTargets(
    {
      name: "coding-fast",
      models: [
        {
          id: "openai-main",
          kind: "model",
          providerId: "openai",
          model: "gpt-5-codex",
          connectionId: "conn-1234567890",
          weight: 0,
          ...(label ? { label } : {}),
        },
      ],
    },
    null,
    options.connectionLabels
  );
  return targets[0];
}

describe("ComboControlCenter configured targets", () => {
  it("shows the configured model instead of the account label", () => {
    render(<TargetConfiguredRow target={buildTarget()} />);

    assert.ok(
      screen.getByText("openai/gpt-5-codex"),
      "the configured model must be the headline of a configured target"
    );
    assert.equal(
      screen.queryByText("user@example.com"),
      null,
      "the account label must not take the place of the model"
    );
  });

  it("shows the pinned account in full, not a truncated connection id", () => {
    const { container } = render(<TargetConfiguredRow target={buildTarget()} />);

    const text = container.textContent || "";
    assert.ok(
      text.includes("account user@example.com"),
      `the account must be rendered in full, got: ${text}`
    );
    assert.equal(
      text.includes("conn-1234…"),
      false,
      "the connection id must not be truncated into the account slot"
    );
  });

  it("prefers the resolved connection display name over the stored step label", () => {
    const { container } = render(
      <TargetConfiguredRow
        target={buildTarget({ connectionLabels: { "conn-1234567890": "renamed@example.com" } })}
      />
    );

    const text = container.textContent || "";
    assert.ok(
      text.includes("account renamed@example.com"),
      `the resolved account name must win over the stale step label, got: ${text}`
    );
  });

  it("falls back to the full connection id when no account name is known", () => {
    const target = buildTarget({ label: null });
    const { container } = render(<TargetConfiguredRow target={target} />);

    const text = container.textContent || "";
    assert.ok(
      text.includes("account conn-1234567890"),
      `the untruncated connection id must be the last resort, got: ${text}`
    );
  });
});
