/** Wire observations share call_logs storage but never count as extra logical calls. */
export function logicalCallSql(alias: "" | "c" | "c2" | "c3" = ""): string {
  const column = alias ? `${alias}.request_type` : "request_type";
  return `(${column} IS NULL OR ${column} <> 'upstream_http_attempt')`;
}

export function logicalCallWhere(whereClause: string): string {
  const existing = whereClause.trim().replace(/^WHERE\s+/i, "");
  return `WHERE ${logicalCallSql()}${existing ? ` AND (${existing})` : ""}`;
}
