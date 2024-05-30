import React, {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useUser} from "../context/UserContext";
import {
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export default function HomePage() {
    const {state, appIsReady} = useUser();
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        console.log("current Path", currentPath);
        if (!appIsReady) return;

        if (currentPath == "/" && state.user) {
            console.log("state", state.user);
            if (state.user.role == "student") navigate("/student/home");
            else navigate("/lecturer/home");
        }
    }, [appIsReady, state]);

    console.log("state", state);

    if (!appIsReady) return;

    return state.user ? <Outlet /> : <Navigate to="/login" />;
}