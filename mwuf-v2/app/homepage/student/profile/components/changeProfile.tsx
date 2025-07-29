import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { HomepageSkeletonLoad } from "@/app/homepage/cardSkeletonLoad";

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

export function StudentProfile() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const searchParams = useSearchParams();
    const studentEmail = searchParams.get('email');

    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (studentEmail == "") {
            router.push("/error/forbidden")
            return;
        }

        const fetchStudentData = async () => {
            try {
                const response = await fetch("/api/homepage/students/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: studentEmail
                    })
                });

                if (response.status === 401 || response.status === 403) {
                    router.push("/error/forbidden");
                    return;
                }

                if (response.ok != true) {
                    router.push("/error");
                    return;
                }

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setStudent(data.student)
                    }
                }

            } catch (error) {
                router.push("/error");
                return;
            } finally {
                setLoading(false);
            }
        }
        
        fetchStudentData();
    
    }, [studentEmail, router])

    if (loading == true) {
        return(
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                <div></div>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <div></div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div></div>
                <Card className="w-full hover:shadow-lg transition-shadow font-sans">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex justify-start text-green-800">{student?.first_name} {student?.last_name}</CardTitle>
                        <CardDescription className="font-bold">
                            <div className="flex flex-col">
                                <div>
                                    {student?.gender}
                                </div>
                                <div>
                                    Citizen of: {student?.citizenship.join(", ")}
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className = "space-y-4">
                            <div className = "flex flex-col">
                                <div className="font-bold text-green-800">
                                    Academic Information
                                </div>
                                <CardDescription className="font-bold">
                                    <div className="flex flex-col">
                                        <div>
                                            Student of: {student?.school_name}
                                        </div>
                                        <div>
                                            Class of {student?.graduation_year}
                                        </div>
                                        <div>
                                            Interested in: {student?.ideal_major.join(", ")}
                                        </div>
                                    </div>
                                </CardDescription>
                            </div>
                            <div className = "flex flex-col">
                                <div className="font-bold text-green-800">
                                    Contact
                                </div>
                                <CardDescription className="font-bold">
                                    <div className="flex flex-col">
                                        <div>
                                            {student?.email}
                                        </div>
                                    </div>
                                </CardDescription>
                            </div>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex justify-end font-sans">
                        <Button 
                            variant="outline"
                        >
                            Edit Profile
                        </Button>
                    </CardFooter>
                </Card>
            <div></div>
        </div>
    )
}