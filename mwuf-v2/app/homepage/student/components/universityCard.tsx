import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
                <CardTitle>{university.uni_name}</CardTitle>
                <CardDescription>
                    {university.region.join(", ")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><strong>Countries:</strong> {university.countries.join(", ")}</p>
                    <p><strong>Cities:</strong> {university.cities.join(", ")}</p>
                    <p><strong>Representative:</strong> {university.rep_first_name} {university.rep_last_name}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline">View Details</Button>
            </CardFooter>
        </Card>
    );
}