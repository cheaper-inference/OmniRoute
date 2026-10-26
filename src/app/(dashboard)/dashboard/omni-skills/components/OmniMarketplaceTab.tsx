"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { Card } from "@/shared/components";
import type { SkillsProvider } from "@/lib/skills/providerSettings";

interface MarketplaceSkill {
  name: string;
  description: string;
  skillMdContent?: string;
  version?: string;
  sourceUrl?: string;
}

interface SkillsShSkill {
  id: string;
  skillId: string;
  name: string;
  installs: number;
  source: string;
}

interface OmniMarketplaceTabProps {
  skillsProvider: SkillsProvider;
  onRefreshSkills: () => Promise<void>;
}

export function OmniMarketplaceTab({
  skillsProvider,
  onRefreshSkills,
}: OmniMarketplaceTabProps): JSX.Element {
  const t = useTranslations("skills");
  const [mpQuery, setMpQuery] = useState("");
  const [mpResults, setMpResults] = useState<MarketplaceSkill[]>([]);
  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState("");
  const [mpInstallingId, setMpInstallingId] = useState<string | null>(null);
  const [shQuery, setShQuery] = useState("");
  const [shResults, setShResults] = useState<SkillsShSkill[]>([]);
  const [shLoading, setShLoading] = useState(false);
  const [shError, setShError] = useState("");
  const [shInstallingId, setShInstallingId] = useState<string | null>(null);

  const searchMarketplace = async () => {
    setMpLoading(true);
    setMpError("");
    setMpResults([]);
    try {
      const res = await fetch(`/api/skills/marketplace?q=${encodeURIComponent(mpQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        setMpError((data as { error?: string }).error || t("marketplaceError"));
      } else {
        setMpResults(
          Array.isArray(data) ? data : (data as { skills?: MarketplaceSkill[] }).skills || []
        );
      }
    } catch (err) {
      setMpError(err instanceof Error ? err.message : t("marketplaceError"));
    } finally {
      setMpLoading(false);
    }
  };

  const installFromMarketplace = async (skill: MarketplaceSkill) => {
    setMpInstallingId(skill.name);
    try {
      const res = await fetch("/api/skills/marketplace/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skill.name,
          description: skill.description,
          skillMdContent: skill.skillMdContent || skill.description,
          version: skill.version || "1.0.0",
          sourceUrl: skill.sourceUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && (data as { success?: boolean }).success) {
        await onRefreshSkills();
        setMpInstallingId(null);
      } else {
        setMpError((data as { error?: string }).error || t("installError"));
        setMpInstallingId(null);
      }
    } catch (err) {
      setMpError(err instanceof Error ? err.message : t("installError"));
      setMpInstallingId(null);
    }
  };

  const searchSkillsSh = async () => {
    setShLoading(true);
    setShError("");
    setShResults([]);
    try {
      const res = await fetch(`/api/skills/skillssh?q=${encodeURIComponent(shQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        setShError((data as { error?: string }).error || t("marketplaceError"));
      } else {
        setShResults((data as { skills?: SkillsShSkill[] }).skills || []);
      }
    } catch (err) {
      setShError(err instanceof Error ? err.message : t("marketplaceError"));
    } finally {
      setShLoading(false);
    }
  };

  const installFromSkillsSh = async (skill: SkillsShSkill) => {
    setShInstallingId(skill.id);
    try {
      const res = await fetch("/api/skills/skillssh/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skill.name,
          description: `Installed from skills.sh (${skill.source})`,
          source: skill.source,
          skillId: skill.skillId,
        }),
      });
      const data = await res.json();
      if (res.ok && (data as { success?: boolean }).success) {
        await onRefreshSkills();
        setShInstallingId(null);
      } else {
        setShError((data as { error?: string }).error || t("installError"));
        setShInstallingId(null);
      }
    } catch (err) {
      setShError(err instanceof Error ? err.message : t("installError"));
      setShInstallingId(null);
    }
  };

  return (
    <div className="grid gap-4">
      <Card>
        <h3 className="font-semibold mb-2">{t("skillsMarketplace")}</h3>
        <p className="text-sm text-text-muted mb-4">
          {t("activeProvider")}{" "}
          <span className="font-medium">
            {skillsProvider === "skillsmp" ? "SkillsMP" : "skills.sh"}
          </span>
          . {t("changeInSettings")}
        </p>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            icon="search"
            value={skillsProvider === "skillsmp" ? mpQuery : shQuery}
            onChange={(e) =>
              skillsProvider === "skillsmp"
                ? setMpQuery(e.target.value)
                : setShQuery(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (skillsProvider === "skillsmp" ? searchMarketplace() : searchSkillsSh())
            }
            placeholder={t("searchMarketplacePlaceholder")}
            aria-label={t("searchMarketplacePlaceholder")}
            className="flex-1"
          />
          <Button
            onClick={() => (skillsProvider === "skillsmp" ? searchMarketplace() : searchSkillsSh())}
            disabled={skillsProvider === "skillsmp" ? mpLoading : shLoading}
          >
            {skillsProvider === "skillsmp"
              ? mpLoading
                ? t("searching")
                : t("searchMarketplace")
              : shLoading
                ? t("searching")
                : t("searchMarketplace")}
          </Button>
        </div>
        {(skillsProvider === "skillsmp" ? mpError : shError) && (
          <div className="p-3 rounded-lg bg-error/10 text-error text-sm mb-4">
            {skillsProvider === "skillsmp" ? mpError : shError}
          </div>
        )}
      </Card>

      {skillsProvider === "skillsmp" && mpResults.length > 0 && (
        <div className="grid gap-3">
          {mpResults.map((skill) => (
            <Card key={skill.name}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{skill.name}</h4>
                  <p className="text-sm text-text-muted mt-1">{skill.description}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => installFromMarketplace(skill)}
                  disabled={mpInstallingId === skill.name}
                >
                  {mpInstallingId === skill.name ? t("installing") : t("installSkillButton")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {skillsProvider === "skillssh" && shResults.length > 0 && (
        <div className="grid gap-3">
          {shResults.map((skill) => (
            <Card key={skill.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{skill.name}</h4>
                  <p className="text-sm text-text-muted mt-1">
                    {skill.source} · {skill.installs.toLocaleString()} {t("installs")}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => installFromSkillsSh(skill)}
                  disabled={shInstallingId === skill.id}
                >
                  {shInstallingId === skill.id ? t("installing") : t("installSkillButton")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {skillsProvider === "skillsmp" && !mpLoading && mpResults.length === 0 && !mpError && (
        <Card>
          <div className="text-center py-8 text-text-muted">{t("marketplaceSkillsMpHint")}</div>
        </Card>
      )}
      {skillsProvider === "skillssh" && !shLoading && shResults.length === 0 && !shError && (
        <Card>
          <div className="text-center py-8 text-text-muted">{t("marketplaceSkillsShHint")}</div>
        </Card>
      )}
    </div>
  );
}

export default OmniMarketplaceTab;
