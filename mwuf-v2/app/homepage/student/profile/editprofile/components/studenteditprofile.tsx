//React or Next
import { useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";

import toast from "react-hot-toast";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Component Imports
import { GenderOption } from "@/app/signup/student/components/genderoption";
import { GradYearOption } from "@/app/signup/student/components/graduation-year-select";
import { IdealMajor } from "@/app/signup/student/components/idealmajor";
import { CountrySelect } from "@/app/signup/student/components/citizenship";

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

const StudentEditProfileForm: React.FC = () => {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const studentEmail = searchParams.get('email');

    const [student, setStudent] = useState<Student>();
    const [loading, setLoading] = useState<boolean>(true);

    //Student Attributes
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [gender, setGender] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [citizenship, setCitizenship] = useState<string[]>([]);
    const [schoolName, setSchoolName] = useState("");
    const [idealMajor, setIdealMajor] = useState<string[]>([]);

    //Empty Checking Variables
    const [emptyFirstName, setEmptyFirstName] = useState(false);
    const [emptyLastName, setEmptyLastName] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [dateChanged, setDateChanged] = useState(true);
    const [emptyGender, setEmptyGender] = useState(false);
    const [emptyGradYear, setEmptyGradYear] = useState(true);
    const [emptyCitizenship, setEmptyCitizenship] = useState(true);
    const [emptySchoolName, setEmptySchoolName] = useState(true);
    const [emptyIdealMajor, setEmptyIdealMajor] = useState(true);

    //Variable Handlers
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setEmptyFirstName(false);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setEmptyLastName(false);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        setEmptyEmail(false);
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
                navigate("error/forbidden");
                return;
            }

            if (response.ok != true) {
                navigate("/error");
                return;
            }

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const studentData = data.student;
                    setStudent(data.student)

                    setFirstName(studentData.first_name || "");
                    setLastName(studentData.last_name || "");
                    setNewEmail(studentData.email || "");
                    setGender(studentData.gender || "");
                    setGradYear(studentData.graduation_year || "");
                    setCitizenship(studentData.citizenship || []);
                    setSchoolName(studentData.school_name || "");
                    setIdealMajor(studentData.ideal_major || []);
                }
            }
        } catch (error) {
            navigate("/error");
            return;
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (studentEmail=="") {
            navigate("/error/forbidden");
            return;
        }
        
        fetchStudentData();
    }, [studentEmail]);

    if (loading == true) {
        return (
            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                Loading my good man!
            </div>
        )
    }


    return (
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Edit Profile
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <div className = "flex gap-2">
                        
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                onChange = {handleFirstNameChange}
                                value = {firstName}
                                >
                            </Input> 

                            <Input 
                                id = "last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                value = {lastName}
                                onChange = {handleLastNameChange}
                                >
                            </Input>

                        </div>

                        <Label htmlFor="email">
                            Email
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                onChange={handleEmailChange}
                                value = {newEmail}
                                >
                            </Input> 
                        </div>

                        <Label htmlFor="general_information">
                            Email
                        </Label>
                        
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default StudentEditProfileForm