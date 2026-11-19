/**
 * Caller-owned native tool protocol for Gemini App (Robin). Pure protobuf/JSON
 * conversion: tools are declared and their arguments validated locally, but
 * they are NEVER executed here. A tool call is a request for the caller to
 * execute, not evidence that it was executed.
 *
 * Derived from `ShawTim/gemini-app2api` — `native-wire/consumer-tool-codec.mjs`
 * and `src/tool-protocol.mjs` (MIT). See ./LICENSE for the upstream notice.
 */

import { randomUUID } from "node:crypto";
import { lengthDelimited as message, varintField, parse } from "./protobuf.ts";
import {
  buildClientGenerate,
  buildRequestMetadata,
  type NativeImageAttachment,
  type RequestMetadataInput,
} from "./robinWire.ts";

export const TOOL_LIMITS = {
  tools: 64,
  calls: 32,
  depth: 16,
  nodes: 4096,
  bytes: 256 * 1024,
  frameBytes: 1024 * 1024,
} as const;

const SCHEMA_TYPES: Readonly<Record<string, number>> = {
  string: 1,
  number: 2,
  integer: 3,
  boolean: 4,
  array: 5,
  object: 6,
  null: 7,
};

const utf8 = new TextDecoder("utf-8", { fatal: true });
const cat = (...parts: Buffer[]): Buffer => Buffer.concat(parts);
const str = (n: number, value: string): Buffer => message(n, Buffer.from(value));

function reject(code: string, status = 400): never {
  const error = new Error(code) as Error & { status: number; code: string };
  error.name = "GeminiAppToolError";
  error.status = status;
  error.code = code;
  throw error;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validatedString(value: unknown, max: number, allowEmpty = true): string {
  if (
    typeof value !== "string" ||
    (!allowEmpty && !value.length) ||
    Buffer.byteLength(value) > max ||
    utf8.decode(Buffer.from(value)) !== value
  ) {
    reject("INVALID_TOOL_STRING");
  }
  return value;
}

interface SchemaBudget {
  nodes: number;
}

function tick(budget: SchemaBudget, depth: number): void {
  if (++budget.nodes > TOOL_LIMITS.nodes || depth > TOOL_LIMITS.depth) {
    reject("TOOL_SIZE_LIMIT");
  }
}

type ToolSchema = {
  type: string;
  description?: string;
  nullable?: boolean;
  enum?: string[];
  items?: ToolSchema;
  properties?: Record<string, ToolSchema>;
  required?: string[];
  additionalProperties?: boolean;
  minimum?: number;
  maximum?: number;
};

function asSchema(value: unknown): ToolSchema {
  if (
    !isObject(value) ||
    typeof value.type !== "string" ||
    !Object.hasOwn(SCHEMA_TYPES, value.type)
  ) {
    reject("UNSUPPORTED_TOOL_SCHEMA");
  }
  return value as unknown as ToolSchema;
}

/** Encode a bounded JSON Schema subset onto the native Beyond_Schema wire. */
function schemaWire(schema: ToolSchema, budget: SchemaBudget, depth = 0): Buffer {
  tick(budget, depth);
  const out: Buffer[] = [varintField(1, SCHEMA_TYPES[schema.type])];
  if (schema.description !== undefined) {
    out.push(str(3, validatedString(schema.description, TOOL_LIMITS.bytes)));
  }
  if (schema.nullable !== undefined) {
    if (typeof schema.nullable !== "boolean") reject("UNSUPPORTED_TOOL_SCHEMA");
    out.push(varintField(4, Number(schema.nullable)));
  }
  if (schema.enum !== undefined) {
    if (
      schema.type !== "string" ||
      !Array.isArray(schema.enum) ||
      !schema.enum.length ||
      schema.enum.length > 128 ||
      new Set(schema.enum).size !== schema.enum.length
    ) {
      reject("UNSUPPORTED_TOOL_SCHEMA");
    }
    for (const item of schema.enum) out.push(str(5, validatedString(item, TOOL_LIMITS.bytes)));
  }
  if (schema.type === "array") {
    if (!schema.items) reject("UNSUPPORTED_TOOL_SCHEMA");
    out.push(message(6, schemaWire(asSchema(schema.items), budget, depth + 1)));
  }
  if (schema.type === "object") {
    const props = schema.properties ?? {};
    for (const [name, child] of Object.entries(props)) {
      out.push(
        message(
          7,
          cat(
            str(1, validatedString(name, 256, false)),
            message(2, schemaWire(asSchema(child), budget, depth + 1))
          )
        )
      );
    }
    if (schema.required !== undefined) {
      if (
        !Array.isArray(schema.required) ||
        new Set(schema.required).size !== schema.required.length
      ) {
        reject("UNSUPPORTED_TOOL_SCHEMA");
      }
      for (const name of schema.required) {
        if (typeof name !== "string" || !Object.hasOwn(props, name))
          reject("UNSUPPORTED_TOOL_SCHEMA");
        out.push(str(8, name));
      }
    }
    // Not a guessed wire flag: additionalProperties is enforced locally on calls.
    if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
      reject("UNSUPPORTED_TOOL_SCHEMA");
    }
  }
  return cat(...out);
}

