// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string, params?: Record<string, unknown>) =>
    params ? `${namespace}.${key}:${JSON.stringify(params)}` : `${namespace}.${key}`,
}));

const { FileInput, FileDropZone } = await import("@/shared/components/FileInput");
const barrel = await import("@/shared/components");

afterEach(() => cleanup());

function file(name: string, type = "application/json", size = 4) {
  return new File(["x".repeat(size)], name, { type });
}

function pick(input: HTMLInputElement, files: File[]) {
  fireEvent.change(input, { target: { files } });
}

describe("FileInput adapter → kit FileInput", () => {
  it("renders the kit picker with translated defaults", () => {
    const { container, getByText, rerender } = render(<FileInput />);
    expect(container.querySelector("[data-slot='file-input']")).not.toBeNull();
    expect(getByText("common.fileInputChoose")).not.toBeNull();
    expect(getByText("common.fileInputEmpty")).not.toBeNull();
    rerender(<FileInput multiple />);
    expect(getByText("common.fileInputChooseMultiple")).not.toBeNull();
  });

  it("names the native input by its choose label and reports the picked files", () => {
    const onFilesChange = vi.fn();
    const { getByLabelText, getByText } = render(
      <FileInput accept=".json" chooseLabel="Import suite" onFilesChange={onFilesChange} />
    );
    const input = getByLabelText("Import suite") as HTMLInputElement;
    expect(input.type).toBe("file");
    expect(input.accept).toBe(".json");
    const suite = file("suite.json");
    pick(input, [suite]);
    expect(onFilesChange).toHaveBeenCalledWith([suite]);
    // the status line shows the chosen file and stays linked as the description
    expect(getByText("suite.json").id).toBe(input.getAttribute("aria-describedby"));
  });

  it("uses the translated plural for a multi-file status and lets caller labels win", () => {
    const { getByLabelText, getByText, rerender } = render(
      <FileInput multiple chooseLabel="Pick" />
    );
    pick(getByLabelText("Pick") as HTMLInputElement, [file("a.json"), file("b.json")]);
    expect(getByText('common.fileInputSelectedCount:{"count":2}')).not.toBeNull();
    // a new key remounts the kit picker (its status keeps the last selection otherwise)
    rerender(<FileInput key="fresh" chooseLabel="Pick" emptyLabel="Nothing yet" />);
    expect(getByText("Nothing yet")).not.toBeNull();
  });

  it("sends files outside accept/maxSize to onFilesRejected, not onFilesChange", () => {
    const onFilesChange = vi.fn();
    const onFilesRejected = vi.fn();
    const { getByLabelText } = render(
      <FileInput
        accept=".json"
        maxSize={10}
        chooseLabel="Pick"
        onFilesChange={onFilesChange}
        onFilesRejected={onFilesRejected}
      />
    );
    const input = getByLabelText("Pick") as HTMLInputElement;
    const wrongType = file("notes.txt", "text/plain");
    pick(input, [wrongType]);
    const tooBig = file("big.json", "application/json", 11);
    pick(input, [tooBig]);
    expect(onFilesChange).not.toHaveBeenCalled();
    expect(onFilesRejected.mock.calls).toEqual([
      [[{ file: wrongType, reason: "type" }]],
      [[{ file: tooBig, reason: "size" }]],
    ]);
  });

  it("forwards the ref and extra props to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(<FileInput ref={ref} data-testid="picker" disabled />);
    expect(ref.current).toBe(getByTestId("picker"));
    expect(ref.current?.disabled).toBe(true);
  });

  it("is exported from the shared components barrel", () => {
    expect(barrel.FileInput).toBe(FileInput);
    expect(barrel.FileDropZone).toBe(FileDropZone);
  });
});

describe("FileDropZone adapter → kit FileDropZone", () => {
  it("titles the zone with the translated default and names the input by it", () => {
    const { container, getByLabelText, rerender } = render(<FileDropZone />);
    expect(container.querySelector("[data-slot='file-drop-zone']")).not.toBeNull();
    expect((getByLabelText("common.fileDropLabel") as HTMLInputElement).type).toBe("file");
    rerender(<FileDropZone multiple />);
    expect(getByLabelText("common.fileDropLabelMultiple")).not.toBeNull();
  });

  it("accepts a dropped file and a picked file through onFilesChange", () => {
    const onFilesChange = vi.fn();
    const { container, getByLabelText } = render(
      <FileDropZone accept=".jsonl" dropLabel="Drop batch" onFilesChange={onFilesChange} />
    );
    const zone = container.querySelector("[data-slot='file-drop-zone']") as HTMLElement;
    const dropped = file("dropped.jsonl", "");
    fireEvent.drop(zone, { dataTransfer: { files: [dropped], types: ["Files"] } });
    const picked = file("picked.jsonl", "");
    pick(getByLabelText("Drop batch") as HTMLInputElement, [picked]);
    expect(onFilesChange.mock.calls).toEqual([[[dropped]], [[picked]]]);
  });

  it("ignores drops while disabled", () => {
    const onFilesChange = vi.fn();
    const { container } = render(<FileDropZone disabled onFilesChange={onFilesChange} />);
    const zone = container.querySelector("[data-slot='file-drop-zone']") as HTMLElement;
    expect(zone.getAttribute("data-disabled")).toBe("true");
    fireEvent.drop(zone, { dataTransfer: { files: [file("a.json")], types: ["Files"] } });
    expect(onFilesChange).not.toHaveBeenCalled();
  });
});
