import React from "react";

type LinkCanvasProps = {
  children: React.ReactNode;
};

const LinkCanvas: React.FC<LinkCanvasProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default LinkCanvas;
