'use client';
import Image from "next/image"
import { UniversityList } from "./components/universityList";
import { StudentSidebar } from "./components/studentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function StudentHomePage() {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar/>

        <main className = "flex-1 flex flex-col">
          <div className = "flex items-center p-4 border-b">
              <SidebarTrigger/>
              <h1 className="ml-4 text-xl font-semibold font-sans">Student Dashboard</h1>
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
              <UniversityList></UniversityList>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}