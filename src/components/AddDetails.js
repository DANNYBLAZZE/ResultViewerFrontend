import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../context/UserContext";
import ArrowBack from "@mui/icons-material/ArrowBack";
import clsx from "clsx";

export default function AddDetails({
    changePage,
    role,
    formData,
    setFormData,
    loading,
    error,
    onSubmit,
}) {
    const {lecturerSignIn} = useUser();
    const navigate = useNavigate();

    const onChangeText = (key, value) => {
        setFormData({...formData, [key]: value});
    };

    return (
        <div className="flex flex-col w-screen justify-center p-5 items-center h-screen">
            <div
                className="w-full border-2 px-5 py-4 rounded-lg"
                style={{maxWidth: "500px"}}
            >
                <div onClick={() => changePage(0)} className="mb-4">
                    <span className="p-2 rounded-full hover:bg-gray-100">
                        <ArrowBack />
                    </span>
                </div>
                <div className="w-full px-3">
                    <div className="font-bold text-lg">
                        Enter your information
                    </div>
                    <div className="mt-5 flex flex-col gap-3 mb-5">
                        <div className="flex flex-col gap-2">
                            <div>First Name</div>
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-md"
                                value={formData.firstName}
                                onChange={(ev) =>
                                    onChangeText("firstName", ev.target.value)
                                }
                                placeholder="First Name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Last Name</div>
                            <input
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={(ev) =>
                                    onChangeText("lastName", ev.target.value)
                                }
                                className="bg-gray-100 px-3 py-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Email</div>
                            <input
                                placeholder="Email"
                                value={formData.email}
                                onChange={(ev) =>
                                    onChangeText("email", ev.target.value)
                                }
                                className="bg-gray-100 px-3 py-2 rounded-md"
                            />
                        </div>

                        {role == "STUDENT" && (
                            <div className="flex flex-col gap-2">
                                <div>Department Code</div>
                                <input
                                    placeholder="Department Code"
                                    value={formData.departmentCode}
                                    onChange={(ev) =>
                                        onChangeText(
                                            "departmentCode",
                                            ev.target.value
                                        )
                                    }
                                    className="bg-gray-100 px-3 py-2 rounded-md"
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <div>Password</div>
                            <input
                                placeholder="Password"
                                value={formData.password}
                                onChange={(ev) =>
                                    onChangeText("password", ev.target.value)
                                }
                                className="bg-gray-100 px-3 py-2 rounded-md"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="mt-5 bg-red-400 border-2 border-red-500 px-3 py-2 rounded-md mb-3">
                            {error.message}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className={clsx(
                            "w-full text-white px-10 py-2 text-center rounded-md",
                            loading && "cursor-not-allowed opacity-30"
                        )}
                        onClick={() => onSubmit()}
                        style={{backgroundColor: "#17A2B8"}}
                    >
                        <div>Create Account</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
