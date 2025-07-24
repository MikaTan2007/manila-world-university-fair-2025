"use client"
import { useState, useEffect} from "react";
import { Date } from "mongoose";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
import { useRouter, useSearchParams } from "next/navigation";
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
    const searchParams = useSearchParams();
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

                const reply = await response.json();

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
                    router.push("/error")
                }
                
            } catch (error) {
                router.push("/error")
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

    if (noStudents) {
        return (
            <div className="text-center p-4">
                <p>No students registered yet.</p>
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

}

