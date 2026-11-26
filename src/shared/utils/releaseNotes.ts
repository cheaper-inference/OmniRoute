import { z } from "zod";

export const NEWS_JSON_URL =
  "https://raw.githubusercontent.com/cheaper-inference/OmniRoute/main/news.json";
export const NEWS_V3_JSON_URL =
  "https://raw.githubusercontent.com/cheaper-inference/OmniRoute/main/public/announcements/v3.json";
export const CHANGELOG_RAW_URL =
  "https://raw.githubusercontent.com/cheaper-inference/OmniRoute/main/CHANGELOG.md";
export const CHANGELOG_GITHUB_URL =
  "https://github.com/cheaper-inference/OmniRoute/blob/main/CHANGELOG.md";
export const NEWS_DISMISS_STORAGE_NAME = "omniroute-news-dismissed-v2";
export const NEWS_DISMISS_EVENT = "omniroute:news-dismissed";

const NEWS_ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,78}[a-z0-9])?$/;
const LOCALE_PATTERN = /^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|-[0-9]{3})?$/;
const MAX_DISMISSED_IDS = 50;
const NEWS_V3_MAX_BYTES = 64 * 1024;
const NEWS_V3_TIMEOUT_MS = 5000;
// setTimeout stores its delay in a signed 32-bit integer.
const MAX_TIMER_DELAY_MS = 2 ** 31 - 1;

const newsIconSchema = z.enum(["campaign", "celebration", "info", "new_releases", "radar"]);
const localizedTextSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    message: z.string().trim().min(1).max(600),
    linkLabel: z.string().trim().min(1).max(80).optional(),
  })
  .strict();

const httpsUrlSchema = z
  .string()
  .url()
  .max(500)
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  }, "Announcement links must use HTTPS without embedded credentials");

const localizedTextMapSchema = z
  .record(z.string(), localizedTextSchema)
  .superRefine((value, context) => {
    if (!value.en) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "English copy is required" });
    }
    for (const locale of Object.keys(value)) {
      if (!LOCALE_PATTERN.test(locale)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid locale: ${locale}`,
        });
      }
    }
  });

const newsFeedItemSchema = z
  .object({
    id: z.string().regex(NEWS_ID_PATTERN),
    active: z.boolean(),
    publishedAt: z.string().datetime({ offset: true }),
    text: localizedTextMapSchema,
    link: httpsUrlSchema.optional(),
    icon: newsIconSchema,
  })
  .strict();

const newsFeedSchema = z
  .object({
    schemaVersion: z.literal(2),
    items: z.array(newsFeedItemSchema).max(50),
  })
  .strict()
  .superRefine(({ items }, context) => {
    const ids = new Set<string>();
    for (const [index, item] of items.entries()) {
      if (ids.has(item.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate announcement id: ${item.id}`,
          path: ["items", index, "id"],
        });
      }
      ids.add(item.id);
    }
  });

const legacyActiveNewsSchema = z
  .object({
    active: z.literal(true),
    title: z.string().trim().min(1).max(120),
    message: z.string().trim().min(1).max(600),
    link: httpsUrlSchema.optional(),
    linkLabel: z.string().trim().min(1).max(80).optional(),
    icon: newsIconSchema.optional(),
  })
  .strict();

const legacyInactiveNewsSchema = z
  .object({
    active: z.literal(false),
  })
  .passthrough();

const legacyNewsSchema = z.discriminatedUnion("active", [
  legacyActiveNewsSchema,
  legacyInactiveNewsSchema,
]);

const newsSeveritySchema = z.enum(["info", "warning", "critical"]);

const severityFeedItemSchema = newsFeedItemSchema
  .extend({
    severity: newsSeveritySchema,
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .strict()
  .superRefine((item, context) => {
    if (item.severity === "critical" && !item.expiresAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A critical announcement must expire",
        path: ["expiresAt"],
      });
    }
    if (item.expiresAt && Date.parse(item.expiresAt) <= Date.parse(item.publishedAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "expiresAt must be after publishedAt",
        path: ["expiresAt"],
      });
    }
  });

