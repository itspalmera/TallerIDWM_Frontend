"use client";

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";
import { getUserFromToken } from "@/helpers/decodeJWT";
import { AuthService } from "@/services/AuthService";

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    login: (values: { email: string; password: string }) => Promise<User | null>;
    register: (values: any) => Promise<boolean>;
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

    const login = async (values: { email: string; password: string }) => {
        try {
            const { data } = await AuthService.login(values);
            if (!data.success) throw new Error(data.message);
            localStorage.setItem("token", data.data.token);
            const user = getUserFromToken(data.data.token);
            if (user) {
                dispatch({ type: 'auth', payload: { user } });
                return user;
            } else {
                dispatch({ type: 'non-authenticated' });
                return null;
            }
        } catch (error) {
            dispatch({ type: 'non-authenticated' });
            return null;
        }
    };

    const register = async (values: any) => {
        try {
            const { data } = await AuthService.register(values);
            return !!data.success;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = getUserFromToken(token);
            if (user) {
                dispatch({ type: 'auth', payload: { user } });
            } else {
                dispatch({ type: 'non-authenticated' });
            }
        } else {
            dispatch({ type: 'non-authenticated' });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                logout,
                auth,
                updateUser,
                login,      
                register,   
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}