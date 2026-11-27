// @vitest-environment jsdom
/**
 * KEA-9357 & co. — one notice and one hook for "this only works on the local machine".
 * The notice must read as plain language (no raw code, no HTTP status) and must not offer a
 * Retry, since retrying from a remote session cannot succeed.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInThisContext } from "node:vm";
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it } from "vitest";

import * as localOnlyFeatures from "../../../src/shared/constants/localOnlyFeatures";
import * as localOnlyAccess from "../../../src/shared/utils/localOnlyAccess";
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

it("shows the notice after a rejection with the production hook compiled by React Compiler", async () => {
  const require = createRequire(import.meta.url);
  const filename = "src/shared/hooks/useLocalOnlyAccess.tsx";
  const ts = require("typescript") as typeof import("typescript");
  const stripped = ts.transpile(
    readFileSync(filename, "utf8"),
    { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.Preserve },
    filename
  );
  const { code } = require("@babel/core").transformSync(stripped, {
    filename,
    babelrc: false,
    configFile: false,
    parserOpts: { plugins: ["jsx"] },
    plugins: [
      require("babel-plugin-react-compiler"),
      require("@babel/plugin-transform-react-jsx"),
      require("@babel/plugin-transform-modules-commonjs"),
    ],
  });
  expect(code).toContain("react/compiler-runtime");
  type HookModule = typeof import("../../../src/shared/hooks/useLocalOnlyAccess");
  const loadCompiledHook = runInThisContext(
    `(function (require, exports) {${code}
})`
  ) as (load: (id: string) => unknown, exports: Partial<HookModule>) => void;
  const compiled: Partial<HookModule> = {};
  const imports: Record<string, unknown> = {
    react: React,
    "@/shared/constants/localOnlyFeatures": localOnlyFeatures,
    "@/shared/utils/localOnlyAccess": localOnlyAccess,
  };
  loadCompiledHook((id) => imports[id] ?? require(id), compiled);
  const {
    LocalOnlyAccessProvider: CompiledProvider,
    useLocalOnlyBlocked: useCompiledLocalOnlyBlocked,
  } = compiled;
  if (!CompiledProvider || !useCompiledLocalOnlyBlocked)
    throw new Error("Missing compiled exports");

  function Screen() {
    const blocked = useCompiledLocalOnlyBlocked("/api/plugins");
    return blocked ? <LocalOnlyNotice /> : <output>Loading plugins</output>;
  }

  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <CompiledProvider value={{ locality: "unknown", remoteBlockedPaths: ["/api/plugins"] }}>
        <Screen />
      </CompiledProvider>
    </NextIntlClientProvider>
  );
  expect(screen.getByText("Loading plugins")).toBeTruthy();

  await act(async () => {
    const response = Response.json({ error: { code: "LOCAL_ONLY" } }, { status: 403 });
    expect(await localOnlyAccess.detectLocalOnlyRejection(response, "/api/plugins")).toBe(true);
  });

  expect(screen.getByTestId("local-only-notice")).toBeTruthy();
  expect(screen.queryByText("Loading plugins")).toBeNull();
});
