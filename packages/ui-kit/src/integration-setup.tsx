"use client";

import { useId, useState } from "react";
import type { ReactNode, MouseEventHandler } from "react";
import { Copy, ExternalLink, FileText, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { Accordion } from "./accordion";
import { Input } from "./input";
import { Label } from "./label";
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

export interface IntegrationSetupProps {
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
}

/** Reusable onboarding pattern. No requests, secrets, or provider logic live here. */
export function IntegrationSetup({ name, description, steps, assistants, assistantOptions, assistantFeedback, toolHandoff, onCopyPrompt, onCopyDocs, markdownHref, llmsHref, details }: IntegrationSetupProps) {
  const titleId = useId();
  const instanceId = useId();
  const [assistantMenuOpen, setAssistantMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function copy(kind: "prompt" | "docs") {
    setPending(true);
    setStatus("");
    try {
      await (kind === "prompt" ? onCopyPrompt() : onCopyDocs());
      setStatus(kind === "prompt" ? "Setup prompt copied. Paste it into your agent." : "Docs copied as Markdown.");
    } catch {
      setStatus("Could not copy. Open the Markdown guide to copy it manually.");
    } finally {
      setPending(false);
    }
  }
  return <section className="ci-integration-setup" aria-labelledby={titleId}>
    <div className="ci-integration-setup__ai">
      <div>
        <h3 id={titleId}><Sparkles aria-hidden="true" />Set up with AI</h3>
        <p>Let your agent connect {name} for you.</p>
      </div>
      <div className="ci-integration-setup__actions">
        {toolHandoff?.action && !toolHandoff.instance && <Button asChild><a href={toolHandoff.action.href} target={toolHandoff.action.target ?? "_self"} rel="noopener noreferrer" onClick={toolHandoff.action.onClick}><ArrowUpRight aria-hidden="true" />{toolHandoff.action.label}</a></Button>}
        <Button type="button" variant={toolHandoff?.action && !toolHandoff.instance ? "outline" : "default"} disabled={pending} onClick={() => void copy("prompt")}><Copy aria-hidden="true" />Copy setup prompt</Button>
        <DropdownMenu open={assistantMenuOpen} onOpenChange={setAssistantMenuOpen}>
          <DropdownMenuTrigger asChild><Button type="button" variant="outline"><Sparkles aria-hidden="true" />Ask AI</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" scrollable>
            <DropdownMenuLabel>Ask AI</DropdownMenuLabel>
            {assistants.map(assistant => <DropdownMenuItem key={assistant.name} asChild><a href={assistant.href} target={assistant.target ?? "_blank"} rel="noopener noreferrer" onClick={event => { assistant.onClick?.(event); setAssistantMenuOpen(false); }} aria-description={assistant.description}>Ask {assistant.name}<ExternalLink aria-hidden="true" /></a></DropdownMenuItem>)}
            {assistantOptions && <><DropdownMenuSeparator />{assistantOptions}</>}
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Copy />} disabled={pending} onSelect={() => void copy("prompt")}>Copy prompt for any agent</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />} disabled={pending} onSelect={() => void copy("docs")}>Copy docs as Markdown</DropdownMenuItem>
            <DropdownMenuItem asChild><a href={markdownHref} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />View Markdown guide</a></DropdownMenuItem>
            <DropdownMenuItem asChild><a href={llmsHref} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />View llms.txt</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {toolHandoff && <div className="ci-integration-setup__tool">
        <p>{toolHandoff.instruction} <a href={toolHandoff.sourceHref} target="_blank" rel="noopener noreferrer">Tool documentation<ExternalLink aria-hidden="true" /></a></p>
        {toolHandoff.instance && <div className="ci-integration-setup__instance">
          <Label htmlFor={instanceId}>{toolHandoff.instance.label}</Label>
          <div className="ci-integration-setup__instance-actions">
            <Input id={instanceId} type="url" value={toolHandoff.instance.value} placeholder={toolHandoff.instance.placeholder} onChange={event => toolHandoff.instance?.onChange(event.target.value)} error={!!toolHandoff.instance.error} aria-invalid={!!toolHandoff.instance.error} aria-describedby={toolHandoff.instance.error ? `${instanceId}-error` : `${instanceId}-help`} autoComplete="off" spellCheck={false} />
            {toolHandoff.action ? <Button asChild><a href={toolHandoff.action.href} target={toolHandoff.action.target ?? "_blank"} rel="noopener noreferrer" onClick={toolHandoff.action.onClick}>{toolHandoff.action.label}<ArrowUpRight aria-hidden="true" /></a></Button> : <Button type="button" disabled>Open in {name}<ArrowUpRight aria-hidden="true" /></Button>}
          </div>
          <p id={`${instanceId}-help`}>Use the app’s base address, including any subpath. This address stays in this page; no connection is made until you open the link.</p>
          {toolHandoff.instance.error && <p id={`${instanceId}-error`} role="alert">{toolHandoff.instance.error}</p>}
        </div>}
      </div>}
      <p className="ci-integration-setup__hint">{toolHandoff ? "Keep your API key local. Copy the prompt to use any other agent." : "Apps open when supported. Use the web fallback or copy the prompt for any agent. Keep your API key local."}</p>
      {assistantFeedback && <div className="ci-integration-setup__handoff">{assistantFeedback}</div>}
      <p className="ci-integration-setup__status" role="status">{status}</p>
    </div>
    <div className="ci-integration-setup__manual">
      <div className="ci-integration-setup__manual-heading"><h3>Or set up manually</h3><span>{steps.length} steps</span></div>
      <p>{description}</p>
      <ol className="ci-integration-setup__steps">
        {steps.map((step, index) => <li key={step.id}>
          <span className="ci-integration-setup__number" aria-hidden="true">{index + 1}</span>
          <div className="ci-integration-setup__step-body">
            <h4>{step.title}</h4>
            {step.description && <p>{step.description}</p>}
            {step.location && <div className="ci-integration-setup__location"><span>Where</span><div>{step.location}</div></div>}
            {step.instructions?.length ? <ul className="ci-integration-setup__instructions">{step.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}</ul> : null}
            {step.content}
            {step.after?.length ? <ul className="ci-integration-setup__instructions">{step.after.map((instruction, index) => <li key={index}>{instruction}</li>)}</ul> : null}
            {step.note && <p className="ci-integration-setup__note">{step.note}</p>}
            {step.action && <div><Button variant="outline" size="sm" asChild><a href={step.action.href}>{step.action.label}<ArrowUpRight aria-hidden="true" /></a></Button></div>}
          </div>
        </li>)}
      </ol>
    </div>
    {details && <Accordion value={detailsOpen ? "details" : ""} onValueChange={value => setDetailsOpen(value === "details")} items={[{ value: "details", label: "Full guide & troubleshooting", content: detailsOpen ? details : null }]} />}
  </section>;
}
