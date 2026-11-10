import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "./card";

export interface TokenSavingsItem {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  icon?: ReactNode;
}

/** A ranked comparison, not a task-completion progress indicator. */
export function TokenSavingsList({ items, maxValue }: {
  items: TokenSavingsItem[];
  maxValue: number;
}) {
  return <ul className="ci-token-savings" aria-label="Token savings by technique">
    {items.map(item => {
      const width = Number.isFinite(item.value) && Number.isFinite(maxValue) && maxValue > 0
        ? Math.max(0, Math.min(100, item.value / maxValue * 100)) : 0;
      return <li key={item.id} className="ci-token-savings__item">
        <span className="ci-token-savings__icon" aria-hidden="true">{item.icon ?? <Sparkles />}</span>
        <div className="ci-token-savings__body">
          <div className="ci-token-savings__label"><span>{item.label}</span><strong>{item.formattedValue}<span> tokens</span></strong></div>
          <div className="ci-token-savings__track" role="img" aria-label={`${item.label}: ${item.formattedValue} tokens saved`}>
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
  icon: ReactNode;
}

function ClientGuideLinks({ integrations, compact = false }: { integrations: QuickStartIntegration[]; compact?: boolean }) {
  return <nav className="ci-client-quick-start__integrations" data-layout={compact ? "compact" : "cards"} aria-label="Client setup guides">
      {integrations.map(integration => <a key={integration.id} href={integration.href} className="ci-client-quick-start__integration">
        <span className="ci-client-quick-start__brand" aria-hidden="true">{integration.icon}</span>
        <span className="ci-client-quick-start__name">{integration.name}</span>
        <span className="ci-client-quick-start__description">{integration.description}</span>
        <ArrowUpRight className="ci-client-quick-start__arrow" aria-hidden="true" />
      </a>)}
    </nav>;
}

function ClientConnection({ credentials }: { credentials: ReactNode }) {
  return <div className="ci-client-quick-start__connection">
      <p className="ci-client-quick-start__eyebrow">Connection details</p>
      <div className="ci-client-quick-start__credentials">{credentials}</div>
    </div>;
}

/** Links open application-owned guides; credentials and copy actions stay app-owned. */
export function ClientQuickStart({ integrations, credentials, actions }: {
  integrations: QuickStartIntegration[];
  credentials: ReactNode;
  actions?: ReactNode;
}) {
  return <div className="ci-client-quick-start">
    <ClientGuideLinks integrations={integrations} />
    <ClientConnection credentials={credentials} />
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
}

/** Shared rows align card headers, visual content, details rules, and actions.
 * Stacked cards size their own sections independently below the desktop breakpoint.
 */
export function OverviewPanels({ showOptimization = true, clientLayout = "cards", optimizationHeader, optimizationContent, optimizationSummary, clientHeader, clientIntegrations, clientCredentials, clientActions }: OverviewPanelsProps) {
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
        <ClientGuideLinks integrations={clientIntegrations} compact={clientLayout === "compact"} />
      </div></div>
      <div className="ci-overview-panels__details"><ClientConnection credentials={clientCredentials} /></div>
      <div className="ci-overview-panels__actions"><div className="ci-client-quick-start__actions">{clientActions}</div></div>
    </Card>
  </div>;
}
