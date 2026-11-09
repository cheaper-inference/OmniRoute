"use client";

import Icon from "@/shared/components/Icon";

interface TabErrorListProps {
  errors?: readonly string[];
}

/**
 * Inline validation messages for one access-editor tab, styled like the save error the
 * old permissions modal showed above its fields.
 */
export default function TabErrorList({ errors }: TabErrorListProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div
      role="alert"
      className="flex flex-col gap-1.5 px-3 py-2 rounded-lg bg-error/10 border border-error/30"
    >
      {errors.map((message) => (
        <p key={message} className="flex items-center gap-2 text-sm text-error">
          <Icon name="error" className="text-error text-sm" />
          {message}
        </p>
      ))}
    </div>
  );
}
