//React
import { SetStateAction, useState, useEffect} from "react";
import Link from "next/link";

//Lucide
import { EyeClosed, Eye, Eraser} from "lucide-react";

//Shadcn
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm: React.FC = () => {

    const [email, setEmail] = useState("");
    const [emptyEmail, setEmptyEmail] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [firstPassword, setFirstPassword] = useState("");


    const handleFirstPasswordChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFirstPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmptyEmail(false);
    }

    const clearEmail = () => {
        setEmail("");
        setEmptyEmail(true);
    }

    
    
    /*
    const handleStudentLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const checkEmailResponse = await fetch("/api/login/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({checkEmail: true, email})
            })
        }
    }
    */

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Login
                </CardTitle>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">
                    <div className = "space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <div className="flex">
                            {(emptyEmail) ? 
                                <Input 
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
                                <Button onClick = {clearEmail} variant = "ghost" size = "icon">
                                    <Eraser></Eraser>
                                </Button>
                        </div>
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
                    </div>

                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-blue-500">
                        Login as a Student
                    </Button>

                    <Button type = "submit" variant = "ghost" className = "w-full text-white bg-green-700">
                        Login as a University
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link"><Link href = "/">No account yet? Sign up here</Link></Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm