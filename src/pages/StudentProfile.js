import React, {useEffect, useState} from "react";
import Profile from "../components/Profile";

export default function StudentProfile() {
    const fields = [
        {label: "Mat No", data: "mat_no"},
        {label: "First Name", data: "first_name"},
        {label: "Last Name", data: "last_name"},
        {label: "Email", data: "email"},
        {label: "Department", data: "department_code"},
    ];

    return <Profile fields={fields} profileUrl={"/api/student/get_details"}/>
}
