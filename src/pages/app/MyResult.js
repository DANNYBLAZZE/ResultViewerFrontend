import React, {useMemo} from "react";
import ViewResult from "../../components/ViewResult";
import SessionExpired from "../../components/SessionExpired";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function MyResult() {
    const {data, error} = useQuery({
        queryKey: ["my-result"],
        queryFn: () => axios.get("/api/student/get_result", {
            credentials: "include",
        }),
    });

    console.log("data",data);

    return (
        <div className="min-h-screen">
            <ViewResult data={data?.data} />
            {error && error.message == "Not Authorized" && <SessionExpired />}
        </div>
    );
}
