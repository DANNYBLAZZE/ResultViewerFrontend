import React from "react";
import {Routes, Route, Navigate} from "react-router";
import Home from "./pages/StudentProfile";
import StudentNavigation from "./components/StudentNavigation";
import MyResult from "./pages/MyResult";
import StudentProfile from "./pages/StudentProfile";
import ChooseRole from "./pages/ChooseRole";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginAsStudent from "./pages/LoginAsStudent";
import LoginAsLecturer from "./pages/LoginAsLecturer";
import LecturerNavigation from "./components/LecturerNavigation";
import LectuerProfile from "./pages/LecturerProfile";

export default function App() {
    return (
        <Routes>
            {/* <Route path="/"> */}
            <Route path="/login/student" element={<LoginAsStudent />} />
            <Route path="/login/lecturer" element={<LoginAsLecturer />} />
            <Route path="/login" element={<ChooseRole />} />

            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/lecturer" element={<LecturerNavigation />}>
                    <Route path="home" element={<LectuerProfile />} />
                    <Route path="my-result" element={<MyResult />} />
                </Route>
                <Route path="/student" element={<StudentNavigation />}>
                    <Route path="home" element={<StudentProfile />} />
                    <Route path="my-result" element={<MyResult />} />
                </Route>
            </Route>
        </Routes>
    );
}
