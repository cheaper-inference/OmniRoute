#!/usr/bin/env python3
import sys

print("Building quota patches locally...")

# 1. 30501.js -> 30501.patched.js
with open("30501.js") as f:
    c30501 = f.read()

# Add to USAGE_SUPPORTED_PROVIDERS array
target_prov_30501 = '"adobe-firefly","firefly",'
new_prov_30501 = '"adobe-firefly","firefly","googleflow-web","googleflow","gflow",'
assert target_prov_30501 in c30501, "target_prov_30501 not found"
c30501 = c30501.replace(target_prov_30501, new_prov_30501, 1)

# Add to switch(provider) in getUsageForProvider
target_switch_30501 = 'case"adobe-firefly":case"firefly":return await (0,q.SB)(f,e,g);'
new_switch_30501 = 'case"adobe-firefly":case"firefly":return await (0,q.SB)(f,e,g);case"googleflow-web":case"googleflow":case"gflow":case"flow":return await (async()=>{let m=await import("/app/patches/googleflow-web.bundle.mjs");return await m.getGoogleFlowUsage(f||e,g)})();'
assert target_switch_30501 in c30501, "target_switch_30501 not found"
c30501 = c30501.replace(target_switch_30501, new_switch_30501, 1)

with open("30501.patched.js", "w") as f:
    f.write(c30501)
print("30501.patched.js created successfully.")

# 2. 25651.js -> 25651.patched.js
with open("25651.js") as f:
    c25651 = f.read()

# Add to PROVIDER_LIMITS_APIKEY_PROVIDERS Set (aa)
target_aa_25651 = '"adobe-firefly","firefly",'
new_aa_25651 = '"adobe-firefly","firefly","googleflow-web","googleflow","gflow",'
assert target_aa_25651 in c25651, "target_aa_25651 not found"
c25651 = c25651.replace(target_aa_25651, new_aa_25651, 1)

# Patch D(a) (isSupportedUsageConnection) to allow web-session / cookie for googleflow
target_d_25651 = 'function D(a){return!!a?.provider&&("oauth"===a.authType?(0,n.sf)(a.provider,a):("apikey"===a.authType||"api_key"===a.authType)&&(!!aa.has(a.provider)||(0,n.sf)(a.provider,a)))}'
new_d_25651 = 'function D(a){return!!a?.provider&&("oauth"===a.authType?(0,n.sf)(a.provider,a):("apikey"===a.authType||"api_key"===a.authType)&&(!!aa.has(a.provider)||(0,n.sf)(a.provider,a))||("web-session"===a.authType||"cookie"===a.authType)&&("googleflow"===a.provider||"googleflow-web"===a.provider||(0,n.sf)(a.provider,a)))}'
assert target_d_25651 in c25651, "target_d_25651 not found"
c25651 = c25651.replace(target_d_25651, new_d_25651, 1)

# Patch C(a,b) (notifyProviderUsageRecorded) to trigger refresh for googleflow
target_c_25651 = 'function C(a,b){("antigravity"===a||"agy"===a)&&b&&function(a){'
new_c_25651 = 'function C(a,b){("antigravity"===a||"agy"===a||"googleflow"===a||"googleflow-web"===a)&&b&&function(a){'
assert target_c_25651 in c25651, "target_c_25651 not found"
c25651 = c25651.replace(target_c_25651, new_c_25651, 1)

with open("25651.patched.js", "w") as f:
    f.write(c25651)
print("25651.patched.js created successfully.")

# 3. quota_page.js -> quota_page.patched.js
with open("quota_page.js") as f:
    cqp = f.read()

# Allow web-session / cookie in connection filter
target_filter_qp = '("oauth"===e.authType||"apikey"===e.authType)'
new_filter_qp = '("oauth"===e.authType||"apikey"===e.authType||"web-session"===e.authType||"cookie"===e.authType)'
assert target_filter_qp in cqp, "target_filter_qp not found"
cqp = cqp.replace(target_filter_qp, new_filter_qp, 1)

# Add provider labels
target_label_qp = 'clinepass:"ClinePass"'
new_label_qp = 'clinepass:"ClinePass","googleflow-web":"Google Flow",googleflow:"Google Flow"'
assert target_label_qp in cqp, "target_label_qp not found"
cqp = cqp.replace(target_label_qp, new_label_qp, 1)

with open("quota_page.patched.js", "w") as f:
    f.write(cqp)
print("quota_page.patched.js created successfully.")

print("All patches built successfully!")
