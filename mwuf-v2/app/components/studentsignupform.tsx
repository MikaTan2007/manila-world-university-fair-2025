//React
import { SetStateAction, useState, useEffect} from "react";

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

import { DatePicker } from "./datepicker";
import { GenderOption } from "./genderoption";
import CountrySelect from "./country-select";
import { GradYearOption } from "./graduation-year-select";
import { IdealMajor } from "./idealmajor";


const StudentSignUpForm: React.FC = () => {

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
                            <Input id = "first_name" type="text" placeholder="First Name" required></Input>
                            <Input id = "last_name" type="text" placeholder="Last Name" required></Input>
                        </div>
                        <div className = "flex">
                            <DatePicker></DatePicker>
                            <GenderOption></GenderOption>
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
                            <Input id = "school" type="text" placeholder="Current School (ex. International School Manila)" required></Input>
                        </div>
                        <div className = "flex">
                            <GradYearOption></GradYearOption>
                            <IdealMajor></IdealMajor>
                        </div>
                    </div>
                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-blue-400">
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