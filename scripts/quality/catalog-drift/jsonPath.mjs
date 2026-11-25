const SEGMENT = /^([^[\]]*)(?:\[(?:([^=[\]]+)=([^[\]]*))?\])?$/;

function ownField(value, field) {
  return value !== null && typeof value === "object" && Object.hasOwn(value, field)
    ? value[field]
    : undefined;
}

// Keep dots inside a filter literal together, for example [id=model-2.5].
function pathSegments(path) {
  const segments = [];
  let start = 0;
  let inBrackets = false;
  for (let i = 0; i < path.length; i++) {
    if (path[i] === "[") inBrackets = true;
    if (path[i] === "]") inBrackets = false;
    if (path[i] === "." && !inBrackets) {
      segments.push(path.slice(start, i));
      start = i + 1;
    }
  }
  segments.push(path.slice(start));
  return segments;
}

export function selectPath(root, path) {
  const segments = pathSegments(path);

  function visit(value, index) {
    if (index === segments.length) return value;
    const segment = segments[index];
    const parts = segment.match(SEGMENT);
    if (!segment || !parts) return undefined;

    const [, field, filterField, filterValue] = parts;
    const selected = field ? ownField(value, field) : value;
    const next = index + 1;
    if (segment === field) return visit(selected, next);
    if (!Array.isArray(selected)) return undefined;

    if (filterField !== undefined) {
      const matching = selected.find((item) => {
        const actual = ownField(item, filterField);
        if (actual === undefined) return false;
        try {
          return String(actual) === filterValue;
        } catch {
          return false;
        }
      });
      return visit(matching, next);
    }
    return selected.flatMap((item) => {
      const result = visit(item, next);
      return result === undefined ? [] : result;
    });
  }

  return visit(root, 0);
}
