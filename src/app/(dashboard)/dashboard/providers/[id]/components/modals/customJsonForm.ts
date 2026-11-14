/**
 * Dashboard form state for custom JSON API nodes (apiType "custom-json").
 *
 * The form edits the same config the API stores (`customJson` on POST/PUT
 * /api/provider-nodes) and validates it with the SAME Zod schema the server uses
 * (`customJsonConfigSchema`), so a config the form accepts is one the server accepts.
 *
 * Two template editors:
 * - "fields": `model` + `messages` are always sent; the operator adds optional fields
 *   (text/placeholder or JSON value). An untouched empty row is ignored.
 * - "json": the full request template as JSON, for endpoints with another schema.
 */
import {
  CUSTOM_JSON_API_TYPE,
  CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE,
  CUSTOM_JSON_DEFAULTS,
} from "@omniroute/open-sse/config/customJson.ts";
import {
  customJsonConfigSchema,
  type CustomJsonConfig,
} from "@omniroute/open-sse/utils/customJson.ts";

export { CUSTOM_JSON_API_TYPE };

export type CustomJsonFieldType = "text" | "json";
export type CustomJsonTemplateMode = "fields" | "json";

export type CustomJsonExtraField = {
  id: string;
  name: string;
  type: CustomJsonFieldType;
  value: string;
};

export type CustomJsonFormState = {
  method: string;
  authType: string;
  authHeader: string;
  responsePath: string;
  templateMode: CustomJsonTemplateMode;
  extraFields: CustomJsonExtraField[];
  requestTemplateText: string;
};

/** A form problem as an i18n key (providers namespace) plus its interpolation values. */
export type CustomJsonFormError = { key: string; values?: Record<string, string> };

type JsonRecord = Record<string, unknown>;

const DEFAULT_FIELD_NAMES = Object.keys(CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE);

class FormProblem extends Error {
  constructor(readonly problem: CustomJsonFormError) {
    super(problem.key);
  }
}

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function usesDefaultFields(template: JsonRecord): boolean {
  return Object.entries(CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE).every(
    ([name, value]) => template[name] === value
  );
}

let fieldSeq = 0;
export function newCustomJsonField(
  name = "",
  type: CustomJsonFieldType = "text",
  value = ""
): CustomJsonExtraField {
  fieldSeq += 1;
  return { id: `cj-field-${fieldSeq}`, name, type, value };
}

function extraFieldsOf(template: JsonRecord): CustomJsonExtraField[] {
  return Object.entries(template)
    .filter(([name]) => !DEFAULT_FIELD_NAMES.includes(name))
    .map(([name, value]) =>
      typeof value === "string"
        ? newCustomJsonField(name, "text", value)
        : newCustomJsonField(name, "json", JSON.stringify(value))
    );
}

/** Form state for a stored config (or the defaults). A non-standard template opens as JSON. */
export function createCustomJsonForm(config?: unknown): CustomJsonFormState {
  const stored = isRecord(config) ? config : {};
  const template = isRecord(stored.requestTemplate)
    ? stored.requestTemplate
    : { ...CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE };
  const fieldsMode = usesDefaultFields(template);
  const text = (value: unknown, fallback: string) =>
    typeof value === "string" && value ? value : fallback;
  return {
    method: text(stored.method, CUSTOM_JSON_DEFAULTS.method),
    authType: text(stored.authType, CUSTOM_JSON_DEFAULTS.authType),
    authHeader: text(stored.authHeader, CUSTOM_JSON_DEFAULTS.authHeader),
    responsePath: text(stored.responsePath, CUSTOM_JSON_DEFAULTS.responsePath),
    templateMode: fieldsMode ? "fields" : "json",
    extraFields: fieldsMode ? extraFieldsOf(template) : [],
    requestTemplateText: JSON.stringify(template, null, 2),
  };
}

/** `model` + `messages` plus the named rows. Throws FormProblem on a bad row. */
function buildFieldsTemplate(fields: CustomJsonExtraField[]): JsonRecord {
  const template: JsonRecord = { ...CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE };
  const names = new Set(DEFAULT_FIELD_NAMES);
  for (const field of fields) {
    const name = field.name.trim();
    // An added row left untouched is optional and never blocks saving.
    if (!name && !field.value.trim()) continue;
    if (!name) throw new FormProblem({ key: "customJsonFieldNameRequired" });
    if (names.has(name)) {
      throw new FormProblem({ key: "customJsonFieldDuplicate", values: { name } });
    }
    let value: unknown = field.value;
    if (field.type === "json") {
      try {
        value = JSON.parse(field.value);
      } catch {
        throw new FormProblem({ key: "customJsonFieldInvalidJson", values: { name } });
      }
    }
    names.add(name);
    // Own data property even for a name like "__proto__", so the server schema sees (and
    // rejects) it instead of the assignment silently swapping the object's prototype.
    Object.defineProperty(template, name, {
      value,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return template;
}

function templateOf(form: CustomJsonFormState): unknown {
  if (form.templateMode === "fields") return buildFieldsTemplate(form.extraFields);
  try {
    return JSON.parse(form.requestTemplateText);
  } catch {
    throw new FormProblem({ key: "customJsonTemplateInvalidJson" });
  }
}

/**
 * Validate the form with the server's Zod schema. Returns the config to send as
 * `customJson`, or the problem to show.
 */
export function parseCustomJsonForm(
  form: CustomJsonFormState
):
  | { config: CustomJsonConfig; error?: undefined }
  | { config?: undefined; error: CustomJsonFormError } {
  let requestTemplate: unknown;
  try {
    requestTemplate = templateOf(form);
  } catch (error) {
    if (error instanceof FormProblem) return { error: error.problem };
    throw error;
  }
  const parsed = customJsonConfigSchema.safeParse({
    method: form.method,
    authType: form.authType,
    authHeader: form.authHeader.trim() || undefined,
    requestTemplate,
    responsePath: form.responsePath.trim() || undefined,
  });
  if (parsed.success) return { config: parsed.data };
  const issue = parsed.error.issues[0];
  const field = issue?.path?.length ? `${issue.path.join(".")}: ` : "";
  return {
    error: { key: "customJsonConfigInvalid", values: { detail: `${field}${issue?.message}` } },
  };
}

/**
 * Switch the template editor. Fields → JSON carries the current rows over; JSON → fields
 * only when the template still sends the default `model` + `messages` (otherwise the
 * switch is refused so nothing is silently dropped).
 */
export function switchCustomJsonTemplateMode(
  form: CustomJsonFormState,
  mode: CustomJsonTemplateMode
): { form: CustomJsonFormState; error?: CustomJsonFormError } {
  if (mode === form.templateMode) return { form };
  if (mode === "json") {
    let template: JsonRecord = { ...CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE };
    try {
      template = buildFieldsTemplate(form.extraFields);
    } catch (error) {
      if (error instanceof FormProblem) return { form, error: error.problem };
      throw error;
    }
    return {
      form: {
        ...form,
        templateMode: "json",
        requestTemplateText: JSON.stringify(template, null, 2),
      },
    };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(form.requestTemplateText);
  } catch {
    return { form, error: { key: "customJsonTemplateInvalidJson" } };
  }
  if (!isRecord(parsed) || !usesDefaultFields(parsed)) {
    return { form, error: { key: "customJsonFieldsModeUnavailable" } };
  }
  return { form: { ...form, templateMode: "fields", extraFields: extraFieldsOf(parsed) } };
}
