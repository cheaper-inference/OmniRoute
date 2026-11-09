// Execute inside the pushed image: NODE_VERSION metadata and a Dockerfile pin
// do not prove which Node binary the final runtime actually executes (#18414).
const version = process.versions.node;
const [major, minor, patch] = version.split(".").map(Number);

// Keep the security floor aligned with tests/unit/build/docker-ca-baseline.test.mjs.
// Node 26.12.1 includes the CVE-2026-111497 Brotli decoder fix.
if (major !== 26 || !(minor > 12 || (minor === 12 && patch >= 1))) {
  console.error(
    `Docker image runs Node ${version}; requires Node 26.12.1 or newer in the 26.x line (CVE-2026-111497).`
  );
  process.exit(1);
}

console.log(`Verified Docker runtime: Node ${version} (CVE-2026-111497 security floor satisfied).`);
