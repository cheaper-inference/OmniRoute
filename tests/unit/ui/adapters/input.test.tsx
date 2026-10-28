// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: Input } = await import("@/shared/components/Input");

afterEach(() => cleanup());

describe("Input adapter → kit Field + Input", () => {
  it("renders label, hint and the kit input with aria-describedby", () => {
    const { getByLabelText, getByText } = render(
      <Input id="email" label="Email" hint="We never share it" />
    );
    const input = getByLabelText("Email") as HTMLInputElement;
    expect(input.className).toContain("ci-input");
    expect(input.getAttribute("aria-describedby")).toBe("email-hint");
    expect(getByText("We never share it").id).toBe("email-hint");
  });

  it("error wins over hint, marks aria-invalid and uses the kit error styling", () => {
    const { getByLabelText, getByRole, getByText, queryByText } = render(
      <Input id="k" label="Key" hint="h" error="Required" />
    );
    const input = getByLabelText("Key");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe("k-error");
    expect(input.className).toContain("ci-input--error");
    expect(getByText("Required").id).toBe("k-error");
    // legacy parity: the error message is announced (role="alert" on the legacy <p>)
    expect(getByRole("alert").textContent).toBe("Required");
    expect(queryByText("h")).toBeNull();
  });

  it("icon prop renders a leading <Icon> inside the kit shell", () => {
    const { container } = render(<Input icon="search" aria-label="Search" />);
    expect(container.querySelector(".ci-input-shell svg.oi-icon")).not.toBeNull();
  });

  it("keeps the Caps Lock warning for password fields", () => {
    const { getByLabelText, getByText } = render(
      <Input id="pw" type="password" label="Password" />
    );
    const input = getByLabelText("Password");
    fireEvent.focus(input);
    // DTL builds the event with `new KeyboardEvent(type, init)`, so the EventModifierInit
    // flag is the only thing jsdom's getModifierState("CapsLock") reads.
    fireEvent.keyDown(input, { key: "a", modifierCapsLock: true });
    expect(getByText("Caps Lock is on").id).toBe("pw-capslock");
    expect(input.getAttribute("aria-describedby")).toContain("pw-capslock");
  });

  it("required adds the kit asterisk and the native attribute", () => {
    const { getByLabelText, container } = render(<Input id="n" label="Name" required />);
    expect((getByLabelText(/Name/) as HTMLInputElement).required).toBe(true);
    expect(container.querySelector(".ci-field__required")).not.toBeNull();
  });

  it("keeps the required marker out of the accessible name (screen readers hear the label)", () => {
    const { getByRole, container } = render(<Input id="e" label="Email" type="email" required />);
    const input = getByRole("textbox", { name: "Email" }) as HTMLInputElement;
    expect(input.id).toBe("e");
    expect(input.required).toBe(true);
    const marker = container.querySelector(".ci-field__required");
    expect(marker?.textContent).toBe("*");
    expect(marker?.getAttribute("aria-hidden")).toBe("true");
  });

  it("forwards a ref to the native <input> (CommandPalette focuses it)", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input id="q" aria-label="Query" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.id).toBe("q");
  });

  it("an empty-string label renders no <label> element", () => {
    const { container } = render(<Input label="" aria-label="Q" />);
    expect(container.querySelector("label")).toBeNull();
  });
});
