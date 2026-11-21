// @vitest-environment jsdom
// KEA-9386: the Custom webhook step says what is wrong, where it is wrong. Next stays enabled;
// clicking it with an empty, malformed or over-long value flags the field inline and focuses
// it, and nothing is sent to the API. Limits mirror the route's Zod schema.
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createTranslator } from "use-intl/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AddWebhookWizard } from "@/app/(dashboard)/dashboard/webhooks/components/AddWebhookWizard";
import en from "@/i18n/messages/en.json";
import { WEBHOOK_SECRET_MAX_LENGTH, WEBHOOK_URL_MAX_LENGTH } from "@/shared/constants/formLimits";

// The page hands the wizard its `webhooks` translator: use the real English catalog.
const translate = createTranslator({
  locale: "en",
  messages: en as never,
  namespace: "webhooks",
  onError: () => {},
  getMessageFallback: ({ key }) => key,
});
const t = (key: string, opts?: Record<string, unknown>) =>
  String(translate(key as never, opts as never));

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const fetchMock = vi.fn<typeof fetch>();
const callsTo = (path: string, method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => url === path && init?.method === method);
const creates = () => callsTo("/api/webhooks", "POST");

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (url) =>
    url === "/api/webhooks/validate-url"
      ? reply({ valid: true })
      : reply({ webhook: { id: "wh-1" } }, 201)
  );
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Plain DOM lookups: role queries walk the whole accessibility tree on every call.
const button = (text: string) =>
  Array.from(document.querySelectorAll("button")).find((node) =>
    node.textContent?.includes(text)
  ) as HTMLButtonElement | undefined;
const next = () => button("Next") as HTMLButtonElement;
const urlField = () => screen.getByLabelText(/^Endpoint URL/) as HTMLInputElement;
const secretField = () => screen.getByLabelText(/^Secret Key/) as HTMLInputElement;
const type = (field: HTMLInputElement, value: string) =>
  fireEvent.change(field, { target: { value } });
const alerts = () =>
  Array.from(document.querySelectorAll('[role="alert"]')).map((node) => node.textContent);
const urlOfLength = (length: number) => {
  const prefix = "https://example.com/hook/";
  return prefix + "a".repeat(length - prefix.length);
};

/** Opens the wizard and walks to the Custom webhook step. */
async function openCustomStep() {
  render(<AddWebhookWizard isOpen onClose={vi.fn()} onCreated={vi.fn()} t={t} />);
  // The first screen is the integration picker — step 1 — and it has nothing to go back to.
  await screen.findByText("Add Webhook — Select Integration");
  expect(button("Back")).toBeUndefined();
  await waitFor(() => expect(next().disabled).toBe(false));
  fireEvent.click(button("Custom Webhook")!);
  fireEvent.click(next());
  await screen.findByLabelText(/^Endpoint URL/);
}

describe("Custom webhook step validation (KEA-9386)", () => {
  it("explains an empty Endpoint URL inline when Next is clicked, instead of a silent disabled button", async () => {
    await openCustomStep();
    expect(next().disabled).toBe(false);
    // Nothing is flagged before the user tries to continue.
    expect(alerts()).toEqual([]);

    fireEvent.click(next());

    expect(alerts()).toEqual(["Endpoint URL is required"]);
    expect(urlField().getAttribute("aria-invalid")).toBe("true");
    await waitFor(() => expect(document.activeElement).toBe(urlField()));
    expect(creates()).toHaveLength(0);
  });

  it.each(["not-a-url", "<script>x</script> %% 😀", "ftp://example.com/hook"])(
    "says at once that %j is not an http(s) URL, without asking the server",
    async (value) => {
      await openCustomStep();
      type(urlField(), value);

      expect(alerts()).toEqual(["Enter a valid URL that starts with https:// or http://"]);
      expect(urlField().getAttribute("aria-invalid")).toBe("true");

      fireEvent.click(next());
      await waitFor(() => expect(document.activeElement).toBe(urlField()));
      expect(creates()).toHaveLength(0);
      expect(callsTo("/api/webhooks/validate-url", "POST")).toHaveLength(0);
    }
  );

  it("accepts the ticket's 340-character URL and flags one over the server limit", async () => {
    await openCustomStep();
    type(urlField(), urlOfLength(340));
    expect(alerts()).toEqual([]);
    type(urlField(), urlOfLength(WEBHOOK_URL_MAX_LENGTH));
    expect(alerts()).toEqual([]);

    type(urlField(), urlOfLength(WEBHOOK_URL_MAX_LENGTH + 1));
    expect(alerts()).toEqual(["Endpoint URL can have at most 2,000 characters (currently 2,001)"]);
    // Nothing is cut: the user sees what they pasted.
    expect(urlField().value).toHaveLength(WEBHOOK_URL_MAX_LENGTH + 1);
    fireEvent.click(next());
    expect(creates()).toHaveLength(0);
  });

  it("keeps a 400-character Secret Key whole, from the field to the request", async () => {
    await openCustomStep();
    const secret = "s".repeat(400);
    type(urlField(), "https://example.com/hook");
    type(secretField(), secret);

    expect(secretField().hasAttribute("maxlength")).toBe(false);
    expect(secretField().value).toHaveLength(400);
    expect(alerts()).toEqual([]);

    fireEvent.click(next());
    await waitFor(() => expect(creates()).toHaveLength(1));
    expect(JSON.parse(String(creates()[0][1]?.body))).toEqual({
      kind: "custom",
      url: "https://example.com/hook",
      secret,
    });
  });

  it("flags a Secret Key over the server limit instead of cutting or sending it", async () => {
    await openCustomStep();
    type(urlField(), "https://example.com/hook");
    type(secretField(), "s".repeat(WEBHOOK_SECRET_MAX_LENGTH + 1));

    expect(alerts()).toEqual(["Secret Key can have at most 500 characters (currently 501)"]);
    expect(secretField().value).toHaveLength(WEBHOOK_SECRET_MAX_LENGTH + 1);
    expect(secretField().getAttribute("aria-invalid")).toBe("true");

    fireEvent.click(next());
    await waitFor(() => expect(document.activeElement).toBe(secretField()));
    expect(creates()).toHaveLength(0);
  });

  it("shows the server's reason, not [object Object], when the API refuses the URL", async () => {
    fetchMock.mockImplementation(async (url) =>
      url === "/api/webhooks/validate-url"
        ? reply({ valid: true })
        : reply(
            {
              error: {
                message: "Invalid request",
                details: [{ field: "url", message: "Blocked private or local provider URL" }],
              },
            },
            400
          )
    );
    await openCustomStep();
    type(urlField(), "https://internal.example/hook");
    fireEvent.click(next());

    await screen.findByText("Blocked private or local provider URL");
    expect(document.body.textContent).not.toContain("[object Object]");
  });
});
