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
    <div className="absolute top-0 left-0 z-10 bg-white p-4 m-4 rounded-lg shadow-lg max-w-md">
    <h3 className="text-lg font-semibold mb-2">Marker Clustering</h3>
    <p className="text-sm mb-2">
      This example uses the <code className="bg-gray-100 px-1 rounded">@googlemaps/markerclusterer</code> library
      to demonstrate how to render a large dataset of markers on the map.
    </p>
    <p className="text-sm mb-2">
      This example also includes a filter function to show dynamic updating of
      the clustered markers and an InfoWindow to show details about the
      locations.
    </p>
    <div className="mb-3">
      <label className="font-medium">Filter By:</label>{' '}
      <select 
        onChange={handleCategoryChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={''}>All locations</option>
        {categories.map(category => (
          <option key={category.key} value={category.key}>
            {category.label} ({category.count})
          </option>
        ))}
      </select>
    </div>
  </div>
  );
};