"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProductSwitcher } from "@omniroute/ui-kit/keak-brand";
import { SidebarTrigger, useSidebar } from "@omniroute/ui-kit/sidebar";

const subscribePlatform = () => () => {};
const getPlatformIsMac = () => {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform || navigator.userAgent;
  return /Mac|iPhone|iPad|iPod/.test(platform);
};
const getPlatformIsMacServer = () => false;

// One title per page (F4): 67+ dashboard pages render a kit PageHeader (their own h1), and the
// shell title repeated it ("API Keys" × "API Key Management", two h1s). The shell title is
// dropped from the DOM while a PageHeader is mounted — removed, not CSS-hidden, so `h1` locators
// and the accessibility tree see exactly one page heading. SSR and hydration render the title
// (server snapshot false); client navigation re-checks through the observer. Scoped to the shell's
// content region (#main-content): a PageHeader inside a portalled dialog does not count, and the
// observer does not wake on unrelated body mutations (review M-1/N-6).
const PAGE_HEADER_SELECTOR = "#main-content .ci-page-header";
const contentRoot = () => document.getElementById("main-content") ?? document.body;
function subscribePageHeader(onChange: () => void) {
  let frame = 0;
  const observer = new MutationObserver(() => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  });
  observer.observe(contentRoot(), { childList: true, subtree: true });
  return () => {
    observer.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
}
const getPageHasHeader = () => document.querySelector(PAGE_HEADER_SELECTOR) !== null;
const getPageHasHeaderServer = () => false;
import ThemeToggle from "./ThemeToggle";
import TokenHealthBadge from "./TokenHealthBadge";
import DegradationBadge from "./DegradationBadge";
import LanguageSelector from "./LanguageSelector";
import ProviderIcon from "./ProviderIcon";
import { useTranslations } from "next-intl";
import {
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  NOAUTH_PROVIDERS,
  CLAUDE_CODE_COMPATIBLE_PREFIX,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import {
  SIDEBAR_SECTIONS,
  getSectionItems,
  type SidebarItemDefinition,
  type HideableSidebarItemId,
} from "@/shared/constants/sidebarVisibility";
import { useIsElectron } from "@/shared/hooks/useElectron";
import { KEAK_ACTIVE_PRODUCT, KEAK_PRODUCT_LINKS } from "@/shared/constants/keakProducts";
import Button from "./Button";
import Icon from "./Icon";

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

// Map sidebar item id → header description i18n key
// "omni-skills" is an extended key for the /dashboard/omni-skills route (graceful fallback during deploy)
// `proxy` is a live (non-hideable) item id with its own description, so the key type names it;
// the dead `settings` key (no item has that id) was dropped.
const HEADER_DESCRIPTIONS: Partial<
  Record<HideableSidebarItemId | "omni-skills" | "proxy", string>
> = {
  home: "homeDescription",
  endpoints: "endpointDescription",
  "api-manager": "apiManagerDescription",
  providers: "providerDescription",
  combos: "comboDescription",
  batch: "batchDescription",
  costs: "costsDescription",
  analytics: "analyticsDescription",
  cache: "cacheDescription",
  quota: "limitsDescription",
  runtime: "runtimeDescription",
  media: "mediaDescription",
  "cli-code": "cliToolsDescription",
  "cli-agents": "agentsDescription",
  "acp-agents": "agentsDescription",
  "cloud-agents": "cloudAgentsDescription",
  memory: "memoryDescription",
  skills: "skillsDescription",
  "agent-skills": "agentSkillsDescription",
  "omni-skills": "omniSkillsDescription",
  "context-caveman": "contextCavemanDescription",
  "context-rtk": "contextRtkDescription",
  "context-combos": "contextCombosDescription",
  translator: "translatorDescription",
  playground: "playgroundDescription",
  "search-tools": "searchToolsDescription",
  logs: "logsDescription",
  audit: "auditDescription",
  webhooks: "webhooksDescription",
  health: "healthDescription",
  proxy: "proxyDescription",
  changelog: "changelogDescription",
  // Protocols
  mcp: "mcpDescription",
  a2a: "a2aDescription",
  "api-endpoints": "apiEndpointsDescription",
  // Agents & AI sub-pages
  "batch-files": "batchFilesDescription",
  // Analytics sub-pages
  "analytics-evals": "analyticsEvalsDescription",
  "analytics-search": "analyticsSearchDescription",
  "analytics-utilization": "analyticsUtilizationDescription",
  "analytics-combo-health": "analyticsComboHealthDescription",
  "analytics-compression": "analyticsCompressionDescription",
  // Costs sub-pages
  "costs-budget": "costsBudgetDescription",
  "costs-pricing": "costsPricingDescription",
  // Logs sub-pages
  "logs-proxy": "logsProxyDescription",
  "logs-console": "logsConsoleDescription",
  "logs-activity": "logsActivityDescription",
  // Audit sub-pages
  "audit-mcp": "auditMcpDescription",
  // Settings sub-pages
  "settings-general": "settingsGeneralDescription",
  "settings-appearance": "settingsAppearanceDescription",
  "settings-ai": "settingsAiDescription",
  "settings-security": "settingsSecurityDescription",
  "settings-routing": "settingsRoutingDescription",
  "settings-resilience": "settingsResilienceDescription",
  "settings-cache": "settingsCacheDescription",
  "settings-advanced": "settingsAdvancedDescription",
  // Proxy sub-pages
  "mitm-proxy": "mitmProxyDescription",
  "1proxy": "oneProxyDescription",
};

// Build href → sidebar item lookup (non-external items only)
const sidebarByHref = new Map<string, SidebarItemDefinition>();
for (const section of SIDEBAR_SECTIONS) {
  for (const item of getSectionItems(section)) {
    if (!item.external) sidebarByHref.set(item.href, item);
  }
}

function getSidebarItem(pathname: string): SidebarItemDefinition | undefined {
  const exact = sidebarByHref.get(pathname);
  if (exact) return exact;
  // Longest prefix match
  let best: SidebarItemDefinition | undefined;
  let bestLen = 0;
  for (const [href, item] of sidebarByHref) {
    if (pathname.startsWith(href) && href.length > bestLen) {
      best = item;
      bestLen = href.length;
    }
  }
  return best;
}

type HeaderProps = {
  onOpenCommandPalette?: () => void;
};

type PageInfo = {
  title: string;
  description: string;
  icon?: string;
  providerId?: string;
};

function usePageInfo(pathname: string | null): PageInfo {
  const ts = useTranslations("sidebar");
  const th = useTranslations("header");

  if (!pathname) return { title: "", description: "" };

  // Special: provider detail page /dashboard/providers/[id]
  const providerMatch = pathname.match(/\/providers\/([^/]+)$/);
  if (providerMatch) {
    const pid = providerMatch[1];
    const info = OAUTH_PROVIDERS[pid] || NOAUTH_PROVIDERS[pid] || APIKEY_PROVIDERS[pid];
    if (info) return { title: info.name, description: "", providerId: info.id };
    if (pid.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX))
      return { title: "CC Compatible", description: "", providerId: "claude" };
    if (pid.startsWith(OPENAI_COMPATIBLE_PREFIX))
      return { title: th("openaiCompatible"), description: "", providerId: "oai-cc" };
    if (pid.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
      return { title: th("anthropicCompatible"), description: "", providerId: "anthropic-m" };
  }

  // Derive from sidebar
  const item = getSidebarItem(pathname);
  if (item) {
    const descKey = HEADER_DESCRIPTIONS[item.id];
    return {
      title: ts(item.i18nKey),
      description: descKey ? th(descKey) : "",
      icon: item.icon,
    };
  }

  return { title: "", description: "" };
}

/**
 * Dashboard top bar on the kit shell header (`.ci-sidebar-shell-header`). Renders inside the
 * kit `SidebarProvider`; its `SidebarTrigger` is the shell's only sidebar toggle (collapse on
 * desktop, opens the mobile Sheet below the shell's 1024 px breakpoint).
 */
export default function Header({ onOpenCommandPalette }: HeaderProps) {
  const isMac = useSyncExternalStore(subscribePlatform, getPlatformIsMac, getPlatformIsMacServer);
  const pageHasHeader = useSyncExternalStore(
    subscribePageHeader,
    getPageHasHeader,
    getPageHasHeaderServer
  );
  const pathname = usePathname();
  const router = useRouter();
  const isElectron = useIsElectron();
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const ts = useTranslations("sidebar");
  const { isMobile, open, openMobile } = useSidebar();
  const triggerLabel = isMobile
    ? openMobile
      ? tc("close")
      : t("openMenu")
    : open
      ? ts("collapseSidebar")
      : ts("expandSidebar");
  const { title, description, icon, providerId } = usePageInfo(pathname);
  const isMacElectron =
    isElectron &&
    typeof window !== "undefined" &&
    (window as any).electronAPI?.platform === "darwin";
  const safeTop = isMacElectron ? "var(--desktop-safe-top)" : "var(--ios-safe-top, 0px)";

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    // No explicit role="banner": the kit shell mounts this inside SidebarInset's <main>, and a
    // banner landmark must stay top-level. The kit header has a fixed height, so the safe-area
    // inset (macOS Electron title bar / iOS standalone notch) is added to it, not carved out of it.
    <header
      className="ci-sidebar-shell-header sticky top-0 z-10 bg-bg"
      style={{ paddingTop: safeTop, height: `calc(4rem + var(--ci-border-default) + ${safeTop})` }}
    >
      <SidebarTrigger aria-label={triggerLabel}>
        <Icon name="menu" size={18} />
      </SidebarTrigger>
      <div className="hidden min-w-0 items-center gap-3 lg:flex">
        {/* The icon tile goes with the title: alone it would be an orphan glyph (review M-2). */}
        {(icon || providerId) && !pageHasHeader && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-accent-light text-heading">
            {icon ? (
              <Icon name={icon} size={20} />
            ) : (
              providerId && <ProviderIcon providerId={providerId} size={22} type="color" />
            )}
          </span>
        )}
        {title && !pageHasHeader && (
          <div className="min-w-0">
            <h1 className="ci-heading truncate text-lg">{title}</h1>
            {description && <p className="truncate text-xs text-text-muted">{description}</p>}
          </div>
        )}
      </div>
      <div className="ms-auto flex items-center gap-2">
        <ProductSwitcher
          items={KEAK_PRODUCT_LINKS}
          activeProduct={KEAK_ACTIVE_PRODUCT}
          className="hidden md:block"
          aria-label={t("products")}
        />
        {onOpenCommandPalette && (
          <Button
            variant="outline"
            size="sm"
            icon="search"
            onClick={onOpenCommandPalette}
            title={t("quickNavigationTitle")}
            aria-label={t("openQuickNavigation")}
            className="hidden md:inline-flex"
          >
            <span className="text-xs">{t("quickNavigation")}</span>
            <kbd className="hidden rounded border border-border bg-bg-subtle px-1 py-0.5 font-mono text-[10px] lg:inline-flex">
              {isMac ? "⌘K" : "Ctrl+K"}
            </kbd>
          </Button>
        )}
        {onOpenCommandPalette && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onOpenCommandPalette}
            aria-label={t("openQuickNavigation")}
          >
            <Icon name="search" size={20} />
          </Button>
        )}
        <LanguageSelector />
        <ThemeToggle />
        {!isE2EMode && <DegradationBadge />}
        {!isE2EMode && <TokenHealthBadge />}
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-error"
          onClick={handleLogout}
          title={t("logout")}
          aria-label={t("logout")}
        >
          <Icon name="logout" size={20} />
        </Button>
      </div>
    </header>
  );
}
