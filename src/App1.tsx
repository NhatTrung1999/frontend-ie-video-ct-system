import VideoList from "./components/VideoList";
import Header from "./components/Header";
import ShowVideo from "./components/ShowVideo";
import Track from "./components/Track";
import ControlButton from "./components/ControlButton";
import Table from "./components/Table";
import { useRef, useState } from "react";
import { ProgressData } from "./types/interface";
import ReactPlayer from "react-player";

function App() {
  const [progresses, setProgresses] = useState<ProgressData[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handleClick = (value: string) => {
    const newProgress: ProgressData = {
      id: `process-${Date.now()}`,
      progress: value,
      partName: "",
      progressRows: [
        {
          id: `progressRow-${Date.now()}-va`,
          type: "VA",
          cycleTimes: Array(10).fill(0),
          averageCT: 0,
        },
        {
          id: `progressRow-${Date.now()}-nva`,
          type: "NVA",
          cycleTimes: Array(10).fill(0),
          averageCT: 0,
        },
      ],
    };
    setProgresses((prev) => [...prev, newProgress]);
  };

  const handleTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (playedSeconds: number) => {
    console.log(playedSeconds);
    setCurrentTime(playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, "seconds");
    }
    setCurrentTime(seconds);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center flex-col h-full dark:bg-slate-800 dark:text-white px-3">
        <div className="flex-1 w-full pt-5 flex justify-center items-center flex-col gap-2">
          <div className="w-full flex justify-end items-center relative">
            <VideoList handleClick={handleClick} />
            <ShowVideo
              isPlaying={isPlaying}
              onProgress={handleProgress}
              onDuration={handleDuration}
              playerRef={playerRef}
            />
          </div>
          <div className="w-full flex justify-end items-center">
            <Track
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
          </div>
          <div className="w-full flex justify-end items-center">
            <ControlButton
              isPlaying={isPlaying}
              handleTogglePlayPause={handleTogglePlayPause}
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <Table progresses={progresses} />
        </div>
      </div>
    </div>
  );
}

export default App;
