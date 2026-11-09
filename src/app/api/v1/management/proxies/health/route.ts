import { handleProxyHealthGet } from "@/lib/proxyHealth/healthRoute";

export async function GET(request: Request) {
  return handleProxyHealthGet(request);
}
