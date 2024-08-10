import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render app with input, buttons and empty results list", () => {
    render(<App />);

    expect(screen.getByTestId("app")).toBeInTheDocument();

    const input = screen.getByRole("spinbutton");
    const startButton = screen.getByRole("button", { name: /Start/ });
    const clearButton = screen.getByRole("button", { name: /Clear/ });
    const resultsList = screen.queryAllByRole("listitem");

    expect(input).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(resultsList.length).toEqual(0);
  });

  it("should remove all results", async () => {
    render(<App />);
    const startButton = screen.getByRole("button", { name: /Start/ });
    const clearButton = screen.getByRole("button", { name: /Clear/ });

    fireEvent.click(startButton);

    await screen.findAllByText(/Request \d+/);

    const resultsList = screen.getAllByRole("listitem");
    expect(resultsList.length).toBeGreaterThan(0);

    fireEvent.click(clearButton);

    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });
});
