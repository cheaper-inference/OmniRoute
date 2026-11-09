"use client";

import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./lib/utils";
import { KeakMark, ProductIcon, type KeakProduct } from "./keak-brand";

export interface SignalNode {
  id: string; x: number; y: number; label: string; detail?: string;
  width?: number; mark?: boolean; state?: "active" | "muted" | "blocked";
  product?: KeakProduct; icon?: ReactNode; interactive?: boolean;
  actionLabel?: string;
  /** Explicit selection/toggle state; null omits it for one-shot actions. */
  pressed?: boolean | null;
}
export interface SignalEdge { id: string; from: string; to: string; active?: boolean; bend?: number; }
export interface SignalDiagramProps extends HTMLAttributes<HTMLDivElement> {
  label: string; description: string; nodes: SignalNode[]; edges: SignalEdge[];
  width?: number; height?: number; paused?: boolean;
  onNodeSelect?: (id: string) => void;
  /** Changing this value replays the signal without changing the selected route. */
  pulse?: number;
}

/** HTML nodes stay readable and keyboard-operable above responsive SVG signal paths. */
export function SignalDiagram({ label, description, nodes, edges, width = 600, height = 300, paused = false, onNodeSelect, pulse = 0, className, style, "aria-describedby": describedBy, ...props }: SignalDiagramProps) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => { element.dataset.motion = visible && !document.hidden && !media.matches && !paused && document.documentElement.dataset.keakMotion !== "paused" ? "running" : "paused"; };
    sync();
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (observer) observer.observe(element); else { visible = true; sync(); }
    document.addEventListener("visibilitychange", sync);
    document.addEventListener("keak-motion-change", sync);
    media.addEventListener("change", sync);
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", sync); document.removeEventListener("keak-motion-change", sync); media.removeEventListener("change", sync); };
  }, [paused]);
  const byId = new Map(nodes.map(node => [node.id, node]));
  return <div ref={root} className={cn("ci-signal-diagram", className)} data-motion="paused"
    role={onNodeSelect ? "group" : undefined} aria-label={onNodeSelect ? label : undefined}
    aria-describedby={[onNodeSelect ? `${id}-description` : undefined, describedBy].filter(Boolean).join(" ") || undefined}
    style={{ aspectRatio: `${width} / ${height}`, ...style }} {...props}>
    <svg className="ci-signal-paths" viewBox={`0 0 ${width} ${height}`} role={onNodeSelect ? undefined : "img"}
      aria-hidden={onNodeSelect ? true : undefined} aria-labelledby={onNodeSelect ? undefined : `${id}-title ${id}-svg-description`}>
      <title id={`${id}-title`}>{label}</title><desc id={`${id}-svg-description`}>{description}</desc>
      <g fill="none">{edges.map((edge, i) => {
        const from = byId.get(edge.from), to = byId.get(edge.to);
        if (!from || !to) return null;
        const bend = edge.bend ?? (to.x - from.x) * .5;
        const d = `M${from.x} ${from.y} C${from.x + bend} ${from.y} ${to.x - bend} ${to.y} ${to.x} ${to.y}`;
        return <g key={edge.id} data-active={edge.active || undefined} className="ci-signal-edge">
          <path d={d} className="ci-signal-edge-track" />
          {edge.active && <><path d={d} className="ci-signal-edge-glow" /><path d={d} className="ci-signal-edge-active" />
            <path key={`packet-${pulse}`} d={d} pathLength="100" className="ci-signal-packet" style={{ animationDelay: `${i * -.7}s` }} />
            <path key={`trail-${pulse}`} d={d} pathLength="100" className="ci-signal-packet ci-signal-packet-trail" style={{ animationDelay: `${i * -.7 - 1.75}s` }} /></>}
        </g>;
      })}</g>
    </svg>
    {nodes.map(node => {
      const symbol = node.mark || (node.product && !node.detail);
      const nodeStyle = { left: `${node.x / width * 100}%`, top: `${node.y / height * 100}%`, width: `${(node.width ?? (symbol ? 72 : 136)) / width * 100}%` };
      const content = <><span className="ci-signal-node-content" aria-hidden="true">
        {node.mark ? <KeakMark /> : node.product ? <ProductIcon product={node.product} /> : node.icon}
        {!symbol && <span><span className="ci-signal-node-label">{node.label}</span>{node.detail && <span className="ci-signal-node-detail">{node.detail}</span>}</span>}
      </span>{node.state === "blocked" && <span className="ci-signal-blocked" aria-hidden="true">×</span>}</>;
      const attributes = { className: "ci-signal-node", style: nodeStyle, "data-state": node.state, "data-symbol": symbol || undefined, "data-product": node.product, "data-has-icon": node.icon ? true : undefined };
      return onNodeSelect && node.interactive !== false ? <button key={node.id} type="button" {...attributes}
        aria-label={node.actionLabel ?? `Select ${node.label}`} aria-pressed={node.pressed === null ? undefined : node.pressed ?? (node.state === undefined ? undefined : node.state === "active")}
        onClick={() => onNodeSelect(node.id)}>{content}</button> : <div key={node.id} {...attributes} aria-hidden="true">{content}</div>;
    })}
    {onNodeSelect && <p id={`${id}-description`} className="ci-signal-description">{description}</p>}
  </div>;
}

export interface DiagramFrameProps extends HTMLAttributes<HTMLElement> {
  eyebrow: string; title: string; caption: string; children: ReactNode;
  controls?: ReactNode; dark?: boolean;
}
export function DiagramFrame({ eyebrow, title, caption, children, controls, dark = false, className, onPointerMove, ...props }: DiagramFrameProps) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <figure ref={root} className={cn("ci-diagram-frame", dark && "ci-theme", className)} data-theme={dark ? "dark" : undefined}
    onPointerMove={event => {
      onPointerMove?.(event);
      if (event.defaultPrevented || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.keakMotion === "paused") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        root.current?.style.setProperty("--ci-diagram-pointer-x", `${x}px`);
        root.current?.style.setProperty("--ci-diagram-pointer-y", `${y}px`);
      });
    }} {...props}>
    <div className="ci-diagram-frame-heading"><span>{eyebrow}</span><span>{title}</span><span aria-hidden="true">↗</span></div>
    {children}
    {controls && <div className="ci-diagram-frame-controls">{controls}</div>}
    <figcaption>{caption}</figcaption>
  </figure>;
}
