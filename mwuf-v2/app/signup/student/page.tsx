'use client';
import Image from "next/image"
import StudentSignUpForm from "@/app/components/student_sign_up/studentsignupform";


export default function StudentSignUp() {
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
        <StudentSignUpForm></StudentSignUpForm>
      </div>
      
    </div>
  );
}
