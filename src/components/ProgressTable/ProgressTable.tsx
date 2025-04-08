import React, { Fragment, RefObject, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCycleTimeId,
  setSelectedId,
  updateBtnSave,
  updateUserConfirm,
} from "../../redux/features/progressStage/progressStageSlice";
import {
  RiFileExcel2Fill,
  RiCheckFill,
  RiDeleteBin6Fill,
  RiSave2Fill,
} from "react-icons/ri";
import { saveAs } from "file-saver";
// import { excelData } from "../../fake/data";
import axiosClient from "../../api/axiosClient";
import Modal from "../Modal";
import History from "./History";
import ReactPlayer from "react-player";
import { setVideoSrc } from "../../redux/features/stageList/stagelistSlice";

interface ProgressTableProps {
  playRef: RefObject<ReactPlayer | null>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const ProgressTable = ({
  playRef,
  isPlaying,
  setIsPlaying,
}: ProgressTableProps) => {
  const progressData = useAppSelector((state) => state.progressStage.stages);
  const activeId = useAppSelector((state) => state.stagelist.activeId);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const [selectedCell, setSelectedCell] = useState<{
    rowId: number | string | null;
    colId: number | string | null;
  }>({
    rowId: null,
    colId: null,
  });

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false);

  const [textConfirm, setTextConfirm] = useState<string>("");

  useEffect(() => {
    dispatch(setSelectedId(selectedCell.rowId));
    dispatch(setCycleTimeId(selectedCell.colId));
  }, [selectedCell]);

  const handleSelectedCell = (
    rowId: number | string | null,
    colId: number | string | null
  ) => {
    setSelectedCell((prev) =>
      prev.rowId === rowId && prev.colId === colId
        ? { rowId: null, colId: null }
        : { rowId, colId }
    );
  };

  const handleClickSave = (id: number | string) => {
    dispatch(updateBtnSave({ id, activeId }));
  };

