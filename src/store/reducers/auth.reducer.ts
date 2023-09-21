import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/types";

const initialState: AuthState = {
    username: null,
};

export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.username = action.payload.username;
        },
    },
});

export const { loginSuccess } = authReducer.actions;

export default authReducer.reducer;
