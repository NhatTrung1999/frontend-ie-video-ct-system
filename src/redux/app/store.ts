import { configureStore } from "@reduxjs/toolkit";
import {authReducer, infoReducer, stagelistReducer, progressStageReducer, historyReducer} from '../features'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    info: infoReducer,
    stagelist: stagelistReducer,
    progressStage: progressStageReducer,
    history: historyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
