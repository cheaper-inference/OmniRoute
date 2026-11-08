"use client";

import { useState, useEffect, useCallback, use } from "react";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Card, Button } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

interface ConfigField {
  type: string;
  default?: unknown;
  min?: number;
  max?: number;
  enum?: string[];
  description?: string;
}

interface PluginConfig {
  name: string;
  config: Record<string, unknown>;
  configSchema: Record<string, ConfigField>;
}

export default function PluginConfigPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { addNotification } = useNotificationStore();
  const t = useTranslations("plugins");
  const [plugin, setPlugin] = useState<PluginConfig | null>(null);
  const [config, setConfig] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch(`/api/plugins/${name}/config`);
      if (res.ok) {
        const data = await res.json();
        setPlugin(data);
        setConfig(data.config || {});
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    void (async () => {
      await fetchConfig();
    })();
  }, [fetchConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/plugins/${name}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      if (res.ok) {
        addNotification({ type: "success", message: t("configurationSaved") });
      } else {
        addNotification({ type: "error", message: t("saveConfigurationFailed") });
      }
    } catch {
      addNotification({ type: "error", message: t("saveConfigurationFailed") });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="p-6">{t("loading")}</div>;
  if (!plugin) return <div className="p-6">{t("pluginNotFound")}</div>;

  const schemaKeys = Object.keys(plugin.configSchema || {});

  return (
    <div className="space-y-6 p-6">
      <PageHeader compact title={t("configure", { name })} />

      {schemaKeys.length === 0 ? (
        <Card padding="sm">
          <p className="text-text-muted">{t("noConfigSettings")}</p>
        </Card>
      ) : (
        <Card padding="sm" className="space-y-4">
          {schemaKeys.map((key) => {
            const field = plugin.configSchema[key];
            const value = config[key] ?? field.default ?? "";

            return (
              <div key={key}>
                {field.type === "boolean" ? (
                  <Checkbox
                    checked={!!value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                    label={
                      <>
                        {key}
                        {field.description && (
                          <span className="ml-2 text-xs text-text-muted">{field.description}</span>
                        )}
                      </>
                    }
                  />
                ) : field.enum ? (
                  <Select
                    label={key}
                    hint={field.description || undefined}
                    value={String(value)}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    {field.enum.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                ) : field.type === "number" ? (
                  <Input
                    label={key}
                    hint={field.description || undefined}
                    type="number"
                    value={Number(value)}
                    min={field.min}
                    max={field.max}
                    onChange={(e) => handleChange(key, Number(e.target.value))}
                  />
                ) : (
                  <Input
                    label={key}
                    hint={field.description || undefined}
                    type="text"
                    value={String(value)}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </div>
            );
          })}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? t("saving") : t("saveConfiguration")}
          </Button>
        </Card>
      )}
    </div>
  );
}
