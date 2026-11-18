/** Upload admission is shared transport state, not evidence that a model/account is unhealthy. */
export function isCIPayloadQuotaFailure(
  provider: string | null,
  status: number,
  code: string | null | undefined
): boolean {
  return (
    (provider === "cheaperinference" || provider === "cinf") &&
    status === 429 &&
    code === "payload_upload_quota"
  );
}
