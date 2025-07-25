'use client';
import Image from "next/image"
import { StudentList, StudentListRefresh } from "./components/studentList";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { RefreshCw } from "lucide-react";

export default function UniversityHomePage() {
  const studentListRefresh = useRef<StudentListRefresh>(null);

  const refreshStudents = () => {
    if (studentListRefresh.current) {
      studentListRefresh.current.refreshStudents();
    }
  }

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
      <div className="flex justify-center pt-10">
        <Button
          onClick = {refreshStudents}
          variant = "ghost"
          className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4"/>
            Refresh
        </Button>
      </div>
      <div className = "pt-10">
        <StudentList ref={studentListRefresh} ></StudentList>
      </div>
      
    </div>
  );
}