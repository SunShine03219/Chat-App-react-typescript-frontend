"use client";

import * as React from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
    Container,
    FormControl,
    InputLabel,
    Select,
    TextField,
} from "@mui/material";
import { ThemeContainer } from "../UI";

import { setGlobalRoom } from "@/store";
import roomAction from "@/store/actions/room.action";

import { Room } from "@/types/types";
import { CHAT_ROUTE } from "@/utils/routes";
import { API_URL } from "@/utils/endpoints";

import style from "@/styles/join-room.module.scss";

export const JoinRoom: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    //
    const username = useSelector((state: any) => state.chat.username);
    const rooms: Room[] = useSelector((state: any) => state.room.rooms);

    const [room, setRoom] = React.useState<Room | undefined>(undefined);

    const [roomId, setRoomId] = React.useState<string>("");
    const [newRoom, setNewRoom] = React.useState<string>("NewRoom");
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [roomName, setRoomName] = React.useState<string[]>([]);

    // connect server
    React.useEffect(() => {
        const newSocket = io(API_URL); // Replace with your server URL
        setSocket(newSocket);
    }, []);

    React.useEffect(() => {
        dispatch<any>(roomAction.gets());
    }, []);

    React.useEffect(() => {
        setRoom(rooms?.find((room) => room.room === roomId));
    }, [roomId]);

    /// Events
    const handleChangeMultiple = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setRoomName(value);
        setRoomId(value[0]);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoom(e.target.value.trim());
    };

    const canCreate = username !== null && newRoom !== "";
    const canRemove =
        room?.owner === username && (roomId !== "" || roomId !== null);
    const canJoin = username !== null && (roomId !== "" || roomId !== null);

    // create
    const handleCreateRoom = () => {
        // checking the room
        const existRoom = rooms?.find((room) => room.room === newRoom);
        if (existRoom) {
            return toast.warning(
                "That room is existing already. Please use other name.",
            );
        }

        const existOwner = rooms?.find((room) => room.owner === username);
        if (existOwner) {
            return toast.warning(
                "That user created a room already. Please the room list",
            );
        }

        if (canCreate) {
            const roomData: Room = {
                room: newRoom,
                owner: username,
            };
            dispatch<any>(roomAction.createRoom(roomData));
        }
    };

    // delete room
    const handleRemoveRoom = () => {
        if (canRemove) {
            const roomData: Room = {
                room: roomId,
                owner: username,
            };
            dispatch<any>(roomAction.removeRoom(roomData));
        }
    };

    // join
    const handleJoinRoom = () => {
        if (socket && canJoin) {
            if (!(room?.attends ?? []).includes(username)) {
                const updatedAttends: string[] | undefined = [
                    ...(room?.attends ?? []),
                    username,
                ];

                const roomData: Room = {
                    room: room?.room,
                    owner: room?.owner,
                    attends: updatedAttends,
                };

                dispatch<any>(roomAction.updateRoom(roomData));
                dispatch(setGlobalRoom(roomData));
            }
            //socket.emit("joinRoom", roomId);
            router.push(CHAT_ROUTE);
        }
    };

    return (
        <ThemeContainer>
            <Container className={style.join_room}>
                <Box className={style.join_room_body}>
                    <Box className={style.join_room_title}>
                        <Typography
                            component="h1"
                            variant="h4"
                            p="2"
                        >
                            Join Room
                        </Typography>
                    </Box>
                    <Box color={"#bbb"}>
                        <Typography
                            component="h4"
                            p="2"
                        >
                            Nickname: <b>{username}</b>
                        </Typography>
                        <Typography
                            component="h4"
                            p="2"
                        >
                            Room: <b>{roomId}</b>
                        </Typography>
                        <Typography
                            component="h4"
                            p="2"
                        >
                            Server: {socket?.connected ? "On" : "Off"}
                        </Typography>
                    </Box>
                    <Box justifyContent={"center"}>
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            maxWidth={"600px"}
                            gap={5}
                        >
                            <Grid
                                container
                                flexGrow={1}
                                // xs={"auto"}
                                gap={1}
                            >
                                <FormControl fullWidth>
                                    <InputLabel
                                        shrink
                                        htmlFor="select-multiple-native"
                                    >
                                        {`Rooms`}
                                    </InputLabel>
                                    <Select
                                        multiple
                                        native
                                        value={roomName}
                                        // @ts-ignore Typings are not considering `native`
                                        onChange={handleChangeMultiple}
                                        label="Rooms"
                                        inputProps={{
                                            id: "select-multiple-native",
                                        }}
                                    >
                                        {rooms &&
                                            rooms?.map((room, key: number) => (
                                                <option
                                                    key={key}
                                                    value={room.room}
                                                >
                                                    {`${room.room}`} {"   "}
                                                    {`(by created ${room.owner})`}
                                                </option>
                                            ))}
                                    </Select>
                                </FormControl>
                                <Grid
                                    container
                                    gap={1}
                                    justifyContent={"end"}
                                >
                                    <TextField
                                        value={newRoom}
                                        onChange={onChange}
                                        size="small"
                                    />
                                    <Button
                                        onClick={handleCreateRoom}
                                        variant="outlined"
                                        size="large"
                                        disabled={!canCreate}
                                    >
                                        Create Room
                                    </Button>
                                    <Button
                                        onClick={handleRemoveRoom}
                                        variant="outlined"
                                        size="large"
                                        disabled={!canRemove}
                                        color="error"
                                    >
                                        Remove Room
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                flexGrow={1}
                                // xs={"auto"}
                                justifyContent={"end"}
                                gap={1}
                            >
                                <FormControl fullWidth>
                                    <InputLabel
                                        shrink
                                        htmlFor="select-multiple-native"
                                    >
                                        {"Joined at the room"}
                                    </InputLabel>
                                    <Select
                                        multiple
                                        native
                                        // @ts-ignore Typings are not considering `native`
                                        label="Joined at the room"
                                        inputProps={{
                                            id: "select-multiple-native",
                                        }}
                                    >
                                        {room?.attends &&
                                            room?.attends?.map((user, key) => (
                                                <option
                                                    key={key}
                                                    value={user}
                                                >
                                                    {user}
                                                </option>
                                            ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    onClick={handleJoinRoom}
                                    variant="outlined"
                                    disabled={!canJoin}
                                    size="large"
                                >
                                    Join Room
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeContainer>
    );
};
