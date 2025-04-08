import { useAppSelector } from "../../redux/hooks";

const History = () => {
  const historyState = useAppSelector((state) => state.history);

  return (
    <div className="w-1/4 border h-[309px] border-primary-400">
      <div className="flex flex-col h-full">
        <div className="bg-primary-400 px-2 py-3">
          <p className="text-primary-50 text-xl font-semibold">History</p>
        </div>
        <div className="border border-red-500 flex-1">
          {historyState.map((history, index) => (
            <div key={index} className="flex items-center gap-3">
              <div>{history.startTime}</div>
              <div>{history.endTime}</div>
              <div>{history.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
