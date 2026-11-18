"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import ProviderConnectionPermissionList from "./ProviderConnectionPermissionList";
import PreferredConnectionsSection from "./PreferredConnectionsSection";

import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyConnectionsTab() {
  const { formState, updateState, allConnections } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      <ConnectionAccessMode />

      <PreferredConnectionsSection
        connections={allConnections}
        allowAllConnections={formState.allowAllConnections}
        selectedConnections={formState.selectedConnections}
        preferredConnections={formState.selectedPreferredConnections}
        onTogglePreferred={(connId) =>
          updateState((p) => ({
            ...p,
            selectedPreferredConnections: p.selectedPreferredConnections.includes(connId)
              ? p.selectedPreferredConnections.filter((id) => id !== connId)
              : [...p.selectedPreferredConnections, connId],
          }))
        }
        onMovePreferred={(connId, dir) =>
          updateState((p) => {
            const list = [...p.selectedPreferredConnections];
            const idx = list.indexOf(connId);
            const target = idx + dir;
            if (idx < 0 || target < 0 || target >= list.length) return p;
            [list[idx], list[target]] = [list[target], list[idx]];
            return { ...p, selectedPreferredConnections: list };
          })
        }
        onClearPreferred={() => updateState((p) => ({ ...p, selectedPreferredConnections: [] }))}
      />
    </div>
  );
}

function SelectedConnectionChips() {
  const { t, formState, updateState, allConnections } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 pt-2">
      {formState.selectedConnections.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {formState.selectedConnections.map((connId) => {
            const conn = allConnections.find((c) => c.id === connId);
            return (
              <span
                key={connId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
              >
                {conn?.name ? `${conn.name} (${connId.slice(0, 8)})` : connId}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-4 w-4 p-0 text-text-muted hover:text-error"
                  onClick={() =>
                    updateState((p) => ({
                      ...p,
                      selectedConnections: p.selectedConnections.filter((id) => id !== connId),
                      selectedPreferredConnections: p.selectedPreferredConnections.filter(
                        (id) => id !== connId
                      ),
                    }))
                  }
                  aria-label={t("removeSelection", { name: connId })}
                >
                  <Icon name="close" size={12} />
                </Button>
              </span>
            );
          })}
        </div>
      )}
      <ProviderConnectionPermissionList
        connections={allConnections}
        selectedConnections={formState.selectedConnections}
        onSelectionChange={(nextConns) =>
          updateState((p) => ({
            ...p,
            selectedConnections: nextConns,
            selectedPreferredConnections: p.selectedPreferredConnections.filter((id) =>
              nextConns.includes(id)
            ),
          }))
        }
      />
    </div>
  );
}

function ConnectionAccessMode() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("allowedConnections")}</p>
          <p className="text-xs text-text-muted">
            {formState.allowAllConnections
              ? t("allConnectionsDesc")
              : formState.selectedConnections.length === 0
                ? t("selectAtLeastOneConnection")
                : t("restrictedToConnections", {
                    count: formState.selectedConnections.length,
                  })}
          </p>
        </div>
        <div className="flex gap-1 p-0.5 bg-surface rounded-md">
          <Button
            type="button"
            size="sm"
            variant={formState.allowAllConnections ? "primary" : "ghost"}
            aria-pressed={formState.allowAllConnections}
            onClick={() =>
              updateState((p) => ({
                ...p,
                allowAllConnections: true,
                selectedConnections: [],
              }))
            }
            className="text-xs"
          >
            {t("allConnections")}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={!formState.allowAllConnections ? "primary" : "ghost"}
            aria-pressed={!formState.allowAllConnections}
            onClick={() => updateState((p) => ({ ...p, allowAllConnections: false }))}
            className="text-xs"
          >
            {t("onlySelectedConnections")}
          </Button>
        </div>
      </div>

      {!formState.allowAllConnections && <SelectedConnectionChips />}
    </div>
  );
}
