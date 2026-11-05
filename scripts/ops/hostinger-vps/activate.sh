#!/usr/bin/env bash
# Activate an already-built standalone release; retain the previous code for rollback.
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo 'Run as root' >&2; exit 1; }
release=$(realpath -e -- "${1:?Usage: omniroute-activate /opt/omniroute-releases/RELEASE}")
[[ "$release" == /opt/omniroute-releases/* ]] || { echo 'Release outside allowed directory' >&2; exit 1; }
[[ -f "$release/server.js" && -f "$release/dev/run-standalone.mjs" ]] || { echo 'Incomplete standalone bundle' >&2; exit 1; }
/usr/local/sbin/omniroute-backup
current=/opt/omniroute/current
previous=$(readlink -f "$current" || true)
next=/opt/omniroute/current.next
[[ ! -e "$next" && ! -L "$next" ]] || { echo 'Pending activation exists' >&2; exit 1; }
ln -s -- "$release" "$next"
mv -Tf -- "$next" "$current"
systemctl restart omniroute
for attempt in $(seq 1 60); do
  if curl -fsS --max-time 4 http://127.0.0.1:20128/api/health/ping >/dev/null; then
    echo "Activated: $release"
    [[ -z "$previous" ]] || printf '%s\n' "$previous" > /etc/omniroute/previous-release
    exit 0
  fi
  sleep 2
done
if [[ -n "$previous" && -d "$previous" ]]; then
  ln -s -- "$previous" "$next"
  mv -Tf -- "$next" "$current"
  systemctl restart omniroute
  echo 'Startup failed; previous code restored. Review backup before rolling back migrations.' >&2
fi
exit 1
