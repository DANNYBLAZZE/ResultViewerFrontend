import React from "react";
import {Outlet, Navigate} from "react-router";
import { useSession } from "../context/SessionContext";

export default function ProtectedRoute() {
    const {state} = useSession();
    console.log("leave");
    
    return (state.user) ? <Outlet /> : <Navigate to="/login"/>;
}
