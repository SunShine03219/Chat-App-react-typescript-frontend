// authService.ts

import { toast } from "react-toastify";

import { Room } from "@/types/types";
import {
    ROOM_CREATE_URL,
    ROOM_GETS_URL,
    ROOM_REMOVE_URL,
    ROOM_UPDATE_URL,
} from "@/utils/endpoints";

const createRoom = async (room: Room) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
    };
    return await fetch(ROOM_CREATE_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
            toast.success(
                `Created the '${room.room}' room by ${room.owner} successfully!`,
            );
            return response.rooms;
        });
};

const updateRoom = async (room: Room) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
    };
    return await fetch(ROOM_UPDATE_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response.rooms;
        });
};

const gets = async () => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return fetch(ROOM_GETS_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response.rooms;
        });
};

const removeRoom = async (room: Room) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
    };
    return await fetch(ROOM_REMOVE_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
            toast.success(
                `Removed the '${room.room}' room by ${room.owner} successfully!`,
            );
            return response.rooms;
        });
};

const handleResponse = async (response: Response) => {
    const isJson = response.headers
        ?.get("content-type")
        ?.includes("application/json");
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
        const err = data ? data.message : response.statusText;
        toast.error(err);
        return Promise.reject(err);
    }
    return data;
};

const roomService = {
    createRoom,
    updateRoom,
    gets,
    removeRoom,
};

export default roomService;
