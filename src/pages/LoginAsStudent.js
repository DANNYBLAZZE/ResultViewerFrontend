import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginAsStudent() {
    const {studentSignIn} = useUser();
    const navigate = useNavigate();

    const [matNo, setMatNo] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async () => {
        await studentSignIn(matNo, password);
        navigate("/");
    }



    return (
        <div className="flex flex-col w-screen justify-center p-5 items-center h-screen">
            <div className="w-full border-2 px-5 py-4 rounded-lg" style={{maxWidth: "500px"}}>
                <div className="text-4xl font-bold mb-12">
                    Login Portal
                </div>
                <div className="w-full px-3">
                    <div className="font-bold text-lg">Student</div>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <div>Matriculation Number</div>
                            <input
                                className="bg-gray-100 px-3 py-2 rounded-md"
                                value={matNo}
                                onChange={(ev) => setMatNo(ev.target.value)}
                                placeholder="Matriculation Number"
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
                    <div className="mt-5 text-center" style={{color: "#17A2B8"}} onClick={() => navigate("/login/lecturer")}>Login as Lectuer</div>
                </div>
            </div>
        </div>
    );
}
