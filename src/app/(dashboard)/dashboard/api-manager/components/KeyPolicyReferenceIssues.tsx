"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import {
  removeReferenceTarget,
  canRemoveReferenceIssue,
  referenceIssueKey,
} from "../keyTemplateReferenceIssues";
import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyReferenceIssues() {
  const { t, activeTab, tabIssueMap, updateState, formState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2" data-testid={`reference-issues-${activeTab}`}>
      {tabIssueMap[activeTab].map((issue) => (
        <div
          key={referenceIssueKey(issue)}
          role="alert"
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border text-xs ${issue.blocking ? "bg-error/10 border-error/30 text-error" : "bg-warning/10 border-warning/30 text-warning"}`}
        >
          <div className="flex items-start gap-2">
            <Icon name={issue.blocking ? "error" : "warning"} size={16} />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">
                {t(
                  issue.blocking
                    ? "templateBlockingReferenceIssue"
                    : "templateNonBlockingReferenceIssue"
                )}{" "}
                ({issue.code})
              </span>
              <span>{issue.message}</span>
              <span className="font-mono text-[10px]">{issue.path}</span>
              {!canRemoveReferenceIssue(issue) && (
                <span>{t("templateReferenceReloadRequired")}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {issue.path.startsWith("key.allowedConnections") &&
              formState.selectedConnections.length <= 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    updateState((previous) => ({
                      ...previous,
                      allowAllConnections: true,
                      selectedConnections: [],
                    }))
                  }
                >
                  {t("allConnections")}
                </Button>
              )}
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!canRemoveReferenceIssue(issue) || issue.code === "INVALID_FIELD"}
              onClick={() => updateState((previous) => removeReferenceTarget(previous, issue))}
            >
              {t("templateRemoveStaleRef")}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
