import test from "node:test";
import assert from "node:assert/strict";
import {
  KEAK_ACTIVE_PRODUCT,
  KEAK_PRODUCT_LINKS,
} from "../../src/shared/constants/keakProducts.ts";

test("product switcher links cover the three Keak products with https destinations", () => {
  assert.deepEqual(
    KEAK_PRODUCT_LINKS.map((p) => p.product),
    ["optimize", "inference", "omniroute"]
  );
  for (const p of KEAK_PRODUCT_LINKS) assert.match(p.href, /^https:\/\//, `${p.product} href`);
  assert.equal(KEAK_ACTIVE_PRODUCT, "omniroute");
});
