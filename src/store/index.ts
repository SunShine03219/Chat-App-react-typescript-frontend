import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer, chatStorageReducer, roomReducer } from "./reducers";

export * from "./reducers";
export * from "./actions";

const middleware = [thunk];

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    auth: authReducer.reducer,
    chat: chatStorageReducer.reducer,
    room: roomReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
