import { FC } from "react";
import { sortOptions } from "@/root/consts";

interface FilterSortControlsProps {
  filter: string;
  setFilter: (filter: string) => void;
  sortType: string;
  setSortType: (sortType: string) => void;
}

export const FilterSortControls: FC<FilterSortControlsProps> = ({
  filter,
  setFilter,
  sortType,
  setSortType,
}) => {
  return (
    <div className="w-full flex justify-between mb-4">
      <input
        type="text"
        placeholder="Filter by company"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="border p-2 rounded"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
