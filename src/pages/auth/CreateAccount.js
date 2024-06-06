import React, {useState} from "react";
import Select from "@mui/material/Select";
import SelectUserAccount from "../../components/SelectUserAccount";
import {useNavigate} from "react-router-dom";
import AddDetails from "../../components/AddDetails";
import { useSession } from "../../context/SessionContext";

export default function CreateAccount() {
    const {studentRegister, lecturerRegister} = useSession();
    const roles = ["STUDENT", "LECTURER"];
    const [role, setRole] = useState("STUDENT");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        setLoading(true);
        await studentRegister({
            mat_no: formData.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            department_code: formData.departmentCode,
            email: formData.email,
            password: formData.password,
        })
            .then(() => {
                navigate(`/student/home`);
            })
            .catch((error) => {
                setError(JSON.parse(error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onLecturerRegister = async () => {
        setLoading(true);
        await lecturerRegister({
            staff_id: formData.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
        })
            .then(() => {
                navigate(`/lecturer/home`);
            })
            .catch((error) => {
                console.log(error.message);
                setError(JSON.parse(error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const changePage = (newPage) => {
        console.log(newPage, page);
        // if (newPage == 1 && page == 0) {
        //     setFormData({
        //         id: formData.id,
        //     });
        // }
        setPage(newPage);
    };

    const changeRole = (role) => {
        setFormData({
            id: formData.id,
        });
        setRole(role);
        setError("");
    };

    return page == 0 ? (
        <SelectUserAccount
            changeRole={changeRole}
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
            loading={loading}
            error={error}
            changePage={changePage}
            formData={formData}
            setFormData={setFormData}
            role={role}
            onSubmit={onSubmit}
        />
    );
}
