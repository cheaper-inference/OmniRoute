// @vitest-environment jsdom
// The kit builds the name of a table's persistent scrollbar from the table's `scrollbarLabel`
// with an English sentence ("Top … horizontal scrollbar"). The dashboard shell sets that sentence
// once, translated, through the kit's `TableScrollAreaLabelsProvider`, so no screen passes
// `labels` table by table.
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Table, TableBody, TableCell, TableRow } from "@omniroute/ui-kit/table";
import en from "../../../src/i18n/messages/en.json";

// A translator that shows which message was asked for, so the sentence cannot be the kit default.
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const t = (key: string, values?: Record<string, unknown>) =>
      `${namespace}.${key}${values ? JSON.stringify(values) : ""}`;
    return t;
  },
  useLocale: () => "en",
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/shared/components/Sidebar", () => ({
  default: () => <nav />,
  useSidebarSide: () => "left",
}));
vi.mock("@/shared/components/Header", () => ({ default: () => <header /> }));
vi.mock("@/shared/components/CommandPalette", () => ({ default: () => null }));
vi.mock("@/shared/components/MaintenanceBanner", () => ({ default: () => null }));
vi.mock("@/shared/components/NavigationProgress", () => ({ default: () => null }));
vi.mock("@/shared/components/NotificationToast", () => ({ default: () => null }));
vi.mock("@/shared/components/Breadcrumbs", () => ({ default: () => null }));

const { default: DashboardLayout } = await import("@/shared/components/layouts/DashboardLayout");

afterEach(() => cleanup());

const scrollbarName = (container: HTMLElement) =>
  container.querySelector("[data-slot='table-scrollbar']")?.getAttribute("aria-label");

function SampleTable(props: React.ComponentProps<typeof Table>) {
  return (
    <Table scrollbarLabel="Requests" {...props}>
      <TableBody>
        <TableRow>
          <TableCell>a</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("dashboard shell: translated name for the kit table scrollbar", () => {
  it("names the scrollbar of a table on any dashboard page with the translated sentence", () => {
    const { container } = render(
      <DashboardLayout>
        <SampleTable />
      </DashboardLayout>
    );
    expect(scrollbarName(container)).toBe('common.tableScrollbarLabel{"name":"Requests"}');
  });

  it("leaves a table's own `labels` in charge", () => {
    const { container } = render(
      <DashboardLayout>
        <SampleTable labels={{ scrollbar: (name) => `own ${name}` }} />
      </DashboardLayout>
    );
    expect(scrollbarName(container)).toBe("own Requests");
  });

  it("outside the dashboard shell the kit default stays", () => {
    const { container } = render(<SampleTable />);
    expect(scrollbarName(container)).toBe("Top Requests horizontal scrollbar");
  });

  it("the English message keeps the kit's sentence and the {name} placeholder", () => {
    expect((en.common as Record<string, unknown>).tableScrollbarLabel).toBe(
      "Top {name} horizontal scrollbar"
    );
  });
});
