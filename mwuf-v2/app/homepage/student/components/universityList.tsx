"use client"
import * as React from "react"
import { UniversityCard } from "./universityCard";
import { HomepageSkeletonLoad } from "./cardSkeletonLoad";
import { useRouter } from "next/navigation";

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

export function UniversityList() {
    const [universitites, setUniversitites] = React.useState<University[]>([]);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch("/api/homepage/students");
                if (response.ok != true) {
                    router.push("/error")
                }
                const data = await response.json();
                setUniversitites(data);
            } catch(error) {
                router.push("/error")
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    if (loading == true) {
        return (
            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
                <HomepageSkeletonLoad></HomepageSkeletonLoad>
            </div>
        )
    }

    return (
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {universitites.map((university) => (
                <UniversityCard
                    key = {university.email}
                    university={university}
                /> 
            ))}
        </div>
    )
}