import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm: React.FC = () => {
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
                        <Input id = "password" type = "password" placeholder = "Input Password" required></Input>
                        <Input id = "password" type = "password" placeholder="Confirm Password" required></Input>
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