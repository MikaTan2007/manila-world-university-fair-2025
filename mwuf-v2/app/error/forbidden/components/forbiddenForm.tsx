import { useNavigation } from "@/hooks/useNavigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ForbiddenForm: React.FC = () => {
    //Initialization of router
    const {navigate} = useNavigation();

    useEffect(() => {
        toast.dismiss();
    }, []);

    const goToHome = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("/api/logout", {
                method: "POST"
            })

            navigate("/login");
        } catch (error) {
            navigate("/error")
        }
    }

    return(
        <Card className = "mx-auto max-w-sm">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Error 401/403
                </CardTitle>
                <CardDescription className = "flex justify-center text-center">Unauthorized Access Detected</CardDescription>
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

export default ForbiddenForm