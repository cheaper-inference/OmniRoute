/** Configure only the opt-in production webpack cache; leave dev/defaults intact. */
export function configureWebpackBuildCache(config, { dev }, env = process.env) {
  // Next's production filesystem cache retains module entries in memory and
  // serializes a persistent pack. One-shot builders can explicitly forgo reuse.
  if (!dev && env.OMNIROUTE_BUILD_WEBPACK_CACHE === "0") config.cache = false;
  return config;
}
