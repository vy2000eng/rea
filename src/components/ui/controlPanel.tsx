import React, {useCallback} from 'react';

import { CategoryData } from "@/Model/SchoolModel";

type ControlPanelProps = {
  categories: Array<CategoryData>;
  onCategoryChange: (value: string | null) => void;
};

export const ControlPanel = ({
  categories,
  onCategoryChange
}: ControlPanelProps) => {
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onCategoryChange(e.target.value || null);
    },
    [onCategoryChange]
  );
  return (
    <div className="absolute top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg max-w-xs">
    <h3 className="text-md font-semibold mb-1">Location Filter</h3>
    <p className="text-xs text-gray-600 mb-2">
      View points of interest around Charlotte
    </p>
    <div className="mb-2">
      <select 
        onChange={handleCategoryChange}
        className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={''}>All locations</option>
        {categories.map(category => (
          <option key={category.key} value={category.key}>
            {category.label} ({category.count})
          </option>
        ))}
      </select>
    </div>
    <div className="text-xs text-gray-500 flex items-center">
      <span className="mr-1">🔵</span> Use clusters to view grouped locations
    </div>
  </div>
  );
};