import React from 'react';
import { Handle, Position } from 'reactflow';

const StartNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-300">
      <Handle type="target" position={Position.Left} id="a" className='opacity-0' />
      <div>{data.label}</div>
    </div>
  );
};

export default StartNode;