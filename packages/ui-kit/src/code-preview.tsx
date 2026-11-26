"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "./lib/utils";

export type CodePreviewTokenTone = "keyword" | "string" | "number" | "function" | "property" | "comment" | "dim";

export interface CodePreviewToken {
  text: string;
  tone?: CodePreviewTokenTone;
  /** Optional grammar colors, separate from semantic fallback tones. */
  color?: string;
  darkColor?: string;
}

export interface CodePreviewProps extends Omit<ComponentProps<"section">, "onCopy"> {
  /** Surface follows the current theme and matches onboarding integration steps. */
  variant?: "terminal" | "surface";
  /** Defaults to true for terminal, false for surface and whenever the header is hidden. */
  showLineNumbers?: boolean;
  /**
   * `false` drops the header for a one-line command or URL: the code and the copy button share one
   * row, and `filename`, `language` and `metadata` are not rendered. Defaults to true.
   */
  showHeader?: boolean;
  filename?: ReactNode;
  language?: ReactNode;
  metadata?: ReactNode;
  code?: string;
  lines?: CodePreviewToken[][];
  copyLabel?: string;
  copiedLabel?: string;
  /** Button text while a getCopyValue copy is pending. Defaults to "Copying…". */
  copyingLabel?: string;
  /** Screen-reader announcement after a successful copy. Defaults to "Code copied to clipboard". */
  copiedAnnouncement?: string;
  /** Visible error after a failed copy. Defaults depend on whether getCopyValue is set. */
  copyErrorLabel?: string;
  /**
   * Accessible name of the code region. Defaults to "<language> code" (the file name when there is
   * no language), built from text only: with an element in both, or neither set, it is "Code".
   */
  codeLabel?: string;
  /** Resolve clipboard text only after a click; displayed source stays unchanged. */
  getCopyValue?: () => Promise<string>;
  /** Receives displayed code, never the private value returned by getCopyValue. */
  onCopy?: (code: string) => void;
  onCopyError?: (error: unknown) => void;
}

function textOf(node: ReactNode): string {
  return typeof node === "string" || typeof node === "number" ? String(node) : "";
}

export function CodePreview({
  className,
  variant = "terminal",
  showHeader = true,
  showLineNumbers = showHeader && variant === "terminal",
  filename = showHeader ? "request.ts" : undefined,
  language = showHeader ? "TypeScript" : undefined,
  metadata,
  code,
  lines,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  copyingLabel = "Copying…",
  copiedAnnouncement = "Code copied to clipboard",
  copyErrorLabel,
  codeLabel,
  getCopyValue,
  onCopy,
  onCopyError,
  ...props
}: CodePreviewProps) {
  const sourceLines = useMemo<CodePreviewToken[][]>(() => {
    if (lines) return lines;
    return (code ?? "").split("\n").map((line) => [{ text: line }]);
  }, [code, lines]);
  const rawCode = code ?? sourceLines.map((line) => line.map((token) => token.text).join("")).join("\n");
  const [copying, setCopying] = useState(false);
  const copyingRef = useRef(false);
  const copyVersion = useRef(0);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    copyVersion.current += 1;
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(false);
    setCopyFailed(false);
    copyVersion.current += 1;
  }, [rawCode]);

  const copy = useCallback(async () => {
    if (copyingRef.current || !rawCode) return;
    copyingRef.current = true;
    setCopying(true);
    setCopyFailed(false);
    const version = copyVersion.current;
    try {
      if (getCopyValue) {
        const canWriteItem = typeof ClipboardItem !== "undefined" && typeof navigator.clipboard?.write === "function";
        if (!canWriteItem && typeof navigator.clipboard?.writeText !== "function") {
          // Do not resolve a private value when this environment cannot copy it.
          throw new Error("Clipboard is unavailable.");
        }
        // Start the write during user activation, including on Safari. Never
        // place resolved clipboard text in React state or callback telemetry.
        const text = Promise.resolve().then(getCopyValue);
        void text.catch(() => undefined);
        try {
          if (canWriteItem) {
            const blob = text.then((value) => new Blob([value], { type: "text/plain" }));
            void blob.catch(() => undefined);
            await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
          } else {
            await navigator.clipboard.writeText(await text);
          }
        } finally { await text; }
      } else {
        await navigator.clipboard.writeText(rawCode);
      }
      if (copyVersion.current !== version) return;
      onCopy?.(rawCode);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      if (copyVersion.current !== version) return;
      setCopied(false);
      setCopyFailed(true);
      onCopyError?.(error);
    } finally {
      copyingRef.current = false;
      setCopying(false);
    }
  }, [getCopyValue, onCopy, onCopyError, rawCode]);

  const copyButton = (
    <button type="button" className="ci-code-preview__copy" onClick={copy} disabled={!rawCode || copying} aria-busy={copying || undefined} data-copied={copied || undefined}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copying ? copyingLabel : copied ? copiedLabel : copyLabel}
    </button>
  );
  // Only text can name the region: an element would read as "[object Object]".
  const codeName = textOf(language) || textOf(filename);

  return (
    <section data-slot="code-preview" data-variant={variant} data-line-numbers={showLineNumbers} data-header={showHeader ? undefined : "false"} className={cn("ci-code-preview", className)} {...props}>
      {showHeader && (
        <header className="ci-code-preview__header">
          <span className="ci-code-preview__meta">
            <strong>{filename}</strong>
            <span>{language}</span>
            {metadata != null ? <span className="ci-code-preview__endpoint">{metadata}</span> : null}
          </span>
          {copyButton}
        </header>
      )}
      <pre className="ci-code-preview__pre" tabIndex={0} aria-label={codeLabel ?? (codeName ? `${codeName} code` : "Code")}>
        <code>
          {sourceLines.map((line, lineIndex) => (
            <span className="ci-code-preview__line" key={lineIndex}>
              {showLineNumbers && <span className="ci-code-preview__number" aria-hidden="true">{lineIndex + 1}</span>}
              <span className="ci-code-preview__source">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} data-tone={token.tone} data-syntax-color={token.color ? "" : undefined} style={token.color ? { "--ci-code-token-light": variant === "terminal" ? token.darkColor ?? token.color : token.color, "--ci-code-token-dark": token.darkColor ?? token.color } as CSSProperties : undefined}>{token.text}</span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
      {/* Without a header the button follows the code, so the tab order matches what is drawn. */}
      {!showHeader && copyButton}
      {copyFailed && <p className="ci-code-preview__error" role="alert">{copyErrorLabel ?? (getCopyValue ? "Could not copy code. Please try again." : "Could not copy code. Select it and try again.")}</p>}
      <span className="ci-sr-only" aria-live="polite">{copied ? copiedAnnouncement : ""}</span>
    </section>
  );
}
