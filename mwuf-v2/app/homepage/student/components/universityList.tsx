"use client"
import { useState, useEffect, useMemo, useCallback, forwardRef, useImperativeHandle} from "react";
import { UniversityCard } from "./universityCard";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";
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

export interface UniversityListRefresh {
    refreshUniversities: () => void;
}

type FilterType = 'all' | 'registered' | 'unregistered';

export const UniversityList = forwardRef<UniversityListRefresh>((props, refresh) => {
    const [universitites, setUniversitites] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterType>('all');
    const {navigate} = useNavigation();

    const searchParams = useSearchParams();
    const studentEmail = searchParams.get('email');

    const refreshUniversities = useCallback(async () => {
        if (!studentEmail) return;
        
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
    }, [studentEmail]);

    const filteredUniversities = useMemo(() => {
        let filtered = universitites;

        if (filterType === 'registered') {
            filtered = universitites.filter(university =>
                university.registered_students.includes(studentEmail || '')
            );
        } else if (filterType === 'unregistered') {
            filtered = universitites.filter(university =>
                !university.registered_students.includes(studentEmail || '')
            )
        }

        if (!searchQuery.trim()) {
            return filtered
        }
        
        const query = searchQuery.toLowerCase();

        return filtered.filter(university => 
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
    }, [universitites, searchQuery, filterType, studentEmail])

    useImperativeHandle(refresh, () => ({
        refreshUniversities: refreshUniversities
    }));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const clearSearch = () => {
        setSearchQuery("");
    }

    const handleFilterChange = (newFilter: FilterType) => {
        setFilterType(newFilter)
    }

    const getCounts = useMemo(() => {
        let baseUniversities = universitites;
        
        // If there's a search query, filter the base list first
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            baseUniversities = universitites.filter(university => 
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
        }
    
        // Calculate counts from the search-filtered results
        const registered = baseUniversities.filter(uni => 
            uni.registered_students.includes(studentEmail || '')
        ).length;
        
        const unregistered = baseUniversities.filter(uni => 
            !uni.registered_students.includes(studentEmail || '')
        ).length;
        
        return {
            all: baseUniversities.length,
            registered,
            unregistered
        };
    }, [universitites, studentEmail, searchQuery]);

    const handleRegistrationSuccess = useCallback((universityEmail: string, isRegistered: boolean) => {
        setUniversitites(prevUniversities => 
            prevUniversities.map(uni => {
                if (uni.email === universityEmail) {
                    return {
                        ...uni,
                        registered_students: isRegistered 
                            ? [...uni.registered_students, studentEmail || '']
                            : uni.registered_students.filter(email => email !== studentEmail)
                    };
                }
                return uni;
            })
        );
    }, [studentEmail]);

    useEffect(() => {
        if (studentEmail == "") {
            navigate("/error/forbidden")
            return;
        } else {
            refreshUniversities();
        }
        
        
    }, [studentEmail]);

    if (loading == true) {
        return (
            <div className="space-y-6">
                {/* Loading state for search bar */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    <div></div>
                    <div className="space-y-3">
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex gap-2 justify-center">
                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div></div>
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

    return (
        <div className = "space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-full max-w-md relative">
                    <div className="relative text-forest-green"></div>
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
                <div>
                </div>
            </div>
            <div className="inline-flex justify-center bg-white/10 rounded-lg p-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('all')}
                    className={`${filterType === 'all' 
                        ? 'bg-white text-forest-green shadow-sm' 
                        : 'text-white hover:bg-white/20'
                    } transition-all duration-200`}
                >
                    All {getCounts.all}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('registered')}
                    className={`${filterType === 'registered' 
                        ? 'bg-white text-forest-green shadow-sm' 
                        : 'text-white hover:bg-white/20'
                    } transition-all duration-200`}
                >
                    Registered {getCounts.registered}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('unregistered')}
                    className={`${filterType === 'unregistered' 
                        ? 'bg-white text-forest-green shadow-sm' 
                        : 'text-white hover:bg-white/20'
                    } transition-all duration-200`}
                >
                    Available {getCounts.unregistered}
                </Button>
            </div>
            </div>
            

            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredUniversities.length === 0 && !searchQuery ? (
                    <div className="col-span-full text-center text-white py-8">
                        No universities available
                    </div>
                ) : (
                    filteredUniversities.map((university) => (
                        <UniversityCard
                            key={university.email}
                            university={university}
                            onRegistrationSuccess={handleRegistrationSuccess} // ✅ Add this line
                        /> 
                    ))
                )}
            </div>
        </div>

    )
});