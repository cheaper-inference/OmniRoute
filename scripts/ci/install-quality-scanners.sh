#!/usr/bin/env bash
# Pinned auditors for the complete quality profile. Keep installation failures
# visible: an unavailable scanner is not a measured zero-finding result.
set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
# The pair installer validates platform, digests and versions too. Hold its
# PATH entries until the complete profile has been provisioned.
: "${GITHUB_PATH:?GITHUB_PATH is required}"
scanner_dir=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/quality-scanners.XXXXXX")
mkdir -p "$scanner_dir/bin"
workflow_scanner_path="$scanner_dir/workflow-scanner-path"
touch "$workflow_scanner_path"
GITHUB_PATH="$workflow_scanner_path" bash "$script_dir/install-workflow-scanners.sh"

# Keep these versions aligned with quality.yml. Rule-set updates must be
# deliberate changes with new measurements, never a dependency on latest.
GITLEAKS_VERSION=v8.30.1
OSV_SCANNER_VERSION=v2.3.8
OASDIFF_VERSION=v1.19.1
gh release download "$GITLEAKS_VERSION" --repo gitleaks/gitleaks --pattern 'gitleaks_8.30.1_linux_x64.tar.gz' --output "$scanner_dir/gitleaks.tar.gz"
printf '%s  %s\n' 551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb \
  "$scanner_dir/gitleaks.tar.gz" | sha256sum --check --strict
tar -xzf "$scanner_dir/gitleaks.tar.gz" -C "$scanner_dir/bin" gitleaks
gh release download "$OSV_SCANNER_VERSION" --repo google/osv-scanner --pattern 'osv-scanner_linux_amd64' --output "$scanner_dir/osv-scanner"
printf '%s  %s\n' bc98e15319ed0d515e3f9235287ba53cdc5535d576d24fd573978ecfe9ab92dc \
  "$scanner_dir/osv-scanner" | sha256sum --check --strict
install -m 0755 "$scanner_dir/osv-scanner" "$scanner_dir/bin/osv-scanner"
gh release download "$OASDIFF_VERSION" --repo oasdiff/oasdiff --pattern 'oasdiff_1.19.1_linux_amd64.tar.gz' --output "$scanner_dir/oasdiff.tar.gz"
printf '%s  %s\n' a20c2163c795d63fabd7f9640a945d9b1e7cb320062d4f24ea4d112d55f637c5 \
  "$scanner_dir/oasdiff.tar.gz" | sha256sum --check --strict
tar -xzf "$scanner_dir/oasdiff.tar.gz" -C "$scanner_dir/bin" oasdiff

# Execute the new binaries directly, never a cached/global copy. Publish their
# directory only after every scanner can run; subsequent gates consume this PATH.
"$scanner_dir/bin/gitleaks" version
"$scanner_dir/bin/osv-scanner" --version
"$scanner_dir/bin/oasdiff" --version
{
  cat "$workflow_scanner_path"
  printf '%s\n' "$scanner_dir/bin"
} >> "$GITHUB_PATH"
