"use client";

import Icon from "@/shared/components/Icon";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { CodePreview } from "@omniroute/ui-kit/code-preview";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import { cn } from "@/shared/utils/cn";
import { useDisplayBaseUrl } from "@/shared/hooks";
import VscodeTokenAliasCard from "./VscodeTokenAliasCard";
import { matchesSearch } from "@/shared/utils/turkishText";

/* ─── Types ──────────────────────────────────────────── */
interface Endpoint {
  method: string;
  path: string;
  tags: string[];
  summary: string;
  description: string;
  security: boolean;
  parameters: any[];
  requestBody: boolean;
  exampleBody?: any;
  responses: string[];
  loopbackOnly?: boolean;
  alwaysProtected?: boolean;
  internal?: boolean;
}

interface CatalogData {
  info: { title?: string; version?: string; description?: string };
  servers: { url: string; description?: string }[];
  tags: { name: string; description?: string }[];
  endpoints: Endpoint[];
  schemas: string[];
}

interface TryItResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  latencyMs: number;
  contentType: string;
}

const METHOD_VARIANTS: Record<string, "success" | "info" | "warning" | "error"> = {
  GET: "success",
  POST: "info",
  PUT: "warning",
  PATCH: "warning",
  DELETE: "error",
};

/* ─── Main Component ─────────────────────────────────── */
export default function ApiEndpointsTab() {
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  const baseUrl = useDisplayBaseUrl();

  function EndpointBadges({ ep }: { ep: Endpoint }) {
    return (
      <div className="flex items-center gap-1 shrink-0">
        {ep.loopbackOnly && (
          <Badge size="sm" variant="info" title={t("badgeLoopbackTooltip")}>
            {t("badgeLocal")}
          </Badge>
        )}
        {ep.alwaysProtected && (
          <Badge size="sm" variant="error" title={t("badgeAlwaysProtectedTooltip")}>
            {t("badgeProtected")}
          </Badge>
        )}
        {ep.internal && (
          <Badge size="sm" title={t("badgeInternalTooltip")}>
            {t("badgeInternal")}
          </Badge>
        )}
      </div>
    );
  }

  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showInternal, setShowInternal] = useState(false);
  const [securityTier, setSecurityTier] = useState<
    "all" | "public" | "auth" | "loopback" | "always-protected"
  >("all");

  // Try It state
  const [tryingEndpoint, setTryingEndpoint] = useState<string | null>(null);
  const [tryBody, setTryBody] = useState("");
  const [tryResult, setTryResult] = useState<TryItResult | null>(null);
  const [trying, setTrying] = useState(false);
  const [availableApiKeys, setAvailableApiKeys] = useState<Array<{ id: string; key: string }>>([]);
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>("");
  const [revealedApiKeys, setRevealedApiKeys] = useState<Record<string, string>>({});
  const [apiKeyLoadError, setApiKeyLoadError] = useState<string | null>(null);
  const [manualApiKey, setManualApiKey] = useState("");
  const [useManualKey, setUseManualKey] = useState(false);
  const selectedApiKey = availableApiKeys.find((apiKey) => apiKey.id === selectedApiKeyId) || null;

  const loadCatalog = useCallback(async () => {
    try {
      const res = await fetch("/api/openapi/spec");
      if (res.ok) {
        const data = await res.json();
        return { data: data as CatalogData, error: null };
      }
      const body = await res.json().catch(() => null);
      const message =
        body && typeof body.error === "string"
          ? body.error
          : t("catalogLoadFailed", { status: res.status });
      return { data: null, error: message };
    } catch (error) {
      const message = error instanceof Error ? error.message : t("catalogLoadFailedGeneric");
      return { data: null, error: message };
    }
  }, [t]);

  useEffect(() => {
    let cancelled = false;
    loadCatalog().then((result) => {
      if (!cancelled) {
        setCatalog(result.data);
        setCatalogError(result.error);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [loadCatalog]);

  // Load API keys for Try It functionality. The list endpoint returns masked
  // keys; the selected key is revealed only when sending a Try It request.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/keys?limit=100", { credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error(t("apiKeysLoadFailed", { status: res.status }));
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const rows = Array.isArray(data?.keys) ? data.keys : Array.isArray(data) ? data : [];
        const keys = rows
          .filter((k) => k?.id && k.isActive !== false && k.isBanned !== true)
          .map((k) => ({ id: String(k.id), key: String(k.key || k.id) }));
        setAvailableApiKeys(keys);
        setApiKeyLoadError(null);
        if (keys.length > 0) {
          setSelectedApiKeyId((current) => current || keys[0].id);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setAvailableApiKeys([]);
          setApiKeyLoadError(
            error instanceof Error ? error.message : t("apiKeysLoadFailedGeneric")
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  // Filter endpoints
  const filteredEndpoints = useMemo(() => {
    if (!catalog) return [];
    return catalog.endpoints.filter((ep) => {
      // Keep the internal-endpoint visibility toggle + security-tier filter
      // (from release) while using the locale-aware matchesSearch helper. The
      // local var is matchesEndpoint (not matchesSearch) to avoid shadowing the
      // imported helper used in its own initializer.
      if (!showInternal && ep.internal) return false;
      const matchesEndpoint =
        !search ||
        matchesSearch(ep.path, search) ||
        matchesSearch(ep.summary, search) ||
        ep.tags.some((t) => matchesSearch(t, search));
      const matchesTag = !selectedTag || ep.tags.includes(selectedTag);
      const matchesTier =
        securityTier === "all" ||
        (securityTier === "loopback" && ep.loopbackOnly) ||
        (securityTier === "always-protected" && ep.alwaysProtected) ||
        (securityTier === "auth" && ep.security && !ep.loopbackOnly && !ep.alwaysProtected) ||
        (securityTier === "public" && !ep.security && !ep.loopbackOnly && !ep.alwaysProtected);
      return matchesEndpoint && matchesTag && matchesTier;
    });
  }, [catalog, search, selectedTag, showInternal, securityTier]);

  // Group by tag
  const groupedEndpoints = useMemo(() => {
    const groups: Record<string, Endpoint[]> = {};
    for (const ep of filteredEndpoints) {
      const tag = ep.tags[0] || "Other";
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(ep);
    }
    return groups;
  }, [filteredEndpoints]);

  const allTags = useMemo(() => {
    if (!catalog) return [];
    return catalog.tags.map((t) => t.name);
  }, [catalog]);

  // Try It handler
  // Generate example body from OpenAPI schema
  const generateExampleBody = (ep: Endpoint): string => {
    if (ep.method === "GET") return "";
    if (ep.exampleBody) return JSON.stringify(ep.exampleBody, null, 2);
    return "{\n  \n}";
  };

  const handleTryIt = async (ep: Endpoint) => {
    const key = `${ep.method}:${ep.path}`;
    if (tryingEndpoint === key) {
      setTryingEndpoint(null);
      setTryResult(null);
      return;
    }
    setTryingEndpoint(key);
    setTryResult(null);
    setTryBody(generateExampleBody(ep));
  };

  const revealSelectedApiKey = async () => {
    if (!selectedApiKey) return "";
    if (revealedApiKeys[selectedApiKey.id]) return revealedApiKeys[selectedApiKey.id];

    const res = await fetch(`/api/keys/${encodeURIComponent(selectedApiKey.id)}/reveal`, {
      credentials: "same-origin",
    });
    if (!res.ok) {
      throw new Error(
        res.status === 403
          ? t("apiKeyRevealDisabled")
          : t("apiKeyRevealFailed", { status: res.status })
      );
    }
    const data = await res.json();
    if (!data?.key || typeof data.key !== "string") {
      throw new Error(t("apiKeyRevealInvalid"));
    }
    setRevealedApiKeys((current) => ({ ...current, [selectedApiKey.id]: data.key }));
    return data.key;
  };

  const executeTryIt = async (ep: Endpoint) => {
    setTrying(true);
    try {
      const headers: Record<string, string> = {};

      // Add Authorization header if endpoint requires auth
      if (ep.security) {
        let apiKeyForRequest = "";
        if (useManualKey) {
          apiKeyForRequest = manualApiKey;
        } else if (selectedApiKey) {
          apiKeyForRequest = await revealSelectedApiKey();
        }

        if (apiKeyForRequest) {
          headers["Authorization"] = `Bearer ${apiKeyForRequest}`;
        } else {
          throw new Error(t("apiKeyRequired"));
        }
      }

      const res = await fetch("/api/openapi/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: ep.method,
          path: ep.path,
          headers,
          body: tryBody ? JSON.parse(tryBody) : undefined,
        }),
      });
      if (res.ok) setTryResult(await res.json());
      else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || t("requestFailed", { status: res.status }));
      }
    } catch (err: any) {
      setTryResult({
        status: 0,
        statusText: t("errorStatus"),
        headers: {},
        body: { error: err.message },
        latencyMs: 0,
        contentType: "application/json",
      });
    }
    setTrying(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-surface-2 rounded-lg w-1/3" />
        <div className="h-64 bg-surface-2 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header with spec info */}
      {catalog && (
        <Card className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Icon name="api" size={20} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">{catalog.info.title || "API"}</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-semibold">
                    {catalog.info.version}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  {t("catalogStats", {
                    endpoints: catalog.endpoints.length,
                    categories: allTags.length,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/docs/openapi.yaml"
                download
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <Icon name="download" size={14} />
                YAML
              </a>
              <a
                href="/api/openapi/spec"
                target="_blank"
                rel="noopener"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <Icon name="open_in_new" size={14} />
                JSON
              </a>
            </div>
          </div>
        </Card>
      )}

      {/* ═══ API CATALOG ═══ */}
      {!catalog && (
        <>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-error/10">
                <Icon name="error" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main">
                  {t("apiEndpointsCatalogUnavailable")}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {catalogError || t("catalogUnavailableDescription")}
                </p>
                <a
                  href="/api/openapi/spec"
                  target="_blank"
                  rel="noopener"
                  className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-3")}
                >
                  <Icon name="open_in_new" size={14} />
                  {t("openJsonResponse")}
                </a>
              </div>
            </div>
          </Card>

          <VscodeTokenAliasCard variant="catalog" />
        </>
      )}

      {catalog && (
        <>
          {/* Search & filter */}
          <div className="flex items-center gap-2">
            <Input
              icon="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("apiEndpointsSearchPlaceholder")}
              aria-label={t("apiEndpointsSearchPlaceholder")}
              className="flex-1 max-w-md"
            />
            <div className="flex gap-1 flex-wrap">
              <Button
                size="sm"
                variant={!selectedTag ? "secondary" : "ghost"}
                aria-pressed={!selectedTag}
                onClick={() => setSelectedTag(null)}
                className="text-[10px]"
              >
                {t("all")}
              </Button>
              {allTags.slice(0, 8).map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant={selectedTag === tag ? "secondary" : "ghost"}
                  aria-pressed={selectedTag === tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="text-[10px]"
                >
                  {tag}
                </Button>
              ))}
              {allTags.length > 8 && (
                <span className="px-2 py-1 text-[10px] text-text-muted">
                  {t("more", { count: allTags.length - 8 })}
                </span>
              )}
            </div>
            {/* Security tier filter */}
            <div className="flex items-center gap-1 ml-1 border-l border-border pl-2 flex-wrap">
              {(["all", "auth", "loopback", "always-protected", "public"] as const).map((tier) => (
                <Button
                  key={tier}
                  size="sm"
                  variant={securityTier === tier ? "secondary" : "ghost"}
                  aria-pressed={securityTier === tier}
                  onClick={() => setSecurityTier(tier)}
                  className="text-[10px]"
                >
                  {tier === "all"
                    ? t("tierAll")
                    : tier === "auth"
                      ? t("tierAuth")
                      : tier === "loopback"
                        ? t("tierLoopback")
                        : tier === "always-protected"
                          ? t("tierAlwaysProtected")
                          : t("tierPublic")}
                </Button>
              ))}
              <Button
                size="sm"
                variant={showInternal ? "warning" : "ghost"}
                aria-pressed={showInternal}
                onClick={() => setShowInternal(!showInternal)}
                className="text-[10px] ml-1"
                title={t("showInternalTooltip")}
              >
                {showInternal ? t("hideInternal") : t("showInternal")}
              </Button>
            </div>
          </div>

          <VscodeTokenAliasCard variant="catalog" />

          {/* Endpoint groups */}
          {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
            <Card key={tag} className="overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Icon name="folder" size={14} className="text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {tag}
                </h3>
                <Badge size="sm">{endpoints.length}</Badge>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="divide-y divide-border">
                {endpoints.map((ep) => {
                  const key = `${ep.method}:${ep.path}`;
                  const isExpanded = expandedEndpoint === key;
                  const isTrying = tryingEndpoint === key;

                  return (
                    <div key={key}>
                      <Button
                        variant="ghost"
                        className="w-full h-auto justify-start gap-3 rounded-none px-4 py-2.5 text-left font-normal"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedEndpoint(isExpanded ? null : key)}
                      >
                        <Badge
                          size="sm"
                          variant={METHOD_VARIANTS[ep.method] ?? "default"}
                          className="min-w-[42px] justify-center font-mono font-bold"
                        >
                          {ep.method}
                        </Badge>
                        <code className="text-xs font-mono text-text-main flex-1 truncate">
                          {ep.path}
                        </code>
                        <span className="text-[11px] text-text-muted hidden sm:inline truncate max-w-[200px]">
                          {ep.summary}
                        </span>
                        <EndpointBadges ep={ep} />
                        {ep.security && (
                          <Icon
                            name="lock"
                            size={12}
                            className="text-warning"
                            ariaLabel={t("apiEndpointsRequiresAuth")}
                          />
                        )}
                        <Icon
                          name="expand_more"
                          size={14}
                          className={cn(
                            "text-text-muted transition-transform",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </Button>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="px-4 pb-3 space-y-3 bg-surface-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs text-text-main font-medium">{ep.summary}</p>
                              {ep.description && ep.description !== ep.summary && (
                                <p className="text-[11px] text-text-muted mt-1">{ep.description}</p>
                              )}
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
                                {ep.security && (
                                  <span className="flex items-center gap-1">
                                    <Icon name="lock" size={12} className="text-warning" />
                                    {t("bearerAuth")}
                                  </span>
                                )}
                                {ep.requestBody && (
                                  <span className="flex items-center gap-1">
                                    <Icon name="description" size={12} />
                                    {t("requestBody")}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  {t("responses")}: {ep.responses.join(", ")}
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={isTrying ? "primary" : "secondary"}
                              icon={isTrying ? "close" : "play_arrow"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTryIt(ep);
                              }}
                              className="shrink-0 text-[10px]"
                            >
                              {isTrying ? t("close") : t("tryIt")}
                            </Button>
                          </div>

                          {/* curl example */}
                          <CodePreview
                            variant="surface"
                            filename={t("example")}
                            language="cURL"
                            copyLabel={tc("copy")}
                            copiedLabel={tc("copied")}
                            code={`curl -X ${ep.method} ${baseUrl}${ep.path}${
                              ep.security ? ' -H "Authorization: Bearer YOUR_KEY"' : ""
                            }${
                              ep.requestBody
                                ? " -H \"Content-Type: application/json\" -d '{...}'"
                                : ""
                            }`}
                          />

                          {/* Try It panel */}
                          {isTrying && (
                            <div className="rounded-lg border border-primary/20 bg-primary/[0.02] p-3 space-y-3">
                              {ep.security && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                                      {t("apiKey")}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setUseManualKey(!useManualKey)}
                                      className="h-auto min-h-0 px-1 py-0 text-[10px]"
                                    >
                                      {useManualKey ? t("switchToSelection") : t("enterManually")}
                                    </Button>
                                  </div>

                                  {useManualKey ? (
                                    <Input
                                      type="password"
                                      value={manualApiKey}
                                      onChange={(e) => setManualApiKey(e.target.value)}
                                      placeholder={t("pasteApiKey")}
                                      aria-label={t("apiKey")}
                                      inputClassName="font-mono text-xs"
                                    />
                                  ) : availableApiKeys.length > 0 ? (
                                    <Select
                                      aria-label={t("apiKey")}
                                      value={selectedApiKeyId}
                                      onChange={(e) => setSelectedApiKeyId(e.target.value)}
                                      selectClassName="font-mono text-xs"
                                    >
                                      {availableApiKeys.map((apiKey) => (
                                        <option key={apiKey.id} value={apiKey.id}>
                                          {apiKey.key}
                                        </option>
                                      ))}
                                    </Select>
                                  ) : (
                                    <p className="text-[11px] text-warning">
                                      {apiKeyLoadError || t("noActiveApiKeys")}
                                    </p>
                                  )}
                                </div>
                              )}
                              {ep.method !== "GET" && (
                                <div>
                                  <p className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                                    {t("requestBodyJson")}
                                  </p>
                                  <Textarea
                                    aria-label={t("requestBodyJson")}
                                    value={tryBody}
                                    onChange={(e) => setTryBody(e.target.value)}
                                    rows={8}
                                    className="mt-1 font-mono text-xs resize-none"
                                    placeholder='{ "model": "gpt-4o", "messages": [...] }'
                                  />
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant="primary"
                                icon="send"
                                loading={trying}
                                onClick={() => executeTryIt(ep)}
                              >
                                {trying ? t("sending") : t("sendRequest")}
                              </Button>

                              {tryResult && (
                                <div className="rounded-lg bg-surface-2 p-3 space-y-2">
                                  <div className="flex items-center gap-3 text-xs">
                                    <Badge
                                      variant={
                                        tryResult.status >= 200 && tryResult.status < 300
                                          ? "success"
                                          : tryResult.status >= 400
                                            ? "error"
                                            : "warning"
                                      }
                                    >
                                      {tryResult.status} {tryResult.statusText}
                                    </Badge>
                                    <span className="text-text-muted">{tryResult.latencyMs}ms</span>
                                  </div>
                                  <pre className="text-[11px] font-mono text-text-main overflow-auto max-h-[300px] whitespace-pre-wrap">
                                    {typeof tryResult.body === "string"
                                      ? tryResult.body
                                      : JSON.stringify(tryResult.body, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}

          {filteredEndpoints.length === 0 && (
            <Card>
              <EmptyState icon="search_off" title={t("apiEndpointsNoMatch")} />
            </Card>
          )}

          {/* Schemas section */}
          {catalog.schemas.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="data_object" size={14} className="text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {t("dataSchemas")}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-2 text-text-muted">
                  {catalog.schemas.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {catalog.schemas.map((schema) => (
                  <span
                    key={schema}
                    className="text-[10px] px-2 py-1 rounded-md bg-chart-3/10 text-chart-3 font-mono"
                  >
                    {schema}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
