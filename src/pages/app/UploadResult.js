import React, {useState} from "react";
import {CircularProgress} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import instance from "../../utils/instance";

const uploadResults = (formData) => {
    return instance.post("/api/lecturer/upload-result", formData);
};

export default function UploadResult() {
    const [selectedFile, setSelectedFile] = useState(null);

    const {
        mutate,
        data,
        error,
        isPending: loading,
    } = useMutation({mutationFn: (formData) => uploadResults(formData)});

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const onSubmit = () => {
        // if (!selectedFile) return;
        uploadFile(selectedFile);
    };

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append("results", file);
        mutate(formData);
    };

    console.log(error);

    return (
        <div>
            <div className="flex flex-wrap gap-3">
                <div className="text-xl w-full md:w-auto">Select file</div>
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <div className="flex gap-1  mt-3 items-stretch">
                <button
                    disabled={loading}
                    className="text-white  inline-block text-center px-3 py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => onSubmit()}
                    style={{backgroundColor: "#17A2B8"}}
                >
                    Upload Result
                </button>
                {loading && <CircularProgress style={{padding: "8px"}} />}
            </div>
            {data && (
                <div className="bg-green-200 mt-5 px-4 py-2 rounded-md border-2 border-green-500">
                    {data.data.message}
                </div>
            )}

            {error && (
                <div className="bg-red-200 mt-5 px-4 py-2 rounded-md border-2 border-red-500">
                    {error.response.data.message}
                </div>
            )}
        </div>
    );
}
