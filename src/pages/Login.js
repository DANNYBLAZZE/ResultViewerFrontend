import React, {useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import {useUser} from "../context/UserContext";

export default function Login() {
    const {signIn} = useUser();
    const [formData, setFormData] = useState({
        matNo: "",
        password: "",
    });

    const navigate = useNavigate();

    const onChangeText = (key, value) => {
        console.log(value);
        setFormData({...formData, [key]: value});
    };
    console.log(formData.matNo);

    const onSubmit = (ev) => {
        ev.preventDefault();
        signIn(formData.matNo, formData.password).then(() => {
            console.log("signed in");
            navigate("/home");
        });
    };
    // };

    return (
        <div className="grid h-screen place-items-center">
            <form
                onSubmit={(ev) => onSubmit(ev)}
                // onSubmit={(ev) => submit(ev)}
                className="flex flex-col w-1/4 border gap-10 border-slate-700 px-5  py-5 items-stretch"
            >
                <p className="text-2xl text-center">Results Checker</p>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-4">
                        <label className="min-w-16" for="MatNo">
                            Mat No:
                        </label>
                        <input
                            type="text"
                            id="MatNo"
                            name="MatNo"
                            className="border border-black w-full"
                            value={formData.matNo}
                            onChange={(ev) =>
                                onChangeText("matNo", ev.target.value)
                            }
                        />
                    </div>
                    <div className="flex gap-4">
                        <label className="min-w-16" for="password">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="text"
                            name="password"
                            className="border border-black w-full"
                            value={formData.password}
                            onChange={(ev) =>
                                onChangeText("password", ev.target.value)
                            }
                        />
                    </div>
                </div>
                <button
                    className="bg-slate-300 self-end px-4 py-2"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
