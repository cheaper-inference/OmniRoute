#!/usr/bin/env bash
# Pinned auditors for the complete quality profile. Keep installation failures
# visible: an unavailable scanner is not a measured zero-finding result.
set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
# This helper also validates the supported platform and GITHUB_PATH, verifies
# checksums and versions, and publishes a fresh actionlint/zizmor directory.
bash "$script_dir/install-workflow-scanners.sh"

scanner_dir=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/quality-scanners.XXXXXX")
mkdir -p "$scanner_dir/bin"

# Keep these versions aligned with quality.yml. Rule-set updates must be
# deliberate changes with new measurements, never a dependency on latest.
GITLEAKS_VERSION=v8.30.1
OSV_SCANNER_VERSION=v2.3.8
OASDIFF_VERSION=v1.19.1
gh release download "$GITLEAKS_VERSION" --repo gitleaks/gitleaks --pattern '*linux_x64.tar.gz' --dir "$scanner_dir"
tar -xzf "$scanner_dir"/*linux_x64.tar.gz -C "$scanner_dir/bin" gitleaks
gh release download "$OSV_SCANNER_VERSION" --repo google/osv-scanner --pattern '*linux_amd64' --dir "$scanner_dir"
install -m 0755 "$scanner_dir"/*linux_amd64 "$scanner_dir/bin/osv-scanner"
gh release download "$OASDIFF_VERSION" --repo oasdiff/oasdiff --pattern '*linux_amd64.tar.gz' --dir "$scanner_dir"
tar -xzf "$scanner_dir"/*linux_amd64.tar.gz -C "$scanner_dir/bin" oasdiff

# Execute the new binaries directly, never a cached/global copy. Publish their
# directory only after every scanner can run; subsequent gates consume this PATH.
"$scanner_dir/bin/gitleaks" version
"$scanner_dir/bin/osv-scanner" --version
"$scanner_dir/bin/oasdiff" --version
printf '%s\n' "$scanner_dir/bin" >> "$GITHUB_PATH"
