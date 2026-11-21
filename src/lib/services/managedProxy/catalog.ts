import os from "node:os";
import { validateCoreSelection, type CoreSelection } from "./selection";
import type { ManagedCore } from "./config";

export const CORE_REPOSITORIES = {
  singbox: "SagerNet/sing-box",
  xray: "XTLS/Xray-core",
  mahsa: "GFW-knocker/Xray-core",
} as const;
export type CoreDistribution = keyof typeof CORE_REPOSITORIES;
export type OfficialSelection = Extract<CoreSelection, { source: "official" }>;
type ReleaseAsset = { name?: string; digest?: string; browser_download_url?: string };
type ReleaseMetadata = {
  tag_name?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: ReleaseAsset[];
};

export function releaseAssetName(
  distribution: CoreDistribution,
  version: string,
  platform: string = os.platform(),
  arch: string = os.arch()
): string {
  if (!["linux", "darwin", "win32"].includes(platform) || !["x64", "arm64"].includes(arch))
    throw new Error("No verified managed core build for this platform");
  const target =
    platform === "win32"
      ? "windows"
      : platform === "darwin" && distribution !== "singbox"
        ? "macos"
        : platform;
  if (distribution === "singbox")
    return `sing-box-${version.replace(/^v/, "")}-${target}-${arch === "x64" ? "amd64" : "arm64"}.${platform === "win32" ? "zip" : "tar.gz"}`;
  return `Xray-${target}-${arch === "x64" ? "64" : "arm64-v8a"}.zip`;
}

export function selectionRelease(core: ManagedCore, input: OfficialSelection) {
  const selected = validateCoreSelection(core, input) as OfficialSelection;
  const asset = releaseAssetName(selected.distribution, selected.version);
  if (selected.asset !== asset) throw new Error("Managed core asset does not match this platform");
  return {
    version: `${selected.distribution}-${selected.version}`,
    asset,
    sha256: selected.sha256,
    url: `https://github.com/${CORE_REPOSITORIES[selected.distribution]}/releases/download/${selected.version}/${asset}`,
    executable: `${core === "singbox" ? "sing-box" : "xray"}${os.platform() === "win32" ? ".exe" : ""}`,
  };
}

export function verifiedReleaseSelection(
  core: ManagedCore,
  distribution: CoreDistribution,
  payload: ReleaseMetadata,
  platform: string = os.platform(),
  arch: string = os.arch()
): OfficialSelection {
  if (payload.draft || payload.prerelease || !payload.tag_name)
    throw new Error("Official core release must be a published stable version");
  const assetName = releaseAssetName(distribution, payload.tag_name, platform, arch);
  const asset = payload.assets?.find((item) => item.name === assetName);
  const digest = /^sha256:([a-f0-9]{64})$/i.exec(asset?.digest || "")?.[1].toLowerCase();
  const expectedUrl = `https://github.com/${CORE_REPOSITORIES[distribution]}/releases/download/${payload.tag_name}/${assetName}`;
  if (!digest || asset?.browser_download_url !== expectedUrl)
    throw new Error("Official core release has no verified platform asset digest");
  return validateCoreSelection(core, {
    source: "official",
    distribution,
    version: payload.tag_name,
    asset: assetName,
    sha256: digest,
  }) as OfficialSelection;
}

async function releaseMetadata(distribution: CoreDistribution, suffix: string): Promise<unknown> {
  const response = await fetch(
    `https://api.github.com/repos/${CORE_REPOSITORIES[distribution]}/releases${suffix}`,
    {
      redirect: "error",
      signal: AbortSignal.timeout(15000),
      headers: { Accept: "application/vnd.github+json" },
    }
  );
  if (!response.ok || !response.body)
    throw new Error("Official core release metadata is unavailable");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const item = await reader.read();
      if (item.done) break;
      size += item.value.length;
      if (size > 2 * 1024 * 1024) throw new Error("Official core metadata exceeds the size limit");
      chunks.push(item.value);
    }
  } finally {
    await reader.cancel();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function listCoreReleases(core: ManagedCore, distribution: CoreDistribution) {
  if (
    !Object.hasOwn(CORE_REPOSITORIES, distribution) ||
    (core === "singbox") !== (distribution === "singbox")
  )
    throw new Error("Managed core distribution does not match its configuration format");
  const payload = await releaseMetadata(distribution, "?per_page=20");
  if (!Array.isArray(payload)) throw new Error("Official core metadata is invalid");
  const releases: OfficialSelection[] = [];
  for (const item of payload) {
    try {
      releases.push(verifiedReleaseSelection(core, distribution, item));
    } catch {
      /* Unsupported assets are not offered. */
    }
  }
  return releases;
}

export async function resolveCoreRelease(
  core: ManagedCore,
  distribution: CoreDistribution,
  version: string
) {
  if (
    !/^v?[0-9][a-zA-Z0-9._-]{0,63}$/.test(version) ||
    !Object.hasOwn(CORE_REPOSITORIES, distribution)
  )
    throw new Error("Invalid official core release version");
  const payload = await releaseMetadata(distribution, `/tags/${encodeURIComponent(version)}`);
  const selection = verifiedReleaseSelection(core, distribution, payload as ReleaseMetadata);
  if (selection.version !== version) throw new Error("Official core release version changed");
  return selection;
}
