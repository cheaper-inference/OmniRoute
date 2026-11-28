"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Braces, Layers, MessageSquareText, PanelTop } from "lucide-react";
import { Button } from "./button";
import { KeakMark } from "./keak-brand";
import { cn } from "./lib/utils";

type FeatureActionVisual = "existing-tool" | "app-api";

function ConnectionIllustration({ visual, toolIcons }: { visual: FeatureActionVisual; toolIcons?: readonly ReactNode[] }) {
  const isTool = visual === "existing-tool";
  const showToolIcons = isTool && Boolean(toolIcons?.length);
  return (
    <span className="ci-feature-flow" aria-hidden="true" dir="ltr">
      <span className="ci-feature-flow__endpoint">
        <span className={cn("ci-feature-flow__node", showToolIcons && "ci-feature-flow__node--tools")}>
          {showToolIcons ? toolIcons : isTool ? <MessageSquareText /> : <Braces />}
        </span>
        {isTool ? "Your tool" : "Your app"}
      </span>
      <span className="ci-feature-flow__track"><span className="ci-feature-flow__packet" /></span>
      <span className="ci-feature-flow__endpoint">
        <span className="ci-feature-flow__node ci-feature-flow__node--gateway"><KeakMark /></span>
        Cheaper Inference
      </span>
      <span className="ci-feature-flow__track ci-feature-flow__track--downstream"><span className="ci-feature-flow__packet" /></span>
      <span className="ci-feature-flow__endpoint">
        <span className="ci-feature-flow__node"><Layers /></span>
        AI models
      </span>
    </span>
  );
}

export interface FeatureActionCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "title"> {
  title: string;
  description: string;
  visual: FeatureActionVisual;
  /** Decorative tool marks for the existing-tool illustration. */
  toolIcons?: readonly ReactNode[];
}

/** An illustrated button for setup paths that open immediately when chosen. */
export function FeatureActionCard({ title, description, visual, toolIcons, className, type = "button", ...props }: FeatureActionCardProps) {
  const Icon = visual === "existing-tool" ? MessageSquareText : PanelTop;
  return (
    <Button {...props} type={type} variant="outline" className={cn("ci-feature-action-card", className)}>
      <ConnectionIllustration visual={visual} toolIcons={toolIcons} />
      <span className="ci-feature-action-card__heading">
        <span className="ci-feature-action-card__icon" aria-hidden="true"><Icon /></span>
        <span>{title}</span>
        <ArrowRight className="ci-feature-action-card__arrow" aria-hidden="true" />
      </span>
      <span className="ci-feature-action-card__description">{description}</span>
    </Button>
  );
}
