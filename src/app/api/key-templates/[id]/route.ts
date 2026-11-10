import {
  requireCredentialForManagementScopedKey,
  requireManagementAuth,
} from "@/lib/api/requireManagementAuth";
import { deleteKeyTemplate, getKeyTemplate, updateKeyTemplate } from "@/lib/db/keyTemplates";
import { updateKeyTemplateSchema } from "@/shared/validation/schemas/keyTemplates";
import {
  readJsonBody,
  templateError,
  templateFailure,
  templateJson,
  validationError,
} from "@/lib/api/keyTemplateHttp";

type Params = { params: Promise<{ id: string }> };

// GET /api/key-templates/[id] → { template, referenceIssues }
export async function GET(request: Request, { params }: Params) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const found = getKeyTemplate(id);
    if (!found) return templateError(404, "TEMPLATE_NOT_FOUND", "Template not found");
    return templateJson(found);
  } catch (error) {
    return templateFailure(error, "Error reading key template");
  }
}

// PATCH /api/key-templates/[id] → { template }; a stale revision returns 409.
export async function PATCH(request: Request, { params }: Params) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const read = await readJsonBody(request);
  if (read.ok === false) return read.response;
  const parsed = updateKeyTemplateSchema.safeParse(read.body);
  if (!parsed.success) return validationError(parsed.error);
  try {
    if (parsed.data.policy) {
      const scopeAuthError = await requireCredentialForManagementScopedKey(
        request,
        parsed.data.policy.key.scopes
      );
      if (scopeAuthError) return scopeAuthError;
    }
    const { id } = await params;
    const template = await updateKeyTemplate(id, parsed.data);
    return templateJson({ template });
  } catch (error) {
    return templateFailure(error, "Error updating key template");
  }
}

// DELETE /api/key-templates/[id] → { success: true }. Keys created from it are unaffected.
export async function DELETE(request: Request, { params }: Params) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const deleted = await deleteKeyTemplate(id);
    if (!deleted) return templateError(404, "TEMPLATE_NOT_FOUND", "Template not found");
    return templateJson({ success: true });
  } catch (error) {
    return templateFailure(error, "Error deleting key template");
  }
}
