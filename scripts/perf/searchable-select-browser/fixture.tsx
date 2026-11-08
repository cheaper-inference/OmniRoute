import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
import Modal from "@/shared/components/Modal";
import ComboStepSelectors from "@/app/(dashboard)/dashboard/combos/ComboStepSelectors";
import en from "@/i18n/messages/en.json";
import fa from "@/i18n/messages/fa.json";

const params = new URLSearchParams(location.search);
const locale = params.get("locale") === "fa" ? "fa" : "en";
const dark = params.get("theme") === "dark";
document.documentElement.lang = locale;
document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
document.documentElement.className = `ci-theme ${dark ? "dark" : ""}`;
document.documentElement.dataset.theme = dark ? "dark" : "light";
const models = Array.from({ length: 5000 }, (_, n) => ({
  id: `model-${String(n).padStart(5, "0")}`,
  name:
    locale === "fa"
      ? `مدل آزمایشی ${String(n).padStart(5, "0")} · OpenAI`
      : `Test Model ${String(n).padStart(5, "0")} · OpenAI`,
  source: "Synthetic QA fixture",
  sources: ["test"],
}));
// Keep the benchmark dataset unchanged unless the visual stress case is requested.
if (params.get("long") === "1") {
  Object.assign(models[4999], {
    name: "Test Model 04999 · مدل آزمایشی بسیار طولانی · 日本語モデル · 中文模型 · Español · Deutsch · ".repeat(
      2
    ),
    source:
      "Synthetic QA fixture · توضیح چندزبانه برای بررسی شکستن خط و نمایش کامل گزینه · Multilingual description with wrapping and an unbroken identifier " +
      "long-model-identifier".repeat(3),
  });
}
const providers = [
  {
    providerId: "qa",
    displayName: locale === "fa" ? "ارائه‌دهنده آزمایشی · QA" : "QA Provider",
    alias: "qa",
    connectionCount: 40,
    models,
    connections: Array.from({ length: 40 }, (_, n) => ({
      id: `account-${n}`,
      label: locale === "fa" ? `حساب آزمایشی ${n}` : `QA Account ${n}`,
      status: "active",
    })),
  },
];
let samples: unknown[] = [];
let sequence = 0;
const longFrames: unknown[] = [];
new PerformanceObserver((list) => {
  for (const e of list.getEntries()) longFrames.push(e.toJSON());
}).observe({ type: "long-animation-frame", buffered: true });
let active: { id: number; kind: string; start: number; query: string; domReadyMs?: number } | null =
  null;
const paintRead = () => {
  if (!active) return;
  const item = active;
  if (document.querySelector('[role="listbox"]') && item.domReadyMs === undefined)
    item.domReadyMs = performance.now() - item.start;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (active?.id !== item.id) return;
      const list = document.querySelector('[role="listbox"]');
      if (!list) return;
      const count = list.querySelectorAll('[role="option"]').length;
      samples.push({
        ...item,
        elapsedMs: performance.now() - item.start,
        optionCount: count,
        first: list.textContent?.slice(0, 130),
      });
      active = null;
      document.getElementById("metrics")!.dataset.samples = String(samples.length);
      document.getElementById("metrics")!.textContent = JSON.stringify(
        {
          browser: navigator.userAgent,
          viewport: { width: innerWidth, height: innerHeight },
          locale,
          theme: dark ? "dark" : "light",
          longFrames,
          method:
            "capture-phase event timestamp to second animation frame after committed DOM mutation (conservative paint opportunity estimate)",
          samples,
        },
        null,
        2
      );
    })
  );
};
document.addEventListener(
  "click",
  (event) => {
    if ((event.target as Element).closest('[data-testid="combo-builder-model"]'))
      active = { id: ++sequence, kind: "open", start: performance.now(), query: "" };
  },
  true
);
document.addEventListener(
  "input",
  (event) => {
    const target = event.target as HTMLInputElement;
    if (target.getAttribute("role") === "combobox")
      active = { id: ++sequence, kind: "filter", start: performance.now(), query: target.value };
  },
  true
);
new MutationObserver(paintRead).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});
async function benchmark() {
  const status = document.getElementById("bench-status")!;
  samples = [];
  sequence = 0;
  longFrames.length = 0;
  const waitForSample = () =>
    new Promise<void>((resolve) => {
      const check = () => {
        if (active) requestAnimationFrame(check);
        else resolve();
      };
      requestAnimationFrame(check);
    });
  for (let n = 0; n < 10; n++) {
    status.textContent = `Running ${n + 1}/10`;
    (document.querySelector('[data-testid="combo-builder-model"]') as HTMLButtonElement).click();
    await waitForSample();
    const input = document.querySelector('[role="combobox"]') as HTMLInputElement;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, "04999");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await waitForSample();
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  status.textContent = "Benchmark complete";
}
function App() {
  const [open, setOpen] = useState(false),
    [provider, setProvider] = useState("qa"),
    [model, setModel] = useState("model-00000"),
    [account, setAccount] = useState("__auto__"),
    [allowed, setAllowed] = useState<string[]>([]);
  return (
    <NextIntlClientProvider locale={locale} messages={locale === "fa" ? fa : en} timeZone="UTC">
      <main style={{ padding: 24 }}>
        <h1>{locale === "fa" ? "بررسی انتخابگرهای Combo" : "Combo selector acceptance"}</h1>
        <p>PR #19288 · Real app components and CSS · synthetic 5,000-model fixture</p>
        <button id="open-modal" onClick={() => setOpen(true)}>
          {locale === "fa" ? "باز کردن پنجره" : "Open modal"}
        </button>
        <pre id="metrics" style={{ fontSize: 11, whiteSpace: "pre-wrap", direction: "ltr" }}>
          No measured input yet
        </pre>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={locale === "fa" ? "ایجاد ترکیب آزمایشی" : "Create QA Combo"}
          size="lg"
          footer={
            <>
              <span id="bench-status"></span>
              <button onClick={benchmark}>Run benchmark</button>
              <button onClick={() => setOpen(false)}>
                {locale === "fa" ? "انصراف" : "Cancel"}
              </button>
            </>
          }
        >
          <p>
            {locale === "fa"
              ? "۵۰۰۰ مدل و ۴۰ حساب آزمایشی. هیچ تغییری ذخیره نمی‌شود."
              : "5,000 models and 40 synthetic accounts. No changes are saved."}
          </p>
          <ComboStepSelectors
            providers={providers}
            providerId={provider}
            modelId={model}
            connectionId={account}
            loading={false}
            emailsVisible={false}
            allowedConnectionIds={allowed}
            onProviderChange={setProvider}
            onModelChange={setModel}
            onConnectionChange={setAccount}
            onAllowedConnectionToggle={(id) =>
              setAllowed((old) => (old.includes(id) ? old.filter((x) => x !== id) : [...old, id]))
            }
          />
          <p style={{ marginTop: 24 }}>
            {locale === "fa" ? "نام دقیق مدل انتخاب‌شده:" : "Exact selected model:"}{" "}
            <bdi>{model}</bdi>
          </p>
        </Modal>
      </main>
    </NextIntlClientProvider>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
