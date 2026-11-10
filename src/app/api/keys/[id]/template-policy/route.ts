import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { previewKeyTemplatePolicy } from "@/lib/db/keyTemplates";
import { templateFailure, templateJson } from "@/lib/api/keyTemplateHttp";

// GET /api/keys/[id]/template-policy → { policy, warnings, referenceIssues }
// Secret-free preview for "Save as template": no secret, hash, prefix, identity,
// counters or history are read into the response.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    return templateJson(previewKeyTemplatePolicy(id));
  } catch (error) {
    return templateFailure(error, "Error previewing key template policy");
  }
}
