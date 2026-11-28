# Family alias ask gate

This CLIProxyAPI request interceptor authorizes one host-proposed fallback.
It does not select or dispatch models. The default path is in-family. The
shared model/pricing map is supplied by the host; this plugin has no ladder.

A larger tier is more capable and is always blocked. Cross-family fallback
requires the header `x-open-design-cross-family: 1` exactly once. Every
fallback also requires Ask approval bound to the exact proposed model.
Otherwise the interceptor terminates with HTTP 409 and a visible message.
Initial requests pass unchanged. This change does not build, install, or
load the plugin, and it does not re-enable automatic model mapping.
