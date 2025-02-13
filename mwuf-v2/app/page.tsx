'use client';
import Image from "next/image"
import SignUpForm from "./components/signupform";


export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center pt-10">
        <Image 
          className = ""
          src = "/images/mwuf_logo.png"
          width = {400}
          height = {400}
          alt = "logo"
          />
      </div>
      <div className = "pt-10">
        <SignUpForm></SignUpForm>
      </div>
      
    </div>
  );
}
