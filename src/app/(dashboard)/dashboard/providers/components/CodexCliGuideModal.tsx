"use client";

import Icon from "@/shared/components/Icon";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ReactMarkdown, { type Components } from "react-markdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Modal, Button } from "@/shared/components";

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="mb-4 text-xl font-bold text-text-main">{children}</h1>;
  },
  h2({ children }) {
    return (
      <h2 className="mt-6 mb-3 flex items-center gap-2 text-base font-bold text-text-main first:mt-0">
        <Icon name="terminal" size={16} className="text-primary" />
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return <h3 className="mt-4 mb-2 text-sm font-semibold text-text-main/80">{children}</h3>;
  },
  h4({ children }) {
    return (
      <h4 className="mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {children}
      </h4>
    );
  },
  p({ children }) {
    return <p className="mb-2 text-sm leading-relaxed text-text-muted">{children}</p>;
  },
  ul({ children }) {
    return <ul className="my-2 flex flex-col gap-1">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="my-2 flex flex-col gap-1 list-decimal list-inside">{children}</ol>;
  },
  li({ children }) {
    return (
      <li className="ml-2 flex items-start text-sm leading-relaxed text-text-muted">
        <span className="mr-2 mt-2 size-1 shrink-0 rounded-full bg-text-muted/40" />
        <span>{children}</span>
      </li>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-text-main">{children}</strong>;
  },
  code({ children, className }) {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block w-full whitespace-pre-wrap font-mono text-[12px] text-text-main">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded border border-border bg-bg-subtle px-1 py-0.5 font-mono text-[12px] text-text-main">
        {children}
      </code>
    );
  },
  pre({ children }) {
    return (
      <pre className="my-2 overflow-x-auto rounded-lg border border-border bg-bg-subtle p-3">
        {children}
      </pre>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="my-2 border-l-2 border-primary/40 pl-3 text-sm text-text-muted/80 italic">
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    // Markdown tables keep the native scroller (no kit scrollbar label to translate here).
    return (
      <Table className="text-sm" containerClassName="my-3" persistentScrollbars={false}>
        {children}
      </Table>
    );
  },
  thead({ children }) {
    return <TableHeader>{children}</TableHeader>;
  },
  tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  tr({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  th({ children }) {
    return <TableHead>{children}</TableHead>;
  },
  td({ children }) {
    return <TableCell className="text-text-muted">{children}</TableCell>;
  },
  hr() {
    return <hr className="my-4 border-border" />;
  },
  a({ href, children }) {
    if (!href) return <span>{children}</span>;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    );
  },
};

interface CodexCliGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CodexCliGuideModal({ isOpen, onClose }: CodexCliGuideModalProps) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const text = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key as never) ? t(key as never) : fallback;

  useEffect(() => {
    if (!isOpen || content) return;

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch("/api/docs/codex-cli");
        if (!res.ok) throw new Error(`${res.status}`);
        const data = (await res.json()) as { content: string };
        if (!cancelled) setContent(data.content);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [isOpen, content]);

  return (
    <Modal isOpen={isOpen} title={text("codexCliGuideTitle", "Codex CLI Guide")} onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto pr-1">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Icon name="sync" size={28} className="animate-spin text-text-muted/50" />
            <p className="text-sm text-text-muted">
              {text("codexCliGuideLoading", "Loading guide...")}
            </p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-text-muted gap-3">
            <Icon name="error_outline" size={40} className="text-error/50" />
            <p className="text-sm">
              {text("codexCliGuideLoadFailed", "Could not load the guide.")}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setContent("");
                setError(false);
              }}
            >
              {tc("retry")}
            </Button>
          </div>
        )}
        {!loading && !error && content && (
          <div className="p-1">
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </Modal>
  );
}
