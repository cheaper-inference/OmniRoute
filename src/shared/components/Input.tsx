"use client";

import { forwardRef, useCallback, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Input as KitInput } from "@omniroute/ui-kit/input";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  /** Material Symbols name, rendered as a leading icon via <Icon>. */
  icon?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    hint,
    icon,
    disabled = false,
    required = false,
    className,
    inputClassName,
    id: externalId,
    onKeyDown: externalOnKeyDown,
    onKeyUp: externalOnKeyUp,
    onFocus,
    onBlur,
    ...props
  },
  ref
) {
  const t = useTranslations("common");
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;
  const capsLockId = `${inputId}-capslock`;
  const isPassword = type === "password";
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const detectCapsLock = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isPassword) {
        setCapsLockOn(e.getModifierState("CapsLock"));
      }
    },
    [isPassword]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      detectCapsLock(e);
      externalOnKeyDown?.(e);
    },
    [detectCapsLock, externalOnKeyDown]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      detectCapsLock(e);
      externalOnKeyUp?.(e);
    },
    [detectCapsLock, externalOnKeyUp]
  );

  const showCapsLock = isPassword && capsLockOn && inputFocused;
  const describedBy =
    [errorId, showCapsLock ? capsLockId : undefined, hintId].filter(Boolean).join(" ") || undefined;

  const control = (
    <KitInput
      ref={ref}
      id={inputId}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      error={Boolean(error)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      leadingIcon={icon ? <Icon name={icon} size={16} /> : undefined}
      className={inputClassName}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={(e) => {
        setInputFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setInputFocused(false);
        setCapsLockOn(false);
        onBlur?.(e);
      }}
      {...props}
    />
  );

  // The kit Field's asterisk is plain text inside the <label>, so it would become part of the
  // input's accessible name ("Email*"). Render the same `.ci-field__required` marker ourselves,
  // aria-hidden like the legacy one; the native `required` attribute carries the semantics.
  const fieldLabel =
    label != null && label !== "" ? (
      <>
        {label}
        {required && (
          <span className="ci-field__required" aria-hidden="true">
            *
          </span>
        )}
      </>
    ) : undefined;

  return (
    <Field
      htmlFor={inputId}
      label={fieldLabel}
      hint={hint && !error ? <span id={hintId}>{hint}</span> : undefined}
      error={
        error ? (
          <span id={errorId} role="alert">
            {error}
          </span>
        ) : undefined
      }
      className={cn("gap-1.5", className)}
    >
      {control}
      {showCapsLock && (
        <span id={capsLockId} role="status" className="text-xs text-warning">
          {t("capsLockOn")}
        </span>
      )}
    </Field>
  );
});

export default Input;
