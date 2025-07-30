import { useState, useEffect} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams} from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";

interface UniversityProps {
    university: {
        email: string;
        uni_name: string;
        region: string[];
        countries: string[];
        cities: string[];
        rep_first_name: string;
        rep_last_name: string;
        rep_contact_email: string;
        registered_students: string[];
    }
}

export function UniversityCard({ university }: UniversityProps) {

    const searchParams = useSearchParams();
    const studentEmail = searchParams.get('email');
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        if (studentEmail && university.registered_students.includes(studentEmail)) {
            setRegistered(true);
        }
    }, [studentEmail, university.registered_students]);

    const {navigate} = useNavigation();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email located in universityCard.tsx: ", university.email);

        try {
            const response = await fetch("/api/homepage/students/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    universityEmail: university.email,
                    studentEmail: studentEmail,
                })
            })

            if (response.ok == true) {
                setRegistered(true);
            } else {
                navigate("/error");
            }

        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <Card className={`w-full hover:shadow-lg transition-shadow font-sans 
                        ${
                            registered ? 'bg-green-100 border-green-300' : null
                        }`}>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-start text-green-800">{university.uni_name}</CardTitle>
                <CardDescription className="font-bold">
                    <div className="flex flex-col">
                        <div>
                            {university.cities.join(", ")}
                        </div>

                        <div>
                            {university.countries.join(", ")}
                        </div>

                        <div>
                            {university.region.join(", ")}
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className = "space-y-4">
                    <div className = "flex flex-col">
                        <div className="font-bold text-green-800">
                            Contact Information
                        </div>
                        <div>
                            {university.rep_first_name} {university.rep_last_name}
                        </div>
                        <div>
                            {university.rep_contact_email}
                        </div>
                    </div>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-end font-sans">
                <Button 
                    onClick = {handleRegister} 
                    variant="outline"
                    disabled = {registered}
                >
                    {registered ? "Registered" : "Register"}
                </Button>
            </CardFooter>
        </Card>
    );
}