  const handleExportExcel = async () => {
    try {
      const data = progressData[activeId].progressStageData;
      // console.log(data);
      const res = await axiosClient.post("/export-excel/excel", data, {
        responseType: "blob",
      });

      if (!res.data) throw new Error("Lỗi khi tải file");

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "data.xlsx");
    } catch (error) {
      console.error("Lỗi tải Excel: ", error);
    }
  };

  const handleClickConfirm = () => {
    const checkStatusBtn = progressData[activeId].progressStageData;
    const checkResult = checkStatusBtn.every(
      (checkStatus) => checkStatus.statusBtn !== false
    );
    if (checkResult) {
      setIsOpenConfirm(true);
      setIsOpenWarning(false);
    } else {
      // console.log("Vui long save tat ca du lieu truoc khi confirm!");
      setIsOpenWarning(true);
      setIsOpenConfirm(false);
    }
  };

  const handleChangeTextConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextConfirm(e.target.value);
  };

  const handleClickConfirmBtn = () => {
    dispatch(updateUserConfirm({ activeId, textConfirm }));
    setIsOpenConfirm(false);
    setIsOpenWarning(false);
  };

  return (
    <>
      <div className="w-full mt-2 flex gap-2">
        <History
          playRef={playRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <div className="flex w-5/6 max-h-[309px] border-separate flex-col overflow-clip">
          <div className="flex justify-between items-center py-2">
            <div className="text-primary-50 text-xl font-semibold">
              Progress
            </div>
            {token && (
              <div className="flex gap-2 justify-center items-center">
                <button
                  type="button"
                  disabled={true}
                  className="bg-red-600 hover:bg-red-700 text-primary-50 font-bold py-2 px-4 rounded flex justify-center items-center gap-1 opacity-50 cursor-not-allowed"
                >
                  <RiDeleteBin6Fill />
                  <span>Delete</span>
                </button>
                <button
                  type="button"
                  className={`${
                    progressData[activeId].progressStageData.every(
                      (item) => item.userConfirm !== ""
                    )
                      ? "opacity-50 cursor-not-allowed"
                      : " hover:bg-blue-700"
                  } bg-blue-600 text-primary-50 font-bold py-2 px-4 rounded flex justify-center items-center gap-1`}
                  onClick={handleClickConfirm}
                  disabled={
                    progressData[activeId].progressStageData.every(
                      (item) => item.userConfirm !== ""
                    )
                      ? true
                      : false
                  }
                >
                  <RiCheckFill /> <span>Confirm</span>
                </button>
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-primary-50 font-bold py-2 px-4 rounded flex justify-center items-center gap-1"
                  onClick={handleExportExcel}
                >
                  <RiFileExcel2Fill /> <span>Export Excel</span>
                </button>
              </div>
            )}
          </div>
          <table className="w-full table-fixed text-primary-50 text-center">
            <thead className="sticky top-0 bg-primary-700">
              <tr>
                <th className="p-2 border">Progress Stage</th>
                <th className="p-2 w-1/6 border">
                  Part Name <br /> Progress Description
                </th>
                <th className="p-2 border">Type</th>
                {[...Array(10)].map((_, i) => (
                  <th key={i} className={`p-2 border `}>
                    CT{i + 1}
                    <br />
                    (in sec)
                  </th>
                ))}
                <th className="p-2 border">
                  Avg CT <br />
                  (in sec)
                </th>
                <th className="p-2 border">ME Confirm</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
          </table>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <table className="w-full table-fixed text-center text-primary-50 text-lg">
              <tbody>
                {progressData[activeId].progressStageData.map(
                  (stageData, index) => (
                    <Fragment key={index}>
                      {stageData.cycleTimes.map((cycleTime, subIndex) => {
                        // const isSelectedRow = selectedRowId === stageData.id;
                        return (
                          <tr
                            key={subIndex}
                            // className={`cursor-pointer ${
                            //   isSelectedRow ? "bg-slate-800" : ""
                            // }`}
                            onClick={() => {
                              setSelectedCell({
                                rowId: stageData.id,
                                colId: null,
                              });
                              dispatch(
                                setVideoSrc({ videoSrc: stageData.videoSrc })
                              );
                            }}
                            className={`cursor-pointer`}
                          >
                            {subIndex === 0 && (
                              <>
                                <td className="border" rowSpan={2}>
                                  {stageData.stage}
                                </td>
                                <td className="w-1/6 border" rowSpan={2}>
                                  {stageData.partName}
                                </td>
                              </>
                            )}
                            <td className="border">{cycleTime.type}</td>
                            {Object.values(cycleTime.cycleTimeItems).map(
                              (value, i) => (
                                <td
                                  key={i}
                                  // className={`border`}
                                  className={`border  ${
                                    selectedCell.rowId === stageData.id &&
                                    selectedCell.colId === i
                                      ? "bg-primary-800"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectedCell(stageData.id, i);
                                  }}
                                >
                                  {value}
                                </td>
                              )
                            )}
                            <td className="border">{cycleTime.avg}</td>

                            {subIndex === 0 && (
                              <td className="border p-1" rowSpan={2}>
                                <p
                                // className={`text-white font-medium rounded-md text-sm px-2 py-1 bg-green-600 hover:bg-green-700`}
                                >
                                  {stageData.userConfirm}
                                </p>
                              </td>
                            )}
                            {subIndex === 0 && (
                              <td className="border p-1" rowSpan={2}>
                                <button
                                  type="button"
                                  className={`text-white ${
                                    stageData.statusBtn
                                      ? "bg-green-600 opacity-50 cursor-not-allowed"
                                      : "bg-green-600 hover:bg-green-700"
                                  } font-medium rounded text-sm px-2 py-1 flex justify-center items-center gap-1`}
                                  onClick={() => handleClickSave(stageData.id)}
                                  disabled={stageData.statusBtn}
                                >
                                  <RiSave2Fill />
                                  <span>Save</span>
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenConfirm && (
        <Modal
          onClose={() => setIsOpenConfirm(false)}
          title="Confirm"
          textBtn="Save"
          handleBtn={handleClickConfirmBtn}
        >
          <div>
            <label
              htmlFor="userid"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Userid
            </label>
            <input
              type="text"
              name="userid"
              id="userid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-none rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Please enter your userid..."
              value={textConfirm}
              onChange={handleChangeTextConfirm}
              autoComplete="off"
            />
          </div>
        </Modal>
      )}
      {isOpenWarning && (
        <Modal
          onClose={() => setIsOpenWarning(false)}
          title="Warning"
          textBtn="Ok"
          handleBtn={() => setIsOpenWarning(false)}
        >
          <p className="text-primary-50">
            Vui long luu tat ca du lieu truoc khi confirm!
          </p>
        </Modal>
      )}
    </>
  );
};

export default ProgressTable;
