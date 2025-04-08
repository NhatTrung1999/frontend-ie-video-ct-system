import { RefObject, useState } from "react";
import { FaPlay, FaPause, FaCircleCheck } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateProgressStage } from "../../../redux/features/progressStage/progressStageSlice";
import { addHistory } from "../../../redux/features/history/hisotrySlice";

const formatTime = (seconds: number) => {
  // const h = Math.floor(seconds / 3600)
  //   .toString()
  //   .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

interface ControlPanelProp {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  progressing: number;
  duration: number;
  playRef: RefObject<ReactPlayer | null>;
  setProgressing: (progressing: number) => void;
}

interface TypeBtn {
  name: string;
  total: number;
}

const ControlPanel = ({
  isPlaying,
  setIsPlaying,
  progressing,
  duration,
  playRef,
  setProgressing,
}: ControlPanelProp) => {
  const [typeBtns, setTypeBtns] = useState<TypeBtn[]>([
    { name: "VA", total: 0 },
    { name: "NVA", total: 0 },
    { name: "SKIP", total: 0 },
  ]);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [typeBtnIndex, setTypeBtnIndex] = useState<number | null>(null);

  const selectedId = useAppSelector((state) => state.progressStage.selectedId);
  const activeId = useAppSelector((state) => state.stagelist.activeId);
  const cycleTimeId = useAppSelector(
    (state) => state.progressStage.cycleTimeId
  );

  // const state = useAppSelector((state) => state.progressStage.stages);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    if (isPlaying) {
      setEndTime(progressing);
    } else {
      setStartTime(progressing);
    }
    setIsPlaying(!isPlaying);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (playRef.current) {
      playRef.current.seekTo(value);
    }
    setProgressing(value);
  };

  const handleTypeBtnClick = (index: number) => {

    setTypeBtnIndex(index);
    const typeVal = endTime - startTime;
    dispatch(addHistory({startTime, endTime, label: typeBtns[index].name}))
    setTypeBtns((prev) =>
      prev.map((type, i) =>
        i === index
          ? {
              ...type,
              total: (type.total || 0) + typeVal,
            }
          : type
      )
    );
  };

  const handleDone = () => {
    // console.log(Math.round(Math.random() * 2));
    const valVA = Math.round(typeBtns[0].total);
    const valNVA = Math.round(typeBtns[1].total);

    dispatch(
      updateProgressStage({
        activeId,
        id: selectedId,
        payloadVA: {
          typeVA: "VA",
          ctVA: `CT${Number(cycleTimeId ?? 0) + 1}`,
          valueVA: valVA,
        },
        payloadNVA: {
          typeNVA: "NVA",
          ctNVA: `CT${Number(cycleTimeId ?? 0) + 1}`,
          valueNVA: valNVA,
        },
      })
    );

    setTypeBtns([
      { name: "VA", total: 0 },
      { name: "NVA", total: 0 },
      { name: "SKIP", total: 0 },
    ]);
  };

  return (
    <div className="h-1/4 flex flex-col text-primary-50 gap-2">
      <div className="flex-1">
        <div className="w-full h-full flex justify-center items-center gap-2">
          <div
            className={`px-3 py-1 bg-primary-700 rounded-md font-semibold text-xl w-20 text-center flex-1 ${
              cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {formatTime(progressing)}
          </div>

          <button
            type="button"
            className={`${
              isPlaying ? "bg-red-600" : "bg-blue-600"
            } font-semibold rounded-lg text-sm px-4 py-2 uppercase flex justify-center items-center gap-1 flex-1 ${
              cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleToggle}
            disabled={cycleTimeId === null ? true : false}
          >
            {isPlaying ? (
              <>
                <FaPause />
                Stop
              </>
            ) : (
              <>
                <FaPlay />
                Start
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={cycleTimeId === null ? true : false}
            className={`bg-green-600 ${
              cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
            } font-semibold rounded-lg text-sm px-4 py-2 uppercase flex justify-center items-center gap-1 flex-1`}
          >
            <FaCircleCheck />
            Done
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full h-full flex justify-center gap-2">
          {typeBtns.map((type, index) => (
            <div
              className="flex-1 flex justify-evenly items-center border border-primary-700 rounded-md font-semibold"
              key={index}
            >
              <button
                type="button"
                className={`flex-1 h-full rounded-md ${
                  index === typeBtnIndex ? "bg-primary-500" : "bg-primary-700"
                } ${
                  cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => handleTypeBtnClick(index)}
                disabled={cycleTimeId === null ? true : false}
              >
                {type.name}
              </button>
              <div
                className={`flex-1 text-center text-lg ${
                  cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {Math.round(type.total || 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div
          className={`w-full h-full flex justify-evenly items-center gap-1 ${
            cycleTimeId === null ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <p className="font-semibold text-lg w-12">
            {formatTime(progressing)}
          </p>
          <input
            type="range"
            className="w-[70%] outline-none accent-slate-200"
            value={progressing}
            min={0}
            max={duration}
            // step={0.1}
            onChange={handleChange}
            disabled={cycleTimeId === null ? true : false}
          />
          <p className="font-semibold text-lg w-12">{formatTime(duration)}</p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
