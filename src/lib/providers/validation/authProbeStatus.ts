export function evaluateAuthProbeStatus(response: { status: number; ok: boolean }): {
  valid: boolean;
  error: string | null;
} {
  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  if (
    response.ok ||
    response.status === 400 ||
    response.status === 422 ||
    response.status === 429
  ) {
    return { valid: true, error: null };
  }

  if (response.status >= 500) {
    return { valid: false, error: `Provider unavailable (${response.status})` };
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
}
