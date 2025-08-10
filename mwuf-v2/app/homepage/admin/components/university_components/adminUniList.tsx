"use client"
import { useState, useEffect, useMemo, useCallback} from "react";
//Imoirt admin university card
import { HomepageSkeletonLoad } from "@/app/homepage/cardSkeletonLoad";
import { useSearchParams} from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type FilterType = 'all' | 'registered' | 'unregistered';

export function AdminUniversityList() {
    const [universitites, setUniversitites] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterType>('all');
    const {navigate} = useNavigation();

    const refreshUniversities = useCallback(async () => {
        
        setLoading(true);
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
                navigate("/error/forbidden");
                return;
            }

            if (!response.ok) {
                navigate("/error");
                return;
            }

            const data = await response.json();
            
            if (data.success && data.universities) {
                setUniversitites(data.universities);
            } else {
                setUniversitites(data);
            }

        } catch(error) {
            navigate("/error");
        } finally {
            setLoading(false);
        }
    }, [studentEmail, navigate]);
}