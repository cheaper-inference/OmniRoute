import { NextRequest, NextResponse } from "next/server";
import { parseIntegerQueryParam } from "@/lib/api/queryIntegerParam";
export const dynamic = "force-dynamic";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  listSemanticCacheEntries,
  deleteSemanticCacheBySignature,
  deleteSemanticCacheByModel,
} from "@/lib/db/semanticCache";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const parsedPage = parseIntegerQueryParam(searchParams, "page", 1);
    if (parsedPage.ok === false) return parsedPage.response;
    const parsedLimit = parseIntegerQueryParam(searchParams, "limit", 20);
    if (parsedLimit.ok === false) return parsedLimit.response;
    const page = Math.max(1, parsedPage.value);
    const limit = Math.min(100, Math.max(1, parsedLimit.value));
    const search = searchParams.get("search") || "";
    const model = searchParams.get("model") || "";
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const { entries, total } = listSemanticCacheEntries({
      page,
      limit,
      search,
      model,
      sortBy,
      sortOrder,
    });

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const signature = searchParams.get("signature");
    const model = searchParams.get("model");

    if (signature) {
      const { deleted } = deleteSemanticCacheBySignature(signature);
      return NextResponse.json({ ok: true, deleted });
    }

    if (model) {
      const { deleted } = deleteSemanticCacheByModel(model);
      return NextResponse.json({ ok: true, deleted });
    }

    return NextResponse.json({ error: "Provide signature or model parameter" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
