#!/usr/bin/env bash
# PR-only detector sequencer. Runs the three base-scoped detectors and keeps
# going only while they are green. The BASE value is supplied by the step from
# the verified merge-base source; this script only validates it (fail closed).
set -uo pipefail

base="${BASE:-}"

if [ -z "$base" ]; then
  echo "REJECTED: BASE is missing — set BASE from the verified merge-base source" >&2
  exit 2
fi

if ! git rev-parse --verify -q "${base}^{commit}" >/dev/null 2>&1; then
  echo "REJECTED: ${base} does not resolve to a commit — checks would be silent" >&2
  exit 2
fi

# Capture every target at once. No `grep -m1` under pipefail: a SIGPIPE (rc=141)
# on a large PR would be read as a false zero-target result.
targets="$( { git diff --name-only "$base"; git ls-files --others --exclude-standard; } )"

if [ -z "$targets" ]; then
  echo "REJECTED: ${base} yields 0 target — checks would be silent" >&2
  exit 2
fi

echo "[ci-alert-volume] check:doc-code-parity (BASE=${base})"
npm run --silent check:doc-code-parity || exit $?

echo "[ci-alert-volume] check:identity-bounds (BASE=${base})"
npm run --silent check:identity-bounds || exit $?

echo "[ci-alert-volume] check:functional-invariants (BASE=${base})"
npm run --silent check:functional-invariants || exit $?
