import { CREDENTIAL_PATTERNS } from "@omniroute/open-sse/utils/credentialPatterns.ts";
import { credentialCompleteCut } from "./credentialStreamBoundary";
import type { BufferedField, TextBuffers } from "./sseTextBuffers";

const IMAGE_TAIL = /data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]*$/;
const PRIVATE_BEGIN = /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/;
const PRIVATE_END = /-----END (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/;
const END_LOOKBEHIND = 64;
// These incomplete forms cannot be emitted safely or retained beyond the cap.
// They do not extend the masking catalog: an oversized pending form errors out.
const INCOMPLETE_JWT = /\beyJ[A-Za-z0-9_.-]*$/;
const INCOMPLETE_AUTHORITY =
  /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|amqp):\/\/[^:/@\s"']+:[^:/@\s"']*$/;
type Continuation = { kind: "private"; tail: string } | { kind: "image" | "token"; prefix: RegExp };
type Output = { emitted: string; remaining: string };

function variableContinuation(text: string): RegExp | undefined {
  for (const { regex } of CREDENTIAL_PATTERNS) {
    // Only an unbounded final character class can consume future token bytes.
    // Derive it from the catalog instead of maintaining a second policy table.
    const terminal = /(\[[^\]]+\])\{\d+,\}(?:\\b)?$/.exec(regex.source);
    if (!terminal) continue;
    for (const match of text.matchAll(new RegExp(regex.source, regex.flags))) {
      if (match.index! + match[0].length === text.length) return new RegExp(`^${terminal[1]}+`);
    }
  }
  return undefined;
}

/** Bounded continuation state after an oversized credential/image has been emitted. */
export class CredentialOverflow {
  private states = new WeakMap<TextBuffers, Map<BufferedField, Continuation>>();

  private set(buffers: TextBuffers, field: BufferedField, state: Continuation): void {
    let fields = this.states.get(buffers);
    if (!fields) this.states.set(buffers, (fields = new Map()));
    fields.set(field, state);
  }

  consume(buffers: TextBuffers, field: BufferedField, text: string): Output {
    const fields = this.states.get(buffers);
    const state = fields?.get(field);
    if (!state) return { emitted: "", remaining: text };
    if (state.kind === "private") {
      const joined = state.tail + text;
      const end = PRIVATE_END.exec(joined);
      if (!end) {
        state.tail = joined.slice(-END_LOOKBEHIND);
        return { emitted: "", remaining: "" };
      }
      fields.delete(field);
      return { emitted: "", remaining: joined.slice(end.index + end[0].length) };
    }
    const prefix = state.prefix.exec(text)?.[0] ?? "";
    if (prefix.length !== text.length) fields.delete(field);
    return { emitted: state.kind === "image" ? prefix : "", remaining: text.slice(prefix.length) };
  }

  drain(
    buffers: TextBuffers,
    field: BufferedField,
    text: string,
    redact: (value: string) => string
  ): Output {
    const begin = PRIVATE_BEGIN.exec(text);
    if (begin && !PRIVATE_END.test(text.slice(begin.index + begin[0].length))) {
      this.set(buffers, field, { kind: "private", tail: text.slice(-END_LOOKBEHIND) });
      return {
        emitted: redact(text.slice(0, begin.index)) + "[REDACTED:private_key]",
        remaining: "",
      };
    }
    if (IMAGE_TAIL.test(text)) {
      this.set(buffers, field, { kind: "image", prefix: /^[a-zA-Z0-9+/=]+/ });
      return { emitted: redact(text), remaining: "" };
    }
    const prefix = variableContinuation(text);
    if (prefix && redact(text).endsWith("]")) {
      this.set(buffers, field, { kind: "token", prefix });
      return { emitted: redact(text), remaining: "" };
    }
    if (INCOMPLETE_JWT.test(text) || INCOMPLETE_AUTHORITY.test(text))
      throw new Error("[PII] Credential stream buffer limit exceeded");
    // No open catalog match: retain a bounded raw lookbehind for a short key
    // beginning near the end, while releasing ordinary oversized text.
    const closed = PRIVATE_END.exec(text);
    let cut = closed
      ? closed.index + closed[0].length
      : credentialCompleteCut(text, Math.max(0, text.length - 512));
    const preceding = text.charCodeAt(cut - 1);
    if (preceding >= 0xd800 && preceding <= 0xdbff) cut--;
    return { emitted: redact(text.slice(0, cut)), remaining: text.slice(cut) };
  }
}
