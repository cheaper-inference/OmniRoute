import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { renderManagedConfig, sourceOutbound, type ManagedCore } from "./config";
import { ensureManagedDirectory } from "./directories";
import { installManagedCore } from "./install";
import { managedRoot, withManagedLock } from "./manager";
import type { FragmentOptions } from "./fragment";

type ProbeResult = { success: true; publicIp: string; latencyMs: number };
export type SourceTestDependencies = {
  install: typeof installManagedCore;
  allocate: () => Promise<number>;
  check: (core: ManagedCore, executable: string, config: string) => Promise<void>;
  start: (
    core: ManagedCore,
    executable: string,
    config: string,
    port: number,
    signal: AbortSignal
  ) => Promise<() => Promise<void>>;
  probe: (port: number, signal: AbortSignal) => Promise<ProbeResult>;
};

/** A temporary process/listener is never registered or assigned to application traffic. */
export async function testManagedSource(
  core: ManagedCore,
  source: string,
  root = managedRoot(),
  dependencies?: SourceTestDependencies,
  fragment?: FragmentOptions
): Promise<ProbeResult> {
  const outbound = sourceOutbound(core, source);
  renderManagedConfig(core, [
    { id: "validation", port: 1, outbound, ...(fragment ? { fragment } : {}) },
  ]);
  const deps = dependencies || (await defaultDependencies());
  return withManagedLock(core, root, async () => {
    ensureManagedDirectory(path.join(root, "tests"));
    const directory = fs.mkdtempSync(path.join(root, "tests", "probe-"));
    let cleanup: (() => Promise<void>) | undefined;
    try {
      const executable = await deps.install(core, root);
      const port = await deps.allocate();
      const configPath = path.join(directory, "config.json");
      writePrivateConfigFile(
        configPath,
        JSON.stringify(
          renderManagedConfig(core, [
            { id: randomUUID(), port, outbound, ...(fragment ? { fragment } : {}) },
          ])
        )
      );
      await deps.check(core, executable, configPath);
      const signal = AbortSignal.timeout(15000);
      cleanup = await deps.start(core, executable, configPath, port, signal);
      return await deps.probe(port, signal);
    } catch {
      throw new Error(
        "Managed proxy test failed; verify the source, core and upstream connectivity"
      );
    } finally {
      try {
        await cleanup?.();
      } finally {
        fs.rmSync(directory, { recursive: true, force: true });
      }
    }
  });
}

async function defaultDependencies(): Promise<SourceTestDependencies> {
  const { allocatePort, checkNative } = await import("./runtime");
  const { startTemporaryCore, probeTemporaryCore } = await import("./testRuntime");
  return {
    install: installManagedCore,
    allocate: () => allocatePort(new Set()),
    check: checkNative,
    start: startTemporaryCore,
    probe: probeTemporaryCore,
  };
}
