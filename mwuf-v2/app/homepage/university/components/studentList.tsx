"use client"
import { useState, useEffect} from "react";
import { Date } from "mongoose";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
import { useRouter } from "next/navigation";
import { StudentCard } from "./studentCard";

interface Student {
    email: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    gender: string;
    citizenship: [string];
    graduation_year: string;
    school_name: string;
    ideal_major: [string];
    registered_universitites: [string];
}

export function StudentList() {
    const router = useRouter();
    const searchParams = new URLSearchParams(window.location.search);
    const universityEmail = searchParams.get('email');
    const [noStudents, setNoStudents] = useState(true);

    const [students, setStudents] = useState<Student[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        
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

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data.students);
                } else {
                    console.log("Error occuring")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

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

    return (
        <div>
            {students.map((student) => (
                <StudentCard key = {student.email} student={student}/>
            ))}
        </div>
    )

}

