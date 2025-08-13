"use client"
import { useState, useEffect, useMemo } from "react"
import { HomepageSkeletonLoad } from "@/app/homepage/cardSkeletonLoad"
import { useSearchParams } from "next/navigation"
import { AdminUniversityCard } from "./adminUniCard"
import { useNavigation } from "@/hooks/useNavigation"
import { Input } from "@/components/ui/input"
import { Search, X, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { NoUniversityCard } from "@/app/homepage/student/components/noUniversity"

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

export const AdminUniList = () => {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams();
    const adminUsername = searchParams.get('username');

    const [noUniversities, setNoUniversities] = useState(true);
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setLoading(true);
        await fetchUniversities();
        setLoading(false);
    }

    const filteredUniversities = useMemo(() => {
        if (!searchQuery.trim()) {
            return universities;
        }

        const query = searchQuery.toLowerCase();

        return universities.filter(university => 
            // Search by university name
            university.uni_name.toLowerCase().includes(query) ||
            // Search by cities
            university.cities.some(city => city.toLowerCase().includes(query)) ||
            // Search by countries
            university.countries.some(country => country.toLowerCase().includes(query)) ||
            // Search by regions
            university.region.some(region => region.toLowerCase().includes(query)) ||
            // Search by representative name
            `${university.rep_first_name} ${university.rep_last_name}`.toLowerCase().includes(query)
        );
    }, [universities, searchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const fetchUniversities = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/admin/universities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 401 || response.status === 403) {
                navigate("/error/forbidden");
                return;
            }

            const reply = await response.json();

            if (response.ok) {
                setUniversities(reply.universities);
                setNoUniversities(false);
            } else {
                navigate("/error");
                return;
            }
        } catch (error) {
            navigate("/error")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (adminUsername == "") {
            navigate("/error/forbidden")
            return;
        }

        fetchUniversities();
    }, [adminUsername])

    if (loading == true) {
        return (
            <div className="space-y-2">
                {/* Loading state for search bar */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    <div></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div></div>
                </div>

                <div className="flex justify-center">
                    <div className="h-8 bg-gray-200 rounded w-60 animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                    <HomepageSkeletonLoad></HomepageSkeletonLoad>
                </div>
            </div>
        )
    }

    if (noUniversities) {
        return (
            <div className="space-y-8">
                <div className="flex justify-center px-4">
                    <div>
                        <Button
                            onClick={handleRefresh}
                            variant="ghost"
                            className="flex items-center gap-2"
                        >
                            <Activity className="h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                    <div className="w-full max-w-md relative">
                        <div className="relative text-forest-green">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-green font-sans h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="No students to search yet..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 pr-10 font-sans bg-white placeholder:text-forest-green"
                            />
                            {searchQuery && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={clearSearch}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 !text-forest-green"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="mx-auto max-w-sm">
                    <NoUniversityCard></NoUniversityCard>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-center px-4">
                <div className="w-full max-w-md relative">
                    <div className="relative text-forest-green">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-green font-sans h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search universities by name, location, or representative..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-10 font-sans bg-white placeholder:text-forest-green"
                        />
                        {searchQuery && (
                            <Button
                                variant="link"
                                size="sm"
                                onClick={clearSearch}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 !text-forest-green"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <div></div>
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={handleRefresh}
                    variant="ghost"
                    className="flex items-center gap-2"
                >
                    <Activity className="h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredUniversities.length === 0 && !searchQuery ? (
                    <div className="col-span-full text-center text-white py-8">
                        No universities available
                    </div>
                ) : filteredUniversities.length === 0 && searchQuery ? (
                    <div className="col-span-full text-center text-white py-8">
                        No universities found matching "{searchQuery}"
                    </div>
                ) : (
                    filteredUniversities.map((university) => (
                        <AdminUniversityCard
                            key = {university.email}
                            university = {university}
                        />
                    ))
                )
            }
            </div>
        </div>
    )
}