// CanvasComponent.tsx
import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";
import * as d3 from "d3";

import { LinkData, NodeData, Data } from "@/data/data";
import { NodeProps } from "@/components/NetworkDiagram/Node";

type CanvasComponentProps = {
  children: ReactNode;
  data: Data;
  config: NetworkDiagramConfigProps;
};

const NodeCanvas: React.FC<CanvasComponentProps> = ({
  children,
  data,
  config,
}) => {
  const links: LinkData[] = data.links.map((d: LinkData) => ({ ...d }));
  const nodes: NodeData[] = data.nodes.map((d: NodeData) => ({ ...d }));

  // const nodes: NodeData[] =
  //   React.Children.map(children, (child) => {
  //     const node: NodeData = (child as React.ReactElement<NodeProps>).props
  //       .node;
  //     return { ...node };
  //   }) || [];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function drawLinks(context: CanvasRenderingContext2D, links: LinkData[]) {
    context.globalAlpha = 0.6;
    context.strokeStyle = "#999";
    context.lineWidth = 1;
    links.forEach((link) => {
      context.beginPath();
      console.log("hoi");

      const source: any = link.source as any;
      const target: any = link.target as any;
      context.moveTo(source.x, source.y);
      context.lineTo(target.x, target.y);
      // }
      context.stroke();
    });
  }

  function drawNodes(nodes: NodeData[], canvas: HTMLCanvasElement | null) {
    if (canvas) {
      React.Children.forEach(children, (child: any) => {
        if (React.isValidElement(child)) {
          const { node: childNode } = (child as React.ReactElement<NodeProps>)
            .props;

          const node = nodes.find((node) => node.id === childNode.id);
          const x = node?.x || 0;
          const y = node?.y || 0;

          if (typeof x === "number" && typeof y === "number") {
            const childElement = canvas.querySelector(
              `[data-key="${child.key}"]`
            ) as HTMLElement | null;

            // console.log("hey");
            if (childElement) {
              const style: CSSProperties = {
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
              };

              Object.assign(childElement.style, style);
            }
          }
        }
      });
    }
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const width = canvas?.width || 1000;
    const height = canvas?.height || 1000;

    if (!context) {
      return;
    }

    d3.forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink<NodeData, LinkData>(links).id((d) => d.id)
      )
      .force(
        "collide",
        d3.forceCollide().radius(config.collideRadius).strength(0.5)
      )
      .force("charge", d3.forceManyBody().strength(config.manyBodyStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceY(0).strength(config.forceYStrength))
      .on("tick", () => {
        context.clearRect(0, 0, width, height);
        drawLinks(context, links);

        // drawNodes(nodes,   canvas);
      });
  }, [links, nodes]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
      width={1000}
      height={1000}
    >
      {children}
    </canvas>
  );
};

export default NodeCanvas;
