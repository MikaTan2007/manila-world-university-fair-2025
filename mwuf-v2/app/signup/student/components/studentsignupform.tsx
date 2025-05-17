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
import { CountrySelect } from "./country-select";
import { IdealCountry } from "./idealcountry";


const StudentSignUpForm: React.FC = () => {
    //Initialization of router
    const router = useRouter();

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

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setEmptyFirstName(false);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setEmptyLastName(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (emptyFirstName == true || firstName == "") {
            setEmptyFirstName(true);
            setFirstName("Required Field")
            hasError = true;
        }

        if (emptyLastName == true || lastName == "") {
            setEmptyLastName(true);
            setLastName("Required Field")
            hasError = true;
        }

        if (dateChanged == false) {
            hasError = true;
        }

        if (emptyGender == true) {
            hasError = true;
            console.log("Empty gender");
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
                        
                        {(emptyFirstName) ?
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                required
                                onChange = {handleFirstNameChange}
                                className = "text-red-600"
                                value = {firstName}
                                >
                            </Input> 
                            :
                            <Input 
                                id = "first_name" 
                                type="text" 
                                placeholder="First Name" 
                                required
                                onChange = {handleFirstNameChange}
                                value = {firstName}
                                >
                            </Input> 
                        }

                        {(emptyLastName) ?

                            <Input 
                                id = "last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                required
                                value = {lastName}
                                className = "text-red-600"
                                onChange = {handleLastNameChange}
                            >
                            </Input>
                            :
                            <Input 
                                id = "last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                required
                                value = {lastName}
                                onChange = {handleLastNameChange}
                            >
                            </Input>
                        }

                            

                        </div>
                        <div className = "flex">
                            <DatePicker
                                value = {dateofBirth}
                                onChange = {setDateOfBirth}
                                onDateChanged = {setDateChanged}
                            >
                            </DatePicker>
                            <GenderOption
                                gender = {gender}
                                setGender={setGender}
                                onGenderChange={setEmptyGender}
                            ></GenderOption>
                        </div>
                        <div className = "flex">
                            <CountrySelect></CountrySelect>
                        </div>
                    </div>
                    <div className = "space-y-2">
                        <Label htmlFor="general_information">
                            Academic Information
                        </Label>
                        <div className = "flex">
                            <Input id = "school" type="text" placeholder="Current School" required></Input>
                            <GradYearOption></GradYearOption>
                        </div>
                        <div className = "flex">
                            
                        </div>
                        <div className = "flex">
                            <IdealMajor></IdealMajor>
                        </div>
                        <div className = "flex">
                            <IdealCountry></IdealCountry>
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