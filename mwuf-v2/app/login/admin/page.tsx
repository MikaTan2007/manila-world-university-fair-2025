'use client';
import { Suspense } from "react";
import Image from "next/image"
import AdminLoginForm from "./components/adminloginform";


export default function Login() {
  return (
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
        <Suspense fallback={
          <div className="mx-auto max-w-sm">
            <div className="border border-gray-200 rounded-lg shadow-sm animate-pulse bg-white p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <AdminLoginForm></AdminLoginForm>
        </Suspense>
      </div>
      
    </div>
  );
}
