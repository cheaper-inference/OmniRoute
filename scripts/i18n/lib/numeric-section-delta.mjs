/** Update one unambiguous standalone count while preserving all translated prose. */
export function applyNumericSectionDelta(previous, current, mirror) {
  const oldNumbers = [...previous.matchAll(/\d+/g)];
  const newNumbers = [...current.matchAll(/\d+/g)];
  if (
    oldNumbers.length !== newNumbers.length ||
    JSON.stringify(previous.split(/\d+/)) !== JSON.stringify(current.split(/\d+/))
  ) {
    return null;
  }
  const changed = oldNumbers.flatMap((match, index) =>
    match[0] !== newNumbers[index][0] ? [index] : []
  );
  if (changed.length !== 1) return null;
  const before = oldNumbers[changed[0]];
  const after = newNumbers[changed[0]];
  // Restrict the fast path to counts, excluding dates, versions, signed values,
  // identifiers and paths. Ambiguous or locale-native numerals use translation.
  if (!/^[1-9]\d{2,}$/.test(before[0]) || !/^[1-9]\d{2,}$/.test(after[0])) return null;
  const standalone = (text, match) =>
    !/[\p{L}\p{N}_./+\-−]$/u.test(text.slice(0, match.index)) &&
    !/^[\p{L}\p{N}_./+\-−]/u.test(text.slice(match.index + match[0].length));
  if (!standalone(previous, before) || !standalone(current, after)) return null;
  if (oldNumbers.filter((match) => match[0] === before[0]).length !== 1) return null;
  const targets = [...mirror.matchAll(/\d+/g)].filter((match) => match[0] === before[0]);
  if (targets.length !== 1 || !standalone(mirror, targets[0])) return null;
  const at = targets[0].index;
  return mirror.slice(0, at) + after[0] + mirror.slice(at + before[0].length);
}
