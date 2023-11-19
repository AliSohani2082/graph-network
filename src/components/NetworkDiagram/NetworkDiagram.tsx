import * as d3 from "d3";
import * as React from "react";
import { drawNetwork } from "./drawNetwork";
import { Data, Link, Node } from "../../data";

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: Data;
  config: NetworkDiagramConfigProps;
};

export const NetworkDiagram: React.FC<NetworkDiagramProps> = ({
  width,
  height,
  data,
  config,
}) => {
  const links: Link[] = data.links.map((d: Link) => ({ ...d }));
  const nodes: Node[] = data.nodes.map((d: Node) => ({ ...d }));

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) {
      return;
    }

    d3.forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink<Node, Link>(links).id((d) => d.id)
      )
      .force(
        "collide",
        d3.forceCollide().radius(config.collideRadius).strength(0.5)
      )
      .force("charge", d3.forceManyBody().strength(config.manyBodyStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceY(0).strength(config.forceYStrength))
      .on("tick", () => {
        drawNetwork(context, width, height, nodes, links, config.radiusEffect);
      });
  }, [width, height, nodes, links]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
      />
    </div>
  );
};
