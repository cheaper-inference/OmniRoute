import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isPinnedToBottom, SCROLL_FOLLOW_SLACK_PX } from "../../src/shared/utils/scrollFollow.ts";

// A scroll box, measured the way the DOM measures one.
const box = ({
  scrollTop,
  scrollHeight = 1000,
  clientHeight = 400,
}: {
  scrollTop: number;
  scrollHeight?: number;
  clientHeight?: number;
}) => ({ scrollTop, scrollHeight, clientHeight });

describe("isPinnedToBottom", () => {
  it("is true at the exact bottom", () => {
    assert.equal(isPinnedToBottom(box({ scrollTop: 600 })), true);
  });

  it("is false while the reader is looking at older lines", () => {
    assert.equal(isPinnedToBottom(box({ scrollTop: 0 })), false);
    assert.equal(isPinnedToBottom(box({ scrollTop: 300 })), false);
  });

  it("tolerates the sub-pixel residue a pinned element reports", () => {
    assert.equal(isPinnedToBottom(box({ scrollTop: 600 - 1.5 })), true);
    assert.equal(isPinnedToBottom(box({ scrollTop: 600 - SCROLL_FOLLOW_SLACK_PX })), true);
  });

  it("stops following once past the slack", () => {
    assert.equal(isPinnedToBottom(box({ scrollTop: 600 - SCROLL_FOLLOW_SLACK_PX - 1 })), false);
  });

  it("follows a log short enough not to scroll at all", () => {
    assert.equal(
      isPinnedToBottom(box({ scrollTop: 0, scrollHeight: 400, clientHeight: 400 })),
      true
    );
  });

  it("follows when there is no element or no measurement yet", () => {
    assert.equal(isPinnedToBottom(null), true);
    assert.equal(isPinnedToBottom(undefined), true);
    assert.equal(isPinnedToBottom({}), true);
    assert.equal(isPinnedToBottom(box({ scrollTop: Number.NaN })), true);
  });

  it("honours an explicit slack", () => {
    assert.equal(isPinnedToBottom(box({ scrollTop: 590 }), 0), false);
    assert.equal(isPinnedToBottom(box({ scrollTop: 590 }), 20), true);
  });
});
