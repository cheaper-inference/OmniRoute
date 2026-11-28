import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it } from "vitest";
import StarInviteCard from "@/shared/components/StarInviteCard";
import messages from "@/i18n/messages/en.json";

function renderInvite() {
  return render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ starInvite: messages.starInvite }}
    >
      <StarInviteCard />
    </NextIntlClientProvider>
  );
}

afterEach(() => localStorage.clear());

it("links directly to the repository and remembers dismissal", async () => {
  const view = renderInvite();
  const name = "Like it? Star us on GitHub";
  const link = screen.getByRole("link", { name });
  expect(link.getAttribute("href")).toBe("https://github.com/cheaper-inference/OmniRoute");
  expect(link.getAttribute("target")).toBe("_blank");
  expect(link.getAttribute("rel")?.split(/\s+/)).toEqual(
    expect.arrayContaining(["noopener", "noreferrer"])
  );
  expect(screen.getByText("Everything here is free. No paywall.")).toBeTruthy();
  expect(screen.queryByText("Optional. Nothing in OmniRoute depends on it.")).toBeNull();

  await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
  expect(screen.queryByRole("link", { name })).toBeNull();
  expect(localStorage.getItem("omniroute-star-invite-dismissed-v1")).toBe("1");

  view.unmount();
  renderInvite();
  expect(screen.queryByRole("link", { name })).toBeNull();
});
