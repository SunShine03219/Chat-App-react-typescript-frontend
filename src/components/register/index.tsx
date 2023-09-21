"use client";
import * as React from "react";
import { useRouter } from "next/router";

// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeContainer } from "../UI";

//
import { User } from "@/types/types";

export const Register: React.FC = () => {
    //
    const router = useRouter();

    const [user, setUser] = React.useState<User>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const canRegister = user.username && user.email && user.password;
        if (canRegister) {
            //dispatch(authAction.register(user));
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
                        Register
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                            >
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    label="NickName"
                                    autoFocus
                                    value={user.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            ></Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid
                            container
                            justifyContent="flex-end"
                        >
                            <Grid item>
                                <Link
                                    href="/login"
                                    variant="body2"
                                >
                                    Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeContainer>
    );
};
