import { createRequire, registerHooks } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const React = await import(pathToFileURL(require.resolve("react")));
globalThis.React = React;
const server = pathToFileURL(
  require.resolve("next/dist/compiled/react-server-dom-webpack/server.node.js")
).href;
const boundary = (id, names) =>
  `import {createClientModuleProxy} from ${JSON.stringify(server)}; const proxy=createClientModuleProxy(${JSON.stringify(id)}); ` +
  names
    .map((n) =>
      n === "default" ? "export default proxy.default;" : `export const ${n}=proxy.${n};`
    )
    .join("\n");
const fixtures = new Map([
  ["@omniroute/ui-kit/button", boundary("fixture:button", ["Button", "buttonVariants"])],
  ["@/shared/components/Icon", boundary("fixture:icon", ["default"])],
  ["@/shared/components/OmniRouteLogo", boundary("fixture:logo", ["OmniRouteLockup"])],
  ["next/link", boundary("fixture:link", ["default"])],
  ["next-intl", "export const useTranslations=()=>key=>key;"],
]);
const entry = pathToFileURL(path.join(root, "src/shared/components/ErrorPageScaffold.tsx")).href;
const routes = new Map([...fixtures].map(([, body], i) => ["qg-rsc:" + i, body]));
const urls = new Map([...fixtures.keys()].map((name, i) => [name, "qg-rsc:" + i]));
const hook = registerHooks({
  resolve(name, context, next) {
    if (context.parentURL?.split("?")[0] === entry && urls.has(name))
      return { url: urls.get(name), shortCircuit: true };
    return next(name, context);
  },
  load(url, context, next) {
    if (routes.has(url)) return { source: routes.get(url), format: "module", shortCircuit: true };
    return next(url, context);
  },
});
try {
  const { default: Scaffold } = await import(entry);
  const element = Scaffold({
    code: "400",
    title: "Fixture",
    description: "Fixture",
    primaryAction: { href: "/docs", label: "Docs" },
    secondaryAction: { href: "/status", label: "Status" },
  });
  if (!React.isValidElement(element)) throw new Error("INVALID_ELEMENT");
  process.stdout.write(
    JSON.stringify({
      status: "PASS_SERVER_COMPONENT_INVOCATION",
      clientBoundary: "REAL_REACT_SERVER_DOM_PROXY",
      rawMessagesEmitted: false,
    }) + "\n"
  );
} catch (error) {
  const failureEnum = String(error?.message).startsWith(
    "Attempted to call buttonVariants() from the server"
  )
    ? "CLIENT_FUNCTION_CALLED_ON_SERVER"
    : error?.message === "INVALID_ELEMENT"
      ? "INVALID_ELEMENT"
      : "UNCLASSIFIED_PROBE_FAILURE";
  process.stdout.write(
    JSON.stringify({
      status: "FAIL_SERVER_COMPONENT_INVOCATION",
      failureEnum,
      clientBoundary: "REAL_REACT_SERVER_DOM_PROXY",
      rawMessagesEmitted: false,
    }) + "\n"
  );
  process.exitCode = 1;
} finally {
  hook.deregister();
}
