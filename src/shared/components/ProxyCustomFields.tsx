"use client";

import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import Input from "./Input";
import Select from "./Select";
import SegmentedControl from "./SegmentedControl";
import Button from "./Button";
import Icon from "./Icon";

export function isManagedProxySource(value: string): boolean {
  return (
    /^(?!https?:\/\/|socks5?:\/\/)[a-z0-9]+:\/\//i.test(value.trim()) ||
    value.trim().startsWith("{")
  );
}

type Props = {
  proxyTypes: Array<{ value: string; label: string }>;
  proxyType: string;
  setProxyType: (v: string) => void;
  host: string;
  setHost: (v: string) => void;
  port: string;
  setPort: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  core: string;
  setCore: (v: string) => void;
  getDefaultPort: (type: string) => string;
};

export default function ProxyCustomFields(p: Props) {
  const t = useTranslations("proxyConfigModal");
  const managed = isManagedProxySource(p.host);
  return (
    <>
      {!managed && (
        <Field label={t("proxyType")}>
          <SegmentedControl
            aria-label={t("proxyType")}
            className="w-full"
            value={p.proxyType}
            onChange={p.setProxyType}
            options={p.proxyTypes}
          />
        </Field>
      )}
      <div className="grid grid-cols-3 gap-3">
        <div className={managed ? "col-span-3" : "col-span-2"}>
          <Input
            label={t("host")}
            id="proxy-custom-host"
            type="text"
            value={p.host}
            onChange={(e) => p.setHost(e.target.value)}
            placeholder={t("hostPlaceholder")}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {!managed && (
          <div>
            <Input
              label={t("port")}
              id="proxy-custom-port"
              type="text"
              value={p.port}
              onChange={(e) => p.setPort(e.target.value)}
              placeholder={p.getDefaultPort(p.proxyType)}
            />
          </div>
        )}
      </div>
      {managed ? (
        <div>
          <Select
            label="Proxy core"
            id="proxy-managed-core"
            value={p.core}
            onChange={(e) => p.setCore(e.target.value)}
          >
            <option value="">Select a core</option>
            <option value="singbox">sing-box</option>
            <option value="xray">Xray</option>
          </Select>
          <p className="text-xs text-text-muted mt-2">
            Save downloads and verifies the official core if needed, checks the configuration, then
            activates this proxy. Typing does not install anything.
          </p>
        </div>
      ) : (
        <ProxyAuthFields p={p} />
      )}
    </>
  );
}

function ProxyAuthFields({ p }: { p: Props }) {
  const t = useTranslations("proxyConfigModal");
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => p.setShowAuth(!p.showAuth)}
        aria-expanded={p.showAuth}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary"
      >
        <Icon name={p.showAuth ? "expand_less" : "expand_more"} size={16} />
        {t("authOptional")}
      </Button>
      {p.showAuth && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Input
              label={t("username")}
              id="proxy-custom-user"
              value={p.username}
              onChange={(e) => p.setUsername(e.target.value)}
              placeholder={t("usernamePlaceholder")}
            />
          </div>
          <div>
            <Input
              label={t("password")}
              id="proxy-custom-password"
              type="password"
              value={p.password}
              onChange={(e) => p.setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
