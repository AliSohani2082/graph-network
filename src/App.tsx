import { NetworkDiagram } from "./components/NetworkDiagram/NetworkDiagram";
import { data } from "./data";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <NetworkDiagram data={data} width={1000} height={1000} />
    </div>
  );
}

export default App;
