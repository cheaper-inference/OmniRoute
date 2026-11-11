// @vitest-environment jsdom
/**
 * #18075 — `oauthModal/GheConfigStep` and `oauthModal/OAuthWaitingStep` had no test of their own.
 * The global UI polyfill backs `useTranslations` with the real `en.json`.
 */
import React, { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

let GheConfigStep: typeof import("../../../src/shared/components/oauthModal/GheConfigStep").default;
let OAuthWaitingStep: typeof import("../../../src/shared/components/oauthModal/OAuthWaitingStep").default;

beforeAll(async () => {
  ({ default: GheConfigStep } =
    await import("../../../src/shared/components/oauthModal/GheConfigStep"));
  ({ default: OAuthWaitingStep } =
    await import("../../../src/shared/components/oauthModal/OAuthWaitingStep"));
}, 180_000);

let root: Root;
let container: HTMLDivElement;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function typeInto(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function connectButton(): HTMLButtonElement {
  const button = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.textContent === "Connect"
  );
  expect(button).toBeDefined();
  return button as HTMLButtonElement;
}

describe("GheConfigStep", () => {
  function Harness({
    startOAuthFlow,
    initialUrl = "",
    error = null,
  }: {
    startOAuthFlow: () => void;
    initialUrl?: string;
    error?: string | null;
  }) {
    const [gheUrl, setGheUrl] = useState(initialUrl);
    const [stepError, setStepError] = useState<string | null>(error);
    return (
      <GheConfigStep
        gheUrl={gheUrl}
        setGheUrl={setGheUrl}
        error={stepError}
        setError={setStepError}
        startOAuthFlow={startOAuthFlow}
      />
    );
  }

  it("labels the URL field and keeps Connect disabled until a URL is typed", () => {
    const start = vi.fn();
    act(() => root.render(<Harness startOAuthFlow={start} />));
    const input = container.querySelector<HTMLInputElement>("input[type='url']");
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe("https://ghe.yourcompany.com");
    const label = container.querySelector(`label[for="${input?.id}"]`);
    expect(label?.textContent).toContain("GitHub Enterprise URL");
    expect(connectButton().disabled).toBe(true);

    typeInto(input as HTMLInputElement, "   ");
    expect(connectButton().disabled).toBe(true);

    typeInto(input as HTMLInputElement, "https://ghe.example.com");
    expect(connectButton().disabled).toBe(false);
    act(() => connectButton().click());
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("renders the description with the example URL as code", () => {
    act(() => root.render(<Harness startOAuthFlow={() => {}} />));
    expect(container.querySelector("code")?.textContent).toBe("https://ghe.yourcompany.com");
  });

  it("shows the error passed by the modal", () => {
    act(() =>
      root.render(<Harness startOAuthFlow={() => {}} initialUrl="x" error="Bad enterprise URL" />)
    );
    expect(container.textContent).toContain("Bad enterprise URL");
  });
});

describe("OAuthWaitingStep", () => {
  it("shows the waiting copy and offers the manual fallback", () => {
    const onManualInput = vi.fn();
    act(() =>
      root.render(
        <OAuthWaitingStep
          waitingLabel="Waiting for authorization"
          completeAuthLabel="Complete the sign-in in the popup"
          popupClosedHint="Closed the popup by mistake?"
          popupBlockedLabel="Enter the code manually"
          onManualInput={onManualInput}
        />
      )
    );
    expect(container.querySelector("h3")?.textContent).toBe("Waiting for authorization");
    expect(container.textContent).toContain("Complete the sign-in in the popup");
    expect(container.textContent).toContain("Closed the popup by mistake?");
    // The spinner is announced with the same waiting label.
    expect(container.querySelector("[role='status']")?.textContent).toContain(
      "Waiting for authorization"
    );
    const manual = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Enter the code manually"
    );
    act(() => manual?.click());
    expect(onManualInput).toHaveBeenCalledTimes(1);
  });
});
