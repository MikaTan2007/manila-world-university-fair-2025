'use client';
import Image from "next/image"
import { UniProfileSidebar } from "./components/uniProfileSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UniProfile } from "./components/uniViewProfile";

export default function UniversityProfilePage() {
    return (
        <SidebarProvider>
          <div className = "flex min-h-screen w-full">
            <UniProfileSidebar></UniProfileSidebar>
    
    
              <main className = "flex-1 flex flex-col">
                <div className="flex items-center p-4">
                  <SidebarTrigger/>
                    <h1 className="ml-4 text-xl font-semibold font-sans">University Profile</h1>
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
                    <UniProfile></UniProfile>
                  </div>
                </div>
              </main>
            </div>
        </SidebarProvider>
        
      );
}