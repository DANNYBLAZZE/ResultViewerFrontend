import React, {useState} from "react";
import clsx from "clsx";
import ViewResult from "../../components/ViewResult";
import {CircularProgress} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import instance from "../../utils/instance";

const fetchStudentResult = (matNo) => {
    return instance.get(`/api/lecturer/${matNo}/get_result`);
};

export default function LecturerViewResult() {
    const [search, setSearch] = useState("");
    const [matNoInput, setMatNoInput] = useState("");

    const {data, error, isLoading, isFetching, refetch} = useQuery({
        queryKey: ["lecturer-view-result", matNoInput],
        queryFn: () => fetchStudentResult(matNoInput),
        enabled: false, 
        refetchOnWindowFocus: false,
        placeholderData: previousData => previousData,
        gcTime: 0
    });

    const canSend = isLoading || isFetching;

    console.log(isFetching);
    const onSubmit = () => {
        setSearch(search);
        refetch();
    }

    console.log(isLoading);

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
                            disabled={canSend || matNoInput.length == 0}
                            className={clsx(
                                "text-white text-center px-3 py-2 flex justify-center items-center rounded-md disabled:cursor-not-allowed disabled:opacity-30"
                            )}
                            onClick={() => onSubmit()}
                            style={{backgroundColor: "#17A2B8"}}
                        >
                            Check Result
                        </button>
                        {canSend && (
                            <CircularProgress style={{padding: "8px"}} />
                        )}
                    </div>
                </div>
            </div>
            <ViewResult data={data?.data} />
        </div>
    );
}
