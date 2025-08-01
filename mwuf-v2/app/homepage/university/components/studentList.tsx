"use client"
import { useState, useEffect, forwardRef, useImperativeHandle} from "react";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
import { useSearchParams } from "next/navigation";
import { StudentCard } from "./studentCard";
import { NoStudentCard } from "./noStudent";
import { useNavigation } from "@/hooks/useNavigation";

interface Student {
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    citizenship: [string];
    graduation_year: string;
    school_name: string;
    ideal_major: [string];
    registered_universitites: [string];
}

export interface StudentListRefresh {
    refreshStudents: () => void;
}

export const StudentList = forwardRef<StudentListRefresh>((props, refresh) => {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const universityEmail = searchParams.get('email');

    const [noStudents, setNoStudents] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchStudents = async () => {
            
        setLoading(true);

        try {
            const response = await fetch("/api/homepage/universities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    universityEmail: universityEmail
                })
            });

            const reply = await response.json();

            if (response.status === 401 || response.status === 403) {
                navigate("/error/forbidden");
                return;
            }

            if (reply.message === "No students registered") {
                setNoStudents(true);
                setStudents([]);
                setLoading(false);
                return;
            }

            if (response.ok) {
                setStudents(reply.students);
                setNoStudents(false);
            } else {
                navigate("/error")
            }

        } catch (error) {
            navigate("/error")
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(refresh, () => ({
        refreshStudents: fetchStudents
    }));
    
    useEffect(() => {
        if (universityEmail == "") {
            navigate("/error/forbidden")
            return;
        }
    
        fetchStudents();

    }, [universityEmail])

    if (loading == true) {
        return (
            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
            </div>
        )
    }

    if (noStudents) {
        return (
            <div className = "mx-auto max-w-sm">
                <NoStudentCard></NoStudentCard>
            </div>
            
        );
    }

    return (
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {students.map((student) => (
                <StudentCard key = {student.email} student={student}/>
            ))}
        </div>
    )

});

StudentList.displayName = 'StudentList';
