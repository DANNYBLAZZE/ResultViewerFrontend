import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSession} from "../../context/SessionContext";
import {CircularProgress} from "@mui/material";
import clsx from "clsx";

export default function LoginAsStudent() {
    const navigate = useNavigate();
    const {studentSignIn} = useSession();
    const [matNo, setMatNo] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        setLoading(true);
        await studentSignIn(matNo, password)
            .then(() => {
                navigate("/student/home");
            })
            .catch((error) => {
                setError(error.response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col w-screen justify-center p-5 items-center h-screen">
            <div
                className="w-full border-2 px-5 py-4 rounded-lg"
                style={{maxWidth: "500px"}}
            >
                <div className="text-4xl font-bold mb-10">Login Portal</div>

                {error && (
                    <div className="bg-red-400 border-2 border-red-500 px-3 py-2 rounded-md mb-3">
                        {error.message}
                    </div>
                )}
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
                    <button
                        disabled={loading}
                        className={clsx(
                            "w-full text-white mt-5 px-10 py-2 text-center rounded-md",
                            loading &&
                                "pointer-events-none cursor-not-allowed opacity-30"
                        )}
                        onClick={() => onSubmit()}
                        style={{backgroundColor: "#17A2B8"}}
                    >
                        Login
                    </button>
                    <Link to="/login/lecturer">
                        <div
                            className="mt-5 block text-center"
                            style={{color: "#17A2B8"}}
                        >
                            Login as Lectuer
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
