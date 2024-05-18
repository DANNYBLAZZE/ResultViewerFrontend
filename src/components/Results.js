import React from "react";
import useFetch from "../hooks/useFetch";
import {json} from "react-router-dom";



export default function Results() {
    const {data} = useFetch("/api/get_result", {
        method: "GET",
        credentials: "include",
    });

    const getGrade = (score) => {
        if (score >= 70) 
            return "A"
        else if (score >= 60)
            return "B"
        else if (score >= 50)
            return "C"
        else if (score >= 45)
            return "D"
        else if (score >= 40)
            return "E"
        else 
            return "F"
    }
    console.log("data", {data})

    return (
        <div >
            <div className="grid grid-cols-3 bg-gray-100 text-xl border-b-2">
                <div className="p-3">Course Code</div>
                <div className="p-3">Score</div>
                <div className="p-3">Grade</div>
            </div>
            {data &&
                data.map((course) => {
                    return (
                        <div className="grid grid-cols-3 border" key={course.id}>
                            <div className="p-3">{course.course_code}</div>
                            <div className="p-3">{course.score}</div>
                            <div className="p-3">{getGrade(course.score)}</div>
                            
                        </div>
                    );
                })}
        </div>
    );
}
