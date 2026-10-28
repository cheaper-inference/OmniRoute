/**
 * One-hop egress probe after an OpenCode free-tier refusal (OPENCODE_FREE_TIER_EGRESS_PROBE,
 * default off).
 *
 * The upstream answers the same 403 FreeTierError body whether it refused the request (client
 * identity or tool shape: every egress gets the same verdict) or the egress IP it came from (a
 * flagged proxy: another egress answers 200). The text cannot tell the two apart, so the probe
 * asks the upstream: the same request goes out once more through a DIFFERENT proxy — another
 * account's own proxy, else another member of the ambient connection pool. Only a 200 on the
 * probe is evidence against the first egress; then that egress is set aside in the proxy refusal
 * memory and the probe response is served. Any other probe answer means the refusal is about
 * the request: the probe body is discarded, nothing is recorded and the caller returns the
 * original refusal exactly as before.
 *
 * Never a direct connection: the probe only ever dispatches through a proxy config carrying a
 * host and a port, and a refusal that itself went out direct (no proxy, no pool) is never probed
 * — there is no proxy to set aside, so that path stays byte-for-byte unchanged. Bounded to one
 * probe per request (the request-shape replay can run the executor twice for one request).
 */
import { isOpencodeFreeTierRefusal, poolReselectKeyOf } from "./opencodeGeoBlock.ts";
import { currentRequestContext } from "./opencodeRequestContext.ts";
import { discardResponseBody } from "./opencodeResponseBody.ts";
import { DIRECT_EGRESS_SENTINEL } from "./opencodeEgressThrottle.ts";
import {
  describeEgressForLog,
  isProxyAvoided,
  proxyEgressKey,
} from "../utils/proxyRefusalMemory.ts";
import type { ScopedAccount } from "./opencodeAccountScope.ts";
import type { ExecutorLog } from "./base.ts";

type ProbeProxy = NonNullable<ScopedAccount["proxy"]>;
type ProbeResult = { response: Response };

interface FreeTierEgressProbeArgs<A extends ScopedAccount, R extends ProbeResult> {
  /** The refusal the caller would otherwise return (after the observed-tools retry). */
  refusal: ProbeResult;
  /** The account that took the refusal. */
  account: A;
  /** Every account of this request; other accounts' own proxies are probe candidates. */
  accounts: readonly A[];
  /**
   * Refusal-memory key of one account's egress (the loop's `keyOfMember`): its own proxy, else
   * the ambient pool member it was served through; null or the direct sentinel when direct.
   */
  keyOfMember: (account: A) => string | null;
  /** Dispatch the request once through `proxy` (always a concrete proxy config). */
  dispatch: (proxy: ProbeProxy) => Promise<R>;
  /** Set the refused egress aside; called only after a 200 probe. */
  recordRefused: () => void;
  /** Health note for the account whose proxy served the probe. */
  noteServed?: (account: A) => void;
  log: ExecutorLog | null | undefined;
  cid: string;
}

function isProbeProxy(candidate: unknown): candidate is ProbeProxy {
  return poolReselectKeyOf(candidate) !== null;
}

async function readRefusalText(refusal: ProbeResult): Promise<string | null> {
  try {
    return await refusal.response.clone().text();
  } catch {
    return null;
  }
}

/** Another account's own proxy first (rotation order), else another pool member. */
async function pickProbeEgress<A extends ScopedAccount, R extends ProbeResult>(
  args: FreeTierEgressProbeArgs<A, R>,
  refusedKey: string
): Promise<{ proxy: ProbeProxy; account: A } | null> {
  const nowMs = Date.now();
  for (const other of args.accounts) {
    if (other === args.account || other.proxy === null || other.cooldownUntil > nowMs) continue;
    const memberKey = proxyEgressKey(other.proxy);
    if (memberKey === null || memberKey === refusedKey || isProxyAvoided(memberKey)) continue;
    return { proxy: other.proxy, account: other };
  }
  const reselect = currentRequestContext()?.reselectPoolMember;
  if (typeof reselect !== "function") return null;
  const next = await reselect().catch(() => null);
  if (!isProbeProxy(next)) return null;
  const nextKey = proxyEgressKey(next);
  if (nextKey === null || nextKey === refusedKey || isProxyAvoided(nextKey)) return null;
  return { proxy: next, account: args.account };
}

/**
 * Probe one other egress after a free-tier refusal. Returns the probe result when it answered
 * 200 (the refused egress is then set aside), or null when the caller must keep its current
 * path: flag off, not a FreeTierError, a direct first egress, nothing else to try, already
 * probed this request, or a probe that did not answer 200.
 */
export async function probeFreeTierRefusalEgress<A extends ScopedAccount, R extends ProbeResult>(
  enabled: boolean,
  args: FreeTierEgressProbeArgs<A, R>
): Promise<R | null> {
  if (!enabled) return null;
  const { refusal, account, log, cid } = args;
  const status = refusal.response.status;
  if (status !== 403 && status !== 451) return null;
  const refusedKey = args.keyOfMember(account);
  if (refusedKey === null || refusedKey === DIRECT_EGRESS_SENTINEL) return null;
  const context = currentRequestContext();
  if (context?.freeTierEgressProbed) return null;
  if (!isOpencodeFreeTierRefusal(status, await readRefusalText(refusal))) return null;
  const picked = await pickProbeEgress(args, refusedKey);
  if (!picked) return null;
  if (context) context.freeTierEgressProbed = true;
  const refusedLabel = `(proxy ${describeEgressForLog(refusedKey)})`;
  const probeKey = `(proxy ${describeEgressForLog(proxyEgressKey(picked.proxy) ?? "")})`;
  log?.warn?.(
    "OPENCODE",
    `${cid}free-tier refusal ${status} ${refusedLabel}, probing once ${probeKey}…`
  );
  let probe: R;
  try {
    probe = await args.dispatch(picked.proxy);
  } catch (error) {
    log?.warn?.(
      "OPENCODE",
      `${cid}free-tier egress probe ${probeKey} failed (${error instanceof Error ? error.name : "error"}), returning the refusal`
    );
    return null;
  }
  if (probe.response.status !== 200) {
    discardResponseBody(probe.response);
    log?.warn?.(
      "OPENCODE",
      `${cid}free-tier egress probe ${probeKey} answered ${probe.response.status}: request-scoped refusal, nothing recorded`
    );
    return null;
  }
  args.recordRefused();
  args.noteServed?.(picked.account);
  discardResponseBody(refusal.response);
  log?.warn?.(
    "OPENCODE",
    `${cid}free-tier egress probe ${probeKey} answered 200: ${refusedLabel} set aside, serving the probe`
  );
  return probe;
}
