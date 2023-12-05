import { renderHook, act } from "@testing-library/react-hooks";
import { useFilter } from "./useFilter";

describe("useFilter", () => {
  const initialData = [
    { firstName: "John", lastName: "Doe", profession: "Developer" },
    { firstName: "Jane", lastName: "Smith", profession: "Designer" },
  ];

  it("returns filtered data based on the filter value", () => {
    const { result } = renderHook(() => useFilter(initialData));

    act(() => {
      result.current.updateFilter("John");
    });

    expect(result.current.filteredData).toEqual([
      { firstName: "John", lastName: "Doe", profession: "Developer" },
    ]);

    act(() => {
      result.current.updateFilter("Designer");
    });

    expect(result.current.filteredData).toEqual([
      { firstName: "Jane", lastName: "Smith", profession: "Designer" },
    ]);
  });

  it("returns all data when filter is empty", () => {
    const { result } = renderHook(() => useFilter(initialData));

    act(() => {
      result.current.updateFilter("");
    });

    expect(result.current.filteredData).toEqual(initialData);
  });
});
