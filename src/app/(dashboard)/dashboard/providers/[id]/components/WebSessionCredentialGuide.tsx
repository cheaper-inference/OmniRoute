"use client";

import Icon from "@/shared/components/Icon";

// Issue #3501 Phase 1c — extracted from the god-component.
// Shared by AddApiKeyModal and EditConnectionModal; imports only leaf modules
// (no cycle risk).

import type { WebSessionCredentialRequirement } from "../webSessionCredentials";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export interface WebSessionCredentialGuideProps {
  requirement: WebSessionCredentialRequirement;
  providerName: string;
  providerWebsite?: string;
  t: ProviderMessageTranslator;
}

export function getProviderWebsiteHost(providerWebsite?: string): string | null {
  if (!providerWebsite) {
    return null;
  }

  try {
    return new URL(providerWebsite).host;
  } catch {
    return providerWebsite;
  }
}

export default function WebSessionCredentialGuide({
  requirement,
  providerName,
  providerWebsite,
  t,
}: WebSessionCredentialGuideProps) {
  const providerWebsiteHost = getProviderWebsiteHost(providerWebsite);

  if (requirement.kind === "none") {
    return (
      <div className="rounded-lg border border-success/25 bg-success/10 px-3 py-3 text-sm text-text-muted">
        <div className="flex items-start gap-2">
          <Icon name="check_circle" size={18} className="mt-0.5 text-success" />
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webNoAuthGuideTitle", "No credential required")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webNoAuthGuideBody",
                "{provider} does not need an API key or cookie. Save the connection to use its free web endpoint.",
                { provider: providerName }
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const requiredCredentialKey =
    requirement.kind === "token" ? "webTokenRequiredCredential" : "webCookieRequiredCredential";
  const requiredCredentialFallback =
    requirement.kind === "token" ? "Required token: {credential}" : "Required cookie: {credential}";
  const guideSteps = requirement.guideSteps;

  return (
    <div className="rounded-lg border border-chart-3/25 bg-chart-3/10 px-3 py-3 text-sm text-text-muted">
      <div className="flex items-start gap-2">
        <Icon name="cookie" size={18} className="mt-0.5 text-chart-3" />
        <div className="space-y-2">
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webSessionGuideTitle", "How to get the session credential")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webSessionGuideIntro",
                "{provider} uses a browser web session instead of an API key.",
                { provider: providerName }
              )}
            </p>
          </div>
          <p className="font-medium text-text-main">
            {providerText(t, requiredCredentialKey, requiredCredentialFallback, {
              credential: requirement.credentialName,
            })}
          </p>
          {guideSteps ? (
            <ol className="list-decimal space-y-1 pl-5">
              {guideSteps.map((step, index) => (
                <li key={step}>
                  {step}
                  {index === 0 && providerWebsite && providerWebsiteHost && (
                    <a
                      href={providerWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {providerText(t, "webSessionGuideOpenProvider", "Open {host}", {
                        host: providerWebsiteHost,
                      })}
                      <Icon name="open_in_new" size={14} />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                {providerText(t, "webSessionGuideStep1", "Sign in to {provider} in your browser.", {
                  provider: providerName,
                })}
                {providerWebsite && providerWebsiteHost && (
                  <a
                    href={providerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    {providerText(t, "webSessionGuideOpenProvider", "Open {host}", {
                      host: providerWebsiteHost,
                    })}
                    <Icon name="open_in_new" size={14} />
                  </a>
                )}
              </li>
              <li>
                {providerText(
                  t,
                  "webSessionGuideStep2Fast",
                  "Fast path: install the Cookie Editor extension (chromewebstore.google.com → Cookie Editor), open it on the {provider} tab, find {credential} (select all numbered chunks if split), and click Export → Copy with the export format set to “Cookie header”.",
                  { provider: providerName, credential: requirement.credentialName }
                )}
              </li>
              <li>
                {providerText(
                  t,
                  "webSessionGuideStep3Manual",
                  "Manual path: open the browser developer tools (F12 → Network), refresh the page, open an authenticated request, and copy the Cookie header value from Request Headers — omit the Cookie: prefix."
                )}
              </li>
              <li>
                {providerText(
                  t,
                  "webSessionGuideStep4",
                  "Paste it here and check the connection. If it stops working, sign in again and replace it with a fresh value."
                )}
              </li>
            </ol>
          )}
          <p className="text-xs text-warning">
            {requirement.guideNote ??
              providerText(
                t,
                "webSessionSecurityHint",
                "Treat this like a password: it may access your signed-in web account until it expires or is revoked."
              )}
          </p>
        </div>
      </div>
    </div>
  );
}
