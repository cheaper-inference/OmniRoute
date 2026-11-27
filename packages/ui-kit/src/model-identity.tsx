import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type ModelIdentitySize = "sm" | "md" | "lg";

export interface ModelIdentityProps extends ComponentProps<"span"> {
  name: ReactNode;
  /** Provider name used to generate the temporary logo mark. */
  provider?: string;
  /** Replace the temporary mark with the final provider or model logo. */
  logo?: ReactNode;
  /** Mark size: `sm` 20px for dense rows, `md` 24px (default), `lg` 32px for card headers. */
  size?: ModelIdentitySize;
  /** Second line under the name, such as a description or a status. Truncated like the name. */
  description?: ReactNode;
}

export function ModelIdentity({ className, name, provider, logo, size = "md", description, ...props }: ModelIdentityProps) {
  const placeholder = provider?.trim().charAt(0).toUpperCase() || "M";
  const title = <strong className="ci-model-identity__name">{name}</strong>;
  const described = description !== undefined && description !== null && description !== false && description !== "";

  return (
    <span className={cn("ci-model-identity", className)} data-size={size === "md" ? undefined : size} {...props}>
      <span className="ci-model-identity__mark" aria-hidden="true">
        {logo ?? placeholder}
      </span>
      {described ? (
        <span className="ci-model-identity__text">
          {title}
          <span className="ci-model-identity__description">{description}</span>
        </span>
      ) : title}
    </span>
  );
}
