"use client";
import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { Textarea, type TextareaProps } from "./textarea";
import { cn } from "./lib/utils";

export type VariableTextareaProps = Omit<TextareaProps, "value" | "defaultValue" | "wrap"> & {
  /** Controlled text. Complete double-curly placeholders receive a visual highlight. */
  value: string;
  containerClassName?: string;
};

/** Native text editing with decorative placeholder highlights. No rich-text conversion. */
export const VariableTextarea = forwardRef<HTMLTextAreaElement, VariableTextareaProps>(
  function VariableTextarea({ value, containerClassName, className, onScroll, disabled, dir, mono, ...props }, forwardedRef) {
    const input = useRef<HTMLTextAreaElement | null>(null);
    const mirror = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const element = input.current;
      const layer = mirror.current;
      if (!element || !layer) return;
      const sync = () => {
        const border = parseFloat(getComputedStyle(element).borderLeftWidth) || 0;
        const width = element.clientWidth + border * 2;
        const height = element.clientHeight + border * 2;
        const scrollTop = element.scrollTop;
        const scrollLeft = element.scrollLeft;
        layer.style.width = `${width}px`;
        layer.style.height = `${height}px`;
        layer.scrollTop = scrollTop;
        layer.scrollLeft = scrollLeft;
      };
      sync();
      if (typeof ResizeObserver === "undefined") return;
      const observer = new ResizeObserver(sync);
      observer.observe(element);
      return () => observer.disconnect();
    }, [value]);
    useImperativeHandle(forwardedRef, () => input.current!, []);
    return (
      <div className={cn("ci-variable-textarea", containerClassName)} data-disabled={disabled || undefined}>
        <div ref={mirror} className={cn("ci-variable-textarea__layer", mono && "ci-variable-textarea__layer--mono")} dir={dir} aria-hidden="true">
          {value.split(/(\{\{[^{}\n]+\}\})/g).map((part, index) =>
            /^\{\{[^{}\n]+\}\}$/.test(part)
              ? <mark key={index}>{part}</mark>
              : <span key={index}>{part}</span>,
          )}{"\n"}
        </div>
        <Textarea
          {...props}
          mono={mono}
          dir={dir}
          ref={input}
          value={value}
          disabled={disabled}
          wrap="soft"
          className={cn("ci-variable-textarea__input", className)}
          onScroll={(event) => {
            if (mirror.current) {
              mirror.current.scrollTop = event.currentTarget.scrollTop;
              mirror.current.scrollLeft = event.currentTarget.scrollLeft;
            }
            onScroll?.(event);
          }}
        />
      </div>
    );
  },
);
