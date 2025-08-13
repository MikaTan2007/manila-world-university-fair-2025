'use client';
import { Suspense } from "react";
import Image from "next/image"
import { AdminSidebar } from "../components/adminsidebar";
import { AdminDashboard } from "./components/admindashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomepageSkeletonLoad } from "../../cardSkeletonLoad";

export default function AdminHomePage() {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Suspense fallback={<div className="w-64 bg-gray-100 animate-pulse"></div>}>
          <AdminSidebar></AdminSidebar>
        </Suspense>

        <main className = "flex-1 flex flex-col">
          <div className = "sticky top-0 z-50 flex items-center p-4 bg-forest-green shadow-lg">
              <SidebarTrigger/>
              <h1 className="ml-4 text-xl font-semibold font-sans">Admin Dashboard</h1>
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
            <div className="pt-10">
              <Suspense fallback={
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                    <HomepageSkeletonLoad />
                  </div>
                </div>
              }>
                <AdminDashboard></AdminDashboard>
              </Suspense>
            </div>

          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}