"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "./lib/utils";

export type CodePreviewTokenTone = "keyword" | "string" | "number" | "function" | "property" | "comment" | "dim";

export interface CodePreviewToken {
  text: string;
  tone?: CodePreviewTokenTone;
}

export interface CodePreviewProps extends Omit<ComponentProps<"section">, "onCopy"> {
  /** Surface follows the current theme and matches onboarding integration steps. */
  variant?: "terminal" | "surface";
  /** Defaults to true for terminal, false for surface. */
  showLineNumbers?: boolean;
  filename?: ReactNode;
  language?: ReactNode;
  metadata?: ReactNode;
  code?: string;
  lines?: CodePreviewToken[][];
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (code: string) => void;
  onCopyError?: (error: unknown) => void;
}

export function CodePreview({
  className,
  variant = "terminal",
  showLineNumbers = variant === "terminal",
  filename = "request.ts",
  language = "TypeScript",
  metadata,
  code,
  lines,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  onCopy,
  onCopyError,
  ...props
}: CodePreviewProps) {
  const sourceLines = useMemo<CodePreviewToken[][]>(() => {
    if (lines) return lines;
    return (code ?? "").split("\n").map((line) => [{ text: line }]);
  }, [code, lines]);
  const rawCode = code ?? sourceLines.map((line) => line.map((token) => token.text).join("")).join("\n");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(false);
    setCopyFailed(false);
  }, [rawCode]);

  const copy = useCallback(async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(rawCode);
      onCopy?.(rawCode);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
      setCopyFailed(true);
      onCopyError?.(error);
    }
  }, [onCopy, onCopyError, rawCode]);

  return (
    <section data-slot="code-preview" data-variant={variant} data-line-numbers={showLineNumbers} className={cn("ci-code-preview", className)} {...props}>
      <header className="ci-code-preview__header">
        <span className="ci-code-preview__meta">
          <strong>{filename}</strong>
          <span>{language}</span>
          {metadata != null ? <span className="ci-code-preview__endpoint">{metadata}</span> : null}
        </span>
        <button type="button" className="ci-code-preview__copy" onClick={copy} disabled={!rawCode} data-copied={copied || undefined}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </header>
      <pre className="ci-code-preview__pre" tabIndex={0} aria-label={`${String(language || filename || "Code")} code`}>
        <code>
          {sourceLines.map((line, lineIndex) => (
            <span className="ci-code-preview__line" key={lineIndex}>
              {showLineNumbers && <span className="ci-code-preview__number" aria-hidden="true">{lineIndex + 1}</span>}
              <span className="ci-code-preview__source">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} data-tone={token.tone}>{token.text}</span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
      {copyFailed && <p className="ci-code-preview__error" role="alert">Could not copy code. Select it and try again.</p>}
      <span className="ci-sr-only" aria-live="polite">{copied ? "Code copied to clipboard" : ""}</span>
    </section>
  );
}
