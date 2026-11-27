// @vitest-environment jsdom
/**
 * The tool setup card hands the key to the state builder only while "Include my key" is on. The
 * builder ignores a key with the choice off, so the page looks the same either way: this file
 * watches the builder's input instead.
 */
import React from "react";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  KEY,
  QUOTA_MODELS,
  jsonResponse,
  quotaView,
  renderQuota,
  stubFetch,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one,
// inside the provider `renderQuota` mounts.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

/** Each builder call: whether the choice was on, and whether a key came with it. */
const builderCalls = vi.hoisted(() => [] as Array<{ includeKey: boolean; withKey: boolean }>);

vi.mock("@/app/quota/[provider]/lib/onboardingState", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/app/quota/[provider]/lib/onboardingState")>();
  return {
    ...actual,
    deriveOnboardingState: (input: Parameters<typeof actual.deriveOnboardingState>[0]) => {
      builderCalls.push({ includeKey: input.choices.includeKey, withKey: input.apiKey !== null });
      return actual.deriveOnboardingState(input);
    },
  };
});

type ClientComponent = (props: { provider: string; providerName: string }) => React.ReactElement;

const QUOTA = "/api/v1/me/quota/";
let QuotaSelfClient: ClientComponent;

beforeEach(async () => {
  vi.resetModules();
  builderCalls.length = 0;
  QuotaSelfClient = (await import("@/app/quota/[provider]/QuotaSelfClient")).default;
});

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const includeKey = () => screen.getByLabelText("Include my key") as HTMLInputElement;

describe("self-service quota page: the key reaches the setup builder only on request", () => {
  it("every call with the choice off has no key, and a key comes only after the choice is on", async () => {
    stubFetch({
      [QUOTA]: () =>
        jsonResponse(
          quotaView({ availableModels: QUOTA_MODELS, apiBaseUrl: "https://gw.example.net" })
        ),
    });
    renderQuota(<QuotaSelfClient provider="claude" providerName="Claude Code" />);
    fireEvent.change(screen.getByLabelText("API key"), { target: { value: KEY } });
    fireEvent.click(screen.getByRole("button", { name: "Show my quota" }));
    await screen.findByRole("heading", { name: "Set up your tools" });
    await act(async () => {});

    const beforeOn = builderCalls.length;
    expect(beforeOn).toBeGreaterThan(0);
    expect(builderCalls.every((call) => !call.withKey)).toBe(true);

    fireEvent.click(includeKey());
    const afterOn = builderCalls.slice(beforeOn);
    expect(afterOn.some((call) => call.withKey)).toBe(true);
    expect(afterOn.every((call) => call.includeKey)).toBe(true);

    const beforeOff = builderCalls.length;
    fireEvent.click(includeKey());
    const afterOff = builderCalls.slice(beforeOff);
    expect(afterOff.length).toBeGreaterThan(0);
    expect(afterOff.every((call) => !call.includeKey && !call.withKey)).toBe(true);

    // The rule over the whole run: no call with the choice off ever carried a key.
    expect(builderCalls.filter((call) => !call.includeKey && call.withKey)).toEqual([]);
  });
});
