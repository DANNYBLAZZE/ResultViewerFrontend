import React from "react";
import Profile from "../../components/Profile";

export default function LectuerProfile() {
    const fields = [
        {label: "Staff ID", data: "id"},
        {label: "First Name", data: "first_name"},
        {label: "Last Name", data: "last_name"},
        {label: "Email", data: "email"},
    ];

    return <Profile fields={fields} profileUrl={"/api/lecturer/get_details"}/>
}
