//React or Next
import { SetStateAction, useState, useEffect} from "react";
import {useRouter} from "next/navigation";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        CardFooter} from "@/components/ui/card";
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
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get('email') || '';

    //Email from prev sign up page
    const [userEmail, setUserEmail] = useState(email);

    useEffect(() => {
        if (email) {
            setUserEmail(email);
        }
    }, [email]);

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

    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("original email: ", email)
        console.log("user email: ", userEmail)

        if (emptyFirstName == true || firstName == "") {
            setEmptyFirstName(true);
            setHasError(true);
        }

        if (emptyLastName == true || lastName == "") {
            setEmptyLastName(true);
            setHasError(true);
        }

        if (dateChanged == false) {
            setHasError(true);
        }

        if (emptyGender == true) {
            setHasError(true);
        }

        if (emptyGradYear == true) {
            setHasError(true);
        }

        if (emptyCitizenship == true) {
            setHasError(true);
        }

        if (emptySchoolName == true || schoolName == "") {
            setHasError(true);
        } 

        if (emptyIdealMajor == true) {
            setHasError(true);
        }

        if (hasError == true) {
            return;
        }
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
                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-red-400">
                        Back
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link">Already have an account? Login here</Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default StudentSignUpForm