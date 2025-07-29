'use client';
import Image from "next/image";
import { StudentProfileSidebar } from "./components/studentProfileSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentProfile } from "./components/changeProfile";

export default function StudentProfilePage() {
    return (
        <SidebarProvider>
            <div className = "flex min-h-screen w-full">
            <StudentProfileSidebar></StudentProfileSidebar>
    
    
                <main className = "flex-1 flex flex-col">
                <div className="flex items-center p-4">
                    <SidebarTrigger/>
                    <h1 className="ml-4 text-xl font-semibold font-sans">Student Profile</h1>
                </div>
    
                {/* Page Content*/ }
                <div>
                    <div className="flex flex-col items-center pt-10">
                    <Image 
                        className = "w-auto h-auto"
                        src = "/images/mwuf_logo.png"
                        width = {400}
                        height = {400}
                        alt = "logo"
                        priority={true}
                        />
                    </div>
                    <div className = "pt-10">
                        <StudentProfile></StudentProfile>
                    </div>
                </div>
                </main>
            </div>
        </SidebarProvider>

    );
}