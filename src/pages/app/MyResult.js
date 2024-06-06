import React from "react";
import ViewResult from "../../components/ViewResult";
import {useQuery} from "@tanstack/react-query";
import instance from "../../utils/instance";

export default function MyResult() {
    const {data, error} = useQuery({
        queryKey: ["my-result"],
        queryFn: () => instance.get("/api/student/get_result"),
    });

    return (
        <div className="min-h-screen">
            <ViewResult data={data?.data} />
        </div>
    );
}
