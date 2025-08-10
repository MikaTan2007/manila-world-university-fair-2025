import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import React from "react";

import toast from "react-hot-toast";
import { HomepageSkeletonLoad } from "../../../cardSkeletonLoad";
import { Activity, AlertCircle, Building2, GraduationCap, TrendingUp, Users } from "lucide-react";

interface DashboardStats {
    totalStudents: number,
    totalUniversities: number,
    totalRegistrations: number,
    todaySignups: number,
    popularUniversity: {
        name: string,
        registrations: number
    },
    popularMajor: string,
    popularMajorCount: number
}

export function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const searchParams = useSearchParams();
    const username = searchParams.get("username")
    const {navigate} = useNavigation();

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch("/api/admin/dashboard", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 401 || response.status === 403) {
                navigate("/error/forbidden");
                return;
            }

            if (response.ok != true) {
                navigate("/error");
                return;
            }

            if (response.ok) {
                const data = await response.json()
                setStats(data.stats)
            }
        } catch (error) {
            navigate("/error");
            return;
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    } 

    const handleRefresh = async () => {
        setRefreshing(true);
        setLoading(true);
        await fetchDashboardStats();
        setRefreshing(false);
        setLoading(false);
    }

    useEffect(() => {
        if (!username) {
            navigate("/error/forbidden");
            return;
        }

        fetchDashboardStats();
    }, [username])

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                {/* Loading Header */}
                <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-60 animate-pulse"></div>
                </div>

                {/* Loading Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                </div>

                {/* Loading Detailed Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className = "p-6">
                <Card>
                    <CardContent className="p-8 text-center">
                        <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
                        <p className="text-gray-600 mb-4">Unable to load dashboard statistics</p>
                        <Button onClick={handleRefresh}>Try Again</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    <Button
                        onClick={handleRefresh}
                        variant="ghost"
                        disabled={refreshing}
                        className="flex items-center gap-2"
                    >
                        <Activity className="h-4 w-4" />
                        {refreshing ? "Refreshing..." : "Refresh"}
                    </Button>
                </div>
            </div>

            {/* Key Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Click to manage</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Universities</CardTitle>
                        <Building2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUniversities.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Click to manage</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Registrations</CardTitle>
                        <GraduationCap className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalRegistrations.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Student-University matches</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Signups</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.todaySignups}</div>
                        <p className="text-xs text-muted-foreground">New users today</p>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular University */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Most Popular University
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-lg font-semibold">{stats.popularUniversity.name}</div>
                            <div className="text-sm text-gray-600">
                                {stats.popularUniversity.registrations} student registrations
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${Math.min((stats.popularUniversity.registrations / stats.totalRegistrations) * 100, 100)}%` 
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Major */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Most Popular Major
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-lg font-semibold">{stats.popularMajor}</div>
                            <div className="text-sm text-gray-600">
                                {stats.popularMajorCount || 0} students interested
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${Math.min(((stats.popularMajorCount || 0) / stats.totalStudents) * 100, 100)}%` 
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}