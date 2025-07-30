import { LogOut, User, RefreshCcw, HomeIcon} from "lucide-react"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
import { useNavigation } from "@/hooks/useNavigation";
import toast from "react-hot-toast";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

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

//Refreshing
interface UniversitySidebarProps {
    onRefreshStudents: () => void;
}

export function UniversitySidebar({onRefreshStudents} : UniversitySidebarProps) {

    const {navigate} = useNavigation();
    const searchParams = useSearchParams()
    const universityEmail = searchParams.get('email')

    //Student object
    const [university, setUniversity] = useState<University | null>(null);

    //Profile Page
    const handleProfile = async() => {
        navigate(`/homepage/university/profile?email=${encodeURIComponent(universityEmail ?? "")}&firstName=${university?.rep_first_name}`);
        return;
    }

    //Logout function
    const handleLogout = async() => {
        try {
            await fetch("/api/logout", {
                method: "POST"
            })

            navigate("/login");
        } catch (error) {
            navigate("/error")
        }
    }

    //Fetching university
    useEffect(() => {
        if (universityEmail == "") {
            navigate("/error/forbidden")
            return;
        }
        
        const fetchUniversityData = async () => {
            try {
                const response = await fetch("/api/homepage/universities/sidebar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: universityEmail
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setUniversity(data.university)
                    }
                }
            } catch (error) {
                navigate("/error");
                return;
            }
        }

        fetchUniversityData();
    }, [universityEmail])

    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <div className="flex items-center space-x-2">
                <div>
                    <p className="text-3xl font-sans text-green-900 font-extrabold">Welcome, {university?.rep_first_name}</p>
                    <p className="truncate text-green-900">
                        {universityEmail}
                    </p>
                </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="space-y-2">
                        <SidebarMenuItem className="font-sans">
                            {/* Homepage */}
                            <SidebarMenuSubButton asChild>
                                <a className="flex items-center">
                                    <HomeIcon className="!w-6 !h-6" />
                                    <span className = "text-lg">Home</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="font-sans">
                            {/* Profile */}
                            <SidebarMenuSubButton asChild>
                                <a onClick={handleProfile} className="flex items-center">
                                    <User className="!w-6 !h-6" />
                                    <span className = "text-lg">Profile</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="font-sans">
                            {/* Refresh */}
                            <SidebarMenuSubButton asChild>
                                <a onClick={onRefreshStudents} className="flex items-center">
                                    <RefreshCcw className="!w-6 !h-6" />
                                    <span className = "text-lg">Refresh Students</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="font-sans">
                            {/* Logout */}
                            <SidebarMenuSubButton asChild>
                                <a onClick = {handleLogout} className="flex items-center">
                                    <LogOut className="!w-6 !h-6"/>
                                    <span className = "text-lg">Logout</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}