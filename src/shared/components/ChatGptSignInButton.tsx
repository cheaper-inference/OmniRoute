"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Button from "./Button";
import ChatGptLogo from "./ChatGptLogo";

type Props = {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  busy?: boolean;
  opensDialog?: boolean;
  intent?: "signin" | "continue";
};

// Official SIWC wording and logo: https://developers.openai.com/siwc/website
// Rendered as the kit primary button (KEA-7886); the inline logo follows the button ink, so the
// same markup works under every palette and theme.
export default function ChatGptSignInButton({
  href,
  onClick,
  disabled,
  busy,
  opensDialog,
  intent = "signin",
}: Props) {
  const t = useTranslations("chatgptSignIn");
  const content = (
    <>
      <ChatGptLogo className="shrink-0" />
      <span>{t(intent === "continue" ? "continue" : "signIn")}</span>
    </>
  );
  if (href) {
    return (
      <a
        className={buttonVariants({ size: "lg", className: "max-w-full" })}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }
  return (
    <Button
      size="lg"
      className="max-w-full"
      onClick={onClick}
      disabled={disabled}
      loading={busy}
      aria-haspopup={opensDialog ? "dialog" : undefined}
    >
      {content}
    </Button>
  );
}
