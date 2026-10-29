import { handleBulkProxyAssignment } from "@/lib/api/bulkProxyAssignment";

export async function PUT(request: Request) {
  return handleBulkProxyAssignment(request);
}
