import { Fragment, type ReactNode } from "react";

// next-intl's t.rich only accepts functions for <tag> placeholders; an ICU *argument* such as
// `{code}` takes string/number/Date. Passing a function there renders the function ("Functions
// are not valid as a React child"), passing a node is a type error. These helpers let a caller
// keep the catalog unchanged (`"Run via {code}"` in 67 locales) and still style the argument:
// the argument goes in as a sentinel string, then the sentinels are swapped for nodes.

const sentinel = (name: string) => `\u0000${name}\u0000`;

/** Sentinel string values to hand to `t(key, …)` for every node argument. */
export function nodeArgs(names: readonly string[]): Record<string, string> {
  return Object.fromEntries(names.map((name) => [name, sentinel(name)]));
}

/** Replaces the sentinels in a translated string with the given nodes. */
export function interpolateNodes(text: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = text.split(/\u0000([A-Za-z0-9_]+)\u0000/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      // Own keys only (no prototype lookup); a sentinel without a node renders nothing.
      <Fragment key={i}>{Object.hasOwn(nodes, part) ? nodes[part] : null}</Fragment>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
