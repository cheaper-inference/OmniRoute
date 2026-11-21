/** npm 11.16's allowScripts was advisory; 11.18 enforces strict policy.
 * Keep unknown future major versions fail-closed until their policy is reviewed.
 * https://github.com/npm/cli/blob/v11.18.0/lib/commands/install.js
 */
export function supportsManagedCliNpmPolicy(output) {
  if (typeof output !== "string") return false;
  const match = /^(0|[1-9]\d{0,3})\.(0|[1-9]\d{0,3})\.(0|[1-9]\d{0,3})$/.exec(output.trim());
  if (!match) return false;
  const major = Number(match[1]);
  const minor = Number(match[2]);
  return (major === 11 && minor >= 18) || major === 12;
}

/** Input is the server-owned catalog, never request data. */
export function buildManagedCliNpmManifest(definition) {
  return {
    name: `omniroute-managed-${definition.id}`,
    version: "0.0.0",
    private: true,
    allowScripts: Object.fromEntries(definition.lifecyclePackages.map((name) => [name, true])),
  };
}
