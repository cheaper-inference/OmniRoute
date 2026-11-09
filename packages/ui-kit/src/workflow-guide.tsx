import type { ReactNode } from "react";
import { Card, CardContent, type CardProps } from "./card";
import { cn } from "./lib/utils";
import type { OverviewTone } from "./overview-card";

export interface WorkflowGuideItem {
  id: string;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
}
export interface WorkflowGuideProps extends Omit<CardProps, "children"> {
  label: string;
  items: WorkflowGuideItem[];
  tone?: OverviewTone;
}

/** A numbered orientation panel, not an interactive wizard stepper. */
export function WorkflowGuide({ label, items, tone = "accent", className, ...props }: WorkflowGuideProps) {
  return <Card {...props} className={cn("ci-workflow-guide", `ci-workflow-guide--${tone}`, className)}>
    <CardContent className="ci-workflow-guide__content">
      <ol aria-label={label} className="ci-workflow-guide__list">
        {items.map((item, index) => <li key={item.id}>
          {item.icon && <span className="ci-workflow-guide__icon" aria-hidden>{item.icon}</span>}
          <strong>{index + 1}. {item.title}</strong>
          <p>{item.description}</p>
        </li>)}
      </ol>
    </CardContent>
  </Card>;
}
