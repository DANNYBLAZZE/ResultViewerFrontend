import React, {useEffect, useState} from "react";
import clsx from "clsx";
import BlankProfile from "../img/blank-profile.png";
import SessionExpired from "./SessionExpired";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import instance from "../utils/instance";

export default function Profile({fields, profileUrl}) {
    // const {data: userData, error, loading} = useFetch(profileUrl, {method: "GET", credentials: "include"})
    const {
        data: userData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => instance.get(profileUrl, {method: "GET"}),
    });

    
    if (isLoading) return <div></div>;

    console.log("error", error);

    return (
        <div>
            <img
                src={BlankProfile}
                width={120}
                height={50}
                className="rounded-full ml-4 mb-6"
            />
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
                                {userData?.data?.[item.data]}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* {error && error.response.message == "Not Authorized" && <SessionExpired />} */}
        </div>
    );
}
