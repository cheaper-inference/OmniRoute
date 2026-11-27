import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getPluginByName, updatePluginConfig } from "@/lib/db/plugins";
import { validatePluginConfig, type ConfigField } from "@/lib/plugins/manifest";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";

const NO_CONFIG_SCHEMA_MESSAGE = "Plugin does not declare any configurable keys";

function parseConfigSchema(raw: string | null | undefined): Record<string, ConfigField> {
  try {
    const parsed: unknown = JSON.parse(raw || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, ConfigField>;
    }
  } catch {
    // A corrupt stored schema declares nothing: fall through to the empty schema.
  }
  return {};
}

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/plugins/[name]/config — Get plugin configuration
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;
  const plugin = getPluginByName(name);

  if (!plugin) {
    return NextResponse.json(buildErrorBody(404, `Plugin '${name}' not found`), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  return NextResponse.json(
    {
      config: JSON.parse(plugin.config || "{}"),
      configSchema: JSON.parse(plugin.configSchema || "{}"),
    },
    { headers: CORS_HEADERS }
  );
}

/**
 * PUT /api/plugins/[name]/config — Update plugin configuration
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const schema = z.object({
    config: z.record(z.string(), z.unknown()),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid request"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const plugin = getPluginByName(name);
  if (!plugin) {
    return NextResponse.json(buildErrorBody(404, `Plugin '${name}' not found`), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  // Only keys the plugin declares in its configSchema may be stored. A plugin without a
  // schema has no configurable keys, so the write is refused instead of persisting
  // arbitrary caller-chosen keys.
  const configSchema = parseConfigSchema(plugin.configSchema);
  if (Object.keys(configSchema).length === 0) {
    return NextResponse.json(buildErrorBody(400, NO_CONFIG_SCHEMA_MESSAGE), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
  const validation = validatePluginConfig(parsed.data.config, configSchema);
  if (validation.valid === false) {
    return NextResponse.json(buildErrorBody(400, validation.errors.join("; ")), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  updatePluginConfig(name, parsed.data.config);

  return NextResponse.json(
    { success: true, config: parsed.data.config },
    { headers: CORS_HEADERS }
  );
}
