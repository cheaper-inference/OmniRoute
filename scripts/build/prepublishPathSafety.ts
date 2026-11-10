import { isAbsolute, parse, relative, resolve, sep } from "node:path";

export function getPrepublishDistDirRefusal(
  distDir: string,
  projectRoot: string
): "filesystem root" | "the checkout" | "a parent of the checkout" | undefined {
  const resolvedDistDir = resolve(distDir);
  const resolvedRoot = resolve(projectRoot);

  if (resolvedDistDir === parse(resolvedDistDir).root) return "filesystem root";
  if (resolvedDistDir === resolvedRoot) return "the checkout";

  const rootFromOutput = relative(resolvedDistDir, resolvedRoot);
  if (
    rootFromOutput !== ".." &&
    !rootFromOutput.startsWith(`..${sep}`) &&
    !isAbsolute(rootFromOutput)
  ) {
    return "a parent of the checkout";
  }

  return undefined;
}
