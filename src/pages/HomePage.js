import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSession} from "../context/SessionContext";

export default function HomePage() {
    const {state, appIsReady} = useSession();
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (!appIsReady) return;

        // this redirects the user to the appropriate home page based on their role
        if (currentPath == "/" && state.user) {
            if (state.user.role == "student") navigate("/student/home");
            else navigate("/lecturer/home");
        }
    }, [appIsReady, state]);

    if (!appIsReady) return;

    return state.user ? <Outlet /> : <Navigate to="/login" />;
}
