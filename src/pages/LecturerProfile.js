import React, {useEffect, useState} from "react";
import {useUser} from "../context/UserContext";
import Results from "../components/Results";
import StudentNavigation from "../components/StudentNavigation";
import clsx from "clsx";
import BlankProfile from "../img/blank-profile.png";

export default function LectuerProfile() {
    const {getLecturerProfile} = useUser();
    const [userData, setUserData] = useState({});
    const [showResults, setShowResults] = useState(false);

    const fields = [
        {label: "Staff ID", data: "id"},
        {label: "First Name", data: "first_name"},
        {label: "Last Name", data: "last_name"},
        {label: "Email", data: "email"},
    ];

    useEffect(() => {
        getLecturerProfile().then((data) => setUserData(data));
    }, []);

    return (
        <div className="p-10">
            <img src={BlankProfile} width={120} height={50} className="rounded-full ml-4 mb-6"/>
            <div className="flex flex-col gap-5">
                {fields.map((item) => {
                    return (
                        <div className="flex flex-row bg-gray-100 px-5 py-2">
                            <div className="min-w-36 font-bold">
                                {item.label}
                            </div>
                            <div
                                className={clsx(
                                    item.label == "Department" && "uppercase"
                                )}
                            >
                                {userData[item.data]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
