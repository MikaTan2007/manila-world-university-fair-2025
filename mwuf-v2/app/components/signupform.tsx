//React
import { SetStateAction, useState, useEffect} from "react";

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
            setSamePassword(true)
        } else {
            setSamePassword(false);
        }
    }, [firstPassword, secondPassword]); 

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
                        <Input id = "email" type="email" placeholder="@example.com" required></Input>
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

                        <div className = "text-sm flex">
                            {samePassword ? <CircleCheck color = "green" className = "size-5 animate-pulse"></CircleCheck> : <CircleX color = "red" className = "size-5 animate-pulse"></CircleX>}
                            {samePassword ? <p className = "text-green-700 animate-pulse">Passwords match</p> : <p className = "text-red-500 animate-pulse">Passwords don't match</p>}
                        </div>
                    </div>

                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-blue-500">
                        Sign Up as a Student
                    </Button>

                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-green-700">
                        Sign Up as a University
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link">Already have an account? Login here</Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default SignUpForm