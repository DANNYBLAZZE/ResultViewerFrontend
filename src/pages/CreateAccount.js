import React, {useState} from "react";
import Select from "@mui/material/Select";
import SelectUserAccount from "../components/SelectUserAccount";
import {useNavigate} from "react-router-dom";
import AddDetails from "../components/AddDetails";
import {useUser} from "../context/UserContext";

export default function ChooseRole() {
    const {studentRegister, lecturerRegister} = useUser();
    const roles = ["STUDENT", "LECTURER"];
    const [role, setRole] = useState("STUDENT");
    const [page, setPage] = useState(0);

    const fields = {
        STUDENT: {
            fieldName: "Matric No",
            placeholder: "Enter Matriculation Number",
        },
        LECTURER: {
            fieldName: "Staff Id",
            placeholder: "Enter Staff ID",
        },
    };

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        password: "",
        departmentCode: "",
        email: "",
    });

    const navigate = useNavigate();

    const onSubmit = () => {
        if (role == "LECTURER") onLecturerRegister();
        else onStudentRegister();
    };

    const onStudentRegister = async () => {
        await studentRegister({
            mat_no: formData.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            department_code: formData.departmentCode,
            email: formData.email,
            password: formData.password
        });
        navigate(`/student/home`);
    };

    const onLecturerRegister = async () => {
        await lecturerRegister({
            staff_id: formData.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password
        });
        navigate(`/lecturer/home`);
    };

    const changePage = (newPage) => {
        console.log(newPage, page);
        if (newPage == 1 && page == 0) {
            setFormData({
                id: formData.id,
            });
        }
        setPage(newPage);
    };

    return page == 0 ? (
        <SelectUserAccount
            formData={formData}
            roles={roles}
            setFormData={setFormData}
            role={role}
            setRole={setRole}
            fields={fields}
            changePage={changePage}
        />
    ) : (
        <AddDetails
            changePage={changePage}
            formData={formData}
            setFormData={setFormData}
            role={role}
            onSubmit={onSubmit}
        />
    );
}
