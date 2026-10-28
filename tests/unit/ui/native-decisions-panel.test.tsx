// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

// Native controls mirror adapter contracts; the saved runner lacks Radix Select's optional package.
vi.mock("@/shared/components/Select", () => ({
  default: ({
    label,
    children,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: React.ReactNode }) => (
    <label>
      {label}
      <select {...props}>{children}</select>
    </label>
  ),
}));
vi.mock("@/shared/components/Input", () => ({
  default: ({
    label,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode }) => (
    <label>
      {label}
      <input {...props} />
    </label>
  ),
}));
vi.mock("@/shared/components/Textarea", () => ({
  default: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
}));
vi.mock("@/shared/components/Button", () => ({
  default: ({
    children,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) => (
    <button {...props}>{children}</button>
  ),
}));
vi.mock("@/shared/components/Card", () => ({
  default: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}));

const roots: Root[] = [];
let host: HTMLDivElement;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.appendChild(host);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(async () => {
  await act(async () => {
    roots.splice(0).forEach((root) => root.unmount());
  });
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
async function mount() {
  const { default: Panel } =
    await import("../../../src/app/(dashboard)/dashboard/endpoint/components/NativeDecisionsPanel");
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<Panel />));
  return root;
}
async function click(label: string) {
  const button = [...host.querySelectorAll("button")].find((entry) => entry.textContent === label);
  expect(button, label).toBeTruthy();
  await act(async () => {
    button!.click();
  });
}
async function change(name: string, value: string) {
  const field = host.querySelector(`[name="${name}"]`) as
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  expect(field, name).toBeTruthy();
  await act(async () => {
    const prototype =
      field instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : field instanceof HTMLTextAreaElement
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(field, value);
    field.dispatchEvent(
      new Event(field instanceof HTMLSelectElement ? "change" : "input", { bubbles: true })
    );
  });
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const model = {
  id: "openrouter/vendor/native",
  name: "Native",
  provider: "openrouter",
  tier: "paid",
};
async function prepare() {
  fetchMock.mockResolvedValueOnce(
    json({
      keys: [{ id: "key-id", name: "Restricted", key: "never-retain-this-secret", isActive: true }],
    })
  );
  await click("loadKeys");
  await change("decision-key", "key-id");
  fetchMock.mockResolvedValueOnce(json({ data: [model] }));
  await click("loadCatalog");
  await change("decision-model", model.id);
  await change("decision-state", "The lamp is on.");
  await change("decision-instructions", "Is the lamp on?");
}

describe("native decisions dashboard", () => {
  it("never loads catalogs, keys or inference automatically", async () => {
    await mount();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(host.textContent).toContain("runNotice");
    expect(host.textContent).toContain("catalogNotice");
    expect(host.textContent).not.toContain("never-retain");
  });
  it("uses only selected key ID and exact catalog identity for one native request", async () => {
    await mount();
    await prepare();
    fetchMock.mockResolvedValueOnce(
      json({
        model: "vendor/native",
        answers: { result: { type: "noul", noul: 1 } },
        usage: { input_tokens: 10 },
        private_extra: "do-not-display",
      })
    );
    await click("run");
    const [url, init] = fetchMock.mock.calls.at(-1)! as [string, RequestInit];
    expect(url).toBe("/api/v1/systemone");
    expect(init.credentials).toBe("same-origin");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      "x-omniroute-playground-key-id": "key-id",
    });
    expect(init.headers).not.toHaveProperty("Authorization");
    expect(JSON.parse(String(init.body))).toEqual({
      model: model.id,
      state: "The lamp is on.",
      questions: { result: { type: "noul", instructions: "Is the lamp on?" } },
    });
    expect(host.textContent).toContain("unknownCost");
    expect(host.textContent).not.toContain("do-not-display");
    expect(host.innerHTML).not.toContain("never-retain-this-secret");
    expect(localStorage.length).toBe(0);
  });
  it("rejects malformed/duplicate choices before dispatch", async () => {
    await mount();
    await prepare();
    await change("decision-mode", "choice");
    await change("decision-criteria", "red:Red\nred:Other");
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before);
    expect(host.textContent).toContain("invalid");
  });
  it("constructs choice and score criteria without a chat request", async () => {
    await mount();
    await prepare();
    await change("decision-mode", "choice");
    await change("decision-criteria", "red:Red\nblue:Blue");
    fetchMock.mockResolvedValueOnce(json({ answers: {}, usage: { cost: 0 } }));
    await click("run");
    expect(JSON.parse(fetchMock.mock.calls.at(-1)![1].body).questions.result.criteria).toEqual({
      red: "Red",
      blue: "Blue",
    });
    await change("decision-mode", "score");
    await change("decision-levels", "Empty\nFull");
    fetchMock.mockResolvedValueOnce(json({ answers: {}, usage: {} }));
    await click("run");
    expect(JSON.parse(fetchMock.mock.calls.at(-1)![1].body).questions.result.criteria).toEqual([
      "Empty",
      "Full",
    ]);
    expect(fetchMock.mock.calls.some(([path]) => String(path).includes("chat"))).toBe(false);
  });
  it("preserves provider quota error without retrying or claiming account quota", async () => {
    await mount();
    await prepare();
    fetchMock.mockResolvedValueOnce(
      json({ error: { message: "Free usage limit reached.", type: "FreeUsageLimitError" } }, 429)
    );
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before + 1);
    expect(host.textContent).toContain("Free usage limit reached.");
    expect(host.textContent).not.toContain("account quota");
  });
  it("cancels an in-flight decision on edit and ignores a late result", async () => {
    await mount();
    await prepare();
    let complete!: (response: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          complete = resolve;
        })
    );
    await click("run");
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    await change("decision-state", "A different task.");
    expect(signal.aborted).toBe(true);
    await act(async () => complete(json({ model: "stale-result", answers: {}, usage: {} })));
    expect(host.textContent).not.toContain("stale-result");
  });
  it("cancels on reset, clears sensitive text, and does not dispatch again", async () => {
    await mount();
    await prepare();
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));
    await click("run");
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    const before = fetchMock.mock.calls.length;
    await click("reset");
    expect(signal.aborted).toBe(true);
    expect(fetchMock.mock.calls.length).toBe(before);
    expect((host.querySelector('[name="decision-state"]') as HTMLTextAreaElement).value).toBe("");
  });
  it("aborts on unmount and never reveals a key", async () => {
    const root = await mount();
    await prepare();
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));
    await click("run");
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    await act(async () => root.unmount());
    roots.splice(roots.indexOf(root), 1);
    expect(signal.aborted).toBe(true);
    expect(fetchMock.mock.calls.some(([path]) => String(path).includes("reveal"))).toBe(false);
  });
  it("changing client key invalidates catalog identity and prevents dispatch", async () => {
    await mount();
    await prepare();
    await change("decision-key", "");
    expect((host.querySelector('[name="decision-model"]') as HTMLSelectElement).value).toBe("");
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before);
  });
  it("ignores a catalog response after key selection changes", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    let complete!: (response: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          complete = resolve;
        })
    );
    await click("loadCatalog");
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    await change("decision-key", "");
    await act(async () => complete(json({ data: [model] })));
    expect(signal.aborted).toBe(true);
    expect(host.textContent).not.toContain("vendor/native");
  });
  it("shows an authentication failure with no inference or key reveal", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ error: { message: "Authentication required" } }, 401));
    await click("loadKeys");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(host.textContent).toContain("Authentication required");
    expect(host.querySelector('[name="decision-key"]')!.children.length).toBe(1);
  });
  it("renders refusal as refusal without another call and sanitizes credential-shaped error text", async () => {
    await mount();
    await prepare();
    const before = fetchMock.mock.calls.length;
    fetchMock.mockResolvedValueOnce(json({ answers: { result: { type: "refusal" } }, usage: {} }));
    await click("run");
    expect(host.textContent).toContain('"refusal"');
    expect(fetchMock.mock.calls.length).toBe(before + 1);
    fetchMock.mockResolvedValueOnce(
      json({ error: { message: "Denied token sk-syntheticOnlyFixture0123456789" } }, 403)
    );
    await click("run");
    expect(host.textContent).not.toContain("syntheticOnlyFixture");
    expect(fetchMock.mock.calls.length).toBe(before + 2);
  });
  it("rejects oversized catalog response without adopting its rows", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    fetchMock.mockResolvedValueOnce(json({ data: [model], padding: "a".repeat(2097152) }));
    await click("loadCatalog");
    expect(host.textContent).toContain("failed");
    expect(host.textContent).not.toContain("vendor/native");
  });
  it("explicit cancel aborts once and a late inference does not restore output", async () => {
    await mount();
    await prepare();
    let complete!: (response: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          complete = resolve;
        })
    );
    await click("run");
    const before = fetchMock.mock.calls.length;
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    await click("cancel");
    await act(async () => complete(json({ model: "late-output", answers: {}, usage: {} })));
    expect(signal.aborted).toBe(true);
    expect(host.textContent).toContain("cancelled");
    expect(host.textContent).not.toContain("late-output");
    expect(fetchMock.mock.calls.length).toBe(before);
  });
  it("searches models locally while preserving the visible exact selection and unknown metadata", async () => {
    await mount();
    await prepare();
    const before = fetchMock.mock.calls.length;
    await change("decision-search", "unmatched-name");
    const select = host.querySelector('[name="decision-model"]') as HTMLSelectElement;
    expect(select.value).toBe(model.id);
    expect(host.textContent).toContain("unknown");
    expect(fetchMock.mock.calls.length).toBe(before);
  });
  it("retains identity with malformed optional catalog metadata and shows genuine zero prices", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    fetchMock.mockResolvedValueOnce(
      json({
        data: [
          {
            ...model,
            context_length: "unknown",
            pricing: { prompt: "0", completion: "0" },
            supported_endpoints: ["systemone"],
          },
        ],
      })
    );
    await click("loadCatalog");
    await change("decision-model", model.id);
    expect((host.querySelector('[name="decision-model"]') as HTMLSelectElement).value).toBe(
      model.id
    );
    expect(host.textContent).toContain("0 / 0");
    expect(host.textContent).toContain("systemone");
    expect(host.textContent).toContain("unknown");
  });
  it("shows full large distributions with cost receipts while excluding nested account data", async () => {
    await mount();
    await prepare();
    const probabilities = Object.fromEntries(
      Array.from({ length: 255 }, (_, index) => [
        `synthetic_option_number_${index}`,
        index === 0 ? 1 : 0,
      ])
    );
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          answers: {
            result: {
              type: "choice",
              choice: "synthetic_option_number_0",
              probabilities,
              debug: { account: "PRIVATE_ACCOUNT" },
            },
          },
          usage: { input_tokens: 1, account: "PRIVATE_ACCOUNT" },
          provider_metadata: { gateway: { cost: "0.00001", account: "PRIVATE_ACCOUNT" } },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "x-omniroute-cost-status": "known",
            "x-omniroute-response-cost": "0.00002",
          },
        }
      )
    );
    await click("run");
    const display = JSON.parse(host.querySelector("pre")!.textContent!);
    expect(display.answers.result.probabilities).toEqual(probabilities);
    expect(display.cost_receipt).toEqual({
      cost_status: "known",
      omniroute_accounted_cost_usd: "0.00002",
      provider_gateway_cost_usd: "0.00001",
    });
    expect(host.textContent).not.toContain("PRIVATE_ACCOUNT");
  });
  it("rejects a known unsupported primitive before native dispatch", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    fetchMock.mockResolvedValueOnce(
      json({
        data: [
          {
            ...model,
            input_modalities: ["text"],
            output_modalities: ["decisions"],
            decision_primitives: ["choice"],
          },
        ],
      })
    );
    await click("loadCatalog");
    await change("decision-model", model.id);
    await change("decision-state", "Synthetic state");
    await change("decision-instructions", "Synthetic question");
    expect(host.textContent).toContain("text");
    expect(host.textContent).toContain("decisions");
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before);
    expect(host.textContent).toContain("invalid");
  });
  it("aborts a timed out request without retry or late output", async () => {
    await mount();
    await prepare();
    vi.useFakeTimers();
    fetchMock.mockImplementationOnce(
      (_path: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal!.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true }
          );
        })
    );
    await click("run");
    const before = fetchMock.mock.calls.length;
    const signal = fetchMock.mock.calls.at(-1)![1].signal as AbortSignal;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30000);
    });
    expect(signal.aborted).toBe(true);
    expect(host.textContent).toContain("cancelled");
    expect(fetchMock.mock.calls.length).toBe(before);
    expect(host.querySelector("pre")).toBeNull();
  });
  it("loads saved inventory without remote discovery and runs only its explicit selected model", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    fetchMock.mockResolvedValueOnce(
      json({ data: [{ ...model, root: "vendor/native", source: "documentation" }] })
    );
    await click("loadSavedModels");
    expect(fetchMock.mock.calls.at(-1)![0]).toBe("/api/v1/models?kind=decision");
    expect(fetchMock.mock.calls.some(([path]) => path === "/api/v1/systemone/models")).toBe(false);
    expect(host.textContent).toContain("localCatalogNotice");
    await change("decision-model", model.id);
    await change("decision-state", "Synthetic.");
    await change("decision-instructions", "Is this synthetic?");
    fetchMock.mockResolvedValueOnce(
      json({ answers: { result: { type: "noul", noul: 1 } }, usage: {} })
    );
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before + 1);
    expect(fetchMock.mock.calls.at(-1)![0]).toBe("/api/v1/systemone");
    expect(JSON.parse(fetchMock.mock.calls.at(-1)![1].body).model).toBe(model.id);
    await change("decision-key", "");
    expect((host.querySelector('[name="decision-model"]') as HTMLSelectElement).value).toBe("");
  });

  it("applies known DeepInfra choice bounds before submitting a local catalog choice", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    const deepinfra = {
      id: "deepinfra/nace-ai/drex-v2.0",
      root: "nace-ai/drex-v2.0",
      provider: "deepinfra",
      name: "Drex synthetic catalog fixture",
    };
    fetchMock.mockResolvedValueOnce(json({ data: [deepinfra] }));
    await click("loadSavedModels");
    await change("decision-model", deepinfra.id);
    await change("decision-state", "Synthetic state");
    await change("decision-instructions", "Choose one.");
    await change("decision-mode", "choice");
    await change(
      "decision-criteria",
      Array.from({ length: 53 }, (_, i) => `option${i}:Synthetic`).join("\n")
    );
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before);
    expect(host.textContent).toContain("invalid");
  });
  it("distinguishes explicit free SKU, published zero, tiny positive and unknown price labels", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    fetchMock.mockResolvedValueOnce(
      json({
        data: [
          { ...model, id: "openrouter/vendor/free", name: "FreeSKU", tier: "free" },
          {
            ...model,
            id: "openrouter/vendor/zero",
            name: "Zero",
            pricing: { prompt: "0.000", completion: "0" },
          },
          {
            ...model,
            id: "openrouter/vendor/tiny",
            name: "Tiny",
            pricing: { prompt: `0.${"0".repeat(400)}1`, completion: "0" },
          },
          { ...model, id: "openrouter/vendor/unknown", name: "Unknown" },
        ],
      })
    );
    await click("loadSavedModels");
    const select = host.querySelector('[name="decision-model"]') as HTMLSelectElement;
    const texts = [...select.options].map((option) => option.textContent || "");
    expect(texts.find((text) => text.includes("FreeSKU"))).toContain("tierFree");
    expect(texts.find((text) => text.includes("Zero"))).toContain("publishedZeroPrice");
    expect(texts.find((text) => text.includes("Tiny"))).toContain("tierPaid");
    expect(texts.find((text) => text.includes("Unknown"))).toContain("priceAccessUnknown");
  });
  it("uses the registered Perplexity one-level score contract from saved metadata", async () => {
    await mount();
    fetchMock.mockResolvedValueOnce(json({ keys: [{ id: "key-id", name: "Restricted" }] }));
    await click("loadKeys");
    await change("decision-key", "key-id");
    const selected = {
      id: "perplexity/pplx-decider-v1.2",
      root: "pplx-decider-v1.2",
      provider: "perplexity",
      name: "Perplexity synthetic catalog fixture",
      decision_primitives: ["noul", "choice", "score"],
    };
    fetchMock.mockResolvedValueOnce(json({ data: [selected] }));
    await click("loadSavedModels");
    await change("decision-model", selected.id);
    await change("decision-state", "Synthetic state");
    await change("decision-instructions", "Rate using the one supported level.");
    await change("decision-mode", "score");
    await change("decision-levels", "Only level");
    fetchMock.mockResolvedValueOnce(
      json({
        model: "pplx-decider-v1.2",
        answers: { result: { type: "score", score: 0, probabilities: { "0": 1 }, confidence: 1 } },
        usage: { input_tokens: 5 },
      })
    );
    const before = fetchMock.mock.calls.length;
    await click("run");
    expect(fetchMock.mock.calls.length).toBe(before + 1);
    const [url, init] = fetchMock.mock.calls.at(-1)!;
    expect(url).toBe("/api/v1/systemone");
    expect(JSON.parse(init.body).questions.result.criteria).toEqual(["Only level"]);
  });
});

it("displays known unsupported adapters and prevents an unintended native request", async () => {
  await mount();
  fetchMock.mockResolvedValueOnce(
    json({ keys: [{ id: "key-id", name: "Client", isActive: true }] })
  );
  await click("loadKeys");
  await change("decision-key", "key-id");
  const unavailable = {
    ...model,
    id: "unknown-provider/native",
    provider: "unknown-provider",
    native_adapter: "unavailable",
  };
  fetchMock.mockResolvedValueOnce(json({ data: [unavailable] }));
  await click("loadSavedModels");
  await change("decision-model", unavailable.id);
  await change("decision-state", "The lamp is on.");
  await change("decision-instructions", "Is it on?");
  const before = fetchMock.mock.calls.length;
  const run = [...host.querySelectorAll("button")].find((button) => button.textContent === "run")!;
  expect(run.disabled).toBe(true);
  expect(host.textContent).toContain("adapterUnavailable");
  await click("run");
  expect(fetchMock).toHaveBeenCalledTimes(before);
});
