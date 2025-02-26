'use client';
import Image from "next/image"
import LoginForm from "./components/loginform";



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
        <LoginForm></LoginForm>
      </div>
      
    </div>
  );
}
