export function isTransientRefreshError(err: unknown): boolean {
  const errObj: Record<string, unknown> =
    typeof err === "object" && err !== null ? (err as Record<string, unknown>) : {};
  const errName = err instanceof Error ? err.name : String(errObj.name ?? "");
  const errMsg = err instanceof Error ? err.message : String(err);
  const errCode = String(errObj.code ?? "");
  const cause = errObj.cause;
  const errCause = cause instanceof Error ? cause.message : "";
  const errCauseCode = String(
    typeof cause === "object" && cause !== null && "code" in cause ? cause.code : ""
  );
  return (
    errName === "AbortError" ||
    errName === "TimeoutError" ||
    /ETIMEDOUT|ECONNREFUSED|ECONNRESET|ECONNABORTED|EPIPE|EHOSTUNREACH|ENETUNREACH|ENOTCONN|ENOTFOUND|EAI_AGAIN|ERR_NETWORK|ERR_SOCKET|ERR_CONNECTION|socket hang up|fetch failed/i.test(
      `${errMsg} ${errCause}`
    ) ||
    /ETIMEDOUT|ECONNREFUSED|ECONNRESET|ECONNABORTED|EPIPE|EHOSTUNREACH|ENETUNREACH|ENOTCONN|ENOTFOUND|EAI_AGAIN|ERR_NETWORK|ERR_SOCKET|ERR_CONNECTION/i.test(
      `${errCode} ${errCauseCode}`
    )
  );
}
