import { useRef, useState } from "react";
import { ProgressTable } from "./ProgressTable";
import StageControl from "./StageControl";
import ReactPlayer from "react-player";

const Main = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playRef = useRef<ReactPlayer | null>(null);
  return (
    <main className="p-2 bg-primary-600">
      <StageControl
        playRef={playRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <ProgressTable
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playRef={playRef}
      />
    </main>
  );
};

export default Main;
