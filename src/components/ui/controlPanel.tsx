import React, {useEffect, useState} from 'react';

import { CategoryData } from "@/Model/SchoolModel";

type ControlPanelProps = {
  categories: Array<CategoryData>;
  onCategoryChange: (value: string | null) => void;
  activeTitle:string
};

export const ControlPanel = ({
  categories,
  onCategoryChange,
  activeTitle
}: ControlPanelProps) => {
  //const [activeTitleL,setActiveLTitle] = useState<string>()

  //console.log("Active title in CP: " + activeTitle)
  // const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
     
  //     onCategoryChange(e.target.value || null);
  //   },
  //   [onCategoryChange,activeTitle]
  // );
  useEffect(()=>{
    if(activeTitle!="All locations"){
      setSelectedCategory(activeTitle);
      onCategoryChange(activeTitle);

        //onCategoryChange(activeTitle)
    }
  

  },[activeTitle])
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.key || 'All locations');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    
    // Propagate the change to parent component or other functions
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg max-w-xs">
    <h3 className="text-md font-semibold mb-1">Location Filter</h3>
    <p className="text-xs text-gray-600 mb-2">
      View points of interest around Charlotte
    </p>
    <div className="mb-2">
      <select 
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={""}>All locations</option>
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