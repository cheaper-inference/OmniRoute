"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Card, Button, Input, Badge } from "@/shared/components";
import Icon from "@/shared/components/Icon";

const MODES = [
  { value: "disabled", labelKey: "ipModeDisabled", icon: "block" },
  { value: "blacklist", labelKey: "ipModeBlacklist", icon: "do_not_disturb" },
  { value: "whitelist", labelKey: "ipModeWhitelist", icon: "verified_user" },
  { value: "whitelist-priority", labelKey: "ipModeWhitelistPriority", icon: "priority_high" },
];

export default function IPFilterSection() {
  const [config, setConfig] = useState({
    enabled: false,
    mode: "blacklist",
    blacklist: [],
    whitelist: [],
    tempBans: [],
  });
  const [loading, setLoading] = useState(true);
  const [newIP, setNewIP] = useState("");
  const [listTarget, setListTarget] = useState("blacklist");
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/settings/ip-filter");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setConfig(data);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateConfig = async (updates) => {
    try {
      const res = await fetch("/api/settings/ip-filter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) setConfig(await res.json());
    } catch {}
  };

  const setMode = (mode) => {
    if (mode === "disabled") {
      updateConfig({ enabled: false });
    } else {
      updateConfig({ enabled: true, mode });
    }
  };

  const addIP = () => {
    if (!newIP.trim()) return;
    const key = listTarget === "blacklist" ? "addBlacklist" : "addWhitelist";
    updateConfig({ [key]: newIP.trim() });
    setNewIP("");
  };

  const removeIP = (ip, list) => {
    const key = list === "blacklist" ? "removeBlacklist" : "removeWhitelist";
    updateConfig({ [key]: ip });
  };

  const removeBan = (ip) => updateConfig({ removeBan: ip });

  const activeMode = !config.enabled ? "disabled" : config.mode;

  return (
    <Card title={t("ipAccessControl")} subtitle={t("ipAccessControlDesc")} icon="security">
      {/* Mode selector */}
      <RadioGroup
        aria-label={t("ipAccessControl")}
        value={activeMode}
        onValueChange={setMode}
        disabled={loading}
        className="mb-5"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {MODES.map((m) => (
            <RadioGroupItem
              key={m.value}
              card
              value={m.value}
              label={
                <span className="inline-flex items-center gap-1.5">
                  <Icon name={m.icon} size={18} className="text-text-muted" />
                  {t(m.labelKey)}
                </span>
              }
            />
          ))}
        </div>
      </RadioGroup>

      {config.enabled && (
        <div className="flex flex-col gap-4">
          {/* Add IP */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
            <div className="flex-1">
              <Input
                label={t("addIpAddress")}
                placeholder={t("ipAddressPlaceholder")}
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIP()}
              />
            </div>
            <div className="flex gap-1 pb-[2px]">
              <Button
                size="sm"
                variant={listTarget === "blacklist" ? "danger" : "secondary"}
                onClick={() => {
                  setListTarget("blacklist");
                  if (newIP.trim()) addIP();
                }}
              >
                {t("block")}
              </Button>
              <Button
                size="sm"
                variant={listTarget === "whitelist" ? "primary" : "secondary"}
                onClick={() => {
                  setListTarget("whitelist");
                  if (newIP.trim()) addIP();
                }}
              >
                {t("allow")}
              </Button>
            </div>
          </div>

          {/* Blacklist */}
          {config.blacklist.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("blocked", { count: config.blacklist.length })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {config.blacklist.map((ip) => (
                  <Badge key={ip} variant="error" className="gap-1 pr-1 font-mono">
                    {ip}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-5"
                      onClick={() => removeIP(ip, "blacklist")}
                      aria-label={`${t("remove")} ${ip}`}
                    >
                      <Icon name="close" size={14} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Whitelist */}
          {config.whitelist.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("allowed", { count: config.whitelist.length })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {config.whitelist.map((ip) => (
                  <Badge key={ip} variant="success" className="gap-1 pr-1 font-mono">
                    {ip}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-5"
                      onClick={() => removeIP(ip, "whitelist")}
                      aria-label={`${t("remove")} ${ip}`}
                    >
                      <Icon name="close" size={14} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Temp Bans */}
          {config.tempBans.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("temporaryBans", { count: config.tempBans.length })}
              </p>
              <div className="flex flex-col gap-1.5">
                {config.tempBans.map((ban) => (
                  <div
                    key={ban.ip}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg
                               bg-warning-bg border border-warning/30 text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="font-mono text-xs text-warning shrink-0">{ban.ip}</span>
                      <span className="text-xs text-text-muted truncate">— {ban.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted tabular-nums">
                        {t("minLeft", { min: Math.ceil(ban.remainingMs / 60000) })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeBan(ban.ip)}
                        aria-label={`${t("remove")} ${ban.ip}`}
                      >
                        <Icon name="delete" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
