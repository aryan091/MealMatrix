import React from 'react';
import { Handle, Position } from 'reactflow';

const IngredientNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  console.log("Data in IngredientNode", data);

  return (
    <div className="pr-4 py-2 shadow-md rounded-md bg-green-100 border-2 border-green-300 flex items-center space-x-3 h-auto w-44">
      <Handle type="target" position={Position.Left} id="a" className="opacity-0" />

      <div className="flex items-center space-x-2">
        {/* Box around the image */}
        <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center">
          <img
            src={`https://www.themealdb.com/images/ingredients/${data.label}-Small.png`} // Using template literals
            alt={data.label}
            className="w-6 h-6 rounded-full"
          />
        </div>

        {/* Label */}
        <div className="text-gray-700 font-semibold text-wrap">{data.label}</div>
      </div>

      <Handle type="source" position={Position.Right} id="b" className="opacity-0" />
    </div>
  );
};

export default IngredientNode;
