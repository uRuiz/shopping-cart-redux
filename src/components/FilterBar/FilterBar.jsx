export const FilterBar = ({ onFilterChange }) => {
  return (
    <input
      type="text"
      name="filter"
      onChange={onFilterChange}
      placeholder="Filter by name or profession"
    />
  );
};