interface CompiledTool {
  name: string;
  parameters: ToolSchema;
  declaration: Buffer;
}

function compileTools(tools: readonly unknown[], toolChoice: unknown): Map<string, CompiledTool> {
  const choice = toolChoice ?? "auto";
  if (choice !== "auto" && choice !== "none") reject("UNSUPPORTED_TOOL_CHOICE");
  if (!Array.isArray(tools) || tools.length > TOOL_LIMITS.tools) reject("TOOL_SIZE_LIMIT");
  const registry = new Map<string, CompiledTool>();
  const budget: SchemaBudget = { nodes: 0 };
  let size = 0;
  for (const tool of tools) {
    if (!isObject(tool) || tool.type !== "function" || !isObject(tool.function)) {
      reject("UNSUPPORTED_TOOL_TYPE");
    }
    const fn = tool.function;
    if (
      typeof fn.name !== "string" ||
      !/^[A-Za-z0-9_-]{1,64}$/.test(fn.name) ||
      registry.has(fn.name)
    ) {
      reject("INVALID_TOOL_DECLARATION");
    }
    const parameters =
      fn.parameters === undefined
        ? ({ type: "object", properties: {} } as ToolSchema)
        : asSchema(fn.parameters);
    if (parameters.type !== "object") reject("UNSUPPORTED_TOOL_SCHEMA");
    const parameterBytes = schemaWire(parameters, budget);
    const declaration = cat(
      str(1, fn.name),
      ...(fn.description === undefined
        ? []
        : [str(2, validatedString(fn.description, TOOL_LIMITS.bytes))]),
      message(3, parameterBytes)
    );
    size += declaration.length;
    if (size > TOOL_LIMITS.bytes) reject("TOOL_SIZE_LIMIT");
    registry.set(fn.name, { name: fn.name, parameters, declaration });
  }
  return choice === "none" ? new Map() : registry;
}

export interface NativeInitialInput {
  userText: string;
  images?: readonly NativeImageAttachment[];
  systemText?: string;
  tools?: readonly unknown[];
  toolChoice?: unknown;
  modeCategory: number;
  thinkingLevel: number;
  temporaryChat?: boolean;
  smartModelSelection?: boolean;
  clientMetadata?: RequestMetadataInput;
  turnSequence?: number;
  operationFeature?: boolean;
}

/**
 * Build the first ProcessQuery frame: turn sequence + InitialRequest (field
 * 1000) containing request metadata (field 1), the ClientGenerate template
 * (field 1001) and the empty extension markers the native client sends.
 */
export function buildNativeInitial({
  userText,
  images = [],
  systemText,
  tools = [],
  toolChoice = "auto",
  modeCategory,
  thinkingLevel,
  temporaryChat = true,
  smartModelSelection = false,
  clientMetadata,
  turnSequence = 1,
  operationFeature = true,
}: NativeInitialInput): Buffer {
  if (!Number.isSafeInteger(turnSequence) || turnSequence < 1 || turnSequence > 0x7fff_ffff) {
    reject("INVALID_TURN_SEQUENCE");
  }
  if (!Number.isSafeInteger(modeCategory) || modeCategory < 0 || modeCategory > 255) {
    reject("INVALID_MODE_CATEGORY");
  }
  if (!Number.isSafeInteger(thinkingLevel) || thinkingLevel < 0 || thinkingLevel > 4) {
    reject("INVALID_THINKING_LEVEL");
  }
  const registry = compileTools(tools, toolChoice);
  const metadata: RequestMetadataInput = {
    clientType: 21,
    languageCode: "en",
    interfaceLanguageCode: "en",
    clientVersion: "1.135.1.1291",
    clientInstanceId: randomUUID(),
    triggerType: 1,
    uiSource: 1,
    ...clientMetadata,
  };
  const base = buildClientGenerate({
    userText,
    images,
    systemText,
    clientMetadata: metadata,
    temporaryChat,
    smartModelSelection,
  });
  const desktopInfo = cat(...[...registry.values()].map((tool) => message(2, tool.declaration)));
  const template = cat(
    ...parse(base).map((field) =>
      field.number === 15 ? varintField(15, registry.size ? 0 : 1) : field.raw
    ),
    varintField(47, modeCategory),
    varintField(48, thinkingLevel),
    ...(registry.size ? [message(51, cat(str(1, ""), message(3, desktopInfo)))] : [])
  );
  const initial = cat(
    message(1, buildRequestMetadata(metadata)),
    message(1001, message(1, template)),
    message(1004, Buffer.alloc(0)),
    ...(registry.size && operationFeature ? [message(1009, Buffer.alloc(0))] : [])
  );
  return cat(varintField(1, turnSequence), message(1000, initial));
}
