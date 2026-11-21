import { z } from "zod";

function range(min: number, max: number) {
  return z
    .string()
    .regex(/^\d{1,4}(-\d{1,4})?$/)
    .refine((value) => {
      const [lower, upper = lower] = value.split("-").map(Number);
      return lower >= min && upper >= lower && upper <= max;
    }, "Fragment range is outside supported bounds");
}
export const FragmentSchema = z
  .object({
    packets: z.literal("tlshello"),
    length: range(1, 4096),
    interval: range(0, 1000),
  })
  .strict();
export type FragmentOptions = z.infer<typeof FragmentSchema>;

/** Insert only an application-owned dialer, never accept an outbound reference from a source. */
export function fragmentedXrayOutbound(
  id: string,
  outbound: Record<string, unknown>,
  fragment: FragmentOptions
): Record<string, unknown>[] {
  const validated = FragmentSchema.parse(fragment);
  const stream = outbound.streamSettings as Record<string, unknown> | undefined;
  if (
    !stream ||
    !["tls", "reality"].includes(String(stream.security)) ||
    !["tcp", "raw", "ws", "httpupgrade"].includes(String(stream.network || "tcp"))
  )
    throw new Error(
      "Managed fragmentation requires Xray-compatible TLS or REALITY over TCP or WebSocket"
    );
  const sockopt = (stream.sockopt || {}) as Record<string, unknown>;
  if (sockopt.dialerProxy) throw new Error("Managed fragmentation cannot replace a source dialer");
  return [
    {
      ...outbound,
      tag: `out-${id}`,
      streamSettings: { ...stream, sockopt: { ...sockopt, dialerProxy: `fragment-${id}` } },
    },
    {
      tag: `fragment-${id}`,
      protocol: "freedom",
      settings: { domainStrategy: "AsIs", fragment: validated },
    },
  ];
}
