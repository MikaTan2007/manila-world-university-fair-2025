import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StudentProps {
    student: {
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
}

export function AdminStudentCard({student}: StudentProps) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow font-sans">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-start text-green-800">{student.first_name} {student.last_name}</CardTitle>
                <CardDescription className="font-bold">
                    <div className="flex flex-col">
                        <div>
                            {student.gender}
                        </div>
                        <div>
                            Citizen of: {student.citizenship.join(", ")}
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
                                    Student of: {student.school_name}
                                </div>
                                <div>
                                    Class of {student.graduation_year}
                                </div>
                                <div>
                                    Interested in: {student.ideal_major.join(", ")}
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
                                    {student.email}
                                </div>
                            </div>
                        </CardDescription>
                    </div>
                </div>
                
            </CardContent>
        </Card>
    )
}