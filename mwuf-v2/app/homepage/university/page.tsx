'use client';
import Image from "next/image"
import { StudentList, StudentListRefresh } from "./components/studentList";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { RefreshCw } from "lucide-react";
import { UniversitySidebar } from "./components/universitySidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function UniversityHomePage() {
  const studentListRefresh = useRef<StudentListRefresh>(null);

  const refreshStudents = () => {
    if (studentListRefresh.current) {
      studentListRefresh.current.refreshStudents();
    }
  }

  return (
    <SidebarProvider>
      <div className = "flex min-h-screen w-full">
        <UniversitySidebar/>


          <main className = "flex-1 flex flex-col">
            <div className="flex items-center p-4">
              <SidebarTrigger/>
                <h1 className="ml-4 text-xl font-semibold font-sans">University Homepage</h1>
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
                <div className="flex justify-center">
                  <Button
                    onClick = {refreshStudents}
                    variant = "link"
                    className="flex items-center gap-2 text-white"
                    >
                      <RefreshCw className="h-4 w-4"/>
                      Refresh
                  </Button>
                </div>  
                <StudentList ref={studentListRefresh} ></StudentList>
              </div>
            </div>
          </main>
        </div>
    </SidebarProvider>
    
  );
}