---
title: "Progressive Web App (PWA) Guide"
version: 3.8.54
lastUpdated: 2026-11-16
---

# Progressive Web App (PWA) Guide

Install the OmniRoute dashboard as a Progressive Web App to open it from your home
screen or desktop in a standalone window. The installed app still needs a connection
to your OmniRoute server for navigation, dashboard data and API requests. Cached
static assets do not provide an offline gateway or an offline dashboard.

## What Is a PWA?

A Progressive Web App uses the web dashboard with an app icon and a separate window.
Once installed, OmniRoute:

- Launches from your home screen or desktop
- Opens in standalone mode, without the browser's usual address bar and tabs
- Caches selected static assets
- Supports portrait and landscape orientations

## Installation

Use an HTTPS address for a server on another device. When the server runs on the
same device, `http://localhost:20128` also meets browser installability requirements.
A plain `http://YOUR_IP:20128` address does not meet those requirements. Installation
menus and prompts depend on the browser and operating system. See
[MDN's PWA installation requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Open your OmniRoute HTTPS address, or `http://localhost:20128` for a server on the same phone.
2. Open the **⋮** menu and choose **Install app** or **Add to Home screen**, if offered.
3. Confirm the prompt.
4. Open OmniRoute from the home screen.

### iOS (Safari)

1. Open your OmniRoute HTTPS address in Safari.
2. Tap **Share** → **Add to Home Screen**.
3. Confirm the name and tap **Add**.
4. Open OmniRoute from the home screen.

### Desktop (Chrome / Edge)

1. Open your OmniRoute dashboard.
2. Use the browser's install icon or the **Install app** menu entry, if offered.
3. Confirm the prompt to open OmniRoute in its own window.

## Features

### Standalone Window

The manifest sets `display: "standalone"` and `start_url: "/dashboard"`. The installed
app opens the dashboard in an app window. Browser and operating-system controls can
still appear; the manifest does not request fullscreen mode.

### Cached Assets and Network Requirements

The [service worker](../../public/sw.js) caches selected same-origin resources:

| Request or asset                         | Strategy      | Behavior                                                                                                        |
| ---------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| Install-time resources                   | Pre-cache     | `/`, `/manifest.webmanifest`, `/icon-512.png` and `/apple-touch-icon.png` are cached during worker installation |
| Next.js static assets (`/_next/`)        | Network-first | Successful responses update the cache; a network error falls back to an existing cached response                |
| Other static CSS, JS, images and fonts   | Cache-first   | An existing cached response is reused; successful network responses are cached on a miss                        |
| Page navigation                          | Bypass        | The browser fetches the page directly; no offline fallback is served                                            |
| API, dashboard and authentication routes | Bypass        | The worker does not intercept or cache these requests                                                           |
| Other non-static requests                | Network       | No cache lookup or storage                                                                                      |

The excluded routes are `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`,
`/chat`, `/responses`, `/codex`, `/callback` and `/login`, matched case-insensitively
at path boundaries. Cross-origin and non-GET requests also bypass the worker.

### Connectivity Page

The `/offline` page provides a connectivity message, an online/offline indicator,
a **Retry Connection** button and a link to the status page. It is **not pre-cached**
and the service worker does **not** redirect failed navigations to it. Its existence
does not make new pages accessible without the server.

### App Icons

The manifest advertises these PNG icons:

| File                   | Size    | Use                           |
| ---------------------- | ------- | ----------------------------- |
| `icon-192.png`         | 192×192 | General app icon              |
| `icon-512.png`         | 512×512 | General and maskable app icon |
| `apple-touch-icon.png` | 180×180 | Apple home screen icon        |

The browser selects the appropriate icon for the installation target.

### Automatic Registration

`PwaRegister` registers the worker in production when the browser supports service
workers. Development mode unregisters workers and clears caches to avoid stale
assets interfering with hot reload. Install prompts remain a browser decision.

## Technical Architecture

### Web App Manifest

Next.js generates `/manifest.webmanifest` from
[`src/app/manifest.ts`](../../src/app/manifest.ts). Its key settings are:

| Setting                     | Value                                             |
| --------------------------- | ------------------------------------------------- |
| `short_name`                | `OmniRoute`                                       |
| `start_url`                 | `/dashboard`                                      |
| `scope`                     | `/`                                               |
| `display`                   | `standalone`                                      |
| `orientation`               | `any`                                             |
| Background and theme colors | The default light palette from `PWA_THEME_COLORS` |

The manifest's name and description are static values in that source file.
The installed manifest does not follow the instance-name setting or the active
palette on every visit.

### Service Worker

[`public/sw.js`](../../public/sw.js) has no service-worker framework dependency:

- **Install:** pre-caches the four resources listed above and activates the new worker.
- **Activate:** removes older cache generations and claims clients.
- **Fetch:** applies the static-asset strategies and route exclusions above.
- **Versioning:** the source cache name is `omniroute-pwa-v3`; the production build stamps the cache identity.
- **Notifications:** handles incoming `push` events and focuses or opens a window when a notification is clicked.

Push event handlers alone do not establish an active push subscription or configured
server delivery. Do not assume notifications are enabled merely because the PWA is installed.

### Layout Metadata and Registration

[`src/app/layout.tsx`](../../src/app/layout.tsx) provides the manifest link, Apple
standalone metadata, theme colors and `viewport-fit: cover`. The page title and Apple
web-app title use the instance name. The live browser theme color follows the palette;
the install manifest uses the default light color.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) runs on the client and
registers `/sw.js` with the build ID in its URL. It detects mismatched cache generations
and can reset the worker and reload once to recover from an older installation.
Registration failure does not block the dashboard.

## Use With Termux (Android)

1. Start OmniRoute in Termux: `npx omniroute`.
2. Open Chrome on the same phone: `http://localhost:20128`.
3. Install the PWA through the browser's installation menu.
4. Keep the Termux server running while using the dashboard.

The phone hosts both the gateway and its dashboard. Requests to remote AI providers
still need network access. See the [Termux guide](TERMUX_GUIDE.md) for setup and
Android process-lifetime considerations.

## Use From Other Devices

Open the server's HTTPS address on a phone, tablet or desktop, then follow that
browser's installation flow. The server must remain reachable from each device.
See the [tunnel guide](../ops/TUNNELS_GUIDE.md) for remote access options.

## Customization

### Instance Name

The **Instance Name** setting changes dashboard metadata, including the page title
and Apple web-app title. The generated manifest uses a static name, so this setting
does not guarantee that an already installed app is renamed.

### Custom Favicon

A custom favicon changes the browser favicon. The install manifest still advertises
the PNG files above; changing the favicon does not replace those home-screen icons.

## Limitations

- **Server connection required:** page navigation, dashboard state and API requests do not have an offline fallback.
- **No background sync:** offline actions are not queued for replay.
- **Browser differences:** installation menus, window presentation and notification support vary by platform.
- **No API response cache:** the worker excludes API, dashboard and authentication routes.
- **Static install icons:** updating those icons requires changing the advertised assets; browsers may retain installed metadata.

## Files Reference

| File                                                                                   | Purpose                                              |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Generated web app manifest                           |
| [public/sw.js](../../public/sw.js)                                                     | Caching, exclusions and notification event handlers  |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Production registration and stale-cache recovery     |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Connectivity page, not an automatic offline fallback |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Page metadata and viewport settings                  |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Shared theme-color values                            |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512×512 app icon                                     |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180×180 Apple icon                                   |
