import { useState, useEffect} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";
import { Date } from "mongoose";

interface StudentProps {
    student: {
        email: string;
        first_name: string;
        last_name: string;
        birthday: Date;
        gender: string;
        citizenship: [string];
        graduation_year: string;
        school_name: string;
        ideal_major: [string];
        registered_universitites: [string];
    }
}

export function StudentCard({student}: StudentProps) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow font-mons">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-start text-green-800">{student.first_name} {student.last_name}</CardTitle>
                <CardDescription className="font-bold">
                    {student.gender}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className = "space-y-4">
                    <div className = "flex flex-col">
                        <div className="font-bold text-green-800">
                            Contact Information
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-end font-sans">

            </CardFooter>
        </Card>
    );

}