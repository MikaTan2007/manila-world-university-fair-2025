//React
import { useState } from "react";

//Toaster
import toast from "react-hot-toast";

//React Router
import { useNavigation } from "@/hooks/useNavigation";

//Lucide
import { EyeClosed, Eye, Eraser, CircleX } from "lucide-react";

//Shadcn
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLoginForm: React.FC = () => {

    //Initialization of router
    const {navigate} = useNavigation();

    const [username, setUsername] = useState("");
    const [emptyUsername, setEmptyUsername] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [emptyPassword, setEmptyPassword] = useState(false);

    //Login States
    const [noUsername, setNoUsername] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);


    const handlePasswordChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setEmptyPassword(false);
        setWrongPassword(false);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        setEmptyUsername(false)
        setNoUsername(false);
        setWrongPassword(false);
    }

    const clearUsername = () => {
        setUsername("")
        setEmptyUsername(false)
    }

    const handleToLogin = () => {
        navigate("/login")
    }
    
    const [hasError, setHasError] = useState(true);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let hasError = false;
        let noUsername = false;
        let wrongPassword = false;
        setNoUsername(noUsername)
        setWrongPassword(wrongPassword)

        if (emptyUsername == true || username == "") {
            setEmptyUsername(true);
            setUsername("This field is required")
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

        const toastId = toast.loading('Processing...')

        try {
            const response = await fetch("/api/login/admin", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    username: username,
                    password: password
                })
            })

            if (response.status === 404) {
                toast.dismiss();
                noUsername = true;
                setNoUsername(noUsername)
                return;
            }

            if (response.status === 401) {
                toast.dismiss();
                wrongPassword = true;
                setWrongPassword(wrongPassword)
                return;
            } else {
                wrongPassword = false;
            }

            if (response.ok != true) {
                toast.dismiss();
                navigate("/error")
                return;
            }

            if (response.status === 200) {
                console.log("Admin successfully logged in")
                //navigate(`/homepage/admin?username=${encodeURIComponent(username)}`);
            }
            
        } catch (error) {
            toast.dismiss();
            navigate("/error")
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
                        <Label htmlFor="username">
                            Username
                        </Label>
                        <div className="flex">
                            {(emptyUsername) ? 
                                <Input 
                                    id = "username" 
                                    type="username" 
                                    placeholder="Input Username"
                                    value = {username} 
                                    onChange={handleUsernameChange}
                                    className = "text-red-600"
                                    required>
                                </Input>
                                :
                                <Input 
                                    id = "username" 
                                    type="username" 
                                    placeholder="Input Username"
                                    value = {username} 
                                    onChange={handleUsernameChange}
                                    required>
                                </Input>
                                }
                                <Button onClick = {clearUsername} variant = "ghost" size = "icon">
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
                            {noUsername ? <CircleX color="red" className="size-5" /> : null}
                            {noUsername ? <p className = "text-red-600 ml-1">Username does not exist</p> : null}
                        </div>

                        <div className = "text-sm flex animate-pulse">
                            {wrongPassword ? <CircleX color="red" className="size-5" /> : null}
                            {wrongPassword ? <p className = "text-red-600 ml-1">Incorrect password</p> : null}
                        </div>
                    </div>

                    <Button type = "submit" onClick = {handleAdminLogin} variant = "ghost" className = "w-full text-white bg-forest-green">
                        Login as Admin
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button variant = "link" onClick={handleToLogin}>Return to Default Login</Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminLoginForm