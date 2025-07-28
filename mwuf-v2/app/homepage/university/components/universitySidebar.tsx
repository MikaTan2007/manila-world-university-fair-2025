import { LogOut, User, RefreshCcw } from "lucide-react"
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { StudentListRefresh } from "./studentList";

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

interface UniversitySidebarProps {
    onRefreshStudents: () => void;
}

export function UniversitySidebar({onRefreshStudents} : UniversitySidebarProps) {
    const studentListRefresh = useRef<StudentListRefresh>(null);

    const refreshStudents = () => {
        if (studentListRefresh.current) {
        studentListRefresh.current.refreshStudents();
        }
    }

    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <div className="flex items-center space-x-2">
                <div>
                    <p className="text-3xl font-sans text-green-900 font-extrabold">Welcome, University</p>
                    <p className="truncate text-green-900">
                        
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

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}