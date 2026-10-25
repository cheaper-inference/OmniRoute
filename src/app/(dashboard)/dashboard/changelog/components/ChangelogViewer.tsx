"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ReactMarkdown, { type Components } from "react-markdown";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { Button, Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { ViewerStatus } from "./ChangelogStates";
import {
  CHANGELOG_GITHUB_URL,
  CHANGELOG_RAW_URL,
  getLatestChangelogMarkdown,
} from "@/shared/utils/releaseNotes";

function resolveChangelogHref(href: string | undefined): string | null {
  if (!href) return null;
  if (href.startsWith("#")) return href;

  try {
    const url = new URL(href, "https://github.com/cheaper-inference/OmniRoute/blob/main/");
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** "[3.8.52] — 2026-10-19" → { version: "3.8.52", date: "2026-10-19" } (date is optional). */
export function splitReleaseHeading(text: string): { version: string; date: string | null } {
  const match = /^\[?([^\]]+?)\]?(?:\s+[—–-]\s+(.+))?$/.exec(text.trim());
  if (!match) return { version: text, date: null };
  return { version: match[1].trim(), date: match[2]?.trim() || null };
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

/** One release per kit Card: split the markdown before every `## ` heading. */
function splitReleases(markdown: string): string[] {
  return markdown
    .split(/^(?=## )/m)
    .map((part) => part.trim())
    .filter((part) => part && !/^#\s/.test(part));
}

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="ci-heading mb-6 text-2xl">{children}</h1>;
  },
  h2({ children }) {
    const { version, date } = splitReleaseHeading(textOf(children));
    return (
      <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="ci-dashboard-display flex items-center gap-2 text-2xl">
          <Icon name="sell" size={20} className="text-text-muted" />
          {version}
        </h2>
        {date && <span className="ci-eyebrow">{date}</span>}
      </header>
    );
  },
  h3({ children }) {
    return <h3 className="ci-eyebrow mt-5 mb-2 text-text-main">{children}</h3>;
  },
  p({ children }) {
    return <p className="mb-2 text-sm leading-relaxed text-text-muted">{children}</p>;
  },
  ul({ children }) {
    return <ul className="my-3 flex flex-col gap-2">{children}</ul>;
  },
  li({ children }) {
    return (
      <li className="ml-2 flex items-start text-sm leading-relaxed text-text-muted">
        <span className="mr-3 mt-2 size-1.5 shrink-0 rounded-full bg-text-muted/30" />
        <span>{children}</span>
      </li>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-text-main">{children}</strong>;
  },
  code({ children }) {
    return (
      <code className="rounded border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[13px] text-text-main">
        {children}
      </code>
    );
  },
  a({ href, children }) {
    const resolvedHref = resolveChangelogHref(href);
    if (!resolvedHref) return <span>{children}</span>;

    return (
      <a
        href={resolvedHref}
        target={resolvedHref.startsWith("#") ? undefined : "_blank"}
        rel={resolvedHref.startsWith("#") ? undefined : "noopener noreferrer"}
        className="text-primary hover:underline"
      >
        {children}
      </a>
    );
  },
};

export default function ChangelogViewer() {
  const t = useTranslations("changelogPage");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const res = await fetch(CHANGELOG_RAW_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Changelog fetch failed with ${res.status}`);

        const text = await res.text();
        setMarkdown(getLatestChangelogMarkdown(text, 10));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchChangelog();
  }, []);

  if (loading) {
    return <ViewerStatus busy icon="sync" message={t("loading")} />;
  }

  if (error) {
    return (
      <ViewerStatus tone="error" icon="error_outline" message={t("changelogLoadFailed")}>
        <Button variant="secondary" onClick={() => globalThis.location.reload()}>
          {t("retry")}
        </Button>
      </ViewerStatus>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {splitReleases(markdown).map((release, index) => (
        <Card key={index} padding="md">
          <ReactMarkdown components={markdownComponents}>{release}</ReactMarkdown>
        </Card>
      ))}
      <div className="flex justify-center pt-2">
        <a
          href={CHANGELOG_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          <Icon name="open_in_new" size={16} />
          {t("viewFullHistory")}
        </a>
      </div>
    </div>
  );
}
