//React
import { SetStateAction, useState, useEffect} from "react";
import Link from "next/link";

//Lucide
import { EyeClosed, Eye, CircleCheck, CircleX } from "lucide-react";

//Shadcn
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const [samePassword, setSamePassword] = useState(true);

    //Setting the values
    const [email, setEmail] = useState("");
    const [emptyEmail, setEmptyEmail] = useState(true);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmptyEmail(false);
    }


    const handleFirstPasswordChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFirstPassword(e.target.value);
    }

    const handleSecondPasswordChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setSecondPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!showConfirmPassword);
    }

    useEffect(() => {
        if (firstPassword == secondPassword) {
            setSamePassword(true);
        } else {
            setSamePassword(false);
        }
    }, [firstPassword, secondPassword]); 

    //MongoDB Submission
    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (emptyEmail == true || email == "") {
            setEmptyEmail(true);
            setEmail("This field is required")
            return;
        }

        if (!samePassword) {
            return;
        }

        const studentData = {
            email,
            password: firstPassword
        }

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("User created successfully");
                console.log(data);
            } else {
                alert("Error creating Student");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating Student");
        }
    }

    const handleUniversitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (emptyEmail == true || email == "") {
            setEmptyEmail(true);
            setEmail("This field is required")
            return;
        }

        if (!samePassword) {
            return;
        }

        const universityData = {
            email,
            password: firstPassword
        }

        try {
            const response = await fetch("/api/universities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(universityData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("University created successfully");
                console.log(data);
            } else {
                alert("Error creating unversity");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating university");
        }
    }

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Sign Up
                </CardTitle>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">
                    <div className = "space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        {emptyEmail ? <Input 
                            id = "email" 
                            type="email" 
                            placeholder="@example.com"
                            value = {email} 
                            onChange={handleEmailChange}
                            
                            className = "text-red-600"
                            required>
                        </Input>
                        :
                        <Input 
                            id = "email" 
                            type="email" 
                            placeholder="@example.com"
                            value = {email} 
                            onChange={handleEmailChange}
                            required>
                        </Input>
                        }

                        
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="password">
                            Password
                        </Label>
                        <div className = "flex">
                            <Input value = {firstPassword} onChange = {handleFirstPasswordChange} className="border-0" id = "password" type = {showPassword ? "text" : "password"} placeholder = "Input Password" required></Input>
                            <Button onClick = {togglePasswordVisibility} variant = "ghost" size = "icon">
                                {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                            </Button>
                        </div>
                        
                        <div className = "flex">
                            <Input value = {secondPassword} onChange = {handleSecondPasswordChange} className = "border-0" id = "password" type = {showConfirmPassword ? "text" : "password"} placeholder = "Confirm Password" required></Input>
                            <Button onClick = {toggleConfirmPasswordVisibility} variant = "ghost" size = "icon">
                                {showConfirmPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                            </Button>
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {samePassword ? <CircleCheck color = "green" className = "size-5"></CircleCheck> : <CircleX color = "red" className = "size-5"></CircleX>}
                            {samePassword ? <p className = "text-green-700 ml-1">Passwords match</p> : <p className = "text-red-600 ml-1">Passwords don't match</p>}
                        </div>
                    </div>

                    <Button type = "submit" variant = "ghost" onClick = {handleStudentSubmit} className = "w-full text-white bg-blue-500">
                        Sign Up as a Student
                    </Button>

                    <Button type = "submit" variant = "ghost" onClick = {handleUniversitySubmit} className = "w-full text-white bg-green-700">
                        Sign Up as a University
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link"><Link href = "/login">Already have an account? Login here</Link></Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default SignUpForm