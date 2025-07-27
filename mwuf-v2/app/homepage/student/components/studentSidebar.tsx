import { Calendar, Home, LogOut, Settings, University, User } from "lucide-react"
import { useState, useEffect } from "react";
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

import { useRouter, useSearchParams } from "next/navigation"

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

const menuItems = [
    {
        title: "My Profile",
        url: "#",
        icon: User,
    },
    {
        title: "Logout",
        url: "#",
        icon: LogOut,
    },
    
]

export function StudentSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const studentEmail = searchParams.get('email')

    //Student object
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    //Fetching student data
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch("/api/homepage/students/profile", {
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
                router.push("/error");
                return;
            } finally {
                setLoading(false);
            }
        }

        fetchStudentData();
    }, [studentEmail, router])

    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <div className="flex items-center space-x-2">
                <div>
                    <p className="text-3xl font-sans text-green-900 font-extrabold">Welcome, {student?.first_name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                        
                    </p>
                </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key = {item.title}>
                                <SidebarMenuSubButton asChild>
                                    <a href = {item.url} className="flex items-center space-x-2">
                                        <item.icon className = "w-4 h-4"></item.icon>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuSubButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}