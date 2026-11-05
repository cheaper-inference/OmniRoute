export function isMusePolicyRefusal(status: number | undefined, text: string | null): boolean {
  return (
    status === 403 &&
    text !== null &&
    (text.includes("This API key is billed to a Muse Code subscription.") ||
      text.includes("Muse Code subscriptions cover requests from the Muse Code client only."))
  );
}
