/** SQL conditions that retain unknown Cortecs rerank costs without hiding token-priced aliases. */

/** Qualify known column names only with a validated, internal SQL table alias. */
function prefix(alias: string): string {
  if (alias && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(alias))
    throw new Error("Invalid usage table alias");
  return alias ? `${alias}.` : "";
}

/** A missing rerank charge is not a token tariff, even when a pricing row exists. */
export function unpricedCortecsRerankSql(alias = ""): string {
  const p = prefix(alias);
  return `(${p}provider_cost_usd IS NULL AND LOWER(COALESCE(${p}provider, '')) = 'cortecs'
    AND COALESCE(${p}endpoint, '') IN ('/v1/rerank', '/rerank'))`;
}

/** Exact USD rows and unpriced Cortecs reranks keep tokens for display only. */
export function tokenPriceableUsageSql(alias = ""): string {
  return `(${prefix(alias)}provider_cost_usd IS NULL AND NOT ${unpricedCortecsRerankSql(alias)})`;
}
