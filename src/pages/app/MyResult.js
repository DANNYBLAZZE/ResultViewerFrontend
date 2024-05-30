import React, {useMemo} from "react";
import useFetch from "../../hooks/useFetch";
import ViewResult from "../../components/ViewResult";
import SessionExpired from "../../components/SessionExpired";

export default function MyResult() {
    const {data, error} = useFetch("/api/student/get_result", {
        method: "GET",
        credentials: "include",
    });
    return (
        <div className="min-h-screen">
            <ViewResult data={data} />
            {error && error.message == "Not Authorized" && <SessionExpired />}
        </div>
    );
}
