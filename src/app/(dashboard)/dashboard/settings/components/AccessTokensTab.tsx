"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useFormatter, useTranslations } from "next-intl";
import CodePreview from "@/shared/components/CodePreview";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { TableLoadingState } from "@omniroute/ui-kit/table-loading";
import {
  Card,
  Button,
  Input,
  Select,
  Badge,
  ConfirmModal,
  EmptyState,
  Modal,
} from "@/shared/components";
import { ACCESS_TOKEN_NAME_MAX_LENGTH } from "@/shared/constants/formLimits";

interface AccessTokenRow {
  id: string;
  name: string;
  scope: "read" | "write" | "admin";
  tokenPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
}

const SCOPE_VARIANT: Record<string, "info" | "warning" | "error" | "default"> = {
  read: "info",
  write: "warning",
  admin: "error",
};

async function fetchTokens(): Promise<AccessTokenRow[]> {
  const res = await fetch("/api/cli/tokens");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.tokens) ? data.tokens : [];
}

export default function AccessTokensTab() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const tv = useTranslations("formValidation");
  const nameRef = useRef<HTMLInputElement>(null);
  const format = useFormatter();
  const scopeLabels = {
    read: t("accessTokensScopeReadLabel"),
    write: t("accessTokensScopeWriteLabel"),
    admin: t("accessTokensScopeAdminLabel"),
  };
  const [tokens, setTokens] = useState<AccessTokenRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [scope, setScope] = useState("read");
  const [expires, setExpires] = useState("");
  const [creating, setCreating] = useState(false);
  // Set by a refused Create: an untouched form is not flagged for being empty.
  const [showNameRequired, setShowNameRequired] = useState(false);
  const [newSecret, setNewSecret] = useState<string | null>(null);
  // Name + scope of the token just created, shown as the secret preview's header.
  const [newSecretMeta, setNewSecretMeta] = useState({ name: "", scope: "read" });

  const [revokeTarget, setRevokeTarget] = useState<AccessTokenRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTokens(await fetchTokens());
    } catch {
      setError(t("accessTokensLoadError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const tokens = await fetchTokens();
        if (!cancelled) setTokens(tokens);
      } catch {
        if (!cancelled) setError(t("accessTokensLoadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [t]);

  // The request carries the trimmed name, so that is what the server's limit is measured on.
  const trimmedName = name.trim();
  const nameTooLong = trimmedName.length > ACCESS_TOKEN_NAME_MAX_LENGTH;
  const nameField = t("accessTokensColName");
  const nameError = nameTooLong
    ? tv("maxLength", {
        field: nameField,
        max: ACCESS_TOKEN_NAME_MAX_LENGTH,
        count: trimmedName.length,
      })
    : showNameRequired && !trimmedName
      ? tv("required", { field: nameField })
      : undefined;

  const createToken = async () => {
    if (!trimmedName || nameTooLong) {
      // Create stays enabled: the click is what tells the user which field needs fixing.
      setShowNameRequired(true);
      nameRef.current?.focus();
      return;
    }
    setCreating(true);
    setError("");
    try {
      const body: Record<string, unknown> = { name: trimmedName, scope };
      const days = Number(expires);
      if (expires && Number.isFinite(days) && days > 0) body.expiresInDays = days;
      const res = await fetch("/api/cli/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // API diagnostics are server data; localize the UI context, not the diagnostic.
        const detail = data?.error?.message || data?.error;
        setError(
          `${t("accessTokensCreateError")} ${typeof detail === "string" ? detail : `HTTP ${res.status}`}`
        );
        return;
      }
      setNewSecretMeta({ name: trimmedName, scope });
      setNewSecret(data.token);
      setName("");
      setShowNameRequired(false);
      setExpires("");
      setScope("read");
      await load();
    } catch {
      setError(t("accessTokensCreateError"));
    } finally {
      setCreating(false);
    }
  };

  const confirmRevoke = async () => {
    if (!revokeTarget) return;
    const target = revokeTarget;
    setRevokeTarget(null);
    try {
      const res = await fetch(`/api/cli/tokens/${encodeURIComponent(target.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch {
      setError(t("accessTokensRevokeError"));
    }
  };

  const fmt = (iso: string | null) => {
    if (!iso) return "—";
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? "—"
      : format.dateTime(date, { dateStyle: "medium", timeStyle: "short" });
  };

  // After the secret dialog closes, the next thing to do is name another token: send focus to
  // the name field rather than leaving it on the dialog's opener ("Create").
  const dismissSecret = () => {
    setNewSecret(null);
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={t("accessTokensTitle")}
        description={t("accessTokensDescription")}
      />

      {/* Create */}
      <Card title={t("accessTokensCreateHeading")}>
        {/* Top-aligned so the message under Name does not push its input out of the row; the
            button drops by the height of a label (sm:mt-7) to sit level with the inputs. */}
        <div className="grid gap-3 sm:grid-cols-4 sm:items-start">
          <Input
            ref={nameRef}
            label={nameField}
            placeholder={t("accessTokensNamePlaceholder")}
            value={name}
            required
            error={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            native
            label={t("accessTokensColScope")}
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { value: "read", label: t("accessTokensScopeRead") },
              { value: "write", label: t("accessTokensScopeWrite") },
              { value: "admin", label: t("accessTokensScopeAdmin") },
            ]}
          />
          <Input
            type="number"
            min={1}
            label={t("accessTokensColExpires")}
            placeholder={t("accessTokensExpiresPlaceholder")}
            value={expires}
            onChange={(e) => setExpires(e.target.value)}
          />
          <Button className="sm:mt-7" onClick={createToken} disabled={creating}>
            {creating ? t("accessTokensCreating") : t("accessTokensCreate")}
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={Boolean(newSecret)}
        onClose={dismissSecret}
        title={t("accessTokensTitle")}
        size="lg"
        closeOnOverlay={false}
        showCloseButton={false}
        footer={
          <Button variant="secondary" onClick={dismissSecret}>
            {t("accessTokensDismiss")}
          </Button>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text-main">{t("accessTokensCopyNow")}</p>
          <CodePreview
            variant="surface"
            showLineNumbers={false}
            filename={newSecretMeta.name || t("accessTokensTitle")}
            // A token has no programming language: the scope goes in the metadata slot and
            // the code region is named by the token itself (not "<scope> code").
            language={null}
            metadata={scopeLabels[newSecretMeta.scope] || newSecretMeta.scope}
            codeLabel={newSecretMeta.name || t("accessTokensTitle")}
            code={newSecret ?? ""}
            copyLabel={t("accessTokensCopy")}
            copiedLabel={t("accessTokensCopied")}
          />
        </div>
      </Modal>

      {error && (
        <div
          role="alert"
          className="rounded-control border border-error/40 bg-error-bg px-4 py-3 text-sm text-error"
        >
          {error}
        </div>
      )}

      {/* List */}
      <Card title={t("accessTokensExisting")}>
        {loading ? (
          <TableLoadingState label={tc("loading")} />
        ) : tokens.length === 0 ? (
          <EmptyState icon="key" title={t("accessTokensEmpty")} className="py-6" />
        ) : (
          <Table
            scrollbarLabel={t("accessTokensExisting")}
            scrollLabel={t("accessTokensExisting")}
            containerClassName="rounded-none border-0"
          >
            <TableHeader>
              <TableRow>
                <TableHead>{t("accessTokensColName")}</TableHead>
                <TableHead>{t("accessTokensColScope")}</TableHead>
                <TableHead>{t("accessTokensColPrefix")}</TableHead>
                <TableHead>{t("accessTokensColStatus")}</TableHead>
                <TableHead>{t("accessTokensColLastUsed")}</TableHead>
                <TableHead>{t("accessTokensColExpires")}</TableHead>
                <TableHead>
                  <span className="sr-only">{tc("actions")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((tk) => {
                const revoked = Boolean(tk.revokedAt);
                return (
                  <TableRow key={tk.id}>
                    <TableCell className="text-text-main">{tk.name}</TableCell>
                    <TableCell>
                      <Badge variant={SCOPE_VARIANT[tk.scope] || "default"}>
                        {scopeLabels[tk.scope] || tk.scope}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-muted">
                      {tk.tokenPrefix}
                    </TableCell>
                    <TableCell>
                      <Badge variant={revoked ? "default" : "success"}>
                        {revoked ? t("accessTokensStatusRevoked") : t("accessTokensStatusActive")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-muted">{fmt(tk.lastUsedAt)}</TableCell>
                    <TableCell className="text-text-muted">{fmt(tk.expiresAt)}</TableCell>
                    <TableCell className="text-end">
                      {!revoked && (
                        <Button variant="ghost" size="sm" onClick={() => setRevokeTarget(tk)}>
                          {t("accessTokensRevoke")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      <ConfirmModal
        isOpen={Boolean(revokeTarget)}
        onClose={() => setRevokeTarget(null)}
        onConfirm={confirmRevoke}
        title={t("accessTokensRevokeTitle")}
        message={t("accessTokensRevokeConfirm")}
        confirmText={t("accessTokensRevoke")}
        variant="danger"
      />
    </div>
  );
}
