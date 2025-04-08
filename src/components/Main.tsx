import { useRef } from "react";
import { ProgressTable } from "./ProgressTable";
import StageControl from "./StageControl";
import ReactPlayer from "react-player";

const Main = () => {
  const playRef = useRef<ReactPlayer | null>(null)
  return (
    <main className="p-2 bg-primary-600">
      <StageControl playRef={playRef} />
      <ProgressTable playRef={playRef} />
    </main>
  );
};

export default Main;
