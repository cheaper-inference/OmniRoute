import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LogExportPageClient } from "@/app/(dashboard)/dashboard/log-export/LogExportPageClient";
import { describeLogExportDestinationTypes } from "@/lib/logExport/registry";
import type { LogExportDestination } from "@/app/(dashboard)/dashboard/log-export/types";

const key = JSON.stringify({ client_email: "exporter@example.test", private_key: "fixture" });
const validConfig = {
  projectId: "qa-project",
  datasetId: "qa_dataset",
  tableId: "call_logs",
  serviceAccountJson: key,
};

const fetchMock = vi.fn<typeof fetch>();
const writes = () =>
  fetchMock.mock.calls.filter(([, init]) => init?.method === "POST" || init?.method === "PUT");

const field = (label: RegExp) =>
  screen.getByLabelText<HTMLInputElement | HTMLTextAreaElement>(label);
const change = (label: RegExp, value: string) =>
  fireEvent.change(field(label), { target: { value } });
const create = () => fireEvent.click(screen.getByRole("button", { name: "Create destination" }));

function expectFieldError(label: RegExp, message: RegExp) {
  const input = field(label);
  expect(input.getAttribute("aria-invalid")).toBe("true");
  const descriptions = input.getAttribute("aria-describedby")?.split(" ") ?? [];
  expect(descriptions.map((id) => document.getElementById(id)?.textContent).join(" ")).toMatch(
    message
  );
}

async function mount(destination?: LogExportDestination, onlyType?: string) {
  fetchMock.mockImplementation(async (url) => {
    if (url === "/api/log-export/types") {
      const types = describeLogExportDestinationTypes();
      return Response.json({ types: onlyType ? types.filter(({ id }) => id === onlyType) : types });
    }
    if (url === "/api/log-export/status") {
      return Response.json({
        job: null,
        runs: [],
        maxCallLogRowId: 0,
        destinations: destination ? [destination] : [],
      });
    }
    return Response.json({});
  });
  render(<LogExportPageClient />);
  const button = await screen.findByRole("button", {
    name: destination ? "Edit" : "Add destination",
  });
  fireEvent.click(button);
  await screen.findByRole("dialog");
}

function fillRequiredFields() {
  change(/^Name/, "QA BigQuery");
  change(/^GCP project id/, validConfig.projectId);
  change(/^Dataset id/, validConfig.datasetId);
  change(/^Table id/, validConfig.tableId);
  change(/^Dataset location/, "EU");
  change(/^Service account key/, validConfig.serviceAccountJson);
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("BigQuery log export destination validation (KEA-9787)", () => {
  it("shows all seven field errors on the same attempt and never posts", async () => {
    await mount();
    change(/^Name/, "QA BigQuery");
    change(/^Dataset location/, "");
    change(/^Partition retention/, "-5");
    change(/^Batch size/, "99999999");
    create();

    expect(writes()).toHaveLength(0);
    for (const label of [
      /^GCP project id/,
      /^Dataset id/,
      /^Table id/,
      /^Dataset location/,
      /^Service account key/,
    ]) {
      expectFieldError(label, /required/i);
    }
    expectFieldError(/^Partition retention/, /0.*3,?650/);
    expectFieldError(/^Batch size/, /1.*10,?000/);

    change(/^Dataset location/, "EU");
    expect(field(/^Dataset location/).getAttribute("aria-invalid")).toBeNull();
    expectFieldError(/^Batch size/, /1.*10,?000/);
  });

  it("shows EU by default and posts retention 0 and batch size 10000", async () => {
    await mount();
    const initialLocation = field(/^Dataset location/).value;
    fillRequiredFields();
    change(/^Partition retention/, "0");
    change(/^Batch size/, "10000");
    create();

    await screen.findByText("Destination saved.");
    expect(writes()).toHaveLength(1);
    expect(JSON.parse(String(writes()[0][1]?.body))).toMatchObject({
      batchSize: 10000,
      config: { ...validConfig, location: "EU", partitionExpirationDays: 0 },
    });
    expect(initialLocation).toBe("EU");
  });

  it("rejects batch size 0 and uses the default when the field is cleared", async () => {
    await mount();
    fillRequiredFields();
    change(/^Batch size/, "0");
    create();

    expect(writes()).toHaveLength(0);
    expectFieldError(/^Batch size/, /1.*10,?000/);

    change(/^Batch size/, "");
    create();
    await screen.findByText("Destination saved.");
    expect(writes()).toHaveLength(1);
    expect(JSON.parse(String(writes()[0][1]?.body))).toMatchObject({ batchSize: 500 });
  });

  it("saves an edit without re-entering the stored service account key", async () => {
    await mount({
      id: "bq-existing",
      name: "QA BigQuery",
      type: "bigquery",
      typeLabel: "Google BigQuery",
      typeAvailable: true,
      enabled: true,
      config: { ...validConfig, location: "EU", serviceAccountJson: "__stored__" },
      batchSize: 500,
      includeBodies: false,
      maxBodyBytes: 262144,
      maxRowsPerRun: 10000,
      cursorRowId: 0,
      exportedTotal: 0,
      pending: 0,
      lastRunAt: null,
      lastStatus: null,
      lastError: null,
      createdAt: "2026-11-27T00:00:00Z",
      updatedAt: "2026-11-27T00:00:00Z",
    });
    change(/^Service account key/, "");
    expect(field(/^Service account key/).required).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await screen.findByText("Destination saved.");
    expect(writes()).toHaveLength(1);
    const [[url, init]] = writes();
    expect(url).toBe("/api/log-export/destinations/bq-existing");
    expect(init?.method).toBe("PUT");
    expect(JSON.parse(String(init?.body))).toMatchObject({
      config: { serviceAccountJson: "__stored__" },
    });
  });

  it("submits an OTLP destination without applying BigQuery field rules", async () => {
    await mount(undefined, "otlp-http");
    change(/^Name/, "OTLP collector");
    change(/^Traces endpoint URL/, "https://collector.example.test/v1/traces");
    create();

    await screen.findByText("Destination saved.");
    expect(writes()).toHaveLength(1);
    expect(JSON.parse(String(writes()[0][1]?.body))).toMatchObject({
      type: "otlp-http",
      config: { endpoint: "https://collector.example.test/v1/traces" },
    });
  });
});
