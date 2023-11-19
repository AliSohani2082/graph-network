import * as React from "react";
import { Data } from "@/data/data";
import NodeCanvas from "@/components/NetworkDiagram/NodeCanvas";
import Node from "@/components/NetworkDiagram/Node";

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: Data;
  config: NetworkDiagramConfigProps;
};

export const NetworkDiagram: React.FC<NetworkDiagramProps> = ({
  data,
  config,
}) => {
  return (
    <div>
      <NodeCanvas data={data} config={config}>
        {data.nodes.map((node) => (
          <Node key={node.id} data-key={node.id} node={node} />
        ))}
      </NodeCanvas>
    </div>
  );
};
