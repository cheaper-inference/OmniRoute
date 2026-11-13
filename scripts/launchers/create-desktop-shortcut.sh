#!/usr/bin/env bash
# Creates an OmniRoute launcher on the Desktop (macOS and Linux).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAUNCHER="${HERE}/OmniRoute.command"
chmod +x "${LAUNCHER}"

if command -v xdg-user-dir >/dev/null 2>&1; then
  DESKTOP_DIR="$(xdg-user-dir DESKTOP)"
else
  DESKTOP_DIR="${HOME}/Desktop"
fi
mkdir -p "${DESKTOP_DIR}"

if [ "$(uname -s)" = "Darwin" ]; then
  TARGET="${DESKTOP_DIR}/OmniRoute.command"
  cp "${LAUNCHER}" "${TARGET}"
  chmod +x "${TARGET}"
  echo "Created ${TARGET}"
  echo "First run: right-click the file, choose Open, then confirm."
else
  TARGET="${DESKTOP_DIR}/OmniRoute.desktop"
  {
    echo "[Desktop Entry]"
    echo "Type=Application"
    echo "Name=OmniRoute"
    echo "Comment=Start OmniRoute and open the dashboard"
    echo "Exec=bash \"${LAUNCHER}\""
    echo "Terminal=true"
    echo "Icon=utilities-terminal"
  } > "${TARGET}"
  chmod +x "${TARGET}"
  gio set "${TARGET}" metadata::trusted true 2>/dev/null || true
  echo "Created ${TARGET}"
  echo "If it shows a warning, right-click it and choose Allow Launching."
fi
