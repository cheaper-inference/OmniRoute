"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { Alert } from "@omniroute/ui-kit/alert";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { type AccessEditorTab } from "../[id]/access/useApiKeyAccessForm";
import TabErrorList from "../[id]/access/tabs/TabErrorList";

import type { KeyPolicySixTabEditorProps } from "./keyPolicyEditorTypes";
export type { KeyPolicySixTabEditorProps } from "./keyPolicyEditorTypes";
import { useKeyPolicyEditorModel } from "./useKeyPolicyEditorModel";
import { KeyPolicyEditorContext, useKeyPolicyEditor } from "./KeyPolicyEditorContext";
import KeyPolicyReferenceIssues from "./KeyPolicyReferenceIssues";
import KeyPolicyGeneralTab from "./KeyPolicyGeneralTab";
import KeyPolicyModelsTab from "./KeyPolicyModelsTab";
import KeyPolicyCombosTab from "./KeyPolicyCombosTab";
import KeyPolicyConnectionsTab from "./KeyPolicyConnectionsTab";
import KeyPolicyLimitsTab from "./KeyPolicyLimitsTab";
import KeyPolicyBehaviourTab from "./KeyPolicyBehaviourTab";

const TABS: Array<{ id: AccessEditorTab; icon: string; labelKey: string }> = [
  { id: "general", icon: "tune", labelKey: "tabGeneral" },
  { id: "models", icon: "psychology", labelKey: "tabModels" },
  { id: "combos", icon: "hub", labelKey: "tabCombos" },
  { id: "connections", icon: "cable", labelKey: "tabConnections" },
  { id: "limits", icon: "speed", labelKey: "tabLimits" },
  { id: "behaviour", icon: "toggle_on", labelKey: "tabBehaviour" },
];

const TAB_COMPONENTS = {
  general: KeyPolicyGeneralTab,
  models: KeyPolicyModelsTab,
  combos: KeyPolicyCombosTab,
  connections: KeyPolicyConnectionsTab,
  limits: KeyPolicyLimitsTab,
  behaviour: KeyPolicyBehaviourTab,
};

export default function KeyPolicySixTabEditor(props: KeyPolicySixTabEditorProps) {
  const model = useKeyPolicyEditorModel(props);
  const {
    t,
    activeTab,
    setActiveTab,
    activeIssues,
    tabErrors,
    hasBlockingReferenceIssues,
    disabled,
  } = model;
  const ActiveTab = TAB_COMPONENTS[activeTab];
  return (
    <KeyPolicyEditorContext.Provider value={model}>
      <div className="flex flex-col gap-4" data-testid="key-policy-six-tab-editor">
        {activeIssues.length > 0 && (
          <Alert
            variant={hasBlockingReferenceIssues ? "critical" : "warning"}
            icon={<Icon name={hasBlockingReferenceIssues ? "error" : "warning"} />}
            title={
              hasBlockingReferenceIssues
                ? t("templateStaleReferencesBlockingTitle")
                : t("templateStaleReferencesWarningTitle")
            }
            description={
              hasBlockingReferenceIssues
                ? t("templateStaleReferencesBlockingDesc")
                : t("templateStaleReferencesWarningDesc")
            }
          />
        )}

        <Tabs
          variant="underline"
          value={activeTab}
          onValueChange={(next) => setActiveTab(next as AccessEditorTab)}
          className="flex flex-col gap-4"
        >
          <PolicyTabList />

          <TabsContent
            value={activeTab}
            id={`policy-panel-${activeTab}`}
            aria-labelledby={`policy-tab-${activeTab}`}
            className="focus:outline-none"
          >
            <Card className="p-4 sm:p-5">
              <fieldset
                disabled={disabled}
                className="m-0 min-w-0 border-0 p-0 flex flex-col gap-4"
              >
                <KeyPolicyReferenceIssues />
                <TabErrorList errors={tabErrors[activeTab]} />

                <ActiveTab />
              </fieldset>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {model.confirmDialog}
    </KeyPolicyEditorContext.Provider>
  );
}

function PolicyTabList() {
  const { t, tabErrors, tabIssueMap } = useKeyPolicyEditor();
  return (
    <TabsList aria-label={t("accessEditorTabsLabel")}>
      {TABS.map((tabDef) => {
        const errCount =
          (tabErrors[tabDef.id]?.length ?? 0) +
          (tabIssueMap[tabDef.id]?.filter((i) => i.blocking).length ?? 0);
        const warnCount = tabIssueMap[tabDef.id]?.filter((i) => !i.blocking).length ?? 0;
        return (
          <TabsTrigger
            key={tabDef.id}
            value={tabDef.id}
            id={`policy-tab-${tabDef.id}`}
            aria-controls={`policy-panel-${tabDef.id}`}
            icon={<Icon name={tabDef.icon} size={16} />}
            className="whitespace-nowrap"
          >
            <span>{t(tabDef.labelKey)}</span>
            {errCount > 0 && (
              <span
                className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-error text-bg"
                title={t("errorBadgeLabel", { count: errCount })}
              >
                {errCount}
              </span>
            )}
            {errCount === 0 && warnCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-warning text-bg">
                {warnCount}
              </span>
            )}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
