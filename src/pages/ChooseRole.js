import React, {useState} from "react";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
    const roles = ["STUDENT", "LECTURER"];
    const [role, setRole] = useState("STUDENT");
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate(`/login/${role}`)
    }

    return (
        <div className="grid place-content-center w-screen h-screen">
            <div className="flex flex-col h-screen w-screen items-center justify-center p-5" style={{maxWidth: "500px"}}>
                <div className="text-4xl font-bold mb-12 self-start">
                    Login Portal
                </div>
                <div className="flex flex-col gap-1 w-3/4">
                    <div>
                        <div className="text-lg text-center">
                            SELECT USER CATEGORY
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        <Select
                            value={role}
                            sx={{
                                "& .MuiSelect-root": {
                                    minWidth: 500,
                                },
                            }}
                            onChange={(ev) => setRole(ev.target.value)}
                        >
                            {roles.map((item) => {
                                return <MenuItem value={item}>{item}</MenuItem>;
                            })}
                        </Select>
                        <div
                            className="text-white px-10 py-2 text-center rounded-md"
                            onClick={() => onSubmit()}
                            style={{backgroundColor: "#17A2B8"}}
                        >
                            Go to Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
