// @vitest-environment jsdom
/**
 * #18078 — the /docs nav GitHub icon came from Fumadocs' `githubUrl` shortcut, which renders
 * `<svg role="img">` with no accessible name (axe `svg-img-alt`). The layout now passes its
 * own icon link item: the link carries the name ("GitHub") and the glyph is decorative.
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { docsGithubLink } from "../../../src/app/docs/docsGithubLink";

const LAYOUT = path.resolve(__dirname, "../../../src/app/docs/layout.tsx");

describe("docs GitHub nav link", () => {
  it("is an external icon link named GitHub", () => {
    expect(docsGithubLink.type).toBe("icon");
    expect(docsGithubLink.url).toBe("https://github.com/cheaper-inference/OmniRoute");
    expect(docsGithubLink.label).toBe("GitHub");
    expect(docsGithubLink.text).toBe("GitHub");
    expect(docsGithubLink.external).toBe(true);
  });

  it("renders a decorative glyph instead of an unnamed svg role=img", () => {
    const markup = renderToStaticMarkup(<>{docsGithubLink.icon}</>);
    expect(markup).toContain("<svg");
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).not.toContain('role="img"');
  });

  it("the docs layout uses the item instead of the githubUrl shortcut", () => {
    const src = fs.readFileSync(LAYOUT, "utf8");
    expect(src).not.toMatch(/\bgithubUrl\s*:/);
    expect(src).toContain("docsGithubLink");
  });
});
