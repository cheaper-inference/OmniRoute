import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { BadgeTone } from "./badge";
import { cn } from "./lib/utils";

/** The `Badge` tones: the frame, the dot and the state text take the tone's ink. */
export type FlowNodeStatus = BadgeTone;
export type FlowNodeSize = "sm" | "md";

export interface FlowNodeProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Main line: the name of the step, provider or agent. One line, ellipsized. */
  title: ReactNode;
  /** Secondary line under the title (a model id, a source). One line, ellipsized. */
  description?: ReactNode;
  /** Decorative leading mark: an icon or a logo. */
  icon?: ReactNode;
  /** Trailing slot on the title row (Badge, count, check mark). */
  meta?: ReactNode;
  /** Tone of the frame and of the state line. Pass `statusLabel` with it: a tone alone only colours the frame. */
  status?: FlowNodeStatus;
  /** The state as text ("Running", "Failed"), beside a dot in the status tone. The kit has no default text. */
  statusLabel?: ReactNode;
  /** The node is on the path in use now: a thicker frame in the status tone, or the active edge colour, and a halo. */
  active?: boolean;
  /** The node is the user's selection: a ring around the frame. */
  selected?: boolean;
  /** `md` (default) sets the title at 14px; `sm` sets it at 12px with tighter padding, for dense canvases. */
  size?: FlowNodeSize;
}

/**
 * The frame of a node on a flow canvas: title, secondary line, state and body. Presentation only:
 * it has no role, no tab stop and no position, and it draws no connector. The canvas library, the
 * handles and the layout belong to the host, which names the node and wires the interaction.
 */
export const FlowNode = forwardRef<HTMLDivElement, FlowNodeProps>(function FlowNode(
  { title, description, icon, meta, status, statusLabel, active = false, selected = false, size = "md", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      data-slot="flow-node"
      data-size={size}
      data-status={status}
      data-active={active ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      className={cn("ci-flow-node", className)}
    >
      <div className="ci-flow-node__header">
        {icon != null && <span className="ci-flow-node__icon" aria-hidden="true">{icon}</span>}
        <div className="ci-flow-node__heading">
          <div className="ci-flow-node__title">{title}</div>
          {description != null && <div className="ci-flow-node__description">{description}</div>}
        </div>
        {meta != null && <div className="ci-flow-node__meta">{meta}</div>}
      </div>
      {statusLabel != null && (
        <div className="ci-flow-node__status">
          <span className="ci-flow-node__status-dot" aria-hidden="true" />
          {statusLabel}
        </div>
      )}
      {children != null && <div className="ci-flow-node__body">{children}</div>}
    </div>
  );
});
