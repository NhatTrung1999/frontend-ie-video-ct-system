import ReactPlayer from "react-player";
import { useAppSelector } from "../../redux/hooks";
import { RefObject } from "react";
import { HistoryState } from "../../redux/features/history/hisotrySlice";

interface HistoryProps {
  playRef: RefObject<ReactPlayer | null>;
  isPlaying?: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const History = ({ playRef, setIsPlaying }: HistoryProps) => {
  const historyState = useAppSelector((state) => state.history);

  const handleClickHistory = (historyState: HistoryState) => {
    if (playRef.current) {
      playRef.current.seekTo(historyState.startTime, "seconds");
      // setIsPlaying(true);

      const checkEnd = setInterval(() => {
        const currentTime = playRef.current?.getCurrentTime() || 0;
        if (currentTime >= historyState.endTime) {
          setIsPlaying(false);
          clearInterval(checkEnd);
        }
      }, 100);
    }
  };

  return (
    <div className="w-1/6 border h-[309px] border-primary-400">
      <div className="flex flex-col h-full">
        <div className="bg-primary-400 px-2 py-3">
          <p className="text-primary-50 text-xl font-semibold">
            History playback
          </p>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {historyState.map((history, index) => (
            <div
              key={index}
              className="flex items-center gap-3 cursor-pointer p-2 hover:bg-primary-500"
              onClick={() => handleClickHistory(history)}
            >
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">
                {history.startTime.toFixed(0)}
              </div>
              <div className="text-primary-50">-</div>
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">
                {history.endTime.toFixed(0)}
              </div>
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">
                {history.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
