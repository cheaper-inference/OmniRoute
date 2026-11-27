"use client";

import { useFormatter, useTranslations } from "next-intl";

import { LENDING_UNTIL_FORMAT, type LendingStatus } from "../lib/lendingForm";

interface LendingStatusLineProps {
  status: LendingStatus;
}

/** What is in force now, as the server reported it. A deadline is shown in the page's time zone. */
export default function LendingStatusLine({ status }: LendingStatusLineProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const until = (value: number) => format.dateTime(new Date(value), LENDING_UNTIL_FORMAT);

  let text: string;
  if (status.kind === "off") text = t("lendingStatusOff");
  else if (status.kind === "ended") {
    text = t("lendingStatusEnded", { percent: status.percent, until: until(status.until) });
  } else if (status.until === null) text = t("lendingStatusOpen", { percent: status.percent });
  else text = t("lendingStatusUntil", { percent: status.percent, until: until(status.until) });

  return <p className="break-words text-sm">{text}</p>;
}
