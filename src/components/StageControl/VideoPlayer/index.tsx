import { Ref } from "react";
import ReactPlayer from "react-player";
import { useAppSelector } from "../../../redux/hooks";

interface VideoPlayerProp {
  isPlaying: boolean;
  playRef: Ref<ReactPlayer | null>;
  // videoUrl: string;
  handleProgressing: (state: { playedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const VideoPlayer = ({
  isPlaying,
  playRef,
  // videoUrl,
  handleProgressing,
  handleDuration,
  setIsPlaying,
}: VideoPlayerProp) => {
  const videoSrc = useAppSelector((state) => state.stagelist.videoSrc);

  return (
    <div className="w-3/4">
      <ReactPlayer
        ref={playRef}
        url={videoSrc}
        width={"100%"}
        height={"100%"}
        style={{ backgroundColor: "#020617" }}
        onProgress={handleProgressing}
        onDuration={handleDuration}
        onEnded={() => setIsPlaying(false)}
        playing={isPlaying}
        muted={true}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
