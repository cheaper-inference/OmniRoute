type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as RecordValue)
    : {};
/** Keep native output and every downloadable file without modifying signed URLs. */
export function normalizeFalOutput(payload: unknown) {
  const artifacts: RecordValue[] = [];
  function visit(value: unknown, path: string) {
    if (typeof value === "string" && /^(https:\/\/|data:|blob:)/.test(value)) {
      artifacts.push({ url: value, path });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => visit(item, `${path}[${i}]`));
      return;
    }
    const object = record(value);
    if (typeof object.url === "string" && /^(https:\/\/|data:|blob:)/.test(object.url)) {
      artifacts.push({ path, ...object });
    }
    for (const [key, item] of Object.entries(object)) {
      if (key !== "url") visit(item, `${path}.${key}`);
    }
  }
  visit(payload, "$");
  return { artifacts, output: payload };
}
