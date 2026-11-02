---
title: "GitHub Copilot Provider"
---

# GitHub Copilot Provider

**Status: Experimental / Policy-ambiguous**

OmniRoute can route requests through a user's own GitHub Copilot subscription.
This document explains what users receive, how to connect GitHub, and what
OmniRoute can and cannot measure about the allowance.

## Important: Experimental Status

OmniRoute uses the `api.githubcopilot.com` endpoint — the same endpoint used by
the official GitHub Copilot CLI and VS Code extension. **GitHub has not published
this endpoint as a general third-party inference API.** The integration is
therefore classified as experimental and policy-ambiguous.

- GitHub may change or revoke API access without notice.
- Users must use their own GitHub account. Credentials must never be shared.
- Users remain responsible for their GitHub plan, billing settings, and
  compliance with GitHub's Terms of Service.

Source references (accessed 2026-09-02):

- [GitHub Terms for Additional Products and Features](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
- [GitHub Copilot Product Specific Terms](https://github.com/customer-terms/github-copilot-product-specific-terms)
- [GitHub Copilot Plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)

## What Users Receive

| Plan       | Credits / month (documented)             | Model selection |
| ---------- | ---------------------------------------- | --------------- |
| Free       | "An allowance" — amount not published    | Auto-only       |
| Student    | "An allowance" — amount not published    | Auto-only       |
| Pro        | 1,000 base + 500 flex = 1,500 total      | Explicit        |
| Pro+       | 3,900 base + 3,100 flex = 7,000 total    | Explicit        |
| Max        | 10,000 base + 10,000 flex = 20,000 total | Explicit        |
| Business   | 1,900/seat                               | Explicit        |
| Enterprise | 3,900/seat                               | Explicit        |

**GitHub Copilot is not available on GitHub Enterprise Server.**

## How to Connect

1. Open the OmniRoute dashboard → Providers → GitHub Copilot.
2. Read the experimental-status warning and acknowledge it.
3. Click **Connect GitHub**. A device authorization code appears.
4. Visit `https://github.com/login/device` and enter the code.
5. Authorize the OmniRoute app in your GitHub account.
6. OmniRoute verifies your Copilot entitlement and discovers your plan tier.
7. The connection status shows your plan (if detectable) and model availability.

To disconnect: open the provider card and click **Disconnect**.

## What OmniRoute Can and Cannot Measure

**Can measure (when the GitHub API returns it):**

- Plan tier (from `copilot_plan` field in the user API response)
- Chat and completion quota remaining for Free accounts (from `limited_user_quotas`)
- Quota percentage remaining for paid accounts (from `quota_snapshots`)
- Whether model picker is enabled per model

**Cannot measure:**

- The exact credit quantity included in the Free plan (GitHub does not publish this)
- Whether additional paid usage is enabled unless the API includes an explicit field
- Future changes to the plan or quota mid-month

## Why No Fixed Free-Token Count Is Shown

GitHub's published documentation for the Free plan states only "An allowance of
GitHub AI Credits" without specifying the quantity. OmniRoute therefore represents
the Free plan quota as **"unknown"** — not zero and not unlimited.

OmniRoute will never add a speculative credit count to its aggregate free-token
headline. The allowance appears as a connected-account benefit separate from
numeric free-token pools.

## Automatic Model Selection for Free Accounts

On the Free and Student plans, GitHub does not allow users to pick models. The
Copilot UI automatically selects a model for each request.

OmniRoute represents this as the catalog model **"Auto"** (`auto`). For each
request routed through it, OmniRoute first asks Copilot's `/auto` endpoint which
concrete model should serve the turn, then sends the request with that model ID
and the session token `/auto` returned (`open-sse/executors/github/autoModel.ts`).
GitHub makes the choice; the model can differ from one request to the next.

Free and Student accounts can only use `auto`. Explicit models such as
`claude-opus-5` or `gpt-5.4` are only shown when the account's live capabilities
confirm model selection is allowed.

## Routing and Fallback Behavior

- A healthy connected account may participate in normal routing.
- Quota exhaustion triggers a narrow account/model lockout; other providers and
  other GitHub accounts are unaffected.
- Authentication failure affects only that connection.
- Provider-level GitHub outages may use the provider circuit breaker.
- OmniRoute respects retry/reset information returned by GitHub. When no reset
  time is available, it requires conservative revalidation rather than retrying
  aggressively.

## Billing and Overage Uncertainty

If your GitHub plan includes additional paid usage ("pay as you go"), exceeding
your base allowance may result in charges from GitHub. OmniRoute cannot reliably
determine whether paid overage is enabled on your account. Users should manage
spending controls directly in GitHub settings:
[github.com/settings/copilot](https://github.com/settings/copilot)

## Troubleshooting

**"Copilot entitlement not found":** Your GitHub account does not have an active
Copilot subscription. Enable Copilot Free at
[github.com/features/copilot](https://github.com/features/copilot).

**"Authorization expired":** The connection's OAuth token has expired. Disconnect
and reconnect to issue a fresh device authorization.

**"No models available":** Capability discovery could not reach the Copilot API.
Check your internet connection and try reconnecting.

**Quota exhausted:** The Free plan allows a limited number of chat and completion
requests per month. Wait for the monthly reset or upgrade your Copilot plan.

## Notes for Operators

- Credentials are encrypted at rest using OmniRoute's standard AES-256-GCM scheme.
- The device authorization flow uses GitHub's public client ID (embedded via
  `resolvePublicCred()` per Hard Rule #11 — no secret is involved).
- Capability records are refreshed every 6 hours (configurable).
- The provider is excluded from auto-combo scoring unless an explicit routing
  policy is selected, because its credit quantity is unknown and cannot be
  represented as a quantified token budget.
