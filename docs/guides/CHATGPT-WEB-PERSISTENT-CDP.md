---
title: "ChatGPT Web: persistent CDP profile"
version: 3.8.52
lastUpdated: 2026-10-18
---

# ChatGPT Web: persistent CDP profile

Set `CHATGPT_WEB_CODEX_USE_CDP_PROFILE=1` alongside the configured ChatGPT CDP endpoint (`CHATGPT_WEB_CODEX_CDP_URL` or the connection's CDP URL) to reuse an externally managed browser profile instead of creating isolated contexts. This option is disabled by default: unset (or any value other than `1`), and whenever no CDP endpoint is configured, the adapter keeps creating isolated contexts and tabs exactly as before. While it is `1`, the adapter also caps concurrent ChatGPT browser tabs at 1 (default 5).

Use a dedicated browser profile owned by the same operating-system user as OmniRoute. Bind the debugging port to loopback, keep profile permissions private, sign into ChatGPT interactively, and leave exactly one ChatGPT page open. The browser process and its startup/recovery are managed by the operator, separately from OmniRoute. Do not expose CDP through a public tunnel.

The persistent mode supports one account/workspace and one active browser turn per process. It verifies the account before using the saved session, accepts rotated session tokens only for the bound account, and refuses another account/workspace. Separate accounts require separate browser profiles and appropriately isolated runtimes. Deployment should run a single gateway instance for the shared browser.

Validation and inference lease the existing page. Success, failure, and cancellation release ownership; the external browser page remains open. A new turn resets the temporary conversation and clears stale drafts. Persistent session refresh reads current browser state instead of injecting stale cookies.

The adapter also recognizes the current composer, model-picker, and assistant response markers. It verifies the selected model family before submission. Native Codex message IDs must survive routing sanitation so the adapter can authenticate the turn's environment and filesystem permissions.

A headed browser with a saved profile does not guarantee permanent authentication or absence of security checks. Headless operation is environment dependent; if ChatGPT presents a security challenge, use the same dedicated browser interactively to recover. Avoid repeated browser launches or automatic challenge retry loops. Hiding/minimizing a browser does not remove its renderer memory cost.

## Verification

Run persistent-context tests, native-message provenance tests, and existing reasoning-input sanitation tests. Validate the same account twice without creating more pages. Run two native `/v1/responses` turns and verify distinct outputs; then test the real Codex client with a harmless tool call. Verify restart persistence and cancellation recovery. Do not infer end-to-end success from a direct adapter smoke test.
