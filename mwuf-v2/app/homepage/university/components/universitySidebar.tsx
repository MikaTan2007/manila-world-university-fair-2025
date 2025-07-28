import { LogOut, User, RefreshCcw } from "lucide-react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
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

    const router = useRouter()
    const searchParams = useSearchParams()
    const universityEmail = searchParams.get('email')

    //Student object
    const [university, setUniversity] = useState<University | null>(null);

    //Logout function
    const handleLogout = async() => {
        try {
            await fetch("/api/logout", {
                method: "POST"
            })

            router.push("/login");
        } catch (error) {
            router.push("/error")
        }
    }

    //Fetching university
    useEffect(() => {
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
                router.push("/error");
                return;
            }
        }

        fetchUniversityData();
    }, [universityEmail, router])

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
                            {/* Profile */}
                            <SidebarMenuSubButton asChild>
                                <a href="#" className="flex items-center">
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