// @vitest-environment jsdom
/**
 * Kit components draw English defaults ("Dismiss notification", "Copying…", "Unavailable"…)
 * unless the screen passes the text (DESIGN_SYSTEM.md, rule 3). Each case below pins one
 * component that used to leave a default in place.
 *
 * The local next-intl mock renders `⟦namespace.key {params}⟧`, so a string that reaches the
 * DOM untranslated (the kit default) cannot pass for a translated one — in English the two are
 * often the same words.
 */
import React from "react";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => {
  type Translator = (key: string, params?: Record<string, unknown>) => string;
  // One translator per namespace: components put `t` in effect dependency arrays.
  const cache = new Map<string, Translator>();
  return {
    useLocale: () => "en",
    useTranslations: (namespace = "") => {
      let t = cache.get(namespace);
      if (!t) {
        t = (key, params) => `⟦${namespace}.${key}${params ? ` ${JSON.stringify(params)}` : ""}⟧`;
        cache.set(namespace, t);
      }
      return t;
    },
  };
});

// The charts only draw `unavailableLabel` for a null value, which these screens never produce:
// capture the props the screen hands to the kit instead.
const kitProps = vi.hoisted(() => ({
  lineChart: [] as Array<Record<string, unknown>>,
  calendarHeatmap: [] as Array<Record<string, unknown>>,
}));
vi.mock("@omniroute/ui-kit/reporting-charts", () => ({
  LineChart: (props: Record<string, unknown>) => {
    kitProps.lineChart.push(props);
    return <div data-testid="kit-line-chart" />;
  },
}));
vi.mock("@omniroute/ui-kit/calendar-heatmap", () => ({
  CalendarHeatmap: (props: Record<string, unknown>) => {
    kitProps.calendarHeatmap.push(props);
    return <div data-testid="kit-calendar-heatmap" />;
  },
}));

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
vi.mock("next/navigation", () => ({ usePathname: () => "/home" }));
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

const { Sidebar: KitSidebar, SidebarProvider } = await import("@omniroute/ui-kit/sidebar");
const { default: Sidebar } = await import("@/shared/components/Sidebar");
const { default: NotificationToast } = await import("@/shared/components/NotificationToast");
const { useNotificationStore } = await import("@/store/notificationStore");
const { dismissToast } = await import("@omniroute/ui-kit/toast");
const { default: CodePreview } = await import("@/shared/components/CodePreview");
const { default: ModalWizard } = await import("@/shared/components/ModalWizard");
const { ActivityCalendar } = await import("@/shared/components/analytics/ActivityCalendar");
const { CostTrendCard } = await import("@/app/(dashboard)/dashboard/costs/components/CostCharts");
const { default: StatsCharts } =
  await import("@/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs/StatsCharts");

const REPO_ROOT = process.cwd();
// Testing Library waits 1 s by default; a loaded runner needs more to mount the shell or a toast.
const SLOW_RUNNER = { timeout: 15_000 };
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function stubClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
}

afterEach(() => {
  cleanup();
  act(() => useNotificationStore.getState().clearAll());
  act(() => dismissToast());
  kitProps.lineChart.length = 0;
  kitProps.calendarHeatmap.length = 0;
  vi.unstubAllGlobals();
  localStorage.clear();
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("SidebarRail (Sidebar)", () => {
  it("names the rail and its native tooltip from the catalog", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ featureFlags: {}, hiddenSidebarItems: [], hiddenSidebarSections: [] }),
      }))
    );
    render(
      <SidebarProvider defaultOpen>
        <KitSidebar collapsible="icon">
          <Sidebar />
        </KitSidebar>
      </SidebarProvider>
    );
    const rail = await waitFor(() => {
      const el = document.querySelector<HTMLElement>("[data-slot=sidebar-rail]");
      if (!el) throw new Error("no rail yet");
      return el;
    }, SLOW_RUNNER);
    expect(rail.getAttribute("aria-label")).toBe("⟦sidebar.toggleSidebar⟧");
    expect(rail.getAttribute("title")).toBe("⟦sidebar.toggleSidebar⟧");
  });
});

describe("Toaster (NotificationToast)", () => {
  it("names the close button and the screen-reader announcement from the catalog", async () => {
    render(<NotificationToast />);
    act(() => {
      useNotificationStore.getState().success("Saved");
    });
    const close = await screen.findByRole(
      "button",
      { name: "⟦common.dismissNotification⟧" },
      SLOW_RUNNER
    );
    expect(close.className).toContain("ci-toast__close");
    await waitFor(
      () =>
        expect(
          document.querySelector('[data-slot="toaster-announcer"][aria-live="polite"]')?.textContent
        ).toBe('⟦common.notificationAnnouncement {"message":"Saved"}⟧'),
      SLOW_RUNNER
    );
  });
});

