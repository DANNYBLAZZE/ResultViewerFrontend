import React from "react";
import {Routes, Route, Navigate} from "react-router";
import Home from "./pages/app/StudentProfile";
import StudentNavigation from "./components/StudentNavigation";
import MyResult from "./pages/app/MyResult";
import StudentProfile from "./pages/app/StudentProfile";
import ChooseRole from "./pages/auth/ChooseRole";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginAsStudent from "./pages/auth/LoginAsStudent";
import LoginAsLecturer from "./pages/auth/LoginAsLecturer";
import LecturerNavigation from "./components/LecturerNavigation";
import LectuerProfile from "./pages/app/LecturerProfile";
import LecturerViewResult from "./pages/app/LecturerViewResult";
import CreateAccount from "./pages/auth/CreateAccount";
import UploadResult from "./pages/app/UploadResult";
import HomePage from "./pages/HomePage";
import { useUser } from "./context/UserContext";

export default function App() {
    const {appIsReady} = useUser();

    return (
        <Routes>
            {/* <Route path="/"> */}
            <Route path="/login/student" element={<LoginAsStudent />} />
            <Route path="/login/lecturer" element={<LoginAsLecturer />} />
            <Route path="/login" element={<ChooseRole />} />
            <Route path="/create-account" element={<CreateAccount/>}/>


            <Route path="/" element={<HomePage />}>
                <Route path="/lecturer" element={<LecturerNavigation />}>
                    <Route path="home" element={<LectuerProfile />} />
                    <Route path="view-student-result" element={<LecturerViewResult />} />
                    <Route path="upload-result" element={<UploadResult />} />
                </Route>
                <Route path="/student" element={<StudentNavigation />}>
                    <Route path="home" element={<StudentProfile />} />
                    <Route path="my-result" element={<MyResult />} />
                </Route>
            </Route>
        </Routes>
    );
}