const severityFeedSchema = z
  .object({
    schemaVersion: z.literal(3),
    items: z.array(severityFeedItemSchema).max(50),
  })
  .strict()
  .superRefine(({ items }, context) => {
    const ids = new Set<string>();
    for (const [index, item] of items.entries()) {
      if (ids.has(item.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate announcement id: ${item.id}`,
          path: ["items", index, "id"],
        });
      }
      ids.add(item.id);
    }
  });

export type NewsFeedItem = z.infer<typeof newsFeedItemSchema>;
export type NewsSeverity = z.infer<typeof newsSeveritySchema>;
export type SeverityNewsFeedItem = z.infer<typeof severityFeedItemSchema>;
export type NewsIcon = z.infer<typeof newsIconSchema>;

export type NewsAnnouncement = {
  id: string;
  active: true;
  publishedAt: string;
  title: string;
  message: string;
  link?: string;
  linkLabel?: string;
  icon: NewsIcon;
};

export type SeverityNewsAnnouncement = NewsAnnouncement & {
  severity: NewsSeverity;
  expiresAt?: string;
};

export type NewsReadOptions = { severityEnabled: boolean; now: Date };

type NewsFetchResponse = Pick<Response, "ok"> &
  Partial<Pick<Response, "json" | "text" | "headers">>;
type NewsFetch = (url: string, init: RequestInit) => Promise<NewsFetchResponse>;

export type FetchNewsOptions = {
  /** Read the v3 representation first, falling back to v2 when it is missing or invalid. */
  severityEnabled?: boolean;
  /** Time budget for the v3 request only. */
  v3TimeoutMs?: number;
};

const NEWS_REQUEST_INIT = {
  cache: "no-store",
  credentials: "omit",
  referrerPolicy: "no-referrer",
} as const;

async function fetchLegacyNewsPayload(
  fetchNews: NewsFetch,
  signal?: AbortSignal
): Promise<unknown | null> {
  try {
    const response = await fetchNews(NEWS_JSON_URL, { ...NEWS_REQUEST_INIT, signal });
    return response.ok && response.json ? await response.json() : null;
  } catch {
    return null;
  }
}

/** Parses a v3 body only when it fits the byte budget; the caller still validates the schema. */
async function readBoundedJson(response: NewsFetchResponse): Promise<unknown | null> {
  const declared = Number(response.headers?.get("content-length"));
  if (Number.isFinite(declared) && declared > NEWS_V3_MAX_BYTES) return null;
  if (!response.text) return response.json ? await response.json() : null;
  const body = await response.text();
  if (new TextEncoder().encode(body).length > NEWS_V3_MAX_BYTES) return null;
  return JSON.parse(body);
}

async function fetchSeverityNewsPayload(
  fetchNews: NewsFetch,
  signal: AbortSignal | undefined,
  timeoutMs: number
): Promise<unknown | null> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  if (signal?.aborted) abort();
  signal?.addEventListener("abort", abort, { once: true });
  try {
    const response = await fetchNews(NEWS_V3_JSON_URL, {
      ...NEWS_REQUEST_INIT,
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = await readBoundedJson(response);
    return severityFeedSchema.safeParse(payload).success ? payload : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

/**
 * Fetches the public announcement feed with plain, credential-free GETs. With
 * `severityEnabled` the v3 representation wins whenever it is valid, even when it lists no
 * announcement (a retraction); an unavailable or invalid v3 falls back to v2.
 */
export async function fetchNewsPayload(
  fetchNews: NewsFetch = fetch,
  signal?: AbortSignal,
  options: FetchNewsOptions = {}
): Promise<unknown | null> {
  if (options.severityEnabled) {
    const severityPayload = await fetchSeverityNewsPayload(
      fetchNews,
      signal,
      options.v3TimeoutMs ?? NEWS_V3_TIMEOUT_MS
    );
    if (severityPayload !== null) return severityPayload;
    if (signal?.aborted) return null;
  }
  return fetchLegacyNewsPayload(fetchNews, signal);
}

function stableHash(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function normalizeLegacyNews(payload: unknown): NewsFeedItem[] {
  const parsed = legacyNewsSchema.safeParse(payload);
  if (!parsed.success || !parsed.data.active) return [];

  const item = parsed.data;
  return [
    {
      id: `legacy-${stableHash(`${item.title}\n${item.message}\n${item.link ?? ""}`)}`,
      active: true,
      publishedAt: "1970-01-01T00:00:00.000Z",
      text: {
        en: {
          title: item.title,
          message: item.message,
          ...(item.linkLabel ? { linkLabel: item.linkLabel } : {}),
        },
      },
      ...(item.link ? { link: item.link } : {}),
      icon: item.icon ?? "campaign",
    },
  ];
}

export function parseNewsPayload(payload: unknown): NewsFeedItem[] {
  const feed = newsFeedSchema.safeParse(payload);
  if (feed.success) return feed.data.items;
  return normalizeLegacyNews(payload);
}

function resolveLocalizedText(item: NewsFeedItem, locale: string) {
  const normalizedLocale = locale.trim().replace("_", "-");
  const exactKey = Object.keys(item.text).find(
    (key) => key.toLowerCase() === normalizedLocale.toLowerCase()
  );
  if (exactKey) return item.text[exactKey];

  const language = normalizedLocale.split("-")[0]?.toLowerCase();
  const languageKey = Object.keys(item.text).find((key) => key.toLowerCase() === language);
  return (languageKey && item.text[languageKey]) || item.text.en;
}

export function listActiveNews(
  payload: unknown,
  locale = "en",
  now = new Date()
): NewsAnnouncement[] {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) return [];

  return parseNewsPayload(payload)
    .filter((item) => item.active && Date.parse(item.publishedAt) <= nowMs)
    .sort(
      (left, right) =>
        Date.parse(right.publishedAt) - Date.parse(left.publishedAt) ||
        left.id.localeCompare(right.id)
    )
    .map((item) => {
      const text = resolveLocalizedText(item, locale);
      return {
        id: item.id,
        active: true as const,
        publishedAt: item.publishedAt,
        title: text.title,
        message: text.message,
        ...(item.link ? { link: item.link } : {}),
        ...(text.linkLabel ? { linkLabel: text.linkLabel } : {}),
        icon: item.icon,
      };
    });
}

/** The closed v3 feed, or null when the payload is not a valid v3 feed. */
export function parseSeverityNewsPayload(payload: unknown): SeverityNewsFeedItem[] | null {
  const feed = severityFeedSchema.safeParse(payload);
  return feed.success ? feed.data.items : null;
}

const SEVERITY_RANK: Record<NewsSeverity, number> = { info: 0, warning: 1, critical: 2 };

function parseVisibleItems(payload: unknown, severityEnabled: boolean): SeverityNewsFeedItem[] {
  const severityItems = severityEnabled ? parseSeverityNewsPayload(payload) : null;
  // A valid v3 feed is authoritative, even when it is empty.
  if (severityItems) return severityItems;
  return parseNewsPayload(payload).map((item) => ({ ...item, severity: "info" as const }));
}

function isItemVisible(item: SeverityNewsFeedItem, nowMs: number): boolean {
  return (
    item.active &&
    Date.parse(item.publishedAt) <= nowMs &&
    (!item.expiresAt || nowMs < Date.parse(item.expiresAt))
  );
}

/**
 * Announcements to show right now, newest first. With the flag off this is `listActiveNews()`
 * (every entry reads as info); with it on, v3 entries keep their severity and expire at
 * `expiresAt`, while v2 and the singular shape read as info.
 */
export function listVisibleNews(
  payload: unknown,
  locale: string,
  options: NewsReadOptions
): SeverityNewsAnnouncement[] {
  const nowMs = options.now.getTime();
  if (!Number.isFinite(nowMs)) return [];

  return parseVisibleItems(payload, options.severityEnabled)
    .filter((item) => isItemVisible(item, nowMs))
    .sort(
      (left, right) =>
        Date.parse(right.publishedAt) - Date.parse(left.publishedAt) ||
        left.id.localeCompare(right.id)
    )
    .map((item) => {
      const text = resolveLocalizedText(item, locale);
      return {
        id: item.id,
        active: true as const,
        publishedAt: item.publishedAt,
        title: text.title,
        message: text.message,
        ...(item.link ? { link: item.link } : {}),
        ...(text.linkLabel ? { linkLabel: text.linkLabel } : {}),
        icon: item.icon,
        severity: item.severity,
        ...(item.expiresAt ? { expiresAt: item.expiresAt } : {}),
      };
    });
}

/** The announcement the banner shows: highest severity first, then newest, skipping dismissed ids. */
export function selectVisibleNews(
  payload: unknown,
  locale: string,
  dismissedIds: ReadonlySet<string>,
  options: NewsReadOptions
): SeverityNewsAnnouncement | null {
  const candidates = listVisibleNews(payload, locale, options).filter(
    (item) => !dismissedIds.has(item.id)
  );
  // The list is already newest first, so a stable sort on severity keeps the date tie-break.
  return (
    [...candidates].sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity])[0] ?? null
  );
}

/**
 * Milliseconds until the visible set can next change (an entry is published or expires), or
 * null when it never will. Lets an open page re-evaluate without refetching.
 */
export function nextNewsTransitionMs(
  payload: unknown,
  now: Date,
  severityEnabled = true
): number | null {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) return null;

  let next: number | null = null;
  for (const item of parseVisibleItems(payload, severityEnabled)) {
    if (!item.active) continue;
    for (const instant of [Date.parse(item.publishedAt), Date.parse(item.expiresAt ?? "")]) {
      if (instant > nowMs && (next === null || instant < next)) next = instant;
    }
  }
  return next === null ? null : Math.min(next - nowMs, MAX_TIMER_DELAY_MS);
}

export function selectActiveNews(
  payload: unknown,
  locale = "en",
  dismissedIds: ReadonlySet<string> = new Set(),
  now = new Date()
): NewsAnnouncement | null {
  return listActiveNews(payload, locale, now).find((item) => !dismissedIds.has(item.id)) ?? null;
}

export function parseActiveNewsPayload(payload: unknown): NewsAnnouncement | null {
  return selectActiveNews(payload, "en");
}

export function parseDismissedNewsIds(raw: string | null): Set<string> {
  if (!raw) return new Set();
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return new Set();
    const ids = value.filter(
      (id): id is string => typeof id === "string" && NEWS_ID_PATTERN.test(id)
    );
    return new Set(ids.slice(-MAX_DISMISSED_IDS));
  } catch {
    return new Set();
  }
}

export function serializeDismissedNewsIds(ids: Iterable<string>): string {
  const sanitized = [...new Set(ids)].filter((id) => NEWS_ID_PATTERN.test(id));
  return JSON.stringify(sanitized.slice(-MAX_DISMISSED_IDS));
}

export function getLatestChangelogMarkdown(markdown: string, limit = 10): string {
  const parts = markdown.split(/^##\s+\[/gm);
  if (parts.length <= 1) {
    const truncated = markdown.slice(0, 5000).trimEnd();
    return markdown.length > 5000 ? `${truncated}\n\n...` : truncated;
  }

  const header = parts[0].trimEnd();
  const versions = parts
    .slice(1, limit + 1)
    .map((part) => `## [${part.trimEnd()}`)
    .join("\n\n");

  return [header, versions].filter(Boolean).join("\n\n");
}
