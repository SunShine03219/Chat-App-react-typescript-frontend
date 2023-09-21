import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState, Room } from "@/types/types";

const initialState: RoomState = {
    rooms: null,
};

export const roomReducer = createSlice({
    name: "room",
    initialState,
    reducers: {
        updatingRoom: (state, action: PayloadAction<Room[] | null>) => {
            state.rooms = action.payload;
        },
    },
});

export const { updatingRoom } = roomReducer.actions;

export default roomReducer.reducer;
