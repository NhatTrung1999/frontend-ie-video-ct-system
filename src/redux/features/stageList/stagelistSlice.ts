import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";

export interface Item {
  name: string;
  url: string;
}

export interface StageListState {
  name: string;
  items: Item[];
}

export interface InitialStateList {
  stageListStage: StageListState[];
  activeId: number;
  videoSrc: string;
  loading: boolean;
  error: string | null;
}

export const fetchStageList = createAsyncThunk(
  "stageList/fetchStageList",
  async (stageName: string, { rejectWithValue }) => {
    try {
      const paths = localStorage.getItem("paths");

      if (!paths) {
        return rejectWithValue(
          "Khong tim thay du lieu paths trong localStorage"
        );
      }
      const { date, season, article } = JSON.parse(paths);

      const res = await axiosClient.get<Item[]>(`/videos`, {
        params: { date, season, article, area: stageName },
      });
      return { stageName, items: res.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: InitialStateList = {
  stageListStage: [
    { name: "Cutting", items: [] },
    { name: "Stitching", items: [] },
    { name: "Assembly", items: [] },
    { name: "Stockfitting", items: [] },
  ],
  activeId: 0,
  videoSrc: "",
  loading: false,
  error: null,
};

export const stagelistSlice = createSlice({
  name: "stagelist",
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.activeId = id;
    },
    setVideoSrc: (
      state,
      action: PayloadAction<{
        videoSrc: string;
      }>
    ) => {
      const { videoSrc } = action.payload;
      state.videoSrc = videoSrc;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStageList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchStageList.fulfilled,
      (state, action: PayloadAction<{ stageName: string; items: Item[] }>) => {
        const { stageName, items } = action.payload;
        state.loading = false;
        const newStage = state.stageListStage.find(
          (stage) => stage.name === stageName
        );
        if (newStage) {
          newStage.items = items;
        }
      }
    );
    builder.addCase(fetchStageList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Lỗi khi tải dữ liệu!";
    });
  },
});

export const { setActiveId, setVideoSrc } = stagelistSlice.actions;

export default stagelistSlice.reducer;
