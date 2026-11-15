// scripts/i18n/lib/icu-names.mjs
// Names an ICU message interpolates (`{name}`, the argument of `{count, plural, …}`) and the
// rich-text tag names it uses (`<em>`, `<prefix>`), collected in one pass that follows the ICU
// grammar: inside a `plural`/`select` style the braces after a selector hold a sub-message, so
// `endpoint{count, plural, one {} other {s}}` interpolates `count` alone; a straight quote before
// `{` or `<` opens a literal run; a `<` not followed by a letter is plain text.
//
// Same grammar as the scanner of tests/unit/i18n-placeholder-parity.test.ts (that test keeps its
// own copy and its self-test of the scanner). Used by check-key-completeness in `pr` mode to tell
// whether a locale catalog changed by the PR broke the placeholders of a key whose English the PR
// did not touch (scripts/i18n/lib/touched-catalogs.mjs). Dependency-free on purpose: the gate
// scripts are also run from throw-away repositories without node_modules in the unit tests.

/**
 * @param {string} message
 * @returns {{ placeholders: Set<string>, tags: Set<string> }}
 */
export function scanIcuNames(message) {
  const names = new Set();
  const tags = new Set();
  let i = 0;

  const skipSpace = () => {
    while (i < message.length && /\s/.test(message[i])) i++;
  };

  const skipToClose = () => {
    let depth = 1;
    while (i < message.length && depth > 0) {
      if (message[i] === "{") depth++;
      else if (message[i] === "}") depth--;
      i++;
    }
  };

  const readTag = () => {
    let j = i + 1;
    if (message[j] === "/") j++;
    let name = "";
    while (j < message.length && /[A-Za-z0-9]/.test(message[j])) name += message[j++];
    if (!name) {
      i++;
      return;
    }
    tags.add(name);
    while (j < message.length && message[j] !== ">") j++;
    i = j < message.length ? j + 1 : message.length;
  };

  function readMessage() {
    while (i < message.length && message[i] !== "}") {
      if (message[i] === "'") {
        if (message[i + 1] === "'") {
          i += 2;
          continue;
        }
        if (message[i + 1] === "{" || message[i + 1] === "<") {
          i += 2;
          while (i < message.length) {
            if (message[i] === "'") {
              if (message[i + 1] === "'") {
                i += 2;
                continue;
              }
              i++;
              break;
            }
            i++;
          }
          continue;
        }
        i++;
        continue;
      }
      if (message[i] === "{") {
        i++;
        readArgument();
        continue;
      }
      if (message[i] === "<") {
        const next = message[i + 1];
        const nextNext = message[i + 2];
        if (
          (next !== undefined && /[A-Za-z]/.test(next)) ||
          (next === "/" && nextNext !== undefined && /[A-Za-z]/.test(nextNext))
        ) {
          readTag();
          continue;
        }
        i++;
        continue;
      }
      i++;
    }
  }

  function readStyle() {
    while (i < message.length) {
      if (message[i] === "}") {
        i++;
        return;
      }
      if (message[i] === "{") {
        i++;
        readMessage();
        if (message[i] === "}") i++;
        continue;
      }
      i++;
    }
  }

  function readArgument() {
    skipSpace();
    let name = "";
    while (i < message.length && /[a-zA-Z0-9_]/.test(message[i])) name += message[i++];
    if (name) names.add(name);
    skipSpace();
    if (message[i] === "}") {
      i++;
      return;
    }
    if (message[i] !== ",") {
      skipToClose();
      return;
    }
    i++;
    skipSpace();
    let type = "";
    while (i < message.length && /[a-zA-Z]/.test(message[i])) type += message[i++];
    if (type === "plural" || type === "select" || type === "selectordinal") readStyle();
    else skipToClose();
  }

  readMessage();
  return { placeholders: names, tags };
}

/** True when `translated` interpolates exactly the names and tags `source` defines. */
export function sameIcuNames(source, translated) {
  const a = scanIcuNames(source);
  const b = scanIcuNames(translated);
  const same = (x, y) => x.size === y.size && [...x].every((name) => y.has(name));
  return same(a.placeholders, b.placeholders) && same(a.tags, b.tags);
}
