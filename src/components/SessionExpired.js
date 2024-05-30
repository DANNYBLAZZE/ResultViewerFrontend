import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SessionExpired() {
    const navigate = useNavigate();
    const {sessionSignOut} = useUser();

    const onSignOut = () => {
        sessionSignOut();
        navigate("/");
    }

    return (
        <div
            className="fixed z-50 top-0 left-0 w-screen h-screen flex justify-center items-center"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
            <div className="bg-white w-full max-w-96 m-5 p-4 flex flex-col items-center gap-4 rounded-md">
                <div className="text-center text-gray-600">
                    Your session has expired. Don't worry, simply log back in
                </div>
                <button
                    className="w-full text-white px-10 py-2 text-center rounded-md"
                    onClick={() => onSignOut()}
                    style={{backgroundColor: "#17A2B8"}}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
