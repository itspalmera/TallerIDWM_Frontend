"use client";

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";
import { getUserFromToken } from "@/helpers/decodeJWT";

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;

}


const authInitialState: AuthState = {
    status: 'checking',
    user: null
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const auth = (user: User) => {
        dispatch({ type: 'auth', payload: { user } });
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'logout' });
    }

    const updateUser = (user: User) => {
        dispatch({ type: 'updateUser', payload: { user } });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Token found:", token);
            const user = getUserFromToken(token);
            if (user) {
                dispatch({ type: 'auth', payload: { user } });
            } else {
                dispatch({ type: 'non-authenticated' });
            }
        } else {
            console.log("No token found, setting status to non-authenticated");
            dispatch({ type: 'non-authenticated' });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                logout,
                auth,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}