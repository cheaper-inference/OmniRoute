import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_CODEX_IMAGE_EDIT_REFERENCES,
  MAX_CODEX_GPT_IMAGE_EDIT_REFERENCES,
  validateCodexImageEditReferences,
} from "../../src/lib/images/imageRouteModel.ts";

function pngReference(): { bytes: Buffer; mime: string } {
  return {
    // The validator checks PNG magic bytes; no image decoder or network is involved.
    bytes: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    mime: "image/png",
  };
}

test("hosted Codex Responses image edits accept eight references and reject nine", () => {
  assert.equal(MAX_CODEX_IMAGE_EDIT_REFERENCES, 8);

  const eight = Array.from({ length: 8 }, pngReference);
  assert.equal(validateCodexImageEditReferences(eight), null);
  assert.match(
    validateCodexImageEditReferences([...eight, pngReference()]) ?? "",
    /at most 8 reference images/
  );
});

test("dedicated GPT Image edits accept sixteen references without raising the hosted limit", () => {
  assert.equal(MAX_CODEX_GPT_IMAGE_EDIT_REFERENCES, 16);
  assert.notEqual(MAX_CODEX_GPT_IMAGE_EDIT_REFERENCES, MAX_CODEX_IMAGE_EDIT_REFERENCES);

  const sixteen = Array.from({ length: 16 }, pngReference);
  assert.equal(
    validateCodexImageEditReferences(sixteen, MAX_CODEX_GPT_IMAGE_EDIT_REFERENCES),
    null
  );
  assert.match(
    validateCodexImageEditReferences(
      [...sixteen, pngReference()],
      MAX_CODEX_GPT_IMAGE_EDIT_REFERENCES
    ) ?? "",
    /at most 16 reference images/
  );

  // The default must remain the independently verified hosted Responses cap.
  assert.match(validateCodexImageEditReferences(sixteen) ?? "", /at most 8 reference images/);
});
