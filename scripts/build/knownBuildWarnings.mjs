/**
 * Known, non-actionable Next.js/webpack build warnings.
 *
 * Kept in a standalone module (rather than inlined in `next.config.mjs`) so the
 * matching logic is unit-testable. The #16320 report showed the Fumadocs MDX
 * "build dependencies" warning escaping the allowlist because the entry only
 * matched the `dist/load-from-file-*.js` bundle, never the `dist/eval-*.js` one
 * that webpack actually parsed in production.
 */

/**
 * Bundled third-party files whose `import(<expression>)` a webpack
 * `FileSystemInfo` pass cannot statically resolve. The warning never indicates
 * broken output — only coarser build-cache invalidation for that dependency.
 */
export const IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES = [
  // `fumadocs-mdx` emits both `dist/load-from-file-*.js` and `dist/eval-*.js`;
  // match the whole `dist/` directory so a renamed bundle cannot re-open #16320.
  "/node_modules/fumadocs-mdx/dist/",
  "/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
];

/**
 * True for the `webpack.FileSystemInfo` "build dependencies failed" warning
 * raised for one of the allow-listed third-party modules above.
 */
export function isKnownInfrastructureBuildDependencyWarning(args) {
  const values = Array.isArray(args) ? args : [args];
  const message = values
    .filter((value) => typeof value === "string")
    .join(" ")
    .replaceAll("\\", "/");
  return (
    message.includes("webpack.FileSystemInfo") &&
    message.includes("for build dependencies failed at 'import(") &&
    message.includes("incorrect cache invalidation") &&
    IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES.some((modulePath) =>
      message.includes(modulePath)
    )
  );
}

/**
 * True for the `next-intl` production extractor's dynamic-import webpack warning
 * (matched by module resource, since the message text is generic).
 */
export function isNextIntlExtractorDynamicImportWarning(warning) {
  const message = typeof warning === "string" ? warning : warning?.message || "";
  const resource = warning?.module?.resource || warning?.file || "";
  const target = "next-intl/dist/esm/production/extractor/format/index.js";
  return (
    resource.includes(target) &&
    (message.includes("import(t)") || message.includes("dependency is an expression"))
  );
}

/**
 * Wrap a webpack infrastructure-logging console so the known-benign build
 * dependency warnings above are dropped while every other message passes
 * through untouched.
 */
export function filterKnownInfrastructureWarnings(baseConsole) {
  const filteredConsole = Object.create(baseConsole);
  filteredConsole.warn = (...args) => {
    if (isKnownInfrastructureBuildDependencyWarning(args)) return;
    Reflect.apply(baseConsole.warn, baseConsole, args);
  };
  return filteredConsole;
}
