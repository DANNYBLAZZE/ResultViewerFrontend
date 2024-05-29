import React, {useEffect, useLayoutEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {useUser} from "../context/UserContext";
import {LogOutOutline} from "react-ionicons";
import {ArrowBackOutline} from "react-ionicons";

export default function Navigation({nav, name}) {
    const [currentNav, setCurrentNav] = useState(0);
    const [navBarOpen, setNavBarOpen] = useState(false);
    const location = useLocation();
    const {signOut} = useUser();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const path = location.pathname;
        nav.forEach((item, index) => {
            if (item.route == path && currentNav !== index) {
                handleRouteChange(index);
            }
        });
    }, [location]);

    const handleRouteChange = (index) => {
        navigate(nav[index]["route"]);
        setCurrentNav(index);
        setNavBarOpen(false);
    };

    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    const drawerOpen = (open) => {

    };

    return (
        <div className="md:grid md:grid-cols-6">
            <div
                onClick={() => setNavBarOpen(false)}
                className={clsx(
                    "fixed z-20 top-0 left-0 w-screen h-screen",
                    !navBarOpen && "hidden"
                )}
            ></div>
            {/* screen overlay to close drawer */}
            <div
                className={clsx(
                    "fixed bg-white z-40 overflow-hidden h-screen transition-all duration-300 md:static md:col-span-1 flex flex-col items-center border-r-2 ",
                    navBarOpen ? "w-56 px-3 py-2" : "w-0 px-0 py-2", "md:px-3 md:py-2 md:w-auto"
                )}
            >
                <div className="self-end md:hidden hover:bg-gray-200 p-3 rounded-full mb-2" onClick={() => setNavBarOpen(false)}>
                    <ArrowBackOutline height="30px" width="30px"/>
                    {/* <CloseIcon fontSize="large" className="ml-auto w-full" /> */}
                </div>
                <div className="font-bold text-2xl p-3 text-center mt-10 whitespace-nowrap hidden md:block">
                    {name}
                </div>
                <nav className="md:mt-7 w-full flex flex-col gap-4 items-center justify-center">
                    {nav.map((item, index) => {
                        return (
                            <a
                                onClick={() => handleRouteChange(index)}
                                className={clsx(
                                    "px-3 py-2 w-full cursor-pointer rounded-md whitespace-nowrap flex items-center gap-2",
                                    currentNav == index && "text-white"
                                )}
                                style={{
                                    backgroundColor:
                                        currentNav == index &&
                                        "rgba(23, 162, 184)",
                                }}
                            >
                                <div className>
                                    {item.icon(currentNav == index && "white")}
                                </div>
                                <div>{item.name}</div>
                            </a>
                        );
                    })}
                </nav>
                <button
                    onClick={() => handleSignOut()}
                    className=" px-3 py-2 mt-7 w-full whitespace-nowrap text-red-600 flex items-center gap-2"
                >
                    <LogOutOutline color="rgb(220, 38, 38)" />
                    <div>Log Out</div>
                </button>
            </div>
            <div className="md:col-span-5">
                <div className="border-b-2 px-3 py-4 flex gap-4 items-center md:hidden">
                    <div onClick={() => setNavBarOpen(true)}>
                        <MenuIcon />
                    </div>
                    <div className="text-2xl font-bold">{name}</div>
                </div>
                <div className="px-4 py-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
