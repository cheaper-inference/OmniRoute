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

type Mode = "syntax" | "string" | "escape" | "unicode" | "number" | "literal";

/** Mutable parser state, shared by the small step functions below. */
type ObserverState = {
  observeResponses: boolean;
  stack: Frame[];
  valid: boolean;
  started: boolean;
  objectRoot: boolean;
  type: string | undefined;
  finishedChoice: boolean;
  response: ResponsesStreamContext;
  sequenceNumber: number | undefined;
  numberText: string;
  numberTooLong: boolean;
  mode: Mode;
  text: string;
  longString: boolean;
  keyToken: boolean;
  capture: Capture;
  unicode: string;
  number: NumberPhase;
  literal: string;
  literalIndex: number;
};

export type TerminalJsonResult = {
  valid: boolean;
  type: string | undefined;
  finishedChoice: boolean;
  responsesContext?: ResponsesStreamContext;
};

const MAX_DEPTH = 256;
const JSON_ESCAPES: Record<string, string> = {
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
};

const isDigit = (char: string) => char >= "0" && char <= "9";
const isWhitespace = (char: string) =>
  char === " " || char === "\n" || char === "\r" || char === "\t";

function createState(observeResponses: boolean): ObserverState {
  return {
    observeResponses,
    stack: [],
    valid: true,
    started: false,
    objectRoot: false,
    type: undefined,
    finishedChoice: false,
    response: {},
    sequenceNumber: undefined,
    numberText: "",
    numberTooLong: false,
    mode: "syntax",
    text: "",
    longString: false,
    keyToken: false,
    capture: null,
    unicode: "",
    number: "zero",
    literal: "",
    literalIndex: 0,
  };
}

function append(s: ObserverState, char: string): void {
  const limit = s.capture?.kind === "id" || s.capture?.kind === "model" ? 1024 : 128;
  if (s.text.length < limit) s.text += char;
  else s.longString = true;
}

/** Store the string just closed into whichever slot (if any) was capturing it. */
function storeCapturedString(s: ObserverState): void {
  const capture = s.capture;
  if (capture?.kind === "type") s.type = s.longString ? "" : s.text;
  else if (capture?.kind === "reason") capture.frame.finished = s.text.length > 0;
  else if ((capture?.kind === "id" || capture?.kind === "model") && !s.longString && s.text) {
    s.response[capture.kind] = s.text;
  }
}

function finishString(s: ObserverState): void {
  if (s.keyToken) {
    const frame = s.stack.at(-1)!;
    frame.key = s.longString ? "" : s.text;
    frame.phase = "colon";
  } else storeCapturedString(s);
  s.text = "";
  s.capture = null;
  s.mode = "syntax";
}

function close(s: ObserverState): void {
  const frame = s.stack.pop()!;
  if (frame.scope === "choice" && frame.finished) s.stack.at(-1)!.finished = true;
  if (frame.scope === "choices") s.finishedChoice = frame.finished;
}

/** Scope + capture bookkeeping for a value that is a child of the root object. */
function childOfRoot(s: ObserverState, parent: Frame, char: string): Scope {
  switch (parent.key) {
    case "type":
      s.type = undefined;
      s.capture = { kind: "type" };
      return "other";
    case "choices":
      s.finishedChoice = false;
      return char === "[" ? "choices" : "other";
    case "response":
      if (!s.observeResponses) return "other";
      s.response = {};
      return char === "{" ? "response" : "other";
    case "sequence_number":
      if (s.observeResponses) {
        s.sequenceNumber = undefined;
        s.capture = { kind: "lastSequenceNumber" };
      }
      return "other";
    default:
      return "other";
  }
}

function responseCaptureKey(key: string): "createdAt" | "id" | "model" | null {
  if (key === "created_at") return "createdAt";
  return key === "id" || key === "model" ? key : null;
}

function childOfResponse(s: ObserverState, parent: Frame): void {
  const key = responseCaptureKey(parent.key);
  if (!key) return;
  delete s.response[key];
  s.capture = { kind: key };
}

function childOfChoice(s: ObserverState, parent: Frame): void {
  if (parent.key !== "finish_reason") return;
  parent.finished = false;
  s.capture = { kind: "reason", frame: parent };
}

