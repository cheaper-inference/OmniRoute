// Webpack loader for src/i18n/messages/*.json (rule in next.config.mjs). The
// catalogs are bundled as raw text (`asset/source`) and parsed at runtime by
// src/i18n/request.ts. Parsing here keeps a malformed catalog a build error,
// and re-serializing drops the pretty-print whitespace from the server chunks.
module.exports = function localeMessagesLoader(source) {
  return JSON.stringify(JSON.parse(source));
};
