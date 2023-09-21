interface MessageProps {
    message: {
        sender: string;
        text: string;
    };
}

export interface User {
    id?: number;
    username: string;
    email?: string;
    password?: string;
    token?: string | null | undefined;
}

export interface Room {
    id?: number;
    room: string | undefined;
    owner: string | undefined;
    attends?: string[] | undefined;
}

interface AuthState {
    username: string | null;
}

interface RoomState {
    rooms: Room[] | null;
}

export interface MessageItemType {
    id: number;
    type: "post" | "update";
    sender: string;
    text?: string;
}
