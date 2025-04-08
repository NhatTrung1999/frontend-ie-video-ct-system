import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
    startTime: number;
    endTime: number;
    label: string
}

const initialState: HistoryState[] = []

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistory: (state, action: PayloadAction<HistoryState>) => {
            const {startTime, endTime, label} = action.payload
            state.push({startTime, endTime, label})
        }
    }
})

export const {addHistory} = historySlice.actions

export default historySlice.reducer