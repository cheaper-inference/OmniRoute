"use client";

import { useId, useState } from "react";
import type { ReactNode, MouseEventHandler } from "react";
import { Copy, ExternalLink, FileText, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { Accordion } from "./accordion";
import { Input } from "./input";
import { Label } from "./label";
import { resolveLabels } from "./lib/labels";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

export interface IntegrationSetupStep {
  id: string;
  title: string;
  description?: ReactNode;
  content?: ReactNode;
  location?: ReactNode;
  instructions?: ReactNode[];
  after?: ReactNode[];
  note?: ReactNode;
  action?: { label: string; href: string };
}

/** Interface text of IntegrationSetup. Step, assistant and tool copy still come from the data props. */
export interface IntegrationSetupLabels {
  title: string;
  /** Intro under the title, from the integration `name`. */
  description: (name: string) => string;
  copyPrompt: string;
  /** Menu trigger and menu heading. */
  askAi: string;
  /** Menu item for one assistant, from its `name`. */
  askAssistant: (name: string) => string;
  copyPromptForAgent: string;
  copyDocs: string;
  viewMarkdown: string;
  viewLlms: string;
  toolDocumentation: string;
  /** Disabled open button shown until the instance address resolves to a link. */
  openIn: (name: string) => string;
  /** Help text under the instance address field. */
  instanceHelp: string;
  /** Hint shown with `toolHandoff`. */
  toolHint: string;
  /** Hint shown without `toolHandoff`. */
  hint: string;
  manualTitle: string;
  stepCount: (count: number) => string;
  /** Label before a step's `location`. */
  location: string;
  /** Accordion label of `details`. */
  details: string;
  /** Status messages after a copy action. */
  promptCopied: string;
  docsCopied: string;
  copyError: string;
}
export const defaultIntegrationSetupLabels: IntegrationSetupLabels = {
  title: "Set up with AI",
  description: (name) => `Let your agent connect ${name} for you.`,
  copyPrompt: "Copy setup prompt",
  askAi: "Ask AI",
  askAssistant: (name) => `Ask ${name}`,
  copyPromptForAgent: "Copy prompt for any agent",
  copyDocs: "Copy docs as Markdown",
  viewMarkdown: "View Markdown guide",
  viewLlms: "View llms.txt",
  toolDocumentation: "Tool documentation",
  openIn: (name) => `Open in ${name}`,
  instanceHelp: "Use the app’s base address, including any subpath. This address stays in this page; no connection is made until you open the link.",
  toolHint: "Keep your API key local. Copy the prompt to use any other agent.",
  hint: "Apps open when supported. Use the web fallback or copy the prompt for any agent. Keep your API key local.",
  manualTitle: "Or set up manually",
  stepCount: (count) => `${count} steps`,
  location: "Where",
  details: "Full guide & troubleshooting",
  promptCopied: "Setup prompt copied. Paste it into your agent.",
  docsCopied: "Docs copied as Markdown.",
  copyError: "Could not copy. Open the Markdown guide to copy it manually.",
};

export interface IntegrationSetupProps {
  /** Stack the AI introduction above its actions in narrow content columns. */
  layout?: "auto" | "stacked";
  name: string;
  description: string;
  steps: IntegrationSetupStep[];
  /** Application supplies public, credential-free URLs and clipboard content. */
  assistants: { name: string; href: string; target?: "_blank" | "_self"; description?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }[];
  /** Shared application launch preferences and native share actions. */
  assistantOptions?: ReactNode;
  /** Persistent handoff feedback and browser fallback supplied by the application. */
  assistantFeedback?: ReactNode;
  /** Tool-specific capability, with an optional instance address for self-hosted apps. */
  toolHandoff?: {
    instruction: string;
    sourceHref: string;
    action?: { label: string; href: string; target?: "_blank" | "_self"; onClick?: MouseEventHandler<HTMLAnchorElement> };
    instance?: { label: string; value: string; placeholder: string; onChange: (value: string) => void; error?: string };
  };
  onCopyPrompt: () => Promise<void>;
  onCopyDocs: () => Promise<void>;
  markdownHref: string;
  llmsHref: string;
  details?: ReactNode;
  /** Localized interface text; missing or `undefined` keys fall back to defaultIntegrationSetupLabels. */
  labels?: Partial<IntegrationSetupLabels>;
}

/** Reusable onboarding pattern. No requests, secrets, or provider logic live here. */
export function IntegrationSetup({ layout = "auto", name, description, steps, assistants, assistantOptions, assistantFeedback, toolHandoff, onCopyPrompt, onCopyDocs, markdownHref, llmsHref, details, labels: labelOverrides }: IntegrationSetupProps) {
  const labels = resolveLabels(defaultIntegrationSetupLabels, labelOverrides);
  const titleId = useId();
  const instanceId = useId();
  const [assistantMenuOpen, setAssistantMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  // The outcome, not its text: the status is read from the current labels on every render.
  const [copyOutcome, setCopyOutcome] = useState<"prompt" | "docs" | "error" | null>(null);
  const [pending, setPending] = useState(false);
  async function copy(kind: "prompt" | "docs") {
    setPending(true);
    setCopyOutcome(null);
    try {
      await (kind === "prompt" ? onCopyPrompt() : onCopyDocs());
      setCopyOutcome(kind);
    } catch {
      setCopyOutcome("error");
    } finally {
      setPending(false);
    }
  }
  const status = copyOutcome === "prompt" ? labels.promptCopied : copyOutcome === "docs" ? labels.docsCopied : copyOutcome === "error" ? labels.copyError : "";
  return <section className={`ci-integration-setup${layout === "stacked" ? " ci-integration-setup--stacked" : ""}`} aria-labelledby={titleId}>
    <div className="ci-integration-setup__ai">
      <div>
        <h3 id={titleId}><Sparkles aria-hidden="true" />{labels.title}</h3>
        <p>{labels.description(name)}</p>
      </div>
      <div className="ci-integration-setup__actions">
        {toolHandoff?.action && !toolHandoff.instance && <Button asChild><a href={toolHandoff.action.href} target={toolHandoff.action.target ?? "_self"} rel="noopener noreferrer" onClick={toolHandoff.action.onClick}><ArrowUpRight aria-hidden="true" />{toolHandoff.action.label}</a></Button>}
        <Button type="button" variant={toolHandoff?.action && !toolHandoff.instance ? "outline" : "default"} disabled={pending} onClick={() => void copy("prompt")}><Copy aria-hidden="true" />{labels.copyPrompt}</Button>
        <DropdownMenu open={assistantMenuOpen} onOpenChange={setAssistantMenuOpen}>
          <DropdownMenuTrigger asChild><Button type="button" variant="outline"><Sparkles aria-hidden="true" />{labels.askAi}</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" scrollable>
            <DropdownMenuLabel>{labels.askAi}</DropdownMenuLabel>
            {assistants.map(assistant => <DropdownMenuItem key={assistant.name} asChild><a href={assistant.href} target={assistant.target ?? "_blank"} rel="noopener noreferrer" onClick={event => { assistant.onClick?.(event); setAssistantMenuOpen(false); }} aria-description={assistant.description}>{labels.askAssistant(assistant.name)}<ExternalLink aria-hidden="true" /></a></DropdownMenuItem>)}
            {assistantOptions && <><DropdownMenuSeparator />{assistantOptions}</>}
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Copy />} disabled={pending} onSelect={() => void copy("prompt")}>{labels.copyPromptForAgent}</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />} disabled={pending} onSelect={() => void copy("docs")}>{labels.copyDocs}</DropdownMenuItem>
            <DropdownMenuItem asChild><a href={markdownHref} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />{labels.viewMarkdown}</a></DropdownMenuItem>
            <DropdownMenuItem asChild><a href={llmsHref} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />{labels.viewLlms}</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {toolHandoff && <div className="ci-integration-setup__tool">
        <p>{toolHandoff.instruction} <a href={toolHandoff.sourceHref} target="_blank" rel="noopener noreferrer">{labels.toolDocumentation}<ExternalLink aria-hidden="true" /></a></p>
        {toolHandoff.instance && <div className="ci-integration-setup__instance">
          <Label htmlFor={instanceId}>{toolHandoff.instance.label}</Label>
          <div className="ci-integration-setup__instance-actions">
            <Input id={instanceId} type="url" value={toolHandoff.instance.value} placeholder={toolHandoff.instance.placeholder} onChange={event => toolHandoff.instance?.onChange(event.target.value)} error={!!toolHandoff.instance.error} aria-invalid={!!toolHandoff.instance.error} aria-describedby={toolHandoff.instance.error ? `${instanceId}-error` : `${instanceId}-help`} autoComplete="off" spellCheck={false} />
            {toolHandoff.action ? <Button asChild><a href={toolHandoff.action.href} target={toolHandoff.action.target ?? "_blank"} rel="noopener noreferrer" onClick={toolHandoff.action.onClick}>{toolHandoff.action.label}<ArrowUpRight aria-hidden="true" /></a></Button> : <Button type="button" disabled>{labels.openIn(name)}<ArrowUpRight aria-hidden="true" /></Button>}
          </div>
          <p id={`${instanceId}-help`}>{labels.instanceHelp}</p>
          {toolHandoff.instance.error && <p id={`${instanceId}-error`} role="alert">{toolHandoff.instance.error}</p>}
        </div>}
      </div>}
      <p className="ci-integration-setup__hint">{toolHandoff ? labels.toolHint : labels.hint}</p>
      {assistantFeedback && <div className="ci-integration-setup__handoff">{assistantFeedback}</div>}
      <p className="ci-integration-setup__status" role="status">{status}</p>
    </div>
    {steps.length > 0 && <div className="ci-integration-setup__manual">
      <div className="ci-integration-setup__manual-heading"><h3>{labels.manualTitle}</h3><span>{labels.stepCount(steps.length)}</span></div>
      <p>{description}</p>
      <IntegrationSetupSteps steps={steps} labels={{ location: labels.location }} />
    </div>}
    {details && <Accordion value={detailsOpen ? "details" : ""} onValueChange={value => setDetailsOpen(value === "details")} items={[{ value: "details", label: labels.details, content: detailsOpen ? details : null }]} />}
  </section>;
}


