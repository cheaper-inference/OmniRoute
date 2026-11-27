"use client";
import { memo, useEffect, useId, useMemo, useRef, useState } from "react";

/** Trusted, build-time SVG artwork only; never pass user-supplied markup. */
export interface WorkflowAnimationProps {
  lightSvg: string;
  darkSvg: string;
  placement?: "onboarding" | "analysis" | "panel";
  label: string;
  /** Force completed artwork; system preference is always respected. */
  reducedMotion?: boolean;
}
function namespace(svg: string, prefix: string) {
  const ids = new Set([...svg.matchAll(/\bid=(['"])(.*?)\1/g)].map(match => match[2]));
  const rename = (id: string) => ids.has(id) ? `${prefix}-${id}` : id;
  return svg
    .replace(/\b(id|href|xlink:href|aria-labelledby|aria-describedby|begin|end)=(['"])(.*?)\2/g, (_, attribute: string, quote: string, value: string) => {
      if (attribute === "id") value = rename(value);
      else if (attribute.endsWith("href") && value.startsWith("#")) value = `#${rename(value.slice(1))}`;
      else if (attribute.startsWith("aria-")) value = value.split(/\s+/).map(rename).join(" ");
      else if (attribute === "begin" || attribute === "end") value = value.split(";").map(timing => timing.replace(/^(\s*)([^\s.]+)(\.)/, (_: string, space: string, id: string, dot: string) => `${space}${rename(id)}${dot}`)).join(";");
      return `${attribute}=${quote}${value}${quote}`;
    })
    .replace(/url\(\s*(['"]?)#([^'"\s)]+)\1\s*\)/g, (_, quote: string, id: string) => `url(${quote}#${rename(id)}${quote})`);
}
// Keep the SVG DOM stable when playback state changes; replacing innerHTML restarts SMIL.
const Artwork = memo(function Artwork({ svg, theme }: { svg: string; theme: "light" | "dark" }) {
  return <div aria-hidden="true" className={`ci-workflow-animation__art ci-workflow-animation__art--${theme}`} dangerouslySetInnerHTML={{ __html: svg }} />;
});
export function WorkflowAnimation({ lightSvg, darkSvg, placement = "onboarding", label, reducedMotion = false }: WorkflowAnimationProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const light = useMemo(() => namespace(lightSvg, `${id}-light`), [lightSvg, id]);
  const dark = useMemo(() => namespace(darkSvg, `${id}-dark`), [darkSvg, id]);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const svgs = [...node.querySelectorAll(".ci-workflow-animation__art > svg")] as SVGSVGElement[];
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      const shouldReduce = reducedMotion || media.matches;
      setReduced(shouldReduce);
      for (const svg of svgs) {
        if (shouldReduce) { svg.pauseAnimations(); svg.setCurrentTime(5.3); }
        else if (!visible || document.hidden) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }
      setReady(true);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(node);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); media.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [light, dark, reducedMotion]);
  return <div ref={root} role="img" aria-label={label} className="ci-workflow-animation" data-placement={placement} data-workflow-label={label} data-ready={ready} data-reduced-motion={reduced}>
    <Artwork svg={light} theme="light" />
    <Artwork svg={dark} theme="dark" />
  </div>;
}
