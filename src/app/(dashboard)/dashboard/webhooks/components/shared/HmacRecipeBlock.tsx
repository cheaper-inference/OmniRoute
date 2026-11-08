"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";

interface Snippet {
  label: string;
  code: string;
}

interface HmacRecipeBlockProps {
  title?: string;
  /** Single code block (backward compat) */
  code?: string;
  /** Multiple language snippets rendered with tab switcher */
  snippets?: Snippet[];
  /** Translated "Copy" / "Copied!" labels for the icon-only copy button. */
  copyLabel: string;
  copiedLabel: string;
}

export function HmacRecipeBlock({
  code,
  title,
  snippets,
  copyLabel,
  copiedLabel,
}: HmacRecipeBlockProps) {
  const tabs: Snippet[] = snippets ?? (code ? [{ label: "Node.js", code }] : []);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(tabs[active]?.code ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (tabs.length === 0) return null;

  return (
    <div className="space-y-1">
      {title && (
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{title}</p>
      )}
      {tabs.length > 1 && (
        <div className="flex gap-1">
          {tabs.map((s, i) => (
            <Button
              key={s.label}
              size="sm"
              variant={i === active ? "secondary" : "ghost"}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              {s.label}
            </Button>
          ))}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-bg-subtle p-3 pr-10 text-xs text-text-main">
          {tabs[active]?.code}
        </pre>
        <Button
          variant="ghost"
          size="icon"
          icon={copied ? "check" : "content_copy"}
          onClick={() => void copy()}
          title={copied ? copiedLabel : copyLabel}
          aria-label={copied ? copiedLabel : copyLabel}
          className="absolute right-1 top-1"
        />
      </div>
    </div>
  );
}
