import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";

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
    return (
        <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className = "text-2xl font-bold flex justify-start">{university.uni_name}</CardTitle>
                <CardDescription>{university.region.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className = "space-y-4">
                    <div className="space-y-2">
                        <Label className = "font-bold text-1xl">
                            Located in:
                        </Label>

                        <div>
                            
                            <p>{university.cities.join(", ")}</p>
                        </div>
                    </div>

                    <div className = "space-y-2">
                        <Label className = "font-bold text-1xl">
                            Contact Information:
                        </Label>

                        <div>
                            <p><strong>Representative:</strong> {university.rep_first_name} {university.rep_last_name}</p>
                        </div>
                    </div>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline">View Details</Button>
            </CardFooter>
        </Card>
    );
}