import { render, screen } from "@testing-library/react";
import { ResultItem } from "./ResultItem";

describe("render ResultItem component", () => {
  it("should render item with text 1", () => {
    const result = 1;
    render(<ResultItem result={result} />);

    expect(screen.getByText(/Request 1/i)).toBeInTheDocument();
  });
});
