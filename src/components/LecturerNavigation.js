import React, {useEffect, useLayoutEffect, useState} from "react";
import Navigation from "./Navigation";
import {PeopleOutline} from "react-ionicons";
import {CloudUploadOutline} from "react-ionicons";
import {DocumentTextOutline} from "react-ionicons";

export default function LecturerNavigation() {
    const name = "Lecturer Portal";

    const nav = [
        {
            name: "Profile",
            route: "/lecturer/home",
            icon: (color) => <PeopleOutline color={color} />,
        },
        {
            name: "View Student Result",
            route: "/lecturer/view-student-result",
            icon: (color) => <DocumentTextOutline color={color} />,
        },
        {
            name: "Upload Result",
            route: "/lecturer/upload-result",
            icon: (color) => <CloudUploadOutline color={color} />,
        },
    ];

    return <Navigation nav={nav} name={name} />;
}
