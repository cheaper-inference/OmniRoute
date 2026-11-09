/**
 * Lightweight stand-ins for the `@/shared/components` form adapters (KEA-7886), for tests that
 * `vi.mock("@/shared/components")` instead of rendering the kit. Each stub keeps the adapter's
 * DOM contract the tests query — a real <button>/<input>/<select> carrying the caller's
 * title / aria-* / disabled / data-* attributes — without the kit, Radix or next-intl.
 *
 *   vi.mock("@/shared/components", async () => {
 *     const stubs = await import("../../helpers/sharedComponentStubs");
 *     return { ...stubs.formStubs, Badge: … };
 *   });
 */
import React, { forwardRef } from "react";

type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

// Adapter-only props that must not reach the DOM element.
function domProps<T>(props: AnyProps, drop: string[]): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!drop.includes(key)) out[key] = value;
  }
  return out as T;
}

const BUTTON_ONLY = ["variant", "size", "icon", "iconRight", "loading", "fullWidth"];
const Button = forwardRef<HTMLButtonElement, AnyProps>(function Button(props, ref) {
  const { children, loading, disabled } = props;
  return (
    <button
      ref={ref}
      type="button"
      {...domProps<React.ButtonHTMLAttributes<HTMLButtonElement>>(props, [
        ...BUTTON_ONLY,
        "children",
        "disabled",
      ])}
      disabled={Boolean(disabled) || Boolean(loading)}
    >
      {children as React.ReactNode}
    </button>
  );
});

const INPUT_ONLY = ["label", "hint", "error", "icon", "inputClassName"];
const Input = forwardRef<HTMLInputElement, AnyProps>(function Input(props, ref) {
  const input = (
    <input
      ref={ref}
      {...domProps<React.InputHTMLAttributes<HTMLInputElement>>(props, [...INPUT_ONLY, "children"])}
    />
  );
  return props.label ? (
    <label>
      <span>{props.label as React.ReactNode}</span>
      {input}
    </label>
  ) : (
    input
  );
});

const Checkbox = forwardRef<HTMLInputElement, AnyProps>(function Checkbox(props, ref) {
  const input = (
    <input
      ref={ref}
      type="checkbox"
      {...domProps<React.InputHTMLAttributes<HTMLInputElement>>(props, [
        "label",
        "children",
        "className",
      ])}
    />
  );
  return props.label ? (
    <label>
      {input}
      {props.label as React.ReactNode}
    </label>
  ) : (
    input
  );
});

const SELECT_ONLY = ["label", "hint", "error", "options", "selectClassName", "compact"];
function Select(props: AnyProps) {
  const options = props.options as Array<{ value: string; label: string }> | undefined;
  return (
    <select
      {...domProps<React.SelectHTMLAttributes<HTMLSelectElement>>(props, [
        ...SELECT_ONLY,
        "children",
      ])}
    >
      {options
        ? options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : (props.children as React.ReactNode)}
    </select>
  );
}

function FilterPills({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export const formStubs = { Button, Input, Checkbox, Select, FilterPills };
