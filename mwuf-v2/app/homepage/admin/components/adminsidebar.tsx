import { LogOut, School, UserPen, LayoutDashboard  } from "lucide-react"
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import { useSearchParams } from "next/navigation"
import { useNavigation } from "@/hooks/useNavigation";
import toast from "react-hot-toast";

export function AdminSidebar() {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams()

    const username = searchParams.get('username')

    //Dashboard function
    const handleDashboard = async() => {
        navigate(`/homepage/admin/dashboard?username=${encodeURIComponent(username ?? "")}`)
        return;
    }

    //Logout function
    const handleLogout = async() => {
        try {
            await fetch("/api/logout", {
                method: "POST"
            })

            navigate("/login/admin");
        } catch (error) {
            navigate("/error")
        }
    }

    //Route to student page
    const handleStudentPage = async() => {
        navigate(`/homepage/admin/students?username=${encodeURIComponent(username ?? "")}`)
        return;
    }

    //Route to uni page
    const handleUniversityPage = async() => {
        navigate(`/homepage/admin/universities?username=${encodeURIComponent(username ?? "")}`)
        return;
    }

    

    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <div className="flex items-center space-x-2">
                <div>
                    <p className="text-3xl font-sans text-green-900 font-extrabold">Welcome, Admin</p>
                </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="space-y-2">

                        <SidebarMenuItem className="font-sans">
                            {/* Dashboard */}
                            <SidebarMenuSubButton asChild>
                                <a onClick = {handleDashboard} className="flex items-center">
                                    <LayoutDashboard className="!w-6 !h-6"/>
                                    <span className = "text-lg">Dashboard</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="font-sans">
                            {/* Students */}
                            <SidebarMenuSubButton asChild>
                                <a onClick = {handleStudentPage} className="flex items-center">
                                    <UserPen className="!w-6 !h-6"/>
                                    <span className = "text-lg">Students</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="font-sans">
                            {/* University */}
                            <SidebarMenuSubButton asChild>
                                <a onClick = {handleUniversityPage} className="flex items-center">
                                    <School className="!w-6 !h-6"/>
                                    <span className = "text-lg">University</span>
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