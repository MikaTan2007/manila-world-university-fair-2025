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
import { CircleX, Eraser } from "lucide-react";

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
    const [hasError, setHasError] = useState(false);
    const [anyChanges, setAnyChanges] = useState(false);
    const [takenEmail, setTakenEmail] = useState(false);

    //Student Attributes
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [gender, setGender] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [citizenship, setCitizenship] = useState<string[]>([]);
    const [schoolName, setSchoolName] = useState("");
    const [idealMajor, setIdealMajor] = useState<string[]>([]);

    //Determining changed
    const [firstNameChanged, setFirstNameChanged] = useState(false);
    const [lastNameChanged, setLastNameChanged] = useState(false);
    const [genderChanged, setGenderChanged] = useState(false);
    const [gradYearChanged, setGradYearChanged] = useState(false);
    const [citizenshipChanged, setCitizenshipChanged] = useState(false);
    const [schoolNameChanged, setSchoolNameChanged] = useState(false);
    const [idealMajorChanged, setIdealMajorChanged] = useState(false);


    //Variable Handlers
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setFirstNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setLastNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        setTakenEmail(false);
        setAnyChanges(true);
        setHasError(false);
    }

    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
        setSchoolNameChanged(true);
        setAnyChanges(true);
        setHasError(false);
    }

    const clearEmail = () => {
        setNewEmail("");
        setTakenEmail(true);
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
                navigate("/error/forbidden");
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

    //Button Handlers
    const handleBack = async() => {
        if (anyChanges == true) {
            toast((t) => (
                <div className="flex flex-col gap-2">
                    <p className="font-bold flex justify-center">Unsaved Changes</p>
                    <p className="text-sm items-center text-gray-600">
                         Are you sure you want to leave?
                    </p>
                    <div className="flex justify-center gap-2">
                        <Button
                            className="px-3 py-1 text-green-600 rounded text-sm"
                            onClick={() => toast.dismiss(t.id)}
                            variant = "outline"
                        >
                            Stay
                        </Button>

                        <Button
                            className="px-3 py-1 text-red-600 rounded text-sm"
                            onClick={() => {
                                toast.dismiss(t.id);
                                navigate(`/homepage/student/profile?email=${encodeURIComponent(studentEmail ?? "")}&firstName=${firstName}`);
                            }}
                            variant = "outline"
                        >
                            Leave
                        </Button>
                        
                    </div>
                </div>
            ), {
                duration: Infinity, // Keep the toast open until user decides
            });
            return;
        }
        navigate(`/homepage/student/profile?email=${encodeURIComponent(studentEmail ?? "")}&firstName=${firstName}`);
        return;
    }

    const handleProfileSubmit = async() => {
        let hasError = false;

        if (firstName == "" || lastName == "" || schoolName == "" || newEmail == "" || citizenship.length == 0 || idealMajor.length == 0) {
            hasError = true;
        }

        if (hasError == true) {
            setHasError(true);
            return;
        }

        const toastId = toast.loading("Processing...")

        //If no email change
        if (studentEmail == newEmail) {
            const studentData: any = {
                email: studentEmail
            };

            if (firstNameChanged) {
                studentData.first_name = firstName;
            }

            if (lastNameChanged) {
                studentData.last_name = lastName;
            }

            if (genderChanged) {
                studentData.gender = gender;
            }

            if (gradYearChanged) {
                studentData.graduation_year = gradYear;
            }

            if (citizenshipChanged) {
                studentData.citizenship = citizenship;
            }

            if (schoolNameChanged) {
                studentData.school_name = schoolName;
            }

            if (idealMajorChanged) {
                studentData.ideal_major = idealMajor;
            }

            try {
                const response = await fetch("/api/homepage/students/profile/editprofile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    toast.dismiss(toastId)
                    toast.success("Profile updated")
                    navigate(`/homepage/student/profile?email=${encodeURIComponent(studentEmail ?? "")}&firstName=${firstName}`);
                } else {
                    toast.dismiss(toastId);
                    navigate("/error")
                }

            } catch {
                toast.dismiss(toastId);
                navigate("/error")
            }

        } else {
            const studentData: any = {
                email: studentEmail,
                new_email: newEmail
            }; 

            if (firstNameChanged) {
                studentData.first_name = firstName;
            }

            if (lastNameChanged) {
                studentData.last_name = lastName;
            }

            if (genderChanged) {
                studentData.gender = gender;
            }

            if (gradYearChanged) {
                studentData.graduation_year = gradYear;
            }

            if (citizenshipChanged) {
                studentData.citizenship = citizenship;
            }

            if (schoolNameChanged) {
                studentData.school_name = schoolName;
            }

            if (idealMajorChanged) {
                studentData.ideal_major = idealMajor;
            }

            try {
                const response = await fetch("/api/homepage/students/profile/editprofile/new_email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                });

                if (response.status === 401 || response.status === 403 ) {
                    navigate("/error/forbidden");
                    return;
                }

                if (response.status === 409) {
                    setNewEmail("Email has already been taken")
                    setTakenEmail(true);
                    toast.dismiss();
                    return;
                }

                if (!response.ok) {
                    navigate("/error")
                    return;
                }

                if (response.status === 200) {
                    toast.success("Profile updated")
                    navigate(`/homepage/student/profile?email=${encodeURIComponent(newEmail ?? "")}&firstName=${firstName}`);
                    return;
                }

            } catch {
                toast.dismiss(toastId);
                navigate("/error")
            }
        }

        


        
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
                            {takenEmail ?
                                <Input 
                                    id = "email" 
                                    type="email" 
                                    placeholder="@example.com" 
                                    onChange={handleEmailChange}
                                    className = "text-red-600"
                                    value = {newEmail}
                                    >
                                </Input> 
                                :
                                <Input 
                                    id = "email" 
                                    type="email" 
                                    placeholder="@example.com" 
                                    onChange={handleEmailChange}
                                    value = {newEmail}
                                    >
                                </Input> 
                            }
                        <Button onClick = {clearEmail} variant = "ghost" size = "icon">
                            <Eraser></Eraser>
                        </Button>
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
                                    setHasError(false);
                                }}
                                onGenderChange={()=> {
                                    setGenderChanged(true)
                                    setAnyChanges(true);
                                }}
                            >
                            </GenderOption>
                            
                            <CountrySelect
                                citizenship={citizenship}
                                setCitizenship={(value) => {
                                    setCitizenship(value);
                                    setHasError(false);
                                }}
                                onCitizenshipChange={() => {
                                    setCitizenshipChanged(true);
                                    setAnyChanges(true);
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
                                    setHasError(false);
                                }}
                                onGradYearChange={()=> {
                                    setGradYearChanged(true)
                                    setAnyChanges(true);
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
                                    setHasError(false);
                                }}
                                onIdealMajorChange={()=> {
                                    setIdealMajorChanged(true);
                                    setAnyChanges(true);
                                }}
                            ></IdealMajor>
                        </div>
                    </div>
                    
                    <div className = "text-sm flex animate-pulse">
                        {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                        {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                    </div>
                    <Button type = "submit" disabled = {!anyChanges} onClick={handleProfileSubmit} variant = "ghost" className = "w-full text-white bg-blue-400">
                        Save Changes
                    </Button>
                    <Button type = "submit" onClick={handleBack} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}

export default StudentEditProfileForm