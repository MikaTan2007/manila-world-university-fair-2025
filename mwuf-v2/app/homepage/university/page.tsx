'use client';
import Image from "next/image"
import { StudentList } from "./components/studentList";

export default function UniversityHomePage() {

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
        <StudentList></StudentList>
      </div>
      
    </div>
  );
}