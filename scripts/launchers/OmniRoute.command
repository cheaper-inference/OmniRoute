#!/usr/bin/env bash
# OmniRoute launcher (macOS: double-click; Linux: run from a terminal).
PORT=20128
URL="http://localhost:${PORT}/dashboard"

open_url() {
  if command -v open >/dev/null 2>&1; then open "$1"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$1" >/dev/null 2>&1
  fi
}

port_open() { (exec 3<>"/dev/tcp/127.0.0.1/${PORT}") 2>/dev/null; }

# Finder starts .command files with a minimal PATH; add the usual Node locations.
export PATH="$PATH:/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/current/bin"

if ! command -v omniroute >/dev/null 2>&1; then
  echo "OmniRoute is not installed yet."
  echo "Install Node.js 22 or newer from https://nodejs.org, then run:"
  echo "    npm install -g omniroute"
  read -r -p "Press Enter to close..." _
  exit 1
fi

if port_open; then
  open_url "$URL"
  exit 0
fi

(
  for _ in $(seq 1 60); do
    if port_open; then open_url "$URL"; break; fi
    sleep 1
  done
) &

echo "Starting OmniRoute on ${URL}"
echo "Keep this window open while you use it. Close it to stop the server."
omniroute serve --no-open
