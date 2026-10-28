// The Microsoft Designer web provider has been retired. Its ids match without regard to case or
// surrounding spaces, anything that is not a string never matches, and asserting availability throws a
// 410 error with a fixed message that a second helper recognises, and only that exact error.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  assertMicrosoftDesignerWebProviderAvailable,
  isMicrosoftDesignerWebProviderRetiredError,
  isMicrosoftDesignerWebRetiredProviderId,
  MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
  RETIRED_MICROSOFT_DESIGNER_WEB_PROVIDER_IDS,
} from "../../src/shared/constants/designerWebRetirement.ts";

test("both retired ids are in the set", () => {
  assert.deepEqual([...RETIRED_MICROSOFT_DESIGNER_WEB_PROVIDER_IDS].sort(), [
    "microsoft-designer-web",
    "msdesigner",
  ]);
});

test("a retired id matches regardless of case and surrounding spaces", () => {
  assert.equal(isMicrosoftDesignerWebRetiredProviderId("msdesigner"), true);
  assert.equal(isMicrosoftDesignerWebRetiredProviderId("  Microsoft-Designer-Web "), true);
});

test("other providers and non-string values do not match", () => {
  for (const value of ["openai", "", "   ", "msdesigner2", null, undefined, 5, {}]) {
    assert.equal(isMicrosoftDesignerWebRetiredProviderId(value), false, String(value));
  }
});

test("asserting a live provider does nothing", () => {
  assert.doesNotThrow(() => assertMicrosoftDesignerWebProviderAvailable("openai"));
});

test("asserting a retired provider throws a 410 with the fixed message", () => {
  assert.throws(
    () => assertMicrosoftDesignerWebProviderAvailable("msdesigner"),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.equal((error as Error & { status?: number }).status, 410);
      assert.equal(error.message, MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE);
      return true;
    }
  );
});

test("the error guard accepts only a 410 with that exact message", () => {
  const retired = Object.assign(new Error(MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE), { status: 410 });
  assert.equal(isMicrosoftDesignerWebProviderRetiredError(retired), true);
  assert.equal(
    isMicrosoftDesignerWebProviderRetiredError(Object.assign(new Error("other"), { status: 410 })),
    false
  );
  assert.equal(
    isMicrosoftDesignerWebProviderRetiredError(
      Object.assign(new Error(MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE), { status: 500 })
    ),
    false
  );
  assert.equal(
    isMicrosoftDesignerWebProviderRetiredError({
      status: 410,
      message: MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
    }),
    false
  );
});