function scopeForChild(s: ObserverState, parent: Frame, char: string): Scope {
  switch (parent.scope) {
    case "root":
      return childOfRoot(s, parent, char);
    case "response":
      childOfResponse(s, parent);
      return "other";
    case "choices":
      return char === "{" ? "choice" : "other";
    case "choice":
      childOfChoice(s, parent);
      return "other";
    default:
      return "other";
  }
}

function openContainer(s: ObserverState, char: string, scope: Scope): void {
  // Depth is bounded independently of byte size: megabytes of text and
  // arbitrarily long arrays stay constant-space. Pathological nesting does
  // not prove a terminal; it never becomes a suffix scan or stack overflow.
  if (s.stack.length >= MAX_DEPTH) {
    s.valid = false;
    return;
  }
  s.stack.push({
    kind: char === "{" ? "object" : "array",
    scope,
    phase: char === "{" ? "keyOrEnd" : "valueOrEnd",
    key: "",
    finished: false,
  });
  s.capture = null;
}

function beginString(s: ObserverState, keyToken: boolean): void {
  s.mode = "string";
  s.text = "";
  s.longString = false;
  s.keyToken = keyToken;
}

function beginNumber(s: ObserverState, char: string): void {
  s.mode = "number";
  s.number = char === "-" ? "minus" : char === "0" ? "zero" : "integer";
  if (s.capture?.kind !== "createdAt" && s.capture?.kind !== "lastSequenceNumber") {
    s.capture = null;
  }
  s.numberText = char;
  s.numberTooLong = false;
}

function beginLiteral(s: ObserverState, char: string): void {
  s.mode = "literal";
  s.literal = char === "t" ? "true" : char === "f" ? "false" : "null";
  s.literalIndex = 1;
  s.capture = null;
}

function startToken(s: ObserverState, char: string, scope: Scope): void {
  if (char === "{" || char === "[") openContainer(s, char, scope);
  else if (char === '"') beginString(s, false);
  else if (char === "-" || isDigit(char)) beginNumber(s, char);
  else if (char === "t" || char === "f" || char === "n") beginLiteral(s, char);
  else s.valid = false;
}

function beginValue(s: ObserverState, char: string): void {
  const parent = s.stack.at(-1);
  let scope: Scope = "other";
  s.capture = null;
  if (!parent) {
    s.started = true;
    s.objectRoot = char === "{";
    scope = "root";
  } else {
    parent.phase = "commaOrEnd";
    scope = scopeForChild(s, parent, char);
  }
  startToken(s, char, scope);
}

const numberAccepting = (s: ObserverState) =>
  s.number === "zero" ||
  s.number === "integer" ||
  s.number === "fraction" ||
  s.number === "expDigits";

function advanceNumberDigit(s: ObserverState, char: string): void {
  switch (s.number) {
    case "zero":
      s.valid = false;
      break;
    case "minus":
      s.number = char === "0" ? "zero" : "integer";
      break;
    case "dot":
      s.number = "fraction";
      break;
    case "exp":
    case "expSign":
      s.number = "expDigits";
      break;
    default:
      break;
  }
}

/** One grammar step inside a number token; false when the char ends the number. */
function advanceNumber(s: ObserverState, char: string): boolean {
  if (isDigit(char)) {
    advanceNumberDigit(s, char);
    return true;
  }
  const wholePart = s.number === "zero" || s.number === "integer";
  if (char === "." && wholePart) {
    s.number = "dot";
    return true;
  }
  if ((char === "e" || char === "E") && (wholePart || s.number === "fraction")) {
    s.number = "exp";
    return true;
  }
  if ((char === "+" || char === "-") && s.number === "exp") {
    s.number = "expSign";
    return true;
  }
  return false;
}

/** Record a finished number into the slot that was capturing it. */
function commitNumber(s: ObserverState): void {
  if (!s.capture || s.numberTooLong) return;
  const value = Number(s.numberText);
  if (!Number.isSafeInteger(value) || value < 0 || value >= Number.MAX_SAFE_INTEGER) return;
  if (s.capture.kind === "lastSequenceNumber") s.sequenceNumber = value;
  else if (s.capture.kind === "createdAt") s.response.createdAt = value;
}

function noteNumber(s: ObserverState, char: string): boolean {
  if (advanceNumber(s, char)) return true;
  if (!numberAccepting(s)) s.valid = false;
  commitNumber(s);
  s.capture = null;
  s.mode = "syntax";
  return false;
}

