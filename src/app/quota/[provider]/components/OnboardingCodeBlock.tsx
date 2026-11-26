"use client";

import OnboardingCopyButton from "./OnboardingCopyButton";

interface OnboardingCodeBlockProps {
  /** The generated text, shown as the only text node of the block. */
  text: string;
  /** Accessible name of the block. */
  label: string;
  copyLabel: string;
}

/** A generated block that scrolls inside its own box, with a button that copies it. */
export default function OnboardingCodeBlock({ text, label, copyLabel }: OnboardingCodeBlockProps) {
  return (
    <div className="min-w-0 space-y-2">
      <pre
        // Focusable so a keyboard user can scroll a block wider or taller than its box.
        tabIndex={0}
        role="region"
        aria-label={label}
        className="max-h-80 max-w-full overflow-auto whitespace-pre rounded-md border border-border bg-bg-subtle p-3 font-mono text-xs text-text-main"
      >
        {text}
      </pre>
      <OnboardingCopyButton text={text} label={copyLabel} />
    </div>
  );
}
