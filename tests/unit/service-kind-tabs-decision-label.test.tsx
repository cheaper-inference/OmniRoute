import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { ServiceKindTabs } from "../../src/app/(dashboard)/dashboard/media-providers/components/ServiceKindTabs";
import enMessages from "../../src/i18n/messages/en.json";

// The decision kind has no `media.kinds.decision` message in any locale; its tab must
// reuse the already-translated System One category title instead of a raw key.
describe("ServiceKindTabs decision label", () => {
  it("labels the decision tab with the translated System One category", () => {
    const errors: string[] = [];
    const html = renderToStaticMarkup(
      <NextIntlClientProvider
        locale="en"
        timeZone="UTC"
        messages={enMessages as unknown as Record<string, unknown>}
        onError={(error) => errors.push(error.message)}
      >
        <ServiceKindTabs
          kinds={["embedding", "decision"]}
          activeKind="decision"
          onSelect={() => {}}
        />
      </NextIntlClientProvider>
    );
    expect(html).toContain(enMessages.endpoint.categorySystemOne);
    expect(html).toContain(enMessages.media.kinds.embedding);
    expect(html).not.toContain("kinds.decision");
    expect(errors).toEqual([]);
  });
});
