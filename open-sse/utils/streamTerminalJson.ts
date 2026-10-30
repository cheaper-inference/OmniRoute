import type { ResponsesStreamContext } from "./responsesSequence.ts";

type Scope = "root" | "choices" | "choice" | "response" | "other";
type Phase = "keyOrEnd" | "key" | "colon" | "valueOrEnd" | "value" | "commaOrEnd";
type Frame = {
  kind: "object" | "array";
  scope: Scope;
  phase: Phase;
  key: string;
  finished: boolean;
};
type Capture =
  | { kind: "type" }
  | { kind: "reason"; frame: Frame }
  | { kind: "id" | "model" | "createdAt" | "lastSequenceNumber" }
  | null;
type NumberPhase =
  "minus" | "zero" | "integer" | "dot" | "fraction" | "exp" | "expSign" | "expDigits";

/** A bounded JSON syntax observer, not a deserializer. It retains only the
 * root type and choices[].finish_reason, never output snapshots/tool arguments.
 * Opt-in Responses metadata is also bounded and only usable after full validation.
 * Full grammar validation is necessary: a type inside broken JSON proves nothing.
 */
export function createTerminalJsonObserver(observeResponses = false) {
  const stack: Frame[] = [];
  let valid = true;
  let started = false;
  let objectRoot = false;
  let type: string | undefined;
  let finishedChoice = false;
  let response: ResponsesStreamContext = {};
  let sequenceNumber: number | undefined;
  let numberText = "";
  let numberTooLong = false;
  let mode: "syntax" | "string" | "escape" | "unicode" | "number" | "literal" = "syntax";
  let text = "";
  let longString = false;
  let keyToken = false;
  let capture: Capture = null;
  let unicode = "";
  let number: NumberPhase = "zero";
  let literal = "";
  let literalIndex = 0;
  const digit = (char: string) => char >= "0" && char <= "9";
  const whitespace = (char: string) =>
    char === " " || char === "\n" || char === "\r" || char === "\t";
  const append = (char: string) => {
    const limit = capture?.kind === "id" || capture?.kind === "model" ? 1024 : 128;
    if (text.length < limit) text += char;
    else longString = true;
  };
  const finishString = () => {
    if (keyToken) {
      const frame = stack.at(-1)!;
      frame.key = longString ? "" : text;
      frame.phase = "colon";
    } else if (capture?.kind === "type") type = longString ? "" : text;
    else if (capture?.kind === "reason") capture.frame.finished = text.length > 0;
    else if ((capture?.kind === "id" || capture?.kind === "model") && !longString && text) {
      response[capture.kind] = text;
    }
    text = "";
    capture = null;
    mode = "syntax";
  };
  const close = () => {
    const frame = stack.pop()!;
    if (frame.scope === "choice" && frame.finished) stack.at(-1)!.finished = true;
    if (frame.scope === "choices") finishedChoice = frame.finished;
  };
  const beginValue = (char: string) => {
    const parent = stack.at(-1);
    let scope: Scope = "other";
    capture = null;
    if (!parent) {
      started = true;
      objectRoot = char === "{";
      scope = "root";
    } else {
      parent.phase = "commaOrEnd";
      if (parent.scope === "root" && parent.key === "type") {
        type = undefined;
        capture = { kind: "type" };
      }
      if (parent.scope === "root" && parent.key === "choices") {
        finishedChoice = false;
        if (char === "[") scope = "choices";
      }
      if (observeResponses && parent.scope === "root" && parent.key === "response") {
        response = {};
        if (char === "{") scope = "response";
      }
      if (observeResponses && parent.scope === "root" && parent.key === "sequence_number") {
        sequenceNumber = undefined;
        capture = { kind: "lastSequenceNumber" };
      }
      if (parent.scope === "response") {
        const key =
          parent.key === "created_at"
            ? "createdAt"
            : parent.key === "id" || parent.key === "model"
              ? parent.key
              : null;
        if (key) {
          delete response[key];
          capture = { kind: key };
        }
      }
      if (parent.scope === "choices" && char === "{") scope = "choice";
      if (parent.scope === "choice" && parent.key === "finish_reason") {
        parent.finished = false;
        capture = { kind: "reason", frame: parent };
      }
    }
    if (char === "{" || char === "[") {
      // Depth is bounded independently of byte size: megabytes of text and
      // arbitrarily long arrays stay constant-space. Pathological nesting does
      // not prove a terminal; it never becomes a suffix scan or stack overflow.
      if (stack.length >= 256) {
        valid = false;
        return;
      }
      stack.push({
        kind: char === "{" ? "object" : "array",
        scope,
        phase: char === "{" ? "keyOrEnd" : "valueOrEnd",
        key: "",
        finished: false,
      });
      capture = null;
    } else if (char === '"') {
      mode = "string";
      text = "";
      longString = false;
      keyToken = false;
    } else if (char === "-" || digit(char)) {
      mode = "number";
      number = char === "-" ? "minus" : char === "0" ? "zero" : "integer";
      if (capture?.kind !== "createdAt" && capture?.kind !== "lastSequenceNumber") capture = null;
      numberText = char;
      numberTooLong = false;
    } else if (char === "t" || char === "f" || char === "n") {
      mode = "literal";
      literal = char === "t" ? "true" : char === "f" ? "false" : "null";
      literalIndex = 1;
      capture = null;
    } else valid = false;
  };
  const numberAccepting = () =>
    number === "zero" || number === "integer" || number === "fraction" || number === "expDigits";
  const noteNumber = (char: string): boolean => {
    if (digit(char)) {
      if (number === "zero") valid = false;
      else if (number === "minus") number = char === "0" ? "zero" : "integer";
      else if (number === "dot") number = "fraction";
      else if (number === "exp" || number === "expSign") number = "expDigits";
      return true;
    }
    if (char === "." && (number === "zero" || number === "integer")) {
      number = "dot";
      return true;
    }
    if (
      (char === "e" || char === "E") &&
      (number === "zero" || number === "integer" || number === "fraction")
    ) {
      number = "exp";
      return true;
    }
    if ((char === "+" || char === "-") && number === "exp") {
      number = "expSign";
      return true;
    }
    if (!numberAccepting()) valid = false;
    if (capture && !numberTooLong) {
      const value = Number(numberText);
      if (Number.isSafeInteger(value) && value >= 0 && value < Number.MAX_SAFE_INTEGER) {
        if (capture.kind === "lastSequenceNumber") sequenceNumber = value;
        else if (capture.kind === "createdAt") response.createdAt = value;
      }
    }
    capture = null;
    mode = "syntax";
    return false;
  };

  return {
    note(chunk: string) {
      for (const char of chunk) {
        if (!valid) return;
        if (mode === "string") {
          if (char === '"') finishString();
          else if (char === "\\") mode = "escape";
          else if (char.charCodeAt(0) < 32) valid = false;
          else append(char);
          continue;
        }
        if (mode === "escape") {
          if (char === "u") {
            unicode = "";
            mode = "unicode";
          } else {
            const escaped: Record<string, string> = {
              '"': '"',
              "\\": "\\",
              "/": "/",
              b: "\b",
              f: "\f",
              n: "\n",
              r: "\r",
              t: "\t",
            };
            if (!Object.hasOwn(escaped, char)) valid = false;
            else {
              append(escaped[char]);
              mode = "string";
            }
          }
          continue;
        }
        if (mode === "unicode") {
          if (!/^[0-9a-fA-F]$/.test(char)) {
            valid = false;
            continue;
          }
          unicode += char;
          if (unicode.length === 4) {
            append(String.fromCharCode(Number.parseInt(unicode, 16)));
            mode = "string";
          }
          continue;
        }
        if (mode === "literal") {
          if (char !== literal[literalIndex++]) valid = false;
          else if (literalIndex === literal.length) mode = "syntax";
          continue;
        }
        if (mode === "number" && noteNumber(char)) {
          if (capture) {
            if (numberText.length < 64) numberText += char;
            else numberTooLong = true;
          }
          continue;
        }
        if (!valid) return;
        if (whitespace(char)) continue;
        const frame = stack.at(-1);
        if (!frame) {
          if (started) valid = false;
          else beginValue(char);
          continue;
        }
        if (frame.phase === "keyOrEnd" || frame.phase === "key") {
          if (char === "}" && frame.phase === "keyOrEnd") close();
          else if (char === '"') {
            mode = "string";
            text = "";
            longString = false;
            keyToken = true;
          } else valid = false;
        } else if (frame.phase === "colon") {
          if (char === ":") frame.phase = "value";
          else valid = false;
        } else if (frame.phase === "valueOrEnd" && char === "]") close();
        else if (frame.phase === "value" || frame.phase === "valueOrEnd") beginValue(char);
        else if (char === (frame.kind === "object" ? "}" : "]")) close();
        else if (char === ",") frame.phase = frame.kind === "object" ? "key" : "value";
        else valid = false;
      }
    },
    finish() {
      const complete = mode === "syntax" || (mode === "number" && numberAccepting());
      return {
        valid: valid && complete && started && objectRoot && stack.length === 0,
        type,
        finishedChoice,
        ...(observeResponses
          ? {
              responsesContext: {
                ...response,
                ...(sequenceNumber === undefined ? {} : { lastSequenceNumber: sequenceNumber }),
              },
            }
          : {}),
      };
    },
  };
}
