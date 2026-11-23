/**
 * OpenCode v2 client fingerprint for the free-tier request contract (#16571, ported from
 * 9router). Opt-in only: read when `OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED` is on, through
 * `opencodeFreeTierContract.ts`; with the flag off the contract keeps its own minimal
 * placeholder schemas and nothing here is used.
 *
 * The `read` and `shell` entries are the OpenCode CLI v2.0.26 tool declarations, verbatim,
 * so an injected placeholder declares exactly what the v2 client declares.
 */
const V2_TOOL_DEFINITIONS: Readonly<
  Record<string, { readonly description: string; readonly parameters: Record<string, unknown> }>
> = {
  read: {
    description:
      "Read the contents of a file or directory. Supports text files, images, and PDFs. Images and PDFs are presented directly to the model. Each text line is prefixed by its 1-based line number as <line>: <content>. The prefix is for reference and is not part of the file content. Directory entries are returned one per line. Use offset and limit to read large files or directories in sections. Prefer one larger read over many small slices, and use grep to find specific content in large files.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "File or directory to read" },
        offset: {
          type: "integer",
          minimum: 0,
          description: "The line or directory entry to start reading from (1-based)",
        },
        limit: {
          type: "integer",
          minimum: 0,
          description:
            "The maximum number of lines or directory entries to read (defaults to and capped at 2000)",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
  },
  shell: {
    description:
      "Execute a shell command and return its output. Commands run on Linux using bash. Quote file paths containing spaces or special characters. Prefer dedicated tools over shell commands when possible. When output is large, the full result is saved to a file and a truncated preview is returned. Rely on automatic truncation unless filtering the output is more useful. Commands accept an optional timeout, background commands have no timeout by default. Background commands return immediately, and you will be notified when they complete.",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string", description: "Shell command string to execute" },
        workdir: {
          type: "string",
          description:
            "Working directory to execute the command in. Defaults to the current working directory. When possible, avoid changing directories in the command and set the working directory here instead.",
        },
        timeout: {
          type: "integer",
          minimum: 0,
          description:
            "Timeout in milliseconds. Set to 0 to disable the timeout. Defaults to 120000 for foreground commands. Background commands have no timeout by default.",
        },
        background: {
          type: "boolean",
          description:
            "Run the command in the background and return immediately (useful for dev servers and long-running builds). You do not need to use '&' at the end of the command when using this parameter. You will be notified when it completes. DO NOT poll for completion.",
        },
      },
      required: ["command"],
      additionalProperties: false,
    },
  },
};

/** The v2 CLI declaration for `name`, or `undefined` when v2 declares no such tool. */
export function v2PlaceholderTool(
  name: string
): { readonly description: string; readonly parameters: Record<string, unknown> } | undefined {
  return Object.hasOwn(V2_TOOL_DEFINITIONS, name) ? V2_TOOL_DEFINITIONS[name] : undefined;
}

/**
 * Drop a `tool_choice` of "none" (string or `{type: "none"}`): the free tier accepts only
 * "auto" (measured 2026-09-18: any other value is 400 invalid_request_error), so a caller's
 * "none" would turn a servable request into a refusal. Any other value travels unchanged.
 * Mutates and returns `record`.
 */
export function sanitizeToolChoice<T extends Record<string, unknown>>(record: T): T {
  const choice = record.tool_choice;
  const isNone =
    choice === "none" ||
    (typeof choice === "object" &&
      choice !== null &&
      (choice as { type?: unknown }).type === "none");
  if (isNone) delete record.tool_choice;
  return record;
}
