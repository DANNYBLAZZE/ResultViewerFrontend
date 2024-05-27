import React from "react";
import {Outlet, Navigate} from "react-router";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute() {
    const {state} = useUser();
    console.log("leave");
    
    return (state.user) ? <Outlet /> : <Navigate to="/login"/>;
}
