import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { betterSqlite3AliasFor } from "./scripts/build/better-sqlite3-stub-flag.mjs";
import { mitmManagerAliasFor } from "./scripts/build/mitm-stub-flag.mjs";
import { normalizeBasePath } from "./scripts/build/normalizeBasePath.mjs";
import {
  buildSecurityHeaderRules,
  nonPageRoutePrefixes,
  resolveDashboardEmbedMode,
} from "./scripts/build/dashboardEmbed.mjs";
import { shouldBuildStandalone } from "./scripts/build/backendOnlyPages.mjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const distDir = process.env.NEXT_DIST_DIR || ".build/next";
const projectRoot = dirname(fileURLToPath(import.meta.url));
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://static.cloudflareinsights.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://static.cloudflareinsights.com";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https: ws: wss:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

function isNextIntlExtractorDynamicImportWarning(warning) {
  const message = typeof warning === "string" ? warning : warning?.message || "";
  const resource = warning?.module?.resource || warning?.file || "";
  const target = "next-intl/dist/esm/production/extractor/format/index.js";
  return (
    resource.includes(target) &&
    (message.includes("import(t)") || message.includes("dependency is an expression"))
  );
}

const IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES = [
  "/node_modules/fumadocs-mdx/dist/load-from-file-",
  "/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
];

function isKnownInfrastructureBuildDependencyWarning(args) {
  const message = args
    .filter((value) => typeof value === "string")
    .join(" ")
    .replaceAll("\\", "/");
  return (
    message.includes("webpack.FileSystemInfo") &&
    message.includes("for build dependencies failed at 'import(") &&
    message.includes("incorrect cache invalidation") &&
    IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES.some((modulePath) =>
      message.includes(modulePath)
    )
  );
}

function filterKnownInfrastructureWarnings(baseConsole) {
  const filteredConsole = Object.create(baseConsole);
  filteredConsole.warn = (...args) => {
    if (isKnownInfrastructureBuildDependencyWarning(args)) return;
    Reflect.apply(baseConsole.warn, baseConsole, args);
  };
  return filteredConsole;
}

const isMinimalBuild = process.env.OMNIROUTE_BUILD_PROFILE === "minimal";
const dashboardEmbedMode = resolveDashboardEmbedMode(process.env);

const minimalBuildAliases = isMinimalBuild
  ? {
      "@/mitm/cert/install": "./src/mitm/cert/install.stub.ts",
      "@/lib/zed-oauth/keychain-reader": "./src/lib/zed-oauth/keychain-reader.stub.ts",
      "@/lib/cloudSync": "./src/lib/cloudSync.stub.ts",
      "@/lib/services/installers/ninerouter": "./src/lib/services/installers/ninerouter.stub.ts",
    }
  : {};

