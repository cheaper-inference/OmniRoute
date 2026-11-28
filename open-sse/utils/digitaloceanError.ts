/** Serverless Inference errors use a flat { id, message, request_id? } envelope. */
export function readDigitalOceanError(body: unknown) {
  const record =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null;
  return {
    message: typeof record?.message === "string" ? record.message : undefined,
    code: typeof record?.id === "string" ? record.id : undefined,
  };
}

export function isDigitalOceanPausedKey(
  provider: string | null | undefined,
  status: number,
  message: string
): boolean {
  return (
    provider === "digitalocean" &&
    status === 403 &&
    message.toLowerCase().includes("this resource has been blocked")
  );
}
