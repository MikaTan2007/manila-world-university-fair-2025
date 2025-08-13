import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
    };
}

export function AdminUniversityCard({university} : UniversityProps) {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const adminUsername = searchParams.get('username')

    return (
        <Card className="w-full hover:shadow-lg transition-shadow font-sans">
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
                    variant="outline"
                    //onClick={handleSendToEditProfile}
                >   
                Edit Profile
                </Button>
            </CardFooter>
        </Card>
    );
}