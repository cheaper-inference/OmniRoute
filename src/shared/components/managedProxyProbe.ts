/** Probe an unsaved managed source without invoking persistence or assignment endpoints. */
export async function probeManagedSource(core: string, sourceLink: string, failureMessage: string) {
  const response = await fetch("/api/services/managed-proxy", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "test", core, sourceLink }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || failureMessage);
  return result;
}
