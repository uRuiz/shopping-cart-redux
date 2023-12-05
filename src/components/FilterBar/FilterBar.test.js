import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <FilterBar onFilterChange={() => {}} />,
    );
    const input = getByPlaceholderText("Filter by name or profession");
    expect(input).toBeInTheDocument();
  });

  it("calls onFilterChange on input change", () => {
    const handleFilterChange = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterBar onFilterChange={handleFilterChange} />,
    );
    const input = getByPlaceholderText("Filter by name or profession");

    fireEvent.change(input, { target: { value: "test" } });

    expect(handleFilterChange).toHaveBeenCalled();
  });
});
