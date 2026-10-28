import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as yaml from "js-yaml";

/** Refresh the deployed spec from its canonical source without trusting request headers. */
export function writePublicOpenApi(projectRoot, outputRoot = projectRoot) {
  const source = join(projectRoot, "docs", "openapi.yaml");
  // Synthetic packaging fixtures and installed standalone bundles have no source docs.
  if (!existsSync(source)) return false;
  const original = readFileSync(source, "utf8");
  const spec = yaml.load(original);
  const { version } = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf8"));
  if (!spec?.info || !spec.paths || typeof version !== "string" || !version) {
    throw new Error("Invalid OpenAPI source or package version");
  }
  spec.info.version = version;
  // OAS 3.1 Server Object: relative to the URL of /[basePath/]openapi.yaml.
  spec.servers = [{ url: "./", description: "This deployment" }];
  // Preserve canonical formatting and comments; only deployment metadata differs.
  const content = original
    .replace(/^info:\r?\n[\s\S]*?(?=^\S)/m, (info) =>
      info.replace(/^  version:.*$/m, `  version: ${yaml.dump(version).trim()}`)
    )
    .replace(
      /^servers:\r?\n(?:[ \t].*(?:\r?\n|$)|\r?\n)*/m,
      yaml.dump({ servers: spec.servers }) + "\n"
    );
  if (JSON.stringify(yaml.load(content)) !== JSON.stringify(spec)) {
    throw new Error("Unable to update OpenAPI deployment metadata without changing its contract");
  }
  const target = join(outputRoot, "public", "openapi.yaml");
  if (existsSync(target) && readFileSync(target, "utf8") === content) return false;
  mkdirSync(join(outputRoot, "public"), { recursive: true });
  writeFileSync(target, content);
  return true;
}
