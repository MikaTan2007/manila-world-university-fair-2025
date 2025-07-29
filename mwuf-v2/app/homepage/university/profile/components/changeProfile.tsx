import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

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
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const searchParams = useSearchParams();
    const universityEmail = searchParams.get('email');

    useEffect(() => ) {
        if (universityEmail == "") {
            router.push("/error/forbidden")
            return;
        }
    }
}