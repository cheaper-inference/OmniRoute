// @ts-check
// One-off override to measure test REDUNDANCY (R1, Quality Gate v2 / Fase 9 T5). It reuses
// stryker.conf.mjs but (a) turns bail off -> killedBy records EVERY test that kills each
// mutant (under bail, killedBy lists only the FIRST killer, so 🟠 redundant is underestimated
// and 🟢 unique overestimated — see the caveat in scripts/quality/mutation-radiography.mjs);
// (b) turns incremental off -> a clean measurement that never reuses partial killedBy from bail
// runs. NOT used by the nightly (nightly-mutation.yml keeps bail + incremental); it only runs
// via .github/workflows/mutation-redundancy.yml (workflow_dispatch). Feed the resulting
// mutation.json to 'mutation-radiography.mjs --candidates' (the full killedBy makes 🟠
// redundant ACCURATE).
//
// This replaces stryker.disablebail.json, whose `"extends": "./stryker.conf.json"` Stryker 10
// does not implement (it only warns `Unknown stryker config option "extends"`), so that run got
// none of the base config. Spreading the imported base is the supported way to extend it.

import base from "./stryker.conf.mjs";

/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
const config = {
  ...base,
  disableBail: true,
  incremental: false,
};

export default config;
