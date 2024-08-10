import { render, screen, fireEvent } from "@testing-library/react";
import { InputBlock } from "./InputBlock";

describe("InputBlock", () => {
  it.each([
    {
      role: "button",
    },
    {
      role: "spinbutton",
    },
  ])(`should render $role`, ({ role }) => {
    render(
      <InputBlock
        value={10}
        handleStart={jest.fn()}
        isRunning={false}
        setConcurrency={jest.fn()}
        setResults={jest.fn()}
      />
    );
    if (role === "button") {
      expect(screen.getAllByRole(role).length).toBe(2);
      expect(screen.getByText(/start/i)).toBeInTheDocument();
      expect(screen.getByText(/clear/i)).toBeInTheDocument();
    } else {
      expect(screen.getByRole(role)).toBeInTheDocument();
      expect(screen.getByDisplayValue(10)).toBeInTheDocument();
    }
  });

  it("should invoke the onChange callback", () => {
    const onChange = jest.fn();

    render(
      <InputBlock
        value={10}
        handleStart={jest.fn()}
        isRunning={false}
        setConcurrency={onChange}
        setResults={jest.fn()}
      />
    );

    const element = screen.getByRole("spinbutton");

    fireEvent.change(element, { target: { value: 90 } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
