"use client";

import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";

interface DeliveryStatusBadgeProps {
  status: string;
  httpStatus?: number | null;
}

export function DeliveryStatusBadge({ status, httpStatus }: DeliveryStatusBadgeProps) {
  const isSuccess = status === "success";
  return (
    <Badge
      variant={isSuccess ? "success" : "error"}
      icon={<Icon name={isSuccess ? "check_circle" : "error"} size={12} />}
    >
      {httpStatus ? httpStatus : isSuccess ? "OK" : "ERR"}
    </Badge>
  );
}
