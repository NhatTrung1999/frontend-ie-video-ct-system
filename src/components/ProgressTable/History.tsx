import ReactPlayer from "react-player";
import { useAppSelector } from "../../redux/hooks";
import { RefObject } from "react";


interface  HistoryProps {
  playRef: RefObject<ReactPlayer | null>;
}

const History = ({playRef}:HistoryProps) => {
  const historyState = useAppSelector((state) => state.history);

  const handleClickHistory = (startTime: number) => {
    if(playRef.current){
      playRef.current.seekTo(startTime, 'seconds')
    }
  }

  return (
    <div className="w-1/6 border h-[309px] border-primary-400">
      <div className="flex flex-col h-full">
        <div className="bg-primary-400 px-2 py-3">
          <p className="text-primary-50 text-xl font-semibold">History playback</p>
        </div>
        <div className="border border-red-500 flex-1 overflow-y-auto scrollbar-hide">
          {historyState.map((history, index) => (
            <div key={index} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-primary-500" onClick={() => handleClickHistory(+history.startTime.toFixed(0))}>
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">{history.startTime.toFixed(0)}</div>
              <div className="text-primary-50">-</div>
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">{history.endTime.toFixed(0)}</div>
              <div className="px-5 py-1 bg-primary-400 rounded-md text-primary-50 font-semibold">{history.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
