/**
 * An automatic OAuth callback (postMessage / BroadcastChannel / localStorage relay) may only
 * complete the attempt it belongs to. When the active attempt carries a state, the relayed
 * callback must echo exactly that state: a callback with no state at all is not proof it came
 * from this attempt, so it is rejected instead of being exchanged (GHSA-3fxv-j4h8-9mgg).
 */
export function isCallbackStateAcceptable(
  expectedState: string | null | undefined,
  receivedState: string | null | undefined
): boolean {
  if (!expectedState) return true; // no state issued for this attempt, nothing to bind to
  return typeof receivedState === "string" && receivedState === expectedState;
}

/**
 * Providers whose redirect carries no `state` and no other per-attempt binding (Cline returns
 * `?code=` only). A relayed callback for them cannot be tied to the attempt the operator started,
 * so any page could relay an attacker's code into the waiting modal (login CSRF, #15688). They
 * complete only by the operator pasting the callback URL into the modal by hand.
 * Zed Hosted is not here: its token is encrypted to the attempt's one-time RSA key.
 */
export const MANUAL_CALLBACK_ONLY_PROVIDERS: ReadonlySet<string> = new Set(["cline"]);

/** Whether the modal may complete this provider's attempt from a relayed (automatic) callback. */
export function acceptsRelayedCallback(provider: string | null | undefined): boolean {
  return !MANUAL_CALLBACK_ONLY_PROVIDERS.has(String(provider ?? ""));
}
