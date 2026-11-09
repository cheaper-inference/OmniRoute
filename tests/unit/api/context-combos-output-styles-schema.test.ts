import test from "node:test";
import assert from "node:assert/strict";

const { compressionComboCreateSchema } =
  await import("../../../src/app/api/context/combos/route.ts");
const { compressionComboUpdateSchema } =
  await import("../../../src/app/api/context/combos/[id]/route.ts");

test("compression combo schemas accept an outputStyles selection", () => {
  const parsed = compressionComboCreateSchema.parse({
    name: "Styled",
    outputStyles: [{ id: "less-code", level: "full" }],
  });
  assert.deepEqual(parsed.outputStyles, [{ id: "less-code", level: "full" }]);
  assert.deepEqual(
    compressionComboUpdateSchema.parse({ outputStyles: [{ id: "terse-prose", level: "ultra" }] })
      .outputStyles,
    [{ id: "terse-prose", level: "ultra" }]
  );
});

test("compression combo schemas reject malformed outputStyles entries", () => {
  assert.equal(
    compressionComboCreateSchema.safeParse({ name: "x", outputStyles: [{ id: "", level: "full" }] })
      .success,
    false
  );
  assert.equal(
    compressionComboCreateSchema.safeParse({
      name: "x",
      outputStyles: [{ id: "less-code", level: "turbo" }],
    }).success,
    false
  );
});
