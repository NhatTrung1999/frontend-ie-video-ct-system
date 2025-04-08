import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CycleTimeItems {
  CT1: number;
  CT2: number;
  CT3: number;
  CT4: number;
  CT5: number;
  CT6: number;
  CT7: number;
  CT8: number;
  CT9: number;
  CT10: number;
}

export interface CycleTime {
  type: string;
  cycleTimeItems: CycleTimeItems;
  avg: number;
}

export interface ProgressStageState {
  id: number | string;
  stage: string;
  partName: string;
  cycleTimes: CycleTime[];
  statusBtn: boolean;
  videoSrc: string;
  userConfirm: string;
}

export interface IStages {
  name: string;
  progressStageData: ProgressStageState[];
}

const initialState: {
  stages: IStages[];
  selectedId: number | string | null;
  cycleTimeId: number | string | null;
} = {
  stages: [
    {
      name: "CUTTING",
      progressStageData: [],
    },
    {
      name: "STITCHING",
      progressStageData: [],
    },
    {
      name: "ASSEMBLY",
      progressStageData: [],
    },
    {
      name: "STOCKFITTING",
      progressStageData: [],
    },
  ],
  selectedId: null,
  cycleTimeId: null,
};

export const progressStageSlice = createSlice({
  name: "progressStage",
  initialState,
  reducers: {
    addProgressStage: (
      state,
      action: PayloadAction<{
        activeId: number;
        newProgressStage: ProgressStageState;
      }>
    ) => {
      const { activeId, newProgressStage } = action.payload;
      state.stages[activeId].progressStageData.push(newProgressStage);
    },
    setSelectedId: (state, action: PayloadAction<number | string | null>) => {
      state.selectedId = action.payload;
    },
    setCycleTimeId: (state, action: PayloadAction<number | string | null>) => {
      state.cycleTimeId = action.payload;
    },
    updateProgressStage: (
      state,
      action: PayloadAction<{
        activeId: number;
        id: number | string | null;
        payloadVA: { typeVA: string; ctVA: string; valueVA: number };
        payloadNVA: { typeNVA: string; ctNVA: string; valueNVA: number };
      }>
    ) => {
      const { activeId, id, payloadVA, payloadNVA } = action.payload;

      const stages = state.stages[activeId].progressStageData.find(
        (stage) => stage.id === id
      );
      if (!stages) return;

      const cycleTimeVA = stages.cycleTimes.find(
        (cycleTime) => cycleTime.type === payloadVA.typeVA
      );

      if (cycleTimeVA) {
        cycleTimeVA.cycleTimeItems[
          payloadVA.ctVA as keyof CycleTime["cycleTimeItems"]
        ] = payloadVA.valueVA;
      }

      const cycleTimeNVA = stages.cycleTimes.find(
        (cycleTime) => cycleTime.type === payloadNVA.typeNVA
      );

      if (cycleTimeNVA) {
        cycleTimeNVA.cycleTimeItems[
          payloadNVA.ctNVA as keyof CycleTime["cycleTimeItems"]
        ] = payloadNVA.valueNVA;
      }
    },
    updateBtnSave: (
      state,
      action: PayloadAction<{
        id: number | string;
        activeId: number;
      }>
    ) => {
      const { id, activeId } = action.payload;

      const stage = state.stages[activeId].progressStageData.find(
        (stage) => stage.id === id
      );

      if (!stage) return;

      stage.cycleTimes.forEach((cycleTime) => {
        const ct1 = cycleTime.cycleTimeItems.CT1;

        if (ct1 !== undefined) {
          Object.keys(cycleTime.cycleTimeItems).forEach((key, index) => {
            if (index === 0) return;

            const ctKey = key as keyof CycleTimeItems;
            if (cycleTime.cycleTimeItems[ctKey] === 0) {
              cycleTime.cycleTimeItems[ctKey] =
                ct1 + Math.round(Math.random() * 2);
            }
          });
        }
        const totalCT = Object.values(cycleTime.cycleTimeItems).reduce(
          (sum, val) => sum + val,
          0
        );
        cycleTime.avg = Math.round(totalCT / 10);
      });

      stage.statusBtn = true;
    },
    updateUserConfirm: (
      state,
      action: PayloadAction<{ activeId: number; textConfirm: string }>
    ) => {
      const { activeId, textConfirm } = action.payload;
      state.stages[activeId].progressStageData.map(
        (stage) => (stage.userConfirm = textConfirm)
      );
      console.log(
        JSON.parse(JSON.stringify(state.stages[activeId].progressStageData))
      );
    },
  },
});

export const {
  addProgressStage,
  updateProgressStage,
  setSelectedId,
  setCycleTimeId,
  updateBtnSave,
  updateUserConfirm,
} = progressStageSlice.actions;

export default progressStageSlice.reducer;
