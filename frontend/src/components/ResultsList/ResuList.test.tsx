import { render, screen } from "@testing-library/react";
import { ResultsList } from "./ResultsList";

describe("render ResultList component", () => {
  it("should render list items with text 1, 2 and 3", () => {
    const results = [1, 2, 3];
    render(<ResultsList results={results} />);

    expect(screen.getAllByRole("listitem").length).toEqual(3);
    expect(screen.getByText(/Request 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Request 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Request 3/i)).toBeInTheDocument();
  });

});
