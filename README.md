# OmniRoute

OmniRoute is a local AI gateway: one OpenAI-compatible endpoint (`/v1`) in front of 393 providers,
with combos (ordered fallback chains), quota tracking, compression, MCP and A2A.
This repository is a fork of [cheaper-inference/OmniRoute](https://github.com/cheaper-inference/OmniRoute).

This README only covers what this fork changes and how to run it. For everything else
(providers, routing strategies, CLI, deployment) see the [`docs/`](docs/) folder.
The full upstream README is kept as [`docs/ORIGINAL_README.md`](docs/ORIGINAL_README.md).

## What this fork changes

The `/home` dashboard page now shows usage at a glance, without opening Analytics.

| Area                 | Change                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Usage block          | Total, input and output tokens, estimated cost, errors with success and fallback rate, and the activity heatmap. Same cards as Analytics. |
| Range selector       | 1D, 7D, 30D, 90D, YTD, All and Custom (reuses the Analytics range picker).                                                                |
| Usage by combo       | Requests and tokens per combo for the selected range. New endpoint `GET /api/usage/by-combo`.                                             |
| Claude quota         | Provider quota card next to the usage block, showing every quota row (no "show more" toggle).                                             |
| Layout               | Usage and quota side by side; topology and recent requests are shorter and share the same height.                                         |
| Removed from `/home` | The host CPU and memory cards (the component still exists, it is just not mounted).                                                       |

### New endpoint

```
GET /api/usage/by-combo?range=1d|7d|30d|90d|ytd|all|custom[&startDate=ISO&endDate=ISO]
```

Requires management authentication. `custom` needs `startDate`. Response:

```json
{
  "range": "1d",
  "combos": [
    {
      "comboName": "coder",
      "requests": 703,
      "successCount": 690,
      "inputTokens": 190500000,
      "outputTokens": 900000
    }
  ]
}
```

Calls without a combo are ignored. Upstream HTTP attempts are not counted as extra requests.

### Changed files

- `src/app/(dashboard)/home/HomeUsageWidgets.tsx` (new): the usage block.
- `src/app/(dashboard)/home/page.tsx`: mounts the usage block with the quota card as `aside`.
- `src/app/(dashboard)/home/ProviderQuotaWidget.tsx`: new optional `providers` filter and `showAllQuotas` props; the provider header sits above its quota rows.
- `src/app/(dashboard)/home/ProviderTopology.tsx`, `HomeRecentRequests.tsx` and `dashboard/HomePageClient.tsx`: shorter panels with matching height.
- `src/app/api/usage/by-combo/route.ts` and `src/lib/db/comboUsageSummary.ts` (new): the by-combo endpoint and its query.
- `src/i18n/messages/en.json` and `es.json`: new `home` keys. Other locales fall back to English.
- Tests: `tests/unit/usage-by-combo.test.ts`, `tests/unit/ui/home-usage-widgets.test.tsx` and `tests/unit/ui/provider-quota-show-all-quotas.test.tsx`.

## Requirements

Node.js `>=22.22.2 <23` or `>=24.0.0 <27` (see `engines` in `package.json`).

## Run it

```bash
cp .env.example .env
npm install
npm run dev          # development server, default port 20128
```

Production-style run from the sources:

```bash
npm run build        # Next.js standalone build
npm run build:cli    # assembles dist/, which the CLI serves
node bin/omniroute.mjs
```

`npm run build` is memory hungry. On a machine with limited RAM, cap it with
`OMNIROUTE_BUILD_MEMORY_MB` and prefer webpack (`OMNIROUTE_USE_TURBOPACK=0`). Both variables
are documented in [`docs/reference/ENVIRONMENT.md`](docs/reference/ENVIRONMENT.md).

## Test

```bash
# Endpoint (Node test runner)
node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test tests/unit/usage-by-combo.test.ts

# UI (Vitest)
npx vitest run --config vitest.config.ts \
  tests/unit/ui/home-usage-widgets.test.tsx \
  tests/unit/ui/provider-quota-show-all-quotas.test.tsx

npm run lint
```

The dashboard type check (`tsconfig.typecheck-dashboard.json`) already reports errors that are
unrelated to these changes.

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Environment variables](docs/reference/ENVIRONMENT.md)
- [Docker guide](docs/guides/DOCKER_GUIDE.md)
- [Architecture](docs/architecture/)
- [Changelog](CHANGELOG.md) · [Roadmap](ROADMAP.md) · [Security](SECURITY.md)

## License

MIT, see [LICENSE](LICENSE). Original work by the OmniRoute authors; this fork keeps their license
and copyright notice.
