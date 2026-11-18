import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { GLOBAL_SKILL_OWNER_ID, skillRegistry } from "@/lib/skills/registry";
import { getSkillsProviderSetting } from "@/lib/skills/providerSettings";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const marketplaceInstallSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(1024),
  skillMdContent: z.string().min(1),
  version: z.string().default("1.0.0"),
  sourceUrl: z.string().optional(),
});

export async function POST(request: Request) {
  // The installed skill is global and injected into every key's requests, so this
  // stays authenticated when login is off.
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const provider = await getSkillsProviderSetting();
    if (provider !== "skillsmp") {
      return NextResponse.json(
        {
          error:
            "Active skills provider is not SkillsMP. Switch provider in Settings → Memory & Skills.",
        },
        { status: 409 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const validation = validateBody(marketplaceInstallSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const { name, description, skillMdContent, version } = validation.data;

    const skill = await skillRegistry.register({
      name,
      version,
      description,
      schema: { input: { content: "string" }, output: { result: "string" } },
      handler: `// Installed from SkillsMP\n// SKILL.md content:\n${skillMdContent}`,
      apiKeyId: GLOBAL_SKILL_OWNER_ID,
      enabled: true,
      mode: "auto",
      sourceProvider: "skillsmp",
      tags: ["popular", "marketplace"],
      installCount: 1,
    });

    return NextResponse.json({ success: true, id: skill.id });
  } catch (err: unknown) {
    const error = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error }, { status: 500 });
  }
}
