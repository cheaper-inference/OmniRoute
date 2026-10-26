import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface ModelIdentityProps extends ComponentProps<"span"> {
  name: ReactNode;
  /** Provider name used to generate the temporary logo mark. */
  provider?: string;
  /** Replace the temporary mark with the final provider or model logo. */
  logo?: ReactNode;
}

export function ModelIdentity({ className, name, provider, logo, ...props }: ModelIdentityProps) {
  const placeholder = provider?.trim().charAt(0).toUpperCase() || "M";

  return (
    <span className={cn("ci-model-identity", className)} {...props}>
      <span className="ci-model-identity__mark" aria-hidden="true">
        {logo ?? placeholder}
      </span>
      <strong className="ci-model-identity__name">{name}</strong>
    </span>
  );
}
