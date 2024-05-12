import React from "react";
import {useUser} from "../context/UserContext";

export default function Home() {
    const {getUserData} = useUser();


    // getUserData();

    return (
        <div className="grid grid-cols-8 w-full h-screen">
            <div className="bg-slate-300 col-span-2">
                <div>
                    <div>
                        <p>Mat: No</p>
                        <p>PSC1226710</p>
                    </div>
                    <div>
                        <p>First Name</p>
                        <p>Curtis</p>
                    </div>
                    <div>
                        <p>Last Name</p>
                        <p>Cervantes</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>kathydurham@example.net</p>
                    </div>
                    <div>
                        <p>Department</p>
                        <p className="uppercase">csc</p>
                    </div>
                </div>
                <button className="bg-cyan-400 px-2 py-1 rounded-md">
                    Check Result
                </button>
            </div>
            <div className="col-span-6">
                <p>Check Results</p>
            </div>
        </div>
    );
}
