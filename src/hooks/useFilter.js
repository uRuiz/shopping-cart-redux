import { useState, useMemo } from "react";

export const useFilter = (initialData) => {
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    return initialData.filter(
      (item) =>
        item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        item.profession.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, initialData]);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return { filteredData, updateFilter };
};
