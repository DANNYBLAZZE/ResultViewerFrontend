import React, {useMemo, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {json} from "react-router-dom";
import clsx from "clsx";
import ViewResult from "../../components/ViewResult";
import {CircularProgress} from "@mui/material";
import useButtonFetch from "../../hooks/useButtonFetch";
import SessionExpired from "../../components/SessionExpired";

export default function LecturerViewResult() {
    const [search, setSearch] = useState("");
    const [matNoInput, setMatNoInput] = useState("");

    const {data, loading, error, triggerFetch} = useButtonFetch(`/api/lecturer/${matNoInput}/get_result`, {
        method: "GET",
        credentials: "include",
    });

    const onSubmit = () => {
        
        // setSearch(`/api/lecturer/${matNoInput}/get_result`);
        triggerFetch();
    };

    console.log("loading", loading);

    return (
        <div className="min-h-screen">
            <div className="bg-white mb-3 rounded-2xl">
                <div className="text-xl font-bold">
                    Enter Matriculation Number
                </div>
                <div className="mt-2 flex flex-wrap gap-2 items-stretch">
                    <input
                        placeholder="Matriculation Number"
                        value={matNoInput}
                        className="bg-gray-100 px-3 py-2 rounded-md min-w-56 w-full md:w-auto"
                        onChange={(ev) => setMatNoInput(ev.target.value)}
                    />
                    <div className="flex gap-1">
                        <button
                            disabled={loading || matNoInput.length == 0}
                            className={clsx("text-white text-center px-3 py-2 flex justify-center items-center rounded-md disabled:cursor-not-allowed disabled:opacity-30")}
                            onClick={() => onSubmit()}
                            style={{backgroundColor: "#17A2B8"}}
                        >
                            Check Result
                        </button>
                        {loading && (
                            <CircularProgress style={{padding: "8px"}} />
                        )}
                    </div>
                </div>
            </div>
            <ViewResult data={data} />
            {
                error && error.message == "Not Authorized" && <SessionExpired/>
            }
        </div>
    );
}
