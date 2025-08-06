"use client"
import { useState, useEffect, forwardRef, useImperativeHandle, useMemo} from "react";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
import { useSearchParams } from "next/navigation";
import { StudentCard } from "./studentCard";
import { NoStudentCard } from "./noStudent";
import { useNavigation } from "@/hooks/useNavigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

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
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStudents = useMemo(() => {
        if (!searchQuery.trim()) {
            return students;
        }

        const query = searchQuery.toLowerCase();
        
        return students.filter(student => 
            // Search by student name
            `${student.first_name} ${student.last_name}`.toLowerCase().includes(query) ||
            // Search by email
            student.email.toLowerCase().includes(query) ||
            // Search by school name
            student.school_name.toLowerCase().includes(query) ||
            // Search by citizenship
            student.citizenship.some(citizenship => citizenship.toLowerCase().includes(query)) ||
            // Search by ideal major
            student.ideal_major.some(major => major.toLowerCase().includes(query)) ||
            // Search by graduation year
            student.graduation_year.toLowerCase().includes(query) ||
            // Search by gender
            student.gender.toLowerCase().includes(query)
        );
    }, [students, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

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
            <div className="space-y-6">
                {/* Loading state for search bar */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    <div></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                </div>
            </div>
        )
    }

    if (noStudents) {
        return (
            <div className="space-y-8">
                <div className="flex justify-center px-4">
                    <div></div>
                    <div className="w-full max-w-md relative">
                        <div className="relative text-forest-green">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-green font-sans h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search students by name, school, major, or citizenship..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 pr-10 font-sans bg-white placeholder:text-forest-green"
                            />
                            {searchQuery && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={clearSearch}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 !text-forest-green"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="mx-auto max-w-sm">
                    <NoStudentCard></NoStudentCard>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-center px-4">
                <div></div>
                <div className="w-full max-w-md relative">
                    <div className="relative text-forest-green">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-green font-sans h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search students by name, school, major, or citizenship..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-10 font-sans bg-white placeholder:text-forest-green"
                        />
                        {searchQuery && (
                            <Button
                                variant="link"
                                size="sm"
                                onClick={clearSearch}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 !text-forest-green"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredStudents.length === 0 && !searchQuery ? (
                    <div className="col-span-full text-center text-white py-8">
                        No students available
                    </div>
                ) : filteredStudents.length === 0 && searchQuery ? (
                    <div className="col-span-full text-center text-white py-8">
                        No students found matching "{searchQuery}"
                    </div>
                ) : (
                    filteredStudents.map((student) => (
                        <StudentCard key={student.email} student={student}/>
                    ))
                )}
            </div>
        </div>
    )

});

StudentList.displayName = 'StudentList';
