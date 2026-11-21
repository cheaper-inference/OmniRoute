/** Choose 1 model per critical provider from the /v1/models catalog. */
export function pickSmokeModels(catalog, criticalProviders) {
  return criticalProviders.map((provider) => {
    const hit = catalog.find((m) => m.id.startsWith(`${provider}/`));
    return { provider, model: hit ? hit.id : null };
  });
}
