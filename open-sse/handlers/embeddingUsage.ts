export async function recordEmbeddingConsumption(
  runtime: {
    apiKeyId?: string | null;
    connectionId?: string | null;
    provider: string;
    model: string | null;
  },
  data: { usage?: { prompt_tokens?: number; total_tokens?: number } },
  requestCount: number
): Promise<void> {
  if (!runtime.apiKeyId || !runtime.connectionId) return;
  try {
    const { scheduleRecordConsumption } = await import("@/lib/quota/spendRecorder");
    scheduleRecordConsumption({
      apiKeyId: runtime.apiKeyId,
      connectionId: runtime.connectionId,
      provider: runtime.provider,
      model: runtime.model || undefined,
      cost: {
        tokens: data.usage?.prompt_tokens || data.usage?.total_tokens || 0,
        requests: requestCount,
      },
    });
  } catch {
    // Quota accounting is fail-open.
  }
}
