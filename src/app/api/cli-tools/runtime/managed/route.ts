import { handleManagedCliRequest } from "@/lib/cliTools/managedCliApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
  return handleManagedCliRequest(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleManagedCliRequest(request);
}
