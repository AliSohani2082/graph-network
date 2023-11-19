import { scaleOrdinal, schemeCategory10 } from "d3";
import { LinkData, NodeData } from "@/data/data";

export const RADIUS = 8;

export const drawNetwork = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: NodeData[],
  links: LinkData[],
  radiusEffect: number
) => {
  context.clearRect(0, 0, width, height);

  // Color Scale
  const allGroups = [...new Set(nodes.map((d) => String(d.group)))];
  const colorScale = scaleOrdinal<string>()
    .domain(allGroups)
    .range(schemeCategory10);

  // Draw the links first
  context.globalAlpha = 0.6;
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  links.forEach((link) => {
    context.beginPath();
    // if (typeof link.source === "string" || typeof link.source === "number") {
    //   const sourceNode: Node | undefined = nodes.find(
    //     (node) => node.id === link.source
    //   );

    //   if (sourceNode) {
    //     context.moveTo(sourceNode.x ?? 0, sourceNode.y ?? 0);
    //     context.lineTo(sourceNode.x ?? 0, sourceNode.y ?? 0);
    //   }
    // }
    //  else {
    const source: any = link.source as any;
    const target: any = link.target as any;
    context.moveTo(source.x, source.y);
    context.lineTo(target.x, target.y);
    // }
    context.stroke();
  });

  // Draw the nodes
  context.globalAlpha = 1;
  context.strokeStyle = "#fff";
  context.lineWidth = 3;
  nodes.forEach((node) => {
    const radious = RADIUS + node.size * 3 * (radiusEffect / 100);
    if (!node.x || !node.y) {
      return;
    }

    context.beginPath();
    context.moveTo(node.x + radious, node.y);
    context.arc(node.x, node.y, radious, 0, 2 * Math.PI);
    context.fillStyle = colorScale(String(node.group));
    context.stroke();
    context.fill();
  });
};
