"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";
import { BRAND_PATHS, clamp, mix, phase } from "./lib/brand-loader-geometry";

export type BrandLoaderVariant = "progress" | "orbit" | "pulse" | "axis";
export interface BrandLoaderProps extends Omit<ComponentProps<"div">, "children" | "onAnimationEnd"> {
  variant?: BrandLoaderVariant;
  /** Real progress, from 0 to 100. Omit for an indeterminate loader. */
  progress?: number;
  /** Play the closing transition. The parent may also unmount immediately. */
  complete?: boolean;
  /** @deprecated Retained for compatibility; loading starts immediately without an intro. */
  intro?: boolean;
  paused?: boolean;
  /** Forces a static treatment; the OS reduced-motion preference is always honored. */
  reducedMotion?: boolean;
  /** Width in CSS pixels. The component also shrinks to fit its container. */
  size?: number;
  label?: string;
  completionLabel?: string;
  onComplete?: () => void;
}
interface Frame { time: number; progress: number; finish: number | null; }

function useReducedMotion(force: boolean) {
  const [preferred, setPreferred] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPreferred(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return force || preferred;
}

function Artwork({ frame, variant, id, reduced, indeterminate }: { frame: Frame; variant: BrandLoaderVariant; id: string; reduced: boolean; indeterminate: boolean }) {
  const elapsed = reduced ? 0 : frame.time;
  const scale = 132 / 160;
  const x = 360 - 119 * scale, y = 250.76923 - 119 * scale;
  const finish = frame.finish;
  const value = finish === null ? frame.progress : mix(frame.progress,1,reduced ? 1 : phase(finish,0,.5));
  const visible = finish === null ? 1 : reduced ? 0 : 1-phase(finish,.85,1.4);
  const circumference = 2*Math.PI*110;
  const sweep = reduced ? 124 : 124+44*(.5-.5*Math.cos(elapsed*2*Math.PI/2.8));
  const arc = finish === null ? sweep : mix(sweep,circumference,phase(finish,0,.5));
  const travel = reduced ? .42 : (elapsed/1.8)%1;
  return (
    <svg viewBox="150 100 420 320" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <g data-brand-mark="" transform={`translate(${x} ${y}) scale(${scale})`}>
          {BRAND_PATHS.map((d, index) => <path key={index} d={d} />)}
        </g>
        <g data-brand-treatment="" opacity={visible}>
          {variant === "progress" && <>
            <rect x="256" y="343" width="208" height="3" rx="1.5" opacity=".14"/>
            {indeterminate && finish === null ? <>
              <defs><clipPath id={`${id}-bar`}><rect x="256" y="343" width="208" height="3" rx="1.5"/></clipPath></defs>
              <rect data-progress-fill="" x={196+268*travel} y="343" width="60" height="3" rx="1.5" clipPath={`url(#${id}-bar)`}/>
            </> : <><rect data-progress-fill="" x="256" y="343" width={208*value} height="3" rx="1.5"/><text x="360" y="380" className="ci-brand-loader__percentage" textAnchor="middle" opacity=".6">{Math.round(value*100)}%</text></>}
          </>}
          {variant === "orbit" && <>
            <circle cx="360" cy="250.76923" r="110" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".12"/>
            <circle data-orbit="" cx="360" cy="250.76923" r="110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${arc} ${circumference-arc}`} transform={`rotate(${reduced ? -63 : elapsed*100-63} 360 250.76923)`}/>
          </>}
          {variant === "pulse" && [0,1,2].map(k => {
            const wave = reduced ? (k===1?1:.18) : Math.pow(.5+.5*Math.cos((elapsed-k*.19)*2*Math.PI/1.35),3);
            return <circle key={k} cx={340+k*20} cy="344" r="4" opacity={finish===null?.14+.86*wave:mix(.14+.86*wave,1,phase(finish,0,.5))}/>;
          })}
          {variant === "axis" && Array.from({length:12},(_,k) => {
            const fill = indeterminate && finish===null ? reduced ? (k===5?1:.14) : Math.pow(.5+.5*Math.cos((elapsed/1.8-k/12)*Math.PI*2),6) : phase(value*12,k,k+1);
            return <path key={k} d={`M${266+16*k} 352 l12 -16`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity={.14+.86*fill}/>;
          })}
        </g>
      </g>
    </svg>
  );
}

export function BrandLoader({ variant="progress", progress, complete=false, intro: _intro = false, paused=false, reducedMotion=false, size=280, label="Loading", completionLabel="Ready", onComplete, className, style, ...props }: BrandLoaderProps) {
  const id = `ci-brand-${useId().replace(/[^a-zA-Z0-9_-]/g,"")}`;
  const reduced = useReducedMotion(reducedMotion);
  const safeProgress = progress === undefined ? undefined : clamp(progress/100);
  const determinate = (variant === "progress" || variant === "axis") && safeProgress !== undefined;
  const clock = useRef({ time: 0, completedAt: null as number|null, notified:false, progress:safeProgress??0 });
  const [frame,setFrame] = useState<Frame>({time:clock.current.time,progress:clock.current.progress,finish:null});
  const callback = useRef(onComplete);
  useEffect(()=>{callback.current=onComplete},[onComplete]);
  useEffect(() => {
    const state=clock.current;
    if (!complete && state.completedAt !== null) {state.time=0;state.completedAt=null;state.notified=false;}
    if (complete && state.completedAt === null) {state.completedAt=state.time;}
    const from=state.progress,target=safeProgress??0,tweenAt=state.time;
    let raf:number|null=null,last=performance.now(),disposed=false;
    const render=()=>{
      state.progress = reduced ? target : mix(from,target,phase(state.time,tweenAt,tweenAt+.25));
      const finish=state.completedAt===null?null:reduced?1.4:state.time-state.completedAt;
      setFrame({time:state.time,progress:state.progress,finish});
      if(finish!==null&&finish>=1.4&&!state.notified){state.notified=true;callback.current?.();}
    };
    const moving=()=>!paused&&!reduced&&!document.hidden&&(state.completedAt!==null ? state.time-state.completedAt<1.4 : variant==="orbit"||variant==="pulse"||!determinate||state.time-tweenAt<.25);
    const schedule=()=>{if(!disposed&&raf===null&&moving())raf=requestAnimationFrame(tick)};
    const tick=(now:number)=>{raf=null;if(disposed)return;if(moving())state.time+=Math.max(0,(now-last)/1000);last=now;render();schedule();};
    const visibility=()=>{if(raf!==null){cancelAnimationFrame(raf);raf=null;}last=performance.now();schedule();};
    render();schedule();document.addEventListener("visibilitychange",visibility);
    return ()=>{disposed=true;if(raf!==null)cancelAnimationFrame(raf);document.removeEventListener("visibilitychange",visibility);};
  },[complete,paused,reduced,safeProgress,variant,determinate]);
  return (
    <div {...props} data-slot="brand-loader" data-variant={variant} data-phase={complete?"complete":"loading"} className={cn("ci-brand-loader",className)} style={{width:Number.isFinite(size)?Math.max(1,size):280,...style}} role={determinate?"progressbar":"status"} aria-label={complete?completionLabel:label} aria-busy={!complete} aria-valuemin={determinate?0:undefined} aria-valuemax={determinate?100:undefined} aria-valuenow={determinate?(complete?100:(safeProgress??0)*100):undefined}>
      <Artwork frame={frame} variant={variant} id={id} reduced={reduced} indeterminate={!determinate}/>
      <span className="ci-brand-loader__status">{complete?completionLabel:label}</span>
    </div>
  );
}