function extendNumberText(s: ObserverState, char: string): void {
  if (!s.capture) return;
  if (s.numberText.length < 64) s.numberText += char;
  else s.numberTooLong = true;
}

function noteStringChar(s: ObserverState, char: string): void {
  if (char === '"') finishString(s);
  else if (char === "\\") s.mode = "escape";
  else if (char.charCodeAt(0) < 32) s.valid = false;
  else append(s, char);
}

function noteEscapeChar(s: ObserverState, char: string): void {
  if (char === "u") {
    s.unicode = "";
    s.mode = "unicode";
    return;
  }
  if (!Object.hasOwn(JSON_ESCAPES, char)) {
    s.valid = false;
    return;
  }
  append(s, JSON_ESCAPES[char]);
  s.mode = "string";
}

function noteUnicodeChar(s: ObserverState, char: string): void {
  if (!/^[0-9a-fA-F]$/.test(char)) {
    s.valid = false;
    return;
  }
  s.unicode += char;
  if (s.unicode.length !== 4) return;
  append(s, String.fromCharCode(Number.parseInt(s.unicode, 16)));
  s.mode = "string";
}

function noteLiteralChar(s: ObserverState, char: string): void {
  if (char !== s.literal[s.literalIndex++]) s.valid = false;
  else if (s.literalIndex === s.literal.length) s.mode = "syntax";
}

function noteKeyChar(s: ObserverState, frame: Frame, char: string): void {
  if (char === "}" && frame.phase === "keyOrEnd") close(s);
  else if (char === '"') beginString(s, true);
  else s.valid = false;
}

function noteCommaOrEndChar(s: ObserverState, frame: Frame, char: string): void {
  if (char === (frame.kind === "object" ? "}" : "]")) close(s);
  else if (char === ",") frame.phase = frame.kind === "object" ? "key" : "value";
  else s.valid = false;
}

function noteFrameChar(s: ObserverState, frame: Frame, char: string): void {
  switch (frame.phase) {
    case "keyOrEnd":
    case "key":
      noteKeyChar(s, frame, char);
      break;
    case "colon":
      if (char === ":") frame.phase = "value";
      else s.valid = false;
      break;
    case "valueOrEnd":
      if (char === "]") close(s);
      else beginValue(s, char);
      break;
    case "value":
      beginValue(s, char);
      break;
    default:
      noteCommaOrEndChar(s, frame, char);
  }
}

function noteSyntaxChar(s: ObserverState, char: string): void {
  if (!s.valid || isWhitespace(char)) return;
  const frame = s.stack.at(-1);
  if (frame) noteFrameChar(s, frame, char);
  else if (s.started) s.valid = false;
  else beginValue(s, char);
}

function noteChar(s: ObserverState, char: string): void {
  switch (s.mode) {
    case "string":
      return noteStringChar(s, char);
    case "escape":
      return noteEscapeChar(s, char);
    case "unicode":
      return noteUnicodeChar(s, char);
    case "literal":
      return noteLiteralChar(s, char);
    case "number":
      if (noteNumber(s, char)) return extendNumberText(s, char);
      break;
    default:
      break;
  }
  noteSyntaxChar(s, char);
}

function finishObserver(s: ObserverState): TerminalJsonResult {
  const complete = s.mode === "syntax" || (s.mode === "number" && numberAccepting(s));
  return {
    valid: s.valid && complete && s.started && s.objectRoot && s.stack.length === 0,
    type: s.type,
    finishedChoice: s.finishedChoice,
    ...(s.observeResponses
      ? {
          responsesContext: {
            ...s.response,
            ...(s.sequenceNumber === undefined ? {} : { lastSequenceNumber: s.sequenceNumber }),
          },
        }
      : {}),
  };
}

/** A bounded JSON syntax observer, not a deserializer. It retains only the
 * root type and choices[].finish_reason, never output snapshots/tool arguments.
 * Opt-in Responses metadata is also bounded and only usable after full validation.
 * Full grammar validation is necessary: a type inside broken JSON proves nothing.
 */
export function createTerminalJsonObserver(observeResponses = false) {
  const state = createState(observeResponses);
  return {
    note(chunk: string): void {
      for (const char of chunk) {
        if (!state.valid) return;
        noteChar(state, char);
      }
    },
    finish: (): TerminalJsonResult => finishObserver(state),
  };
}
