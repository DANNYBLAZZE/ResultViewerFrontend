import React, {useEffect, useState} from "react";
import {useUser} from "../context/UserContext";
import Results from "./ViewResult";
import StudentNavigation from "./StudentNavigation";
import clsx from "clsx";
import BlankProfile from "../img/blank-profile.png";
import useFetch from "../hooks/useFetch";

export default function Profile({fields, profileUrl}) {
    const {data: userData, loading} = useFetch(profileUrl, {method: "GET", credentials: "include"})

    if (loading) return <div></div>

    return (
        <div>
            <img src={BlankProfile} width={120} height={50} className="rounded-full ml-4 mb-6"/>
            <div className="flex flex-col gap-5">
                {fields.map((item) => {
                    return (
                        <div className="flex flex-row bg-gray-100 px-5 py-2">
                            <div className="min-w-36 font-bold">
                                {item.label}
                            </div>
                            <div
                                className={clsx(
                                    item.label == "Department" && "uppercase"
                                )}
                            >
                                {userData[item.data]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}