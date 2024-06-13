/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { notifications } from "@mantine/notifications";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../lib/axios.config";
import { User } from "../types";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logginIn: boolean;
    register: (name: string, email: string, password: string) => void;
    registering: boolean;
    logout: () => void;
    loggingOut: boolean;
    resetPassword: (oldPassword: string, newPassword: string) => void;
    resettingPassword: boolean;
    updateProfile: (name: string, email: string) => void;
    initialLoading: boolean;
    updatingProfile: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            setInitialLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/users/me");
                setUser(data.user);
            } catch (error) {
                setUser(null);
                if (location.pathname.includes("/dashboard")) {
                    navigate("/login");
                }
            } finally {
                setInitialLoading(false);
            }
        };
        fetchUser();
    }
        , [location.pathname, user]);

    const login = async (email: string, password: string) => {
        setLoggingIn(true);
        try {
            const { data } = await axios.post("/users/login", {
                email,
                password,
            });
            setUser(data.user);
            notifications.show({
                title: "Success",
                message: "Logged in successfully",
                color: "green",
            });
            navigate("/dashboard");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Invalid email or password",
                color: "red",
            });
        } finally {
            setLoggingIn(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setRegistering(true);
        try {
            const { data } = await axios.post("/users/register", {
                name,
                email,
                password,
            });
            notifications.show({
                title: "Success",
                message: "Account created successfully",
                color: "green",
            });
            setUser(data.user);
            navigate("/dashboard");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red",
            });
        } finally {
            setRegistering(false);
        }
    };


    const logout = async () => {
        setLoggingOut(true);
        try {
            await axios.post("/users/logout");
            setUser(null);
            notifications.show({
                title: "Success",
                message: "Logged out successfully",
                color: "green",
            });
            navigate("/login");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red",
            });
        } finally {
            setLoggingOut(false);
        }
    };

    const resetPassword = async (oldPassword: string, newPassword: string) => {
        setResettingPassword(true);
        try {
            await axios.post("/users/reset-password", {
                oldPassword,
                newPassword,
            });
            notifications.show({
                title: "Success",
                message: "Password reset successfully",
                color: "green",
            });
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Invalid old password",
                color: "red",
            });
        } finally {
            setResettingPassword(false);
        }
    };

    const updateProfile = async (name: string, email: string) => {
        setUpdatingProfile(true);
        try {
            const { data } = await axios.post("/auth/update-profile", {
                name,
                email,
            });
            setUser(data.user);
            notifications.show({
                title: "Success",
                message: "Profile updated successfully",
                color: "green",
            });
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red",
            });
        } finally {
            setUpdatingProfile(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logginIn: loggingIn, register, registering, logout, loggingOut, resetPassword, resettingPassword, updateProfile, updatingProfile, initialLoading }}>
            {children}
        </AuthContext.Provider>
    );

}

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


