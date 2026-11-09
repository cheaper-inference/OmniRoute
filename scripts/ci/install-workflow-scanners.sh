#!/usr/bin/env bash
# Release-Green tooling, independent of the target revision being audited.
set -euo pipefail

if [[ "$(uname -s)/$(uname -m)" != "Linux/x86_64" ]]; then
  echo "Workflow scanners require a Linux x86_64 runner" >&2
  exit 1
fi
: "${GITHUB_PATH:?GITHUB_PATH is required}"
scanner_dir=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/workflow-scanners.XXXXXX")
mkdir -p "$scanner_dir/bin"

curl --fail --silent --show-error --location --retry 3 --output "$scanner_dir/actionlint.tar.gz" \
  https://github.com/rhysd/actionlint/releases/download/v1.7.12/actionlint_1.7.12_linux_amd64.tar.gz
# Digests from the release assets, pinned with the versions (never fetched as
# trust material at install time). Verify bytes before extraction or execution.
printf '%s  %s\n' 8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8 \
  "$scanner_dir/actionlint.tar.gz" | sha256sum --check --strict
tar -xzf "$scanner_dir/actionlint.tar.gz" -C "$scanner_dir/bin" actionlint
curl --fail --silent --show-error --location --retry 3 --output "$scanner_dir/zizmor.tar.gz" \
  https://github.com/zizmorcore/zizmor/releases/download/v1.25.2/zizmor-x86_64-unknown-linux-gnu.tar.gz
printf '%s  %s\n' aa1facd105f0d83fe5c55b1adcd9d7417de5d83aa27471f91dc0b66cf3803577 \
  "$scanner_dir/zizmor.tar.gz" | sha256sum --check --strict
tar -xzf "$scanner_dir/zizmor.tar.gz" -C "$scanner_dir/bin" zizmor

# Do not rely on a cached/global installation on persistent runners. Publish the
# fresh directory only after both executables identify the expected versions.
actionlint_version=$("$scanner_dir/bin/actionlint" -version)
zizmor_version=$("$scanner_dir/bin/zizmor" --version)
if [[ "${actionlint_version%%$'\n'*}" != "1.7.12" || "$zizmor_version" != "zizmor 1.25.2" ]]; then
  echo "Workflow scanner version mismatch" >&2
  exit 1
fi
printf 'actionlintVersion=%s\nzizmorVersion=%s\n' "${actionlint_version%%$'\n'*}" "$zizmor_version"
printf '%s\n' "$scanner_dir/bin" >> "$GITHUB_PATH"