describe("CodePreview adapter", () => {
  const copyButton = () => document.querySelector<HTMLButtonElement>(".ci-code-preview__copy")!;

  it("translates the copy button, the code region name and the copy announcement", async () => {
    stubClipboard(async () => {});
    render(<CodePreview variant="surface" filename="Example" language="cURL" code="curl x" />);
    expect(document.querySelector("pre")!.getAttribute("aria-label")).toBe(
      '⟦common.codeRegionLabel {"language":"cURL"}⟧'
    );
    expect(copyButton().textContent).toBe("⟦common.copy⟧");
    await act(async () => {
      fireEvent.click(copyButton());
    });
    expect(copyButton().textContent).toBe("⟦common.copied⟧");
    expect(document.querySelector(".ci-code-preview [aria-live=polite]")!.textContent).toBe(
      "⟦common.codeCopiedAnnouncement⟧"
    );
  });

  it("names the region by its title when there is no language, and keeps caller labels", () => {
    const { rerender } = render(
      <CodePreview variant="surface" filename="Your endpoint" language="" code="http://x" />
    );
    expect(document.querySelector("pre")!.getAttribute("aria-label")).toBe("Your endpoint");
    rerender(
      <CodePreview
        variant="surface"
        filename={<b>rich</b>}
        language={null}
        code="x"
        codeLabel="Token"
        copyLabel="Copy token"
      />
    );
    expect(document.querySelector("pre")!.getAttribute("aria-label")).toBe("Token");
    expect(copyButton().textContent).toBe("Copy token");
    rerender(<CodePreview variant="surface" filename={<b>rich</b>} language={null} code="x" />);
    expect(document.querySelector("pre")!.getAttribute("aria-label")).toBe("⟦common.code⟧");
  });

  it("shows the translated error when the copy fails", async () => {
    stubClipboard(async () => {
      throw new Error("denied");
    });
    render(<CodePreview variant="surface" filename="Example" language="cURL" code="curl x" />);
    await act(async () => {
      fireEvent.click(copyButton());
    });
    expect(screen.getByRole("alert").textContent).toBe("⟦common.codeCopyError⟧");
  });

  it("shows the translated pending label and retry error for a deferred copy value", async () => {
    stubClipboard(async () => {});
    let reject!: (error: Error) => void;
    const getCopyValue = () =>
      new Promise<string>((_resolve, rej) => {
        reject = rej;
      });
    render(
      <CodePreview
        variant="surface"
        filename="Example"
        language="cURL"
        code="curl x"
        getCopyValue={getCopyValue}
      />
    );
    await act(async () => {
      fireEvent.click(copyButton());
    });
    expect(copyButton().textContent).toBe("⟦common.codeCopying⟧");
    await act(async () => {
      reject(new Error("no value"));
    });
    expect(screen.getByRole("alert").textContent).toBe("⟦common.codeCopyErrorRetry⟧");
  });

  it("is the only importer of the kit CodePreview in the app", () => {
    const direct = sourceFiles()
      .filter((file) => /from "@omniroute\/ui-kit\/code-preview"/.test(file.text))
      .map((file) => file.path);
    expect(direct).toEqual(["src/shared/components/CodePreview.tsx"]);
  });
});

describe("ModalWizard", () => {
  const steps = [
    { id: "a", title: "First" },
    { id: "b", title: "Second" },
    { id: "c", title: "Third" },
  ];

  it("translates the step list name, the step-link prefixes, the completed suffix and Skip", () => {
    render(
      <ModalWizard
        steps={steps}
        activeStep={1}
        completedSteps={["a"]}
        title="Second"
        stepNavigation="all"
        onStepSelect={() => {}}
        onNext={() => {}}
        onSkip={() => {}}
      >
        body
      </ModalWizard>
    );
    expect(screen.getByRole("list", { name: "⟦common.modalWizardProgress⟧" })).not.toBeNull();
    const srOnly = (name: string) =>
      Array.from(
        screen.getByRole("button", { name: new RegExp(name) }).querySelectorAll(".ci-sr-only"),
        (el) => el.textContent
      );
    expect(srOnly("First")).toEqual([
      "⟦common.modalWizardGoBackTo⟧ ",
      ", ⟦common.modalWizardCompleted⟧",
    ]);
    expect(srOnly("Third")).toEqual(["⟦common.modalWizardGoTo⟧ "]);
    expect(screen.getByRole("button", { name: "⟦common.skip⟧" })).not.toBeNull();
    expect(screen.getByRole("button", { name: /⟦common\.back⟧/ })).not.toBeNull();
  });

  it("lets the caller override a label", () => {
    render(
      <ModalWizard
        steps={steps}
        activeStep={0}
        title="First"
        onNext={() => {}}
        labels={{ progress: "New batch" }}
      >
        body
      </ModalWizard>
    );
    expect(screen.getByRole("list", { name: "New batch" })).not.toBeNull();
  });
});

