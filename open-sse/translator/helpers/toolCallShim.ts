// Defensive shims for tool calls whose strict-schema fields can be malformed
// by upstream models (e.g. MiMo emitting empty objects/strings instead of
// arrays for Capy's submit_pr_review).
//
// Applied on the assembled OpenAI tool-call arguments after streaming, just
// before they are re-emitted as a single Claude input_json_delta.
//
// To add a new shim: register a (input) => input transformer in TOOL_SHIMS
// keyed by the tool name. The transformer must accept arbitrary input and
// return a JSON-safe value.

type ToolSchema = Record<string, unknown>;
type ShimFn = (input: unknown, schema?: ToolSchema) => unknown;

function coerceToArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v == null) return [];
  if (typeof v === "string") {
    if (v === "") return [];
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  // Plain object or other non-array → empty
  return [];
}

// Claude Code's Read tool caps `limit` at 2000 lines per call. Non-Anthropic models
// (GPT-5.5, DeepSeek …) occasionally emit absurd values (e.g. `limit: 25999999999999999`)
// that Claude Code rejects, causing a retry loop that wastes tokens. Clamp here.
const READ_MAX_LIMIT = 2000;

// `pages` is only meaningful for PDFs and only as `"N"` or `"N-M"` (1-based).
// Reference: claude-code-tools docs + upstream decolua/9router#1144.
function isValidPdfPagesArg(filePath: unknown, pages: unknown): boolean {
  return (
    typeof filePath === "string" &&
    filePath.toLowerCase().endsWith(".pdf") &&
    typeof pages === "string" &&
    /^\d+(?:-\d+)?$/.test(pages)
  );
}

const READ_PATH_KEYS = ["file_path", "filePath", "path"] as const;

/** Exact spelling wins; restored Claude tool names may differ only in case. */
export function findToolCallSchema(
  name: string,
  schemas?: Map<string, ToolSchema> | null
): ToolSchema | undefined {
  const exact = schemas?.get(name);
  if (exact) return exact;
  for (const [key, schema] of schemas ?? []) {
    if (key.toLowerCase() === name.toLowerCase()) return schema;
  }
  return undefined;
}

function sanitizeFilePathArg(args: Record<string, unknown>, schema?: ToolSchema): void {
  const properties = schema?.properties;
  const declared =
    properties && typeof properties === "object" && !Array.isArray(properties)
      ? READ_PATH_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(properties, key))
      : [];
  const isPath = (value: unknown): value is string => typeof value === "string" && value.length > 0;
  // Prefer the client's valid declared field over a conflicting upstream alias.
  const path = [...declared, ...READ_PATH_KEYS].map((key) => args[key]).find(isPath);
  if (!path) return;
  if (declared.length > 0) {
    for (const key of READ_PATH_KEYS) {
      if (declared.includes(key)) {
        if (!isPath(args[key])) args[key] = path;
      } else {
        delete args[key];
      }
    }
    return;
  }
  // No recognizable client path schema: mirror the resolved path into file_path and filePath,
  // and drop the `path` alias.
  args.file_path = path;
  args.filePath = path;
  if (typeof args.path === "string") delete args.path;
}

function sanitizeReadArgs(args: Record<string, unknown>, schema?: ToolSchema): void {
  sanitizeFilePathArg(args, schema);
  // Coerce numeric-string limit/offset (some non-Anthropic models stringify everything).
  if (typeof args.limit === "string" && /^\d+$/.test(args.limit)) {
    args.limit = Number(args.limit);
  }
  if (typeof args.offset === "string" && /^-?\d+$/.test(args.offset)) {
    args.offset = Number(args.offset);
  }

  if (typeof args.limit === "number") {
    // Read into a local: assigning back to `args.limit` (declared `unknown`) resets the
    // `typeof` narrowing, so the second comparison would no longer see a number. The two
    // branches are mutually exclusive (READ_MAX_LIMIT is 2000), so testing the original
    // value keeps the behavior identical.
    const limit = args.limit;
    if (limit > READ_MAX_LIMIT) args.limit = READ_MAX_LIMIT;
    if (limit < 1) delete args.limit;
  }
  if (typeof args.offset === "number" && args.offset < 0) args.offset = 0;

  if (
    "pages" in args &&
    !isValidPdfPagesArg(args.file_path ?? args.filePath ?? args.path, args.pages)
  ) {
    delete args.pages;
  }
}

const TOOL_SHIMS: Record<string, ShimFn> = {
  // Claude Code Read rejects bad params and retries — wasting tokens with non-Anthropic
  // models that emit oversized limits, negative offsets, stringified numbers, or stray
  // `pages` on non-PDF files. Buffer and emit one cleaned JSON delta so the client never
  // sees the bad fields. See `sanitizeReadArgs` for the per-field rules.
  Read: (input, schema) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) return input;
    const patched = { ...(input as Record<string, unknown>) };
    sanitizeReadArgs(patched, schema);
    return patched;
  },
  submit_pr_review: (input) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) return input;
    const patched = { ...(input as Record<string, unknown>) };
    for (const key of ["functionalChanges", "findings"]) {
      patched[key] = coerceToArray(patched[key]);
    }
    return patched;
  },
};

function resolveToolCallShim(name: string | undefined | null): ShimFn | undefined {
  if (typeof name !== "string" || !name) return undefined;
  if (Object.prototype.hasOwnProperty.call(TOOL_SHIMS, name)) return TOOL_SHIMS[name];
  const lower = name.toLowerCase();
  for (const [key, fn] of Object.entries(TOOL_SHIMS)) {
    if (key.toLowerCase() === lower) return fn;
  }
  return undefined;
}

export function hasToolCallShim(name: string | undefined | null): boolean {
  return Boolean(resolveToolCallShim(name));
}

/**
 * Apply the registered shim for a tool call's raw assembled arguments string.
 * Returns a stringified JSON value safe to emit as input_json_delta.partial_json.
 * If the buffer is unparseable, returns the empty-object JSON `{}` after applying
 * the shim with `{}` as input (so required arrays still get injected).
 */
export function applyToolCallShimToBuffer(name: string, raw: string, schema?: ToolSchema): string {
  const shim = resolveToolCallShim(name);
  if (!shim) return raw;

  let parsed: unknown;
  try {
    parsed = raw && raw.length > 0 ? JSON.parse(raw) : {};
  } catch {
    parsed = {};
  }

  const patched = shim(parsed, schema);
  return JSON.stringify(patched);
}

// Exposed for unit tests only.
export const __test = { coerceToArray, TOOL_SHIMS };
