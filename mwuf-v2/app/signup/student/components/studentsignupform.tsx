//React or Next
import { useState, useEffect} from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { DatePicker } from "./datepicker";
import { GenderOption } from "./genderoption";
import { GradYearOption } from "./graduation-year-select";
import { IdealMajor } from "./idealmajor";
import { CountrySelect } from "./citizenship";
import { CircleX } from "lucide-react";

const StudentSignUpForm: React.FC = () => {
    //Initialization of router
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    //Email from prev sign up page
    const [userEmail, setUserEmail] = useState(email);

    //Password from prev sign up page
    const [userPassword, setUserPassword] = useState(password)

    useEffect(() => {
        toast.dismiss();
    }, []);

    useEffect(() => {
        if (email) {
            setUserEmail(email);
        }

        if (password) {
            setUserPassword(password);
        }
    }, [email, password]);

    //Name Variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [emptyFirstName, setEmptyFirstName] = useState(true);
    const [emptyLastName, setEmptyLastName] = useState(true);

    //Date
    const [dateofBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [dateChanged, setDateChanged] = useState(false);

    //Gender
    const [gender, setGender] = useState("");
    const [emptyGender, setEmptyGender] = useState(true);

    //GradYear
    const [gradYear, setGradYear] = useState("");
    const [emptyGradYear, setEmptyGradYear] = useState(true);

    //Citizenship
    const [citizenship, setCitizenship] = useState<string[]>([]);
    const [emptyCitizenship, setEmptyCitizenship] = useState(true);

    //School Name
    const [schoolName, setSchoolName] = useState("");
    const [emptySchoolName, setEmptySchoolName] = useState(true);

    //Ideal Major
    const [idealMajor, setIdealMajor] = useState<string[]>([]);
    const [emptyIdealMajor, setEmptyIdealMajor] = useState(true);


    //Handlers for first Name and Last Name
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setEmptyFirstName(false);
        setHasError(false);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setEmptyLastName(false);
        setHasError(false);
    }

    //Handler for School Name
    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
        setEmptySchoolName(false);
        setHasError(false);
    }

    const [hasError, setHasError] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        //Empty Error Checking
        if (emptyFirstName == true || firstName == "") {
            setEmptyFirstName(true);
            hasError = true;
        }

        if (emptyLastName == true || lastName == "") {
            setEmptyLastName(true);
            hasError = true;
        }

        if (dateChanged == false) {
            hasError = true;
        }

        if (emptyGender == true) {
            hasError = true;
        }

        if (emptyGradYear == true) {
            hasError = true;
        }

        if (emptyCitizenship == true) {
            hasError = true;
        }

        if (emptySchoolName == true || schoolName == "") {
            hasError = true;
        } 

        if (emptyIdealMajor == true) {
            hasError = true;
        }
        
        setHasError(hasError);

        if (hasError == true) {
            return;
        } 

        try {
            const studentData = {
                email: userEmail,
                password: userPassword,
                first_name: firstName,
                last_name: lastName,
                birthday: dateofBirth,
                gender: gender,
                citizenship: citizenship,
                graduation_year: gradYear,
                school_name: schoolName,
                ideal_major: idealMajor
            }

            const response = await fetch("/api/signup/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                router.push(`/homepage/student?email=${encodeURIComponent(userEmail ?? "")}`);
            } else {
                router.push("/error")
            }

        } catch (error) {
            router.push("/error")
        }
        

    }

    const goBack = async (e: React.FormEvent) => {
        e.preventDefault();
        router.back()
    }

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Student Information
                </CardTitle>
                <CardDescription className = "flex justify-center text-center">To get the best experience, please fill out the following fields</CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            General Information
                        </Label>
                        <div className = "flex">
                        
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                required
                                onChange = {handleFirstNameChange}
                                value = {firstName}
                                >
                            </Input> 

                            <Input 
                                id = "last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                required
                                value = {lastName}
                                onChange = {handleLastNameChange}
                                >
                            </Input>

                        </div>
                        <div className = "flex">
                            <DatePicker
                                value = {dateofBirth}
                                onChange = {(date) => {
                                    setDateOfBirth(date);
                                    setHasError(false);
                                }}
                                onDateChanged = {setDateChanged}
                            >
                            </DatePicker>
                            <GenderOption
                                gender = {gender}
                                setGender={(value) => {
                                    setGender(value);
                                    setHasError(false);
                                }}
                                onGenderChange={setEmptyGender}
                            ></GenderOption>
                        </div>
                        <div className = "flex">
                            <CountrySelect
                                citizenship={citizenship}
                                setCitizenship={(values) => {
                                    setCitizenship(values);
                                    setHasError(false);
                                }}
                                onCitizenshipChange={setEmptyCitizenship}
                            />
                        </div>
                    </div>
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            Academic Information
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
                                onGradYearChange={setEmptyGradYear}
                            ></GradYearOption>
                        </div>
                        <div className = "flex">
                            
                        </div>
                        <div className = "flex">
                            <IdealMajor
                                idealMajor={idealMajor}
                                setIdealMajor={(values) => {
                                    setIdealMajor(values)
                                    setHasError(false);
                                }}
                                onIdealMajorChange={setEmptyIdealMajor}
                            ></IdealMajor>
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                            {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                        </div>
                    </div>
                    <Button type = "submit" onClick = {handleSubmit} variant = "ghost" className = "w-full text-white bg-blue-400">
                        Proceed
                    </Button>
                    <Button type = "submit" onClick = {goBack} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default StudentSignUpForm