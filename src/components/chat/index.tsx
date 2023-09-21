"use client";

import React, { ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import roomAction from "@/store/actions/room.action";
import { io, Socket } from "socket.io-client";

import { ThemeContainer } from "../UI";
import { MessageItem } from "./MessageItem";

import { MessageItemType, Room } from "@/types/types";
import { HOME_ROUTE } from "@/utils/routes";
import { API_URL } from "@/utils/endpoints";
import styles from "@/styles/chat.module.scss";

export const Chat: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [text, setText] = React.useState<string>("");
    const [messages, setMessages] = React.useState<MessageItemType[]>([]);

    const { room, username } = useSelector((state: any) => state.chat);

    React.useEffect(() => {
        //
        // create a new socket
        const newSocket = io(API_URL);
        setSocket(newSocket);

        // join a room with room id
        newSocket.emit("joinRoom", room?.room);

        newSocket.on("sendMessage", (message: MessageItemType) => {
            switch (message.type) {
                case "post":
                    setMessages((messages) => [...messages, message]);
                    break;
                case "update":
                    //
                    setMessages((messages) =>
                        messages.map((item) => {
                            if (item.id === message.id) {
                                return {
                                    ...message,
                                    text: message.text,
                                };
                            } else {
                                return item;
                            }
                        }),
                    );
                    break;
                default:
            }
        });
    }, []);

    // event for changing of message input
    const onChnage = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // Send text
    const handleSend = () => {
        const message: MessageItemType = {
            id: Date.now(),
            type: "post",
            sender: username,
            text: text,
        };
        socket?.emit("sendMessage", room?.room, message);
        setText("");
    };

    // press `Enter`
    const pressOnText = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleSend();
        } else if (e.keyCode === 13 && e.shiftKey) {
            e.preventDefault();
        }
    };

    // leave the room
    const handleLeave = () => {
        if (room?.attends.includes(username)) {
            const updatedAttends: string[] = room?.attends.filter(
                (item: string) => item !== username,
            );
            const roomData: Room = {
                room: room.room,
                owner: room.owner,
                attends: updatedAttends,
            };

            dispatch<any>(roomAction.updateRoom(roomData));
        }
        router.push(HOME_ROUTE);
    };

    return (
        <ThemeContainer>
            <div className={styles["content"]}>
                <div className={styles["chat-content"]}>
                    <div className={styles["chat-head"]}>
                        {`Room ID: ${room?.room} (${
                            room?.attends.length ?? 0
                        })`}{" "}
                        <div>{`Joined: ${username}`}</div>
                        <button
                            className={styles["send"]}
                            onClick={handleLeave}
                        >
                            Leave
                        </button>
                    </div>
                    <div className={styles["chat-body"]}>
                        {messages &&
                            messages.map((message, key) => (
                                <MessageItem
                                    key={key}
                                    message={message}
                                    editable={
                                        messages.length - key === 1 &&
                                        username === message.sender
                                    }
                                    socket={socket}
                                    room={room?.room}
                                />
                            ))}
                    </div>
                    <div className={styles["chat-footer"]}>
                        <input
                            className={styles["message-input"]}
                            value={text}
                            onChange={onChnage}
                            onKeyUp={pressOnText}
                        />
                        <button
                            className={styles["send"]}
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </ThemeContainer>
    );
};
