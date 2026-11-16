/**
 * Creator credit in the desktop app metadata.
 *
 * The project transition kept a permanent "Created by Diego Souza" credit in
 * every place the project is presented. For the desktop app that means:
 * - `author` in electron/package.json names the creator and links the profile
 *   (electron-builder also uses `author` as the .deb maintainer, so the support
 *   email stays);
 * - the native About panel (macOS app menu "About OmniRoute") shows the credit.
 *
 * The copyright holder in `build.copyright` is deliberately NOT asserted to be
 * the creator: it stays "OmniRoute".
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const electronDir = join(import.meta.dirname, "../../electron");
const CREATOR_NAME = "Diego Souza";
const CREATOR_URL = "https://github.com/diegosouzapw";

describe("Electron desktop app creator credit", () => {
  const pkg = JSON.parse(readFileSync(join(electronDir, "package.json"), "utf8"));

  it("names the creator as author, links the profile and keeps the maintainer email", () => {
    assert.deepEqual(pkg.author, {
      name: CREATOR_NAME,
      email: "support@omniroute.online",
      url: CREATOR_URL,
    });
  });

  it("keeps OmniRoute as copyright holder with the first-release year", () => {
    assert.equal(pkg.build?.copyright, "Copyright © 2026 OmniRoute");
  });

  it("sets the About panel credits to the creator credit", () => {
    const mainSrc = readFileSync(join(electronDir, "main.js"), "utf8");
    assert.match(mainSrc, /app\.setAboutPanelOptions\(/);
    assert.ok(
      mainSrc.includes(`Created by ${CREATOR_NAME} (${CREATOR_URL})`),
      "main.js must pass the 'Created by Diego Souza (profile URL)' credit to the About panel"
    );
  });
});
