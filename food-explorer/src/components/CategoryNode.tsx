import React from 'react';
import { Handle, Position } from 'reactflow';

const CategoryNode: React.FC<{ data: { label: string, thumbnail: string } }> = ({ data }) => {
  return (
    <div className="pr-4 py-2 shadow-lg rounded-md bg-red-200 border-2 border-gray-300 flex items-center space-x-3 h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Hidden Handle for node connection */}
      <Handle type="target" position={Position.Left} id="a" className='opacity-0' />

      <div className="flex items-center space-x-2">
        {/* Box around the image */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-md flex items-center justify-center">
          <img
            src={data.thumbnail}
            alt={data.label}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
          />
        </div>

        {/* Label */}
        <div className="text-gray-700 font-semibold text-sm sm:text-base text-wrap">{data.label}</div>
      </div>

      <Handle type="source" position={Position.Right} id="b" className='opacity-0' />
    </div>
  );
};

export default CategoryNode;
