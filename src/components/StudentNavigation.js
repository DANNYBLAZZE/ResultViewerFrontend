import React, {useLayoutEffect, useState} from "react";
import Navigation from "./Navigation";
import {PeopleOutline} from "react-ionicons";
import {DocumentTextOutline} from "react-ionicons";

export default function StudentNavigation() {
    const name = "Student Portal";

    const nav = [
        {
            name: "Profile",
            route: "/student/home",
            icon: (color) => <PeopleOutline color={color} />,
        },
        {
            name: "My Result",
            route: "/student/my-result",
            icon: (color) => <DocumentTextOutline color={color} />,
        },
    ];

    return <Navigation name={name} nav={nav}/>
}
