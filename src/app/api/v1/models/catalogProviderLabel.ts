import { getProviderAlias, getProviderByAlias } from "@/shared/constants/providers";

/**
 * Opt-in (`settings.catalogProviderInName`): end every provider row's `name` with
 * ` · <Provider>` so clients that only render `name` (OpenCode, most pickers) show
 * which OmniRoute route a row uses. Catalog-only: ids, routing and every other
 * field are untouched.
 *
 * Provider-specific decorations are normalised first so the label is the single
 * source of truth: OpenRouter's `Vendor: ` prefix, a trailing `(Provider)` suffix
 * (GitLab Duo registry names), and a leading `<prefix>/` (the #4516 duplicate-name
 * qualifier, `cc/Claude X`). Combos and rows with no resolvable provider are left
 * as they are. Applying it twice is a no-op.
 */
export const CATALOG_PROVIDER_LABEL_SEPARATOR = " · ";

type Row = Record<string, unknown>;

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function providerKeyOf(model: Row): string | null {
  const id = typeof model.id === "string" ? model.id : "";
  const slash = id.indexOf("/");
  if (slash > 0) {
    const prefix = id.slice(0, slash);
    if (getProviderByAlias(prefix)) return prefix;
  }
  const owner = typeof model.owned_by === "string" ? model.owned_by : "";
  if (owner && owner !== "combo" && getProviderByAlias(owner)) return owner;
  // Compatible-provider nodes: the public prefix is the only label we have here.
  if (slash > 0 && owner && owner !== "combo" && owner === id.slice(0, slash)) return owner;
  return null;
}

export function resolveCatalogProviderLabel(providerKey: string): string {
  const provider = getProviderByAlias(providerKey);
  const name = typeof provider?.name === "string" ? provider.name.trim() : "";
  return name || providerKey;
}

export function labelCatalogModelName<T extends Row>(
  model: T,
  options: { keepVendor?: boolean } = {}
): T {
  if (model.owned_by === "combo") return model;
  const baseName = typeof model.name === "string" ? model.name.trim() : "";
  if (!baseName) return model;
  const providerKey = providerKeyOf(model);
  if (!providerKey) return model;
  const label = resolveCatalogProviderLabel(providerKey);
  const suffix = `${CATALOG_PROVIDER_LABEL_SEPARATOR}${label}`;
  if (baseName.endsWith(suffix)) return model;

  const aliases = new Set([providerKey, getProviderAlias(providerKey), label]);
  let name = baseName;
  // `<prefix>/Name` from the duplicate-name qualifier (#4516).
  for (const alias of aliases) {
    const lead = `${alias}/`;
    if (name.startsWith(lead)) {
      name = name.slice(lead.length);
      break;
    }
  }
  // `Name (Provider)` from registry names such as "Claude X (GitLab Duo)".
  for (const alias of aliases) {
    const tail = new RegExp(`\\s*\\(${escapeRegExp(alias)}\\)\\s*$`, "i");
    if (tail.test(name)) {
      name = name.replace(tail, "");
      break;
    }
  }
  // OpenRouter publishes names as "Vendor: Model".
  if (providerKey === "openrouter" && !options.keepVendor) {
    name = name.replace(/^[^:/]{1,40}:\s+/, "");
  }
  name = name.trim();
  if (!name) return model;
  return { ...model, name: `${name}${suffix}` };
}

/**
 * Label every row, but keep OpenRouter's `Vendor: ` prefix on rows whose vendor-stripped
 * label would collide with another row's name (`Meta: Llama` / `Acme: Llama` would both
 * become `Llama · OpenRouter`). Non-colliding rows are labeled exactly as before.
 */
export function labelCatalogModelNames<T extends Row>(models: T[]): T[] {
  const labeled = models.map((model) => labelCatalogModelName(model));
  const counts = new Map<string, number>();
  for (const row of labeled) {
    if (typeof row.name === "string") counts.set(row.name, (counts.get(row.name) ?? 0) + 1);
  }
  return labeled.map((row, index) => {
    const collides = typeof row.name === "string" && (counts.get(row.name) ?? 0) > 1;
    return collides ? labelCatalogModelName(models[index], { keepVendor: true }) : row;
  });
}
