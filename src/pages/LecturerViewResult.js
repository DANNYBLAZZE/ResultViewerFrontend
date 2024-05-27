import React, {useMemo, useState} from "react";
import useFetch from "../hooks/useFetch";
import {json} from "react-router-dom";
import clsx from "clsx";
import ViewResult from "../components/ViewResult";
import { CircularProgress } from "@mui/material";

export default function LecturerViewResult() {
    const [search, setSearch] = useState("");
    const [matNoInput, setMatNoInput] = useState("");

    const {data} = useFetch(search, {
        method: "GET",
        credentials: "include",
    });

    const onSubmit = () => {
        setSearch(`/api/lecturer/${matNoInput}/get_result`);
    };

    return (
        <div className="bg-gray-100 p-3 h-screen">
            <div className="bg-white p-3 mb-3 rounded-2xl">
                <div className="text-xl font-bold">
                    Enter Matriculation Number
                </div>
                <div className="mt-2 flex gap-2 items-stretch">
                    <input
                        placeholder="Matriculation Number"
                        value={matNoInput}
                        className="bg-gray-100 px-3 py-2 rounded-md"
                        onChange={(ev) => setMatNoInput(ev.target.value)}
                    />
                    <div className="flex">
                        <div
                            className="text-white text-center px-3 flex justify-center items-center rounded-md"
                            onClick={() => onSubmit()}
                            style={{backgroundColor: "#17A2B8"}}
                        >
                            Check Result
                        </div>
                        <CircularProgress/>
                    </div>
                </div>
            </div>
            <ViewResult data={data} />
        </div>
    );
}
