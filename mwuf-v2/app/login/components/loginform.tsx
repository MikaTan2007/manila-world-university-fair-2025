//React
import { SetStateAction, useState, useEffect} from "react";
import Link from "next/link";

//React Router
import {useRouter} from "next/navigation";

//Lucide
import { EyeClosed, Eye, Eraser, CircleX } from "lucide-react";

//Shadcn
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm: React.FC = () => {

    //Initialization of router
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emptyEmail, setEmptyEmail] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [emptyPassword, setEmptyPassword] = useState(false);

    //Login States
    const [noEmail, setNoEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);


    const handlePasswordChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setEmptyPassword(false);
        setWrongPassword(false);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmptyEmail(false);
        setNoEmail(false);
        setWrongPassword(false);
    }

    const clearEmail = () => {
        setEmail("");
        setEmptyEmail(true);
    }
    
    const [hasError, setHasError] = useState(true);

    const handleStudentLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let hasError = false;
        let noEmail = false;
        let wrongPassword = false;
        setNoEmail(noEmail)
        setWrongPassword(wrongPassword)

        if (emptyEmail == true || email == "") {
            setEmptyEmail(true);
            setEmail("This field is required")
            hasError = true;
        }

        if (emptyPassword == true || password == "") {
            setEmptyPassword(true);
            hasError = true;
        }

        setHasError(hasError);

        if (hasError == true) {
            return;
        }

        try {
            const response = await fetch("/api/login/students", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const reply = await response.json();

            let message = reply.message

            if (message == "Student not found") {
                noEmail = true;
                setNoEmail(noEmail)
                return;
            }
            
            if (message == "Password does not match") {
                wrongPassword = true;
                setWrongPassword(wrongPassword)
                return;
            } else {
                wrongPassword = false;
            }
            
            if (message == "Login successful") {
                router.push(`/homepage/student?email=${encodeURIComponent(email)}`);
            }

            if (response.ok != true) {
                router.push("/error")
                return;
            }
            
        } catch (error) {
            router.push("/error")
        }
    }

    const handleUniversityLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;
        let noEmail = false;
        let wrongPassword = false;
        setNoEmail(noEmail)
        setWrongPassword(wrongPassword)

        if (emptyEmail == true || email == "") {
            setEmptyEmail(true);
            setEmail("This field is required")
            hasError = true;
        }

        if (emptyPassword == true || password == "") {
            setEmptyPassword(true);
            hasError = true;
        }

        setHasError(hasError);

        if (hasError == true) {
            return;
        }

        try {
            const response = await fetch("/api/login/universities", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const reply = await response.json();

            let message = reply.message

            if (message == "University not found") {
                noEmail = true;
                setNoEmail(noEmail)
                return;
            }
            
            if (message == "Password does not match") {
                wrongPassword = true;
                setWrongPassword(wrongPassword)
                return;
            } else {
                wrongPassword = false;
            }

            if (message == "Login successful") {
                //router.push(`/homepage/student?email=${encodeURIComponent(email)}`);
            }

            if (response.ok != true) {
                router.push("/error")
                return;
            }

            
        } catch (error){
            router.push("/error")
        }
    }

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
                            <Input value = {password} onChange = {handlePasswordChange} className="border-0" id = "password" type = {showPassword ? "text" : "password"} placeholder = "Input Password" required></Input>
                            <Button onClick = {togglePasswordVisibility} variant = "ghost" size = "icon">
                                {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                            </Button>
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {emptyPassword ? <CircleX color="red" className="size-5" /> : null}
                            {emptyPassword? <p className = "text-red-600 ml-1">Password must not be empty</p> : null}
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {noEmail ? <CircleX color="red" className="size-5" /> : null}
                            {noEmail ? <p className = "text-red-600 ml-1">Email does not exist</p> : null}
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {wrongPassword ? <CircleX color="red" className="size-5" /> : null}
                            {wrongPassword ? <p className = "text-red-600 ml-1">Incorrect password</p> : null}
                        </div>
                    </div>

                    <Button type = "submit" onClick = {handleStudentLogin} variant = "ghost" className = "w-full text-white bg-blue-500">
                        Login as a Student
                    </Button>

                    <Button type = "submit" onClick = {handleUniversityLogin} variant = "ghost" className = "w-full text-white bg-green-700">
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