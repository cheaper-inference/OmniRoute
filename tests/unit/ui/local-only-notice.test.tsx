// @vitest-environment jsdom
/**
 * KEA-9357 & co. — one notice and one hook for "this only works on the local machine".
 * The notice must read as plain language (no raw code, no HTTP status) and must not offer a
 * Retry, since retrying from a remote session cannot succeed.
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import { LocalOnlyNotice } from "../../../src/shared/components/LocalOnlyNotice";
import {
  LocalOnlyAccessProvider,
  useLocalOnlyBlocked,
} from "../../../src/shared/hooks/useLocalOnlyAccess";
import {
  __resetLocalOnlyRejectionsForTests,
  reportLocalOnlyRejection,
} from "../../../src/shared/utils/localOnlyAccess";

afterEach(() => {
  cleanup();
  __resetLocalOnlyRejectionsForTests();
});

function Probe({ path }: { path: string }) {
  return <output data-testid="probe">{useLocalOnlyBlocked(path) ? "blocked" : "open"}</output>;
}

describe("LocalOnlyNotice", () => {
  it("explains the limit in plain words, with no raw code and no retry", () => {
    render(
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <LocalOnlyNotice />
      </NextIntlClientProvider>
    );

    const notice = screen.getByTestId("local-only-notice");
    expect(notice.textContent).toContain("Only available on the local machine");
    expect(notice.textContent).toContain("localhost or your local network");
    expect(notice.textContent).not.toMatch(/LOCAL_ONLY|403|HTTP/);
    expect(notice.querySelector("button")).toBeNull();
  });
});

describe("useLocalOnlyBlocked", () => {
  it("is blocked from the first render when the server says the session is remote", () => {
    render(
      <LocalOnlyAccessProvider value={{ locality: "remote", remoteBlockedPaths: ["/api/plugins"] }}>
        <Probe path="/api/plugins" />
      </LocalOnlyAccessProvider>
    );
    expect(screen.getByTestId("probe").textContent).toBe("blocked");
  });

  it("stays open for a local session", () => {
    render(
      <LocalOnlyAccessProvider value={{ locality: "local", remoteBlockedPaths: ["/api/plugins"] }}>
        <Probe path="/api/plugins" />
      </LocalOnlyAccessProvider>
    );
    expect(screen.getByTestId("probe").textContent).toBe("open");
  });

  it("without a server answer it stays open until a request is rejected", () => {
    render(<Probe path="/api/plugins" />);
    expect(screen.getByTestId("probe").textContent).toBe("open");

    act(() => reportLocalOnlyRejection("/api/plugins"));

    expect(screen.getByTestId("probe").textContent).toBe("blocked");
  });

  it("one rejection blocks the other registered surfaces of an undecided session", () => {
    render(
      <LocalOnlyAccessProvider
        value={{ locality: "unknown", remoteBlockedPaths: ["/api/plugins", "/api/db/health"] }}
      >
        <Probe path="/api/db/health" />
      </LocalOnlyAccessProvider>
    );
    expect(screen.getByTestId("probe").textContent).toBe("open");

    act(() => reportLocalOnlyRejection("/api/plugins"));

    expect(screen.getByTestId("probe").textContent).toBe("blocked");
  });
});
