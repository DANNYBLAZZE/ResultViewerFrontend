import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSession} from "../../context/SessionContext";
import clsx from "clsx";

export default function LoginAsLecturer() {
    const {lecturerSignIn} = useSession();
    const navigate = useNavigate();

    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        setLoading(true);
        await lecturerSignIn(staffId, password)
            .then(() => {
                navigate("/lecturer/home");
            })
            .catch((error) => {
                console.log(error.message);
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
                    <div className="font-bold text-lg">Lecturer</div>
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
                    <button
                        disabled={loading}
                        className={clsx(
                            "w-full text-white mt-5 px-10 py-2 text-center rounded-md",
                            loading && "cursor-not-allowed opacity-30"
                        )}
                        onClick={() => onSubmit()}
                        style={{backgroundColor: "#17A2B8"}}
                    >
                        Login
                    </button>
                    <Link to="/login/student">
                        <div
                            className="mt-5 block text-center"
                            style={{color: "#17A2B8"}}
                        >
                            Login as Student
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
