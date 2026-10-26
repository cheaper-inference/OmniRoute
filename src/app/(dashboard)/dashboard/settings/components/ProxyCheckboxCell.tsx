"use client";

import { TableCell } from "@omniroute/ui-kit/table";
import { Checkbox } from "@/shared/components";

interface ProxyCheckboxCellProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function ProxyCheckboxCell({ checked, onChange, label }: ProxyCheckboxCellProps) {
  return (
    <TableCell className="w-8">
      <Checkbox checked={checked} onChange={onChange} aria-label={label} />
    </TableCell>
  );
}
