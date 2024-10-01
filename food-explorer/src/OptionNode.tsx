import React from 'react';
import { TiArrowForwardOutline } from "react-icons/ti";
import { Handle, Position } from 'reactflow';

const OptionNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className='px-4 py-1  shadow-md rounded-full bg-gray-100 border-2 border-gray-300'>
      <Handle type="target" position={Position.Left} className='opacity-0' />
      <div className='flex gap-2'>
      <TiArrowForwardOutline size={20} color="green" />
      <div className='text-sm'>{data.label}</div>

      </div>
      <Handle type="source" position={Position.Right} className='opacity-0' />
    </div>
  );
};

export default OptionNode;
