import React, {useLayoutEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import clsx from "clsx";
import { useUser } from "../context/UserContext";

export default function StudentNavigation() {
    const [currentNav, setCurrentNav] = useState(0);
    const location = useLocation();
    const {signOut} = useUser();
    const navigate = useNavigate();

    const nav = [
        {
            name: "Profile",
            route: "/student/home",
        },
        {
            name: "My Result",
            route: "/student/my-result",
        },
    ];

    useLayoutEffect(() => {
        const path = location.pathname;
        nav.forEach((item, index) => {
            if (item.route == path && currentNav !== index){
                handleRouteChange(index);
            }
        })
    }, [location])


    const handleRouteChange = (index) => {
        navigate(nav[index]["route"]);
        setCurrentNav(index);
    };

    const handleSignOut = () => {
        signOut();
        navigate("/");
    }

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1 h-screen flex flex-col items-center">
                <div className="font-bold text-2xl p-3 text-center mt-10">
                    Student Portal
                </div>
                <div className="mt-7 flex flex-col gap-4 w-4/5">
                    {nav.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleRouteChange(index)}
                                className="w-full cursor-pointer"
                            >
                                <div
                                    className={clsx(
                                        "pl-3 py-2 rounded-r-md rounded-se-md",
                                        currentNav == index &&
                                            "border-l-4 border-blue-900 bg-blue-50"
                                    )}
                                >
                                    {item.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-7 w-4/5 cursor-pointer" onClick={() => handleSignOut()}>
                    <div className="text-red-600 self-start p-3 ">
                        Log Out
                    </div>
                </div>
            </div>
            <div className="col-span-5">
                <Outlet />
            </div>
        </div>
    );
}
