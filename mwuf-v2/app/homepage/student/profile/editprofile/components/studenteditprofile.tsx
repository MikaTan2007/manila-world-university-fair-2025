//React or Next
import { useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";

import toast from "react-hot-toast";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
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
    const [emptySchoolName, setEmptySchoolName] = useState(false);

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

    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
        setEmptySchoolName(false);
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
            <div className = "mx-auto max-w-sm">
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
            </div>
        )
    }

    // const handleProfileSubmit = async() => {
    //     let hasError = false;

    //     if 
    // }


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
                        <div className = "flex">
                        
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
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "email" 
                                type="email" 
                                placeholder="@example.com" 
                                onChange={handleEmailChange}
                                value = {newEmail}
                                >
                            </Input> 
                        </div>
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="gender/citizenship">
                            Gender & Citizenship
                        </Label>
                        <div className = "flex">
                            <GenderOption
                                gender={gender}
                                setGender={(value) => {
                                    setGender(value);
                                }}
                            >
                            </GenderOption>
                            
                            <CountrySelect
                                citizenship={citizenship}
                                setCitizenship={(value) => {
                                    setCitizenship(value);
                                }}
                            >
                            </CountrySelect>
                        </div>
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="school">
                            School Name and Graduation Year
                        </Label>
                        <div className = "flex">
                            <Input 
                                id = "school" 
                                type="text" 
                                placeholder="High School" 
                                value = {schoolName}
                                onChange={handleSchoolNameChange}
                                required
                            >
                            </Input>

                            <GradYearOption
                                gradYear = {gradYear}
                                setGradYear={(value) => {
                                    setGradYear(value);
                                }}
                            ></GradYearOption>
                        </div>
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="idealMajor">
                            Ideal Major
                        </Label>
                        <div className = "flex">
                            <IdealMajor
                                idealMajor={idealMajor}
                                setIdealMajor={(values) => {
                                    setIdealMajor(values)
                                }}
                            ></IdealMajor>
                        </div>
                    </div>
                    <Button type = "submit" disabled variant = "ghost" className = "w-full text-white bg-blue-400">
                        Save Changes
                    </Button>
                    <Button type = "submit" disabled variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}

export default StudentEditProfileForm