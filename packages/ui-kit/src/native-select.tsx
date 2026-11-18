import { forwardRef } from "react";
import type { CSSProperties, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./lib/utils";

export type NativeSelectSize = "xs" | "sm" | "md";

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "multiple"> {
  /** `md` matches `Select` and `Input` (40px, default); `sm` is 36px and `xs` 32px. */
  size?: NativeSelectSize;
  /** Danger border and ring; also sets `aria-invalid`. `aria-invalid` alone has the same effect. */
  error?: boolean;
  /** Applied to the wrapper that positions the chevron; the remaining props go to the `<select>`. */
  className?: string;
  /** Applied to the wrapper, like `className`. */
  style?: CSSProperties;
}

/**
 * The platform `<select>` on the field tokens, for mobile pickers, `<optgroup>` and very long
 * lists. Options are native `<option>` / `<optgroup>` children. The chevron sits at the inline
 * end, so it mirrors in right-to-left documents.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  { size = "md", error, className, style, ...props },
  ref,
) {
  const ariaInvalid = props["aria-invalid"];
  const callerInvalid = ariaInvalid === false || ariaInvalid === "false" ? undefined : ariaInvalid;
  const invalid = Boolean(error || callerInvalid);
  return (
    <span
      data-slot="native-select"
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={props.disabled || undefined}
      dir={props.dir}
      className={cn("ci-native-select", className)}
      style={style}
    >
      <select ref={ref} {...props} className="ci-native-select__control" aria-invalid={error ? true : callerInvalid} />
      <ChevronDown className="ci-native-select__icon" aria-hidden="true" focusable="false" />
    </span>
  );
});
