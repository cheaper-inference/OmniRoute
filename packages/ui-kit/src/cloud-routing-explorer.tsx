"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Cloud, Code2, Command, KeyRound, LockKeyhole, Sparkles, Terminal } from "lucide-react";

export interface CloudRoutingExplorerProps { name?: string; }
const tools = [
  { name: "Claude Code", icon: Terminal },
  { name: "Cursor", icon: Command },
  { name: "Your app", icon: Code2 },
] as const;

/** An explanatory playground. Selection changes only the illustration; it never sends requests. */
export function CloudRoutingExplorer({ name = "Your OmniRoute" }: CloudRoutingExplorerProps) {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const [tool, setTool] = useState(0);
  const [provider, setProvider] = useState<"inference" | "providers">("inference");
  const [moving, setMoving] = useState(false);
  const Tool = tools[tool].icon;

  useEffect(() => {
    const element = root.current;
    if (!element || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setMoving(visible && !media.matches && !document.hidden);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.15 });
    observer?.observe(element);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer?.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <section ref={root} className="ci-cloud-explorer" data-route={provider} data-motion={moving ? "running" : "paused"} aria-labelledby={`${id}-title`}>
    <div className="ci-cloud-explorer__chrome"><span id={`${id}-title`}>How requests are routed</span></div>
    <div className="ci-cloud-explorer__scene">
      <div className="ci-cloud-explorer__grid" aria-hidden="true" />
      <div className="ci-cloud-explorer__labels" aria-hidden="true"><span>CLIENT</span><span>OMNIROUTE</span><span>INFERENCE</span></div>
      <svg className="ci-cloud-explorer__wires" viewBox="0 0 600 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="ci-cloud-explorer__wire" d="M155 150H240M360 150C402 150 390 86 428 86M360 150C402 150 390 214 428 214" />
        <path className="ci-cloud-explorer__packet ci-cloud-explorer__packet--in" d="M155 150H240" />
        <path className={`ci-cloud-explorer__packet ${provider === "inference" ? "ci-cloud-explorer__packet--active" : ""}`} d="M360 150C402 150 390 86 428 86" />
        <path className={`ci-cloud-explorer__packet ${provider === "providers" ? "ci-cloud-explorer__packet--active" : ""}`} d="M360 150C402 150 390 214 428 214" />
      </svg>
      <div className="ci-cloud-explorer__source"><Tool size={23} strokeWidth={1.5} aria-hidden="true" /><strong>{tools[tool].name}</strong></div>
      <div className="ci-cloud-explorer__gateway"><div className="ci-cloud-explorer__cloud"><Cloud size={30} strokeWidth={1.3} aria-hidden="true" /></div><strong>{name}</strong><span><LockKeyhole size={10} aria-hidden="true" />Authenticated endpoint</span></div>
      <div className="ci-cloud-explorer__targets" role="group" aria-label="Explore an inference connection">
        <button type="button" aria-pressed={provider === "inference"} onClick={() => setProvider("inference")}><Sparkles size={18} aria-hidden="true" /><span><strong>Cheaper Inference</strong><small>One-click connection</small></span><i aria-hidden="true" /></button>
        <button type="button" aria-pressed={provider === "providers"} onClick={() => setProvider("providers")}><KeyRound size={18} aria-hidden="true" /><span><strong>Your providers</strong><small>Your keys & accounts</small></span><i aria-hidden="true" /></button>
      </div>
      <div className="ci-cloud-explorer__endpoint"><code>/v1/chat/completions</code></div>
    </div>
    <div className="ci-cloud-explorer__controls"><span>Example client</span><div role="group" aria-label="Choose an example tool">{tools.map((item, index) => <button key={item.name} type="button" aria-pressed={tool === index} onClick={() => setTool(index)}><item.icon size={13} aria-hidden="true" />{item.name}</button>)}</div></div>
    <div className="ci-cloud-explorer__explanation" aria-live="polite" aria-atomic="true"><span className="ci-cloud-explorer__step">{provider === "inference" ? <Sparkles size={18} /> : <KeyRound size={18} />}</span><div><strong>{provider === "inference" ? "Cheaper Inference" : "Your provider accounts"}</strong><p>{provider === "inference" ? "Use your existing account balance and model access. No API keys to copy." : "Connect provider API keys, subscriptions, or OAuth accounts in OmniRoute."}</p></div></div>

  </section>;
}
