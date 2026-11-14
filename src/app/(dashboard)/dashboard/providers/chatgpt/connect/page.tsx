"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ChatGptConnectPage() {
  const t = useTranslations("chatgptSignIn");
  const started = useRef(false);
  const [message, setMessage] = useState(t("completing"));
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    window.history.replaceState(null, "", window.location.pathname);
    if (params.has("error") || !params.get("code") || !params.get("state")) {
      queueMicrotask(() => setMessage(t("incomplete")));
      return;
    }
    void fetch("/api/oauth/chatgpt/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "complete",
        state: params.get("state"),
        code: params.get("code"),
        clientId: params.get("client_id") || undefined,
      }),
    })
      .then(async (response) => {
        const result = await response.json();
        setMessage(
          response.ok ? result.warning || t("returnToTab") : result.error?.message || t("failed")
        );
      })
      .catch(() => setMessage(t("unreachable")));
  }, [t]);
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold">ChatGPT</h1>
      <p role="status">{message}</p>
      <Link href="/dashboard/providers/chatgpt" className="text-primary underline">
        {t("back")}
      </Link>
    </main>
  );
}
