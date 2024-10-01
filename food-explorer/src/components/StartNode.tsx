import React from 'react';
import { Handle, Position } from 'reactflow';
import { CiGlobe } from "react-icons/ci";

const StartNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="pr-4 pl-2 py-2 shadow-lg rounded-md bg-green-200 border-2 border-gray-300 flex items-center space-x-3 h-auto w-44">
      {/* Handle for node connection */}

      {/* Icon in a box */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center">
          <CiGlobe size={20} color="red" />
        </div>

        {/* Label */}
        <div className="text-gray-700 font-semibold text-wrap">{data.label}</div>
      </div>

      {/* Handle for node connection */}
      <Handle type="source" position={Position.Right} id="b" className='hidden' />
    </div>
  );
};

export default StartNode;
