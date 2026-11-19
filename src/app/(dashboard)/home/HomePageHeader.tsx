import { getTranslations } from "next-intl/server";
import { PageHeader } from "@omniroute/ui-kit/page-header";

/**
 * Title of /home: the same title and description the shell top bar shows for the route. The
 * shell title is hidden below 1024 px, so without this the page had no heading there.
 */
export default async function HomePageHeader() {
  const [tSidebar, tHeader] = await Promise.all([
    getTranslations("sidebar"),
    getTranslations("header"),
  ]);
  return (
    <PageHeader
      compact
      className="mb-4"
      title={tSidebar("home")}
      description={tHeader("homeDescription")}
    />
  );
}
