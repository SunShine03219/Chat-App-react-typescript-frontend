// authService.ts

import { toast } from "react-toastify";

import { User } from "@/types/types";
import { LOGIN_URL, REGISTER_URL } from "@/utils/endpoints";

const register = async (user: User) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    return await fetch(REGISTER_URL, requestOptions)
        .then(handleResponse)
        .then(() => {
            toast.success("Registered successfully!");
        });
};

const login = async (user: User) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(LOGIN_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
            toast.success("LoggedIn successfully!");
            return response.data;
        });
};

const handleResponse = async (response: Response) => {
    const isJson = response.headers
        ?.get("content-type")
        ?.includes("application/json");
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
        const err = data ? data.message : response.statusText;
        toast.error(err);
        return Promise.reject(err);
    }
    return data;
};

const authService = {
    login,
    register,
};

export default authService;
