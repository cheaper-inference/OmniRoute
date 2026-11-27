export const ANTIGRAVITY_GENERATION_BASE_URLS = Object.freeze([
  "https://daily-cloudcode-pa.googleapis.com",
]);

export const ANTIGRAVITY_RUNTIME_BASE_URLS = Object.freeze([
  "https://daily-cloudcode-pa.googleapis.com",
  "https://cloudcode-pa.googleapis.com",
]);

export const ANTIGRAVITY_DISCOVERY_BASE_URLS = Object.freeze([
  ...ANTIGRAVITY_RUNTIME_BASE_URLS,
  "https://daily-cloudcode-pa.sandbox.googleapis.com",
]);

export const ANTIGRAVITY_BOOTSTRAP_BASE_URLS = Object.freeze([
  "https://cloudcode-pa.googleapis.com",
]);

export const ANTIGRAVITY_ONBOARD_PATH = "/v1internal:onboardUser";

export function getAntigravityOnboardUrls(): string[] {
  return ANTIGRAVITY_BOOTSTRAP_BASE_URLS.map((base) => `${base}${ANTIGRAVITY_ONBOARD_PATH}`);
}

const ANTIGRAVITY_MODELS_PATH = "/v1internal:models";
const ANTIGRAVITY_FETCH_AVAILABLE_MODELS_PATH = "/v1internal:fetchAvailableModels";
export const ANTIGRAVITY_WRITE_TRAJECTORY_ACLS_PATH = "/v1internal:writeTrajectoryAcls";

export function buildAntigravityWriteTrajectoryAclsUrl(generateUrl: string): string {
  try {
    const parsed = new URL(generateUrl);
    return `${parsed.origin}${ANTIGRAVITY_WRITE_TRAJECTORY_ACLS_PATH}`;
  } catch {
    return `${ANTIGRAVITY_GENERATION_BASE_URLS[0]}${ANTIGRAVITY_WRITE_TRAJECTORY_ACLS_PATH}`;
  }
}

function buildAntigravityDiscoveryUrls(path: string): string[] {
  return ANTIGRAVITY_DISCOVERY_BASE_URLS.map((baseUrl) => `${baseUrl}${path}`);
}

export function getAntigravityModelsDiscoveryUrls(): string[] {
  return buildAntigravityDiscoveryUrls(ANTIGRAVITY_MODELS_PATH);
}

export function getAntigravityFetchAvailableModelsUrls(): string[] {
  return buildAntigravityDiscoveryUrls(ANTIGRAVITY_FETCH_AVAILABLE_MODELS_PATH);
}
