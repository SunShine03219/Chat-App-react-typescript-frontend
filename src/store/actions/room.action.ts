import { AppDispatch } from "../../store";
import roomService from "../services/room.service";
import { updatingRoom } from "../reducers/room.reducer";
import { Room } from "@/types/types";

const createRoom = (room: Room) => async (dispatch: AppDispatch) => {
    try {
        const rooms = await roomService.createRoom(room);
        dispatch(updatingRoom(rooms));
    } catch (error) {}
};

const updateRoom = (room: Room) => async (dispatch: AppDispatch) => {
    try {
        const rooms = await roomService.updateRoom(room);
        console.log("res", rooms);
        dispatch(updatingRoom(rooms));
    } catch (error) {}
};

const gets = () => async (dispatch: AppDispatch) => {
    try {
        const rooms = await roomService.gets();
        dispatch(updatingRoom(rooms));
    } catch (error) {}
};

const removeRoom = (room: Room) => async (dispatch: AppDispatch) => {
    try {
        const rooms = await roomService.removeRoom(room);
        dispatch(updatingRoom(rooms));
    } catch (error) {}
};

const roomAction = {
    createRoom,
    updateRoom,
    gets,
    removeRoom,
};

export default roomAction;
