"use client";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";
import { Checkbox as KitCheckbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import Input from "../Input";
import Select from "../Select";

export interface EngineConfigFormProps {
  schema: EngineConfigField[];
  value: Record<string, unknown>;
  // Called with one field at a time, so the caller can apply it to its latest state.
  onChange: (key: string, value: unknown) => void;
}

export function EngineConfigForm({ schema, value, onChange: set }: EngineConfigFormProps) {
  return (
    <div className="flex flex-col gap-4">
      {schema.map((f) => {
        const v = value[f.key] ?? f.defaultValue;
        if (f.type === "boolean") {
          return (
            <KitCheckbox
              key={f.key}
              label={f.label}
              description={f.description || undefined}
              checked={!!v}
              onChange={(e) => set(f.key, e.target.checked)}
            />
          );
        }
        if (f.type === "multiselect") {
          return (
            <CheckboxGroup key={f.key} label={f.label} description={f.description || undefined}>
              {(f.options ?? []).map((o) => (
                <KitCheckbox
                  key={o.value}
                  label={o.label}
                  checked={Array.isArray(v) && (v as string[]).includes(o.value)}
                  onChange={(e) => {
                    const arr = Array.isArray(v) ? [...(v as string[])] : [];
                    set(
                      f.key,
                      e.target.checked ? [...arr, o.value] : arr.filter((x) => x !== o.value)
                    );
                  }}
                />
              ))}
            </CheckboxGroup>
          );
        }
        if (f.type === "number") {
          return (
            <Input
              key={f.key}
              type="number"
              label={f.label}
              hint={f.description || undefined}
              // NaN (an emptied field, "not set") renders as an empty input, never as 0;
              // overflow (Infinity) also renders empty and surfaces through the save error.
              value={typeof v === "number" && Number.isFinite(v) ? v : ""}
              placeholder={f.defaultValue != null ? String(f.defaultValue) : ""}
              min={f.min}
              max={f.max}
              // Fractional settings (e.g. CCR retrievalRampFactor 1.5) must not fail
              // the browser's step validation, whose default step is 1.
              step="any"
              onChange={(e) => {
                // A browser reports badInput with an empty value for unparseable entries
                // ("1e", "1,5" in a comma-decimal locale): keep the last valid value rather
                // than mapping the entry to the unset sentinel.
                if (e.target.value === "" && e.target.validity.badInput) return;
                set(f.key, e.target.value === "" ? Number.NaN : Number(e.target.value));
              }}
            />
          );
        }
        if (f.type === "string") {
          return (
            <Input
              key={f.key}
              type="text"
              label={f.label}
              hint={f.description || undefined}
              value={(v as string) ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
            />
          );
        }
        if (f.type === "select") {
          return (
            <Select
              key={f.key}
              label={f.label}
              hint={f.description || undefined}
              value={v as string}
              onChange={(e) => set(f.key, e.target.value)}
            >
              {(f.options ?? []).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          );
        }
        return null;
      })}
    </div>
  );
}

export default EngineConfigForm;
