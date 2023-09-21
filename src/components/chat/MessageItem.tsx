"user client";

import React, { ChangeEvent } from "react";
import Avatar from "react-avatar";
import { Socket } from "socket.io-client";
import { MessageItemType } from "@/types/types";

import styles from "@/styles/chat.module.scss";

type MessageProps = {
    message: MessageItemType;
    socket: Socket | null;
    editable: boolean;
    room: string;
};

export const MessageItem: React.FC<MessageProps> = (props) => {
    const { message, editable, socket, room } = props;

    const EDIT = "Edit";
    const SAVE = "SAVE";

    const [editedText, setEditedText] = React.useState(message.text);
    const [buttonText, setButtonText] = React.useState(EDIT);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    };

    React.useEffect(() => {
        setEditedText(message.text);
    }, [message.text]);

    const handleButton = () => {
        if (buttonText === EDIT) {
            setButtonText(SAVE);
        } else {
            setButtonText(EDIT);
            if (socket) {
                const update_message: MessageItemType = {
                    id: message.id,
                    type: "update",
                    sender: message.sender,
                    text: editedText,
                };
                socket.emit("sendMessage", room, update_message);
            }
        }
    };

    return (
        <React.Fragment>
            <div className={styles["message-item"]}>
                <Avatar
                    name={message.sender}
                    size={"30px"}
                    round={true}
                />
                <div className={styles["message-content"]}>
                    <div className={styles["sender"]}>{message.sender}</div>
                    <div className={styles["text"]}>
                        {buttonText === EDIT && (
                            <div className="fixed-text">{editedText}</div>
                        )}
                        {buttonText === SAVE && (
                            <input
                                className={styles["edit-text"]}
                                value={editedText}
                                onChange={onChange}
                            />
                        )}
                    </div>
                </div>
                {editable && (
                    <button
                        className={styles["edit-button"]}
                        onClick={handleButton}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};
