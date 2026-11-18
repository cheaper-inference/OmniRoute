"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Button } from "./button";

export interface IntegrationResource {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  content: ReactNode;
  actions?: { label: string; href: string }[];
}
export interface IntegrationResourcesProps {
  resources: IntegrationResource[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Follow-up help belongs after setup; no measured savings or connection state is inferred. */
export function IntegrationResources({ resources, value, defaultValue = "", onValueChange }: IntegrationResourcesProps) {
  const headingId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const open = value ?? internal;
  return <section id="after-setup" className="ci-integration-resources" aria-labelledby={headingId}>
    <header><h3 id={headingId}>After setup</h3><p>Check your connection or learn how to reduce repeat-request costs.</p></header>
    <Accordion variant="bordered" value={open} onValueChange={next => { const id = typeof next === "string" ? next : ""; setInternal(id); onValueChange?.(id); }}>
      {resources.map(resource => <AccordionItem key={resource.id} value={resource.id} id={resource.id}>
        <AccordionTrigger><span className="ci-integration-resources__summary">
          {resource.icon && <span className="ci-integration-resources__icon" aria-hidden="true">{resource.icon}</span>}
          <span><strong>{resource.title}</strong><span>{resource.description}</span></span>
        </span></AccordionTrigger>
        <AccordionContent>{open === resource.id ? <div className="ci-integration-resources__body">
          {resource.content}
          {resource.actions?.length ? <div className="ci-integration-resources__actions">{resource.actions.map(action => <Button key={action.href} variant="outline" size="sm" asChild><a href={action.href}>{action.label}<ArrowUpRight aria-hidden="true" /></a></Button>)}</div> : null}
        </div> : null}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </section>;
}
