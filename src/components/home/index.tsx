"use client";
import React from "react";
import { useRouter } from "next/router";

import { Button, TextField } from "@mui/material";
import { ThemeContainer } from "../UI";

import style from "@/styles/home.module.scss";
import { JOIN_ROOM_ROUTE } from "@/utils/routes";
import { User } from "@/types/types";
import { setGlobalUser } from "@/store/index.backup2";
import { useDispatch } from "react-redux";

export const Home: React.FC = () => {
    //
    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = React.useState<User>({
        username: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({username: e.target.value})
    }

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const canLogin = user.username !== "" && user.username !== null;
        if (canLogin) {
            dispatch(setGlobalUser(user.username));
            router.push(JOIN_ROOM_ROUTE);
        }
    };

    return (
        <ThemeContainer>
            <div className={style.content}>
                <div className={style.center}>
                    <div className={style.title}>Welcome to Chatify:</div>
                    <div className={style.description}>
                        Connect and Chat with Friends
                    </div>
                </div>
                <TextField
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Enter a your nickname"
                />
                <Button
                    onClick={handleLogin}
                    variant="outlined"
                >
                    Login
                </Button>
            </div>
        </ThemeContainer>
    );
};
