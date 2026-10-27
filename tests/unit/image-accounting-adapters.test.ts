import test from "node:test";
import assert from "node:assert/strict";
import { buildImageEndpointSuccess } from "../../open-sse/handlers/imageGeneration/result.ts";
import { buildAdobeFireflyEditDataUrls } from "../../src/lib/images/adobeFireflyEdit.ts";

test("image endpoint result preserves usage internally without changing the public envelope", () => {
  const usage = { input_tokens: 12, output_tokens: 5 };
  const items = [{ b64_json: "image" }];
  const result = buildImageEndpointSuccess({ created: 123, usage }, items);
  assert.equal(result.usage, usage);
  assert.deepEqual(result.data, { created: 123, data: items });
  assert.equal(Object.hasOwn(result.data, "usage"), false);
  for (const invalid of [undefined, null, [], "usage", 42]) {
    assert.equal(buildImageEndpointSuccess({ usage: invalid }, items).usage, undefined);
  }
});

test("Firefly edit references prefer multiple images and retain primary-image fallback", () => {
  const first = Buffer.from("first");
  const second = Buffer.from("second");
  assert.deepEqual(
    buildAdobeFireflyEditDataUrls(
      [
        { bytes: first, mime: "image/jpeg" },
        { bytes: second, mime: "invalid" },
      ],
      Buffer.from("ignored"),
      "image/webp"
    ),
    [
      "data:image/jpeg;base64," + first.toString("base64"),
      "data:image/png;base64," + second.toString("base64"),
    ]
  );
  assert.deepEqual(buildAdobeFireflyEditDataUrls([], first, "invalid"), [
    "data:image/png;base64," + first.toString("base64"),
  ]);
  assert.deepEqual(buildAdobeFireflyEditDataUrls([], null, null), []);
});
