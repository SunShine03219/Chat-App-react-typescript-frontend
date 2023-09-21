"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//
import { ThemeContainer } from "../UI";
// store
import { RootState } from "@/store";
import authAction from "@/store/actions/auth.action";
//
import { User } from "@/types/types";
import { JOIN_ROOM_ROUTE } from "@/utils/routes";

export const Login: React.FC = () => {
    const router = useRouter();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
        useDispatch();

    const { loggingIn, loggedIn } = useSelector(
        (state: any) => state.persisted.auth,
    );

    React.useEffect(() => {
        if (loggedIn) {
            router.push(JOIN_ROOM_ROUTE);
        }
    }, [loggedIn]);

    console.log({ loggingIn, loggedIn });

    const [user, setUser] = React.useState<User>({ username: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const canLogin = user.email && user.password;
        if (canLogin) {
            dispatch(authAction.login(user));
        }
    };

    return (
        <ThemeContainer>
            <Container
                component="main"
                maxWidth="xs"
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Link href="/">
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Link>
                    <Typography
                        component="h1"
                        variant="h5"
                    >
                        Login
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={user.email}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid
                                item
                                xs
                            ></Grid>
                            <Grid item>
                                <Link
                                    href="/register"
                                    variant="body2"
                                >
                                    {"Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeContainer>
    );
};
