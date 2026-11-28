import assert from "node:assert/strict";
import test from "node:test";

import { getRadarAdminUrl } from "../../src/lib/radar/links.ts";

test("getRadarAdminUrl: the private operations link is opt-in and validated", (t) => {
  const previous = process.env.RADAR_ADMIN_URL;
  t.after(() => {
    if (previous === undefined) delete process.env.RADAR_ADMIN_URL;
    else process.env.RADAR_ADMIN_URL = previous;
  });

  delete process.env.RADAR_ADMIN_URL;
  assert.equal(getRadarAdminUrl(), null);
  process.env.RADAR_ADMIN_URL = "https://radar-admin.example.com/";
  assert.equal(getRadarAdminUrl(), "https://radar-admin.example.com/");
  process.env.RADAR_ADMIN_URL = "https://user:password@radar-admin.example.com/";
  assert.equal(getRadarAdminUrl(), null);
});
