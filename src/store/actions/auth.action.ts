import { User } from "@/types/types";
import { AppDispatch } from "../../store";
import { loginSuccess } from "../reducers";
import authService from "../services/auth.service";

const register = (newUser: User) => async (dispatch: AppDispatch) => {
    try {
        await authService.register(newUser);
    } catch (error) {}
};
const login = (loginUser: User) => async (dispatch: AppDispatch) => {
    try {
        const { user, token } = await authService.login(loginUser);
        dispatch(loginSuccess(user));
    } catch (error) {}
};

const authAction = {
    register,
    login,
};

export default authAction;
