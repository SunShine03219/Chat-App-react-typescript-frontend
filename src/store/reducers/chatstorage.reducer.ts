import { Room } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface ChatStorageType {
    username?: string | null;
    room?: Room | null;
    socket?: Socket | null;
}

const initState: ChatStorageType = {
    username: null,
    room: null,
    socket: null,
};

export const chatStorageReducer = createSlice({
    name: "chatStorage",
    initialState: initState,
    reducers: {
        setGlobalUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setGlobalRoom: (state, action: PayloadAction<Room | undefined>) => {
            state.room = action.payload;
        },
        setGlobalSocket: (
            state,
            action: PayloadAction<Socket | null | undefined>,
        ) => {
            //state.socket = action.payload;
        },
    },
});

export const { setGlobalUser, setGlobalRoom, setGlobalSocket } =
    chatStorageReducer.actions;
export default chatStorageReducer.reducer;
