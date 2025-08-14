import { LogOut, User, RefreshCcw, HomeIcon, Download} from "lucide-react"
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

    const handleExportCSV = async() => {
        const toastId = toast.loading("Preparing student data for export...");

        try {
            const response = await fetch("/api/homepage/universities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    universityEmail: universityEmail
                })
            });

            if (response.status === 401 || response.status === 403) {
                toast.dismiss(toastId);
                toast.error("Unauthorized access");
                return;
            }

            if (!response.ok) {
                toast.dismiss(toastId);
                toast.error("Failed to fetch student data");
                return;
            }

            const reply = await response.json();

            if (reply.message === "No students registered") {
                toast.dismiss(toastId);
                toast.error("No students to export");
                return;
            }

            const students: Student[] = reply.students;

            //Convert to CSV
            const csvContent = convertToCSV(students);
            
            //Create and download file
            const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8'});
            const link = document.createElement('a');

            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `${university?.uni_name || 'university'}_students_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.dismiss(toastId);
                toast.success(`Exported ${students.length} students to CSV`);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Failed to export student data");
            console.error("Export error:", error);
        }
    }

    const convertToCSV = (students: Student[]): string => {
        if (students.length === 0) return '';

        const headers = [
            'Email',
            'First Name',
            'Last Name',
            'Gender',
            'Citizenship',
            'Graduation Year',
            'School Name',
            'Ideal Major',
        ];

        const csvRows = students.map(student => [
            student.email,
            student.first_name,
            student.last_name,
            student.gender,
            Array.isArray(student.citizenship) ? student.citizenship.join('; ') : student.citizenship,
            student.graduation_year,
            student.school_name,
            Array.isArray(student.ideal_major) ? student.ideal_major.join('; ') : student.ideal_major,
        ]);

        const escapeCSVValue = (value: string): string => {
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        };

        const csvContent = [
            headers.map(escapeCSVValue).join(','),
            ...csvRows.map(row => row.map(String).map(escapeCSVValue).join(','))
        ].join('\n');

        return csvContent;
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
        <Sidebar className="min-h-screen">
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
                            <SidebarMenuSubButton asChild>
                                <a onClick={handleExportCSV} className="flex items-center">
                                    <Download className="!w-6 !h-6" />
                                    <span className = "text-lg">Export Students</span>
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