export interface IntegrationSetupStepsProps {
  steps: IntegrationSetupStep[];
  /** Localized interface text of the steps; a missing or `undefined` key falls back to defaultIntegrationSetupLabels. */
  labels?: Partial<Pick<IntegrationSetupLabels, "location">>;
}

/** Numbered setup steps for custom flows. Render inside a ci-integration-setup container. */
export function IntegrationSetupSteps({ steps, labels: labelOverrides }: IntegrationSetupStepsProps) {
  const labels = resolveLabels({ location: defaultIntegrationSetupLabels.location }, labelOverrides);
  return <ol className="ci-integration-setup__steps">
        {steps.map((step, index) => <li key={step.id}>
          <span className="ci-integration-setup__number" aria-hidden="true">{index + 1}</span>
          <div className="ci-integration-setup__step-body">
            <h4>{step.title}</h4>
            {step.description && <p>{step.description}</p>}
            {step.location && <div className="ci-integration-setup__location"><span>{labels.location}</span><div>{step.location}</div></div>}
            {step.instructions?.length ? <ul className="ci-integration-setup__instructions">{step.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}</ul> : null}
            {step.content}
            {step.after?.length ? <ul className="ci-integration-setup__instructions">{step.after.map((instruction, index) => <li key={index}>{instruction}</li>)}</ul> : null}
            {step.note && <p className="ci-integration-setup__note">{step.note}</p>}
            {step.action && <div><Button variant="outline" size="sm" asChild><a href={step.action.href}>{step.action.label}<ArrowUpRight aria-hidden="true" /></a></Button></div>}
          </div>
        </li>)}
      </ol>;
}
