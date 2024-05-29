import React, {useMemo} from "react";
import useFetch from "../hooks/useFetch";
import {json} from "react-router-dom";
import clsx from "clsx";
import ViewResult from "../components/ViewResult";

export default function MyResult() {
    const {data} = useFetch("/api/student/get_result", {
        method: "GET",
        credentials: "include",
    });
    return (
        <div className="min-h-screen">
            <ViewResult data={data} />
        </div>
    );
}
