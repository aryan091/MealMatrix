import React from 'react';
import { Handle, Position } from 'reactflow';

const StartNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-yellow-200 border-2 border-gray-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <Handle type="target" position={Position.Left} id="a" className='opacity-0' />
      <div className="text-sm sm:text-base md:text-lg">{data.label}</div>
    </div>
  );
};

export default StartNode;
