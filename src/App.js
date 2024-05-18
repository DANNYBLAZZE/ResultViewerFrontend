import React from "react";
import {Routes, Route, Navigate} from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Profile";
import StudentNavigation from "./components/StudentNavigation";
import MyResult from "./pages/MyResult";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <Routes>
            <Route path="/login/:category" element={<Login />} />

            <Route path="/" element={<StudentNavigation />}>
                <Route path="/" element={<Profile />} />
                <Route path="/my-result" element={<MyResult />} />
            </Route>
        </Routes>
    );
}
