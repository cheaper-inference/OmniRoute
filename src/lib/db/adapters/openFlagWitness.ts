import type { OpenWitness } from "./types";

/**
 * The tri-state answer, plus whether the value carried one at all.
 *
 * `state` uses the same vocabulary as `OpenWitness` so a caller can pass it
 * through unchanged. `understood` is what separates "the adapter answered
 * closed" from "the adapter answered with something this code does not
 * recognise": a caller that has to explain the second case in a message would
 * otherwise re-check the input's type itself, which is the mapping again.
 */
export type OpenFlagAnswer = {
  state: OpenWitness;
  understood: boolean;
};

/**
 * Map an adapter's boolean `open` to the tri-state vocabulary.
 *
 * `open` is a boolean by contract, but the value a caller sees has been
 * through a property read and possibly a wrapper, so it can arrive as
 * anything: `undefined` from an adapter that does not define the getter, `0`
 * or `null` from a double, a non-boolean from a proxy. Only an exact boolean
 * is an answer about the handle. A falsy non-boolean is not evidence that a
 * close happened, so it maps to unreadable rather than closed.
 */
export function interpretOpenFlag(value: unknown): OpenFlagAnswer {
  if (value === true) return { state: "open", understood: true };
  if (value === false) return { state: "closed", understood: true };
  return { state: "unreadable", understood: false };
}
