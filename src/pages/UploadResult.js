import React, {useState} from "react";

export default function UploadResult() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const onSubmit = () => {
        if (!selectedFile) return;
        uploadFile(selectedFile);
    };

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append("results", file);

        fetch("/api/lecturer/upload-result", {
            method: "POST",
            body: formData,
            credentials: "include",
        }).then(() => {
            console.log("success");
        });
    };

    console.log(selectedFile);
    
    return (
        <div>
            <div className="flex flex-wrap gap-3">
                <div className="text-xl w-full md:w-auto">Select file</div>
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <div
                className="cursor-pointer text-white mt-3 inline-block text-center px-3 py-2 rounded-md"
                onClick={() => onSubmit()}
                style={{backgroundColor: "#17A2B8"}}
            >
                Upload Result
            </div>
        </div>
    );
}
