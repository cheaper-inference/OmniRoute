"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import SegmentedControl from "@/shared/components/SegmentedControl";
import {
  buildHttpProxySnippets,
  HTTP_PROXY_SNIPPET_LANGS,
  type HttpProxySnippetLang,
} from "./httpProxySnippets";

interface HttpProxySnippetCardProps {
  port: number;
  onClose: () => void;
}

type Lang = HttpProxySnippetLang;

export function HttpProxySnippetCard({ port, onClose }: HttpProxySnippetCardProps) {
  const t = useTranslations("trafficInspector");
  const [lang, setLang] = useState<Lang>("bash");
  const [copied, setCopied] = useState(false);

  const snippets = buildHttpProxySnippets(port);

  const copy = async () => {
    await navigator.clipboard.writeText(snippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen onClose={onClose} title={t("httpProxyTitle", { port })} size="lg">
      <SegmentedControl
        size="sm"
        className="mb-3"
        aria-label={t("snippetLanguage")}
        value={lang}
        onChange={(next) => setLang(next as Lang)}
        options={HTTP_PROXY_SNIPPET_LANGS.map((l) => ({ value: l, label: l }))}
      />

      <pre className="overflow-x-auto whitespace-pre rounded-control border border-border bg-bg-subtle p-3 font-mono text-xs text-text-main">
        {snippets[lang]}
      </pre>

      <div className="mt-3 flex justify-end">
        <Button variant="outline" size="sm" icon={copied ? "check" : "content_copy"} onClick={copy}>
          {copied ? t("copied") : t("copy")}
        </Button>
      </div>
    </Modal>
  );
}
