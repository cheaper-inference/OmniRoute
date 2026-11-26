import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "./card";
import { resolveLabels } from "./lib/labels";

export interface TokenSavingsItem {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  icon?: ReactNode;
}

/** Interface text of TokenSavingsList. */
export interface TokenSavingsListLabels {
  /** Accessible name of the list. */
  list: string;
  /** Unit shown after each formatted value. */
  unit: string;
  /** Accessible name of a bar, from the item's `label` and `formattedValue`. */
  saved: (label: string, formattedValue: string) => string;
}
export const defaultTokenSavingsListLabels: TokenSavingsListLabels = {
  list: "Token savings by technique",
  unit: "tokens",
  saved: (label, formattedValue) => `${label}: ${formattedValue} tokens saved`,
};

/** A ranked comparison, not a task-completion progress indicator. */
export function TokenSavingsList({ items, maxValue, labels: labelOverrides }: {
  items: TokenSavingsItem[];
  maxValue: number;
  /** Localized interface text; missing or `undefined` keys fall back to defaultTokenSavingsListLabels. */
  labels?: Partial<TokenSavingsListLabels>;
}) {
  const labels = resolveLabels(defaultTokenSavingsListLabels, labelOverrides);
  return <ul className="ci-token-savings" aria-label={labels.list}>
    {items.map(item => {
      const width = Number.isFinite(item.value) && Number.isFinite(maxValue) && maxValue > 0
        ? Math.max(0, Math.min(100, item.value / maxValue * 100)) : 0;
      return <li key={item.id} className="ci-token-savings__item">
        <span className="ci-token-savings__icon" aria-hidden="true">{item.icon ?? <Sparkles />}</span>
        <div className="ci-token-savings__body">
          <div className="ci-token-savings__label"><span>{item.label}</span><strong>{item.formattedValue}<span> {labels.unit}</span></strong></div>
          <div className="ci-token-savings__track" role="img" aria-label={labels.saved(item.label, item.formattedValue)}>
            <span style={{ width: `${width}%` }} />
          </div>
        </div>
      </li>;
    })}
  </ul>;
}

export interface QuickStartIntegration {
  id: string;
  name: string;
  description: string;
  href: string;
  /** Link browsing context; defaults to the current tab. */
  target?: "_self" | "_blank";
  icon: ReactNode;
}

/** Interface text shared by ClientQuickStart and the client card of OverviewPanels. */
export interface ClientQuickStartLabels {
  /** Accessible name of the guide links. */
  guides: string;
  /** Eyebrow above the credentials. */
  connection: string;
}
export const defaultClientQuickStartLabels: ClientQuickStartLabels = {
  guides: "Client setup guides",
  connection: "Connection details",
};

function ClientGuideLinks({ integrations, compact = false, label }: { integrations: QuickStartIntegration[]; compact?: boolean; label: string }) {
  return <nav className="ci-client-quick-start__integrations" data-layout={compact ? "compact" : "cards"} aria-label={label}>
      {integrations.map(integration => <a key={integration.id} href={integration.href} target={integration.target} rel={integration.target === "_blank" ? "noopener noreferrer" : undefined} className="ci-client-quick-start__integration">
        <span className="ci-client-quick-start__brand" aria-hidden="true">{integration.icon}</span>
        <span className="ci-client-quick-start__name">{integration.name}</span>
        <span className="ci-client-quick-start__description">{integration.description}</span>
        <ArrowUpRight className="ci-client-quick-start__arrow" aria-hidden="true" />
      </a>)}
    </nav>;
}

function ClientConnection({ credentials, label }: { credentials: ReactNode; label: string }) {
  return <div className="ci-client-quick-start__connection">
      <p className="ci-client-quick-start__eyebrow">{label}</p>
      <div className="ci-client-quick-start__credentials">{credentials}</div>
    </div>;
}

/** Links open application-owned guides; credentials and copy actions stay app-owned. */
export function ClientQuickStart({ integrations, credentials, actions, labels: labelOverrides }: {
  integrations: QuickStartIntegration[];
  credentials: ReactNode;
  actions?: ReactNode;
  /** Localized interface text; missing or `undefined` keys fall back to defaultClientQuickStartLabels. */
  labels?: Partial<ClientQuickStartLabels>;
}) {
  const labels = resolveLabels(defaultClientQuickStartLabels, labelOverrides);
  return <div className="ci-client-quick-start">
    <ClientGuideLinks integrations={integrations} label={labels.guides} />
    <ClientConnection credentials={credentials} label={labels.connection} />
    {actions && <div className="ci-client-quick-start__actions">{actions}</div>}
  </div>;
}

export interface OverviewPanelsProps {
  /** Hide the optimization card when the application has no recorded usage. */
  showOptimization?: boolean;
  /** Compact links and side-by-side credentials in the full-width desktop card. */
  clientLayout?: "cards" | "compact";
  optimizationHeader: ReactNode;
  optimizationContent: ReactNode;
  optimizationSummary?: ReactNode;
  clientHeader: ReactNode;
  clientIntegrations: QuickStartIntegration[];
  clientCredentials: ReactNode;
  clientActions?: ReactNode;
  /** Localized text of the client card; missing or `undefined` keys fall back to defaultClientQuickStartLabels. */
  clientLabels?: Partial<ClientQuickStartLabels>;
}

/** Shared rows align card headers, visual content, details rules, and actions.
 * Stacked cards size their own sections independently below the desktop breakpoint.
 */
export function OverviewPanels({ showOptimization = true, clientLayout = "cards", optimizationHeader, optimizationContent, optimizationSummary, clientHeader, clientIntegrations, clientCredentials, clientActions, clientLabels }: OverviewPanelsProps) {
  const labels = resolveLabels(defaultClientQuickStartLabels, clientLabels);
  return <div className="ci-overview-panels" data-layout={showOptimization ? "paired" : "single"} data-client-layout={clientLayout}>
    {showOptimization && <Card flush className="ci-overview-panels__card">
      <div className="ci-overview-panels__header">{optimizationHeader}</div>
      <div className="ci-overview-panels__body">{optimizationContent}</div>
      <div className="ci-overview-panels__details">{optimizationSummary && <div className="ci-overview-panels__summary">{optimizationSummary}</div>}</div>
      <div className="ci-overview-panels__actions" />
    </Card>}
    <Card flush className="ci-overview-panels__card ci-overview-panels__client">
      <div className="ci-overview-panels__header">{clientHeader}</div>
      <div className="ci-overview-panels__body"><div className="ci-client-quick-start ci-overview-panels__guides">
        <ClientGuideLinks integrations={clientIntegrations} compact={clientLayout === "compact"} label={labels.guides} />
      </div></div>
      <div className="ci-overview-panels__details"><ClientConnection credentials={clientCredentials} label={labels.connection} /></div>
      <div className="ci-overview-panels__actions"><div className="ci-client-quick-start__actions">{clientActions}</div></div>
    </Card>
  </div>;
}
