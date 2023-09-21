import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { authReducer, chatStorageReducer, roomReducer } from "./reducers";

export * from "./reducers";
export * from "./actions";

const rootReducer = combineReducers({
    auth: authReducer.reducer,
    chat: chatStorageReducer.reducer,
    room: roomReducer.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
