import {
  requireCredentialForManagementScopedKey,
  requireManagementAuth,
} from "@/lib/api/requireManagementAuth";
import {
  createKeyTemplate,
  createKeyTemplateFromKey,
  listKeyTemplates,
  previewKeyTemplatePolicy,
} from "@/lib/db/keyTemplates";
import { createKeyTemplateSchema } from "@/shared/validation/schemas/keyTemplates";
import {
  readJsonBody,
  templateFailure,
  templateJson,
  validationError,
} from "@/lib/api/keyTemplateHttp";

// GET /api/key-templates → { templates }
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return templateJson(listKeyTemplates());
  } catch (error) {
    return templateFailure(error, "Error listing key templates");
  }
}

// POST /api/key-templates → { template, warnings }
// Body: { name, description?, policy } or { name, description?, fromKeyId, acknowledge? }.
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const read = await readJsonBody(request);
  if (read.ok === false) return read.response;
  const parsed = createKeyTemplateSchema.safeParse(read.body);
  if (!parsed.success) return validationError(parsed.error);
  const { name, description, policy, fromKeyId, acknowledge } = parsed.data;
  try {
    // A policy granting management scope keeps the credential requirement of key creation.
    const captured = policy ? null : previewKeyTemplatePolicy(fromKeyId!);
    const scopes = policy ? policy.key.scopes : captured!.policy.key.scopes;
    const scopeAuthError = await requireCredentialForManagementScopedKey(request, scopes);
    if (scopeAuthError) return scopeAuthError;
    if (policy) {
      const template = await createKeyTemplate({ name, description, policy });
      return templateJson({ template, warnings: [] }, 201);
    }
    const result = await createKeyTemplateFromKey(
      {
        name,
        description,
        fromKeyId: fromKeyId!,
        acknowledge,
      },
      captured!
    );
    return templateJson(result, 201);
  } catch (error) {
    return templateFailure(error, "Error creating key template");
  }
}
