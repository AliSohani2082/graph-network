import { NodeData } from "@/data/data";
import React from "react";

export type NodeProps = {
  node: NodeData;
};

const Node: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="width-[40px] heigh-[40px] bg-blue-600 rounded-full border-2 border-gray-700">
      {node.id}
    </div>
  );
};

export default Node;
