"use client";

import { useTranslations } from "next-intl";
import {
  CodePreview as KitCodePreview,
  type CodePreviewProps,
} from "@omniroute/ui-kit/code-preview";

const plainText = (value: React.ReactNode) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined;

/**
 * The kit `CodePreview` with every text it draws or announces translated (`common`): the copy
 * button in its three states, the copy announcement, the copy error and the name of the code
 * region. A caller may still pass any of them.
 */
export default function CodePreview({
  copyLabel,
  copiedLabel,
  copyingLabel,
  copiedAnnouncement,
  copyErrorLabel,
  codeLabel,
  ...props
}: CodePreviewProps) {
  const t = useTranslations("common");
  const language = plainText(props.language);
  // "<language> code" for a snippet; a block with no language (a URL, a token) is named by
  // its title instead.
  const regionLabel = language
    ? t("codeRegionLabel", { language })
    : (plainText(props.filename) ?? t("code"));
  return (
    <KitCodePreview
      {...props}
      copyLabel={copyLabel ?? t("copy")}
      copiedLabel={copiedLabel ?? t("copied")}
      copyingLabel={copyingLabel ?? t("codeCopying")}
      copiedAnnouncement={copiedAnnouncement ?? t("codeCopiedAnnouncement")}
      copyErrorLabel={
        copyErrorLabel ?? (props.getCopyValue ? t("codeCopyErrorRetry") : t("codeCopyError"))
      }
      codeLabel={codeLabel ?? regionLabel}
    />
  );
}
