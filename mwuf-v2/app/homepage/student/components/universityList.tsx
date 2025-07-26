"use client"
import { useState, useEffect} from "react";
import { UniversityCard } from "./universityCard";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
import {useRouter, useSearchParams} from "next/navigation";
import React from "react";

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
    const [universitites, setUniversitites] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const searchParams = useSearchParams();
    const studentEmail = searchParams.get('email');

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch("/api/homepage/students", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentEmail: studentEmail
                    })

                });
                
                if (response.status === 401 || response.status === 403) {
                    router.push("/error/forbidden");
                    return;
                }

                if (response.ok != true) {
                    router.push("/error");
                    return;
                }

                const data = await response.json();
                
                if (data.success && data.universities) {
                    setUniversitites(data.universities);
                } else {
                    setUniversitites(data)
                }

            } catch(error) {
                router.push("/error")
            } finally {
                setLoading(false);
            }
        };

        if (studentEmail) {
            fetchUniversities();
        }
    }, [studentEmail, router]);

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