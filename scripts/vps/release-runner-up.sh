#!/usr/bin/env bash
# Turn on the self-hosted VM (VPS 113) and wait for your runners to come online, for the phase
# of release use dedicated runners (anti-queue). Failed => the caller falls on GitHub-hosted.
#
# Uso:  scripts/vps/release-runner-up.sh [timeout_seg]
# Output: exit 0 + arrow to repo-var USE_VPS_RUNNER=true when >=1 runner omni-release online
# exit 1 + arrow USE_VPS_RUNNER=false on any failure/timeout (fallback)
#

# - SSH key authorized on root@$PVE_HOST (Proxmox) and root@$VPS_HOST (the VM)
# - gh authenticated with admin in the repo (to read runners + set the variable)
set -uo pipefail

PVE_HOST="${PVE_HOST:-192.168.0.100}"   # Proxmox host
VPS_HOST="${VPS_HOST:-192.168.0.113}"   # a VM dos runners
VM_ID="${VM_ID:-113}"
REPO="${REPO:-cheaper-inference/OmniRoute}"
LABEL="${RUNNER_LABEL:-omni-release}"
TIMEOUT="${1:-120}"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=8"

fallback() {
  echo "[release-runner] ⚠️  $1 — usando GitHub-hosted (fallback)."
  gh variable set USE_VPS_RUNNER --repo "$REPO" --body "false" >/dev/null 2>&1 || true
  exit 1
}

echo "[release-runner] ligando VM $VM_ID no Proxmox $PVE_HOST..."
$SSH "root@$PVE_HOST" "qm start $VM_ID" 2>/dev/null || true # ok if already running

echo "[release-runner] aguardando runners '$LABEL' ficarem online (timeout ${TIMEOUT}s)..."
deadline=$(( $(date +%s) + TIMEOUT ))
while [ "$(date +%s)" -lt "$deadline" ]; do
  online=$(gh api "repos/$REPO/actions/runners" \
    --jq "[.runners[] | select(.status==\"online\") | select(.labels[].name==\"$LABEL\")] | length" \
    2>/dev/null || echo 0)
  if [ "${online:-0}" -ge 1 ]; then
    echo "[release-runner] ✅ $online runner(s) '$LABEL' online — usando a VPS."
    gh variable set USE_VPS_RUNNER --repo "$REPO" --body "true" >/dev/null 2>&1 \
      || fallback "I couldn't set USE_VPS_RUNNER"
    exit 0
  fi
  sleep 6
done
fallback "runners did not come online in time"
