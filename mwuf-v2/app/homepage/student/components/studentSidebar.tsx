import { LogOut, User, HomeIcon, RefreshCcw } from "lucide-react"
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

interface Student {
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    citizenship: [string];
    graduation_year: string;
    school_name: string;
    ideal_major: [string];
    registered_universitites: [string];
}

interface StudentSideBarProps {
    onRefreshUniversities: () => void;
}

export function StudentSidebar({onRefreshUniversities} : StudentSideBarProps) {
    const {navigate} = useNavigation();
    const searchParams = useSearchParams()
    const studentEmail = searchParams.get('email')

    //Student object
    const [student, setStudent] = useState<Student | null>(null);

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

    //Profile Page
    const handleProfile = async() => {
        navigate(`/homepage/student/profile?email=${encodeURIComponent(studentEmail ?? "")}&firstName=${student?.first_name}`);
        return;
    }

    //Fetching student data
    useEffect(() => {
        if (studentEmail == "") {
            navigate("/error/forbidden")
            return;
        }

        const fetchStudentData = async () => {
            try {
                const response = await fetch("/api/homepage/students/sidebar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: studentEmail
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setStudent(data.student)
                    }
                }
            } catch (error) {
                navigate("/error");
                return;
            }
        }

        fetchStudentData();
    }, [studentEmail])

    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <Sidebar className="min-h-screen">
            <SidebarHeader className="p-5">
                <div className="flex items-center space-x-2">
                <div>
                    <p className="text-3xl font-sans text-green-900 font-extrabold">Welcome, {student?.first_name}</p>
                    <p className="truncate text-green-900">
                        {studentEmail}
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
                                <a onClick={onRefreshUniversities} className="flex items-center">
                                    <RefreshCcw className="!w-6 !h-6" />
                                    <span className = "text-lg">Refresh Universities</span>
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