"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { PlayView } from "./PlayView";
import { CompareView } from "./CompareView";

export default function CompressionStudioPage() {
  const t = useTranslations("compressionStudio");
  const [tab, setTab] = useState<"play" | "compare">("play");
  const [text, setText] = useState("");
  return (
    <div className="flex h-[calc(100dvh-6rem)] min-h-[480px] flex-col p-4">
      {/* Kit underline Tabs (WAI-ARIA tablist); the selected view mounts in its panel. */}
      <Tabs
        variant="underline"
        value={tab}
        onValueChange={(next) => setTab(next as "play" | "compare")}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList aria-label={t("studioViews")} className="mb-3">
          <TabsTrigger value="play" data-testid="tab-play">
            {t("playTab")}
          </TabsTrigger>
          <TabsTrigger value="compare" data-testid="tab-compare">
            {t("compareTab")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="play" className="min-h-0 flex-1">
          <PlayView text={text} onText={setText} />
        </TabsContent>
        <TabsContent value="compare" className="min-h-0 flex-1">
          <CompareView text={text} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
