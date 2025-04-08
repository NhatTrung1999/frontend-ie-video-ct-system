import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import ControlPanel from "./ControlPanel";
import StageList from "./StageList";

const StageControl = () => {
  const [progressing, setProgressing] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const playRef = useRef<ReactPlayer | null>(null);
  // const [videoUrl, setVideoUrl] = useState<string>("");

  const handleProgressing = (state: { playedSeconds: number }) => {
    setProgressing(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div className="flex gap-2 h-[550px]">
      <div className="w-1/4">
        <div className="flex flex-col h-full gap-2">
          <StageList />
          <ControlPanel
            playRef={playRef}
            progressing={progressing}
            duration={duration}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setProgressing={setProgressing}
          />
        </div>
      </div>
      <VideoPlayer
        isPlaying={isPlaying}
        playRef={playRef}
        // videoUrl={videoUrl}
        handleProgressing={handleProgressing}
        handleDuration={handleDuration}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default StageControl;
