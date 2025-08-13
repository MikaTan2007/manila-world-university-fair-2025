import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NoUniversityCard() {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow font-san mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-center text-green-800">No Universities Yet</CardTitle>
                <CardDescription className="font-bold">
                    <div className="flex justify-center">
                        No universities to register for
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );

}