- **fix(executors):** Preserve caller-supplied `reasoning.context` on Codex HTTP and WebSocket
  Responses requests while continuing to remove unsupported OpenRouter reasoning keys.
  App-server and chatgpt-web-codex transports are unchanged. (#17210 — thanks @seathatflowsinourveins)
