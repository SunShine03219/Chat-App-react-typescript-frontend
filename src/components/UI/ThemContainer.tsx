"use client";
import React from "react";
import {
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

type Props = {
    children?: React.ReactNode;
    className?: string;
};

export const ThemeContainer: React.FC<Props> = ({
    children,
    className,
}: Props): React.ReactElement => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container className={className}>
                <CssBaseline />
                {children}
            </Container>
        </ThemeProvider>
    );
};
