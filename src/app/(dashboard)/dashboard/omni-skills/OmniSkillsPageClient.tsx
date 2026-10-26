"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { Card } from "@/shared/components";
import { SkillsConceptCard } from "@/shared/components";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import Textarea from "@/shared/components/Textarea";
import type { SkillsProvider } from "@/lib/skills/providerSettings";
import { OmniSkillsList } from "./components/OmniSkillsList";
import { OmniExecutionsTab } from "./components/OmniExecutionsTab";
import { OmniSandboxTab } from "./components/OmniSandboxTab";
import { OmniMarketplaceTab } from "./components/OmniMarketplaceTab";
import type { OmniSkill } from "./components/OmniSkillCard";

interface Execution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

export function OmniSkillsPageClient(): JSX.Element {
  const [skills, setSkills] = useState<OmniSkill[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillsPage, setSkillsPage] = useState(1);
  const [skillsTotal, setSkillsTotal] = useState(0);
  const [skillsTotalPages, setSkillsTotalPages] = useState(1);
  const [popularDefaults, setPopularDefaults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState<"all" | "on" | "off" | "auto">("all");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const [execPage, setExecPage] = useState(1);
  const [execTotal, setExecTotal] = useState(0);
  const [execTotalPages, setExecTotalPages] = useState(1);

  const [activeTab, setActiveTab] = useState<"skills" | "executions" | "sandbox" | "marketplace">(
    "skills"
  );
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installJson, setInstallJson] = useState("");
  const [installStatus, setInstallStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [installing, setInstalling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [skillsProvider, setSkillsProvider] = useState<SkillsProvider>("skillsmp");

  const t = useTranslations("skills");
  const tSidebar = useTranslations("sidebar");
  // NOTE: commonT is intentionally unused here but retained for potential future use
  useTranslations("common");

  const fetchSkills = async (page: number) => {
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (modeFilter !== "all") params.set("mode", modeFilter);

    const res = await fetch(`/api/skills?${params.toString()}`).then((r) => r.json());
    setSkills((res as { data?: OmniSkill[] }).data || []);
    setSkillsTotal((res as { total?: number }).total || 0);
    setSkillsTotalPages((res as { totalPages?: number }).totalPages || 1);
    setPopularDefaults(
      Array.isArray((res as { popularDefaults?: string[] }).popularDefaults)
        ? (res as { popularDefaults: string[] }).popularDefaults
        : []
    );
  };

  const fetchExecutions = async (page: number) => {
    const res = await fetch(`/api/skills/executions?page=${page}&limit=20`).then((r) => r.json());
    setExecutions((res as { data?: Execution[] }).data || []);
    setExecTotal((res as { total?: number }).total || 0);
    setExecTotalPages((res as { totalPages?: number }).totalPages || 1);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/skills?page=1&limit=20").then((r) => r.json()),
      fetch("/api/skills/executions?page=1&limit=20").then((r) => r.json()),
      fetch("/api/settings").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([skillsData, executionsData, settingsData]) => {
        setSkills((skillsData as { data?: OmniSkill[] }).data || []);
        setSkillsTotal((skillsData as { total?: number }).total || 0);
        setSkillsTotalPages((skillsData as { totalPages?: number }).totalPages || 1);
        setPopularDefaults(
          Array.isArray((skillsData as { popularDefaults?: string[] }).popularDefaults)
            ? (skillsData as { popularDefaults: string[] }).popularDefaults
            : []
        );

        setExecutions((executionsData as { data?: Execution[] }).data || []);
        setExecTotal((executionsData as { total?: number }).total || 0);
        setExecTotalPages((executionsData as { totalPages?: number }).totalPages || 1);

        const sd = settingsData as { skillsProvider?: SkillsProvider } | null;
        if (sd?.skillsProvider === "skillsmp" || sd?.skillsProvider === "skillssh") {
          setSkillsProvider(sd.skillsProvider);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const refreshSkills = async () => {
    setSkillsPage(1);
    await fetchSkills(1);
  };

  const setSkillMode = async (skillId: string, mode: "on" | "off" | "auto") => {
    await fetch(`/api/skills/${skillId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    setSkills(skills.map((s) => (s.id === skillId ? { ...s, mode, enabled: mode !== "off" } : s)));
  };

  const deleteSkill = async (skillId: string) => {
    const res = await fetch(`/api/skills/${skillId}`, { method: "DELETE" });
    if (res.ok) {
      setSkills(skills.filter((s) => s.id !== skillId));
      if (selectedSkillId === skillId) setSelectedSkillId(null);
    }
  };

  const handleInstall = async () => {
    setInstalling(true);
    setInstallStatus(null);
    try {
      const manifest = JSON.parse(installJson) as Record<string, unknown>;
      const res = await fetch("/api/skills/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manifest),
      });
      const data = await res.json();
      if (res.ok && (data as { success?: boolean }).success) {
        setInstallStatus({
          type: "success",
          message: t("installSuccess", { id: (data as { id?: string }).id || "" }),
        });
        setInstallJson("");
        await refreshSkills();
      } else {
        setInstallStatus({
          type: "error",
          message:
            (data as { error?: string; message?: string }).error ||
            (data as { error?: string; message?: string }).message ||
            t("installError"),
        });
      }
    } catch (err) {
      setInstallStatus({
        type: "error",
        message: err instanceof Error ? err.message : t("invalidJson"),
      });
    } finally {
      setInstalling(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInstallJson((ev.target?.result as string) || "");
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">{t("loading")}...</div>
      </div>
    );
  }

  const enabledCount = skills.filter((s) => s.enabled).length;
  const execSuccessCount = executions.filter((e) => e.status === "success").length;
  const successRate =
    executions.length > 0 ? Math.round((execSuccessCount / executions.length) * 100) : 0;

  const tabs: { id: "skills" | "executions" | "sandbox" | "marketplace"; labelKey: string }[] = [
    { id: "skills", labelKey: "skillsTab" },
    { id: "executions", labelKey: "executionsTab" },
    { id: "sandbox", labelKey: "sandboxTab" },
    { id: "marketplace", labelKey: "marketplaceTab" },
  ];

  const closeInstallModal = () => {
    setShowInstallModal(false);
    setInstallStatus(null);
    setInstallJson("");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader
        compact
        title={tSidebar("omniSkills")}
        description={tSidebar("omniSkillsSubtitle")}
      />
      {/* Concept card */}
      <SkillsConceptCard variant="omni" />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("totalSkills")}</p>
          <p className="text-2xl font-bold text-text-main mt-1">{skillsTotal}</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("enabledSkills")}</p>
          <p className="text-2xl font-bold text-success mt-1">{enabledCount}</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("totalExecutions")}</p>
          <p className="text-2xl font-bold text-primary mt-1">{execTotal}</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("successRate")}</p>
          <p className="text-2xl font-bold text-warning mt-1">{successRate}%</p>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setShowInstallModal(true)}>{t("installSkillButton")}</Button>
      </div>

      {/* Tab bar — the panels below are rendered by the page (no TabsContent). */}
      <Tabs
        variant="underline"
        value={activeTab}
        onValueChange={(next) => setActiveTab(next as typeof activeTab)}
      >
        <TabsList aria-label={t("installSkillButton")}>
          {tabs.map(({ id, labelKey }) => (
            <TabsTrigger key={id} value={id} aria-controls={undefined}>
              {t(labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tab content */}
      {activeTab === "skills" && (
        <OmniSkillsList
          skills={skills}
          skillsTotal={skillsTotal}
          skillsPage={skillsPage}
          skillsTotalPages={skillsTotalPages}
          popularDefaults={popularDefaults}
          searchTerm={searchTerm}
          modeFilter={modeFilter}
          selectedSkillId={selectedSkillId}
          onSearchTermChange={setSearchTerm}
          onModeFilterChange={setModeFilter}
          onApplyFilters={() => {
            setSkillsPage(1);
            void fetchSkills(1);
          }}
          onPagePrev={() => {
            const p = Math.max(1, skillsPage - 1);
            setSkillsPage(p);
            void fetchSkills(p);
          }}
          onPageNext={() => {
            const p = Math.min(skillsTotalPages, skillsPage + 1);
            setSkillsPage(p);
            void fetchSkills(p);
          }}
          onSelectSkill={setSelectedSkillId}
          onSetMode={setSkillMode}
          onUninstall={deleteSkill}
        />
      )}

      {activeTab === "executions" && (
        <OmniExecutionsTab
          executions={executions}
          execPage={execPage}
          execTotalPages={execTotalPages}
          execTotal={execTotal}
          onPagePrev={() => {
            const p = Math.max(1, execPage - 1);
            setExecPage(p);
            void fetchExecutions(p);
          }}
          onPageNext={() => {
            const p = Math.min(execTotalPages, execPage + 1);
            setExecPage(p);
            void fetchExecutions(p);
          }}
        />
      )}

      {activeTab === "sandbox" && <OmniSandboxTab />}

      {activeTab === "marketplace" && (
        <OmniMarketplaceTab skillsProvider={skillsProvider} onRefreshSkills={refreshSkills} />
      )}

      {/* Install modal */}
      <Modal
        isOpen={showInstallModal}
        onClose={closeInstallModal}
        size="lg"
        title={t("installSkillModalTitle")}
      >
        <p className="text-sm text-text-muted mb-4">{t("installSkillModalDesc")}</p>
        <Textarea
          value={installJson}
          onChange={(e) => setInstallJson(e.target.value)}
          placeholder={t("installJsonPlaceholder")}
          aria-label={t("installSkillModalTitle")}
          className="h-48 resize-none font-mono text-sm"
        />
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {/* kit-exception: Native file picker for the JSON upload (driven by the button; adapters have none). */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            {t("uploadJson")}
          </Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={closeInstallModal}>
            {t("cancel")}
          </Button>
          <Button size="sm" onClick={handleInstall} disabled={installing || !installJson.trim()}>
            {installing ? t("installing") : t("installSkillButton")}
          </Button>
        </div>
        {installStatus && (
          <div
            className={`mt-3 p-3 rounded-lg text-sm ${
              installStatus.type === "success"
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            {installStatus.message}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default OmniSkillsPageClient;
