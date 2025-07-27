import {useRouter} from "next/navigation";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ErrorForm: React.FC = () => {
    //Initialization of router
    const router = useRouter();

    const goToHome = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("/api/logout", {
                method: "POST"
            })

            router.push("/login");
        } catch (error) {
            router.push("/error")
        }
    }

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Error 404
                </CardTitle>
                <CardDescription className = "flex justify-center text-center">We apologize for the inconvenience</CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">

                    <Button type = "submit" onClick = {goToHome} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back to Login
                    </Button>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default ErrorForm