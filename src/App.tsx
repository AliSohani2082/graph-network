import { useState } from "react";

import { NetworkDiagram } from "./components/NetworkDiagram/NetworkDiagram";
import { data } from "./data";
import LeftSideBar from "./components/shared/LeftSideBar";

function App() {
  const [collideRadius, setCollideRadius] = useState(25);
  const [manyBodyStrength, setManyBodyStrength] = useState(0);
  const [forceYStrength, setForceYStrength] = useState(0.1);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LeftSideBar
        setCollideRadius={setCollideRadius}
        setManyBodyStrength={setManyBodyStrength}
        setForceYStrength={setForceYStrength}
        collideRadius={collideRadius}
        manyBodyStrength={manyBodyStrength}
        forceYStrength={forceYStrength}
      />
      <NetworkDiagram
        data={data}
        width={1000}
        height={1000}
        config={{ collideRadius, manyBodyStrength, forceYStrength }}
      />
    </div>
  );
}

export default App;