describe("charts", () => {
  it("LineChart in the cost trend card gets a translated unavailable label", () => {
    render(
      <CostTrendCard
        title="Cost"
        locale="en"
        rows={[{ date: "2026-11-01", cost: 1 } as never, { date: "2026-11-02", cost: 2 } as never]}
      />
    );
    expect(kitProps.lineChart).toHaveLength(1);
    expect(kitProps.lineChart[0].unavailableLabel).toBe("⟦common.notAvailable⟧");
  });

  it("LineChart in the traffic inspector stats gets a translated unavailable label", () => {
    render(
      <StatsCharts
        requests={[
          { status: 200, totalLatencyMs: 10 } as never,
          { status: 200, totalLatencyMs: 20 } as never,
        ]}
      />
    );
    expect(kitProps.lineChart).toHaveLength(1);
    expect(kitProps.lineChart[0].unavailableLabel).toBe("⟦common.notAvailable⟧");
  });

  it("CalendarHeatmap in ActivityCalendar gets a translated unavailable label", () => {
    render(
      <ActivityCalendar
        ariaLabel="Activity"
        lessLabel="Less"
        moreLabel="More"
        locale="en"
        valueFormatter={String}
      />
    );
    expect(kitProps.calendarHeatmap).toHaveLength(1);
    expect(kitProps.calendarHeatmap[0].unavailableLabel).toBe("⟦common.notAvailable⟧");
  });
});

// ---- static guards over the dashboard source -------------------------------------------------

type SourceFile = { path: string; text: string };
let cachedSources: SourceFile[] | null = null;

function sourceFiles(): SourceFile[] {
  if (cachedSources) return cachedSources;
  const out: SourceFile[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "__tests__" && entry.name !== "node_modules") walk(full);
      } else if (entry.name.endsWith(".tsx")) {
        out.push({ path: relative(REPO_ROOT, full), text: readFileSync(full, "utf8") });
      }
    }
  };
  walk(join(REPO_ROOT, "src/app"));
  walk(join(REPO_ROOT, "src/shared/components"));
  cachedSources = out;
  return out;
}

/** Every JSX element of a kit component, whatever local name the file imports it under. */
function kitElements(file: SourceFile, subpath: string, exportName: string) {
  if (!file.text.includes(`@omniroute/ui-kit/${subpath}"`)) return [];
  const tree = ts.createSourceFile(
    file.path,
    file.text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const locals = new Set<string>();
  for (const statement of tree.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      (statement.moduleSpecifier as ts.StringLiteral).text !== `@omniroute/ui-kit/${subpath}`
    ) {
      continue;
    }
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      if ((element.propertyName ?? element.name).text === exportName) locals.add(element.name.text);
    }
  }
  const found: Array<{ line: number; attributes: ts.JsxAttributes }> = [];
  const visit = (node: ts.Node) => {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      locals.has(node.tagName.text)
    ) {
      found.push({
        line: tree.getLineAndCharacterOfPosition(node.getStart()).line + 1,
        attributes: node.attributes,
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return found;
}

function attribute(attributes: ts.JsxAttributes, name: string): ts.JsxAttribute | undefined {
  return attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.getText() === name
  );
}

describe("Alert", () => {
  it("every kit Alert that draws the dismiss button passes a translated dismissLabel", () => {
    const offenders: string[] = [];
    let checked = 0;
    for (const file of sourceFiles()) {
      for (const { line, attributes } of kitElements(file, "alert", "Alert")) {
        checked += 1;
        // The kit draws the button for `persistence="persistent"` (default) + `dismissible`
        // (default true). A spread can carry anything, so it is not judged here.
        const spread = attributes.properties.some(ts.isJsxSpreadAttribute);
        const notDismissible = /^\{\s*false\s*\}$/.test(
          attribute(attributes, "dismissible")?.initializer?.getText() ?? ""
        );
        const temporary = /temporary/.test(
          attribute(attributes, "persistence")?.initializer?.getText() ?? ""
        );
        if (spread || notDismissible || temporary) continue;
        if (!attribute(attributes, "dismissLabel")) offenders.push(`${file.path}:${line}`);
      }
    }
    expect(checked).toBeGreaterThan(40);
    expect(offenders).toEqual([]);
  });
});
