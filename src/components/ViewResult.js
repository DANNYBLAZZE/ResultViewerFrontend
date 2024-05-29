import React, {useMemo} from "react";
import clsx from "clsx";

export default function ViewResult({data}) {
    const gradeValue = ["F", "E", "D", "C", "B", "A"];

    const getGrade = (score) => {
        if (score >= 70) return "A";
        else if (score >= 60) return "B";
        else if (score >= 50) return "C";
        else if (score >= 45) return "D";
        else if (score >= 40) return "E";
        else return "F";
    };

    const GPA = useMemo(
        () =>
            (
                data?.reduce(
                    (acc, cur) =>
                        acc + 3 * gradeValue.indexOf(getGrade(cur.score)),
                    0
                ) /
                (3 * data?.length)
            ).toFixed(2) || "--",
        [data]
    );

    console.log("gpa", GPA, data);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl">
                <div className="font-bold text-xl">GPA - {isNaN(GPA) ? "_.__" : GPA}</div>
            </div>
            <div className="bg-white gap-3 flex flex-col rounded-2xl">
                <div className="text-xl font-bold">Results</div>
                <div>
                    <div className="grid grid-cols-4 bg-gray-100 text-lg md:text-xl border-b-2">
                        <div className="p-3 col-span-2">Course Code</div>
                        <div className="p-3">Score</div>
                        <div className="p-3">Grade</div>
                    </div>
                    {data &&
                        data.map((course) => {
                            return (
                                <div
                                    className="grid grid-cols-4 border"
                                    key={course.id}
                                >
                                    <div className="p-3 col-span-2">
                                        {course.course_code}
                                    </div>
                                    <div className="p-3">{course.score}</div>
                                    <div className={clsx("p-3", getGrade(course.score) == "F" && "text-red-600")} >
                                        {getGrade(course.score)}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
