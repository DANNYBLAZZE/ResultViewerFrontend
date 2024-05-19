import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginAsLecturer() {
    const {lecturerSignIn} = useUser();
    const navigate = useNavigate();

    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async () => {
        await lecturerSignIn(staffId, password);
        navigate("/lecturer/home");
    }

    return (
        <div className="flex flex-col w-screen justify-center p-5 items-center h-screen">
            <div className="w-full border-2 px-5 py-4 rounded-lg" style={{maxWidth: "500px"}}>
                <div className="text-4xl font-bold mb-12">
                    Login Portal
                </div>
                <div className="w-full px-3">
                    <div className="font-bold text-lg">Lectuer</div>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <div>Staff Id</div>
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-md"
                                value={staffId}
                                onChange={(ev) => setStaffId(ev.target.value)}
                                placeholder="Staff Id"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Password</div>
                            <input
                                placeholder="Password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="bg-gray-100 px-3 py-2 rounded-md"
                            />
                        </div>
                    </div>
                        <div
                            className="text-white mt-5 px-10 py-2 text-center rounded-md"
                            onClick={() => onSubmit()}
                            style={{backgroundColor: "#17A2B8"}}
                        >
                            Login
                        </div>
                    <div className="mt-5 text-center" style={{color: "#17A2B8"}} onClick={() => navigate("/login/student")}>Login as Student</div>
                </div>
            </div>
        </div>
    );
}
