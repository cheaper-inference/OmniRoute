import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  listOpenAIBillingOrganizations,
  getOpenAIBillingKey,
  saveOpenAIBillingKey,
  deleteOpenAIBillingKey,
  OPENAI_ORGANIZATION_ID,
} from "@/lib/db/openaiBilling";
import { clearOpenAICostCache, fetchOpenAICosts } from "@/lib/usage/openaiCosts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const organizationId = z.string().trim().regex(OPENAI_ORGANIZATION_ID);
const periodSchema = z.enum(["7d", "30d", "month"]);
const noStore = { "Cache-Control": "no-store" };
function failure(status: number, message: string) {
  return NextResponse.json(buildErrorBody(status, message), { status, headers: noStore });
}

export async function GET(request: Request) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const period = periodSchema.safeParse(new URL(request.url).searchParams.get("period") || "month");
  if (!period.success) return failure(400, "Invalid billing period");
  try {
    const organizations = await Promise.all(
      listOpenAIBillingOrganizations().map(async (id) => {
        try {
          const key = getOpenAIBillingKey(id);
          if (!key) throw new Error("Missing credential");
          return {
            organizationId: id,
            costs: await fetchOpenAICosts(id, key, period.data),
          };
        } catch {
          // Never expose provider responses or credentials, and never display a failed fetch as zero.
          return { organizationId: id, costs: null, error: "billing_unavailable" };
        }
      })
    );
    return NextResponse.json({ organizations, period: period.data }, { headers: noStore });
  } catch {
    return failure(500, "Unable to read OpenAI billing configuration");
  }
}

export async function PUT(request: Request) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const parsed = z
    .object({ organizationId, apiKey: z.string().trim().min(10).max(1024) })
    .strict()
    .safeParse(await request.json().catch(() => null));
  if (!parsed.success) return failure(400, "Organization ID and Admin API key are required");
  try {
    const ids = listOpenAIBillingOrganizations();
    if (!ids.includes(parsed.data.organizationId) && ids.length >= 10)
      return failure(400, "At most ten billing organizations are supported");
    saveOpenAIBillingKey(parsed.data.organizationId, parsed.data.apiKey);
    clearOpenAICostCache();
    return NextResponse.json({ saved: true }, { headers: noStore });
  } catch {
    return failure(500, "Unable to securely save billing credentials. Check storage encryption.");
  }
}

export async function DELETE(request: Request) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const id = organizationId.safeParse(new URL(request.url).searchParams.get("organizationId"));
  if (!id.success) return failure(400, "Invalid organization ID");
  try {
    deleteOpenAIBillingKey(id.data);
    clearOpenAICostCache();
    return NextResponse.json({ removed: true }, { headers: noStore });
  } catch {
    return failure(500, "Unable to remove billing credentials");
  }
}
