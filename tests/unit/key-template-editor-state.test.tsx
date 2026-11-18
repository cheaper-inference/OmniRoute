// @vitest-environment jsdom
import { useState } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { TemplateReferenceIssue } from "@/shared/types/keyTemplates";

const { requestConfirm, translate } = vi.hoisted(() => ({
  requestConfirm: vi.fn(),
  translate: (key: string) => key,
}));
vi.mock("next-intl", () => ({ useTranslations: () => translate }));
vi.mock("@/shared/hooks/useConfirmDialog", () => ({
  useConfirmDialog: () => ({ requestConfirm, confirmDialog: null }),
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm", () => ({
  withClaudeCodeDefaultModel: (models: unknown[]) => models,
}));

import { useKeyPolicyEditorModel } from "@/app/(dashboard)/dashboard/api-manager/components/useKeyPolicyEditorModel";
import { createDefaultClientKeyTemplatePolicy } from "@/app/(dashboard)/dashboard/api-manager/keyTemplatePolicyUtils";
import { removeReferenceTarget } from "@/app/(dashboard)/dashboard/api-manager/keyTemplateReferenceIssues";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function catalogs() {
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async (url: string) =>
        new Response(
          JSON.stringify(
            url === "/api/keys/groups"
              ? { groups: [{ id: "inactive", name: "Inactive", isActive: false }] }
              : { data: [], combos: [], connections: [], pools: [], items: [] }
          ),
          { status: 200 }
        )
    )
  );
}

describe("policy editing state", () => {
  it("keeps the final quota restriction until explicitly confirmed, including stale-reference removal", async () => {
    catalogs();
    const initial = createDefaultClientKeyTemplatePolicy();
    initial.key.allowedQuotas = ["stale"];
    const { result } = renderHook(() => {
      const [policy, setPolicy] = useState(initial);
      return useKeyPolicyEditorModel({ policy, onChange: (next) => setPolicy(next) });
    });
    await waitFor(() =>
      expect(
        result.current.activeIssues.some((issue) => issue.code === "QUOTA_POOL_NOT_FOUND")
      ).toBe(true)
    );
    const issue = result.current.activeIssues.find(
      (issue) => issue.code === "QUOTA_POOL_NOT_FOUND"
    )!;
    requestConfirm.mockResolvedValueOnce(false);
    await act(() => result.current.updateState((state) => removeReferenceTarget(state, issue)));
    expect(result.current.formState.allowedQuotas).toEqual(["stale"]);
    requestConfirm.mockResolvedValueOnce(true);
    await act(() => result.current.updateState((state) => removeReferenceTarget(state, issue)));
    expect(result.current.formState.allowedQuotas).toEqual([]);
    expect(requestConfirm).toHaveBeenCalledTimes(2);
    expect(requestConfirm.mock.calls[0][0].message).toBe("templateRemoveLastQuotaConfirm");
  });

  it("recovers from server field validation on edit and retains inactive-group warnings", async () => {
    catalogs();
    const initial = createDefaultClientKeyTemplatePolicy();
    initial.related.groupIds = ["inactive"];
    const issues: TemplateReferenceIssue[] = [
      {
        path: "key.maxSessions",
        code: "INVALID_FIELD",
        message: "Invalid sessions",
        blocking: true,
      },
    ];
    const { result } = renderHook(() => {
      const [policy, setPolicy] = useState(initial);
      return useKeyPolicyEditorModel({
        policy,
        onChange: (next) => setPolicy(next),
        serverReferenceIssues: issues,
      });
    });
    await waitFor(() =>
      expect(result.current.activeIssues.some((issue) => issue.code === "GROUP_INACTIVE")).toBe(
        true
      )
    );
    expect(result.current.hasBlockingReferenceIssues).toBe(true);
    await act(() => result.current.updateState((state) => ({ ...state, maxSessions: 2 })));
    expect(result.current.hasBlockingReferenceIssues).toBe(false);
    expect(result.current.activeIssues.map((issue) => issue.code)).toEqual(["GROUP_INACTIVE"]);
    expect(result.current.formState.groupIds).toEqual(["inactive"]);
  });
  it("preserves a fractional five-hour budget while another policy setting is edited", async () => {
    catalogs();
    const initial = createDefaultClientKeyTemplatePolicy();
    initial.key.fiveHourUsageLimitUsd = 0.125;
    const { result } = renderHook(() => {
      const [policy, setPolicy] = useState(initial);
      return {
        policy,
        editor: useKeyPolicyEditorModel({ policy, onChange: (next) => setPolicy(next) }),
      };
    });
    expect(result.current.editor.formState.fiveHourUsageLimitUsd).toBe("0.125");
    await act(() => result.current.editor.updateState((state) => ({ ...state, maxSessions: 2 })));
    expect(result.current.policy.key.fiveHourUsageLimitUsd).toBe(0.125);
    expect(result.current.policy.key.maxSessions).toBe(2);
  });
});
