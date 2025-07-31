import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { HomepageSkeletonLoad } from "@/app/homepage/cardSkeletonLoad";
import { useNavigation } from "@/hooks/useNavigation";

interface University {
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

export function UniProfile() {
    
    const [loading, setLoading] = useState(true);
    const {navigate} = useNavigation();

    const searchParams = useSearchParams();
    const universityEmail = searchParams.get('email');

    const [university, setUniversity] = useState<University | null>(null);

    const fetchUniversityData = async () => {
        try {
            const response = await fetch("/api/homepage/universities/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: universityEmail
                })
            });

            if (response.status === 401 || response.status === 403) {
                navigate("/error/forbidden");
                return;
            }

            if (response.ok != true) {
                navigate("/error");
                return;
            }

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    setUniversity(data.university)
                }
            }

        } catch (error) {
            navigate("/error");
            return;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (universityEmail == "") {
            navigate("/error/forbidden")
            return;
        }
        
        fetchUniversityData();
    
    }, [universityEmail])

    if (loading == true) {
        return(
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                <div></div>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <div></div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div></div>
            <Card className="w-full hover:shadow-lg transition-shadow font-sans">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex justify-start text-green-800">{university?.uni_name}</CardTitle>
                    <CardDescription className="font-bold">
                        <div className="flex flex-col">
                            <div>
                                {university?.cities.join(", ")}
                            </div>

                            <div>
                                {university?.countries.join(", ")}
                            </div>

                            <div>
                            {university?.region.join(", ")}
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
                                {university?.rep_first_name} {university?.rep_last_name}
                            </div>
                            <div>
                                {university?.rep_contact_email}
                            </div>
                        </div>
                    </div>
                    
                </CardContent>
                <CardFooter className="flex justify-end font-sans">
                        <Button 
                            variant="outline"
                        >
                            Edit Profile
                        </Button>
                </CardFooter>
            </Card>
            <div></div>
        </div>
        
    );
 
}