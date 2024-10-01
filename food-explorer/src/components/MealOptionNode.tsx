import React from 'react';
import { Handle, Position } from 'reactflow';
import { TiArrowForwardOutline } from "react-icons/ti";

const MealOptionNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className='px-4 py-1 shadow-lg rounded-full bg-pink-200 border-2 border-gray-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <Handle type="target" position={Position.Left} className='opacity-0' />

      <div className='flex items-center gap-2'>
        <TiArrowForwardOutline size={16} className="sm:size-20" color="green" />
        <div className='text-xs sm:text-sm md:text-base'>{data.label}</div>
      </div>

      <Handle type="source" position={Position.Right} className='opacity-0' />
    </div>
  );
};

export default MealOptionNode;