function readTimeoutMs(...values) {
  for (const value of values) {
    const normalized = typeof value === "string" ? value.trim() : value;
    if (normalized == null || normalized === "") continue;
    const parsed = Number(normalized);
    if (Number.isFinite(parsed) && parsed >= 0) return Math.floor(parsed);
  }
  return 600_000;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH),
  assetPrefix: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH) || undefined,
  env: {
    NEXT_PUBLIC_OMNIROUTE_BASE_PATH: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH),
    NEXT_PUBLIC_SW_BUILD_ID:
      process.env.OMNIROUTE_SW_BUILD_ID || process.env.SOURCE_VERSION || `${Date.now()}`,
  },
  distDir,
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      ...mitmManagerAliasFor(process.env),
      ...betterSqlite3AliasFor(process.env),
      ...minimalBuildAliases,
    },
    ignoreIssue: [
      {
        path: "**/src/lib/agentSkills/**",
        description: /Overly broad patterns can lead to build performance issues/,
      },
      {
        path: "**/open-sse/services/compression/**",
        description: /Overly broad patterns can lead to build performance issues/,
      },
    ],
  },
  ...(shouldBuildStandalone(process.env) ? { output: "standalone" } : {}),
  compress: true,
  productionBrowserSourceMaps: false,
  reactCompiler: true,
  
  // --- LOW-MEMORY & FAST BUILD OPTIMIZATIONS ---
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: process.env.OMNIROUTE_SERVER_ACTIONS_BODY_LIMIT || "50mb",
    },
    webpackMemoryOptimizations: true,
    // Set to false to avoid spawning parallel Webpack worker threads that spike RAM
    webpackBuildWorker: false,
    proxyClientMaxBodySize: process.env.NEXT_PROXY_BODY_LIMIT || "512mb",
    proxyTimeout: readTimeoutMs(process.env.REQUEST_TIMEOUT_MS, process.env.FETCH_TIMEOUT_MS),
    optimizePackageImports: [
      "lobehub/icons",
      "@lobehub/icons",
      "lucide-react",
      "date-fns",
      "lodash",
      "lodash-es",
      "material-symbols",
      "next-intl",
    ],
  },
  outputFileTracingRoot: projectRoot,
  outputFileTracingIncludes: {
    "/*": [
      "./src/lib/db/migrations/**/*",
      "./src/mitm/server.cjs",
      "./open-sse/services/compression/engines/rtk/filters/**/*.json",
      "./open-sse/services/compression/rules/**/*.json",
      "./open-sse/lib/deepseek-pow-hash.js",
      "./open-sse/lib/deepseek-pow-worker.mjs",
      "./node_modules/sql.js/dist/sql-wasm.wasm",
      "./node_modules/tiktoken/tiktoken_bg.wasm",
    ],
  },
  outputFileTracingExcludes: {
    "**/*": [
      "**/.git/**",
      "**/.eslintcache",
      "**/_tasks/**",
      "**/_references/**",
      "**/_ideia/**",
      "**/_mono_repo/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/app.__qa_backup/**",
      "**/tests/**",
      "**/logs/**",
      "**/.claude/**",
      "**/.opencode/**",
      "**/.scratch/**",
      "**/.agents/**",
      "**/.slim/**",
      "**/packages/**",
      "**/.tmp/**",
      "**/electron/**",
      "**/docs/**",
    ],
  },
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "pino-abstract-transport",
    "better-sqlite3",
    "sql.js",
    "tiktoken",
    "sqlite-vec",
    "node-machine-id",
    "keytar",
    "wreq-js",
    "zod",
    "jsdom",
    "@ngrok/ngrok",
    "@huggingface/transformers",
    "ws",
    "bufferutil",
    "utf-8-validate",
    "@modelcontextprotocol/sdk",
    "child_process",
    "fs",
    "path",
    "os",
    "crypto",
    "net",
    "tls",
    "http",
    "https",
    "stream",
    "buffer",
    "util",
    "process",
  ],
  transpilePackages: ["@omniroute/open-sse", "@lobehub/icons", "fumadocs-ui", "fumadocs-core"],
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.250"],

  webpack(config, { dev, webpack }) {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      isNextIntlExtractorDynamicImportWarning,
    ];
    const infrastructureLogging = config.infrastructureLogging || {};
    config.infrastructureLogging = {
      ...infrastructureLogging,
      console: filterKnownInfrastructureWarnings(infrastructureLogging.console || console),
    };
    const nextDefaultSplitChunks = config.optimization?.splitChunks;
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...(config.optimization.splitChunks?.cacheGroups || {}),
        recharts: {
          test: /[\\/]node_modules[\\/]recharts[\\/]/,
          name: "vendor-recharts",
          chunks: "all",
          priority: 20,
        },
        lobeIcons: {
          test: /[\\/]node_modules[\\/]@lobehub[\\/]icons[\\/]/,
          name: "vendor-lobe-icons",
          chunks: "all",
          priority: 20,
        },
        monaco: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: "vendor-monaco",
          chunks: "all",
          priority: 20,
        },
        xyflow: {
          test: /[\\/]node_modules[\\/]@xyflow[\\/]/,
          name: "vendor-xyflow",
          chunks: "all",
          priority: 20,
        },
        mermaid: {
          test: /[\\/]node_modules[\\/]mermaid[\\/]/,
          name: "vendor-mermaid",
          chunks: "all",
          priority: 20,
        },
        nextIntl: {
          test: /[\\/]node_modules[\\/]next-intl[\\/]/,
          name: "vendor-next-intl",
          chunks: "all",
          priority: 25,
        },
        fumadocs: {
          test: /[\\/]node_modules[\\/](fumadocs-ui|fumadocs-core|fumadocs-mdx)[\\/]/,
          name: "vendor-fumadocs",
          chunks: "all",
          priority: 20,
        },
        comboGraph: {
          test: /[\\/]node_modules[\\/]@?dagre[\\/]|[\\/]node_modules[\\/]@?elkjs[\\/]/,
          name: "vendor-combo-graph",
          chunks: "all",
          priority: 20,
        },
      },
    };
    if (dev) config.optimization.splitChunks = nextDefaultSplitChunks;

    if (isMinimalBuild) {
      const replacements = [
        [/^@\/mitm\/cert\/install$/, join(projectRoot, "src/mitm/cert/install.stub.ts")],
        [/^@\/lib\/zed-oauth\/keychain-reader$/, join(projectRoot, "src/lib/zed-oauth/keychain-reader.stub.ts")],
        [/^@\/lib\/cloudSync$/, join(projectRoot, "src/lib/cloudSync.stub.ts")],
        [
          /^@\/lib\/services\/installers\/ninerouter$/,
          join(projectRoot, "src/lib/services/installers/ninerouter.stub.ts"),
        ],
      ];
      for (const [pattern, stubPath] of replacements) {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(pattern, (resource) => {
            resource.request = stubPath;
          })
        );
      }
    }

    return config;
  },
  images: {
    unoptimized: true,
  },

  async headers() {
    const embedRules = buildSecurityHeaderRules({
      mode: dashboardEmbedMode,
      securityHeaders,
      prefixes: dashboardEmbedMode ? nonPageRoutePrefixes(await nextConfig.rewrites()) : [],
    });
    return [
      ...embedRules,
      {
        source: "/dashboard/providers/services/:name/embed/:path*",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors 'self'" }],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/dashboard/skills",
        destination: "/dashboard/omni-skills",
        permanent: true,
      },
      {
        source: "/dashboard/providers/freepik",
        destination: "/dashboard/providers/magnific",
        permanent: true,
      },
      {
        source: "/docs/architecture",
        destination: "/docs/architecture/architecture",
        permanent: true,
      },
      {
        source: "/docs/authz-guide",
        destination: "/docs/architecture/authz-guide",
        permanent: true,
      },
      {
        source: "/docs/codebase-documentation",
        destination: "/docs/architecture/codebase-documentation",
        permanent: true,
      },
      {
        source: "/docs/repository-map",
        destination: "/docs/architecture/repository-map",
        permanent: true,
      },
      {
        source: "/docs/resilience-guide",
        destination: "/docs/architecture/resilience-guide",
        permanent: true,
      },
      { source: "/docs/docker-guide", destination: "/docs/guides/docker-guide", permanent: true },
      {
        source: "/docs/electron-guide",
        destination: "/docs/guides/electron-guide",
        permanent: true,
      },
      { source: "/docs/features", destination: "/docs/guides/features", permanent: true },
      { source: "/docs/i18n", destination: "/docs/guides/i18n", permanent: true },
      { source: "/docs/kiro-setup", destination: "/docs/guides/kiro-setup", permanent: true },
      { source: "/docs/pwa-guide", destination: "/docs/guides/pwa-guide", permanent: true },
      { source: "/docs/setup-guide", destination: "/docs/guides/setup-guide", permanent: true },
      { source: "/docs/termux-guide", destination: "/docs/guides/termux-guide", permanent: true },
      {
        source: "/docs/troubleshooting",
        destination: "/docs/guides/troubleshooting",
        permanent: true,
      },
      { source: "/docs/uninstall", destination: "/docs/guides/uninstall", permanent: true },
      { source: "/docs/user-guide", destination: "/docs/guides/user-guide", permanent: true },
      {
        source: "/docs/api-reference",
        destination: "/docs/reference/api-reference",
        permanent: true,
      },
      { source: "/docs/cli-tools", destination: "/docs/reference/cli-tools", permanent: true },
      { source: "/docs/environment", destination: "/docs/reference/environment", permanent: true },
      { source: "/docs/free-tiers", destination: "/docs/reference/free-tiers", permanent: true },
      {
        source: "/docs/provider-reference",
        destination: "/docs/reference/provider-reference",
        permanent: true,
      },
      { source: "/docs/a2a-server", destination: "/docs/frameworks/a2a-server", permanent: true },
      {
        source: "/docs/agent-protocols-guide",
        destination: "/docs/frameworks/agent-protocols-guide",
        permanent: true,
      },
      { source: "/docs/cloud-agent", destination: "/docs/frameworks/cloud-agent", permanent: true },
      { source: "/docs/evals", destination: "/docs/frameworks/evals", permanent: true },
      {
        source: "/docs/gamification",
        destination: "/docs/frameworks/gamification",
        permanent: true,
      },
      { source: "/docs/mcp-server", destination: "/docs/frameworks/mcp-server", permanent: true },
      { source: "/docs/memory", destination: "/docs/frameworks/memory", permanent: true },
      { source: "/docs/opencode", destination: "/docs/frameworks/opencode", permanent: true },
      { source: "/docs/skills", destination: "/docs/frameworks/skills", permanent: true },
      { source: "/docs/webhooks", destination: "/docs/frameworks/webhooks", permanent: true },
      { source: "/docs/auto-combo", destination: "/docs/routing/auto-combo", permanent: true },
      {
        source: "/docs/reasoning-replay",
        destination: "/docs/routing/reasoning-replay",
        permanent: true,
      },
      { source: "/docs/cli-token", destination: "/docs/security/cli-token", permanent: true },
      {
        source: "/docs/cli-token-auth",
        destination: "/docs/security/cli-token-auth",
        permanent: true,
      },
      { source: "/docs/compliance", destination: "/docs/security/compliance", permanent: true },
      {
        source: "/docs/error-sanitization",
        destination: "/docs/security/error-sanitization",
        permanent: true,
      },
      { source: "/docs/guardrails", destination: "/docs/security/guardrails", permanent: true },
      { source: "/docs/public-creds", destination: "/docs/security/public-creds", permanent: true },
      {
        source: "/docs/route-guard-tiers",
        destination: "/docs/security/route-guard-tiers",
        permanent: true,
      },
      {
        source: "/docs/stealth-guide",
        destination: "/docs/security/stealth-guide",
        permanent: true,
      },
      {
        source: "/docs/compression-engines",
        destination: "/docs/compression/compression-engines",
        permanent: true,
      },
      {
        source: "/docs/compression-guide",
        destination: "/docs/compression/compression-guide",
        permanent: true,
      },
      {
        source: "/docs/compression-language-packs",
        destination: "/docs/compression/compression-language-packs",
        permanent: true,
      },
      {
        source: "/docs/compression-rules-format",
        destination: "/docs/compression/compression-rules-format",
        permanent: true,
      },
      {
        source: "/docs/rtk-compression",
        destination: "/docs/compression/rtk-compression",
        permanent: true,
      },
      { source: "/docs/coverage-plan", destination: "/docs/ops/coverage-plan", permanent: true },
      {
        source: "/docs/e2e-dashboard-shakedown-v3.8.0",
        destination: "/docs/ops/e2e-dashboard-shakedown-v3.8.0",
        permanent: true,
      },
      {
        source: "/docs/fly-io-deployment-guide",
        destination: "/docs/ops/fly-io-deployment-guide",
        permanent: true,
      },
      { source: "/docs/proxy-guide", destination: "/docs/ops/proxy-guide", permanent: true },
      {
        source: "/docs/release-checklist",
        destination: "/docs/ops/release-checklist",
        permanent: true,
      },
      { source: "/docs/sqlite-runtime", destination: "/docs/ops/sqlite-runtime", permanent: true },
      { source: "/docs/tunnels-guide", destination: "/docs/ops/tunnels-guide", permanent: true },
      {
        source: "/docs/vm-deployment-guide",
        destination: "/docs/ops/vm-deployment-guide",
        permanent: true,
      },
      { source: "/dashboard/cli-tools", destination: "/dashboard/cli-code", permanent: true },
      {
        source: "/dashboard/cli-tools/:path*",
        destination: "/dashboard/cli-code/:path*",
        permanent: true,
      },
      { source: "/dashboard/agents", destination: "/dashboard/acp-agents", permanent: true },
      {
        source: "/dashboard/agents/:path*",
        destination: "/dashboard/acp-agents/:path*",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/chat/completions",
        destination: "/api/v1/chat/completions",
      },
      {
        source: "/responses",
        destination: "/api/v1/responses",
      },
      {
        source: "/responses/:path*",
        destination: "/api/v1/responses/:path*",
      },
      {
        source: "/models",
        destination: "/api/v1/models",
      },
      {
        source: "/v1/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1/v1",
        destination: "/api/v1",
      },
      {
        source: "/codex/:path*",
        destination: "/api/v1/responses",
      },
      {
        source: "/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1",
        destination: "/api/v1",
      },
      {
        source: "/v1beta/:path*",
        destination: "/api/v1beta/:path*",
      },
      {
        source: "/v1beta",
        destination: "/api/v1beta",
      },
      {
        source: "/anthropic/:path*",
        destination: "/api/anthropic/:path*",
      },
      {
        source: "/openai/:path*",
        destination: "/api/openai/:path*",
      },
      {
        source: "/metrics",
        destination: "/api/metrics",
      },
      {
        source: "/debug",
        destination: "/api/debug",
      },
      {
        source: "/.env",
        destination: "/api/.env",
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
