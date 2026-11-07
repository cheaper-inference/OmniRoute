import assert from "node:assert/strict";
import { test } from "node:test";
import type { Browser, BrowserContext } from "playwright-core";
import {
  assertMatchingChatGptSession,
  openChatGptContext,
  openChatGptPage,
  releasePersistentChatGptPage,
} from "../../open-sse/vendor/codex-chatgpt-web/persistent-cdp-context.ts";

const cookie = (value: string, suffix = "", domain = ".chatgpt.com") => ({
  name: `__Secure-next-auth.session-token${suffix}`,
  value,
  domain,
});
test("accepts split session tokens in numeric order and ignores unrelated domains", () => {
  assertMatchingChatGptSession(
    [cookie("abcd")],
    [cookie("cd", ".1"), cookie("ab", ".0"), cookie("other", "", "evil.test")]
  );
});
test("rejects absent or different account sessions without exposing values", () => {
  for (const actual of [[], [cookie("secret-two")]]) {
    assert.throws(
      () => assertMatchingChatGptSession([cookie("secret-one")], actual),
      (e) => {
        assert.ok(e instanceof Error);
        assert.ok(!e.message.includes("secret-"));
        return true;
      }
    );
  }
});
test("persistent connection reuses the authenticated context without injecting cookies", async () => {
  const context = { cookies: async () => [cookie("same")] } as unknown as BrowserContext;
  const browser = {
    contexts: () => [context],
    newContext: () => {
      throw new Error("must not create context");
    },
  } as unknown as Browser;
  assert.equal(
    await openChatGptContext(browser, { cookies: [cookie("same")], origins: [] } as never, true),
    context
  );
  await assert.rejects(
    openChatGptContext(browser, { cookies: [cookie("other")], origins: [] } as never, true)
  );
});
test("ordinary connections retain isolated contexts", async () => {
  const context = {} as BrowserContext;
  const browser = { newContext: async () => context } as unknown as Browser;
  assert.equal(await openChatGptContext(browser, { cookies: [], origins: [] }, false), context);
});
test("persistent turns reuse one tab and reject overlapping leases", async () => {
  const page = { url: () => "https://chatgpt.com/?temporary-chat=true" } as never;
  const context = {
    pages: () => [page],
    newPage: () => {
      throw new Error("must not open another tab");
    },
  } as unknown as BrowserContext;
  assert.equal(await openChatGptPage(context, true), page);
  await assert.rejects(openChatGptPage(context, true), /busy/);
  releasePersistentChatGptPage(page);
  assert.equal(await openChatGptPage(context, true), page);
  releasePersistentChatGptPage(page);
});

test("maintenance does not retain a turn lease; extra tabs fail closed", async () => {
  const page = { url: () => "https://chatgpt.com/" } as never;
  const context = { pages: () => [page] } as unknown as BrowserContext;
  assert.equal(await openChatGptPage(context, true, false), page);
  assert.equal(await openChatGptPage(context, true), page);
  releasePersistentChatGptPage(page);
  await assert.rejects(
    openChatGptPage({ pages: () => [page, page] } as unknown as BrowserContext, true),
    /exactly one/
  );
});

test("a refreshed session is accepted only for the bound authenticated user and account", async () => {
  const cookies = [
    { ...cookie("rotated"), name: "_account", value: "workspace" },
    cookie("rotated"),
  ];
  let currentUser = "user-a";
  const readiness: string[] = [];
  const context = {
    cookies: async () => cookies,
    pages: () => [
      {
        url: () => "https://chatgpt.com/",
        bringToFront: async () => {
          readiness.push("activate");
        },
        waitForLoadState: async () => {
          readiness.push("ready");
        },
        evaluate: async () => {
          readiness.push("authenticate");
          return currentUser;
        },
      },
    ],
  } as unknown as BrowserContext;
  const browser = { contexts: () => [context] } as unknown as Browser;
  const state = {
    cookies: [{ ...cookie("old"), name: "_account", value: "workspace" }, cookie("old")],
    origins: [],
    omnirouteUserId: "user-a",
  };
  assert.equal(await openChatGptContext(browser, state as never, true), context);
  currentUser = "user-b";
  await assert.rejects(openChatGptContext(browser, state as never, true), /does not match/);
  currentUser = "user-a";
  cookies[0].value = "other-workspace";
  await assert.rejects(openChatGptContext(browser, state as never, true), /does not match/);
});

test("unrelated operator tabs are preserved while leasing the only ChatGPT page", async () => {
  const foreign = { url: () => "https://example.com/" } as never;
  const owned = { url: () => "https://chatgpt.com/" } as never;
  const context = { pages: () => [foreign, owned] } as unknown as BrowserContext;
  assert.equal(await openChatGptPage(context, true), owned);
  releasePersistentChatGptPage(owned);
  assert.deepEqual(context.pages(), [foreign, owned]);
});
