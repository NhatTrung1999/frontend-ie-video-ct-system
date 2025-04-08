import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

type Segment = {
  start: number;
  end: number;
  label: string;
};

const Test: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  // Lấy thời gian hiện tại của video
  const getCurrentTime = (): number => {
    return playerRef.current?.getCurrentTime() || 0;
  };

  // Khi nhấn Start
  const handleStart = () => {
    const current = getCurrentTime();
    setStartTime(current);
    console.log("Start at:", current.toFixed(2));
  };

  // Khi nhấn Stop
  const handleStop = () => {
    if (startTime === null) {
      alert("Bạn cần nhấn Start trước!");
      return;
    }

    const endTime = getCurrentTime();
    const label = prompt("Nhập tên phân đoạn:");

    if (label && endTime > startTime) {
      setSegments((prev) => [
        ...prev,
        { start: startTime, end: endTime, label },
      ]);
      console.log("Segment created:", { start: startTime, end: endTime, label });
    } else {
      alert("Thời gian không hợp lệ hoặc chưa nhập tên phân đoạn.");
    }

    setStartTime(null);
  };

  // Nhảy đến thời gian cụ thể
  const jumpTo = (time: number) => {
    playerRef.current?.seekTo(time, "seconds");
    setPlaying(true);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <ReactPlayer
        ref={playerRef}
        url="src/assets/video/C4Vamp.MOV" // Đổi URL tại đây
        controls
        playing={playing}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        width="100%"
        height="auto"
      />

      <div className="space-x-2">
        <button onClick={handleStart}>▶️ Start</button>
        <button onClick={handleStop} disabled={startTime === null}>
          ⏹️ Stop
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-4">📋 Danh sách phân đoạn:</h3>
      <ul className="list-disc pl-4">
        {segments.map((seg, idx) => (
          <li key={idx} className="mb-1">
            <strong>{seg.label}</strong>: {seg.start.toFixed(2)}s → {seg.end.toFixed(2)}s
            <button onClick={() => jumpTo(seg.start)} className="ml-2 text-blue-600 underline">
              ▶ Xem
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
