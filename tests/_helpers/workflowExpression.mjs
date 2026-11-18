import assert from "node:assert/strict";

// Interpret the bounded expression grammar used by these guards, including the
// operand-returning &&/|| used in names and concurrency. Never execute workflow
// text as JavaScript. Context values remain typed (a retarget contains an object).
export function expression(source, values) {
  const text = String(source).replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  const tokens = text.match(/'(?:[^']|'')*'|[\w.-]+|&&|\|\||==|!=|[!>(),]/g) ?? [];
  assert.equal(tokens.join(""), text.replace(/\s+(?=(?:[^']*'[^']*')*[^']*$)/g, ""));
  let index = 0;
  const number = (value) => (typeof value === "object" && value !== null ? NaN : Number(value));
  const equal = (a, b) =>
    typeof a === typeof b
      ? typeof a === "string"
        ? a.toLowerCase() === b.toLowerCase()
        : a === b
      : number(a) === number(b);
  function primary() {
    const token = tokens[index++];
    if (token === "!") return !primary();
    if (token === "(") {
      const value = disjunction();
      assert.equal(tokens[index++], ")");
      return value;
    }
    if (token?.startsWith("'")) return token.slice(1, -1).replaceAll("''", "'");
    if (["true", "false", "null"].includes(token) || /^\d+$/.test(token)) return JSON.parse(token);
    if (["always", "cancelled", "startsWith", "format"].includes(token)) {
      assert.equal(tokens[index++], "(");
      if (["always", "cancelled"].includes(token)) {
        assert.equal(tokens[index++], ")");
        return token === "always";
      }
      const value = disjunction();
      assert.equal(tokens[index++], ",");
      const prefix = disjunction();
      assert.equal(tokens[index++], ")");
      return token === "format"
        ? String(value).replaceAll("{0}", String(prefix))
        : String(value).toLowerCase().startsWith(String(prefix).toLowerCase());
    }
    assert.ok(Object.hasOwn(values, token), `unsupported context: ${token}`);
    return values[token];
  }
  function comparison() {
    const a = primary();
    const operator = tokens[index];
    if (!["==", "!=", ">"].includes(operator)) return a;
    index++;
    const b = primary();
    return operator === "==" ? equal(a, b) : operator === "!=" ? !equal(a, b) : a > b;
  }
  function conjunction() {
    let value = comparison();
    while (tokens[index] === "&&") {
      index++;
      const next = comparison();
      value = value && next;
    }
    return value;
  }
  function disjunction() {
    let value = conjunction();
    while (tokens[index] === "||") {
      index++;
      const next = conjunction();
      value = value || next;
    }
    return value;
  }
  const result = disjunction();
  assert.equal(index, tokens.length);
  return result;
}

export function renderExpression(source, values) {
  return String(source).replace(/\$\{\{([\s\S]*?)\}\}/g, (_match, body) =>
    String(expression(body.trim(), values))
  );
}
