import {useNavigate} from "react-router-dom";
import React from "react";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import MaterialCSS from "./material.css"

export default function SelectUserAccount({setRole, formData, setFormData, roles, changePage, fields, role}) {
    const navigate = useNavigate();

    const onChangeText = (key, value) => {
        setFormData({...formData, [key]: value});
    };

    return (
        <div className="grid place-content-center w-screen h-screen">
            <div
                className="flex flex-col h-screen w-screen items-center justify-center p-5"
                style={{maxWidth: "700px"}}
            >
                <div className="text-4xl font-bold mb-12 self-start">
                    Create Account
                </div>
                <div className="border-2 p-5 flex flex-col gap-1 w-5/6 rounded-lg">
                    <div className="text-gray-500 mb-4 text-lg">Complete the form below</div>
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-row w-full gap-3 justify-between items-center">
                            <div className="flex-1">
                                <div className="mb-2">{fields[role]["fieldName"]}</div>
                                <input
                                    className="w-full bg-gray-100 px-3 py-2 rounded-md"
                                    value={formData.id}
                                    onChange={(ev) => onChangeText("id", ev.target.value)}
                                    placeholder={fields[role]["placeholder"]}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="mb-2">Select Category</div>
                                <Select
                                    value={role}
                                    // sx={{
                                    //     "& .MuiInputBase-root": {
                                    //         width: "100%",
                                    //         backgroundColor: "red"
                                    //     },
                                    // }}
                                    MenuProps={{
                                        classes: {
                                            paper: {
                                                maxHeight: "100px"
                                            }
                                        }
                                    }}
                                    onChange={(ev) => setRole(ev.target.value)}
                                >
                                    {roles.map((item) => {
                                        return (
                                            <MenuItem value={item}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-white px-10 py-2 text-center rounded-md mt-4"
                        onClick={() => changePage(1)}
                        style={{backgroundColor: "#17A2B8"}}
                    >
                        Proceed
                    </div>
                    <div
                        className="ml-auto mt-2"
                        style={{color: "#17A2B8"}}
                        onClick={() => navigate("/login")}
                    >
                        Already have an account?
                    </div>
                </div>
            </div>
        </div>
    );
}
