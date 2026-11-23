// Stable identifier for supported formats (1:1 with FORMAT_META in exampleTemplates.tsx).
// Keeps compatibility with strings already in the backend (open-sse/translator/formats.ts).
export type FormatId =
  "openai" | "openai-responses" | "claude" | "gemini" | "antigravity" | "kiro" | "cursor";

// Tabs in the 2-tab shell.
export type TranslatorTab = "translate" | "monitor";

// Simple-controls mode: only convert (static) vs send and show the response (with SSE).
export type TranslateMode = "preview" | "send";

// Canonical slugs for the Advanced accordions (deep-link).
export type AdvancedSlug = "rawjson" | "pipeline" | "streamtransform" | "testbench" | "compression";

// Parsed deep-link state from the query string (useTranslateDeepLink hook).
export interface TranslateDeepLink {
  tab: TranslatorTab;
  mode: TranslateMode;
  advanced: AdvancedSlug | null; // null = none open
}

// Narrated result shown in the right panel (simple mode).
// Rendered by ResultNarrated; F3 populates it, F4 knows the shape to pass by reference.
export interface TranslateNarratedResult {
  detected: FormatId | null; // format detected in the user's input
  target: FormatId; // selected in SimpleControls
  status: "idle" | "translating" | "sending" | "ok" | "error";
  responsePreview: string | null; // first N chars of the SSE/JSON response
  translatedJson: string | null; // resulting JSON (for the "view JSON" button)
  pipelinePath: "direct" | "hub-and-spoke" | "passthrough" | null;
  intermediateJson: string | null; // intermediate OpenAI JSON when hub-and-spoke
  errorMessage: string | null; // sanitized error (no stack)
  latencyMs: number | null;
}

// Props shared among the accordion children.
export interface AdvancedAccordionProps {
  // Lazy-render guard (D7): only mounts children after the accordion has been opened at least once.
  defaultOpen?: boolean;
  // Slug used by the deep-link (D6); the useTranslateDeepLink hook reads this.
  slug: AdvancedSlug;
  // Caller can force it open (initial deep-link).
  forceOpen?: boolean;
  // Caller can be notified when the open state changes (for URL sync).
  onOpenChange?: (open: boolean) => void;
}

// Templates returned by getExampleTemplates(t) — mirrors the shape from exampleTemplates.tsx.
// exampleTemplates.tsx does not export this type, so define it inline here.
// DO NOT duplicate the data — import only getExampleTemplates/FORMAT_META/FORMAT_OPTIONS from the module.
export interface ExampleTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  formats: Partial<Record<FormatId, Record<string, unknown>>>;
}
